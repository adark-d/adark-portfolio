export default function LivePulse() {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden cursor-default items-center gap-3 rounded-full border border-stone-200 bg-white/80 px-4 py-2 shadow-lg shadow-stone-200/50 backdrop-blur-md transition-transform hover:scale-105 md:flex">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
      </span>
      <span className="text-xs font-medium tracking-wide text-stone-600">
        London, UK <span className="mx-1 text-stone-300">|</span> Building{' '}
        <strong className="text-stone-800">Residia</strong>
      </span>
    </div>
  )
}
