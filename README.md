# Vertice Demo: Salesforce Renewal (S1) + Full Platform Tour

A front-end-only, clickable demo concept of a Vertice-style procurement platform, built for a Sales Engineer interview.

> **Demo concept by Wylie Brown. Fictional data (Northwind Systems), scripted AI, not affiliated with Vertice.**
> Intended for local screen-share only. Not deployed anywhere.

## Run it

```bash
cd app
bun install
bun run build
bun run preview      # http://localhost:4173 (fixed port, so saved demo state is predictable)
```

Development server: `bun run dev` (http://localhost:5173).

Other checks, run from `app/`:

```bash
bun run typecheck
bun run test        # S1 + chapter reconciliation and state-machine tests (41)
bun run lint
```

Offline use: once built, the preview needs no internet. Fonts, icons and logos are bundled, and the AI is scripted. Keep the local server running, because opening `dist/index.html` directly won't work.

## The supported flow (S1)

Dashboard → Salesforce pipeline tile (January) → contract (notice deadline Dec 2, 2026, 50 days) → Vertice AI / benchmark evidence → **Start renewal** → requirements (500 → 400 seats, owner confirms) → Vertice-led negotiation → **Show final offer** → **Approve offer** → **Show signed outcome** → Outcomes ($274,400 / 28%) → dashboard ($1,210,000 → $1,484,400).

All numbers come from one canonical scenario (`app/src/data/scenario.ts`, spec in `roadmap/PLAN.md`), computed in `app/src/domain/selectors.ts`.

## The full demo (chapters)

Every Vertice product, platform module and solution is clickable, told as one connected Northwind year. Plan: `roadmap/FULL-DEMO-PLAN.md`; sprint docs 8–15 in `roadmap/`. Chapters are additive: the S1 path and its numbers are unchanged until you run them.

| Ch | Story | Start at |
|---|---|---|
| B | Buy new software: Slack → Dynamic Intake → vendor risk → parallel Security / AI Compliance / AI Legal → budget-aware approval → DocuSign → contract + PO | `/intake/slack` |
| C | Choose a vendor: 7-step RFP Builder → Vendor Portal onboarding | New request › Select a vendor |
| D | Pay correctly: Contract Price Match catches a $90,000 Zscaler overbill; TeamViewer invoice auto-matches its PO | `/invoices` |
| E | See waste: Analytics, Usage, shadow IT, Asana/monday.com consolidation | `/analytics/spend-insights` |
| E2 | Fix the bottleneck: AI finds it, Workflow Builder adds Jira steps, metrics move | `/insights/procurement` |
| A | Save on a strategic renewal (S1) | `/dashboard` |
| A2 | Ana renews Gong autonomously ($50,000, 24%) | `/contracts/gong/overview` |
| F | AI spend + Cloud Optimizer; commitments hand off to Vertice | `/insights/ai-spend` |
| L | Legal: Contract Center AI (create contract from file, AI comparison, liability Q&A) | `/documents` |

The dashboard goes $1,210,000 → $1,484,400 (S1) → $1,534,400 (S1 + Ana). Cost avoidance and invoice errors appear in Savings but never in Total savings. Help, 11 of the 20 Analytics tabs and a few connectors show an explicit “Available in the full product” card.

## Presenter controls

Open with `?presenter=1` (for example `http://localhost:4173/dashboard?presenter=1`). Presenter mode lasts for the browser tab session; `?presenter=0` turns it off.

| Control | Button | Shortcut |
|---|---|---|
| Clean start (reset) | Start / Reset | `Shift+R` |
| Requirements submitted, final offer ready | Final offer | — |
| Completed renewal, one savings entry | Outcome | — |
| Reveal final offer (only while negotiating) | — | `Shift+N` |
| Presenter notes (S1 beats and every chapter beat) | Notes | `.` |
| Jump to any chapter (Start / Mid / End, keeps other chapters) | Chapters | — |

Shortcuts are ignored while typing in inputs. Notes are closed by default and after reload. They are visible to the audience if you open them while sharing your screen.

## Layout

```
app/        Vite + React + TypeScript (bun)
docs/       Value Playbook and demo script (learning and interview prep)
roadmap/    Plan and sprint docs (S1 committed scope: Sprints 0–3, then 7)
research/   Analysis notes. Scraped source material is git-ignored and kept local only.
```
