/**
 * Neural network canvas simulation engine.
 *
 * Renders an interactive feedforward neural network visualization with
 * layered nodes, weighted edges, signal pulses, input labels, and
 * output probability readouts. Designed as a pure computational module
 * with no React dependency — consumed by the Hero component.
 */

/* ─── Types ────────────────────────────────────────────────────────── */

export interface NetNode {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  layer: number
  activation: number
  driftPhase: number
  outEdges: number[]
  label: string
  outputValue: number
  outputTarget: number
}

export interface NetEdge {
  from: number
  to: number
  pulses: { pos: number; energy: number }[]
}

export interface Network {
  nodes: NetNode[]
  edges: NetEdge[]
  numLayers: number
}

/* ─── Topology ─────────────────────────────────────────────────────── */

const DESKTOP_LAYERS = { x: [0.08, 0.25, 0.42, 0.58, 0.75, 0.92], nodes: [8, 14, 18, 18, 14, 8] }
const MOBILE_LAYERS  = { x: [0.08, 0.33, 0.67, 0.92], nodes: [4, 7, 7, 4] }

const INPUT_LABELS        = ['text', 'image', 'audio', 'query', 'embed', 'signal', 'tokens', 'sensor']
const INPUT_LABELS_MOBILE = ['txt', 'img', 'aud', 'qry']

const EDGES_PER_NODE        = 3
const EDGES_PER_NODE_MOBILE = 2
const NODE_BASE_RADIUS        = 2.5
const NODE_BASE_RADIUS_MOBILE = 2

/* ─── Physics ──────────────────────────────────────────────────────── */

const DRIFT_SPEED  = 0.0008
const DRIFT_AMP    = 4

const ACTIVATION_RADIUS        = 180
const ACTIVATION_RADIUS_MOBILE = 120
const ACTIVATION_DECAY = 0.965

const PULSE_SPEED           = 0.008
const PULSE_SPAWN_THRESHOLD = 0.4
const PULSE_ENERGY_DECAY    = 0.75
const MAX_PULSES_PER_EDGE   = 1

/** How fast output values glide toward new targets */
const OUTPUT_LERP_SPEED  = 0.02
/** Per-frame probability of picking a new random output target */
const OUTPUT_RETARGET_RATE = 0.005

/* ─── Build ────────────────────────────────────────────────────────── */

/**
 * Constructs a layered feedforward network graph for canvas rendering.
 *
 * Nodes are arranged in vertical columns (layers) at percentage-based
 * x-positions. Within each layer, nodes are evenly spaced vertically
 * with random jitter for an organic feel. Edges connect each node to
 * a random subset of nodes in the next layer (forward-only). A fraction
 * of edges are seeded with ambient pulses so the network appears alive
 * immediately on first render.
 */
