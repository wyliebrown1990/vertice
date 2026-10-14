# Demo Walkthrough: Click-by-Click Guide (S1)

The end-to-end test script and rehearsal guide for the Salesforce renewal. Each step lists **where to click**, **what you should see** (use these as test checks), **what to say** and **the value it shows**. Use [DEMO_SCRIPT.md](DEMO_SCRIPT.md) for the short version on the day, and [VALUE_PLAYBOOK.md](VALUE_PLAYBOOK.md) for sources.

The fixed demo date is **Oct 13, 2026**. Every "days left" figure counts from that date, not the laptop clock.

---

## 0. Setup

**Click / do**
1. In a terminal: `cd ~/vertice_demo/app && bun run build && bun run preview`. Leave it running.
2. In Chrome (zoom 100%, window about 1440×900), open `http://localhost:4173/dashboard?presenter=1`.
3. On the dark **Presenter** bar at the bottom left, click **Start**.

**You should see**
- A toast: "Demo reset to a clean start".
- Presenter bar buttons: **Start · Final offer · Outcome · Notes · Reset**.
- A small disclosure in the sidebar footer: "Demo concept by Wylie Brown · fictional data · scripted AI · not affiliated with Vertice".
- The purple **Vertice AI** orb in the bottom-right corner.

**Say (before touching the UI)**
> "I'll play Alex Morgan, Head of Procurement at Northwind Systems, a fictional company with about $11M across 42 strategic SaaS contracts. The data is made up, and the AI answers are scripted for the demo."

Discovery question: **"How do you find out about a renewal today, and how many auto-renewed last year without a review?"**

---

## 1. Dashboard: see every renewal in one place

**Feature:** Dashboard (savings, spend, tasks, renewal pipeline)
**Value:** *Visibility.* Renewals cost money when you find out too late. Alex sees where to act first, ranked by money and deadline.

**You should see**
| Card | Expected value |
|---|---|
| Total savings (purple card) | **$1,210,000**, "April 2026 to date", Average savings **22%** |
| Live contracts | **42**; Not yet live 0; Signed renewals starting later **0** |
| Annualized spend | **$11,415,000** total; IT $2,740,000 is the largest slice |
| My active tasks | **2**: ZoomInfo "Decide: renew or give notice" and Gong "Confirm seat count with Sales", both "Notice in 3 days" |
| Pipeline | **Upcoming** tab selected; vendor logos stacked by renewal month |

**Click**
1. *(Optional)* Hover the **ⓘ** next to "Total savings" to see that it means contracted annualized reductions, not cash received.
2. *(Optional)* Click the **bell** next to the logo in the top-left. You should see three notifications: ZoomInfo, Gong, and "Salesforce notice deadline in 50 days".
3. In the **Pipeline**, find the **Jan 2027** column. Hover the **Salesforce** logo (it has a purple ring).
   - The tooltip shows: Annual cost **$980,000** · Renewal date **Jan 31, 2027** · Notice deadline **Dec 2, 2026 (in 50 days)**.
4. Click the **Salesforce** logo.

**Say**
> "Every strategic renewal on one timeline. Two notices close in 3 days, but the biggest is Salesforce: $980K, with 50 days left to act."

---

## 2. Contract overview: the decision context in one record

**Feature:** Contract record (AI summary, contract details, seat usage, lifecycle, contacts)
**Value:** *Time and context.* The notice deadline is not the term end. Missing it locks in an auto-renewal. Cost, usage and the vendor's quote sit together, so there is a decision to make rather than an invoice to pay.

**You should see** (URL `/contracts/salesforce/overview`)
- Header: **Salesforce** with **Live** and **Software** pills; tabs **Overview · Benchmark · Outcomes**; buttons **View benchmark** and **Start renewal** on the right.
- **AI summary** card with a "Scripted demo summary" pill: $980,000 a year for 500 seats, only **355** users (71%) active, a **12% uplift** quoted ($1,097,600), notice deadline Dec 2, 2026, in 50 days.
- **Contract details:** Annualized contract value **$980,000**; Vendor renewal quote **$1,097,600** "+12% on the same 500 seats"; To be renewed by **Vertice**; Auto-renewal **Yes**.
- **Products** table: 500 licences · 355 active (71%) · **$1,960** per seat per year.
- **Lifecycle** (right): Notice deadline **Dec 2, 2026** with a "50 days left" pill; Term end **Jan 31, 2027** with "110 days".
- **Contacts:** Jordan Reyes (Business owner), Alex Morgan (Procurement), Julian Hayes (Vertice buyer).

