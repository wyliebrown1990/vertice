# Vertice: Strategic Product Review and Claims Audit

Prepared 2026-10-15. Independent analysis for interview preparation. Not affiliated with Vertice.

## How to read this

**Evidence base**
- **Site crawl of vertice.one (2026-10-13).** Summarised in `research/PRODUCT_FEATURES.md` and `research/PROOF_AND_DATA.md`.
- **Live web-search retrieval of vertice.one pages (2026-10-15).** Direct page fetches were blocked in this environment, so live wording comes from search-indexed excerpts. Re-check any quote on the live page before using it externally.
- **Third-party sources:** vendor documentation (Okta, Microsoft, AWS, OpenAI, Anthropic, Cursor, Merge), analyst releases, press, academic papers and review sites.

**Labels**
- **[SR]** = self-reported by Vertice or another vendor. Nothing Vertice publishes about its own results is independently audited.
- **[INF]** = my inference or arithmetic from published figures. It is not a stated fact.
- **[UNV]** = could not be verified.

**Verdict scale used in the scorecard**

| Verdict | Meaning |
|---|---|
| **Supported** | Holds up. |
| **Directionally true, overstated** | Real capability, but the wording claims more than the mechanism can deliver. |
| **Unsubstantiated** | No methodology or evidence is published. |
| **Contradicted** | Vertice's own materials, or primary technical documentation, say otherwise. |

---

## 1. Executive summary

**What Vertice actually is.** The evidence describes a **SaaS-buying and negotiation business**. It is a human procurement service on top of a SaaS price-benchmark dataset, made much larger by the June 2026 Vendr acquisition. Around that core sit intake/workflow, contract management, TPRM, AWS cost optimisation, AI-spend tracking and, since about September 2026, P2P.

Its own FAQ says it negotiates **only SaaS contracts** on customers' behalf. It prices on **"annual SaaS and cloud spend"**. Its best-fit filter is **"$500K+ SaaS spend"**. IDC named its differentiator as **SaaS** pricing benchmark data.

The marketing describes something broader: an "intelligent procurement platform" for "all indirect spend", with "autonomous" AI, "real-time" data and "exactly" measured usage. Most of the problems below come from the gap between those two descriptions. Few come from the core service itself, which customers rate well.

### The ten findings that matter most

| # | Finding | Severity |
|---|---|---|
| 1 | **The guarantee in the contract appears to be a multiple of Vertice's fee, not 20% of spend.** Case studies say Quartex beat its guarantee "by 510%" and A.Team hit ">700%". That is impossible against a 20%-of-spend guarantee. Both figures fit a guarantee of roughly 1–1.75x the annual fee. A third-party profile describes it this way, and so does Vertice's own line "you'll never pay more than we save you". [INF, strongly supported] | High |
| 2 | **The savings baseline is undisclosed.** Vertice's tools measure against "your quote (or current subscription cost)" and "vs. initial proposal". "Realized savings" explicitly includes "non-monetary values such as free trials, free additional licenses". | High |
| 3 | **The data-moat numbers do not reconcile.** Spend is quoted as $3.4bn, $10bn, $30bn and $75bn. Vendors are 16k or 32k. Price points are 500k, 900k or 2M. Contracts are 35k, 70k or 250k. 250k contracts is hard to square with Vendr's disclosed rate of about 3,000 transactions a quarter. | High |
| 4 | **SSO-based usage analytics cannot do what the copy says.** "See exactly who is, and isn't, using each application" is beyond a login-event signal. "Identify shadow IT" through SSO is circular. By Vertice's own data, 36.5% of SaaS contracts are usage-priced, where seat logins are irrelevant. | High |
| 5 | **Ana's positioning contradicts itself.** One page calls it "a co-pilot, not an autopilot". Another calls it "the only platform to provide a truly autonomous negotiation agent". Vertice's own blog lists Pactum, Nibble and Zycus Merlin ANA as autonomous negotiators. The 4,000-negotiation track record mostly predates launch. Its implied average of about $125k per deal does not fit "long-tail". | High |
| 6 | **Ana's own figures are below the guarantee.** Ana averages 18% [SR]. Several named customers average 14–16% [SR]. Vertice's own 120+-day cohort averages 17.78% [SR]. The headline is "at least 20%". | High |
| 7 | **"All indirect spend" is not supported.** Negotiation is SaaS-only per the FAQ. P2P is weeks old. On the product page, goods receipt and true 3-way match are "a planned addition". Cloud is effectively AWS-only. | High (for non-SaaS buyers) |
| 8 | **The integration catalogue looks aggregator-sourced** (a unified accounting API). Coupa and SAP Ariba, which are rival procurement suites, are listed as "ERP" integrations. That suggests Vertice often runs alongside a suite rather than replacing it. [INF] | Medium-High |
| 9 | **The business is services-heavy and unprofitable.** Sales were £27.0m, with profit marked "N" (Sunday Times 100 Tech 2026). That is about £67–90k revenue per employee. Vendr, the best-funded comparable, did not survive independently. | Medium-High (strategic) |
| 10 | **Better-funded players are moving into Vertice's space.** Ramp launched procurement agents built on transaction-price benchmarks in April 2026. Zip ($2.2B valuation) shares IDC "Leader" status. Gartner's SaaS Management Platform Magic Quadrant does not include Vertice. | High (strategic) |

**What is genuinely strong** (Section 9 has more):
- After Vendr, Vertice probably holds the deepest negotiated-price data for the top few hundred SaaS vendors.
- The human-plus-software model produces real, large single-deal wins. Customer sentiment is good (G2 4.6/5).
- Some form of guarantee lowers purchase risk, even if it is a fee-back guarantee.
- Growth is real: £27.0m sales, #2 on the Sunday Times 100 Tech 2026 list.

---

## 2. Claim credibility scorecard

| Claim (Vertice wording) | Verdict | Why (detail in the section shown) |
|---|---|---|
| "Cost savings contractually guaranteed" / "at least 20%" | **Directionally true, overstated** | There is a guarantee, but it appears to be fee-based (§3.1). |
| "20% average savings · 7x ROI · 90-day payback" | **Unsubstantiated** | No baseline definition, distribution or cohort data. Several customers average below 20% (§3.4). |
| "Hard-dollar savings, not cost avoidance" (vs Zip) | **Contradicted** | Vertice's own "realized savings" include free trials and free licenses (§3.3). |
| "$75bn processed spend… world's largest dataset" | **Unsubstantiated** | Four different spend figures. Zylo also claims "$75 billion… industry's largest" (§4.1, §4.8). |
| "250,000 human-negotiated contracts" | **Unsubstantiated** | Doesn't reconcile with either company's disclosed throughput (§4.2). |
| "Real-time benchmarks… updated daily from thousands of live transactions" | **Overstated** | Implies a transaction volume that neither company has disclosed (§4.4). |
| "Connect your SSO in minutes to see exactly who is, and isn't, using each application" | **Directionally true, overstated** | SSO events record authentication, not usage (§5.1). |
| "Identify shadow IT… by monitoring unauthorized sign-ins" | **Contradicted (mechanism)** | Unsanctioned apps are mostly not federated through SSO (§5.2). ERP payment matching partly offsets this. |
| "Reclaim unused licenses instantly during offboarding" | **Unsubstantiated** | No deprovisioning (SCIM/API) documentation found. Vertice's own guide treats revocation as manual (§5.6). |
| "Every AI cost, in one place… every model your teams use" | **Overstated** | Provider admin APIs cover only org-billed accounts. They miss personal and card-paid accounts and AI embedded in SaaS (§5.5). |
| "50+ / 60+ / 70+ agents" | **Unsubstantiated** | Inconsistent counts, no definition of an agent. Zip used the same "50 agents" framing three months earlier (§6.2). |
| Ana "truly autonomous… the only platform" | **Contradicted** | By Vertice's own copilot FAQ, and by its own blog naming autonomous competitors (§6.1). |
| Ana "$500M across 4,000+ negotiations, 18% savings" | **Unsubstantiated** | Attribution and baseline unclear. Average deal size doesn't fit the long-tail positioning (§6.3). |
| "Monte Carlo… win probabilities" | **Unsubstantiated** | No inputs or calibration published. Per-vendor data is sparse (§6.4). |
| "AI-Native Intake, Sourcing and Orchestration Across all Indirect Spend" | **Overstated** | Workflows do span all spend. Negotiation, data and pricing are SaaS-centric (§7.1). |
| P2P "invoices… matched against the PO and contract" | **Supported, but early** | Two-way/contract matching yes. Goods receipt and 3-way match "planned". Launched about Sep 2026 (§7.2). |
| Integrations with 16 ERPs | **Directionally true, overstated** | Catalogue breadth isn't the same as native read/write depth (§7.3). |
| Cloud: "algorithms buy and sell RIs on your behalf" | **Overstated** | The AWS RI Marketplace allows only EC2 Standard RI sales, needs a US bank account and has caps. Savings Plans can't be sold (§7.4). |
| TPRM "continuously refreshed… validated regularly by the Vertice team" at 32k-vendor scale | **Unsubstantiated** | Plausible only as aggregated third-party feeds (§7.5). |
| "Accurate data extraction" (contract AI) | **Unsubstantiated** | No accuracy figures published. Academic benchmarks show material error rates (§7.6). |
| "Leader" (IDC), "#1" (G2), Lionfish, Forrester | **Supported but weaker than implied** | IDC "Leader" is shared with Zip and Levelpath. Forrester's is a Landscape, not a Wave. Lionfish is a small firm. G2 ranks on review volume (§8.2). |
| "100% independent, not a reseller" | **Supported with caveats** | Vertice lists itself as a seller on AWS Marketplace. Vendr previously ran a seller-side marketplace. No vendor commissions were found (§9.5). |

