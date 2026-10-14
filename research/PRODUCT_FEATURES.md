# Vertice (vertice.one) — Product Features Research

Source corpus: `/Users/wyliebrown/vertice_demo/research/text/*.md` (site crawl). Mega-menu was stripped from the text extraction, so navigation was recovered from `raw/html/home.html` `<nav>` elements. Competitor checkmark tables on the Sastrify/Spendflo ad pages were decoded from `raw/html` SVGs. Product-UI detail from marketing screenshots (`images_png/`, 159 images) is in Section 9 — the most useful section for building a replica.

Contents: 1 Positioning · 2 Product taxonomy (nav) · 3 Modules · 4 AI capabilities · 5 Integrations · 6 Pricing · 7 Competitors · 8 Value-message bank · 9 UI screen inventory · 10 Conflicting numbers · 11 Customer proof points

Conventions: `[file.md]` = source citation. Numbers are quoted exactly as on the page. Where Vertice's own site contradicts itself, both values are listed (see Section 10, "Numbers that conflict").

---

## 1. Positioning

### One-liners (verbatim or near-verbatim)
- **"The Intelligent Procurement Platform"** / "Built for intelligent procurement" — "The AI platform for modern finance and procurement teams. Faster decisions, smarter forecasts, expert buying. Savings guaranteed." [home.md, about.md]
- Meta description: "the intelligent procurement platform built for the modern enterprise. Our agentic workflows, AI insights and expert buyers empower finance and procurement teams across 30+ countries to buy smarter and scale faster." [home.md]
- About page tagline: **"See further. Act sooner."** Intelligent procurement = foresight: anticipate supplier risks, capacity constraints, predict prices and hidden complexity. [about.md]
- Pricing headline: **"AI Procurement software that pays for itself. Cost savings contractually guaranteed."** [pricing.md]
- Recurring CTA: **"See how simple procurement can be — Let us show you how to halve your cycles and cut costs by 20%."** [nearly every page]
- Start-saving: "Buy smarter. Scale faster. And save 20% on SaaS. Guaranteed." [start-saving.md]
- Orchestration: "Intake-to-Procure. Automate. Approve. Save." and "Your procurement painkiller. Say goodbye to purchasing headaches." [procurement-orchestration-software.md]
- P2P: "Contract to payment, without the handoff." / "Know before you pay." [procure-to-pay.md]

### Category names Vertice uses
| Term | Where |
|---|---|
| Intelligent procurement platform | home, about, tour |
| **Intake-to-Procure** (product name; also "intake-to-procure provider") | nav, home, pricing, sourcing FAQ |
| **Procurement orchestration** (platform/software) | procurement-orchestration-software.md, comparisons ("procurement orchestration platform") |
| SaaS Purchasing (product) / SaaS purchasing platform / "SaaS buying platform" | nav, saas-purchasing-platform.md |
| Procure-to-Pay (product) | nav, procure-to-pay.md |
| AI procurement software / agentic AI procurement / "autonomous procurement agentic AI software" | platform__ai-procurement-software.md |
| SaaS spend management (G2: "The #1 SaaS Spend Management Platform on G2") | saas-purchasing-platform.md, start-saving.md |
| Spend management software (budget page H1 is "Spend Management Software") | platform__budget-management.md |
| "Predictive orchestration" / "agentic AI orchestration" | budget-management FAQ, ai-cost-optimization FAQ |
| "Risk-based orchestration" | comparison__vertice-vs-tropic.md, -zip.md |
| Negotiation as a service / procurement outsourcing services / outsourced procurement | platform__expert-engage.md |
| Source-to-pay (described as broader than P2P; Vertice "supports a source to pay process") | procure-to-pay.md, procurement-automation FAQ |
| Supplier Value Management (Forrester landscape inclusion) | about.md |
| "Hybrid solution" — platform + global team of procurement experts | expert-engage FAQ, budget FAQ |
| "Software with a tech-enabled service element" | start-saving.md FAQ |

Note: the phrase "AI-enabled spend orchestration" does not appear in the crawl; closest is "AI-powered orchestration" [procurement-orchestration-software.md] and "agentic AI orchestration" [platform__budget-management.md].

### Target personas
Nav "Solutions > Team" lists exactly: **Finance, Procurement, IT & Security, Legal**. Self-guided tour has tracks: **Vertice (overview), Finance, Procurement, IT/Operations** [self-guided-tour.md].

| Persona | Page | Headline | Core promise |
|---|---|---|---|
| Finance / CFO | solutions__saas-spend-management-software.md | "Cut costs. Forecast better." | Visibility, predictive forecasts, guaranteed 20% savings, "Create a cost-aware culture" |
| Procurement | solutions__saas-procurement-software.md | "More control. Lower costs." | Structured workflows, auto-routing, AI agents, expert extension of team |
| IT & Security | solutions__it-procurement-software.md | "Control software sprawl. Ensure compliance." | Shadow IT, license usage via SSO, supplier risk, diligence insights |
| Legal | solutions__saas-compliance-software.md | "Review every purchase before it happens" | Embed legal requirements at intake, AI flags non-compliant terms, "Never be a bottleneck" |
| Cloud engineers / FinOps + Finance | solutions__cloud-cost-management-software.md, cloud-cost-optimization-software.md | "Automate savings. Focus on innovation." / "Your cloud costs don't have to be sky high" | 100+ tests, RI automation, EDP negotiation |
| Requesters / employees | platform__intake-management-software.md, punchout | "Easier for the requester" | Single URL or Slack/Teams intake, forms show only relevant fields, preferred vendor suggestions |
| Stakeholders named in workflows | intake FAQ, orchestration FAQ | — | "legal, procurement, IT, compliance and finance" approvers; security review subprocess |

Report-download page targets: CFOs, procurement teams, IT leaders [ad__procurement-impact-report-2025.md].
Testimonial titles reveal actual buyers: CFO (Factorial, me&u, NewtonX), Head of Procurement IT/Digital/Data (The AA), Head of Data Engineering (ClearScore), COO (Piano), Head of Finance (Encompass, FirstVet, A.Team), General Counsel (Grow), CIO (Felix), CTO (CloudHesive, ClearScore), CISO (Le Collectionist).

### Company size focus
- "Companies with **$500K+ SaaS spend**, requiring cost savings and procurement efficiency gains" — stated "Best Fit" on Zip, ORO, Omnea, Tonkean, Spendflo comparison tables.
- "Built for **mid-market and enterprise** companies with complex SaaS stacks, global operations" [comparison__vertice-vs-spendflo.md]; "provide mid-market and enterprise companies with the visibility…" [platform__sourcing.md]
- "Whether you're a mature scale-up or a large enterprise" [ad__vertice-vs-najar-form.md]
- "Growing companies where invoice volume is outpacing the team" (P2P fit) [procure-to-pay.md]
- Global: US, EMEA & APAC teams; "30+ countries" [home.md, comparison__vertice-vs-tropic.md]; "100+ Countries Served" [about.md]

### Company facts [about.md, partners.md, ad pages]
- 400+ employees; 1,000+ customers; 100+ countries served; $75bn processed spend; 20% average savings; 90 days typical payback.
- "750+ finance & procurement teams/leaders" trust Vertice [start-saving.md, self-guided-tour.md] (older figure).
- **Acquired Vendr** — creating "world's largest procurement intelligence dataset — over $75bn in global indirect spend across 32,000 vendors — for over 1,000 customers." [about.md]
- Recognition: Leader in **IDC 2026 Procurement MarketScape**; included in **Forrester Supplier Value Management Platforms Landscape, Q1 2026**; #2 in **Sunday Times 100 Tech 2026**; "leading intake-to-procure provider" in **Lionfish Tech Advisors (ex-Gartner) 2026 intake-to-procure report**; G2 "#1 SaaS Spend Management Platform"; "top rated procurement orchestration platform on G2"; G2 4.6/5 from 261 reviews [ad__vertice-and-calculum.md]; G2 Grid SaaS Spend Management Summer 2025.
- "We just raised $50M to simplify procurement"; "UK's fastest-growing scale up" [ad__vertice-vs-najar-form.md]; "4th-fastest growing startup in Europe" [partners.md; nav Careers blurb].
- Board: Eldar Tuvey (CEO), Roy Tuvey (CEO — listed twice as CEO), Adam Fisher & Alex Ferrara (Bessemer), Georgia Watson (Lakestar), Laurel Bowden (83North).
- Offices: London (HQ, 180 Great Portland St), New York, Sydney, Johannesburg, Brno, Linz.
- Security: SOC 2 Type 2, end-to-end data encryption, Secure SDLC, strict access controls [platform__ai-procurement-software.md].

---

## 2. Product Taxonomy (from site navigation)

Recovered from `raw/html/home.html` `<nav>` (labels exact; URL in parentheses).

```
Products
  ├─ Intake-to-Procure            (/procurement-orchestration-software)
  ├─ SaaS Purchasing              (/saas-purchasing-platform)
  └─ Procure-to-Pay               (/procure-to-pay)
  Platform
  ├─ Dynamic Intake               (/platform/intake-management-software)
  ├─ Vendor Onboarding            (/platform/vendor-management-software)
  ├─ Budget Management            (/platform/budget-management)
  ├─ Workflow Builder             (/platform/procurement-automation-software)
  ├─ Risk Management              (/platform/supplier-risk-management-software)
  ├─ Pricing Benchmarks           (/platform/saas-pricing-benchmarks)
  ├─ Sourcing                     (/platform/sourcing)
  ├─ Contracts                    (/platform/contract-management)
  └─ Insights Hub                 (/platform/procurement-analytics-software)
  Other
  ├─ Integrations                 (/platform/integrations)
  ├─ Cloud Cost Optimization      (/cloud-cost-optimization-software)
  └─ AI Cost Optimization         (/platform/ai-cost-optimization)
  AI & Agents — "Orchestration, insights and autonomous negotiation." (/platform/ai-procurement-software)
  Product Tour — "Test the platform yourself" (/self-guided-tour)

Solutions
  Team:      Finance (/solutions/saas-spend-management-software)
             Procurement (/solutions/saas-procurement-software)
             IT & Security (/solutions/it-procurement-software)
             Legal (/solutions/saas-compliance-software)
  Challenge: Reduce software spend — "Maximize savings, reduce waste." (/saas-purchasing-platform)
             Contract management — "Spot risky terms, track renewals." (/platform/contract-management)
             Spend visibility & governance — "Track spend, measure ROI." (/platform/saas-usage-analytics)
             Supplier risk reduction — "Policy checks and monitoring." (/platform/supplier-risk-management-software)
             Streamline procurement ops — "Automate intake, routing, approvals." (/procurement-orchestration-software)
             Manage your suppliers — "Onboard, manage, track vendors." (/platform/vendor-management-software)

Pricing (/pricing)
Company: About, Advisory Board, Customer Stories, Newsroom, Partners, Careers ("Join the 4th fastest growing company in Europe."), Contact Us
Resources: SaaS Savings Calculator (/savings-analysis), Interactive Product Demo, Procurement Maturity Assessment,
           Community, Reports, Events, Insights Hub (/insights — "Explore spending trends."), Videos, Explore, Blog
Top bar: Ana (/ana) · Product tour · Book demo (/start-saving)
Announcement bar: "Meet Benny" (/benny-brute) · "Introducing Ana, our AI negotiation agent"
```

Not in the mega-menu but live pages: **SaaS Usage Analytics** (reached via Solutions > Spend visibility), **Expert Services / Expert Engage** (/platform/expert-engage, linked from home "Expert Services"), **Punchout Catalog** (/platform/punchout-catalog, linked from P2P), **Ana platform page** (/platform/ana), **Cloud Cost Management** solution page (/solutions/cloud-cost-management-software).

### Home page "Everything your team needs" — 5 pillars [home.md]
1. **Intake-to-Procure** — "Manage risk, automate and approve"
2. **SaaS Purchasing** — "Visibility, control and savings for your stack"
3. **Expert Services** — "Procurement expertise on demand"
4. **Pricing Data** — "20%+ savings with granular benchmarks"
5. **Vertice AI** — "Intelligence throughout your procurement"

Home "One platform to automate, benchmark, and control your spend" — 4 tiles: Vertice AI (70+ tasks), Automation, Data-driven (32,000 vendors), Control. Home "Why Vertice" — Visibility, Guaranteed savings, Seamless integrations, Intelligent routing.

