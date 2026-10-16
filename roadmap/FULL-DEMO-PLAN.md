# Full Demo Plan: Every Vertice Product & Solution in One Northwind Journey

> **PROGRESS TRACKING**: Planning doc for the post-S1 "full platform" demo. It extends `PLAN.md` and does not replace it.
> Track build progress in the sprint docs it creates or rescopes. Do NOT create separate status documents.
> Last updated: 2026-10-15 by Claude (Beans-bot): **Sprints 8–14 built and verified; Sprint 15 automated QA done, spoken rehearsal open.** Source: a fresh visual audit of vertice.one (below).

## 1. Why this plan exists

The S1 demo (Salesforce renewal) covers **SaaS Purchasing** end-to-end and touches Pricing Benchmarks, Contracts and Vertice AI. Every other module is a sidebar entry that opens the "Outside this demo" card. A fresh audit of the website on 2026-10-15 found **27 distinct products, platform modules and solutions**. Several of them appear in no current sprint doc: **Procure-to-Pay as a product, Vendor Onboarding, Ana as a top-level product, AI Cost Optimization, Integrations/Settings and the Cloud Engineers solution**.

This plan does four things:
1. Inventories everything on the site and its coverage today (§3).
2. Defines the **correct user journey**: Vertice's own intake → pay → renew lifecycle, told as one connected Northwind year (§4).
3. Defines the data threads that let the chapters reconcile (§5).
4. Re-sequences the deferred sprints into a buildable order (§7).

**The S1 interview path stays frozen.** The interview demo is unchanged. Every chapter below is additive, starts from its own checkpoint, and must never break the S1 click path or its numbers.

## 2. Source: 2026-10-15 visual audit