---

## 3. The savings guarantee and how savings are measured

### 3.1 The guarantee appears to be a multiple of the fee, not 20% of spend

**What Vertice says.** The wording varies by page:
- "Cost savings contractually guaranteed" ([pricing](https://www.vertice.one/pricing)).
- "We charge a flat fee based on your annual SaaS and cloud spend, and you only pay if we save you money" ([start-saving](https://www.vertice.one/start-saving)).
- "at least 20% savings" ([blog](https://www.vertice.one/blog/how-to-future-proof-your-business-with-saas-cost-reduction)).
- "Save up to 25%… or Vertice rebates the difference" ([Najar ad page](https://www.vertice.one/ad/vertice-vs-najar-form)).
- "You'll never pay more than we save you" ([budget-management](https://www.vertice.one/platform/budget-management)).

**What the case studies imply.**

| Customer | Published result [SR] | Implied guarantee [INF] |
|---|---|---|
| Quartex | "8.9x ROI and exceeding their initial Vertice savings guarantee by 510%" ([story](https://www.vertice.one/customer-stories/quartex)) | Savings were 5.1–6.1x the guarantee, so the guarantee was about **1.5–1.75x the fee** |
| A.Team | 7x ROI and "more than 700% of A.Team's savings guarantee" ([story](https://vertice.one/customer-stories/ateam)) | About **1x the fee** |
| Greylock | "110% of savings guarantee" in Year 1 (crawl) | Not separately derivable |

- A 20%-of-spend guarantee beaten by 510% would mean Quartex saved more than 100% of its spend. That is impossible. [INF]
- A third-party profile describes the guarantee as *"if the platform doesn't save the customer more than its annual subscription fee, Vertice covers the difference"* (surfaced via [zoftwarehub](https://zoftwarehub.com/ar-ae/products/vertice/overview); third-party summary, not contract text).
- That matches category practice:
  - Vendr's tiers reportedly guaranteed 1x, 2x or 3x the fee ([analysis](https://goodbetterbest.substack.com/p/vendr-the-buy-button-for-saas)).
  - Spendflo's published terms refund the subscription fee *pro rata to the shortfall*. They do not pay out the missing savings ([Spendflo T&Cs](https://www.spendflo.com/terms-and-conditions)).

**Why it matters.**
- Third-party pricing suggests fees of about 3–12% of spend at the low end: from about $30K a year for $250K–$1M SaaS spend ([OMR](https://omr.com/en/reviews/product/vertice/pricing), Feb 2025, [UNV] as current). ClearScore's figures imply about 2–3% at scale [INF].
- At those fee levels, a fee-back guarantee protects roughly **3–5% of spend**, not 20%.
- A buyer who hears "20% guaranteed" and later reads a fee-back clause has a reason to distrust the vendor. This is a positioning risk, not just a wording issue. (The repo's own `docs/VALUE_PLAYBOOK.md` already hedges: "subject to the customer's agreement".)

**What Vertice would need to show:** the guarantee clause from a standard order form, stating the unit (% of spend or a multiple of the fee), the measurement window, scope (touched contracts or all spend), rebate formula and cap, and eligibility conditions.

### 3.2 The baseline is undisclosed, and the industry default inflates savings

- **What Vertice uses.** Vertice's savings calculator compares "based on your quote (or current subscription cost)" ([savings-analysis](https://www.vertice.one/savings-analysis)). Savings Insights shows "Savings (vs. initial proposal)" (product imagery in the crawl). Spendflo's terms state the category norm outright: savings = "the difference between the first vendor quote and the final negotiated price" ([Spendflo T&Cs v2](https://www.spendflo.com/terms-and-conditions-v2)).
- **Why a first-quote baseline is generous.** SaaS renewal quotes usually carry an uplift. Vertice's own data says 33% of vendors put uplift language in contracts and SaaS inflation was 12–16% in 2026 [SR]. If a vendor quotes +15% and Vertice negotiates 20% off that quote, the customer pays about **8% less than last year**, not 20% less [INF]. Vendors also deliberately pad opening quotes to leave discount headroom ([softwarepricing.com](https://softwarepricing.com/blog/3-discounting-approaches-that-slow-saas-growth/)).
- **The list-price discount figure has the same problem.** "Average discount from list price: 33.8%" [SR] is measured against list price, which few buyers pay.
- **What would fix it.** For renewals, report savings against **prior-year price paid**. For new purchases, report against **benchmark median**. Show these next to "vs. initial proposal". Vertice is better placed than most to do this, since it holds the prior contract.

### 3.3 "Hard savings" includes non-cash items

- Vertice attacks Zip because its value is "often restricted to cost avoidance – theoretical calculations" ([vs-Zip](https://www.vertice.one/comparison/vertice-vs-zip)). It sells "hard-dollar savings, not 'time saved' math you can't prove to a CFO".
- Its own Savings Insights launch defines **realized savings** to include "non-monetary values such as free trials, free additional licenses" ([product update](https://www.vertice.one/blog/product-update-savings-insights)). Its glossary admits cost avoidance involves "an element of guesswork" ([cost-avoidance](https://www.vertice.one/explore/cost-avoidance)).
- The dashboard also has a separate **cost avoidance** (declined uplifts) category. Whether it counts toward the guarantee or the 20%/7x headline is undisclosed.
- Under standard procurement definitions, holding back an uplift is avoidance, not a reduction ([Sievo](https://sievo.com/blog/procurement-savings), [Precoro](https://precoro.com/blog/cost-savings-vs-cost-avoidance/)).
- Negotiated savings also leak before reaching the P&L: about 30–40% per [Suplari](https://suplari.com/blog/realize-savings-in-procurement-how-to-prove-what-your-team-actually-delivered), and up to 16% per Hackett/Coupa's [maverick-spend study](https://get.coupa.com/rs/950-OLU-185/images/19-Maverick-Spend-Report.pdf). These are secondary or vendor sources.

### 3.4 The headline average sits above much of Vertice's own data

| Source [all SR] | Average savings |
|---|---|
| Headline / guarantee | "20% average", "at least 20%" |
| Ana (4,000+ negotiations) | 18% |
| Renewal-timing insight, best (120+ days) cohort | 17.78% |
| NewtonX | 15–16% (crawl and live search differ) |
| FMG | 15% |
| Global creative network | 14% |
| CloudHesive (new purchases) | 17% |
| Tropic, a competitor, for comparison | 15.5% across $362M in H1 2025 ([review](https://procurementaiagents.com/blog/tropic-saas-management-review)) |

If 20% of spend were a real floor, several of the named reference customers would be owed rebates. Either the guarantee is not 20% of spend (§3.1), or the 20% is measured on a narrower or more generous base (§3.2–3.3). Customer averages run 14–32%, so 20% may be a fair *mean*. The issue is calling it a *guarantee* while publishing no distribution.

### 3.5 ROI is a function of the fee, and the case-study metrics don't line up

- ROI is quoted as savings ÷ Vertice fee ("34x ROI on the Vertice annual fee", [ClearScore](https://www.vertice.one/customer-stories/clearscore)). A 20% savings rate at 7x ROI simply implies a fee of about 2.9% of the savings base [INF]. The multiple says nothing about savings net of internal effort, or about what the customer would have negotiated alone.
- ClearScore alone appears as "$5m+" (story), "£4m+" ([video title](https://www.vertice.one/videos/how-clearscore-saved-4m-on-saas-with-vertice)), $3.5M on one contract, and stacks of $4.5M and $7.5M.
  - $5M+ in year 1 on a $7.5M stack would be about 67% of annual spend [INF].
  - That only works if the figure is multi-year contract value, quote-based, or includes avoidance.
- Across stories the metric changes: % of guarantee, ROI multiple, % on one vendor, $ total, hours saved. That makes cross-customer comparison impossible. The published stories are also selected: roughly 25 stories against 1,000+ claimed customers.

---

## 4. The benchmark dataset (the "data moat")

### 4.1 The headline numbers contradict each other

| Metric | Figures on vertice.one [SR] |
|---|---|
| Spend | $3.4bn "entrusted… in the last year" ([Series C post](https://www.vertice.one/blog/announcing-our-series-c)) · "$10 billion" ([Sunday Times blog](https://www.vertice.one/blog/vertice-ranked-2-sunday-times-100-tech-list)) · "$30B" ([savings-analysis](https://www.vertice.one/savings-analysis), insight pages) · "$75bn" ([about](https://www.vertice.one/about), [Vendr post](https://www.vertice.one/blog/vertice-acquires-vendr)) |
| Vendors | 16,000+ · 32,000+ |
| Price points | 500,000+ / "more than half a million" · 900k+ · 2M+ |
| Contracts | 35K+ · 70,000+ · 250,000+ |
| Vendor interactions | 1M+ · 2M+ |

- Only $3.4bn is framed as money customers actually put through Vertice in a year.
- Vertice's $30B plus Vendr's highest self-claim ($15B+, [Vendr](https://www.vendr.com/pricing-benchmarks)) is about $45B, not $75bn [INF]. "Processed", "indirect" and "under management" are used interchangeably and never defined.
- Several 2026 insight pages still say they are "based on $30bn" after the $75bn claim.

### 4.2 250,000 "human-negotiated" contracts doesn't fit disclosed throughput

- Before the merger, Vertice cited 35K–70K contracts, so Vendr would have had to contribute about 180K–215K.
- Vendr disclosed "over 3,000 transactions, totaling over $240 million" in Q2 2023 ([Vendr report](https://www.vendr.com/insights/saas-trends-report-2023-q2)). That is about 12K a year since its 2019 launch. [INF]
- Reaching 250K plausibly requires counting price checks, uploaded quotes or crowd-sourced submissions. Those are not "human-negotiated contracts".

### 4.3 Breadth is not depth: the long-tail problem

- 2M points ÷ 32K vendors ≈ 62 points per vendor. 250K contracts ÷ 32K vendors ≈ 8 contracts per vendor [INF].
- Procurement data follows a power law. Salesforce, Microsoft, Atlassian and Google probably hold a large share of the points. The median vendor likely has a handful.
- A valid comparison has to match edition or SKU, seat band, term, region, currency, bundle, ramp, non-standard terms and year. Each filter shrinks the cell.
- Vertice's own UI mock shows "Based on 86 comparable Salesforce deals in the Americas for 1475-1532 users". That is the most-purchased SaaS vendor, and the cell is still double digits.
- The public calculator supports only "30 of the most common vendors".
- **Implication.** "32,000 vendors" is a coverage claim. For most of those vendors a statistically meaningful benchmark probably doesn't exist. Expert judgement fills the gap, which is a reason the human service matters.

### 4.4 "Real-time" and "updated daily" against the age of the data

- Vertice claims benchmarks are "updated daily from thousands of live human-driven SaaS transactions" ([vs-Tropic](https://www.vertice.one/comparison/vertice-vs-tropic)). Combined disclosed throughput is in the low thousands per **month**, not per day [INF].
- No recency window is published. Tropic, a competitor, says it surfaces only the last 18 months ([Tropic Data](https://www.tropicapp.io/why-tropic/tropic-data)).
- Vendr data goes back to about 2019. At the 8–16% SaaS inflation Vertice itself reports, a 2021 price is stale by 30%+ unless it is indexed, and no indexing method is published.

### 4.5 Selection bias

- The data comes from companies that bought a negotiation service, mostly venture-backed mid-market firms. They are pre-selected for price sensitivity and leverage, so benchmarks skew toward discounted outcomes.
- Enterprise agreements (Microsoft EA/MCA, Oracle, SAP, enterprise Salesforce) are bespoke and multi-product, and often go through licensing specialists. Coverage there is likely thin; one low-confidence competitor source says so about Vendr's data.

### 4.6 Confidentiality exposure

- Many vendor agreements treat pricing as confidential. Sharing contracts with a benchmarking third party can breach confidentiality terms ([Hunton](https://www.hunton.com/hunton-retail-law-resource/sharing-business-contracts-benchmarking-consultant-might-breaching-vendor-agreements); older article).
- Vertice's public legal hub covers de-identified *personal* data. Search found no public statement on how contract-price data is anonymised, what minimum cell size applies, or what opt-out rights exist ([legal](https://www.vertice.one/legal)).
- Small cells such as "86 deals in a 1,475–1,532-seat band in the Americas" are re-identification risks. Transferring Vendr customers' data to a new owner raises a consent question.

### 4.7 The moat erodes as pricing moves to usage

- Vertice's own insight: **per-usage pricing is now the most common model (36.5%)**, ahead of per-user (32.4%). Consumption budgets vary 37.6% month to month ([saas-pricing-models](https://www.vertice.one/insights/saas-pricing-models)) [SR].
- Per-seat benchmarks don't carry over to credits, tokens, committed-use tiers or bundled AI add-ons. No normalisation method for usage contracts is published.
- The benchmark lever that built the company is losing relevance, and the replacement method (consumption forecasting) isn't shown publicly.

### 4.8 "World's largest" is contestable

- **Zylo**, in its 2026 SaaS Management Index, also claims "$75 billion in spend under management… the industry's largest" ([Zylo](https://zylo.com/news/2026-saas-management-index)). That dataset is licences and usage, not prices, which shows how much the label depends on definitions.
- **Tropic** claims $21–23B+ of spend data, 100,000+ negotiations and 30,000+ SKUs ([Tropic](https://www.tropicapp.io/proprietary-procurement-intelligence/price-benchmarks)).
- **Ramp** builds price benchmarks from card and bill-pay transactions at very large scale.
- "Largest negotiated-SaaS-contract dataset" is plausible. "World's largest procurement intelligence dataset" cannot be proved.

### 4.9 Insight statistics have no methodology

- SaaS inflation appears as 8.7% (2023), 17.9% "through 2023", 11.4% (Jan 2025), 13.2% "current" and 16.4% (Jun 2026), with the CPI multiple given as both "almost 4x" and "over 5x".
- A monthly move from 12.1% to 16.4% in two months suggests small samples or a shifting renewal mix.
- No sample sizes, weighting or definitions are published.
- Gartner frames enterprise SaaS renewal increases as "10% to 20% or more" ([Gartner](https://www.gartner.com/en/documents/7092230)). That is a renewal uplift, not an index, so Vertice's 16.4% sits at the top of the external range and nothing independent corroborates it.
- Because these numbers drive PR and sales urgency, treat them as marketing, not research.

---

## 5. Usage analytics, SaaS discovery and shadow IT (the SSO question)

**What Vertice says**
- "Connect your SSO in minutes to see exactly who is, and isn't, using each application." It promises "login frequency and activity trends", "license utilization, daily active users" ([saas-usage-analytics](https://www.vertice.one/platform/saas-usage-analytics)).
- "Detect Shadow IT by monitoring unauthorized sign-ins" ([integrations](https://www.vertice.one/platform/integrations)).
- SSO sources: Google Workspace, Entra ID, Okta, OneLogin, JumpCloud.
- The IT page adds: "Through integrations with your ERP and SSO… identify shadow IT."
- A 2023 product update describes matching ERP supplier payments against Vertice's vendor database to find paid-but-undocumented SaaS ([ERP update](https://www.vertice.one/blog/product-update-accounting-and-erp-integrations)).

### 5.1 An SSO event is an authentication record, not a usage record

**What the IdP actually records**
- An identity provider logs that someone *attempted to authenticate* to an app. Okta documents `user.authentication.sso` as an SSO attempt and says it cannot confirm the outcome at the app ([Okta event types](https://developer.okta.com/docs/reference/api/event-types/), [Okta system log](https://support.okta.com/help/s/article/User-Signin-and-Recovery-Events-in-the-Okta-System-Log)).
- The IdP sees nothing that happens *inside* the app.

**Why login counts undercount heavy users**
- Long-lived sessions and persistent desktop and mobile clients (Slack, Zoom, Figma, Teams, IDE plug-ins) re-authenticate rarely. The heaviest users can produce the fewest login events.
- Refresh-token renewals are logged separately, or not at all, depending on the flow.
- "Login frequency" is therefore biased, not just noisy.

**What actually holds the seat count**
- The paid seat count lives in the vendor's admin and billing console, not the IdP.
- Without the vendor's admin API, "utilisation" = SSO-active users ÷ seats from the contract. That breaks when:
  - seats are assigned to people who never log in through SSO (service accounts, API keys, break-glass admins);
  - one vendor contract covers several products (Atlassian Jira vs Confluence);
  - licence types differ (Salesforce full vs platform licences).

**Competitors make this distinction themselves**
- Productiv's documentation says an "SSO connector shows who logged in but offers little insight into what happened afterward". It reports `UsersLoggingIn` separately from `EngagedUsers` ([Productiv API](https://docs.app.productiv.com/developer-api/app-details.html)).

**Verdict.** SSO login data is *good enough* to start a seat right-sizing conversation at renewal, e.g. "355 of 500 seats logged in during 28 days". It cannot show "exactly who is, and isn't, using" an application. It also can't distinguish a disengaged user from one with a persistent session.

### 5.2 Shadow IT through SSO is circular

- An app appears in IdP logs only after IT has federated it. Shadow IT is, by definition, mostly what IT has not federated.
- Estimates of SaaS *not* behind SSO (all vendor-published):

| Source | Share of SaaS not behind SSO / not visible to IT |
|---|---|
| 1Password | 34% of apps on average ([1Password](https://1password.com/blog/it-and-security-pros-say-sso-is-falling-short)) |
| Dashlane | About 50% |
| Nudge Security | IT sees fewer than 10% of more than 1,000 apps ([Nudge](https://www.nudgesecurity.com/post/shadow-it-discovery)) |

- "Sign in with Google" flows produce OAuth token grants. Those are visible in Google's token audit log ([Google](https://docs.cloud.google.com/logging/docs/audit/gsuite-audit-logging)), not as SAML sign-ins. No evidence was found that Vertice reads OAuth grants [UNV].
- **The ERP mitigation is real but partial.** Payment matching catches shadow SaaS paid by invoice through AP.
  - It misses card-paid and expensed tools, free tiers, and personal accounts.
  - Those are exactly the routes for shadow AI, which Vertice says is **44% of AI spend** [SR].
  - No corporate-card or expense data integration (Ramp, Brex, Amex, Expensify, Pleo, Spendesk) was found [UNV]. Expensify appears only as a vendor Vertice negotiates with.

### 5.3 Not all companies use SSO, and fewer enforce it

- **The SSO tax.** Many vendors put SAML SSO only in their top tier ([1Password on the SSO tax](https://1password.com/blog/explaining-the-backlash-to-the-sso-tax); one small 2026 sample found 16 of 28 B2B tools gate SSO to the highest tier, [dev.to](https://dev.to/topickz/the-sso-tax-report-2026-dfk), low confidence). Vertice's core mid-market segment ($500K+ SaaS spend) is the segment most likely to be on lower tiers, so it federates fewer apps.
- **Federation is not enforcement.** Even where SSO is configured, many apps keep local username/password login unless an "enforce SSO" setting exists and is switched on. That setting is often tier-gated too. Admin and break-glass accounts usually bypass SSO by design. So a federated app can still be used without the IdP seeing it. (Technical reasoning; app behaviour varies.)
- **Log retention limits history.** Microsoft Entra keeps sign-in logs for 7 days on Free and 30 days on P1/P2 unless exported ([Microsoft](https://learn.microsoft.com/fi-fi/entra/identity/monitoring-health/reference-reports-data-retention)).
  - Historical usage only exists from the day Vertice connects, plus at most the retention window.
  - A customer who connects 60 days before a renewal has thin evidence.

### 5.4 Usage-priced contracts make SSO analytics irrelevant

By Vertice's own data, about 36.5% of SaaS contracts are per-usage and 31.1% hybrid (§4.7). For Snowflake credits, Datadog hosts or logs, API tokens and AI credits, seat logins say nothing about spend. Usage analytics built on SSO covers only the **seat-priced third of the market**, and that third is shrinking.

### 5.5 AI cost tracking covers only centrally billed accounts

How the integrations likely work [INF from provider docs]:

| Provider | Data source | Requirement |
|---|---|---|
| OpenAI | `/v1/organization/costs` | Owner-created admin key |
| Anthropic | Usage & Cost Admin API | `sk-ant-admin` key; not available on individual accounts |
| Cursor | Admin API (`/teams/spend`, `/teams/daily-usage-data`) | Team plan; first-release endpoints with partially documented fields |

Sources: [OpenAI via Vantage](https://docs.vantage.sh/connecting_open_ai), [Anthropic](https://docs.anthropic.com/en/api/usage-cost-api), [Cursor](https://docs.cursor.com/account/teams/admin-api).

What those APIs miss:
- Personal and card-paid accounts. Netskope found 47% of genAI users on personal apps; secondary source, [dope.security](https://dope.security/post/shadow-ai-statistics).
- Providers beyond the three named.
- AI embedded in SaaS contracts (Copilot, Einstein, Rovo).

"Every model your teams use" overstates this coverage. There is also an internal contradiction: the 44% "shadow AI" problem Vertice markets is the part these connectors cannot see.

### 5.6 License reclamation means reporting, not deprovisioning

- The integrations page says "Reclaim unused licenses instantly during offboarding" and "automate… role-based provisioning".
- No Vertice documentation was found for SCIM deprovisioning or API-based removal in third-party apps.
- The only SCIM reference is for provisioning users *into Vertice* ([help centre](https://help.vertice.one/hc/en-us/articles/35692006002065-How-to-migrate-your-SSO-users)).
- Vertice's own renewals guide tells IT to "coordinate with the team to revoke access and deprovision users", a manual step ([saas-renewals](https://www.vertice.one/explore/saas-renewals)).
- By contrast, Torii, Zluri and BetterCloud document automated offboarding actions per app.

### 5.7 Market context

- Gartner's Magic Quadrant for SaaS Management Platforms evaluated 17 vendors in 2025 and 16 in the 18 June 2026 edition. These included Zylo, Torii, BetterCloud, Zluri, CloudEagle, Flexera and 1Password. **Vertice is not among them** ([Gartner](https://www.gartner.com/en/documents/8014669)).
- Competitors discover apps through finance data plus SSO plus browser extensions plus direct app APIs, with hundreds of connectors ([Zylo](https://zylo.com/blog/saas-discovery), [Torii](https://www.toriihq.com/browser-extension)).
- Productiv shut down on 6 August 2026 with four days' notice ([CloudNuro](https://www.cloudnuro.ai/blog/productiv-shut-down-august-6-what-happened-and-where-saas-teams-go-next), [Torii](https://www.toriihq.com/blog/why-did-productiv-shut-down)). That shows how fragile standalone SaaS management vendors are. It is also an opening for Vertice: displaced customers need a home. But Vertice should compete on "usage evidence for renewals", not on SaaS-management depth.
- G2 reviewers mention no "comprehensive API access" (it is "on the roadmap"), and say data export and reporting are "functional but limited" ([G2](https://www.g2.com/products/vertice/reviews?qs=pros-and-cons)).

---

## 6. AI and agent claims (Vertice AI / Verity, Ana, MCP)

**Timeline**

| Launch | Date | Source |
|---|---|---|
| Vertice AI / Verity | 11 Sep 2025 ("50+ agents… 70+ tasks") | [product release](https://www.vertice.one/blog/product-release-vertice-ai) |
| Vendr deal | 1 Jun 2026 ("60+ agents") | [PR Newswire](https://www.prnewswire.com/news-releases/vertice-acquires-vendr-to-create-the-worlds-largest-procurement-intelligence-dataset-and-lead-autonomous-ai-negotiation-302786407.html) |
| MCP connector | 3 Sep 2026 | [MCP launch](https://www.vertice.one/blog/vertice-mcp-launch) |
| Ana | 8 Sep 2026 | [Ana launch](https://www.vertice.one/blog/introducing-ana-the-ai-negotiation-agent-for-software-purchases) |

The pricing page says "70+ Procurement Agents".

### 6.1 Ana: autonomous or copilot?

These statements appear on Vertice's own pages:
- "Ana is designed as a co-pilot, not an autopilot… drafts every email, includes the reasoning behind it, and waits for your approval before anything is sent" ([/ana](https://www.vertice.one/ana)).
- "Let Ana autonomously close long-tail renewals" ([/platform/ana](https://www.vertice.one/platform/ana)).
- "The only platform to provide a truly autonomous negotiation agent (Ana), running end-to-end rather than just operating as an AI copilot" ([best-enterprise-procurement-orchestration-software](https://www.vertice.one/blog/best-enterprise-procurement-orchestration-software)).
- Vertice's *own* "Best AI Negotiation Platforms in 2026" post names Pactum, Nibble and Zycus Merlin ANA as autonomous negotiation agents ([blog](https://www.vertice.one/blog/best-ai-negotiation-platforms)).

The "only" claim is contradicted on Vertice's own site, which is a comparative-advertising exposure. Gartner warns about exactly this kind of "agent washing". It estimates only about 130 of thousands of "agentic" vendors are real, and predicts more than 40% of agentic AI projects will be cancelled by the end of 2027 ([Gartner, 25 Jun 2025](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)).

### 6.2 Agent counts are not a capability metric

- The counts move between 50+, 60+ and 70+, and the 70 looks like the task count relabelled as agents.
- The 12 named agents (intake, compliance, legal, benchmarking, document analysis, email and so on) map onto ordinary workflow modules.
- A single router that "recruits the most suitable agent" is an architecture pattern, not evidence of capability.
- Zip announced "50 AI agents" on 10 June 2025, three months earlier ([Business Wire](https://www.businesswire.com/news/home/20250610972074/en/Zip-Unveils-Suite-of-50-AI-Agents-to-Automate-High-Impact-Tasks-Across-Finance-Legal-Procurement-IT-and-Security)). The number is a category convention, not a differentiator.
- What would matter instead: how many agents can act without approval, and accuracy for each task.

### 6.3 Ana's track record is not attributable to Ana

- "$500M across 4,000+ deals… 18% average savings… 15 days" [SR] was published at the 8 Sep 2026 launch, so most of those negotiations predate general availability. They likely involved Vertice's human buyers [INF/UNV].
- $500M ÷ 4,000 ≈ **$125K per negotiation** [INF]. Vertice's own data says tail spend is 63.4% of contracts but only 19% of cost. Tail contracts are small, so a $125K average does not describe "autonomously closing long-tail renewals".
- 18% is below the "at least 20%" guarantee (§3.4).
- For scale: Pactum's published Walmart tail-supplier results were about 3% savings with a 68% close rate [SR] ([PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2023/walmart-finds-75-percent-vendors-prefer-negotiating-with-chatbot/partial/)). An 18% figure needs its baseline explained (first quote, list price or prior price?).
- Training-data claims also vary by orders of magnitude. Ana is trained on "thousands", "tens of thousands" or "hundreds of thousands" of negotiations, depending on the page, against 35K contracts or 250K contracts. No base model is disclosed. Vendr's data is mostly price points, not negotiation dialogue.

### 6.4 "Monte Carlo win probabilities" need calibration

- A Monte Carlo simulation is only as good as the distributions fed into it: each vendor's concession curve, walk-away point and response latency.
- With the per-vendor sparsity in §4.3, most of those distributions must be assumed. That produces precise-looking probabilities with unknown calibration.
- No inputs, definition of a "win" or calibration plots are published.
- Research also finds systematic anchoring bias in LLM negotiators, persisting in frontier models ([arXiv 2508.21137](https://arxiv.org/pdf/2508.21137), [arXiv 2512.09254](https://arxiv.org/html/2512.09254v2)). Any LLM-simulated "vendor response" would inherit it.

### 6.5 How well LLM negotiators actually perform

- **MIT AI negotiation competition** (180,000+ AI-vs-AI negotiations): agents "can also be easily tricked into revealing their private information", and prompt injection was highly effective ([arXiv 2503.06416](https://arxiv.org/html/2503.06416v3), [MIT Sloan](https://mitsloan.mit.edu/press/even-ai-wont-tolerate-a-ruthless-negotiator)).
- **Microsoft/ASU "Magentic Marketplace"** (Oct 2025): "All models exhibit severe first-proposal bias, creating 10-30x advantages for response speed over quality". Agents were also open to manipulation ([arXiv 2510.25779](https://arxiv.org/html/2510.25779v1)).
- **Sell-side AI agents** are arriving (Salesforce Agentforce and others). When Ana negotiates against a vendor's agent, those weaknesses run both ways.

### 6.6 Security and compliance

- **Prompt injection.** Ana reads untrusted vendor emails and attachments, then drafts replies using the customer's budget, BATNA and competing quotes. That is the textbook setup for indirect prompt injection (OWASP LLM01) combined with excessive agency (LLM06).
  - EchoLeak (CVE-2025-32711) showed one crafted email could exfiltrate data from Microsoft 365 Copilot ([The Hacker News](https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html)).
  - Human approval of sends reduces the risk of bad *actions*. It does not reliably catch leaked reasoning inside a draft.
  - The MCP connector extends contract-data access to Claude, ChatGPT and Copilot sessions. Vertice says it inherits RBAC and SSO.
- **Disclosure gaps.** No published prompt-injection red-team results, no named LLM providers or retention terms, no SOC 2 scope statement covering Ana or MCP, and no ISO/IEC 42001 certification found.
- **EU AI Act.** Article 50 transparency duties require people to know they are dealing with an AI system. They are scheduled to apply from August 2026, subject to any Digital Omnibus changes. "Ana" is a human name. Whether Ana discloses to vendor reps that it is an AI is **unverified** ([McCann FitzGerald](https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/ai-transparency-european-commissions-guidelines-on-article-50-part-1-provider-obligations)).

---

## 7. Platform breadth: Intake-to-Procure, P2P, integrations, TPRM, cloud, contract AI

### 7.1 "All indirect spend" vs. a SaaS core

- **The claims.** "AI-Native Intake, Sourcing and Orchestration Across all Indirect Spend" (pricing), and "Global procurement experts… across all direct and indirect spend" ([vs-ORO](https://www.vertice.one/comparison/vertice-vs-oro)).
- **The FAQ disagrees.** Vertice negotiates **only SaaS** on customers' behalf. Non-SaaS can go through workflows, but the customer negotiates it ([start-saving](https://www.vertice.one/start-saving)).
- **Vertice's own guide disagrees too.** It sends direct-spend buyers to source-to-pay suites ([procurement-software](https://www.vertice.one/explore/procurement-software)).
- **Everything that matters commercially is SaaS:** the fee basis, the guarantee, the dataset, Ana's scope ("software vendors") and IDC's cited strength.
- **Verdict.** The workflows are spend-agnostic. The value engine is not. A buyer with large services, marketing, facilities or hardware spend gets routing, not savings.

### 7.2 P2P is new and incomplete

- **Launch.** The only dated public launch signal is a blog post from about 24 Sep 2026 ([blog](https://www.vertice.one/blog/procure-to-pay-has-every-right-to-be-strategic-and-were-giving-it-the-opportunity)), three weeks before this review. The 2023 "ERP integration" was spend discovery, not AP.
- **Matching.** The product page (crawl, 2026-10-13) says goods receipt and true 3-way matching are **"a planned addition"**. Vertice's "explore" pages describe 2- and 3-way matching generically, but those are educational content, so the product page is the authoritative source.
- **Why goods receipt matters.**
  - Punchout to Amazon Business, Staples and CDW buys physical goods, which need receipting before payment.
  - Without goods receipt, P2P is limited to services and software, where invoice-to-PO-to-contract matching is enough.
- **Not found** in any published material: e-invoicing (Peppol, XRechnung/ZUGFeRD), VAT/tax determination, multi-currency AP or multi-entity accounting.
  - This matters for a London-HQ vendor selling P2P into Europe.
  - Germany has required businesses to be able to receive structured B2B e-invoices since 1 Jan 2025, with issuing obligations phasing in 2027–28 (background knowledge, not verified this session).
- **Competition.** Ramp ships intake, approvals, POs and auto-coded invoice matching natively with cards and bill pay ([Ramp](https://support.ramp.com/get-started-with-procurement)). Zip is IDC's recommended pick for "full lifecycle coverage from intake through payment" ([Zip/IDC](https://www.morningstar.com/news/business-wire/20260714050373/zip-named-a-leader-for-the-second-time-in-idc-marketscape-for-worldwide-ai-enabled-spend-orchestration-2026-vendor-assessment)).

### 7.3 Integration depth

- **The list.** The ERP list includes QuickBooks Desktop, Wave Financial, FreeAgent, Clear Books, Zoho Books, FreshBooks, Sage Business Cloud and "MSD 365 BC". Merge.dev's unified accounting catalogue contains the same long tail with the same labels, including "MSD 365 BC" ([Merge](https://docs.merge.dev/merge-unified/accounting/integrations/overview)).
  - That suggests the long tail comes through a unified API. **I did not find Vertice confirming this.** [INF]
- **What unified APIs typically limit.** They often sync on a cache rather than in real time, write asynchronously, expose POs read-only on some ledgers, and limit custom-field writes ([Apideck](https://www.apideck.com/blog/top-merge-api-alternatives), [Truto](https://truto.one/blog/unified-apis-for-accounting-architecting-quickbooks-xero-netsuite-integrations/)).
- **Why that matters.** "Anything that doesn't match is flagged before payment" depends on fresh bill status from the ERP.
- **Native depth may be narrow.** The P2P FAQ names native ERPs as NetSuite, Xero, QuickBooks and Microsoft Dynamics. Other pages name NetSuite, SAP, Workday and Dynamics.
- **Coupa and SAP Ariba are listed as "ERP" integrations.** They are rival procurement suites. In large accounts Vertice is evidently an intake and negotiation layer feeding the incumbent suite, not a replacement. That is a sensible wedge, but it contradicts "end-to-end".

### 7.4 Cloud cost optimization: AWS only, with mechanically limited RI automation

- **AWS only.** The product copy says "within your AWS footprint". The guides send Azure and GCP users to native tools. Multi-cloud appears only in page metadata.
- **"Buy and sell RIs on your behalf"** runs into AWS RI Marketplace rules ([AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html)):
  - only **EC2 Standard** RIs can be sold;
  - the RI must be active 30+ days and have a month or more left;
  - AWS takes a 12% fee on the upfront price;
  - the seller needs a **US bank account**;
  - lifetime sale caps apply.
- **Savings Plans generally can't be sold.** Selling is a narrow lever, especially for non-US entities. That matters given Vertice's UK/EU base.
- **Free alternatives.** AWS Compute Optimizer ([pricing](https://aws.amazon.com/compute-optimizer/pricing)) and Cost Optimization Hub give much of the recommendation layer at no charge.
- **Specialists are deeper.** ProsperOps and Archera automate commitments across all three clouds; Vantage and CloudZero do cost allocation and unit economics.
- **Savings figures are inconsistent.** Vertice quotes "up to 25%", "30%" and "up to 60%" [SR].

### 7.5 TPRM

- **The claim:** "continuously refreshed TPRM scores across security, financial, legal, compliance and ESG… validated regularly by the Vertice team".
- Human validation of five risk dimensions across tens of thousands of vendors is plausible only as an *aggregation* of third-party feeds. Vertice itself lists SecurityScorecard, D&B, Creditsafe and EcoVadis.
- **Outside-in ratings have known weaknesses.** They can't see internal controls, they misattribute shared infrastructure, and corrections are slow ([RiskLedger](https://www.riskledger.com/resources/securityscorecard-alternatives); competitor source).
- **Fine for triage.** Not a substitute for a real assessment of critical vendors.

### 7.6 Contract AI accuracy

- No precision or recall is published for "accurate data extraction".
- **ContractEval** (ACL NLLP 2025) tested 19 LLMs on contract clause extraction. Most perform "comparable to junior legal assistants", with frequent false "no related clause" answers ([arXiv 2508.03080](https://arxiv.org/abs/2508.03080)).
- **Downstream risk.** Extracted fields drive renewal alerts and notice deadlines, so an extraction miss on a notice period is a missed renewal: the exact pain the product exists to fix.
- **What would answer it:** field-level accuracy figures and a human-QA rate.

---

## 8. Proof points and analyst recognition

### 8.1 Customer stories

- **Selected sample.** About 25 published stories against 1,000+ claimed customers.
- **No common yardstick.** The metrics change from story to story (§3.5).
- **Mostly scale-ups.** ClearScore, Factorial, Holidu, Quartex, NewtonX, me&u. The large logos (ARM, Santander, BlackBerry) appear without published scope.
- **Mid-market average contract size** [INF]. Revenue ÷ customers ≈ £27–36K (about $34–46K) per customer. That sits in the third-party $30K Standard to $55K Professional tiers, not the $140K Enterprise tier ([OMR](https://omr.com/en/reviews/product/vertice/pricing)).
- **"1,000+ customers" is the *combined* Vertice + Vendr base.** Every acquisition release says so ([Dealroom](https://app.dealroom.co/news/feed/vertice-acquires-vendr-to-create-75b-procurement-intelligence-dataset-for-autonomous-ai-negotiation)). Vertice's own pre-deal figure was 750+.

### 8.2 What the badges actually mean

| Badge | What it actually is |
|---|---|
| **IDC MarketScape, Worldwide AI-Enabled Spend Orchestration 2026** (Leader) | 10 vendors assessed. Zip and Levelpath are also Leaders. IDC's praise centred on SaaS benchmark data ([PR Newswire](https://www.prnewswire.com/news-releases/vertice-named-a-leader-in-idc-marketscape-worldwide-ai-enabled-spend-orchestration-2026-vendor-assessment-302836810.html), [Levelpath](https://finance.yahoo.com/technology/ai/articles/levelpath-named-leader-idc-marketscape-153300891.html)). |
| **Forrester, Supplier Value Management Landscape Q1 2026** | A Landscape lists many vendors. It is not a Wave evaluation. |
| **Lionfish Tech Advisors** (Leader in two 2026 reports) | Small firm (11–50 staff), founded 2020 by an ex-Gartner research director. Its listed focus is security and infrastructure ([LinkedIn](https://www.linkedin.com/company/lionfish-tech-advisors)). |
| **G2 "#1"** | Grid placement is algorithmic and driven by review volume and recency. G2's own guidance is that collecting more reviews is the way to improve placement ([G2 methodology](https://research.g2.com/research-guidelines)). |
| **Gartner** | No Vertice placement found in a Magic Quadrant, Market Guide or Cool Vendors list. Zip is a Visionary in the 2026 S2P MQ. Omnea was a 2025 Cool Vendor. Absence is not exhaustively confirmed. |

---

## 9. Business model, market and strategic position

### 9.1 What is genuinely strong

- **Growth.** £27.0m latest sales, 437% three-year CAGR, #2 on the Sunday Times 100 Tech 2026 ([Insider Media](https://www.insidermedia.com/news/national/the-sunday-times-names-uks-100-fastest-growing-tech-companies-for-2026)).
- **Funding.** $50M Series C (Jan 2025, Lakestar; reported about $500M valuation) on top of a $25M Series B (Jan 2024). Total raised is about $100M+ ([SiliconANGLE](https://siliconangle.com/2025/01/22/ai-procurement-management-software-startup-vertice-raises-50m/)).
- **Founders.** Serial founders with two exits (ScanSafe to Cisco, Wandera to Jamf).
- **The Vendr deal.** Consolidates the two best-known buyer-side SaaS negotiation datasets and US distribution under one roof.
- **Customer sentiment.** G2 4.6/5. Reviewers praise negotiation outcomes and independence ("They aren't a reseller").
- **A wedge that sells itself.** "We'll pay for ourselves" (even as a fee-back guarantee) plus "we'll negotiate your renewals" makes budget approval easy for lean finance teams.

### 9.2 A services-heavy model

- **Low revenue per head.** £27.0m against 400+ staff is about £67K per employee. Against GetLatka's 299 staff estimate for 2024 [UNV], it is about £90K. Either way it is closer to a tech-enabled service than to scaled SaaS. [INF; the revenue and headcount periods don't align exactly.]
- **Unprofitable.** Profit is marked "N" on the Sunday Times list.
- **Margin ceiling.** A dedicated human buyer per account limits gross margin.
- **Ana is plausibly the margin play.** It replaces negotiator hours on the long tail. Vendr made the same move: it went "from a services-led business into an AI-first company" with its "Ruth" agent ([YC](https://www.ycombinator.com/companies/vendr)).
- **Not disclosed:** gross margin and the ratio of buyers to customers.

### 9.3 Vendr's history as a category signal

- **Peak and decline.** Vendr was valued at $1B in June 2022 ([Bloomberg](https://www.bloomberg.com/news/articles/2022-06-16/software-procurement-startup-vendr-gains-1-billion-valuation)). It laid off about 25% of 400+ staff in May 2023 ([The Information](https://www.theinformation.com/briefings/software-cost-management-startup-vendr-lays-off-25)), with reported further cuts in January 2024.
- **Pivot.** It moved to AI and a free tier, and was acquired on undisclosed terms on 1 June 2026.
- **The lesson.** The best-funded US pure-play in human-led SaaS negotiation could not sustain its valuation alone. That is evidence the category struggles to reach venture-scale economics without software leverage. It is also what Vertice is now betting it can solve.
- **Integration risk.** Vertice inherits a team with poor recent morale signals (Vendr Glassdoor titles such as "Layoffs still happening. Unstable company.").

### 9.4 Diminishing returns and retention

- **Year-two savings shrink.** Once a stack is renegotiated, year-two renewals start from a reset price, often with a negotiated 3–5% uplift cap. That leaves less to save [INF]. The fee, based on spend, does not shrink with it.
- **Low-end economics are thin.** At $500K of spend, a $30K fee is 6%. Only the slice that renews each year is negotiable.
- **Reviewers notice.** G2 flags that small portfolios "may find the value proposition harder to justify".
- **Retention needs a recurring reason** beyond the first-year reset: consumption and AI-cost governance, intake/orchestration lock-in, and benchmark-driven uplift defence.
- **Not disclosed:** net revenue retention by cohort, and year-2 vs year-1 savings.

### 9.5 Independence

- **No vendor commissions found.** "100% independent, not a reseller" is broadly supported on that count.
- **Two caveats worth disclosing proactively:**
  - Vertice is listed as a **seller on AWS Marketplace** ([AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-vff5qg5j37agq)).
  - Vendr previously described itself as a two-sided marketplace helping sellers "acquire customers at a lower CAC" ([Promptloop](https://www.promptloop.com/directory/what-does-vendr-com-do)).
- **Partner programme.** It includes a "Channel & Referral (recurring commission)" track (crawl).
- **The perception risk.** "Independent" becomes harder to assert without a written disclosure policy.

### 9.6 Competitive encroachment

| Competitor | Move | Threat |
|---|---|---|
| **Ramp** | Launched procurement AI agents for sourcing, renewals and negotiation briefs on 29 Apr 2026, built on pricing benchmarks from its card and bill-pay transactions, claiming 16% average vendor savings [SR] ([CPA Practice Advisor](https://www.cpapracticeadvisor.com/2026/05/01/ramp-rolls-out-ai-agents-for-procurement/182627/)) | Ramp already sits on the payment rail and sees shadow and card spend natively. That is the data Vertice's SSO-and-ERP discovery lacks. |
| **Zip** | $2.2B valuation, $190M Series D ([Business Wire](https://www.businesswire.com/news/home/20241021142811/en/Zip-Secures-190-Million-in-Landmark-Series-D-Funding-Marking-the-Largest-Investment-in-Procurement-Technology-in-Over-Two-Decades)); IDC Leader; Gartner S2P Visionary; 50 agents | Owns the orchestration narrative in enterprise. |
| **Omnea** | $50M Series B (Sep 2025), Gartner Cool Vendor | Strong in UK/EU orchestration and TPRM, Vertice's home market. |
| **Zylo / Torii / Zluri** | Gartner SMP MQ vendors | Deeper discovery, usage and automation. |
| **Tropic** | $21–23B spend data, hybrid AI plus human experts | Same model as Vertice, US-strong. |
| **Free and cheap benchmarks** | Vendr's free tier (now Vertice's), Ramp's price intelligence | Price data is commoditising, so the moat shifts from *having* data to *acting on* it. |

---

## 10. Strategic gaps and what Vertice should do about them

| # | Gap | Recommendation |
|---|---|---|
| 1 | The guarantee and savings baseline are opaque. | **Publish a savings methodology**, and make "savings Finance can audit" the differentiator: prior-year-price baseline for renewals, benchmark-median baseline for new buys, cash vs. avoidance vs. non-monetary split, and GL reconciliation of realised cash. State the guarantee in its real unit (fee multiple or % of spend). This is the cheapest credibility win available. |
| 2 | Data-moat numbers don't reconcile. | **One governed fact sheet.** Define processed spend, price point and contract. Publish the per-vendor coverage distribution and minimum-n rules. Retire the stale $30bn, 16k and 500k figures from live pages. |
| 3 | SSO-only discovery. | **Add finance-native discovery:** card and expense feeds (Ramp, Brex, Amex, Expensify, Pleo, Spendesk), Google/Entra OAuth-grant scanning, and vendor admin-API connectors for the top 50 seat apps to get true seat counts and engagement. Reword "exactly" to "SSO-based usage signals". |
| 4 | Benchmarks for usage and AI pricing. | **Build and publish a consumption benchmark method:** normalised unit cost, commitment-tier curves, true-down and rollover clauses. This is where the market is moving (36.5% usage-priced), and where the 37.6% budget-variance pain is. |
| 5 | Ana's credibility. | **Position Ana as a supervised copilot** with an optional autonomous mode for capped-value renewals. Drop the "only" claim. Publish the mode split for the 4,000 deals, red-team results for prompt injection and BATNA leakage, and AI disclosure in vendor emails (Art. 50). |
| 6 | Breadth claims invite comparisons Vertice loses. | **Pick the fight it wins:** SaaS, AI and cloud buying, orchestrated end-to-end, feeding the incumbent ERP or suite. Coexist with Coupa and Ariba explicitly. Don't claim "all indirect spend" or full P2P until goods receipt, 3-way match, multi-entity and e-invoicing ship. |
| 7 | Year-2+ retention. | **Make the recurring value continuous:** uplift defence, consumption and AI-commit tracking, renewal timing (its own data shows 120+ days out saves 23% more), and intake lock-in. Report NRR and year-2 savings to prove it. |
| 8 | Competitive data asymmetry with Ramp. | **Partner for transaction data** (card and AP feeds), or integrate deeply with spend platforms. Position Vertice's edge as *negotiation outcomes plus human expertise*, not raw price data. |
| 9 | Independence perception. | Publish a **conflict-of-interest policy** covering AWS Marketplace, partner commissions and any Vendr seller-side legacy. |
| 10 | Security posture for agentic features. | Publish the **LLM subprocessors and their retention/no-training terms**, the SOC 2 scope covering Ana and MCP, and an ISO/IEC 42001 roadmap. |

---

## 11. Using this in the interview (Sales Engineer lens)

These are the questions a sharp buyer will ask. Each answer separates what you can say from what you'd need to verify.

1. **"Is the 20% guaranteed?"**
   - Say: savings are contractually guaranteed under terms set in each customer's agreement, and 20% is the published average.
   - Don't say "20% on every renewal".
   - Ask internally: is the guarantee a fee multiple or a % of spend?
2. **"What's your savings baseline?"**
   - Have an answer that covers prior-year price vs. first quote, and how avoidance and free months are reported separately.
   - The Northwind demo already separates scope ($196K), price ($78.4K) and avoided uplift ($117.6K). That is the right instinct.
3. **"We don't have SSO on half our apps."**
   - Say: SSO plus ERP payment matching gives a strong starting map. For seat counts, we pair it with vendor admin exports at renewal.
   - Don't claim card-spend discovery or automatic deprovisioning without confirming they exist.
4. **"Is Ana sending emails to my vendors on its own?"**
   - Say: by default it drafts with reasoning and waits for approval.
   - Know the autonomous-mode guardrails before claiming more.
5. **"How many comparable deals is this benchmark based on?"**
   - Be ready to show the n and the filters, like the "86 comparable deals" pattern.
   - For niche vendors, be honest that expert judgement fills thin data.
6. **"Can you replace Coupa?"**
   - The credible answer today is coexistence: Vertice runs intake, SaaS negotiation and renewals, and feeds the suite.

---

## 12. Open items (not verified in this review)

- **Guarantee terms:** the actual contract clause (baseline, window, scope, cap).
- **Ana in practice:** whether it discloses that it is an AI to vendor reps, the autonomous vs. copilot split of the 4,000 negotiations, and which LLM providers Vertice uses.
- **Discovery sources:** whether Vertice reads OAuth grants, ingests card or expense data, or ships a browser extension.
- **Integrations:** whether Vertice uses a unified accounting API (Merge or similar), and the per-ERP read/write matrix.
- **Company financials:** headcount now, gross margin, NRR, and Vendr deal terms.
- **Vendr legacy:** Vendr's reported ~$0.2B secondary valuation (single source).
- **Certifications:** SOC 2 report scope, ISO 27001, ISO 42001 status, and EU data residency.

---

## Sources (key)

**Vertice (own pages)**
- Pricing and guarantee: [pricing](https://www.vertice.one/pricing) · [start-saving](https://www.vertice.one/start-saving) · [budget-management](https://www.vertice.one/platform/budget-management) · [vs Najar ad](https://www.vertice.one/ad/vertice-vs-najar-form) · [vs Zip](https://www.vertice.one/comparison/vertice-vs-zip) · [vs Tropic](https://www.vertice.one/comparison/vertice-vs-tropic) · [vs ORO](https://www.vertice.one/comparison/vertice-vs-oro)
- Savings and data: [savings-analysis](https://www.vertice.one/savings-analysis) · [Savings Insights update](https://www.vertice.one/blog/product-update-savings-insights) · [cost avoidance](https://www.vertice.one/explore/cost-avoidance) · [saas-pricing-models insight](https://www.vertice.one/insights/saas-pricing-models)
- Usage and discovery: [usage analytics](https://www.vertice.one/platform/saas-usage-analytics) · [integrations](https://www.vertice.one/platform/integrations) · [ERP update 2023](https://www.vertice.one/blog/product-update-accounting-and-erp-integrations) · [AI cost optimization](https://www.vertice.one/platform/ai-cost-optimization) · [help: SSO users](https://help.vertice.one/hc/en-us/articles/35692006002065-How-to-migrate-your-SSO-users) · [saas-renewals guide](https://www.vertice.one/explore/saas-renewals)
- AI and Ana: [Ana](https://www.vertice.one/ana) · [platform/ana](https://www.vertice.one/platform/ana) · [Ana launch](https://www.vertice.one/blog/introducing-ana-the-ai-negotiation-agent-for-software-purchases) · [best AI negotiation platforms](https://www.vertice.one/blog/best-ai-negotiation-platforms) · [best enterprise orchestration](https://www.vertice.one/blog/best-enterprise-procurement-orchestration-software) · [Vertice AI release](https://www.vertice.one/blog/product-release-vertice-ai) · [MCP launch](https://www.vertice.one/blog/vertice-mcp-launch)
- Platform breadth: [P2P blog](https://www.vertice.one/blog/procure-to-pay-has-every-right-to-be-strategic-and-were-giving-it-the-opportunity) · [legal](https://www.vertice.one/legal)
- Company: [Vendr acquisition](https://www.vertice.one/blog/vertice-acquires-vendr) · [Series C](https://www.vertice.one/blog/announcing-our-series-c) · [Sunday Times blog](https://www.vertice.one/blog/vertice-ranked-2-sunday-times-100-tech-list)
- Customer stories: [Quartex](https://www.vertice.one/customer-stories/quartex) · [A.Team](https://vertice.one/customer-stories/ateam) · [ClearScore](https://www.vertice.one/customer-stories/clearscore)

**Technical documentation**
- Identity: [Okta event types](https://developer.okta.com/docs/reference/api/event-types/) · [Entra log retention](https://learn.microsoft.com/fi-fi/entra/identity/monitoring-health/reference-reports-data-retention) · [Google Workspace audit logs](https://docs.cloud.google.com/logging/docs/audit/gsuite-audit-logging) · [Productiv API](https://docs.app.productiv.com/developer-api/app-details.html)
- AI provider APIs: [Anthropic Usage & Cost API](https://docs.anthropic.com/en/api/usage-cost-api) · [Cursor Admin API](https://docs.cursor.com/account/teams/admin-api) · [OpenAI costs via Vantage](https://docs.vantage.sh/connecting_open_ai)
- AWS: [RI Marketplace rules](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html) · [Compute Optimizer pricing](https://aws.amazon.com/compute-optimizer/pricing)
- Integrations: [Merge accounting integrations](https://docs.merge.dev/merge-unified/accounting/integrations/overview) · [Truto on unified accounting APIs](https://truto.one/blog/unified-apis-for-accounting-architecting-quickbooks-xero-netsuite-integrations/)

**Research and analysts**
- Gartner: [agentic AI cancellations](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) · [SMP Magic Quadrant 2026](https://www.gartner.com/en/documents/8014669)
- LLM negotiation: [MIT negotiation competition](https://arxiv.org/html/2503.06416v3) · [Magentic Marketplace](https://arxiv.org/html/2510.25779v1) · [LLM anchoring](https://arxiv.org/pdf/2508.21137)
- Contract AI: [ContractEval](https://arxiv.org/abs/2508.03080)
- Security and regulation: [EchoLeak](https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html) · [EU AI Act Art. 50 guidance](https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/ai-transparency-european-commissions-guidelines-on-article-50-part-1-provider-obligations)
- Analyst releases: [IDC MarketScape (Vertice)](https://www.prnewswire.com/news-releases/vertice-named-a-leader-in-idc-marketscape-worldwide-ai-enabled-spend-orchestration-2026-vendor-assessment-302836810.html) · [IDC (Zip)](https://www.morningstar.com/news/business-wire/20260714050373/zip-named-a-leader-for-the-second-time-in-idc-marketscape-for-worldwide-ai-enabled-spend-orchestration-2026-vendor-assessment) · [G2 methodology](https://research.g2.com/research-guidelines)
- Savings measurement: [Sievo](https://sievo.com/blog/procurement-savings) · [Suplari](https://suplari.com/blog/realize-savings-in-procurement-how-to-prove-what-your-team-actually-delivered) · [Hunton on benchmarking confidentiality](https://www.hunton.com/hunton-retail-law-resource/sharing-business-contracts-benchmarking-consultant-might-breaching-vendor-agreements)

**Market, competitors and reviews**
- Vertice: [Sunday Times 100 Tech 2026 (Insider Media)](https://www.insidermedia.com/news/national/the-sunday-times-names-uks-100-fastest-growing-tech-companies-for-2026) · [SiliconANGLE Series C](https://siliconangle.com/2025/01/22/ai-procurement-management-software-startup-vertice-raises-50m/) · [OMR pricing](https://omr.com/en/reviews/product/vertice/pricing) · [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-vff5qg5j37agq)
- Vendr: [Bloomberg valuation](https://www.bloomberg.com/news/articles/2022-06-16/software-procurement-startup-vendr-gains-1-billion-valuation) · [The Information layoffs](https://www.theinformation.com/briefings/software-cost-management-startup-vendr-lays-off-25) · [Q2 2023 report](https://www.vendr.com/insights/saas-trends-report-2023-q2) · [Vendr joining Vertice](https://www.vendr.com/blog/vendr-is-joining-vertice) · [Tech.eu on the acquisition](https://tech.eu/2026/06/01/vertice-acquires-vendr-to-build-ai-powered-procurement-intelligence-platform/)
- Competitors: [Ramp procurement agents](https://www.cpapracticeadvisor.com/2026/05/01/ramp-rolls-out-ai-agents-for-procurement/182627/) · [Zip Series D](https://www.businesswire.com/news/home/20241021142811/en/Zip-Secures-190-Million-in-Landmark-Series-D-Funding-Marking-the-Largest-Investment-in-Procurement-Technology-in-Over-Two-Decades) · [Zip 50 agents](https://www.businesswire.com/news/home/20250610972074/en/Zip-Unveils-Suite-of-50-AI-Agents-to-Automate-High-Impact-Tasks-Across-Finance-Legal-Procurement-IT-and-Security) · [Zylo SMI 2026](https://zylo.com/news/2026-saas-management-index) · [Tropic benchmarks](https://www.tropicapp.io/proprietary-procurement-intelligence/price-benchmarks) · [Spendflo T&Cs](https://www.spendflo.com/terms-and-conditions) · [Productiv shutdown](https://www.cloudnuro.ai/blog/productiv-shut-down-august-6-what-happened-and-where-saas-teams-go-next)
- Shadow IT and SSO: [1Password on SSO gaps](https://1password.com/blog/it-and-security-pros-say-sso-is-falling-short) · [Nudge Security](https://www.nudgesecurity.com/post/shadow-it-discovery)
- Reviews: [G2 reviews](https://www.g2.com/products/vertice/reviews?qs=pros-and-cons)
