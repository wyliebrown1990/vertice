# Value Playbook: Vertice for a Head of Procurement

Study guide and interview cheat sheet for the S1 demo (Salesforce renewal at fictional Northwind Systems).

**Three kinds of numbers. Never mix them when you speak:**

| Kind | Example | How to say it |
|---|---|---|
| **Fictional Northwind scenario** | $274,400 annual reduction, 28% | “In this example…” |
| **Illustrative UI/benchmark data** | $1,700–$1,850 target band | “Illustratively, a band like this…” |
| **Published Vertice/customer claims** | The AA: $1M benefit, 440 hours saved | “Vertice published that The AA…” (cite the source) |

Published claims below come from a crawl of vertice.one captured **2026-10-13** (local copies in `research/text/`, git-ignored). Re-check anything you quote if the interview is much later.

**Guarantee wording (use exactly this shape):** Vertice publishes **20% average savings** and offers **contractually guaranteed savings, subject to the customer’s agreement**. Do not promise 20% on every renewal, automatic 90-day payback, or ROI with no fee assumption. Source: vertice.one/pricing.

---

## The story in one line

> “You already know renewals cost money. The problem is having the **time** and **evidence** to act before your options close.”

What the audience should remember: **visibility** (you see it coming) → **decision evidence** (you know what good looks like) → **expert execution** (someone does the work) → **accountable savings** (a number Finance can trust).

Opening discovery question: *“How do you find out about a renewal today, and how many auto-renewed last year without a review?”*

Closing question: *“Which upcoming renewal would be worth reviewing first?”*

---

## S1 beat by beat

### 1. Dashboard: notice the exposure
- **Buyer problem:** renewals arrive as invoices; by then the notice date has passed and leverage is gone.
- **Screen evidence:** the 12-month pipeline puts every strategic renewal by month and value on one screen. ZoomInfo and Gong notice dates are 3 days out; Salesforce is January’s largest at $980K, with 50 days to its notice deadline.
- **Decision:** which renewal deserves attention first. Answer: the biggest one with a closing window.
- **Outcome:** procurement chooses where to act early, instead of reacting.
- **Proof:** **The AA**, Head of Procurement (IT, Digital & Data): $1M benefit on a ~$14M software estate, 440 negotiation hours saved, 5x ROI. *Source: vertice.one/customer-stories/aa.* (Northwind is deliberately AA-sized.)
- **Benchmark to quote:** 72.3% of contracts carry auto-renewal clauses, **96.1% for CRM** (Q2 2026). *Source: vertice.one/insights/auto-renewal-clauses.*
- **Transition:** “Let’s open the biggest one.”

### 2. Contract: understand the deadline and the gap
- **Buyer problem:** the facts that matter (cost, usage, vendor quote, notice date) live in four systems.
- **Screen evidence:** the notice deadline (Dec 2, 50 days) is a different date from the term end (Jan 31, 110 days). The +12% quote is on the same 500 seats, but only 355 were active in 28 days.
- **Decision:** don’t accept the quote. Investigate scope and price.
- **Discovery:** “Who owns the call on Salesforce seat counts today?”
- **Transition:** “What does a fair price look like?”

### 3. Vertice AI + benchmark: evidence before negotiation
- **Buyer problem:** procurement negotiates against the vendor’s number because it has no independent one.
- **Screen evidence:** the AI recommends acting before the notice date, rejecting the uplift and right-sizing to 400 seats. The benchmark shows $1,960/seat against an illustrative $1,700–$1,850 band. Scope ($196K) and price ($44K–$104K range) are separate levers.
- **Decision:** negotiate on evidence, with two separable asks.
- **Proof:** Vertice cites **32,000+ vendors and 2M+ price points** behind its benchmarks, and the 2026 assistant (“Verity”) draws on **50+ agents**. Say clearly that the demo’s numbers are fixtures. *Source: research/PRODUCT_FEATURES.md §10.*
- **Relevant customer:** **intelliflo**: 33% on a Salesforce renewal. *Source: vertice.one/customer-stories/intelliflo.*
- **Discovery:** “Where would your team get this evidence today?”
- **Transition:** “Agree the requirement before negotiating.”