export function buildNetwork(w: number, h: number, isMobile: boolean): Network {
  const nodes: NetNode[] = []
  const edges: NetEdge[] = []
  const config     = isMobile ? MOBILE_LAYERS : DESKTOP_LAYERS
  const layerXPcts = config.x
  const layerCounts = config.nodes
  const labels     = isMobile ? INPUT_LABELS_MOBILE : INPUT_LABELS
  const lastLayer  = layerXPcts.length - 1
  const edgesPerNode = isMobile ? EDGES_PER_NODE_MOBILE : EDGES_PER_NODE
  const baseRadius   = isMobile ? NODE_BASE_RADIUS_MOBILE : NODE_BASE_RADIUS

  const verticalPadding = h * (isMobile ? 0.2 : 0.15)
  const usableH = h - verticalPadding * 2

  for (let l = 0; l < layerXPcts.length; l++) {
    const count = layerCounts[l]
    const centerX = w * layerXPcts[l]

    for (let n = 0; n < count; n++) {
      const spacing = usableH / (count + 1)
      const y = verticalPadding + spacing * (n + 1) + (Math.random() - 0.5) * spacing * 0.5
      const x = centerX + (Math.random() - 0.5) * w * 0.06

      const isInput  = l === 0
      const isOutput = l === lastLayer

      nodes.push({
        x, y,
        baseX: x, baseY: y,
        radius: baseRadius + Math.random() * 1.5,
        layer: l,
        activation: 0,
        driftPhase: Math.random() * Math.PI * 2,
        outEdges: [],
        label: isInput ? labels[n % labels.length] : '',
        outputValue:  isOutput ? Math.random() : 0,
        outputTarget: isOutput ? Math.random() : 0,
      })
    }
  }

  /* Edge wiring: connect each node to random nodes in the next layer */
  const layerIndices: number[][] = []
  let idx = 0
  for (let l = 0; l < layerCounts.length; l++) {
    const indices: number[] = []
    for (let n = 0; n < layerCounts[l]; n++) indices.push(idx++)
    layerIndices.push(indices)
  }

  for (let l = 0; l < layerIndices.length - 1; l++) {
    const fromLayer = layerIndices[l]
    const toLayer   = layerIndices[l + 1]

    for (const fi of fromLayer) {
      const shuffled = [...toLayer].sort(() => Math.random() - 0.5)
      const targets  = shuffled.slice(0, Math.min(edgesPerNode, toLayer.length))

      for (const ti of targets) {
        const edgeIdx = edges.length
        edges.push({ from: fi, to: ti, pulses: [] })
        nodes[fi].outEdges.push(edgeIdx)
      }
    }
  }

  /* Seed ambient pulses so the network looks alive on first frame */
  const seedCount = Math.floor(edges.length * 0.15)
  for (let i = 0; i < seedCount; i++) {
    const ei = (Math.random() * edges.length) | 0
    edges[ei].pulses.push({ pos: Math.random(), energy: 0.3 + Math.random() * 0.4 })
  }

  return { nodes, edges, numLayers: layerXPcts.length }
}

/* ─── Simulation Tick ──────────────────────────────────────────────── */

/**
 * Advances the network by one frame. Mutates nodes/edges in place
 * for zero-allocation performance on the animation hot path.
 *
 * Per-frame operations:
 * 1. Drift — each node oscillates around its base position via sin/cos
 * 2. Activation decay — exponential decay toward zero each frame
 * 3. Cursor proximity — nodes within radius receive quadratic activation
 * 4. Ambient firing — rare random activation keeps the network alive
 * 5. Output lerp — output-layer nodes interpolate toward random targets
 * 6. Pulse spawning — activated nodes emit energy pulses along edges
 * 7. Pulse travel — pulses advance along edges and transfer energy on arrival
 * 8. Ambient seeding — every 60 frames, input-layer edges get new pulses
 */
export function updateNetwork(
  network: Network,
  mouseX: number,
  mouseY: number,
  frame: number,
  isMobile: boolean,
): void {
  const { nodes, edges, numLayers } = network
  const lastLayer   = numLayers - 1
  const activationR = isMobile ? ACTIVATION_RADIUS_MOBILE : ACTIVATION_RADIUS
  const time = frame * DRIFT_SPEED

  /* ── Nodes ─────────────────────────────────────────────────────── */
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]

    n.x = n.baseX + Math.sin(time * 1.3 + n.driftPhase) * DRIFT_AMP
    n.y = n.baseY + Math.cos(time * 0.9 + n.driftPhase * 1.7) * DRIFT_AMP

    n.activation *= ACTIVATION_DECAY

    const dx = n.x - mouseX
    const dy = n.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < activationR) {
      const strength = 1 - dist / activationR
      n.activation = Math.max(n.activation, strength * strength)
    }

    if (Math.random() < 0.0008) {
      n.activation = Math.max(n.activation, 0.6)
    }

    if (n.layer === lastLayer) {
      n.outputValue += (n.outputTarget - n.outputValue) * OUTPUT_LERP_SPEED
      const retargetChance = OUTPUT_RETARGET_RATE + n.activation * 0.04
      if (Math.random() < retargetChance) n.outputTarget = Math.random()
    }
  }

  /* ── Pulses ────────────────────────────────────────────────────── */
  for (let e = 0; e < edges.length; e++) {
    const edge = edges[e]
    const fromNode = nodes[edge.from]

    if (
      fromNode.activation > PULSE_SPAWN_THRESHOLD &&
      edge.pulses.length < MAX_PULSES_PER_EDGE &&
      Math.random() < 0.15
    ) {
      edge.pulses.push({ pos: 0, energy: fromNode.activation * PULSE_ENERGY_DECAY })
    }

    for (let p = edge.pulses.length - 1; p >= 0; p--) {
      const pulse = edge.pulses[p]
      pulse.pos += PULSE_SPEED + pulse.energy * 0.006

      if (pulse.pos >= 1) {
        nodes[edge.to].activation = Math.max(nodes[edge.to].activation, pulse.energy * 0.8)
        edge.pulses.splice(p, 1)
      }
    }
  }

  /* Periodically seed ambient pulses from the input layer */
  if (frame % 60 === 0) {
    for (const edge of edges) {
      if (nodes[edge.from].layer === 0 && edge.pulses.length === 0 && Math.random() < 0.3) {
        edge.pulses.push({ pos: 0, energy: 0.3 + Math.random() * 0.3 })
      }
    }
  }
}

