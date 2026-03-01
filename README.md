<p align="center">
  <img src="public/favicon.svg" width="56" height="56" alt="▲dark." />
</p>

<h3 align="center">Adarkwah.</h3>

<p align="center">
  <em>From raw data to autonomous action. I build the infrastructure in between.</em>
</p>

<p align="center">
  <a href="https://dadark.dev">Live Site</a> · <a href="https://github.com/adark-d">GitHub</a> · <a href="https://www.linkedin.com/in/d-adark/">LinkedIn</a>
</p>

<br />

Custom-built portfolio for David Adarkwah, AI & Data Engineer. Features a real-time neural network canvas visualization, an AI chat assistant powered by Groq (Llama 3.3 70B) that streams answers about David's career, and a kinetic design system with 3D scroll transforms and animated text decryption.

### Stack

- **Next.js 16** — App Router, server-first rendering
- **TypeScript** — strict mode throughout
- **Tailwind CSS v4** — theme-driven, no config file
- **Framer Motion** — scroll animations, drawer transitions
- **Groq + Llama 3.3 70B** — AI chat with streaming and automatic fallback
- **AWS Amplify** — CI/CD, CloudFront CDN, Route 53 DNS

### Running Locally

Requires Node.js 20 LTS and a [Groq API key](https://console.groq.com) for the chat.

```bash
git clone https://github.com/adark-d/adark-portfolio.git
cd adark-portfolio
npm install
echo "GROQ_API_KEY=your_key" > .env.local
npm run dev
```

### Content

All portfolio data lives in `src/data/content.ts`. No component changes needed for updates.

### License

MIT

<br />

<p align="center">
  <sub>Designed and engineered by <a href="https://dadark.dev">David Adarkwah</a></sub>
</p>