- **Method:** six parallel agents used `agent-browser`. They screenshotted every viewport, carousel frame and tab state of every Product and Solution page, plus all four Navattic product tours (about 75 steps; the Jul 2026 app captures were read from the tour's public DOM snapshots).
- **Where the material is:** notes and about 600 screenshots are in `research/site-audit-2026-10-15/` (git-ignored, local only, like the rest of the scraped material).
  - `products.md`: Intake-to-Procure, SaaS Purchasing, Procure-to-Pay
  - `platform-a.md`: Dynamic Intake, Workflow Builder, Sourcing, Vendor Onboarding, Risk Management, Expert Engage
  - `platform-b.md`: Contract Center, Budget Management, Pricing Benchmarks, Insights Hub, Usage Analytics, Integrations
  - `ai-other.md`: Vertice AI (12 agents), Ana, AI Cost Optimization, Cloud Cost Optimization, Cloud Engineers
  - `solutions.md`: Finance, Procurement, IT & Security, Legal, Pricing/packaging, Challenge menu mapping
  - `tour.md`: ordered screen-by-screen record of the real app: sidebar, 20 Analytics tabs, workflow palette

**What changed on the site since the 2026-10-13 research crawl:**
- **Products menu:** now lists three products: Intake-to-Procure, SaaS Purchasing and **Procure-to-Pay** (new).
- **Ana:** a top-level nav item with its own landing page (`/ana`). The banner reads "Introducing Ana, our AI negotiation agent".
- **Benny:** "Meet Benny" is a marketing mascot campaign, not a product. Ignore it for the build.
- **Two new modules:**
  - **AI Cost Optimization**, with tabs Spend / Usage / Commitments / Alerts / Setup. It is also a tab inside Analytics.
  - **Vendor Onboarding**: a Vendor Portal with questionnaire tasks.
- **Intake-to-Procure scope:** the pricing page now says it covers **all indirect spend**, not just SaaS.
- **Real-app sidebar** (Jul 2026 tour): Insights adds a **Savings** entry, and Workflows splits into **Configuration · Templates**. There are also **Cloud Optimizer**, **Accounting ▸ Invoices** and **Settings** sub-menus (Compliance, Integrations, …).
- **Do not show:** the Procure-to-Pay FAQ calls goods-receipt (three-way) matching **"planned"**. Show two-way (contract/PO ↔ invoice) matching only.

## 3. Coverage matrix: everything on the website vs the demo today

Legend:
- ✅ built in S1
- ◐ partial
- ○ placeholder ("Outside this demo")
- ✗ absent from both the app and every sprint doc

| # | Website item | Menu group | Today | Earlier sprint home | Chapter (§4) | Hero moment to recreate |
|---|---|---|---|---|---|---|
| 1 | **SaaS Purchasing** | Product | ✅ | S0–3 | A | Dashboard → renewal → expert negotiation → savings |
| 2 | **Intake-to-Procure** | Product | ○ (modal options disabled) | Sprint 4 | B | Request → auto-routed parallel reviews → PO |
| 3 | **Procure-to-Pay** | Product | ○ (POs, Invoices, Catalog placeholders) | Sprint 6 (partial) | D | Invoice auto-captured → "Exceeds contract by $X" → routed |
| 4 | **Ana** (AI negotiation agent) | Top nav / Product | ✗ (talk track only) | Sprint 6 "workspace" | A2 | "Negotiate my Gong renewal": plan → email thread → "Negotiation complete" |
| 5 | Dynamic Intake | Platform | ◐ (renewal requirements modal only) | Sprint 4 | B | Slack upload of an order form → AI pre-fill "3 fields filled"; preferred-vendor card |
| 6 | Workflow Builder | Platform | ○ | Sprint 5 | B (runtime), E2 (editor) | Bottleneck → AI "take me to the flow" → add Jira step → Set as Live |
| 7 | Sourcing | Platform | ✗ | Sprint 6 (one line) | C | 7-step RFP Builder → "Vertice recommendation 9/10" → Onboard |
| 8 | Vendor Onboarding | Platform | ✗ | — | C | Questionnaire task (banking details) sent through the Vendor Portal |
| 9 | Risk Management | Platform | ✗ | Sprints 4/5 | B | High-risk gauge → "Show alternatives" |
| 10 | Contracts / Contract Center | Platform | ◐ (list, overview, outcomes) | S2 | A, B, cross-cut | AI summary; "Create contract from file"; "AI Comparison: auto-renewal clause added"; liability Q&A across documents |
| 11 | Budget Management | Platform | ✗ | Sprint 6 | B, D | Approval shows "This request takes 16% of the IT budget" → budget detail |
| 12 | Pricing Benchmarks | Platform | ◐ (benchmark tab) | S2 | A, B | Benchmark Pricing modal → "+8.3% over" → Pricing Clarity Score |
| 13 | Insights Hub | Platform | ○ | Sprint 5 | E | AI prompt → Analytics: SaaS Stack Matrix, Savings & ROI |
| 14 | Usage Analytics | Platform (footer) / Challenge | ◐ (AI chat only) | Sprint 5 | E, A | Expand a vendor's utilization → Stack Consolidation (two overlapping tools) |
| 15 | Expert Engage | Platform (footer) | ○ | Sprint 5 | A, C | "Book a Procurement Expert" → service → time slot |
| 16 | Vertice AI (12 agents) | Platform / AI & Agents | ◐ (4 scripted intents) | S3 | Every chapter | Each chapter shows at least one named agent at work |
| 17 | Integrations | Other | ✗ | — | Cross-cut (Settings) | Integration chips in the flow; Settings ▸ Integrations grid |
| 18 | Cloud Cost Optimization | Other | ✗ | Sprint 8 stretch | F | AWS savings tree → Optimization Tests → RIO → EDP renewal |
| 19 | AI Cost Optimization | Other | ✗ | (Sprint 8 "AI Spend") | F | AI spend by model → "Right-size commitment" → commitment renewal |
| 20 | Solution: Finance | Team | ◐ (Priya is a beneficiary) | — | Persona cut | Savings & ROI, Budgets, invoice leakage |
| 21 | Solution: Procurement | Team | ✅ (Alex) | — | Persona cut | S1 + intake + bottleneck |
| 22 | Solution: IT & Security | Team | ✗ | — | Persona cut | Shadow IT → risk review → security approval |
| 23 | Solution: Legal | Team | ✗ | — | Persona cut | Legal agent check → Contract Center AI → legal approval task |
| 24 | Solution: Cloud Engineers | Team (footer) | ✗ | — | Persona cut | Optimization Tests, RI automation, forecast |
| 25 | Challenge: Reduce software spend → SaaS Purchasing | Challenge | ✅ | | A | |
| 26 | Challenge: Spend visibility & governance → Usage Analytics; Streamline procurement ops → I2P; Contract management → Contract Center | Challenge | mixed | | E, B, A | |
| 27 | Challenge: Supplier risk reduction → Risk Management; Manage your suppliers → Vendor Onboarding | Challenge | ✗ | | B, C | |

**The 12 Vertice AI agents and where each appears in the demo:**

| Agent | Chapter | What the viewer sees |
|---|---|---|
| Conversational Intake | B | Slack: requester uploads an order form, then "Review purchase details" |
| Compliance | B | Workflow node "Vertice AI – Compliance" checks payment terms and billing against Settings ▸ Compliance preferences |
| Legal | B | "Legal Check" of the MSA (termination, liability, IP) against Legal preferences |
| TPRM | B | Vendor risk gauge with an AI narrative, then "Show alternatives" |
| Benchmarking | A, B | Benchmark band and "+x% over" |
| Vendor Analysis | E | Analytics recommendations |
| Sourcing | C | RFP Builder: suggested vendors, drafted questions, scoring |
| Document Analysis | A (cross-cut) | "Do any contracts mention uncapped liability?" → Liability Risk Overview |
| Analytics | E, F | Insights answers, AI Cost tab |
| Tech Consolidation | E | Asana vs monday.com overlap → consolidation request |
| Workflow | E2 | "Take me to the flow" → bottleneck node highlighted |
| Email | A2 | Ana's drafted vendor emails / renewal kickoff |

## 4. The user journey: one Northwind year, intake to renewal

Vertice sells a lifecycle, so the full demo follows the lifecycle a buyer lives through. Each module appears where it naturally belongs. Every handoff named below appears on Vertice's own pages (see the audit's "journey/handoffs" sections).