### Commercial packaging (pricing page) [pricing.md]
| Package | Included |
|---|---|
| **Intake-to-Procure** | AI-Native Intake, Sourcing and Orchestration Across all Indirect Spend · Vendor, Risk and Contract Management · Advanced Procure-to-Pay Capabilities · Spend Analytics and PO Management · 70+ Procurement Agents · Integrations |
| **SaaS Purchasing** | Visibility, Contract Management and Reporting for Technology Spend · World's Largest Software Pricing Dataset · Expert Procurement Services · Software Usage Analytics and AI Cost Optimization · Autonomous Negotiation Agent (ANA) · Integrations |
| **Cloud Cost Optimization** | Visibility & Reporting · Continuous Recommendation Engine · Reserved Instance & Savings Plan Optimizer · Enterprise Discount Program Insights & Negotiation |

Orchestration page feature tabs (product-level IA): **Dynamic Intake · Workflow Builder · Vertice AI · Risk Management · Analytics · Integrations** [procurement-orchestration-software.md].
SaaS Purchasing page tabs: **Negotiation · Benchmarking · Visibility · Usage Analytics** [saas-purchasing-platform.md].
P2P page tabs: **Purchase Orders · Invoicing · Matching · Budgets & Analytics · Controls & Permissions** [procure-to-pay.md].
Cloud page tabs: **Clarity · Optimizations · RIO · EDP Management** [cloud-cost-optimization-software.md].
Ad-page platform tabs: **Visibility · Negotiation · Analytics · Benchmarking** [ad__vertice-vs-sastrify-form.md].

---

## 3. Modules in Detail

Each module: (a) what it does, (b) UI features/screens named, (c) value claim, (d) numbers, (e) persona.

### 3.1 Intake-to-Procure (product umbrella) — `procurement-orchestration-software.md`
- **(a)** "Submit any purchase request in one place. Automatically route approvals and orchestrate each request through to purchase, with AI embedded in your workflows."
- **(b)** Tabs: Dynamic Intake ("Streamline your purchases" — customizable simple forms), Workflow Builder ("Customize every workflow" — no-code drag-and-drop), Vertice AI ("50+ agents trained to complete 70+ procurement tasks; from compliance checks to negotiation tactics"), Risk Management ("Understand vendor risk" — continuously updated TPRM scores across security, legal, compliance surfaced in workflows), Analytics ("Visibility into your existing and future spend" — single dashboard, predictive insights), Integrations ("ERPs like Netsuite for POs. Slack and Teams for intake and alerts. CLMs like Ironclad for contracts. TPRMs like OneTrust for security.").
  - Process stages per FAQ: **Intake requests → Vendor evaluation (preferred supplier + BATNA) → Contract negotiation (price, length, payment terms, SLAs) → Approvals (finance, legal, IT, security)** → PO creation. Approval workflows are "configurable and dynamic", track decisions, **re-route** when more review needed.
  - Routing criteria: spend thresholds, types of purchase, risk requirements.
  - SaaS renewals go through an adapted intake: stakeholders review **usage, pricing benchmarks, alternatives and contract terms** before approval.
  - Carries context end-to-end into P2P: AP checks invoices vs what was agreed.
  - "Take a free tour — Intake-to-Procure demo".
- **(c)** "The intelligent procurement platform for better outcomes"; "Drive company-wide adoption of all your procurement processes"; reduces shadow IT; improves employee experience.
- **(d)** **50% reduction in purchasing time; 20% typical average savings; 70% reduction in manual steps**; 32,000+ vendors and **900k+ pricing points** (this page); Felix "processes 10 days shorter"; CloudHesive "50% faster procurement cycle".
- **(e)** Procurement ops, plus finance/IT/legal/security approvers; requesters.

### 3.2 Dynamic Intake — `platform__intake-management-software.md`
- **(a)** "One entry point for every request type — new purchases, renewals, RFPs. Forms adapt to each requester, auto-route to the right workflow."
- **(b)**
  - Accessible from a **single URL**, embedded in **Slack or Teams**.
  - Adaptive forms per request type: **new purchases, renewals, RFPs, custom needs** — requesters "only ever see and answer what's relevant".
  - **Preferred vendors**: automatically suggests existing and preferred vendors (anti-duplicate spend).
  - **"Smart, dynamic, conversational intake"**: Vertice AI extracts **order form data** and pre-fills request details.
  - **Smart document ingestion**: scans uploaded files so "requests can be launched immediately".
  - Form fields drive routing: **request type, cost, department, uploaded documents**.
  - Fully customizable fields; enforce policy compliance.
  - AI-driven checks **validate vendor data, flag duplicate requests**, surface spend insights before approval; high-risk/high-value purchases auto-routed for extra approval.
  - Intake data linked to **budget commitments** and Insights Hub pricing benchmarks so approvers see if spend is in line with market.
  - Generates data needed to raise a **purchase order**; open API to ERP.
- **(c)** "Simple intake drives adoption"; "maverick spend is eliminated by design rather than policed after the fact."
- **(d)** "cut approval delays by **over 50%**"; Insights Hub data: automated intake routing cuts cycle times by **an average of 27%**.
- **(e)** Requesters; procurement; approvers (legal, procurement, IT, compliance, finance).

### 3.3 Workflow Builder (Procurement Automation) — `platform__procurement-automation-software.md`
- **(a)** "Easily build purchasing workflows with a no-code, drag-and-drop builder to match your internal processes."
- **(b)**
  - **No-code configuration** — route approvals, assign tasks, "clear, auditable path"; build "without IT".
  - **Automate manual tasks** with Vertice AI — "compliance and legal checks to benchmarking prices".
  - **Pre-built templates** — "purchase requests and renewals to RFPs and contractor onboarding".
  - **Intelligent routing** — custom routing and assignment rules; by category, department, cost.
  - **No duplicated work** — native integrations orchestrate each stage.
  - Embeds policies: **approval limits, required documents, risk checks**.
  - Real-time visibility: **request status, approval progress, cycle times, bottlenecks**.
  - From comparison pages: **parallel approvals**, and "flexibility to **move backward** within a process when requirements change" [comparison__vertice-vs-zip.md].
  - Cross-sells: Vertice AI, **Contract Center** ("Lifecycle tracking, document scanning and compliance checks against your internal policies").
- **(c)** "AI-powered workflows accelerate your approvals with full auditing." "Halve approval times" (meta).
- **(d)** "cut procurement time in half" (intake page cross-link).
- **(e)** Procurement ops/admins.

### 3.4 Vendor Management / "Vendor Onboarding" — `platform__vendor-management-software.md`
- **(a)** "Centralize all your vendor data, risk, insights, tasks, and communications, with full visibility and control."
- **(b)**
  - **Keep on top of every order** — every vendor request "from RFP to contract", incl. tasks, renewals, risk reviews, conversations.
  - **Manage third-party risk** — risk across **security, financial, legal, compliance**, continuously updated scores and **vendor profiles**.
  - **Trends and insights** — Vertice AI monitors vendor changes across **pricing, features, usage, competitors**.
  - **Vendor portal** — find, request, communicate with preferred vendors; shows pricing benchmarks and risk signals; collect info or **send questionnaires** directly.
  - **Individual vendor profiles**: contracts, active requests, compliance info, performance metrics.
  - Document repository per vendor: **contracts, NDAs, offer forms**.
  - ERP integration connects **invoices to contracts** for reconciliation.
  - Lifecycle: onboarding & due diligence → performance management → renewals → offboarding; tracks compliance certifications.
- **(c)** "Understand what is happening with every vendor."
- **(d)** Benchmarking "based on over **$30B** of processed spend" (cross-sell card — conflicts with $75B elsewhere); 32,000 global software vendors.
- **(e)** Procurement, finance, legal, compliance.

### 3.5 Contracts (Contract Management / "Contract Center") — `platform__contract-management.md`
- **(a)** "Single source of truth for all your contracts. Track contract lifecycles, ownership, key terms and renewals."
- **(b)**
  - **Store, search and tag** contracts; track costs, surface key terms.
  - **Real-time renewal tracking** — **live pipeline view** with timelines, stages, upcoming deadlines; alerts via **email, Slack or Teams**.
  - **Non-compliance identified** — Vertice AI summarizes/highlights terms breaching internal compliance standards.
  - **Accurate data extraction** — upload contracts, AI extracts key details.
  - Extracted fields named elsewhere: **vendor, start date, contract type, pricing** [solutions__saas-compliance-software.md]; **liabilities, notice periods, renewals, SLAs** [same]; pricing, usage limits, obligations ("Contract Review").
  - Highlights **underutilized licenses and inactive tools** at renewal; audit log; security questionnaire tracking.
  - Mentions CLM features: automated workflows, approval routing, **e-signature integration**, audit trail.
- **(c)** "Take control of your contracts and never miss a renewal." Avoid costly auto-renewals.
- **(d)** Benchmarks/terms from 32,000+ vendors.
- **(e)** Procurement, legal, finance, contract managers.

### 3.6 Risk Management (Supplier Risk / TPRM) — `platform__supplier-risk-management-software.md`
- **(a)** "Surface supplier risks and enforce compliance. Third party risk management with in-line security, legal and compliance checks."
- **(b)**
  - TPRM aggregated from public sources, proprietary research, continuous monitoring of digital assets.
  - **Continuously refreshed TPRM scores across security, financial, legal, compliance and ESG**, surfaced in workflow, "validated regularly by the Vertice team" (human validation).
  - **Conduct your own review** — layer internal ratings from **Vanta, OneTrust, Dun & Bradstreet** on top.
  - **AI risk reviews** — agents review vendor risk vs legal, compliance, internal policies.
  - **Diligence Insights** + **Intelligent Workflows** (named features): summarized contract terms, **ISO certifications**, compliance info.
  - **Security questionnaires** (standard or custom) sent to vendors; reports attached to contracts; **security review subprocess** guiding vendors through risk scoring and approval.
  - **Alerts** when risk profile changes (security incident, compliance gap, certification lapse) before next contract/renewal step.
  - Risk profile can **trigger specific workflow paths** ("risk-based orchestration") [comparison__vertice-vs-tropic.md].
- **(c)** "Surface vendor risk in line with your purchasing workflow."
- **(e)** Security, legal, compliance, IT, finance.

### 3.7 Pricing Benchmarks — `platform__saas-pricing-benchmarks.md`
- **(a)** "Strengthen negotiations with real-time benchmarks… across 32,000+ vendors and 2M+ pricing points from the world's largest pricing dataset, continuously refreshed."
- **(b)**
  - **Software price benchmarking** — compare against peers by **tier, license count, billing frequency**.
  - **Understand contract risk and terms** — surface data security, compliance, legal risks in fine print; insights on common vendor terms.
  - **Vendor playbooks** — "Detailed vendor playbooks built from repeated interactions."
  - Benchmarks also factor **contract length, billing cadence, payment terms, negotiation timelines** [pricing.md FAQ].
  - Flags **uptime guarantees, liability clauses, notice periods, renewal terms**, data ownership [pricing.md FAQ].
- **(c)** Pay "only what you should"; negotiate "from a position of strength".
- **(d)** 32,000+ vendors; 2M+ pricing points; **250,000 human-negotiated contracts**.
- **(e)** Procurement, finance.

### 3.8 SaaS Usage Analytics — `platform__saas-usage-analytics.md`
- **(a)** "Rightsize your stack with real-time usage data."
- **(b)**
  - **User-level insights** — connect **SSO in minutes**; who is/isn't using each app; **login frequency and activity trends**.
  - **Identify shadow IT** — detect unknown/unauthorized subscriptions.
  - **Consolidation recommendations** — Vertice AI identifies overlapping/underutilized tools; bespoke savings recs.
  - Metrics: **license utilization, daily active users, adoption and usage patterns**; shelfware detection.
  - Cross-sell: **Insights Hub** — "Track everything from spend and timelines to bottlenecks and ROI, all from a single dashboard."
- **(c)** "Know your SaaS stack"; "only pay for what you use".
- **(d)** "**1 in 3** SaaS user licences are not used or are duplicates of another tool."
- **(e)** Finance, procurement, IT.

### 3.9 Insights Hub (Procurement Analytics) — `platform__procurement-analytics-software.md`
- **(a)** "Track spend, savings, and ROI across your entire software portfolio with predictive insights, benchmarking, and AI-powered recommendations, all from a single dashboard."
- **(b)**
  - **Predict your spend** — peer comparison, **predictive pricing** forecast, bespoke savings recommendations.
  - **Act before delays occur** — bottlenecks, slow approvals, **cycle times and task completion** across every request.
  - **Understand where to save** — prices vs peers.
  - Detects duplicate tools, underutilized subscriptions, overspending, **maverick spend**; category management insights; forecasting from historical spend.
  - Three outcome categories: cost savings; supplier performance management (renewal timelines, usage, risk); contract compliance (spend outside terms).
  - Note: "Insights Hub" is also the name of a public Resources section (/insights — "Explore spending trends").
