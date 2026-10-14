# Sprint 7: S1 Polish & Rehearsal

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — demo scope and narrative review

## Overview
Run this immediately after Sprints 0–3. Make the single renewal story reliable, readable and easy to present. Sprints 4–6, S2–S5 walkthroughs and a general guided-tour system are not prerequisites. Reserve the final two days of the one-week planning budget for this work. Platform: local browser demo, presented by screen share.

## Tasks

### S1 recovery controls (presenter-only)
- [x] Opt-in presenter mode with a small control menu: **Start, Final offer, Outcome, Notes, Reset**. Three complete scenario fixtures are enough; do not build ordered-step authoring, element highlighting, automatic next-step navigation or shortcuts for five stories.
- [x] `Start`/Reset returns to the clean dashboard; `Final offer` opens the request with requirements submitted and offer ready; `Outcome` opens the completed renewal with exactly one future term and savings entry. Each replaces the whole mutable scenario and clears drafts/chat/timers, so recovery never adds records on top of an old run.
- [x] Buttons are the dependable route. Optional shortcuts: Shift+R reset, Shift+N show final offer at the correct stage, `.` notes. All require presenter mode and ignore inputs, textareas and contenteditable. No arrow-key hijacking or hotkeys that accidentally approve offers.
- [x] Notes remain hidden by default and after reload; the script explains that showing them during screen share exposes them to the audience.

### Polish
- [ ] Side-by-side pass for the main S1 screens using the **verified reference mapping in Sprints 1–3**. Prioritise sidebar recognition, gradient savings card, pipeline, contract hierarchy, AI evidence and the outcome. Do not copy tour blurring, sample values or capture artefacts.
- [x] Review at 1440×900 and 1280×800 with browser zoom at 100%: primary action, headline numbers and evidence are legible. Supporting details may scroll; no requirement to cram every reference element above the fold. Expand AI for its comparison table.
- [ ] Visible focus, labelled controls, modal Escape/focus return, readable status text, hover feedback and brief confirmation toasts. Reduced motion skips decorative movement and chat reveal. Do not add artificial skeleton delays to instant local data.
- [x] Favicon and title `Vertice Demo — Wylie Brown`, with the subtle fictional-data/scripted-AI disclosure. No login/splash work.
- [ ] Remove or explain any apparent action without supported behaviour. Optional S2 replies and Slack illustration may be cut without affecting release readiness.

### Offline build & resilience
- [x] From `app/`, build and serve the production `dist/` through the local preview command. Use a fixed documented port/origin so persisted demo state is predictable. The server must remain running; `file://` is not supported.
- [x] With internet unavailable but localhost running, hard-refresh dashboard and a deep contract/request URL; fonts, logos, icons, routes and both required AI scripts work. No CDN, remote font, analytics or live-model dependency.
- [x] Confirm no console errors on S1, no broken assets, and no external requests during the flow. Keep a tested copy of the build and exact launch instructions.
- [ ] Keep the four key rehearsal screenshots (dashboard, evidence, final offer, outcome) as a fallback beside the script. Optional: a short narrated S1 recording. A zip of dist alone is not a runnable fallback without a local static server.

### Demo script & learning
- [x] `docs/DEMO_SCRIPT.md` starts with the setting, disclosure and discovery question: Alex leads Procurement at fictional Northwind; AI and outcomes are scripted. Recap the problem before touching the UI.
- [x] Write the S1 talk track by **decision**, not by UI control: notice exposure → evidence → agree requirements → expert execution → approve → signed outcome → Finance-ready result. Explicitly narrate the negotiation and contracting time jumps.
- [x] **20-minute run:** 2 minutes discovery/context, 8 minutes S1, 2 minutes platform breadth/real customer proof, 6 minutes discussion, 2 minutes recap and next-step question. **30-minute run:** 3 / 10 / 3 / 11 / 3 minutes respectively. Optional S2 chat fits within breadth time; no deferred-screen tour.
- [x] Prepare a six-minute version that goes straight through S1, plus a one-minute outcome recap for interruptions. Close with the baseline, $274,400 annual reduction, 400 seats, future effective date and a question about the prospect's next renewal.
- [x] Finalise `docs/VALUE_PLAYBOOK.md`: S1 in depth, S2–S5 one-line bridges, relevant customer proof with source paths/URLs and dates where available. An audience should remember visibility, decision evidence, expert support and accountable savings.
- [x] Brief objection answers: existing CLM, source of usage/benchmark data, human versus AI responsibility, guarantee terms, and how this differs from simply routing approvals. Separate published claims from the fictional scenario; no unsourced competitor scoring, universal 20% deal promise or invented Northwind ROI.
- [x] Keep three interview questions about SE discovery, how SEs work with expert buyers, and how success is measured. Other product-roadmap questions from PLAN.md are optional follow-ups, not new demo requirements.

### Rehearsal QA
- [ ] Complete S1 **three consecutive times** from clean state on the production build without internet. Use `/Browser` → `agent-browser` for repeatable checks; at least one pass is a timed spoken presentation with Wylie at the actual screen-share resolution. Capture key screenshots once, reusing them unless a change alters them.
- [ ] Include one recovery pass: reload mid-approval, repeat completion, reset while AI is revealing, type text containing shortcut characters, visit a deferred route, and recover through the three checkpoints. Confirm one savings increment and no stale timers/data.
- [ ] Time the spoken flow. Cut extra tabs, stats or prompts when it runs long; preserve the outcome and return to dashboard. Do not add features during rehearsal.

### Progress note (2026-10-13)
- Done: presenter controls and checkpoints, offline check (resource origins = localhost only), viewport review, title/favicon/disclosure, DEMO_SCRIPT and VALUE_PLAYBOOK with sources verified against the crawl.
- Open: side-by-side polish pass, the four fallback screenshots as a curated set, and **all rehearsal QA**: three clean timed runs, one recovery pass, and Wylie's spoken rehearsal at the real screen-share resolution.
- Note on "offline": verified that no external origins are requested. A literal Wi-Fi-off run is part of rehearsal.

## Validation (front-end-only adaptation)
- [ ] Typecheck, focused calculation/state tests and production build pass once for the final candidate; rerun affected checks only after changes.
- [ ] Record the three S1 run results, timing, viewport and offline setup here. Inspect stored state after completion and reset, and verify it matches the reloaded UI.
- [ ] Link the four reusable screenshots and note any remaining limitation. Do not create a second status report or require evidence for deferred S2–S5 workflows.

## Acceptance Criteria
- [ ] S1 passes three clean offline runs, fits the presentation slot and can recover directly to final offer/outcome.
- [ ] Every shown action works or clearly explains its demo boundary; required AI actions never lead to deferred features.
- [ ] The scenario's deadline, scope, annual reduction and avoided uplift are consistent in UI, script and notes.
- [ ] The script/playbook and fallback screenshots are usable without relying on live AI or the internet. Wylie's spoken rehearsal remains unchecked until it actually happens.

## Notes for Future Developers
- A strong demo ends on a business result and a discovery-led next step. Do not use the remaining time to walk through placeholders.
- This sprint validates demo readiness, not production readiness. No backend, auth, deployment pipeline, telemetry, mobile/native parity or full-product QA suite is required.