```
            ┌─────────────── Dashboard (home base: savings, pipeline, tasks, requests) ───────────────┐
            │                                                                                         │
  NEED ──► B. Intake-to-Procure ──► (no vendor yet?) C. Sourcing ──► Vendor Onboarding                │
            │  Dynamic Intake · Workflow · Risk ·        RFP Builder · Expert Engage                    │
            │  Compliance/Legal agents · Budget                                                          │
            ▼                                                                                         │
       Approve & sign ──► Contract Center ──► D. Procure-to-Pay (PO → invoice → match → pay)          │
                                                 Budget Management · Integrations (ERP)               │
                                                                                                      │
  USE ──► E. Insights Hub · Usage Analytics · Procurement insights ──► E2. Workflow Builder fix       │
            │                                                                                         │
            ▼                                                                                         │
  RENEW ──► A. SaaS Purchasing renewal (S1, expert-led, strategic)                                    │
            A2. Ana renewal (autonomous, long-tail)              ◄── F. AI & Cloud Cost Optimization ─┘
                                                                     (commitment renewals feed A/A2)
```

### Chapter order for the full platform tour (about 25–30 min, lifecycle order)

| Ch | Title | Persona(s) | Click path (each step = one screen or state) | Modules covered | Outcome landed |
|---|---|---|---|---|---|
| **0** | Home base | Alex (Procurement) | Dashboard: Total savings, Savings opportunity card, Pipeline, My active tasks, Requests table | Dashboard, Vertice AI orb | "Everything starts from one front door and one view" |
| **B** | Buy new software (I2P) | Sam (requester, Support) → Alex → Dana (IT Security) → Leah (Legal) → Priya (Finance) | (1) Slack: Sam uploads an order form; Conversational Intake replies → (2) Dynamic Intake: AI pre-fill, Downgrade/Flat/Upgrade question absent (new purchase), budget question → "In budget" → (3) Request created; **Workflow tab** shows the live I2P flow → (4) TPRM: requested vendor scores **High** on Security & Privacy → **Show alternatives** → swap to the recommended vendor → (5) parallel nodes: Vertice AI – Compliance ✓ and Vertice AI – Legal (flags a 60-day auto-renewal clause) → (6) Benchmark inline: quote vs band → (7) **Commercial Approval** with budget impact ("x% of Support budget") → approve in a Slack card → (8) Sign via DocuSign (simulated) → **Create SaaS contract** → **Create purchase order** "Synced to NetSuite" → (9) "Request complete in 6 days · benchmark 14.6 days" | Intake-to-Procure, Dynamic Intake, Workflow (runtime), Risk Management, Compliance/Legal/TPRM/Intake agents, Pricing Benchmarks, Budget Management, Integrations, Contracts | One front door; policy-based parallel reviews; risk caught before purchase; PO with no handoff |
| **C** | Choose a vendor (Sourcing + Onboarding) | Leah (Legal, requester) → Alex → Vertice expert | (1) New request: **Select a vendor (request for proposal)** → (2) RFP Builder steps 1–7: suggested vendors, must-have integrations and weighting sliders, "Vertice drafted 12 questions" → Approve & send, progress (Response received / Reminder sent), comparison scored against the weightings, **Vertice recommendation 9/10** → (3) **Onboard [winner]** → (4) Vendor Portal: questionnaire task (Banking details, SOC 2 upload) → "Task sent to vendor" → vendor record created (Overview / Contracts & Requests / Documents / Vendor Portal / Notes). Side door: **Book a Procurement Expert** (Expert Engage RFP service) | Sourcing, Expert Engage, Vendor Onboarding, Vendor directory, Risk | Competitive sourcing in days; supplier data collected once |
| **D** | Pay correctly (Procure-to-Pay) | Priya (Finance) | (1) Purchase orders list: Committed / Invoiced / Paid / Free bar; PO from Ch B → (2) Invoices: Zscaler invoice arrives, **Review Invoice** (form beside the PDF, AI-captured fields, GL codes) → (3) **Contract Price Match** node: billed $330,000 vs contracted $240,000 → **+$90,000 flagged** (the price negotiated in Sep was not applied) → send back to vendor → (4) Ch B invoice auto-matches its PO → **Controls & Permissions** rule "≥ $5,000 → Dept owner + Finance" → approve → "Paid · synced to NetSuite" → (5) Budget Overview: FY27 org → IT department, Actual vs Projected. Side door: **Catalog purchases** (Amazon Business punchout) | Procure-to-Pay, Budget Management, Integrations (ERP) | Negotiated savings are protected at invoice time; budget stays live |
| **E** | See waste (Insights + Usage) | Priya + Alex; Dana for shadow IT | (1) Ask Vertice AI "Show my highest-cost vendors where I have the most negotiation leverage" → **Analytics** with tabs Recommendations, Benchmarking, Savings and ROI, Spend Insights, Cost/Cash Forecast, SaaS Stack Matrix, AI Cost Optimization (the rest of the 20 tabs show an "Available in full product" card) → (2) **Usage**: Atlassian expands (Jira/Confluence), utilization bars, Okta source → (3) **Stack Review**: shadow-IT "Unapproved" apps → (4) **Tech Consolidation**: Asana 41% + monday.com 39% → "Create consolidation request" (opens a renewal request with Downgrade preset) | Insights Hub, Usage Analytics, Vendor Analysis/Analytics/Tech Consolidation agents | Waste identified; the action feeds back into renewals |
| **E2** | Fix the bottleneck | Alex | (1) Insights ▸ Procurement: tasks/requests tiles, Task Completion Time histogram, Request Cycle Time → (2) Ask "What's my main bottleneck?" → "Security Review adds 4.8 days. Add a Jira step?" → **Take me to the flow** → (3) Workflow Builder (Configuration): IT Approval node shows "1 warning" → drag **Create Jira Ticket** in, warning clears → **Set as Live** → (4) Back to insights: overdue count drops. Also browse **Templates** (SaaS purchase, SaaS renewal, IT hardware, Vendor onboarding, Contractor) | Workflow Builder, Procurement insights, Workflow agent, Integrations (Jira) | The process improves itself, without IT tickets |
| **A** | Save on a strategic renewal (**S1, built**) | Alex, Jordan | Unchanged S1 path, plus optional enhancements: AI-generated contract summary, AI Comparison of order forms, "Key renewal stats", Pricing Clarity Score, Expert Engage booking | SaaS Purchasing, Pricing Benchmarks, Usage, Contract Center, Expert Engage | $274,400 (28%) |
| **A2** | Let Ana renew the long tail | Alex | (1) Gong (notice in 3 days, 52% utilization) → **Negotiate with Ana** → (2) Contract pane reads the order form → (3) Negotiation Plan ticks: benchmark, strategy, 3 scenarios, email drafted → (4) human approves the opening email → (5) thread: Sent / Received (vendor counter) / Sent → (6) **Negotiation complete** card: $ saved, % off, term, hours saved → (7) Approval → outcome joins the savings ledger | Ana, Email agent, Benchmarking agent | Experts for strategic deals, Ana for the long tail; both are human-approved |
| **F** | Beyond SaaS: AI & cloud | Priya + a cloud engineer (new persona) | (1) **AI Cost Optimization**: monthly AI spend by provider/model (Anthropic, OpenAI, Cursor are already in the portfolio); recommendations (cheaper model, right-size commitment, dept spend vs benchmark); Commitments burn-down "85% used" → **Start Anthropic renewal** (notice 2026-12-16) → hands to A/A2 → (2) **Cloud Optimizer**: Clarity savings tree → Optimization Tests table → RIO effective rate vs on-demand → EDP renewal → Expert Engage | AI Cost Optimization, Cloud Cost Optimization, Cloud Engineers solution | One view across SaaS, AI and cloud spend |

