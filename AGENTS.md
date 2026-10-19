# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved design reference — 19 October 2026

The first supplied Windows Codex screenshot is V1: a seven-step Signal → Broker → Trading → Goals → Risk → Filters → Review wizard with a horizontal progress bar and right setup summary. The second is V2: a single workspace with sidebar navigation and stacked Signal Source, Broker, Bot Settings, and Review & Activate modules. Match the app content, not the surrounding Codex chat/browser chrome. Preserve the measured orange (#fa6838), light gray surfaces, Arial typography, spacing, and rounded controls. Reconstruct unseen steps using this same style. Keep both prototypes interactive, local-state-only, and deploy each existing branch to its dedicated existing Vercel project.

## Selected UI refresh — 19 October 2026

This selection supersedes the historical screenshot styling above. Option 1 (Precision Workspace), adapted to the seven-step wizard with NO left navigation bar. Keep the existing horizontal progress and right setup summary. Preserve all existing fields, validation, dependency order, connection simulations, review, activation, monitoring, reset, and demo flows. Use self-hosted Inter typography, orange #fa6838 accents, readable muted text, restrained borders, compact controls, and consistent spacing across every state.

Selected source: `docs/design/selected-refresh.png`.
