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
