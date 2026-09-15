# FlyRank AI Front-end AI Engineering Capstone

An AI shopping agent built as part of the FlyRank AI Front-end AI Engineering track. Users describe what they're shopping for in natural language, and the assistant searches real product listings, compares them, and explains its recommendations — powered by an LLM with tool-calling, not a static search form.

**Live app:** https://flyrank-ai-capstone-anu.vercel.app/

## Features

* **Streaming AI chat** — real-time token-by-token responses via the AI SDK and Google Gemini, with a working stop button and multi-turn memory
* **Real product search** — a `searchProducts` tool backed by SerpApi's Google Shopping engine (India-targeted), returning real prices, links, and images — never invented data
* **Decision board** — product cards and a side-by-side comparison table, both driven live by the assistant's actual search results
* **Interactive shader hero** — a fragment-shader hero at `app/shader-hero` using `u_time`, `u_resolution`, and `u_mouse` uniforms, with capped device pixel ratio, tab-hidden pausing, and a static gradient fallback for `prefers-reduced-motion`
* **Accessible components built from scratch** — a hand-built Modal, Tabs, and Disclosure implementing the W3C ARIA Authoring Practices, compared against shadcn/ui in `app/playground/NOTES.md`
* **Resilient error handling** — a root `error.tsx` boundary, a chat-level retry banner for failed messages, layout-matched loading skeletons, and designed empty states with clickable example prompts
* **Motion Button demo** — a fully choreographed Send button (idle → loading → success/error → idle) with reduced-motion support
* **3D product viewer** — an interactive React Three Fiber scene with a live material/color configurator
* **Tested and CI-enforced** — Vitest + React Testing Library component tests, one Playwright end-to-end test (with the AI route mocked, never hitting the real API), and a GitHub Actions workflow that blocks merges on failure

## Tech Stack

* Next.js, React, TypeScript, Tailwind CSS
* AI SDK + Google Gemini for streaming chat and tool calling
* SerpApi (Google Shopping) for real product data
* shadcn/ui, React Three Fiber + drei + leva
* Vitest, React Testing Library, Playwright
* Vercel for deployment

## Getting Started

```bash
npm install
```

Create `.env.local` with:

```text
GOOGLE_GENERATIVE_AI_API_KEY=your-key-here
SERPAPI_API_KEY=your-key-here
MOCK_MODE=false
```

Set `MOCK_MODE=true` to use built-in mock product data during UI development without spending SerpApi quota.

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Running tests

```bash
npm run test          # Vitest component tests
npx playwright test   # end-to-end test
```

## Project Structure

```text
flyrank-ai-capstone/
│
├── app/
│   ├── (shop)/
│   │   ├── ...                 # Main shopping/product routes
│   │   └── ...
│   │
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Streaming AI chat + tool calling
│   │
│   ├── playground/
│   │   ├── ...                 # Standalone UI experiments
│   │   ├── 3d-viewer/          # Interactive 3D product viewer
│   │   └── motion-button/      # Motion button state-machine demo
│   │
│   ├── shader-hero/            # Interactive fragment-shader hero
│   │
│   ├── error.tsx               # Root error boundary
│   └── ...
│
├── components/
│   ├── chat/
│   │   ├── ChatPanel.tsx
│   │   ├── ToolProductCard.tsx
│   │   └── ...
│   │
│   ├── filters/
│   │   └── BudgetFilter.tsx
│   │
│   └── ui/
│       └── ...                 # Reusable UI components
│
├── lib/
│   ├── ai-config.ts            # AI model + system prompt configuration
│   └── tools/
│       └── searchProducts.ts   # Product search tool
│
├── e2e/
│   └── ...                     # Playwright tests
│
├── public/
│   └── models/
│       └── headphones.glb      # 3D model asset
│
├── .github/
│   └── workflows/
│       └── ...                 # GitHub Actions CI
│
├── .env.local                  # Local secrets — not committed
├── package.json
└── README.md
```

## `searchProducts` Tool

The `searchProducts` tool searches real product listings via SerpApi's Google Shopping engine (or a small mock dataset when `MOCK_MODE=true`), filtered by category, budget, and shopper priorities.

### Input Schema

| Field        | Type                  | Description                                                             |
| ------------ | --------------------- | ----------------------------------------------------------------------- |
| `category`   | `string`              | The product category to search for, such as laptops or headphones.      |
| `maxPrice`   | `number` (optional)   | The maximum acceptable price for the product.                           |
| `priorities` | `string[]` (optional) | The product qualities that matter most, such as battery life or budget. |

### Return Shape

```ts
{
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    batteryLife: string;
    matchReasons: string[];
    link: string; // real product URL, never invented
  }>;
}
```

Budget filtering happens in code against the real `extracted_price` returned by SerpApi, not just via the search query text. Rate-limit (429) responses are surfaced as a distinct error, separate from generic failures.

## Shader Hero

An interactive fragment-shader hero located at `app/shader-hero`. The shader uses `u_time`, `u_resolution`, and `u_mouse` uniforms to create a responsive visual effect.

For performance, the shader caps the device pixel ratio and pauses rendering when the browser tab is hidden. When `prefers-reduced-motion` is enabled, it falls back to a static gradient instead of running the animation.

## 3D Model Viewer

An interactive headphones product viewer built with React Three Fiber, with a live configurator (color, metalness, roughness, wireframe, auto-rotate) via leva.

**Perf note:** 1,557 kB / 2,202 kB transferred and ~60 FPS — measured via Chrome DevTools Network/Performance tabs. The canvas is lazy-loaded via `next/dynamic` (`ssr: false`) so the Three.js bundle is never loaded outside this route, and a single low-poly model was used to avoid needing DRACO/meshopt compression. A static fallback image renders instead of the canvas when `prefers-reduced-motion` is enabled.

**With more time:** drag-and-drop custom GLB upload, multiple product models, and compression tooling for larger assets.

### 3D Model Credit

Headphones 3D model by Ginsta, downloaded from Poly Pizza. Licensed under CC-BY.

## Status

Core AI shopping flow, real product search, error handling, accessibility components, automated testing/CI, and supplementary interaction assignments (motion button, shader hero, 3D viewer) are complete and deployed. See individual assignment notes in `app/playground/` for details on specific builds.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