**Click:** nothing yet. Point at the notice deadline versus the term end, then go to step 3.

**Say**
> "The notice deadline isn't the term end. If we miss Dec 2, it auto-renews. They've quoted +12% on 500 seats, but only 355 people actually use it."

Discovery question *(optional)*: "Who owns the call on Salesforce seat counts today: RevOps, Procurement, or nobody until the invoice?"

---

## 3. Vertice AI: a recommendation backed by evidence

**Feature:** Vertice AI assistant (scripted)
**Value:** *Decision evidence on demand.* It answers in a fixed order: recommendation, then evidence, then the owner's decision, then a next step. The AI recommends; a human decides.

**Click**
1. In the AI summary card, click **Ask Vertice AI** (or the purple orb in the bottom-right).
   - You should see "Hi Alex, how can I help today?" and four question buttons.
2. Click **"What savings opportunities are there for my Salesforce renewal?"**
   - The answer types out over about 2 seconds. To skip ahead, click **Show answer** under the reply.
3. Click the **expand** icon (⤢) in the panel header so the table is readable.

**You should see**
- Recommendation: renegotiate before the notice deadline (Dec 2, 50 days), reject the 12% uplift and right-size to 400 seats, for up to **$274,400** a year.
- **Evidence** table:

  | | Today | Quote | Target |
  |---|---|---|---|
  | Seats | 500 | 500 | 400 |
  | $/seat/yr | $1,960 | $2,195 | $1,764 |
  | Annual cost | $980,000 | $1,097,600 | $705,600 |

- Metric tiles: Potential annual reduction **$274,400 (28% vs today)**; Avoided uplift (separate) **$117,600**.
- A yellow caveat: 355 of 500 active, 45 seats of headroom, Jordan Reyes (RevOps) to confirm, and the band is an illustrative benchmark.
- Buttons: **View benchmark** and **Start renewal**.

**Say**
> "Recommendation, evidence, then a human decision: up to $274,400 a year. The avoided uplift is tracked separately, so we're not double-counting."

**Click next:** **View benchmark** (this closes the panel). If you're short on time, click **Start renewal** and skip to step 5.

---

## 4. Benchmark: negotiate from evidence, not the vendor's number *(optional in a 6-minute run)*

**Feature:** Benchmark pricing
**Value:** *Pricing intelligence.* Shows what a fair price looks like for the same product, tier and term, and splits the saving into two separate levers: scope (how many seats) and price (cost per seat).

**You should see** (URL `/contracts/salesforce/benchmark`)
- An "Illustrative benchmark" warning pill (top right).
- KPI tiles: Your current price **$1,960** · Vendor renewal quote **$2,195** (+12%) · Target band **$1,700–$1,850** · Gap to band **$110+** per seat.
- A **Price vs. contract size** chart with markers for "Vendor quote" (red, hollow) and "Your price" (orange) above the shaded band.
- **Two separate levers:** Scope, right-size seats **$196,000**; Price, move into the band **$44,000–$104,000**; plus a note that rejecting the uplift avoids **$117,600**.

**Say**
> "Two levers: scope and price. The band is illustrative here; Vertice's real benchmarks come from 2M+ price points across 32K+ vendors."

**Click:** **Start renewal** (bottom-right card "Ready to agree requirements and negotiate?", or the header).

---

## 5. Requirements: agree the number with the business owner

**Feature:** Renewal request and requirements gathering
**Value:** *Accountable scope.* The business owner commits to a seat number before any negotiation. Usage data supports the decision; it does not cancel licences automatically.

**You should see** (URL `/intelligent-workflows/requests/…/overview`)
- Header: **Salesforce renewal** with an **In progress** pill; notice deadline in amber.
- **Active task:** "Requirements gathering", with an **Open task** button.
- **Progress overview:** Requirements (In progress) → Negotiation → Approval → Completed.
- **Request details:** Requirement "Not yet submitted"; Stage "Requirements".