/* ─── Renderer ─────────────────────────────────────────────────────── */

/**
 * Draws the current network state to a 2D canvas context.
 *
 * Draw order (back to front):
 * 1. Edges — thin lines, opacity scales with endpoint activation
 * 2. Pulses — glowing dots traveling along edges
 * 3. Node glow halos — visible when activation > 0.15
 * 4. Node bodies — dim white at rest, cyan when activated
 * 5. Input labels — monospace text left of input-layer nodes
 * 6. Output values — decimal readouts right of output-layer nodes
 */
export function renderNetwork(
  ctx: CanvasRenderingContext2D,
  network: Network,
  isMobile: boolean,
): void {
  const { nodes, edges, numLayers } = network
  const lastLayer = numLayers - 1
  const fontSize = isMobile ? 7 : 10
  const labelOffset = isMobile ? 5 : 8

  /* ── Edges + Pulses ────────────────────────────────────────────── */
  for (let e = 0; e < edges.length; e++) {
    const edge = edges[e]
    const a = nodes[edge.from]
    const b = nodes[edge.to]

    const maxAct = Math.max(a.activation, b.activation)
    const baseAlpha = 0.04 + maxAct * 0.12

    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = maxAct > 0.3
      ? `rgba(94, 234, 212, ${baseAlpha})`
      : `rgba(255, 255, 255, ${baseAlpha})`
    ctx.lineWidth = 0.5 + maxAct * 0.5
    ctx.stroke()

    for (const pulse of edge.pulses) {
      const px = a.x + (b.x - a.x) * pulse.pos
      const py = a.y + (b.y - a.y) * pulse.pos

      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(94, 234, 212, ${pulse.energy * 0.12})`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(px, py, 1.8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(94, 234, 212, ${pulse.energy * 0.9})`
      ctx.fill()
    }
  }

  /* ── Nodes ─────────────────────────────────────────────────────── */
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    const act = n.activation

    if (act > 0.15) {
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.radius + 8 * act, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(94, 234, 212, ${act * 0.08})`
      ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(n.x, n.y, n.radius + act * 1.5, 0, Math.PI * 2)
    ctx.fillStyle = act > 0.3
      ? `rgba(94, 234, 212, ${0.3 + act * 0.7})`
      : `rgba(240, 237, 230, ${0.10 + act * 0.5})`
    ctx.fill()
  }

  /* ── Labels + Output Values ────────────────────────────────────── */
  ctx.textBaseline = 'middle'
  const font = `${fontSize}px 'Geist Mono', monospace`

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    const act = n.activation

    if (n.label) {
      const alpha = 0.18 + act * 0.35
      ctx.font = font
      ctx.textAlign = 'right'
      ctx.fillStyle = act > 0.3
        ? `rgba(94, 234, 212, ${alpha})`
        : `rgba(212, 168, 83, ${alpha})`
      ctx.fillText(n.label, n.x - n.radius - labelOffset, n.y)
    }

    if (n.layer === lastLayer) {
      const alpha = 0.2 + act * 0.45
      ctx.font = font
      ctx.textAlign = 'left'
      ctx.fillStyle = act > 0.3
        ? `rgba(94, 234, 212, ${alpha})`
        : `rgba(212, 168, 83, ${alpha})`
      ctx.fillText(n.outputValue.toFixed(3), n.x + n.radius + labelOffset, n.y)
    }
  }
}