### Persona cuts (5–8 min each; same chapters, different order)

| Solution page | Cut | Opening question |
|---|---|---|
| Procurement | 0 → B → E2 → A | "How many places can someone buy software today?" |
| Finance | 0 → E (Savings and ROI, Forecast) → D → F (AI spend) | "How confident are you in next year's software forecast?" |
| IT & Security | E (shadow IT) → B steps 4–5 (risk, alternatives, security approval) → Settings ▸ Integrations | "How do you find tools nobody approved?" |
| Legal | B step 5 (Legal agent) → Contract Center (liability Q&A, AI Comparison, create from file) → Settings ▸ Legal preferences | "How many contracts auto-renew without Legal seeing them?" |
| Cloud Engineers | F (cloud) → Expert Engage (EDP) | "Who owns your AWS commitment renewal?" |
| **Interview (unchanged)** | S1 only, with a 60–90 s verbal bridge naming B, A2 and F | "Which upcoming renewal would be worth reviewing first?" |

## 5. Data threads (one coherent Northwind; all numbers proposed, finalise in Sprint 8)

Rules from `PLAN.md` still apply: one canonical source, derived numbers computed and never typed twice, with fictional, illustrative and published figures kept distinct. New rules:
- **Use fictional vendor names for any negative finding** (high risk scores, losing RFP bids, shadow IT "unapproved" when it implies wrongdoing). Real vendors appear only in neutral or positive roles. Vertice's own site uses real names here, but a candidate's demo should not invent risk scores for real companies.
- **Ledger:** savings on the dashboard = `savingsHistory` plus completed chapter outcomes. Each chapter's completion adds exactly one ledger entry, exactly as S1 does today.