**Click**
1. **Open task**. The "Requirements gathering" dialog opens.
   - **Downgrade** is already selected and **Proposed seats** shows **400**. The hint reads "400 seats = 355 active users + 45 seats of headroom…"
2. Tick the checkbox: **Jordan Reyes … confirms 400 seats leaves enough headroom.** The **Review** button becomes active.
3. Click **Review**. Check the summary: Seats **500 → 400**, Term "12 months from Feb 1, 2027, billed annually", Negotiation "Vertice-led (Julian Hayes)".
4. Click **Submit requirements**.

**You should see:** the toast "Requirements submitted: Vertice is now negotiating". The active task changes to the negotiation card.

**Say**
> "Jordan in RevOps commits to 400 seats: the active users plus headroom. Usage is evidence, not a cancellation."

---

## 6. Negotiation: an expert buyer extends the team

**Feature:** Vertice-led negotiation (expert buyer, supported by AI)
**Value:** *Capacity.* A specialist buyer runs the negotiation, so the procurement team doesn't have to.

**You should see**
- The card "Vertice-led negotiation" with Julian Hayes named on the right.
- Four steps: the first two ticked, "Negotiate with Salesforce, reject the 12% uplift" in progress, and "Return the final offer for your approval" not started.
- A dashed box with **Show final offer**, labelled as a demo transition.
- The progress chain shows Requirements done and Negotiation active.

**Say**
> "Vertice's buyer owns this, supported by AI. **In reality this takes days to weeks; I'll fast-forward.**"

**Click:** **Show final offer** (or press `Shift+N` in presenter mode). Toast: "Final offer received from Salesforce".

---

## 7. Approval: a human signs off, with the evidence in front of them

**Feature:** In-app approval of the final offer
**Value:** *Control.* Nothing is committed without Alex. The offer comes with its savings breakdown, so Alex can approve it with confidence.

**You should see**
- An **Approval needed** pill. Title: "Final offer: Salesforce Sales Cloud + Einstein".
- Offer: Seats **400** · Price/seat/yr **$1,764** · Annual cost (TCV) **$705,600** · Term "12 months from Feb 1, 2027".
- Savings tiles:
  - Annual reduction vs today: **$274,400**, from $980,000 to $705,600 **(28%)**.
  - Scope reduction: **$196,000** (100 seats × $1,960).
  - Unit-price reduction: **$78,400** (400 seats × $196).
- A note that the $117,600 avoided uplift is tracked separately.
- **Request changes** is greyed out; hovering it shows "Counter-proposals are outside this demo."
- *(Optional)* **Compare to benchmark** now shows a green "Negotiated $1,764" marker inside the band. Use your browser's Back button to return.

**Say**
> "$705,600 for 400 seats from Feb 1. Approving starts contracting; it doesn't sign the contract."

**Click:** **Approve offer**. Toast: "Offer approved: contracting has started".

---

## 8. Contracting: honest about what approval means

**You should see**
- An "Approved · contracting pending" pill.
- "Offer approved by Alex Morgan … Not yet a signed contract."
- The progress chain shows Approval done and the last step reading "Contracting pending".

**Say**
> "I'll compress contracting, too."

**Click:** **Show signed outcome**. Toast: "Renewal signed: savings recorded". The app goes to the **Outcomes** tab.

---

## 9. Outcome: a result Finance can use

**Feature:** Renewal outcome and savings record
**Value:** *Accountable savings.* A contracted annual reduction with a baseline, a breakdown, an effective date and an owner, kept separate from cost avoidance.

**You should see** (URL `/contracts/salesforce/outcomes`)
- Green banner: "Renewal secured · signed (simulated) · effective Feb 1, 2027".
- **$274,400** with a **28% lower** pill.
- Bars: Current annual cost (500 seats) $980,000 versus next-term annual cost (400 seats) $705,600.
- Scope reduction **$196,000**; Unit-price reduction **$78,400**.
- Seats retained 400 · Price per seat $1,764/yr · Next term Feb 1, 2027 – Jan 31, 2028.
- Right-hand card, "Against the vendor's opening quote":
  - Opening quote $1,097,600
  - Avoided uplift **$117,600**
  - Total benefit vs quote **$392,000 (35.7%)**
  - A note that only the $274,400 counts toward Total savings.
