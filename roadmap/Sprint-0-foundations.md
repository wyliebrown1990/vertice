# Sprint 0: Foundations (repo, tokens, data model, Value Playbook)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — demo scope and narrative review

## Overview
Create only the foundations needed for S1. Budget roughly one day; start building the dashboard before expanding a component catalogue. This is a new standalone browser demo, with no existing app or project profile. PLAN.md supplies the project context and the canonical scenario. No Amicai code, native apps, cloud resources or backend work is involved.

## Tasks

### Repo & scaffold
- [ ] Initialise Git inside `vertice_demo/`; confirm the Git root is this directory before any commit (the current parent root is `/Users/wyliebrown`).
- [ ] Ignore `node_modules`, `dist`, `research/raw/html` and original `research/images`; retain research markdown and the references needed for the demo. Do not ship research captures in the app bundle.
- [ ] Scaffold `app/` with Bun, Vite, React and TypeScript. Use compatible scaffold versions and commit the lockfile; do not force older React/router majors from the original draft.
- [ ] Add only the dependencies used by S1: React Router, Zustand, needed Radix primitives, lucide-react, local Inter, and styling helpers; use Tailwind v4 if following the planned styling approach. Add cmdk only when implementing search. No React Flow or broad chart package at foundation time.
- [ ] Define `dev`, `build`, `preview`, `typecheck`, `lint` and a focused `test` command. Ensure typecheck covers the actual app project (including referenced tsconfigs), rather than succeeding against an empty root config.
- [ ] README: exact commands from `app/`, local preview URL, supported S1 flow, presenter controls, fictional data/scripted AI disclosure. All `src/` paths in sprint docs mean `app/src/`; learning docs live at repository-root `docs/`.

### Design tokens & primitives
- [ ] Establish colour, spacing, typography, radius and elevation tokens in `src/styles/tokens.css`, using `research/DESIGN_SYSTEM.md` and the actual app captures. Local Inter, violet active state, savings gradient and light canvas establish recognition.
- [ ] Build shared primitives as S1 needs them: Button, Card, StatusPill, Input/Select, Tabs, Modal/Drawer, Tooltip, Avatar, VendorLogo, KpiCard and a simple sortable/filterable table. Include hover, disabled, labelled input, visible focus and Escape/focus-return behaviour.
- [ ] Add the small SVG spend gauge, pipeline and benchmark plot in their owning sprints. RiskGauge, pricing-score rings, generic chart infrastructure and a complete component gallery are deferred.
- [ ] Keep a lightweight local visual sample only if it speeds up styling; acceptance is recognisable, readable S1 screens, not an indistinguishable replica of every research component.

### Fictional customer dataset (`src/data/`)
- [ ] Implement the **Canonical S1 scenario in PLAN.md** as a single typed fixture. Freeze `asOf` at 2026-10-13. Store USD values consistently and calculate percentages from unrounded values.
- [ ] Convert the 42 strategic vendor rows from `research/PROOF_AND_DATA.md` §3.3 into compact vendor/contract records: stable id, name, one primary owner department, annual value, renewal date and notice deadline. Enrich Salesforce only with the full product, contact, quote and term fields. Derive total spend and counts; do not copy the tour's 75+3 contracts or mix in the research's 152-app population.
- [ ] Add Alex Morgan (Procurement), Julian Hayes (Vertice buyer), and the minimum owner/approver records for S1. Seed only a few dashboard task/notification examples with deliberate destinations.
- [ ] Represent historical completed savings in a separate small record set: total annualized reduction $1,210,000 against current-cost baselines totalling $5,600,000. Assign a record id and completion date to each; the dashboard period is April 2026 to date. Do not add this history to the current contract spend or reuse the research's differently defined quote-discount percentage.
- [ ] `selectors.ts`: strategic portfolio total, department split, live/future counts, pipeline month totals, notice-day labels, request stage and historical-plus-new savings. Weighted savings % = sum of annual reductions / sum of corresponding pre-renewal annual costs; never average percentages directly.
- [ ] Use Salesforce's 355 active / 500 licensed seats and owner-approved 400-seat requirement. Optional S2 chat uses existing research vendor pairs only (e.g. Microsoft/Google, Zendesk/Intercom); no additional vendor models are needed for S1.
- [ ] One focused calculation test proves portfolio reconciliation, relative dates, 400 × $1,764 = $705,600, $274,400 spend reduction, $117,600 separate uplift avoidance, and the $1,484,400 dashboard outcome.

### Demo state store
- [ ] Zustand + persist under `vertice-demo-v1`: one renewal draft/request, its stage and decisions, linked future contract term, completion savings record and chat history. Keep seed fixtures/selectors separate; no budgets, POs, invoices or workflow graphs.
- [ ] Implement the PLAN.md interaction contract. Submission, final-offer reveal, approval and simulated completion are distinct actions; repeated completion cannot duplicate the savings record. Actual flow UI is Sprint 2.
- [ ] `resetDemo()` clears mutations, input drafts, chat and pending timers, and returns to `/dashboard`. On an incompatible saved demo version, restore seed with a brief notice; no migration framework. If storage is unavailable, keep the session usable in memory with a clear persistence notice.
- [ ] Presenter mode is opt-in (`?presenter=1` for entry); mode survives navigation within the session but notes stay hidden on reload. Reset/checkpoint/notes hotkeys ignore inputs and contenteditable. Provide buttons as well as shortcuts.

### Learning deliverables (`docs/`)
- [ ] `docs/VALUE_PLAYBOOK.md` v1: one short entry per S1 beat — buyer problem → screen evidence → decision → outcome → one relevant proof point/source → transition. Procurement-first; CFO value is the clear cost reduction Alex can defend.
- [ ] Add one line each for deferred S2–S5: value, relevant published proof and what is outside this demo. No deep module writeups or full competitor matrix.
- [ ] Keep a brief glossary of terms actually spoken (notice deadline, ACV, TCV, annualized reduction, scope reduction, cost avoidance). Include the fictional-data/published-claim distinction and guarantee wording from PLAN.md.

## Validation (front-end-only adaptation; see PLAN.md)
- [ ] From `app/`, run typecheck, the focused calculation test and production build.
- [ ] Start preview and inspect the visual sample or first dashboard foundation with `/Browser` → `agent-browser`; compare palette/type with `research/tours/unique/18_overview_f1_s01.png`.
- [ ] Inspect `localStorage.getItem('vertice-demo-v1')` after a sample state action, reload, and reset. Confirm reset returns to the fixed-date seed.
- [ ] Paste concise evidence here; no production deployment or backend datastore evidence applies.

## Acceptance Criteria
- [ ] App starts locally; tokens and only the needed primitives are ready for Sprint 1.
- [ ] Scenario calculations reconcile and one reset restores the initial state.
- [ ] VALUE_PLAYBOOK v1 covers S1 and a short deferred-platform bridge.

## Notes for Future Developers
- Preserve real-app visual hierarchy, but never copy sample screen numbers over the canonical Northwind scenario.
- Synthetic benchmark prices illustrate how evidence supports a decision; they are not actual Salesforce quotes or proprietary Vertice data.
- Defer a standalone project profile unless it helps future maintenance; this plan already states the stack, paths, scope and validation method.