| Thread | Proposed data | Reconciles with |
|---|---|---|
| **S1** (built) | Salesforce $980,000 → $705,600; **+$274,400** | Baseline $1,210,000 → $1,484,400 |
| **A2 Ana** | Gong $210,000, 200 seats, 52% util → **160 seats × $1,000 = $160,000**; **+$50,000 (24%)** = $42,000 scope + $8,000 price; 9% uplift ($18,900) avoided separately; ~28 h saved; 24-month price lock | Dashboard after S1 + A2 = **$1,534,400**. Gong is already seeded as "Notice in 3 days" (deadline 2026-10-16) |
| **B I2P** | New people: Sam Okafor (Support Lead, requester), Dana Kim (IT Security), Leah Brooks (Legal Counsel). Request: remote-support tool, 60 seats. Requested vendor **"LinkDesk Remote"** (fictional) → High risk → alternative TeamViewer Business. Quote $54,000; benchmark band $780–$860/seat; negotiated 60 × $840 = **$50,400** (+$3,600 vs quote = cost avoidance, not annual reduction). Routing: above $50,000 → Legal review. Budget impact against the Support FY27 budget | PO-1042 $50,400 in Ch D; contract appears in Contracts (43rd row, "Not yet live") |
| **C Sourcing** | Legal's contract-AI RFP; 4 fictional bidders (Clausewise, Lexora, Draftly, Pactly); weights Security 30 / Functionality 30 / Price 25 / Integrations 15; Lexora 9/10 at $120,000 | Vendor record + onboarding task; optional PO |
| **D P2P** | Zscaler renewed 2026-09-15 at $240,000 (`savingsHistory` baseline $330,000 − $90,000). October invoice bills $330,000 → **Contract Price Match +$90,000**. PO-1042 invoice matches exactly | Protects an existing ledger entry, so no new savings are double-counted. Show as "Savings protected: $90,000" |
| **E Usage** | Asana (Marketing, 41%) + monday.com (Operations, 39%) overlap → consolidate onto Asana; monday.com $60,000 avoidable at its 2027-04-20 notice | Creates a draft request only; savings stay "Opportunity" until completed |
| **E2 Bottleneck** | Security Review median 4.8 days → 1.9 days after the fix; overdue tasks 3 → 0 | Store flag `bottleneckFixed` (as in Sprint 5) |
| **F AI** | AI vendors already in the portfolio: Anthropic $380,000, OpenAI $540,000, Cursor $95,000 = **$1,015,000/yr** (~$84,600/mo). Potential savings ~8% | Anthropic notice 2026-12-16 links to a renewal |
| **F Cloud** | **Separate dataset**: Northwind AWS (not in the 42-contract SaaS portfolio, per PLAN.md). EDP commitment, savings tree, Optimization Tests | Never added to the SaaS portfolio totals |