- "How to read this": not cash received; current spend stays at $980,000 until Jan 31, 2027.

**Say**
> "$274,400 a year, 28%: $196K from scope plus $78K from price, with a baseline and an owner. The avoided uplift is real, but it's a different baseline, so we don't add it twice."

**Click:** **Back to dashboard**.

---

## 10. Back on the dashboard: the portfolio has updated

**You should see**
| Card | Before | After |
|---|---|---|
| Total savings | $1,210,000 | **$1,484,400**, with a **+$274,400** chip and a brief flash |
| Average savings | 22% | **23%** |
| Signed renewals starting later | 0 | **1** (shown in green) |
| Annualized spend | $11,415,000 | **$11,415,000**, unchanged because the new term hasn't started |
| Pipeline (Jan 2027) | Salesforce with a purple ring | Salesforce faded, with a green ✓; tooltip "Renewal secured · new term signed" |
| My active tasks | 2 | 2 (no Salesforce task) |

**Say**
> "Total savings now includes this renewal: $1.48M. Spend doesn't drop until Feb 1, and the dashboard is honest about that."

**Close:** **"Which upcoming renewal would be worth reviewing first?"**

---

## Optional breadth (60–90 seconds, verbal)

- Open the **AI orb** and click **"Are there duplicated or overlapping tools?"** (or **"Tell me about application usage across my SaaS stack"**). Both show a table with a caveat and no navigation buttons.
- **Value:** the same pattern (visibility → evidence → owner decision) applies to tech-stack rationalisation, intake-to-procure and procure-to-pay.
- Don't click sidebar items below **Contracts** during the main presentation. They open the "Outside this demo" page.

---

## Test-only checks (recovery pass, Sprint 7)

Run these after a clean pass. Tick each one in `roadmap/Sprint-7-polish-rehearsal.md` once it passes.

| # | Do this | Expect |
|---|---|---|
| R1 | At step 7 (approval), reload the page (⌘R) | Still at "Approval needed"; numbers unchanged |
| R2 | After step 9, open the request again (Outcomes → **View completed request**) and try to complete it again | Shows "Completed" with only **View outcome** / **Back to dashboard**. The dashboard still shows **$1,484,400**, not double |
| R3 | Ask the AI a question, then click **Reset** on the presenter bar while the answer is still typing out | Back to a clean dashboard; reopening AI shows the empty "Hi Alex" state; no stray text finishes later |
| R4 | Type `R`, `N` and `.` (with and without Shift) into the AI box and the sidebar search | Characters appear in the field; the demo does **not** reset, jump to the offer or open notes |
| R5 | Click **Invoices** in the sidebar | "Outside this demo" page → **Return to renewal** and **Back to dashboard** both work |
| R6 | Visit `http://localhost:4173/nope` | "Page not found" with the same two buttons |
| R7 | Presenter bar: **Final offer** | Request page at "Approval needed" with the final offer |
| R8 | Presenter bar: **Outcome** | Outcomes tab with **$274,400**; the dashboard shows **$1,484,400** (one entry only) |
| R9 | Presenter bar: **Start** | Clean dashboard showing $1,210,000; Salesforce tile has its purple ring again |
| R10 | In the requirements dialog, type **450** seats | Warning "No offer exists for 450 seats" and **Use demo scenario (400 seats)**; **Review** is disabled until fixed |
| R11 | In the AI box, type "Can we save on Zoom?" | Fallback: "This demo covers the Salesforce renewal, so I can't analyse Zoom here." |
| R12 | Sidebar search: type `zzz` | "No contracts match 'zzz'." with **Clear search** |
| R13 | Press `.` (presenter mode, not typing) | The Presenter notes panel opens on the left with this step's notes; press `.` again to close. Notes stay hidden after a reload |
| R14 | DevTools → Application → Local Storage → `vertice-demo-v1` after completion, then after Reset | After completion: the request stage is `completed` with one Salesforce savings entry. After Reset: no request and no entries. Reload and confirm the UI matches |

**Offline:** turn Wi-Fi off with the preview server still running, hard-refresh the dashboard and a deep URL (e.g. `/contracts/salesforce/benchmark`), and repeat steps 1–10.
