# Sprint 3: Vertice AI Assistant (scripted)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — demo scope and narrative review

## Overview
Add the flagship AI moment: turn Salesforce's data into a clear recommendation, show its evidence and offer the next action. S1 is required; two short S2 chat answers are optional breadth after the main story works. No full S2 screens, S4 bottleneck script, live LLM or agent framework. Depends on Sprint 2's routes and state. Platform: standalone web demo only.

Verified S1 reference: `research/tours/unique/01_finance_f3_s02.png` (expanded contract AI with benchmark table). `41_procurement_f2_s05.png` is a workflow screen, not contract AI. Optional S2 references: `37_finance_f2_s01.png`, `27_finance_f2_s02.png`, `31_finance_f2_s03.png` under the same unique directory.

## Tasks

### Panel UI
- [ ] Right drawer with Vertice AI branding, expand and close controls. At narrow width show a concise recommendation; expanded mode accommodates the evidence table without unreadable columns. Reuse shared Drawer/focus behaviour.
- [ ] Empty state greets Alex and offers the two supported S1 prompt chips. The composer also accepts typed variants. No attachment simulation, history-management UI, fake “Thought for 4 seconds” trace or category menu requiring unbuilt scripts.
- [ ] Present answers as recommendation → evidence → caveat/owner decision → next action. The initial savings answer fits in roughly one short paragraph, a compact comparison and one or two actions. Longer explanation is optional disclosure.
- [ ] Mark content as a scripted demo response; benchmark values are illustrative Northwind fixtures. Show immediate feedback on send, then a brief deterministic reveal (roughly 2–4 seconds maximum) with `Show answer` to skip. Reduced-motion preference shows the complete answer immediately.

### Scripted engine (`src/ai/`)
- [ ] Small intent map with chip ids and tested typed aliases. Chips select exact intents; free text uses normalized keywords/context with a confidence threshold. Do not answer a different vendor's query using Salesforce numbers.
- [ ] A response function reads current selectors/request stage at send time. Suggested actions are stage-aware: start/view renewal, view benchmark or view outcome. Buttons invoke the same guarded actions as the ordinary UI.
- [ ] Minimal block types: text, compact table, metric and navigation/action buttons. Skip generic markdown/plugin/agent infrastructure unless already provided by the chosen UI approach.
- [ ] Unknown/ambiguous prompt: “This demo covers the Salesforce renewal. Try one of these questions.” Offer the supported chips, with no invented answer.
- [ ] Cancel/finish the reveal cleanly on close or navigation; reset/checkpoint replacement cancels pending work and clears stale replies. Completed history persists as a snapshot, with the scenario stage recorded; a new question uses current state. On reload, interrupted replies offer a retry rather than resuming an orphaned timer.

### Authored scripts (`src/data/ai-scripts/`, values from selectors)
- [ ] **S1 savings:** “What savings opportunities are there for my Salesforce renewal?” → current cost, quote uplift, usage/owner-approved 400-seat scenario, illustrative benchmark band, **potential** $274,400 annual reduction and separate $117,600 avoided uplift. Explain the 45-seat headroom and need for human validation; actions `View benchmark` and `Start/View renewal`.
- [ ] **S1 renewals:** “What contracts do I have coming up for renewal?” → a concise fixture-derived table with vendor, current cost, notice deadline, renewal date and stage. Distinguish ZoomInfo/Gong's three-day notice dates from Salesforce's 50 days. Actions open actual contract routes; only Salesforce starts the interactive flow.
- [ ] After completion, the same S1 savings intent recognises the simulated signed outcome and future effective date; it no longer offers to start a duplicate renewal or describes the same result as an unacted opportunity.

### Optional AI breadth (not a release gate)
- [ ] **S2 usage:** “Tell me about application usage across my SaaS stack” → a small, explicitly sampled set of existing research vendors and usage figures. No claim to have analysed all 152 apps or live SSO data.
- [ ] **S2 overlap:** “Are there duplicated or overlapping tools?” → existing pairs such as Microsoft/Google and Zendesk/Intercom, with current spend at issue and owner-validation caveats. Overlap is an investigation candidate, not proof either tool can be cancelled. Do not add these opportunities to Salesforce savings or dashboard totals.
- [ ] These replies stand alone within chat; omit buttons to Stack Review, Expert Engage, Workflow Builder or other deferred routes. No Amplitude/Mixpanel deep dive or generic script catalogue.

### Presenter Notes
- [ ] One AI note: “The value is making the next procurement decision with evidence, then turning it into action.” Cite published dataset scale only in the talk track with the source/date from the supplied research; do not claim this local fixture actually accesses that dataset.
- [ ] Ask “Where would your team get this evidence today?” Transition immediately into requirements/expert negotiation instead of dwelling on chatbot mechanics.

## Validation (front-end-only adaptation)
- [ ] On the production build, test both required prompts by chip and typed variants, including a typo, an unknown question and a different vendor. Capture the compact and expanded S1 answer.
- [ ] Navigate through answer actions; repeat after request creation and after completion. Confirm no duplicate request/savings and no stale start-renewal action.
- [ ] Reset during reveal, close/reopen, reload, and use the final-offer checkpoint; no late reply or timer may restore old state. Check notes/reset shortcuts while typing.
- [ ] All amounts and dates equal the contract/benchmark/outcome values. No external requests or live AI calls during chat; local static asset requests are expected.
- [ ] Paste concise evidence here. Validate optional S2 scripts only if implemented.

## Acceptance Criteria
- [ ] S1 AI produces a readable, evidence-led answer promptly and advances the same renewal flow.
- [ ] It handles unsupported questions honestly and reflects the current scenario stage.
- [ ] Offline playback, cancellation and reset work; no pending response corrupts recovered state.

## Notes for Future Developers
- The strongest AI moment is one useful answer followed by a meaningful action. Extra prompts are lower priority than the benchmark and outcome being easy to read.
- No live-model flag or API key handling belongs in this release.