- **(c)** "Intelligence that drives results."
- **(d)** Benchmarking "based on over **$75B** of processed spend".
- **(e)** Finance, procurement leaders.

### 3.10 Sourcing (RFx) — `platform__sourcing.md`
- **(a)** "Run supplier sourcing events at scale. From vendor discovery to shortlist… without adding headcount."
- **(b)** (feature list in page order)
  1. **Automatically detect sourcing criteria at intake** — agents turn a request into a **structured sourcing brief**.
  2. **Supplier discovery** — recommended vendors matched to intake criteria from 32,000+ vendors.
  3. **Validate every decision with market intelligence** — pricing benchmarks, real-time supplier risk, **which vendors are popular amongst your peers**.
  4. **Supplier responses** — RFx responses collected and summarized; **key differentiators, risks and gaps** identified.
  5. **Score, evaluate and award** — **configurable weighted scoring, side by side comparisons, tradeoff analysis**.
  6. **Keep the process moving** — **AI-powered clarification questions and follow-ups** to vendors, or **book a procurement specialist**.
  - RFx types: **RFI, RFP, RFQ**; documents generated automatically and ready to send; supplier **centralized portal** to submit documents and **track response status**; in-line TPRM before final scoring.
- **(c)** "Find the right vendors. Fast."
- **(d)** AI recommendations search **16,000+ suppliers** (headline) / database of **32,000+ vendors** (body) — "research time is halved"; $75bn+ spend.
- **(e)** Procurement / sourcing.

### 3.11 Budget Management — `platform__budget-management.md` (H1: "Spend Management Software")
- **(a)** "Full budget visibility… from the first commitment to the final payment."
- **(b)**
  - **Real-time spend visibility** — spent, **in flight**, **remaining** vs budget.
  - **Forecast expected budget utilization** — factors **committed and pipeline spend**.
  - **Prevent over-commitment at point of intake** — flags **at-risk budgets** before spend is authorised.
  - **Connect your systems** — integrate budget tools, **import via CSV**, or manual input — "single pane of glass".
  - Maps requests to **cost center and budget owner**; **budget variance** tracking; **automated spend alerts** when department nears forecasted limit; identifies growth "inflection points" that trigger price hikes.
- **(c)** "Bridge the gap between financial planning and procurement execution"; eliminates "end-of-quarter surprises".
- **(d)** Guaranteed ROI "typically delivering **7x**"; "**20%+** guaranteed savings benchmark"; one million vendor interactions; two million human-led interactions.
- **(e)** Finance / CFO.

### 3.12 Expert Services ("Expert Engage") — `platform__expert-engage.md`
- **(a)** "Procurement expertise on demand… experts work alongside your team."
- **(b)** Service catalog (10 cards): **Negotiation · Benchmarking · RFI · RFQ · RFP · Consolidation & Rationalization · Vendor Recommendation · Peer Group Analysis · Budgetary Planning & Analysis · Procurement Maturity Assessment**. Engagement modes: on demand, specific initiatives, or entire function.
  - Dedicated procurement manager / "dedicated account manager" / "1-1 relationship with a dedicated, highly-experienced buyer" [comparison pages, start-saving, ad pages].
  - Only SaaS contracts are negotiated on customers' behalf; workflows work for SaaS and non-SaaS [start-saving.md FAQ]. (Comparison pages claim expert services "across all direct and indirect spend" — conflict.)
  - Cloud: EDP / PPA negotiation by expert buyers [cloud pages].
- **(c)** "Specialists that go further"; "Extend your procurement function"; tail spend gets expert attention.
- **(d)** Tail spend "80% of a team's time… 20% of the value"; **Holidu saved $155,000** on a single renewal; **A.Team reclaimed 115 hours** of negotiation time; 7x ROI; ≥20% savings.
- **(e)** CFO, procurement leaders with lean teams.

### 3.13 Ana — Autonomous Negotiation Agent — `ana.md`, `platform__ana.md`, `get-started-with-ana.md`
- **(a)** "The AI negotiation agent for software purchases." Negotiates renewals at scale; "specializing in long tail spend".
- **(b)**
  - Builds a **data-driven negotiation strategy**: benchmarking insights, negotiation tactics, **emails drafted to vendors, personalized to your voice**.
  - Modes: **run autonomously, or as a negotiation copilot**. (FAQ: "designed as a co-pilot, not an autopilot.")
  - **Strategy shaped by what works** — trained on thousands of real negotiations; recognizes vendor behaviour; what's negotiable.
  - **Scenario forecasting** — **Monte Carlo simulation** across multiple rounds; **strategy dashboard** maps **win probabilities** and scenario planning; "probabilistic outcomes mapped out"; updates as vendor responds.
  - **Analysis of your specific leverage** in the deal.
  - Pre-trained on vendor tactics: **pricing walls, urgency plays, bundling** — built-in responses.
  - **Single tracked email thread**; **live negotiation workspace** logs **thread, positions, key events and deal status**.
  - Guardrails: drafts every email **with reasoning**, **waits for approval** before sending; **tone settings and constraints** configured upfront; user can review, edit, ignore; tone/timing/escalation remain user's.
  - **Deal overview and analysis** with evidence for why a purchase was approved (audit trail) [Bloomberg quote].
  - "Everything is in the same page" vs separate Gmail/Claude/Excel tabs [Lenqi quote].
  - Data confidentiality: trained on aggregate dataset; individual contract data not shared.
  - Scope: currently software vendors; "Speak to the Vertice team to find out if your purchases are in scope."
- **(c)** "Negotiate at limitless scale"; "hours back on every negotiation"; "negotiation at scale, without increasing headcount"; "The #1 AI Agent for your vendor negotiations". Baringa quote: "It replaces chore, not core".
- **(d)** **$500 million** negotiated across **4000+ negotiations**; buyers achieve **18% savings on average**; **15 days cut from renewal cycles**; 32k+ vendors; 2M+ price points; $75bn+ spend; four years of Vertice negotiation data.
- **(e)** Procurement buyers, finance; long-tail renewals.

### 3.14 AI Cost Optimization — `platform__ai-cost-optimization.md`
- **(a)** "Take control of your AI spend… unified view of spend, usage, and commitments across every provider."
- **(b)**
  - Providers named: **OpenAI, Anthropic, Cursor** ("and every model your teams use").
  - **Recommendations** — switch to cheaper models for low-complexity tasks, right-size commitments, flag overspending teams.
  - **Breakdown** by **provider, model, department, date range**.
  - **Forecast** — daily and annual spend; **90-day forecasts** accounting for weekday patterns and recent usage.
  - **Commitments** — actual vs committed usage agreements; **pro-rata burn, remaining budget, projected annual spend per provider**; flags **"on-track", "at-risk", "over-limit"**.
  - FinOps: cost allocation, **anomaly detection** for LLM cost spikes, token usage, shadow AI, budget threshold alerts.
- **(c)** "Every AI cost, in one place." "See overages weeks in advance, not at month-end close."
- **(d)** Consumption-based pricing increases budget volatility by **40%** (Vertice 2026 data); 7x ROI; 20% savings.
- **(e)** Finance + IT.

### 3.15 Cloud Cost Optimization — `cloud-cost-optimization-software.md`, `solutions__cloud-cost-management-software.md`
- **(a)** "The automated cloud cost optimization solution that reduces your spend by 30%." AWS-focused.
- **(b)**
  - Tabs: **Clarity** ("Single pane of glass" for IT and finance) · **Optimizations** ("100+ optimization tests" with quantified saving estimates) · **RIO** (Reserved Instance Optimizer) · **EDP Management**.
  - Tests cover **40+ AWS products incl. EC2, Lambda, S3, RDS**; **step-by-step implementation guides ranked by engineering effort**.
  - **RIO**: monitors RI and Savings Plan coverage vs live usage; "advanced algorithms **buy and sell** RIs on your behalf".
  - **EDP / PPA**: expert buyers negotiate; platform tracks EDP commitment for over/under spend.
  - Analytics by **product, tag, resource, region, team**; monthly cost drivers and spikes; forecasting from history + potential optimizations; shared dashboards with finance.
- **(c)** "Cut your cloud costs. Not your growth." "Automate savings. Focus on innovation."
- **(d)** **100+** tests; **40+** products; **34%** average savings on EC2 + RDS; **64%** average commitment rate; RIO savings "as much as **60%**" on ECS and RDS; "reduce spend by **30%**"; Encompass **$140k+** in 3 months; Cybersecurity Leader **$1.1m**; HR Tech **€500k in 6 months**.
- **(e)** Cloud engineers/FinOps, finance.

### 3.16 Procure-to-Pay — `procure-to-pay.md`
- **(a)** "Purchase orders, invoice capture, coding, matching and approvals, connected to your ledger and checked against authorized spend and negotiated prices."
- **(b)**
  - **Purchase Orders — "Commit with confidence"**: create PO from **approved contract or from scratch**, or **pull existing from ERP**; **line-level GL codes**; **negotiated savings visible on every order**.
  - **Invoicing — "Coded on arrival"**: invoices via **mailbox, vendor portal or ERP sync**; line items & coding extracted automatically; checked vs **vendor record and past invoices**; duplicate detection; exception routing.
  - **Matching — "Paid on what was agreed"**: invoice matched to **PO and contract terms**; differences surface before payment. (Goods receipt / true 3-way matching is "a planned addition".)
  - **Budgets & Analytics — "Budget confirmed, before approval"**: real-time budget position at approval; accruals; spend by **vendor, category, department**; **committed, invoiced and paid** tracked vs budget.
  - **Controls & Permissions — "Ready for audit"**: segregation of duties (raises / approves / pays); full audit trail; policy-based routing (amount, department, vendor, any condition).
  - Benefits cards: Contract terms already attached · Market pricing built in · Routine purchases pre-approved (pre-approved catalog or punchout) · Savings before the invoice lands · Connected to your ledger.
  - P2P steps: purchase request → approval → PO → goods receipt → invoice matching → payment.
- **(c)** "Most AP tools meet the invoice for the first time. Vertice already holds the terms it should match." "The price agreed at signature is the price that gets paid."
- **(d)** 32,000+ vendors, 2M+ price points; Piano **600% ROI** in <1 year; Grow **6x ROI in 3 months**.
- **(e)** Finance / AP / controllers.

### 3.17 Punchout Catalog — `platform__punchout-catalog.md`
- **(a)** "Speed up everyday buying, without losing spend control."
- **(b)** **Live supplier catalogs** (**Amazon Business, Staples, CDW**); **Negotiated pricing** at point of purchase; **Create purchase requests automatically** (cart returns into Vertice with details captured); **Built-in approvals**. Best for IT hardware, office supplies, equipment. Punchout vs hosted catalog explained.
- **(e)** Employees/requesters, procurement, finance.

### 3.18 Integrations — see Section 5.

---

## 4. AI Capabilities (complete list)

### Vertice AI — platform-wide [platform__ai-procurement-software.md]
- "Trained to complete **70+ procurement tasks**"; "**50+ agents**" / "50+ AI tools and agents" [procurement-orchestration-software.md, solutions__it-procurement-software.md]; pricing lists "70+ Procurement Agents".
- Architecture claim: "a network of 50+ procurement agents working in the background… accessible through an **embedded AI agent that recruits the most suitable agent or agents** for the individual task."
- Five attributes (tabs): **Intelligent · Efficient · Intuitive · Secure · Contextual**.
- Training data: **250k+ contracts negotiated; 2M+ vendor email and call interactions; $75bn processed spend**; plus per-customer context (contracts, workflow templates, cycle data, policies, approval flows, usage, renewals).
- "Trained on the most advanced reasoning models" [solutions__saas-procurement-software.md].

