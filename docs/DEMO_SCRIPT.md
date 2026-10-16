# Demo Script: Salesforce Renewal (S1)

Run-of-show for the Vertice SE interview. Value detail and sources: [VALUE_PLAYBOOK.md](VALUE_PLAYBOOK.md). Click-by-click test guide with expected values: [DEMO_WALKTHROUGH.md](DEMO_WALKTHROUGH.md).

## Before you share your screen

```bash
cd ~/vertice_demo/app && bun run build && bun run preview
```

1. Open `http://localhost:4173/dashboard?presenter=1` (Chrome, zoom 100%, window ~1440×900).
2. Click **Start** on the presenter bar for a clean state.
3. Keep the presenter bar's **Final offer** and **Outcome** buttons as recovery points. Notes are visible to the audience if opened while sharing, so prefer this script on a second screen.
4. Wi-Fi can be off; everything is local. Keep the terminal running.

**Fallback:** the four screenshots in `qa/` (dashboard, AI evidence, final offer, outcome) if screen share fails.

## Setting (say this before touching the UI)

> “I’ll play Alex Morgan, Head of Procurement at Northwind Systems: a fictional 1,500-person company with about $11M across 42 strategic SaaS contracts. The data is made up, and the AI answers are scripted for the demo. I’ve modelled them on Vertice’s published product and benchmarks.”

Discovery question: **“How do you find out about a renewal today, and how many auto-renewed last year without a review?”**

Recap the problem: renewals cost money when options have already closed. You need **time** and **evidence**.

## S1 talk track (by decision, not by button)

| # | Decision | Click | Say (short) |
|---|---|---|---|
| 1 | **Notice the exposure** | Dashboard: hover the Salesforce tile (Jan), click | “Every strategic renewal on one timeline. Two notices close in 3 days, but the biggest is Salesforce: $980K, 50 days to act.” |
| 2 | **Understand the gap** | Contract overview: AI summary, lifecycle | “Notice deadline isn’t term end. They’ve quoted +12% on 500 seats; 355 are active.” |
| 3 | **Get evidence** | **Ask Vertice AI** → savings chip → expand (⤢) | “Recommendation, evidence, then a human decision: up to $274,400 a year. The uplift avoidance is separate.” |
| 3b | (optional) | **View benchmark** | “Two levers: scope and price. The band is illustrative here; Vertice’s real data is 32K+ vendors.” |
| 4 | **Agree requirements** | **Start renewal** → **Open task** → Downgrade 400 → owner confirms → Review → Submit | “Jordan in RevOps commits to 400: active plus headroom. Usage is evidence, not a cancellation.” |
| 5 | **Expert execution** | Negotiation card | “Vertice’s buyer owns it, AI-supported. **In reality this takes days to weeks; I’ll fast-forward.**” → **Show final offer** |
| 6 | **Approve** | Final offer → **Approve offer** | “$705,600 for 400 seats from Feb 1. Approved means contracting starts, not signed.” → **Show signed outcome** (“compressing contracting”) |
| 7 | **Finance-ready result** | Outcomes → **Back to dashboard** | “$274,400 a year, 28%: $196K scope plus $78K price, with a baseline and an owner. Total savings is now $1.48M.” |

Close: **“Which upcoming renewal would be worth reviewing first?”**

## Timings

| Segment | 20-minute slot | 30-minute slot |
|---|---|---|
| Discovery and context | 2 min | 3 min |
| S1 demo | 8 min | 10 min |
| Platform breadth (verbal, plus optional S2 chat) | 2 min | 3 min |
| Discussion | 6 min | 11 min |
| Recap and next step | 2 min | 3 min |

**6-minute version:** steps 1 → 2 → 3 → 4 → 5 → 6 → 7 with one sentence each; skip the benchmark tab.

**1-minute recap (if interrupted):** “Alex spotted a $980K Salesforce renewal 50 days before notice, used usage and benchmark evidence to set a 400-seat requirement, Vertice’s buyer negotiated, Alex approved, and Finance gets a $274,400 annual reduction with a clear baseline, from Feb 1, 2027.”

## Breadth bridge (60–90 seconds, no screen tour)

“The same pattern runs across the platform: usage insights to find idle seats and overlapping tools, intake-to-procure so every purchase goes through one front door with automatic security and legal reviews, and procure-to-pay to connect contract terms to invoices.” Optionally run the AI chip *“Are there duplicated or overlapping tools?”*

## Recovery

| Problem | Do this |
|---|---|
| Misclick, lost your place | Presenter bar: **Final offer** or **Outcome** |
| Want to restart | **Start** / **Reset** (or Shift+R when not typing) |
| AI answer still revealing | **Show answer** under the reply |
| Visited a grey “Outside this demo” page | **Return to renewal** |
| Typed a seat count other than 400 | **Use demo scenario (400 seats)** |