## 6. Cross-cutting work (needed by several chapters)

1. **Sidebar IA → current real app (Jul 2026 tour).** The new structure:
   - Dashboard · Tasks · Requests · Contracts · Documents (New)
   - Offers · Catalog purchases · Purchase orders · Orders · Invoices · Savings
   - Insights ▾ (Analytics · Procurement · Savings · Usage)
   - Vendors ▾ (Directory · Expert Engage)
   - Workflows ▾ (Configuration · Templates)
   - Cloud Optimizer ▾ (Overview · Optimization · RI Optimizer · PPA/EDP)
   - Help · Settings ▾ (Company profile · Compliance · Integrations · Manage users)

   **Ana** is reached from a contract or request ("Negotiate with Ana"), not from a sidebar entry. The real sidebar has no Ana entry, so this is a deliberate assumption; raise it in the interview.
2. **Chapter checkpoints.** Presenter controls get a chapter picker. Each chapter gets Start / Mid / End fixtures, generalising S1's Start / Final offer / Outcome. Reset still restores the S1 clean start.
3. **Generic request engine (light).** Requests get types `renewal | new-purchase | rfp | consolidation | ana-renewal`, each with a fixed stage list and a workflow definition, rendered by one read-only Workflow tab. This is still **not** a general BPMN engine: each workflow is authored data with fixed transitions.
4. **Settings.** Integrations grid with the 9 categories from the site (ERP, Communication, SSO/usage, Budgeting, Legal, TPRM, Data, Ticketing, HRIS) and "Connected" chips. Compliance and Legal preferences grids (Accepted / Requires Review / Not Accepted), which visibly drive the agents in Ch B.
5. **Vertice AI.** Add intents per chapter: bottleneck, leverage vendors, uncapped liability, budget impact, AI spend. Keep the authored-script architecture. Add "action" answers that navigate ("Take me to the flow").
6. **Contract Center depth.** Contract tabs to match the real app: Overview · Details · Savings · Documents · Outcomes · Notes. Add an AI-generated summary, contract lineage, "Create contract from file" (simulated extraction) and AI Comparison.
7. **Dashboard additions.** Savings Opportunity card (Deduplication · Term commitment), Requests table and Costs forecast, all derived from the chapter data.

## 7. Build sequence (re-sequenced sprints)

Build priority differs from journey order. The order is: the cheapest wins on what Vertice is promoting hardest (Ana, I2P), then breadth.