### "Meet the Agents" — 12 named agents [platform__ai-procurement-software.md]
| Agent | What it does |
|---|---|
| Conversational Intake Agent | Start requests in chat; capture structured details without forms |
| Compliance Agent | Check requests vs compliance standards: payment, renewal, SLAs, data |
| Legal Agent | Review contracts vs legal preferences: termination, liability, IP, key terms |
| Vendor Analysis Agent | Assess vendors on pricing, risk, alternatives |
| Benchmarking Agent | Compare vendor pricing to market — "instantly see if you're overpaying" |
| Sourcing Agent | Find relevant vendors using pricing, risk, market trends |
| Document Analysis Agent | Extract key terms, risks, insights from contracts and invoices |
| TPRM Agent | Run vendor risk checks, collect documents, ensure compliance pre-approval |
| Analytics Agent | Analyse spend, contracts, renewals for savings, risks, trends |
| Tech Consolidation Agent | Identify overlapping tools and unused licenses |
| Workflow Agent | Create **custom agents** for any workflow task; outputs drive the next step |
| Email Agent | Draft and send emails for negotiations, approvals, follow-ups using workflow context |

### Ana — Autonomous Negotiation Agent (ANA) — see 3.13.

### Named AI features across pages
| Feature | Description | Source |
|---|---|---|
| AI contract extraction / "Accurate data extraction" | Extract vendor, start date, contract type, pricing; key terms from contracts & invoices | contract-management, saas-compliance |
| Contract Review | Surface pricing, usage limits, obligations without reading every page | solutions pages |
| Non-compliance identification | AI summarizes/highlights terms breaching standards | contract-management |
| Renewal Insight | Upcoming renewals early, with benchmarks and cost-impacting terms | solutions pages |
| Negotiation Tactics | Guidance backed by benchmarks, playbooks, vendor data | solutions pages |
| Benchmarking (AI) | Compare any quote to market before signing | solutions pages |
| Consolidation (AI consolidation recommendations) | Overlapping/underutilized tools, bespoke savings | saas-usage-analytics, solutions |
| Risk Assessment / AI risk reviews | Vendor adherence to internal policy; agents review risk | supplier-risk, solutions |
| Diligence Insights | Liabilities, notice periods, renewal clauses, missing SLAs/certifications, high-risk clauses | it-procurement, saas-compliance |
| Conversational / smart intake + order-form extraction | Pre-fill request details; smart document ingestion | intake |
| Duplicate request + vendor data validation | AI checks before approval | intake FAQ |
| Vendor Trends and insights | Monitor pricing, features, usage, competitors | vendor-management |
| Sourcing brief auto-detection | Requirements detected at intake → structured brief | sourcing |
| AI supplier recommendations | Matched vendors + peer popularity | sourcing |
| RFx response summarization | Differentiators, risks, gaps | sourcing |
| AI clarification questions & follow-ups | Generated to vendors (based on risk profile) | sourcing |
| Predictive pricing / spend forecast | Forecast future spend | analytics, saas-spend-mgmt |
| Spend/usage anomaly alerts | "alerted to usage and spend anomalies" | saas-spend-management |
| AI Cost recommendations + 90-day forecasts + anomaly detection | Model switching, commitment right-sizing | ai-cost-optimization |
| RI/SP buy-sell algorithms ("Cloud RI agent" in image filenames) | Automated commitment management | cloud pages |
| Invoice line-item & coding extraction | Auto-coding on arrival, duplicate detection | procure-to-pay |

### AI surfaces seen only in product imagery (Section 9)
| Surface | What it shows |
|---|---|
| **Vertice AI chat assistant** (drawer + full page) | Greeting + suggested prompts by category ("Contracts"); "Thought for N seconds"; table answers; summary bullets; next-action chips ("Initiate a renewal", "Run benchmark analysis", "Run Ana negotiation agent"); file attach; integration-context chip (NetSuite); "Prompt Guide" |
| **AI agent as workflow step owner** | Node "Vertice AI – Compliance" runs in parallel with human "Risk Review" |
| **AI-prefilled intake with provenance** | Sparkle fields + "AI" chip + reason ("Based on 4 previous requests", "Most frequent selection", "Matched from contract history"); "3 fields filled · Review and edit if needed" |
| **Create contract from file** | PDF scan animation → Vendor, Contract Category, Contract Type pre-filled |
| **AI Comparison** | Renewal vs current contract diff; "New terms added", "Auto-renewal clause added" |
| **Key Renewal Stats** | "3x new features, +17% price, +45 licences"; checks Usage Terms, Pricing, Comments, Policies |
| **AI Recommendations** (security review) | Suggested remediation actions |
| **Stack Consolidation** | Utilization of overlapping tools → consolidation card |
| **AI glossary popover** | Plain-English definition of a contract term on hover |
| **AI budget check** | Sparkle popover "Do you have a budget for this?" at intake with Free/Committed/Invoiced/Paid |
| **AI follow-ups** (sourcing) | Suggested follow-up questions grouped by brief section, "Send" |
| **Ana Negotiation Plan / Monte Carlo / Deal Overview / email draft** | See 9.14 |
| **AI Savings Recommendations** (AI spend) | Model-switch, token-commitment right-size, team over benchmark, retries |

---

## 5. Integrations [platform__integrations.md unless noted]

| Category | Capabilities claimed | Named integrations |
|---|---|---|
| **ERP** | Reconcile invoice data vs contract values; sync vendor records & auto-create in ERP; push auto-created POs and track status | NetSuite, Coupa, SAP Ariba, MSD 365 BC, Workday, Sage Intacct, MSD Finance and Ops, QuickBooks Desktop, QuickBooks Online, Sage Business Cloud, Wave Financial, Xero, Zoho Books, Clear Books, FreeAgent, FreshBooks |
| **Communication** | Route requests/approvals via Slack or Teams; renewal alerts; real-time vetting threads | Slack, Google Chat, Teams |
| **SaaS usage monitoring (SSO)** | Login trends for renewals; underutilized licenses via SSO; shadow IT via unauthorized sign-ins | Google Workspace, Microsoft Entra ID, Okta, OneLogin, JumpCloud |
| **Budgeting** | Feed actuals into FP&A; forecast renewals; automated budget checks | Anaplan, Google Sheets, Metabase, Pigment, Sharepoint |
| **Legal (CLM / e-sign)** | Trigger legal workflows from intake; align contract data; redlining and eSignatures | IronClad, Conga, Docusign, Google Docs, Adobe Sign, Juro, Microsoft 365, Sharepoint, Tomorro, Spotdraft |
| **TPRM** | Validate certifications vs GRC; fast-track pre-vetted vendors; centralize risk docs | OneTrust, Vanta, Drata, Hyperproof, Sprinto, Scrut Automation, Thoropass, Secureframe |
| **Data** (risk/financial data providers) | Export spend/usage to warehouse; ROI; audit archive; C-suite dashboards | Credit Safe, Dun & Bradstreet, Ecovadis, Security Scorecard |
| **Business processes & ticketing** | Convert tickets to purchase requests; bi-directional sync; link approvals to IT provisioning | Jira, Trello, ServiceNow, Monday |
| **HRIS** | Reclaim licenses on offboarding; departmental chargebacks; role-based provisioning | ADP Workforce, Bamboo HR, Dayforce, Deel, Factorial, Google Workspace, Gusto, HiBob, Humaans, Justworks, Lucca, Namely, Payfit, Personio, Rippling, SAP Success Factors |
| **Punchout suppliers** | Live catalogs | Amazon Business, Staples, CDW [platform__punchout-catalog.md] |
| **AI providers** (cost tracking) | Spend/usage/commitments | OpenAI, Anthropic, Cursor [platform__ai-cost-optimization.md] |
| **Cloud** | Cost optimization, RIs/SPs, EDP | AWS (EC2, Lambda, S3, RDS, ECS; 40+ products) [cloud pages] |
| **Other** | Open API; "API access for deep, bi-directional data flow" | [intake FAQ, partners.md] |

Home claim: "We integrate with all major finance ERPs, contract management systems, ticketing platforms, messaging tools, TPRMs and SSOs." P2P FAQ names native ERPs: NetSuite, Xero, QuickBooks, Microsoft Dynamics.

Partner tracks [partners.md]: **Technical & Integration** (API, joint dev/test environment, co-marketing), **Channel & Referral** (recurring commission, partner manager, reseller/co-branding), **Strategic & Consulting** (priority support, roadmap access, white-label, certification).

---

## 6. Pricing & Commercial Model

- **No list prices published.** Three packages: Intake-to-Procure, SaaS Purchasing, Cloud Cost Optimization (contents in Section 2). Each has "Get started" → demo. [pricing.md]
- **Fee basis**: "We charge a **flat fee based on your annual SaaS and cloud spend**, and **you only pay if we save you money**. We guarantee your savings." [start-saving.md, ad__vertice-vs-najar-form.md]
- **Savings guarantee**: "Cost savings **contractually guaranteed**" [pricing.md]; "20%+ guaranteed savings benchmark" [budget-management]; "Guaranteed SaaS savings — **money back if we don't meet it**" [ad sastrify/spendflo]; "**Save up to 25% on SaaS spend — or Vertice rebates the difference**" and "**You'll never pay more than we save you.** That's a promise." [ad najar]; "Guaranteed savings based on SaaS spend, with typically 7x annual ROI and payback in 90 days" [comparison pages]; "**110%** savings guarantee achieved" [ad__spend-audit.md].
- **Headline outcomes**: 20% average savings · 7x average ROI · 90 days typical payback · 50% reduction in purchasing time [home, pricing, start-saving].
- **Negotiation not an add-on**: "negotiation support isn't a premium add-on — it's a core part of our offering." [pricing.md]
- **Independence**: "100% independent, not a reseller" [ad sastrify/spendflo] (jab at marketplace models).
- **Onboarding**: Vertice sets up the platform; kickoff call on finance, security, legal requirements; agreed check-in cadence with **dedicated account manager** [start-saving.md]. FirstVet "Onboarded in 14 days".
- **Lead magnets**: Free **SaaS Spend Audit** (4 steps: realize overspend → share subscriptions securely → experts review → customized report) [ad__spend-audit.md]; **SaaS Savings Calculator** (/savings-analysis: fields Vendor name*, Product, Tier, Annual Cost (USD)*, Number of licenses, Term length [1 year / 2 years / 3 years or more] → email; "Results in your inbox in 2 minutes"; 30 common vendors e.g. Salesforce, Microsoft, Google, Atlassian); Procurement Impact Report 2025; Procurement Maturity Assessment.

---

## 7. Competitive Differentiation

Common Vertice-side table (identical on Zip/ORO/Omnea/Tonkean/Spendflo): Workflows "built to drive measurable efficiency and financial gains"; AI "trained on 32K+ vendor benchmarks, 35K+ contracts and 1M+ human interactions, powering 70+ procurement agents"; native TPRM; real-time benchmarks from 32,000+ suppliers; teams across US/EMEA/APAC; global experts for "all direct and indirect spend"; guaranteed savings, 7x ROI, 90-day payback; best fit $500K+ SaaS spend.
Recurring frame: **"Efficiency vs Realized Outcomes"** — competitors' value = "cost avoidance… time saved against salaries… difficult to prove to a CFO"; Vertice = "hard-dollar savings". And **"AI is only as good as the data behind it."**