## Objection handling (brief)

- **“We already have a CLM.”** A CLM stores the contract. This is about acting before the notice date, with benchmark evidence and someone to negotiate. Vertice integrates with CLMs such as Ironclad.
- **“Where do usage and benchmark numbers come from?”** Usage comes from SSO/identity integrations. Benchmarks come from Vertice’s negotiated-deal dataset (published: 32K+ vendors, 2M+ price points). In this demo both are fixtures.
- **“Is the AI negotiating for us?”** AI drafts and recommends. A Vertice buyer runs enterprise negotiations, and the customer approves every outcome.
- **“What does the guarantee mean?”** Vertice publishes 20% average savings and offers contractually guaranteed savings subject to the agreement. Ask the commercial team for terms; don’t quote a universal number.
- **“Isn’t this just approval routing?”** Routing speeds up process. This ties the process to a commercial result: evidence, negotiation and a recorded saving.

## Questions to ask Vertice

1. How do SEs run discovery for procurement leaders versus CFOs, and who usually owns the evaluation?
2. How do SEs work with the expert buyers during a sale: joint calls, savings estimates?
3. How is SE success measured: win rate, technical-win rate, time to value?

Optional follow-ups: Is negotiation scope SaaS-only or all indirect spend? Is three-way match live or roadmap? Is cloud optimisation AWS-only?

## Full platform tour (25–30 min, post-interview)

Use **Presenter › Chapters** to jump between chapters or recover. The order follows Vertice’s lifecycle, a year at Northwind. Every chapter has notes (`.`); quote published claims as Vertice’s, never as Northwind results.

1. **Home base (1 min).** Start on the dashboard: Total savings, pipeline, tasks, Requests and Savings opportunity. “Everything starts from one front door and one view.”
2. **B: Buy new software (6 min).**
   - Slack: Sam sends the order form, then clicks Review purchase details. Dynamic Intake pre-fills from it (source hints), shows preferred vendors and the benchmark, and checks the budget. Submit.
   - Risk: LinkDesk (fictional) is High risk, so switch to TeamViewer.
   - Reviews: open the **Workflow** tab to show Security, AI Compliance and AI Legal running in parallel. Dana approves in Slack; Leah approves with a redline.
   - Priya sees “12% of the Support budget, 95% at year end”. Sign, and PO-1042 syncs to NetSuite.
3. **C: Choose a vendor (3 min).** New request › Select a vendor. RFP Builder: suggested vendors, weights, 12 AI-drafted questions, responses, scored comparison, then Lexora at 9.1/10. Onboard, then show the Vendor Portal tasks.
4. **D: Pay correctly (3 min).** Invoices: Zscaler bills $330K after a $240K renewal, so Contract Price Match flags +$90,000 and you return it with the drafted email. The TeamViewer invoice auto-matches PO-1042, the ≥ $5,000 rule routes it to Sam and Priya, and it’s paid. Then Budgets.
5. **E: See waste (3 min).** Analytics: Spend Insights, then SaaS Stack Matrix (ask Vertice AI for leverage), then Cost/Cash Forecast. Usage: shadow IT, then Asana + monday.com, then Create consolidation request.
6. **E2: Fix the bottleneck (3 min).** Procurement insights: Find bottlenecks (4.8 days in Security Review), then “Take me to the flow”. Drag Create Jira Ticket and Set as Live. Back on insights: 0 overdue, 1.9 days.
7. **A + A2: Renewals (5 min).** Salesforce as in the S1 talk track, compressed. Then Gong: Negotiate with Ana, approve her plan, show vendor replies, and approve the result ($50,000, 24%). “Experts for strategic deals, Ana for the long tail; humans approve both.”
8. **F: Beyond SaaS (2 min).** AI spend: $84.6K a month, 8% savings; Anthropic is 85% through its commitment, so start that renewal. Cloud Optimizer: $650K in savings, then hand the EDP renewal to Vertice experts.
9. **Close (1 min).** Dashboard at $1,534,400. Ask: “Which of these would be worth reviewing first at your company?”

**Persona cuts (5–8 min):**
- **Procurement:** B, then E2, then A.
- **Finance:** E (Savings and ROI, Forecast), then D, then F.
- **IT & Security:** E (shadow IT), then B (risk and reviews), then Settings › Integrations.
- **Legal:** L (Documents: create from file, liability Q&A), then B (AI Legal), then Settings › Compliance.
- **Cloud Engineers:** F (cloud), then Expert Engage.