| Sprint | Scope | Chapters unlocked | Replaces / absorbs | Notes |
|---|---|---|---|---|
| 7 *(open)* | Finish S1 rehearsal | Interview | — | **Do first.** Nothing below gates the interview |
| **[8](Sprint-8-full-demo-foundations.md)** ✅ | Foundations for multi-chapter: sidebar IA update, chapter checkpoint system, request-type model, new people/vendors/data threads (§5), Settings (Integrations, Compliance/Legal prefs), Contract tabs, AI intent registry | — | new | All §5 numbers become canonical here, with reconciliation tests like S1's |
| **[9](Sprint-9-ana-contract-center.md)** ✅ | **Ana (A2)** + Contract Center AI (summary, AI Comparison, liability Q&A) | A2, Legal cut | part of old Sprint 6 | Reuses the S1 renewal machinery, so cheapest. Ana is the site's headline launch |
| **[10](Sprint-10-intake-to-procure.md)** ✅ | **Intake-to-Procure (B)**: Slack intake mock, Dynamic Intake + AI pre-fill + preferred vendors, Workflow tab (read-only canvas), TPRM + Show alternatives, Compliance/Legal agent nodes, budget-impact approval, Slack approval card, Create contract + PO stub, completion banner | B, Procurement + IT cuts | old Sprint 4 + risk part of Sprint 5 + budget part of Sprint 6 | Update Sprint-4 doc rather than writing a new one |
| **[11](Sprint-11-insights-usage-workflows.md)** ✅ | **Insights + Usage + Workflow Builder (E, E2)**: Analytics (7 built tabs, 13 "available in full product"), Procurement insights, Usage + Stack Review + Consolidation, Workflow Configuration editor + Templates gallery, S4 bottleneck change | E, E2, Finance cut (partial) | old Sprint 5 | React Flow arrives here (if used for the B canvas too, move it to Sprint 10) |
| **[12](Sprint-12-sourcing-onboarding.md)** ✅ | **Sourcing + Vendor Onboarding + Expert Engage (C)**: RFP Builder (7 steps), Vendor Portal questionnaire, Vendor directory record, Expert Engage service grid + booking | C | Sourcing line of old Sprint 6 + Expert Engage of Sprint 5 + **new** Vendor Onboarding | |
| **[13](Sprint-13-procure-to-pay.md)** ✅ | **Procure-to-Pay (D)**: POs list + detail, Invoices + Review Invoice, Contract Price Match, Controls & Permissions, Budgets overview/detail, Catalog punchout (static) | D, Finance cut | rest of old Sprint 6 | Two-way match only (three-way is "planned" on Vertice's FAQ) |
| **[14](Sprint-14-ai-cloud-cost.md)** ✅ | **AI & Cloud (F)**: AI Cost Optimization (Spend/Usage/Commitments/Alerts tabs), Cloud Optimizer (Clarity, Optimization Tests, RIO, EDP), Cloud Engineers persona | F, Cloud cut | old Sprint 8 stretch | Cloud screens use Vertice's magenta/navy variant |
| **[15](Sprint-15-full-demo-rehearsal.md)** ◐ | Full-tour rehearsal: three timed runs of the 25–30 min tour and each persona cut; fallback screenshots per chapter | All | — | Same evidence rules as Sprint 7 |

**Cut line if time is short:** finish Sprints 8 → 9 → 10 first. Those give S1 plus Ana plus I2P, which covers all three named products and five agents. Everything after them is breadth.

## 8. Acceptance for the full demo

- [x] Each of the 27 items in §3 is either clickable in a chapter or explicitly shown as an "Available in full product" card reached from its real menu location; no dead ends (56-route sweep, 2026-10-15)
- [x] All 12 agents appear in at least one chapter (§3 agent table; agent chips label each one on screen)
- [x] Every dashboard and ledger number reconciles after any combination of completed chapters (`domain/chapters.test.ts`)
- [x] S1 interview path and its numbers are unchanged when no other chapter has run (S1 tests untouched and passing; three clean production runs)
- [x] Each chapter has working Start / Mid / End checkpoints (Start/End where Mid adds nothing) and survives reload
- [x] No three-way matching, no live LLM, no real emails or signatures, and no invented negative claims about real vendors
- [ ] Wylie's timed spoken rehearsal of the full tour and the persona cuts

### As built: deliberate deviations from this plan
- **Budgets** live under Insights ▾ (the real sidebar shows no Budgets entry; Vertice markets Budget Management inside approvals).
- **Ana** is reached from the Gong contract ("Negotiate with Ana") and from Vertice AI; there is no sidebar entry, as in the real app.
- **Chapter L (Legal: Contract Center AI)** was added as its own checkpoint for the Legal persona cut.
- **Analytics**: 9 of the 20 real tabs are built; the other 11 show a "full product" card.
- **Help** keeps the original "Outside this demo" card.

## 9. Open questions (to raise in the interview, not resolve in code)

- Where does Ana live in the app: as a request type, a contract action, or its own workspace? The site shows no sidebar entry.
- Does Intake-to-Procure's "all indirect spend" now include services and hardware sourcing at the same depth as SaaS?
- Is Procure-to-Pay sold standalone or only with Intake-to-Procure? The Products menu lists it, but the pricing page bundles it into Intake-to-Procure.
- Cloud: still AWS-only, or Azure/GCP now? Is AI Cost Optimization tied to provider APIs (OpenAI/Anthropic usage) or to invoices?
- The site's numbers are inconsistent: 16,000+ vs 32,000+ suppliers; $30B vs $75bn spend; 50+ vs 70+ agents. Keep using the PLAN.md §Notes values.