| Competitor | Their profile (per Vertice) | Vertice's claimed edge | Source |
|---|---|---|---|
| **Tropic** | AI agents for contract intelligence, negotiation support, smart requests, compliance, invoice verification; benchmarks from historical contract data/managed spend; primarily US; expert advisory or full-service negotiation available | **Global coverage** (30+ countries) vs US focus; **risk orchestration vs static scanning** (risk profile triggers workflow paths); "shift from process to outcome"; pricing intelligence "updated daily from thousands of live human-driven SaaS transactions" | comparison__vertice-vs-tropic.md |
| **Zip** | Strong workflows, outcomes not tied to financials; AI for intake, risk detection, contract analysis, renewal guidance; TPRM not native (third-party integrations); third-party, US-centric generic pricing data; strong US, less EMEA; no expert services; no savings guarantee; best for workflow automation | Same efficiency **plus guaranteed 20%+ hard savings**; native intelligence; parallel approvals and backward moves in workflows; customer-specific context in AI | comparison__vertice-vs-zip.md |
| **ORO (Oro Labs)** | Solves "process problem"; AI for intake, approvals, policy enforcement; cross-functional risk reviews; no benchmarking; US-focused; no experts; no guarantee; best for supplier intake/orchestration | Ties workflows to commercial outcomes; workflows surface renewal risks, flag overspend, drive negotiation cycles | comparison__vertice-vs-oro.md |
| **Omnea** | Intuitive AI in workflows + Slack/Teams conversational intake; embedded TPRM with AI tiering/summaries; no benchmarking; UK-domestic; platform-only, no negotiation; best for UK orgs focused on compliance/process | "Where Omnea helps you manage how procurement runs, Vertice is built to manage both the process and the results"; multi-region; negotiation + pricing data + guarantee | comparison__vertice-vs-omnea.md |
| **Tonkean** | AI-driven orchestration for process automation/compliance; orchestrated TPRM with security doc analysis and post-signature monitoring; no benchmarks; US-focused; software-only; best for intake & compliance workflows | **Dedicated procurement manager** who reviews contracts, validates pricing, negotiates; savings guarantee; benchmark data | comparison__vertice-vs-tonkean.md |
| **Spendflo** | Agents for routine tasks/reporting; SIG-based TPRM questionnaires with manual flagging; shallower benchmarks; India-centric delivery; negotiation available; guarantee "dependent on specific contract conditions"; best for cost-conscious mid-market with India/Asia ops | **"Consistent Negotiators vs Rotating Buyers"** — dedicated single point of contact; global; deeper data. Ad table: Spendflo lacks dedicated 1-1 buyer, savings guarantee, custom advanced approval workflows, cloud cost optimization; "Lower average savings"; contract insights, benchmarking, usage analytics marked "Added hidden cost"; Vertice "25-30% average discount". G2 scores Vertice vs Spendflo: Ease of Admin 93/89, Quality of Support 96/94, Savings 92/87 | comparison__vertice-vs-spendflo.md, ad__vertice-vs-spendflo-form.md |
| **Sastrify** | (ad page) Has renewals calendar, intake forms, basic approvals, risk/compliance insights, **SaaS Marketplace with generic discounts**, approval workflows, custom intake forms | Vertice adds: SaaS negotiations with 20% avg discount, real-time spend tracking, advanced no-code builder, workflow templates, cloud negotiation, cloud cost tool (30%). "100% independent, not a reseller." G2 scores Vertice vs Sastrify: Contract Mgmt 91/88, Dashboards 88/83, Ease of Admin 93/90, Support 96/95, Ease of Setup 89/88, Product Direction 95/94. G2 review contrasts on onboarding speed, usability, renewal process, Ironclad/NetSuite integration | ad__vertice-vs-sastrify-form.md |
| **Najar** | Ad page never names Najar in body (generic "Why companies pick Vertice"). Blog: founded 2021, France-focused SMB/mid-market, negotiation support standard, limited international presence | Global footprint, "World's largest SaaS pricing database"; dedicated expert buyer; guarantee "Save up to 25% or Vertice rebates the difference"; pain points: 90% overpay, 26% per-employee SaaS cost growth to $8,700/head, 40+ emails per request | ad__vertice-vs-najar-form.md, blog__best-saas-management-platforms.md |

---

## 8. Value-Message Bank (paraphrased, each under 15 words)

**CFO / Finance**
- Savings are contractually guaranteed — you only pay if we save.
- 20% average savings, 7x ROI, payback in about 90 days.
- See committed and pipeline spend before it hits the budget.
- Flag at-risk budgets at intake, not at quarter-end close.
- Hard-dollar savings, not "time saved" math you can't prove.
- Software spend that scales with revenue, not ahead of it.
- One in three SaaS licenses is unused or duplicated.
- Companies overpay for software by 34% on average.
- The price agreed at signature is the price that gets paid.
- Forecast AI spend 90 days out — see overages weeks ahead.

**Procurement**
- Halve your cycles and cut costs by 20%.
- One front door for every request — URL, Slack or Teams.
- No-code, drag-and-drop workflows mirror your policy exactly.
- 70+ procurement tasks handled by embedded AI agents.
- Negotiate every renewal with data from 32,000+ vendors.
- Benchmarks from human-negotiated contracts, not public list prices.
- Ana negotiates the long tail at scale, without new headcount.
- Ana users save 18% and cut 15 days per renewal.
- An expert procurement team that extends yours, on demand.
- Turn a request into a sourcing brief, shortlist and scored award.

**IT & Security**
- Connect SSO in minutes; see who actually uses each app.
- Detect shadow IT before it becomes a security risk.
- Continuously refreshed risk scores across security, financial, legal, compliance, ESG.
- Layer your Vanta, OneTrust or D&B ratings on top.
- Reclaim licenses automatically when employees offboard.
- AI flags overlapping tools before a duplicate gets bought.

**Legal**
- Embed legal requirements at the very start of the purchase.
- AI flags non-compliant terms against your playbook automatically.
- Liabilities, notice periods, SLAs extracted and compared to policy.
- Never be the bottleneck — alerts in your CLM and chat.
- Full audit trail of every decision and negotiation.

**Requesters / employees**
- Forms only ask what's relevant to your request.
- Upload the order form; AI pre-fills the request.
- Buy from Amazon Business, Staples, CDW at negotiated prices.
- Preferred vendors suggested automatically — no duplicate buys.

**Cloud / FinOps**
- 100+ continuous tests across 40+ AWS products.
- Algorithms buy and sell RIs on your behalf.
- 34% average savings on EC2 and RDS.
- Experts negotiate an EDP that fits real future demand.

---

## 9. UI Screen Inventory (from product imagery)

Every image is a cropped marketing mock, so none shows a complete app. Still, together they show enough of the real app shell, screens, status vocabulary and sample data to build a believable replica. Filenames are given relative to `images_png/`.