### 4. Requirements: the owner commits to a number
- **Buyer problem:** negotiations stall because nobody signs off on what is actually needed.
- **Screen evidence:** a Downgrade of seat scope (not tier) to 400 = 355 active + 45 headroom, with business-owner confirmation required to submit.
- **Decision:** a requirement the business stands behind. Usage is evidence, not a licence cancellation.
- **Transition:** “Now Vertice’s buyer takes it.”

### 5. Negotiation: extend the team’s capacity
- **Buyer problem:** a small procurement team can’t run every renewal well.
- **Screen evidence:** Julian Hayes (Vertice buyer) owns it with a visible plan. AI supports the work; humans own it.
- **Narrate the time jump:** “In reality this takes days to weeks; I’ll fast-forward to the offer.”
- **Proof:** The AA’s 440 negotiation hours saved. **Le Collectionist**: 55% faster procurement cycles. *Sources: customer-stories/aa, customer-stories/le-collectionist.*

### 6. Final offer → approval: humans decide with evidence
- **Screen evidence:** 400 seats × $1,764 = $705,600 for 12 months from Feb 1, 2027. A $274,400 (28%) reduction = $196,000 scope + $78,400 price. The $117,600 avoided uplift is shown separately.
- **Decision:** approve. The status becomes “Approved, contracting pending”, which is honestly not yet signed.
- **Discovery:** “Who signs off a renewal this size, and how long does it take?”
- **Transition:** “I’ll compress contracting and show the signed result.”

### 7. Outcome → dashboard: an accountable result for Finance
- **Screen evidence:** the result card shows the baseline, the agreed scope and the effective date. Total savings rises from $1,210,000 to $1,484,400 (contracted, annualized, not cash yet). Current spend doesn’t drop until the new term starts.
- **Line that lands:** “Alex can now take Finance a cost reduction with a clear baseline, agreed scope and an accountable owner.”
- **Close:** “Which upcoming renewal would be worth reviewing first?”

---

## Platform breadth: one-line bridges (deferred screens, 60–90 seconds total)

| Story | Value in one line | Published proof (source) | Outside this demo |
|---|---|---|---|
| **S2 Rationalise the stack** | SSO usage finds idle seats and overlapping tools before they renew. | ClearScore: $5M+ savings, >30x ROI (customer-stories/clearscore) | Usage insights, stack review screens |
| **S3 Intake-to-procure** | One front door; policy routes security, legal and finance reviews automatically. | CloudHesive: 50% faster procurement cycle (customer-stories/cloudhesive) | Intake forms, workflow builder |
| **S4 Fix the bottleneck** | See where approvals stall, then change the workflow. | Market approvals average 7–12 days by function; HR slowest at 12.3d (insights/approval-times-by-function) | Procurement insights, builder |
| **S5 Spend control** | Connect agreed contract terms to POs, invoices and budgets. | Piano: 600% ROI in under a year (customer-stories/piano) | Procure-to-pay (confirm matching scope; site lists three-way match as planned) |

---

## Competitive frame (one sentence each)

**Vertice’s frame is efficiency vs realized outcomes.** Workflow tools (Zip, Oro, Omnea, Tonkean) speed up process; Vertice adds benchmark data, expert negotiators and hard-dollar savings. Against Tropic and Spendflo, the claims are global coverage and a dedicated, consistent buyer. *Source: vertice.one/comparison/\*, captured 2026-10-13.* Don’t score competitors yourself; describe Vertice’s positioning.

---

## Glossary (terms you’ll say out loud)

| Term | Meaning in this demo |
|---|---|
| **Notice deadline** | Last day to tell the vendor you won’t auto-renew. Often 30–90 days before term end. |
| **Term end / renewal date** | When the current contract period ends. |
| **ACV** | Annual contract value. |
| **TCV** | Total contract value over the full term (here 12 months, so TCV = ACV). |
| **Annualized reduction** | Next-term annual cost vs current annual cost. This counts as savings. |
| **Scope reduction** | Savings from buying less (seats). |
| **Unit-price reduction** | Savings from a lower price per unit on what you keep. |
| **Cost avoidance** | Not paying a proposed increase (the uplift). Real, but a different baseline; shown separately. |
| **Uplift** | Vendor’s proposed price increase at renewal (+12% here). |
| **Intake-to-procure** | Vertice’s workflow product: request → reviews → negotiation → approval → purchase. |
| **Shelfware** | Licences paid for but not used. |