### 9.0 Design system (consistent across ~159 images)
- **Type**: Inter-like sans. Page titles are about 22px semibold, near-black. Table headers are UPPERCASE with wide letter-spacing on a light gray-blue fill (~#F6F8FA).
- **Primary color**: violet ~#6200EA/#6B00F5, used for buttons, links, the active nav item, progress bars and highlighted values. A secondary bright blue ~#0057FF appears on some buttons ("Save and Close", "Open") and charts. The accent green ~#16A34A marks done, preferred and CTA states in the negotiation/catalog cards. Cloud screens add magenta ~#E22FC8.
- **Hero KPI card**: a deep indigo-to-violet gradient (#3A0CA3 to #8E44FF) with white text. It is always the first tile in a KPI row.
- **Surfaces**:
  - App window: off-white (#FCFBFC).
  - Page background: warm gray (#F3F2F0 / #F5F4F1) with a faint dot grid.
  - Cards: white, radius 16–24px, 1px border ~#E5E7EB.
  - Workflow canvas: dashed or dot grid.
- **AI motif**: a purple 4-point sparkle (big plus small star) followed by gradient text running violet (#8B5CF6) to periwinkle (#A5B4FC). Examples: "AI Comparison", "Insights", "Key Renewal Stats", "Stack Consolidation", "AI Recommendations", "Create contract from file".
  - AI-filled form fields get a lavender background, purple value text and a sparkle after the label.
  - Provenance chips show an "AI" pill plus the reason for the fill, e.g. "Based on 4 previous requests", "Most frequent selection", "Matched from contract history".
- **Status pills** (rounded, tinted fill, colored text):
  - Green: Completed, Live (dot), Approved, Ordered, Paid, In budget, Low risk, Preferred / Preferred Vendor (green outline), Response Received.
  - Orange/amber: Pending, Pending Approval, Medium risk, Not Live Yet (amber + clock dot), Not Live (orange-red dot), "Due in N days".
  - Red: Expired, Unapproved (red outline), High, Critical, "N days overdue".
  - Blue: New, To Pay, PDF, "5 new".
  - Lavender with purple text: Live Contract (check), Current vendor, Vendor Reviewed, Requested Supplier, Yearly, Save 18%, Fit: High, Reviewed.
  - Gray: Draft, Not submitted, Not requested, Default.
  - Solid violet: Ordered (alt), Best Price, Selected.
- **Workflow node states**:
  - Completed: green border and glow, green check tile.
  - Pending/in progress: purple border, dashed-circle icon on a lavender tile.
  - Active/selected: blue border.
  - Dragged node: rendered tilted.
- **Decoration**: a large purple cursor arrow appears on almost every image. It is marketing decoration, not UI.

### 9.1 App shell / left navigation
- **Collapsed icon rail** (~96px), top to bottom:
  1. "V" logo tile: blue-violet check mark on lavender.
  2. Search.
  3. Dashboard (grid).
  4. Tasks (check-circle).
  5. Workflows (node/branch).
  6. Briefcase (contracts/vendors).
  7. Folder (documents).
  8. Divider.
  9. Lightbulb (Savings Insights / Analytics / AI Spend).
  10. Storefront (Benchmark Pricing / catalog).
  11. Shuffle (intake/routing).
  12. Bottom: Help, Settings, User.
  - Active item: lavender background, purple icon, 2px purple bar on the right edge.
  - Sources: home__static-*.png, home__e2c30965...guaranteed-savings.png, platform__ai-cost-optimization__forecast-cost.png.
- **Expanded sidebar**, the only labeled version (procure-to-pay__Catalogue.png):
  - "vertice" wordmark and a bell icon.
  - Search box with a "⌘+K" hint.
  - Group 1: Dashboard, Tasks, Requests, Contracts, Documents.
  - Group 2: Offers, Catalog purchases, Purchase orders, Orders, Invoices, Savings.
  - Group 3: Insights (expandable), Vendors (expandable), Workflows, Events.
- **Page header**: title at top left, "X" close at top right, thin divider. Many screens are modals with a "V" logo tile, a title and an X.
- **Global Vertice AI drawer**: header shows "Vertice AI" with icons Help (?), History (clock), Layout toggle, Expand, Close (X).

### 9.2 Dashboard ("Welcome, Matt!")
Sources: home__static-saas-purchasing.png, platform__expert-engage__Dashboard-2.png.
- **Savings card**:
  - Headline "$1,375,244" (also seen as $1,375,250).
  - Legend: Historical (purple) / Projected (gray).
  - Area chart Jan–Dec on a $0–$2.5M axis; history runs to Jun, then the projection rises to ~$2.2–2.4M.
- **Savings Opportunity card**: "$242,250".
  - Rows: Deduplication $100,000; Team Commitment $81,250; "Sensetting" (sic) $61,000.
  - "See All >" link.
- **Annualized Spend card**:
  - Semicircle gauge with an "All" dropdown. "Total Spend $2,150,175".
  - Legend: IT $731,060 (34%), Sales $516,042 (24%), General $344,028 (16%), Business Operations $236,519 (11%), Talent $64,505 (3%), Other $258,021 (12%).
- **KPI tiles**, each with a violet square icon button:
  - "Intake: 19 Completed / In draft 5"
  - "Third Party Risks: 2 Critical / Medium 1"
  - "POs: 8 Approved / In review 6"
- **Contracts (39) table**:
  - Toggle: Contracts | Requests.
  - Columns: Vendor (with subtitle), Department, Cost ("Total Contract Cost"), Savings ("Total Contract Savings"), Status.
  - Status pills: Completed, Live Contract, Not Live Yet.
  - Sample rows:

    | Vendor | Department / category | Cost | Savings | Status |
    |---|---|---|---|---|
    | Slack | SaaS – Contract Renewal | $38,000 | $200,000 | Completed |
    | HubSpot | — | $72,000 | $340,000 | Completed |
    | Microsoft | Marketing Ad Spend | $250,000 | — | Not Live Yet |
    | ChatGPT | Artificial Intelligence | $168,000 | — | Live Contract |
    | Okta | — | $435,000 | — | Live Contract |
    | Claude | — | $90,000 | — | Live Contract |

  - Footer links: "See All Contracts >" / "All Contracts ->".

### 9.3 Renewals Pipeline / Visibility (the "live pipeline view")
Sources: saas-purchasing-platform__Live-pipeline.png, __visibility-tab.png, home__Card_Img_Sizing-2.png, self-guided-tour__SaaS-Purchasing-Hero-2.png.
- **Card "Pipeline"**:
  - Horizontal month axis with pill labels Jun, Jul, Aug, Sep, Oct, and a dark vertical "today" line.
  - Vendor logo tiles are stacked per month at their renewal date. The tile border color shows status: green, purple or orange.
  - Logos shown: Framer, Workday, Atlassian, Snowflake, Notion, Basecamp, Datadog, Google, Slack, Figma, Microsoft, GitLab, ClickUp, Linear, Hopin, 1Password, LinkedIn, Clearbit, Dropbox, Adobe, HubSpot.
- **KPI stack**:
  - "Total Savings $2,266,844" with "Average Savings 25%" (or 27%) on the gradient tile.
  - "Annual Cost $14,710,590" with "Expected Savings $2,942,118". A variant shows $6,128,875 / "IT Department 34%".
  - "Live Contracts 82" with "Not Live Yet 28" (or 3).
- **"My Contracts" panel** (home__visibility.png):
  - Columns: Vendor (category) | Annual Cost | Deadline | Status.

    | Vendor (category) | Annual Cost | Deadline | Status |
    |---|---|---|---|
    | Snowflake (IT Infrastructure) | $868,743 | 1 month | Not Live |
    | OpenAI (Artificial Intelligence) | $1,578,615 | 6 months | Live |
    | Stripe (Commerce) | $158,340 | 5 months | Live |
    | Notion (Content Management) | $132,049 | 3 months | Live |
    | HubSpot | $274,922 | 6 months | Live |

### 9.4 Vertice AI assistant (chat)
Sources: home__static-vertice-ai.png, home__Banner_Img_Sizing_No_Dots.png, platform__intake-management-software__Below_Text_Img_Sizing-1.png.
- **Empty state**:
  - Greeting: "Hi Laith, how can I help today?"
  - Suggestion card "Contracts" with prompts:
    - "Show me all active contracts and their status"
    - "List all expiring contracts that need review"
    - "List all contracts pending signature"
    - "Pull up contracts renewed in the last 30 days"
    - "Find all vendors without a signed contract"
  - Link: "Read our Prompt Guide".
  - Input placeholder "Ask Vertice", with a "+" attach button, an **integration context chip** ("NetSuite" with x) and a purple send button.
- **Response**:
  - Reasoning indicator: "Thought for 4 seconds".
  - Answer heading "Active SaaS Contracts"; table columns Vendor | Status | Department | Start Date.
  - Status values are raw enums: LIVE, EXPIRED_NA…, EXPIRED_PL…, CANCELLED….
  - Sample vendors: Navan, Crunchbase, HubSpot.
  - Summary: "Total Active SaaS Contracts: 173".
- **Full-page renewal conversation**:
  - User asks: "What contracts do I have coming up for renewal?"
  - Reply section **"Key Findings"**, then the table below.

    | Vendor | Annual Cost | Stage | Deadline | Auto-Renewal |
    |---|---|---|---|---|
    | Salesforce | $185,000 | Live | Feb 2027 | Yes |
    | Atlassian | $96,000 | Live | Mar 2027 | Yes |
    | HubSpot | $72,000 | Live | Apr 2027 | No |

  - Summary bullets:
    - "2 live contracts auto-renewing in the next 90 days"
    - "Estimated savings opportunity: $48,000"
    - Policy compliance, with Salesforce flagged as medium risk.
  - Prompt: "What would you like me to do next?"
  - **Action chips**: "Initiate a renewal", "Run benchmark analysis", "Run Ana negotiation agent".
  - Input shows "Initiate renewal workflow" with an attached file "Salesforce_Renewal_Quote_2027.pdf" (uploading spinner).
- **Inline assistant prompt** (renewal context): "Vertice AI — Do you need any help with your renewal?" It lists ranked alternative vendors, each with an AI reason line:
  - Hubspot: "Good Usability and in use by Marketing" (pill "Preferred Vendor").
  - Monday: "Compliance already checked by organization".
  - Pipedrive: "Similar usecase with your existing CRM".

### 9.5 Intake (Dynamic Intake)
- **Vendor catalog / "browse vendors"** (platform__supplier-risk-management-software__a75e...Vendor-portal-dark.png):
  - A grid of cards showing logo, name, category and a "Preferred" pill, plus a "Request" button. The selected card turns dark green.
  - Sample cards: Amazon / Cloud Services; Google / Business Tools; Godaddy / Technology; Adobe / Design Tools; GitHub / Developer; Looker / Data.
- **Recommended vendor card** (…Recommended-vendors.png):
  - Monday, "Preferred", Project Management.
  - KPIs: High Customization; 50+ Integrations; $24 Estimated Pricing.
  - "12 Required Features / 0 Missing Features" with a full green bar.
  - "Request" button.
- **Renewal intake question** (…Customization.png):
  - "What is the desired outcome for this renewal?" with tiles **Downgrade / Flat / Upgrade**.
  - Dropdown "Select the reason for this downgrade" with options:
    - Critical Service/Product Delivery
    - Superior Vendor Performance & Reliability
    - Cost-Effectiveness / Value for Money
    - High Switching Costs or Disruption Risk
    - Strategic Partnership / Unique Capability
    - No Viable Alternative Currently Available
- **AI-prefilled intake** (platform__intake-management-software__Beside_Text_Img_Sizing.png):
  - Form "Renew from existing contract".
  - Vendor = Atlassian (sparkle).
  - **Contract Category** tiles: "SaaS Contract (e.g. HubSpot)" / "Everything Else (e.g. Office Supplies)".
  - **Contract Type** tiles: "Fixed Term Contract" / "Rolling Contract".
  - Fields:

    | Field | Value |
    |---|---|
    | Sign Date | 04/08/2027 (AI) |
    | Start Date | 01/09/2026 |
    | Contract Length | 24 months (AI) |
    | Billing Frequency | Monthly |
    | Renewal Date | 01/09/2029 (AI) |
    | Auto-Renewal Date | N/A |

  - Side panel "Vertice AI – Reason for purchase":

    | Question | AI answer | Provenance |
    |---|---|---|
    | "Which department is this purchase for?" | Engineering | "Based on 4 previous requests" |
    | "What is the main reason you need this software?" | New software tool | "Most frequent selection" |
    | "Choose your vendor" | Atlassian | "Matched from contract history" |

    Each answer has an "Edit" link. Footer: "3 fields filled · Review and edit if needed".
- **Intake form** (budget-management / sourcing images): "Intake — SaaS Purchase".
  - Fields: Vendor = Apple; Budget = £275,000; Units = 200; Date required = 12 June 2026.
  - "Save changes" button.

### 9.6 Workflow Builder
Sources: platform__intake-management-software__Below_Text_Img_Sizing*.png, home__Card_Img_Sizing.png, home__static-intake-to-procure.png, home__intelligent-routing.png, platform__procurement-automation-software__*.png, platform__contract-management__Product-overview.png.
- **Edit mode**:
  - Breadcrumb "Workflows / SaaS Renewal" with a "Draft" badge (blue); buttons "Close" and "Save and Close".
  - Node "Commercial Approval" (assignee Maya Lin, "7 Days to Complete") leads to a gateway with condition pills:
    - "Procured with Vertice" → "Vertice-Led Negotiation" (Julian Hayes).
    - "Procured Internally" → "SaaS Negotiation" (Layla Haddad).
    - "Request Rejected" (tag "Default") → "End".
- **Request record view**:
  - Title "Purchase New Software (I2P)".
  - Tabs: **Overview | Offers | Details | Workflow | Documents**.
  - Flow: "Upload Contract" (Dan O'Neill, Apr 30, 2027, "Upload" button) → gateway with branches by e-sign provider: **Ironclad / (DocuSign-like) / AdobeSign / None** → "Sign Contract" → "Create SaaS Contract" (Gabrielle Moreau) or "Create PO" (NetSuite icon).
- **Viewer**:
  - "Intake" node (Slack icon, "Request owner", "7 days to complete").
  - Green gateway with parallel branches: "Risk Review" (Security Team) and **"Vertice AI – Compliance"**, an AI agent assigned as the step owner.
  - Canvas controls: auto-layout, fit-to-screen, zoom "– 120% +".
- **Routing example**: "Risk Approval" (Maya Patel, Completed Apr 8) → gateway → "Finance Approval" (Oliver Grant, Apr 22) and "Executive Approval" (Sarah Chen, Completed Apr 20) → edge "Ironclad" → "Sign Contract" (James Walker, Apr 30, "Sign" button).
- **Threshold branch**: "Intake Form" → diamond → "Above $50,000" → "Assign Owner" → "Legal Review"; "Below $50,000" → "Offer Approved".
- **Node card anatomy**: icon tile + title; person row (assignee); calendar row (due date or "N days to complete" or "Started: 05/01/2026"); optional action button ("Upload", "Sign", "Open"); status tile at top right.
- **Template gallery** ("New workflow / All templates"):
  - Search box "Search templates by name or category".
  - Cards, each with "1 workflow · 6 forms" chips:

    | Template | Description |
    |---|---|
    | SaaS purchase | "Let Vertice benchmark and negotiate your new SaaS purchase." |
    | SaaS renewal | — |
    | IT hardware purchase | "Streamline your IT hardware procurement requests." |
    | Vendor onboarding | "Collect vendor details, run compliance checks, and activate the vendor in your system." |
    | Contract review | (cut off) |

  - Preview modal: "Use this template" button, a "Use this template when" checklist and a mini diagram (Vertice-Led Negotiation / Internal Negotiation → Commercial Approval).
  - Other template names: "General Purchase with Finance Review", "SaaS Contract Renewal - German", "RFx Vendor Engagement", "Legal Review", "Budget approval".
- **Slack/Teams approval message** (…Collaboration.png):
  - Vertice APP message "A request needs your approval:" with link "New 2025 Office Lease".
  - Fields: Contract Type Purchase; Cost $540,000; Start Date Mar 10, 2025; Contract Length 24 Months.
  - Buttons: "Renew", "View Contract".
- **Notification card**: "Johnny Appleseed assigned you to a new task", chips "Docusign Renewal" and "Legal Approval", "5 new" badge, "Open" button.

### 9.7 Contracts
- **Contract list**: columns VENDOR | KEY COST (e.g. GitHub $217,850; Figma $600).
- **AI contract creation** ("Create contract from file"):
  - PDF preview "atlassian_contract_signed_1.pdf · 3 Pages · 1.2 MB" with a scanning-line animation.
  - Fields: Vendor (dropdown) / Contract Category (SaaS Contract | Everything Else) / Contract Type (fixed vs rolling tiles).
- **AI Comparison (renewal vs current)**:
  - Columns METRIC | RENEWAL | CURRENT.
  - Price: $217,850 "Yearly" vs $284,850.
  - Licences: 5,000 "New terms added" vs 3,000.
  - Floating callout: "Auto-renewal clause added".
  - Compact variant: Notion $217,850 + "AI Comparison" + "New terms added".
- **Key Renewal Stats** (AI): "3x New features included", "+17% Price increase", "+45 Licences".
  - Alternatives row: Hubspot ("Current Vendor"), Monday ("Vendor Reviewed"), Pipedrive.
  - Hub variant: "Vertice AI" checks **Usage Terms, Pricing, Comments, Policies**.
- **Diligence Insights**:
  - Gradient banner "64% of our customers were able to agree improved terms compared to the standard contract."
  - Section "CONTRACT TERM BENCHMARKING" with accordion rows, e.g. "Fees: Non-Refundable", "Payment Terms: Net 30 days from invoice".
  - Dashed-underline terms open an AI glossary popover, e.g. "Payment terms — This typically refers to…".

### 9.8 Risk / Security
- **"Vendor Risk Rating" / "Risk Assessment"**:
  - Semicircle gauge labeled "High Risk".
  - Accordion of domains with severity pills: Legal & Compliance (Medium), Reputation, ESG & Ethics (Critical), Resilience & Financial Stability (Low), Security & Privacy (High).
  - Scale: **Low / Medium / High / Critical**.
- **"Security Review"**:
  - Gauge "Low Risk".
  - Checklist: SOC2 Compliance, Data review, MSA Checked.
  - **"AI Recommendations"**: "Review vendor's data handling policies", "Restrict admin-level access", "Verify data encryption standards".
- **Vendor Portal** (supplier-facing task tracker):
  - Title "Vendor Portal", toggle **Active | Completed**.
  - One table per vendor; columns: task | Progress (%) | Due date (with relative state).
  - Okta tasks:

    | Task | Progress | Due date |
    |---|---|---|
    | Provide Compliance Information | 35% | Feb 10, 2026, "2 days overdue" |
    | Banking & Payment Details | 70% | "Due in 3 days" |
    | Annual Security Questionnaire | 0% | 16 days left |
    | Provide SOC 2 Information | 0% | 24 days left |

  - Claude tasks:

    | Task | Progress | Due date |
    |---|---|---|
    | Sign Data Processing Agreement | 0% | "4 days overdue" |
    | AI Acceptable Use Policy | 90% | "Due in 2 days" |

- **Security badges**: SOC 2 Type 2, End-to-End Data Encryption, Secure SDLC, Access Controls.

### 9.9 Vendor profile
- **Vendor insights** (Vendor-insights-3.png):
  - Atlassian. "Top Products": Confluence, Jira, Bitbucket, Trello. "Category": Engineering.
  - Alternative cards with savings pills: DocuSign "Save 18%", Dropbox "Save 30%", Asana "Save 21%".

### 9.10 Benchmark Pricing
Source: home__static-pricing-data.png, plus estimator images.
- **KPI cards**:
  - "Savings $48,000 — Annual estimate"
  - "Willingness High — Vendor flexibility"
  - "Market Share 15.2% — Across the platform"
  - "Avg. Negotiation 57 Days — Time to close"
- **"Price vs. Contract Size"** chart:
  - Subtitle "Price per user / month across Vertice benchmark data".
  - Scatter with regression line and confidence band; x axis 50 to 2,500 users.
  - Your price shown as an orange dot. Tooltip: "Your current price $23.40 / user, vs benchmark +17% over".
- **"Pricing Rating"** ("Shows how consistent the vendor's pricing is."), score rings:

  | Rating | Score | Definition |
  |---|---|---|
  | Overall Pricing Clarity Score | 52 | — |
  | Simplicity | 32 | "How easy is pricing to understand." |
  | Transparency | 75 | "How easy is it to obtain detailed pricing." |
  | Parity | 48 | "How consistent is pricing when compared across similar customers." |

  Button: "View Analysis".
- **Estimator**:
  - Range chart (candles per tier, colored purple / blue / pink; tooltip "Enterprise Licence · 243 Licenses · $18 Per User Per Month").
  - Form: Tier (Standard), Payment (Annual), No. of Licences (150), Currency (USD).
  - "Estimate Your Pricing" button returns "$23.50 (or $19.40) Estimated pricing per user/month".
  - Your-price tooltip: "$21/user, +8.3% over".
- **Insights card**:
  - "$10 Your price / $7 Target price / 30% Your potential savings".
  - Variant: $49 / $38 / 22%.
- **P2P variant**: "Benchmark Pricing" modal for Salesforce Service Cloud.
  - "Your price ¥104 / user, +8.3% over".
  - Button "View Pricing Rating >".

### 9.11 Usage analytics / Stack Review
- **Usage table**: columns VENDOR | LAST USED | ACTIVE USERS | UTILIZATION.
  - Colored utilization bar with "% Utilized": red ≤~20%, orange ~30–50%, green ≥~80%.
  - Expandable parent rows: Atlassian → Jira Software 4495/9500 (47%) and Confluence 1970/5150 (38%).
  - Other rows:

    | Vendor | Last used | Active / total | Utilization |
    |---|---|---|---|
    | Hopin | 4+ weeks ago | 880/5490 | 12% |
    | Google Workspace | Yesterday | 3192/3200 | 84% |
    | GitHub | Today | 1100/1280 | 85% |
    | Clearbit | — | 467/1337 | 12% |
    | Monday | 2 weeks ago | 314 Total | 38% |
    | Asana | Last week | 127 Total | 93% |

- **Shadow IT ("Rogue apps")**: columns VENDOR | UTILIZATION | STATUS. Adobe 13%, Google 21%, GitHub 7%, all with an **Unapproved** pill.
- **User-level**: "Weekly activity trend" bar chart (tooltip "24 Users · Sep 23rd") and a "Login frequency" card ("24 logins").
- **Stack Consolidation** (AI): Asana 2109/5200 Active Users (40% Utilized) and Monday 8234/8900 (92%) feed a "Stack Consolidation" recommendation card.

### 9.12 Analytics / Insights Hub
- **"Procurement ROI"**: "$13K Average monthly savings". Legend: Average Contract Savings $17,034; Average Time Savings $4,291. Line chart on a $0–30K axis.
- **"Time to Complete a Task"**: "14.6 Days Average time to complete a task"; "184 Tasks Completed in total".
- **"Savings Insights"** page (lightbulb nav):
  - KPIs: Total Savings $1,071,672 (20% pill); Savings (vs. initial proposal) $1,071,672; Future Savings $120,400.
  - Table columns: Vendor | Initial Proposal | Negotiated Cost | Total Savings.

    | Vendor | Initial Proposal | Negotiated Cost | Total Savings |
    |---|---|---|---|
    | Google | $1,882,220 | $1,543,420 | 18% / $338,800 |
    | Databricks | $1,771,237 | $1,416,990 | 20% / $354,247 |
    | OpenAI | $1,704,904 | $1,578,615 | 8% / $126,289 |

### 9.13 Sourcing / RFx
- **Sourcing brief**: generated from intake, with sections **Solution & Capabilities / Implementation & Delivery / Integration**.
- **Supplier Discovery / Alternative vendors**: each card shows logo, name, a risk pill (Low risk / Medium risk), "Used by N% of our platform customers", "$23.50 Estimated Pricing per User/Month" and a description.
  - Samples: Hubspot (Current vendor, Low, 14%), Monday (Medium, 6%), Pipedrive (Low, 12%), Datadog, TeamViewer.
- **Competitor Scorecard**:
  - Header card: Linear, "Requested Supplier", "Details" button.
  - Columns: Offering | Pricing, scored out of 10.

    | Vendor | Offering | Pricing |
    |---|---|---|
    | Linear | 8 | 6 |
    | ChatGPT 5.4 | 6 | 5 |
    | Claude | 7 | 7 |

  - "+ 2 more" link.
- **AI follow-ups**: Vertice AI panel "Based on provided response, here are suggested follow-ups", grouped by the same three sections, with a "Send" button.
- **"Evaluate RFP Responses"** matrix:
  - Columns: Question | Legora | Harvey | Sirion.
  - Section bands: ACCESS CONTROLS & PERMISSIONS, SECURITY & COMPLIANCE, PRICING & COMMERCIAL, INTEGRATION & COMPATIBILITY.
  - Sample questions: "Support for role-based access control (RBAC)?", "SOC 2 Type II certified?", "Estimated total monthly cost for 20 users?", "Free trial or proof-of-concept available?".
- **Expert-led RFx mocks**:
  - **RFI fan-out**: AWS "Response Received", Azure "Response Received", Google Cloud "Awaiting Response".
  - **RFP**: "RFP - Competitive Sourcing — HR Platform / Vertice-Led / 4 Vendors".
    - Workday: Solution Fit 96/100, Price Score 91/100, "Selected".
    - SAP SuccessFactors: 82 / 78, "Reviewed".
    - Contract Value £312,000 per annum, 3-yr term; Savings vs. List 23%.
  - **RFQ**: Salesforce £52,000, Hubspot £40,000, Pipedrive £24,000 ("Best Price").
    - "Next Steps": Decision ✓, Final Due Diligence ✓, Contracting ✓, Implementation (in progress).
  - **Vendor Recommendation**: sections Business Requirements / Decision Criteria / Technical Requirements.
    - Cards: Monday.com "Fit: High", Asana "Fit: High", ClickUp "Fit: Medium", each with Pricing / Implementation complexity / Commercial flexibility.

### 9.14 Ana — negotiation workspace
Sources: platform__ana__*.png, platform__ai-procurement-software__AI-Hero.png.
- **"Negotiation Plan"** checklist (ana logo):
  1. Benchmark pricing ✓ ("2M+ price points")
  2. Negotiation strategy ✓ ("Volume + term leverage")
  3. Drafting email to vendor ✓ ("Message personalized")
  4. Scenario forecasting (spinner)
  5. Negotiation rounds (pending)
- **Deal modal (Salesforce)**:
  - "Deal Overview" tiles: Vendor Salesforce; ACV $2,465,460; Renewal date 2027-08-09; Contract term 12 months.
  - "Current Offer Summary" (prose): "1,500 Sales & Service Cloud Enterprise licenses… USD 136.97 per user per month… waived the 5% packaging adjustment but maintaining a 9% standard uplift from… USD 116.36".
  - "Benchmark Opportunity": **15–23%**, USD 369,819 – 567,056, "Based on 86 comparable Salesforce deals in the Americas for 1475-1532 users".
  - "Win Probability" section.
- **"Monte Carlo Simulation"** modal:
  - Fan chart, Price (USD) vs Rounds 0–4, with a median line and inner/outer bands.
  - Tooltip: Predicted $1.3m; Inner range $1.28m–$1.32m; Outer range $1.25m–$1.35m.
  - Zoom control "100%".
- **Email compose** (Gmail-style "Emails" modal):
  - To andrew.klimson@salesforce.com; Subject "Novina / Salesforce - Renewal Kickoff".
  - AI-drafted body marked with a sparkle; "Send" split button.
- **Progress strip**:
  - "Negotiation progress 60%".
  - Best offer $158,000; Target $140,000; Round 3; Est Days left 8; Savings opportunity $18,000.
  - Card "Autonomous Negotiation Agent: Reply to Michael Chen" with a draft email and a "Generating" button.
- **Human expert stepper** (Expert Services): "RFP completed → Vendor trends analyzed → Offer negotiated", plus expert headshots.
  - Booking widget: "Book your slot — Select your date", calendar for Sept 2025, "Booking slot with John Smith" with 30-min slots.

### 9.15 Budget Management
- **Intake budget check popover** (sparkle):
  - "Do you have a budget for this?"; Remaining budget $250,000.
  - Semi-donut "Total budget $2,150,175": **Free $731,060 (34%) / Committed $516,042 (24%) / Invoiced $344,028 (16%) / Paid $236,519 (26%)**.
  - Pill "In budget".
- **"Budget Overview"** with an "All" dropdown: same gauge as above.
  - Hierarchical cards:
    - "Org Budget · FY26": "$2.5M (20%) free of $12.3M"; stacked bar Paid / Invoiced / "Commited" (sic) / Free; Owner Alina Voss, Code ORG-FY26.
    - "Department Budget · IT": "$1.2M (33%) free of $3.5M"; Owner Nadia Farouk, Code IT-FY26.
- **"Actual Spend to Date"**:
  - "$378,250"; Actual vs Projected line.
  - Insight tooltip: "Projection on track for 123% at current rate of spend" with a red "123%" pill.
- **Import**:
  - "Drag & drop files here" upload zone.
  - Spreadsheet preview columns: Contract ID | Vendor Name | Software/Service | Annual Cost.

    | Contract ID | Vendor | Software/Service | Annual Cost |
    |---|---|---|---|
    | CT-2024-001 | Microsoft | Office 365 Enterprise | $125,000 |
    | CT-2024-006 | AWS | — | $240,000 |
    | CT-2024-007 | GitHub | GitHub Enterprise | $42,000 |

    The preview has about 11 rows in total.

### 9.16 Procure-to-Pay
- **Purchase Orders table**:
  - Buttons "Bulk Upload" and "Create". Columns: Code | Vendor / Name | Amount | Status.

    | Code | Vendor | Amount | Status |
    |---|---|---|---|
    | PO-1328 | Atlassian | $87,000 | **Draft** |
    | PO-1292 | Microsoft | $17,664 | **Pending Approval** |
    | PO-1236 | PwC | $128,740 | **To Pay** |
    | PO-1401 | Canva | $34,500 | **Paid** |

  - Popover "Savings: Project-based": Total Savings $5,336; Negotiated Price $17,664; Offered Price $23,000.
- **Invoice capture** (Microsoft INV-1292):
  - Buttons "Save changes" / "Submit for approval".
  - Fields: Purchase Order*, Number*, Vendor*, Description, Issue date*, Due date*, Payment terms* (NET30), Currency*.
  - "Line items" columns: Description | Account code (0012-software) | Tax code (20% VAT) | Quantity.
  - The PDF preview has a pager "1/9" and zoom. AI-extracted values are highlighted lavender.
- **Matching** (PO-1292, Accenture):
  - Invoice Total Net $190,000.00 (red warning).
  - Popover "PO Spend: Accenture": Agreed Price $175,000; Invoiced Price $190,000; **+$15,000 Total Difference** (orange).
- **Contract Terms modal** (GitHub, INV-0202):
  - AI-sparkled fields: Invoice Number, Quantity 100, Amount $24,000.
  - Other fields: End date 03 Aug 2026; Currency USD; Payment Terms Net 30.
- **Controls & Permissions** rule builder (natural-language nodes):
  1. "When an invoice is created"
  2. "If the amount is [5,000] or more"
  3. "Require [Department Owner] + [Finance]"
  4. "Notify [Vendor Owner]"
  - Status card (Elaine Nader): "Invoice seen" ✓; "Finance Approval Pending" (!).
- **Feature pills** (blog banner): Purchase Orders, Matching, Invoice Capture, Spend Analysis, Controls, Guided Buying, Budgets.

### 9.17 Punchout / Catalog purchases
- **Home** ("Welcome, Jeremy!"):
  - Supplier tiles, each with an external-link icon:
    - Amazon Business: "Office supplies, IT peripherals, cables and adapters"
    - Staples Advantage: "Paper, print, furniture, and bulk stationery"
    - CDW: "Brings together technology & expertise…"
  - "Carts & orders" table, columns Name | Vendor | Status | Created | Amount:

    | Name | Vendor | Status | Created | Amount |
    |---|---|---|---|---|
    | CART-0132 (4 items) | Amazon Business | Not submitted | 27 Aug, 2:32pm | $474.59 |
    | CART-0129 | Amazon Business | Ordered | — | $247.79 |
    | CART-0124 | Amazon Business | Expired | — | $223.02 |

- **"Catalog purchases" page**:
  - Subtitle "Buy from a vendor's online store. Your carts and orders live here."
  - Search "Search carts and orders".
  - Filter tabs with counts: **All 26 / Pending approval 3 / Ordered 12 / Expired 3**.
  - Columns: Name | Vendor | Status (New / Ordered / Expired) | Approval (Not requested / Approved) | Created. Pagination "1–3 of 26".
- **Punchout session modal** (Amazon Business):
  - "Search Amazon Business", "3 Basket".
  - Product rows show qty stepper, "In stock" and "Add to basket". Samples: Logitech MX Master 3S $89.99; Anker 7-in-1 USB-C Hub $42.50; Brother TN-2420 Toner 2-pack $37.00; Dell P2422H 24" Monitor $189.00; Fellowes Gel Wrist Rest $14.25.
  - Buttons: "Cancel session" / "Submit items for approval".
- **Cart approval modal** ("Amazon for Business – 2026 – 00199"):
  - Tabs **Overview | Audit trail**.
  - "Cart contents" columns: Item | SKU | Qty | Unit | Total, plus a Tax row ($44.15) and Total $264.89.
  - "Approval" panel: "Pending" pill; Requested by Tali Kauffmann; Requested on Sep 22, 9:28AM; Note.
  - Buttons: **Approve / Reject**.

### 9.18 AI Cost Optimization
- **"AI Spend"** page:
  - Hero card "Potential Monthly AI Savings $67,400" with an 8% badge; "Monthly AI Spend $482,500".
  - **"Savings Recommendations"** list, each with a "Save $X" pill button:

    | Recommendation | Detail | Action |
    |---|---|---|
    | "Switch to a cheaper model for low-complexity tasks" | "35% of GPT-5.5 Pro tickets can be handled by GPT-5.5 Instant." | Save $18,600 |
    | "Right-size your token commitment" | "Plan includes 8B tokens/month. Usage averages 5.2B/month." | Save $31,900 |
    | "Engineering team spend is 2.1x above benchmark" | "No budget cap set…" | Save $16,900 |
    | "Reduce failed and repeated requests" | "12% of AI calls are retries…" | High Potential |

- **"Analytics"** (AI) page:
  - KPIs: Total Spend $66.0K; AI Share of SaaS Spend 32.1%; Avg. Daily Spend $2.2K; Top Provider (Spend) Anthropic; Top Model (Spend) "Claude Mythos 5"; Active Providers 4.
  - "Daily Spend" chart: actual bars, then a blue forecast area.
- **"Spend Breakdown"** modal:
  - Donut with toggle **By Provider | By Department**: Engineering 24%, Marketing 28%, Sales 18%, Operations 12%.
  - "By Model" bars: GPT-5.5 Pro 24%, GPT-5.5 Thinking 13%, Claude-Opus 4.6 11%, GPT-5.5 Instant 9%, Claude-Sonnet 4.6 8%, Gemini 3.5 Flash 7%, Other 28%.
- **Commitment tracking**:
  - KPIs: Annual Commitment $500.0K; Commitment Used 13.2%; Remaining Budget $434.0K; Projected Annual $145.2K.
  - Chart "Cumulative Spend vs. Commitment (pro-rata)".

### 9.19 Cloud Cost Optimization
- **Dashboard** (light and dark themes):
  - KPIs: Estimated annual savings $824,900 (gradient); Invoiced spend $3,667,860; Gross annual spend $4,230,400; **Optimization score 118/130**.
  - Service tree:
    - AWS root: Spend $4,230,400, Potential Savings $824,900, with a "▼6%" delta.
    - Children: Compute (Spend $1,290,150 / Potential Savings $335,100), Storage and Networking (Last Month Spend $230,400 / Potential Savings $30,800).
- **"Optimization Tests"**:
  - Tests Run 95; Optimizations Discovered 53; Estimated Savings $450,765.
  - Table columns: TEST | CATEGORY | RECS VALUE, e.g. "Redshift RI Coverage | Database | $48,900".
- **"RIO Optimizer"**:
  - Usage chart in hours, with tooltip "65k hrs Usage / 18 RI Units / 32% RI Coverage".
  - Side KPIs: RI units/Total 97%; On-demand h/rate $0.085; Effective h/rate $0.047; Discount rate 44%.
- **EDP**:
  - Monthly bars (tooltip "$558,300 June 2025").
  - KPIs: Total commitment $1,546,930; Cross service discount 9%; Overage rate -$87,567; Year 1 commitment $1,546,930.
  - "EDP spend trend" chart with a commitment step line ("Actual spend $675,690").
- **Other charts**:
  - "Spend forecast": Spend $420,150 vs Forecast spend $491,832, with Trendline.
  - "Spend by account" stacked bars: Research $13,200 / Production $16,466 / Staging $19,450.

### 9.20 Procurement Maturity Assessment (Resources / Expert Services)
- 6-step wizard with Previous / Next.
- Q: "Which statement best describes your intake process for new contracts/suppliers?" The five maturity answers run from "We don't have an intake process." to "Intake is centrally managed, with custom intake forms… automated criteria for pre-approvals".
- "Did you know?" stat: "cost-aware cultures are 25% more in control of their cash flow, and 23% better at operating within budgets". Maturity chart labeled "+29%".
- Budgetary Planning mock:
  - FY26 vs FY27 bars by department (Eng, Sales, G&A, Marketing, CS, Product, Finance, People).
  - Cards: "New Investments +$1.8M", "Optimization Up to $1.0M".
- Peer Group Analysis:
  - "Peer Group Spend per Category": AI 10%, Security 9%, Productivity Suite 8%…
  - "Overspending Categories vs Peer Group": Sales Tools 24%, Collaboration 17%, HR 13%…
- Consolidation:
  - "Strategic Rationalization" (Salesforce + HubSpot) and "Platform Consolidation" (Jira + Smartsheet).
  - Total: "Total annual savings identified: Up to $516k".

### 9.21 Mock-data cheat sheet
- **Vendors**: Salesforce, HubSpot, Atlassian (Jira, Confluence), Slack, Microsoft, Google Workspace, GitHub, Figma, Notion, Monday, Asana, Pipedrive, Datadog, Snowflake, Okta, OpenAI/ChatGPT, Anthropic/Claude, Databricks, Stripe, Adobe, Zoom, Workday, Linear, Framer, GitLab, Clearbit, Hopin, Navan, Crunchbase, Accenture, PwC, Canva, AWS.
- **People**: Matt, Laith, Jeremy (greeted users); Maya Lin, Maya Patel, Julian Hayes, Layla Haddad, Dan O'Neill, Gabrielle Moreau, Oliver Grant, Sarah Chen, James Walker, Alicia Dixon, James Brown, Richard White, Alina Voss, Nadia Farouk, Elaine Nader, Tali Kauffmann (internal); Michael Chen, Andrew Klimson (vendor reps); John Smith (Vertice expert).
- **Departments**: IT, Sales, General, Business Operations, Talent, Engineering, Marketing, Operations, Finance, Security Team.
- **Contract statuses**:
  - UI labels: Live / Live Contract, Not Live / Not Live Yet, Completed, Expired, Cancelled.
  - API-style enums: LIVE, EXPIRED_NA…, EXPIRED_PL…, CANCELLED….
- **PO statuses**: Draft, Pending Approval, To Pay, Paid.
- **Cart statuses**: New, Not submitted, Ordered, Expired. Cart approval: Not requested, Pending, Approved.
- **Budget buckets**: Free, Committed, Invoiced, Paid.
- **Risk levels**: Low, Medium, High, Critical.
- **Commitment flags** (AI cost): on-track, at-risk, over-limit.
- **Customer org name** in Ana mock: "Novina".

---

## 10. Numbers That Conflict Across the Site (use the bold value in talk tracks)

| Metric | Values seen | Recommended |
|---|---|---|
| Processed spend | **$75bn** (most pages, about, Ana); $30B (vendor-mgmt cross-sell card); $10B+ (Najar ad); $3.4B "spend under management" (Sastrify/Spendflo ads) | $75bn (post-Vendr) |
| Vendors benchmarked | **32,000+** (most); 16,000+ (ads, ORO/Omnea FAQs, sourcing headline) | 32,000+ |
| Price points | **2M+** (Ana, benchmarks, P2P); 900k+ (orchestration, spend audit); 500,000+ (Najar ad); "more than half a million" (AI FAQ) | 2M+ |
| Contracts | **250k+** negotiated (AI, savings-analysis); 35K+ human-negotiated (comparisons); 70,000+ (SaaS procurement FAQ) | 250k+ |
| Vendor interactions | 1M+ (comparisons, AI FAQ); **2M+** "vendor email and call interactions" (AI page stat) | 2M+ |
| Agents | **50+ agents / 70+ tasks**; pricing says "70+ Procurement Agents" | 50+ agents, 70+ tasks |
| Countries | 30+ (home meta, Tropic page); **100+ served** (about) | 100+ served |
| Customers | **1,000+** (about); 750+ (tour, start-saving) | 1,000+ |
| Guarantee level | **20%** (most); "up to 25% or rebate the difference" (Najar ad); 25-30% avg discount (Spendflo ad) | 20% |
| Cloud savings | **30%** reduction; 34% on EC2+RDS; up to 60% via RIO | 30% |
| Expert services scope | Only SaaS negotiated on your behalf (FAQ) vs "all direct and indirect spend" (comparisons) | Clarify in interview |

---

## 11. Customer Proof Points (quick reference)

| Customer | Result | Who | Source |
|---|---|---|---|
| Factorial | Over $1m savings | Moran Laufer, CFO | home, many |
| me&u | 23% average SaaS savings, "100% confidence" | Brianna Thomas, CFO | home |
| The AA | $1m SaaS procurement improvement | Craig White, Head of Procurement – IT, Digital & Data | home |
| ClearScore | $5m+ SaaS savings, 30x+ ROI (yr 1); $7.5M stack; one contract -60% ($3.5M) | Ed Mothershaw / Klaus Thorup (CTO) | home, ad najar, ad spend-audit |
| Piano | 600% ROI in under a year | Nick Worth, COO | procure-to-pay |
| Encompass | $140k+ cloud savings in 3 months; visibility into 80 vendors | Ciara McKerrow, Head of Finance | cloud, spend-audit |
| Grow Inc | 6x ROI in 3 months | Ting Lim, General Counsel | many |
| FirstVet | Onboarded in 14 days, 5x ROI | Ikaika Nordin, Head of Finance | saas-spend-mgmt |
| NewtonX | "New strategic procurement culture" | Lorenzo Seu, CFO | saas-spend-mgmt |
| Le Collectionist | 30% average savings on SaaS | Pierre Noel, CISO | it-procurement |
| Felix | Processes 10 days shorter | Tony Chan, CIO | orchestration |
| CloudHesive | 50% faster procurement cycle | Patrick Hannah, CTO | orchestration |
| Holidu | $155,000 on one renewal; 30% SaaS spend cut | — | expert-engage, spend-audit |
| A.Team | $330k first 3 months, 7x annual ROI; 115 negotiation hours reclaimed | Christopher Gonzalez, Head of Finance | ad najar, expert-engage |
| Crunch | Negotiation time reduced 50% | — | spend-audit |
| Cybersecurity Leader (anon) | $1.1m cloud savings; "single window into SaaS & Cloud" | CFO | cloud |
| HR Tech (anon) | €500k savings in 6 months | CEO | cloud |
| Ana pilots | Baringa, Bloomberg, Lenqi, global security services firm quotes | — | ana.md |
| Logos | Santander, The AA, ClearScore, me&u, Grow, Encompass, Holidu, Piano, CloudHesive, FirstVet, Le Collectionist | — | get-started-with-ana, savings-analysis |
