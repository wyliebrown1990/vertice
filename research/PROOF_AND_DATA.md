# Vertice — Proof Points, Benchmark Data Bank & Demo Seed Data

Prepared 2026-10-13 from the crawled site at `research/text/`. Every number below is quoted from a Vertice page. The source file is given in brackets, e.g. `[customer-stories__aa]` = `research/text/customer-stories__aa.md`. Section 3 is invented demo data. Each seeded number is tagged with the benchmark it comes from.

**Vertice headline claims you'll hear repeatedly** (use as "company facts" in the demo):
- Dataset: **$75bn+ processed spend, 2M+ pricing points, 250,000+ negotiated contracts, 32,000+ vendors, 1,000+ customers.** This comes from the Vendr acquisition (Jul 2026). Older pages still say "16,000+ vendors", "half a million price points" or "$30bn", so expect inconsistencies. [blog__vertice-acquires-vendr, news-and-press, l__ai-index-enterprise-market-intelligence-for-finance-and-procurement, blog__product-release-vertice-ai]
- Commercials: **"Cost savings contractually guaranteed"**, with **20% average savings, 50% reduction in purchasing time and a typical 90-day payback** [pricing]. The guarantee is "at least 20%" [insights__average-discount-from-list-price] and the average ROI is 7x [blog__dynamic-intake FAQ; blog__7-procurement-software-features-roi]. Customers "can expect annual SaaS spend savings between 20-30%" [blog__product-update-savings-insights]. The site-wide CTA is "halve your cycles and cut costs by 20%".
- AI: **60+ agents** [blog__vertice-acquires-vendr], **70+ procurement agents** [pricing] and **50+ agents trained on 70+ tasks with 50+ data sources** [blog__product-release-vertice-ai]. The AI assistant is **Verity** [blog__product-release-vertice-ai]. **Ana** is the autonomous negotiation agent, with **4,000+ live negotiations, $500m of spend, 18% average savings** and cycles cut by **15 days** [blog__introducing-ana..., l__10-software-procurement-insights-from-ana..., news-and-press].
- Analyst and market recognition: Leader in IDC MarketScape AI-Enabled Spend Orchestration 2026; Lionfish Tech Advisors 2026 I2P report (9 vendors); Forrester SVM Landscape Q1 2026; G2 Summer 2026 Grid #1 procurement orchestration; Sunday Times 100 Tech #2; Spend Matters 50 to Watch; Hackett 50 to Watch [news-and-press, blog__dynamic-intake FAQ].
- Product lines on the pricing page [pricing]:
  - **Intake-to-Procure**: AI-native intake, sourcing, orchestration; vendor, risk and contract mgmt; P2P; spend analytics and PO mgmt; 70+ agents; integrations.
  - **SaaS Purchasing**: visibility, contract mgmt, reporting; software pricing dataset; expert procurement services; usage analytics and AI Cost Optimization; Ana.
  - **Cloud Cost Optimization**: visibility; continuous recommendation engine; RI & Savings Plan optimizer; EDP insights and negotiation.
- Lionfish's Vertice comparison set: Vendr, Tropic, Spendflo, Zylo, Sastrify, Najar, CloudEagle, Spendbase [l__best-procurement-software-analyst-report]. The orchestration competitors named are Zip, Tropic, ORO Labs and Ivalua (legacy S2P) [blog__dynamic-intake FAQ].

---

## 1. Customer stories

### 1a. Master table

| # | Company | Industry / HQ | Size & spend context | Persona quoted (title) | Problem / before state | Vertice modules / services used | Quantified outcomes (exact) | Quote theme (paraphrased) | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **The AA** | Automotive services (breakdown, insurance), London UK | ~$14M software spend; lean procurement team | Craig White, Head of Procurement – IT, Digital & Data | Small team couldn't give every contract the same attention. Mid/lower-tier contracts auto-renewed with limited review. Lacked bandwidth and vendor intel. | SaaS purchasing + managed negotiation; price benchmarking and vendor intel; stack visibility (usage, renewal timelines); guaranteed-ROI model | **$1M benefit in Year 1; 440 negotiating hours saved; 5x ROI in Year 1**; ROI was clear within 6–8 weeks | Risk-free "no brainer": a guaranteed ROI plus data they could never source themselves | customer-stories__aa |
| 2 | **A.Team** | Tech talent platform, New York | Headcount +33% in 9 months | Christopher Gonzalez, Head of Finance | The Head of Finance personally ran every final negotiation and tracked contracts in a spreadsheet | Negotiation (stepped in mid-flight on a BI deal); contract/license mgmt; shadow-IT discovery at onboarding; procurement workshop; benchmarking | **$330K+ savings in 3 months; 7x ROI; 115 hours saved on negotiation**; 10% extra off a BI contract before signing; **>700% of savings guarantee** in Year 1 | Ditched the spreadsheet and got time back | customer-stories__ateam |
| 3 | **ClearScore** (+ Aro Finance subsidiary) | Fintech (credit scores, 24M users), London | Tech-team SaaS $4.5M, expanded to **$7.5M** under management | Ed Mothershaw, Head of Data Engineering; Klaus Thorup, CTO | Decentralized buying; inconsistent terms; no benchmarks; spreadsheets; surprise auto-renewals; mandated a 10% tech-spend cut | SSO discovery; dedicated CSM + Procurement Manager; managed negotiation; Intake-to-Procure with **50+ workflow templates**; Diligence Insights; benchmarking | **$5M+ total savings; 29% average contract savings; >30x ROI (34x on annual fee)**. Single-deal results: **$3.5M / 60%** on an identity-verification vendor, **76%** on market intelligence, **60%** on CRM data mgmt, **48%** on data analytics. The original target was ~$600K/yr. | "If you have a large SaaS stack, I'd be surprised if Vertice couldn't find savings." Firm but relationship-safe negotiation. | customer-stories__clearscore, blog__benchmarking, blog__diligence-insights |
| 4 | **CloudHesive** | Cloud MSP / IT services, Fort Lauderdale FL | 2 acquisitions (Apr 2022, May 2023) | Patrick Hannah, CTO (sole owner of procurement) | One person owned all procurement after M&A; SOC 2 Type 2 renewal depended on evidencing vendor controls; manual compliance checks | Intake-to-Procure / Intelligent Workflows with a security-compliance step (SOC 2 Type 2, ISO 27001); spend audit of top-10 contracts; negotiation with 7 vendors; auto-renewal clause removal | **17% savings on new purchases; 29 days to ROI; 50% faster approval cycle** | Scaled without hiring a procurement FTE; audit and compliance handled | customer-stories__cloudhesive |
| 5 | **Cybersecurity leader** (anon.) | Cybersecurity, Boston MA (AWS) | Hypergrowth; AWS cost **+40% YoY** | CFO | Cloud spend rising ~40%/yr with no clear driver; environment was "supposedly optimized"; DevOps and finance couldn't communicate | **Cloud Cost Optimization** (75+ automated tests across 40 AWS service categories); EDP negotiation; SaaS view | **$1.1M+ cloud savings identified; 23% cloud spend reduction; 20+ key recommendations** across 10+ cost areas; was not using AWS EDP before | The only single window into both SaaS and cloud | customer-stories__cybersecurity-leader-cloud-savings |
| 6 | **Encompass** | KYC/RegTech (fintech), London | Global expansion (AU→EU/NA) | Ciara McKerrow, Head of Finance | Fast-growing cloud spend; engineering spent hours finding savings; finance couldn't forecast | Cloud Cost Optimization (existing SaaS customer, so a cross-sell); complimentary spend audit | **$143,000+ achieved in 3 months; 50% of optimizations auto or low-effort; 30+ opportunities**; ~$400–500K more identified | Made reducing cloud cost "incredibly simple"; aligns finance and engineering | customer-stories__encompass-cloud |
| 7 | **Factorial** | HR tech, Barcelona | **50 → 1,200+ employees in <3 years** (M&A + organic) | Moran Laufer, CFO | Strong internal procurement team but no market data; "almost certainly overpaying" | Stack audit; benchmarking; Vertice took over the whole negotiation process | **$1M+ total savings in 18 months; $150K on a single contract; 26% average contract savings** (~$1M / 25%+ in Year 1). Shortlisted, World Procurement Awards. | "If a CFO is considering Vertice, it should be a no brainer". Data-backed narratives keep vendor relations good. | customer-stories__factorial |
| 8 | **FirstVet** | Veterinary telehealth, Stockholm | 7 markets, 24/7 service | Ikaika Nordin, Head of Finance | Decentralized cross-continent buying; lost stack visibility; renewals were automatic; savings only spotted at annual review | Platform as single source of truth; Vertice negotiated all renewals and purchases | **Onboarded in 14 days (full SaaS visibility); 40% reduced time to purchase; 500% ROI** in Year 1; paid back within 6 months; savings goal was ≥$90K | Hand renewals to experts and get the finance team's time back | customer-stories__firstvet |
| 9 | **Farmers Mutual Group (FMG)** | Rural insurer, New Zealand | 100–120K members; **70+ tools** | Christian Hayes, Head of Technology | A third-party reseller renewed blindly with no benchmarking or usage review; years of expensive auto-renewals | Dedicated Procurement Manager; benchmarks on 16,000+ vendors; dashboard (usage, renewal dates, duplication risk) | **10x ROI in 10 months; 20% reduction in time to contract completion; 15% average contract savings** | Right-size to actual usage and build in growth flexibility; fair for both sides | customer-stories__fmg |
| 10 | **Global creative network** (anon.) | Marketing/ad agency group, North America | **20+ agencies, 15 countries** | Global CFO | Each agency bought on its own; Slack/Asana overlaps; no central oversight | Catalog and ownership mapping; consolidated negotiation as one entity; standardized procurement process; global purchasing managers | **14% average savings per contract; 218% ROI in the first 9 months; 20 agencies visible in one platform** | Missing consolidation opportunities until there was central oversight | customer-stories__global-creative-network |
| 11 | **Greylock Partners** | Venture capital, Silicon Valley | No dedicated procurement function | Manuel Bernal, VP Technology | No visibility into spend, renewals or fit-for-purpose terms; underused licenses; overwhelmed at discovery | Contract audit + centralization ("single pane of glass"); benchmarking and peer analysis; in-house experts | **<10 days to complete visibility; 66% improvement in negotiated discounts; 50% saving on a key data/intel vendor; 110% of savings guarantee in Year 1** | "Negotiate better than we ever could internally"; time savings alone paid for it | customer-stories__greylock-partners |
| 12 | **GROW Inc** | Fintech (superannuation), Sydney | Rapid growth; APRA-regulated (data residency, **CPS 230**) | Ting Lim, General Counsel & Company Secretary | No vendor-assessment process, benchmarks or duplication checks; ad hoc buying added security risk | Procurement workflows with automated security questionnaires and audit trails; usage visibility; negotiation team | **35 days to ROI; 6x ROI in 3 months; 19% average savings**. Winner, Procurement Success Awards. | "An automated procurement function in every department"; built a cost-aware culture; compliance is auditable | customer-stories__grow |
| 13 | **Hercules Capital** | Specialty finance / venture lending, San Mateo | Growing vendor base | Christian Follmann, COO; Richard Hanna, Director of IT | Case-by-case renewals ate IT's time; no benchmarks | Contract dashboard; Procurement Managers run renewals end to end (direct or via resellers); Intelligent Workflows; benchmarking | **25% fewer internal emails on negotiations; 8 hours saved per week; 30% faster approval workflows** | "Game-changer": offloading negotiations frees the team for strategy | customer-stories__hercules-capital |
| 14 | **Holidu** | Vacation rentals, Munich | Headcount +40% in a few years; staff in 60+ countries | Leander Valerius, Head of Marketing Technology | No clear view of renewal dates or utilization; senior leaders ran negotiations | Workflows; savings audit; negotiation; benchmarks used by the CTO | **$155K on a single contract; 32% average SaaS discount; 800% ROI** in Year 1 | "An invaluable extension of our procurement team" | customer-stories__holidu, blog__7-procurement-software-features-roi |
| 15 | **HR tech company** (anon.) | HR software, Germany (AWS) | **100+ SaaS products, €1.4M+ SaaS**; spend under scrutiny post-2022 | CEO; VP Finance | SaaS waste tracked in spreadsheets; unclear AWS optimization; paid an outside consultant | SaaS inventory + negotiation; Cloud Cost Optimization (60 tests → 8 recommendations; EDP commitment monitoring) | **€500K+ saved in 6 months; 21% improved license utilization; 3 contractors no longer needed**; **€110K+ off a €295K CRM** (~37%) with auto-renewal removed; cloud went from a forecast +20% to **−12%** | "Seeing it all laid out was incredible". Avoided layoffs. | customer-stories__hr-tech-company-saves-on-aws-and-saas |
| 16 | **intelliflo** | Fintech (financial planning), London | Carved out of Invesco, bought by **Carlyle (Aug 2025)** | Kelly-Marie Loftus, Head of Operations | Inherited group contracts without context; inaccurate data; silos; no processes | Custom workflows (CFO budget check → IT/security in parallel → CEO sign-off); Vertice AI; contract upload; benchmarks on 32,000+ vendors; expert buyers; NetSuite integration next | **$1M+ hard savings (annual); 30% average per contract in 6 months; 33% off the central Salesforce contract; 150+ business hours saved; 4.4x ROI; guarantee beaten in 3 months**; kept AWS commit balanced | "Not just a platform, the team's buying knowledge too". Carlyle now refers other portfolio companies. | customer-stories__intelliflo |
| 17 | **Le Collectionist** | Luxury travel, Paris | Investor-referred | Pierre Noel, CISO | No time, expertise or market intel to negotiate; vendor pressure to auto-renew | Managed negotiation incl. 3 biggest vendors; 16K-vendor benchmarks; alternative-vendor advice | **39% decrease in estimated spend; 30% average contract savings; 55% faster procurement cycles** | "We don't have time to negotiate; we need someone we trust" | customer-stories__le-collectionist |
| 18 | **Lead Forensics** | Marketing & advertising tech, Portsmouth UK | **$1.5M annual SaaS; ~100 contracts**; part-time supplier relations manager | Alan Yonge, CFO | Supplier growth outpaced capacity; spreadsheet tracking; feared damage to vendor relationships | Contract upload + auto-extraction (done in 1–2 days); renewal pipeline dashboards; managed negotiation; 16,000-vendor benchmarks; alternative suppliers | **<40 days average request-to-signature; value-for-money improvement on 100% of contracts** | Exceeded high expectations; tough but never damaged a relationship | customer-stories__lead-forensics |
| 19 | **me&u** (post-merger with Mr Yum) | Hospitality tech, Sydney | $2bn GMV; 6,000+ venues; **129 contracts; 50+ duplicated tools** | Brianna Thomas, CFO; Keeley Purdue, Senior Mgmt Accountant | No procurement process ("anyone could buy"); duplicates, overspend, underuse, auto-renewals | Audit; SSO integration; custom workflows with legal, security and finance approvals; notifications for function leaders; benchmarks; expert buyers | **6.1x ROI; 23% average contract savings; 44% biggest saving (core CRM)**. Initial audit: 14% savings plus 480 negotiating hours saved. | Go into negotiations knowing the price point; vendors raise prices constantly | customer-stories__me-u |
| 20 | **NewtonX** | B2B market research, New York | **300 employees; ~$2M across 70+ SaaS vendors** | Lorenzo Seu, CFO | No structure; CFO pulled into every negotiation; duplicates; overpaying | SSO + manual contract upload; **50+ workflow templates**; dynamic intake; Slack/PM-tool integrations; workflow analytics; expert buyers | **61% saving on one contract; 271 business hours saved; 16% average savings; workflows rolled out to 40+ stakeholders in 3 weeks** | "The procurement team we always needed but never had"; Vertice as control tower | customer-stories__newtonx |
| 21 | **Piano** | Digital experience platform, Amsterdam | **400% growth** in a year; several acquisitions | Nick Worth, COO; Thomas Fisher, Head of Technical Ops | Decentralized buying, overlapping tools post-M&A, no in-house expertise | Stack analysis; usage-based right-sizing; consolidation reporting; negotiation | **$100K saved on one renewal (consolidation); 600% ROI in <1 year; 170+ contracts managed** | Weekly strategic partner on software decisions | customer-stories__piano |
| 22 | **Quartex** | Mining & resources, Perth (PE: AKKR) | **100+ SaaS contracts**; no procurement team | Matt Faries, Head of Engineering | Duplication, over-licensing, no owners, unclear renewal dates; priced using "internet forums" | **Intake-to-Procure** (custom intake, routing by value, users, compliance or strategic weight); **Vertice AI** (document scan, dynamic intake questions, conversational queries, price-increase forecasting); expert negotiation with vendor playbooks | **$1M+ total savings in Year 1; 8.9x ROI; 90 days to fee payback; savings guarantee exceeded by 510%**. Highly Commended, Global Procurement Awards. | "Data + AI + human expertise: we needed all three"; IT, finance and legal went "from chaos to control in weeks" | customer-stories__quartex |
| 23 | **Felix** | Brisbane, AU (industry not stated) | — | Tony Chan, CIO & IT Procurement Lead | Fragmented, manual procurement | Workflow Builder; Intake-to-Procure; integrations (nudges); ERP sync; SOC 2 audit trails | **~10 days shorter per workflow** | "We've closed the entire loop"; SOC 2 "becomes a formality" | felix-customer-story, customer-stories__clearscore-rm2ao (Felix stub) |

**Anonymous "Vertice in Practice" mini-cases.** These map one feature to one metric, which is useful for click-path talk tracks [blog-category__vertice-in-practice]:

| Feature | Outcome | Source |
|---|---|---|
| Dynamic Intake | **50% reduction in delays** in the first quarter | blog__dynamic-intake |
| Drag & Drop (no-code) Workflow Builder | Compliance policies rolled out **3x faster** (weeks to hours) | blog__drag-and-drop-builder |
| Usage Analytics (SSO login tracking) / SaaS Consolidation | **$10,000** annual cost reclaimed; unauthorized tools found | blog__saas-consolidation |
| Custom Contract Fields (risk-tier routing) | Contract cycle time **−33%** | blog__custom-contract-fields |
| Jira integration | IT approval time **−25%** | blog__jira-integration |
| Slack integration | Intake volume **+38%** in the first month | blog__slack-integration |
| Due Dates + reminders | Average contract cycle **−28%** | blog__due-dates |
| Intelligent Workflows Dashboard | Cycle time down to **26 days** (from new 56 / renewal 52); **$742K** processed in month 1; **$215K** in flight; **90%** of requests on time | blog__intelligent-workflows-dashboard |
| Diligence Insights (ClearScore) | Visibility across a $7.5M portfolio; **29%** average saving per contract | blog__diligence-insights |
| Contract Repository | 80+ contracts centralized; renewal prep **−32%**; **zero** missed auto-renewals; **$11,200** unused spend flagged. Renewals had taken 7–10 days longer than new purchases. | blog__contract-repository |
| Benchmarking (ClearScore) | **$3.5M / 60%** on one ID-verification tool; $5M+ total | blog__benchmarking |
| Spend Insights / Analytics Center | Found a usage-priced marketing tool hidden in the department line; renegotiated | blog__spend-insights |
| Vertice AI Renewal Insights | Benchmarked the incumbent, negotiated early, switched vendor | blog__verity-renewal-insights |
| Vertice AI Tech Consolidation | Retired 3 underused platforms; consolidated to 1 vendor | blog__verity-tech-consolidation |
| Intelligent Workflows (launch claims) | Request time **halved**; **70%** of manual steps automated; maverick tech spend **−33%**; **+15%** average contract savings | blog__introducing-intelligent-workflows |

### 1b. Best proof points by persona / use case

| Use case / persona | Lead with | Backup |
|---|---|---|
| **CFO (economic buyer)** | **Factorial** (CFO: "no brainer"; $1M+ in 18 mo; 26% avg) | **ClearScore** ($5M+, 30x+ ROI; started from a mandated 10% cut); **NewtonX** (CFO no longer in every negotiation; 271 hrs); **Lead Forensics** (CFO; 100% of contracts improved); **me&u** (CFO; 6.1x) |
| **Guaranteed ROI / risk-free buying** | **The AA** ("risk free… guaranteed ROI"; 5x Year 1) | **Quartex** (guarantee beaten by 510%; 90-day payback); **A.Team** (>700% of guarantee); **Greylock** (110%); **intelliflo** (beaten in 3 months) |
| **Head of Procurement with a lean team** | **The AA** (440 negotiation hours saved; covered the mid/low tier) | **Lead Forensics** (part-time SRM got capacity back); **Hercules** (8 hrs/week) |
| **No procurement team at all** | **Quartex** (Head of Eng ran it) | **Greylock**, **GROW** (GC), **CloudHesive** (CTO), **A.Team** (Head of Finance) |
| **Procurement efficiency / cycle time** | **Le Collectionist** (55% faster cycles) | **CloudHesive** (50% faster approvals); **Felix** (−10 days/workflow); **Hercules** (30% faster approvals); **FirstVet** (−40% time to purchase); **Lead Forensics** (<40 days vs a 72-day market benchmark); **FMG** (−20%) |
| **Intake-to-procure / workflow adoption** | **NewtonX** (40+ stakeholders live in 3 weeks; 50+ templates) | **Quartex** (adoption "surpassed highest expectations"); **intelliflo** (parallel CFO/IT/security/CEO routing); **ClearScore** (50+ templates) |
| **SaaS savings (big single-deal wins)** | **ClearScore** $3.5M / 60% on one vendor | **NewtonX** 61%; **Greylock** 50%; **me&u** 44% CRM; **intelliflo** 33% Salesforce; **Holidu** $155K; **Factorial** $150K |
| **SaaS savings (portfolio average)** | **Holidu** 32% | **intelliflo** 30%; **Le Collectionist** 30%; **ClearScore** 29%; **Factorial** 26%; **me&u** 23%; **GROW** 19%; **CloudHesive** 17% (new buys); **NewtonX** 16%; **FMG** 15%; **Global creative** 14% |
| **Cloud / AWS / FinOps** | **Cybersecurity leader** (23% / $1.1M+; EDP) | **Encompass** ($143K in 3 mo; 50% low-effort); **HR tech** (cloud forecast +20% → −12%) |
| **SaaS + cloud in one pane** | **Cybersecurity leader** ("only solution with a single window") | **HR tech** (€500K in 6 months across both) |
| **Compliance / security / regulated** | **GROW** (CPS 230, data residency, audit trails) | **CloudHesive** (SOC 2 Type 2); **Felix** (SOC 2 a "formality"); **intelliflo** |
| **Time to value** | **CloudHesive** (29 days to ROI) | **GROW** (35 days); **FirstVet** (14-day onboarding); **Greylock** (<10 days to visibility); **Lead Forensics** (contracts loaded in 1–2 days); **Quartex** (90-day payback) |
| **M&A / PE portfolio** | **intelliflo** (Carlyle carve-out; Carlyle refers portfolio companies) | **Quartex** (AKKR); **me&u** (merger, 50+ duplicates); **CloudHesive**, **Piano**, **Factorial** (acquisitions) |
| **Decentralized / multi-entity** | **Global creative network** (20+ agencies, 15 countries) | **FirstVet** (7 markets); **ClearScore** (added subsidiary Aro) |
| **Tool duplication / consolidation** | **me&u** (50+ duplicates, 129 contracts) | **Piano** ($100K via consolidation); **GROW**; **HR tech** (100+ apps) |
| **AI-native procurement (Vertice AI / agents)** | **Quartex** (AI doc scan, dynamic intake, forecasting) | **intelliflo** (AI across platform); Ana launch stats (4,000+ negotiations, 18% avg) |
| **IT / Engineering leader persona** | **Quartex** (Head of Eng) | **ClearScore** (Head of Data Eng + CTO); **FMG** (Head of Tech); **Felix** (CIO); **CloudHesive** (CTO) |
| **Relationship-safe negotiation (objection handling)** | **Lead Forensics** ("never damaged a relationship") | **ClearScore** ($3.5M with no relationship impact); **NewtonX** (vendors "pleased to sign"); **Factorial** |

---

## 2. Benchmark / insight data bank

All figures come from `insights__*` pages, which are Q2 2026 data updated July 2026 unless noted. Base: "$75bn of global processed spend". Older pages say $30bn.

### 2.1 Prices, inflation & discounts

| Metric | Value | Source |
|---|---|---|
| SaaS inflation, monthly | **12.1% Apr 2026 → 14.2% May → 16.4% Jun 2026** (record). Previous high 14.7% (Nov 2025). Q1 2026 = 13.2%. +4.3 pts in 2 months, the fastest rise recorded. | insights__saas-inflation-rate |
| SaaS inflation vs CPI | 16.4% is "almost 4x" the US CPI of 4.2%. Older page: "nearly 5x" G7 inflation. Jan 2025: 11.4% vs 2.7% G7. | insights__saas-inflation-rate, l__saas-inflation-index-report, blog__mitigating-2025-saas-inflation-stats |
| Earlier inflation readings | 11.3% and 13.9% (undated blogs); "cost of each tool +12% YoY" (older) | blog__great-saas-deflation-fallacy, blog__hidden-saas-costs..., blog__product-update-accounting-and-erp-integrations |
| Inflation $ example | A $1,000,000 stack costs **+$114,000** a year later for the same tools (at 11.4%) | blog__mitigating-2025-saas-inflation-stats |
| % vendors raising prices | **58% in 2024** (≈75% in 2022); some raised prices by up to 25% | blog__mitigating-2025-saas-inflation-stats, l__cfo-guide... |
| Vendors masking / obscuring price | **60%** deliberately mask rising prices; **55%** obscure pricing | l__saas-inflation-index-report, blog__mitigating-2025-saas-inflation-stats |
| Contracts with price-uplift-at-renewal language | **33%** of vendors. Email marketing **71%**, accounting **50%**. | blog__mitigating-2025..., blog__saas-purchasing-and-cloud-spend-insights-q1-2024 |
| **SaaS shrinkflation** | **27% of vendors** (Q2 2026, flat after 3 quarters of decline) | insights__saas-shrinkflation |
| **Average discount from list price** | **33.8%** (Q2 2026; 34% prior) | insights__average-discount-from-list-price |
| Discount by category | **ERP 44%**, **AI 43%** (both slightly down), **Collaboration & Productivity 38%** (from 28%, +10 pts), **Design 19%** (lowest, +4 pts). CRM and Analytics each **−6 pts**. Range 19–44%. | insights__average-discount-from-list-price |
| Older category discounts | Customer support 19%; compliance automation 24%; mobile marketing 18% | blog__saas-purchasing-and-cloud-spend-insights-q1-2024, blog__saas-purchasing-insights-for-july-2023, blog__saas-purchasing-insights-for-october-2023 |
| **Price dispersion** (best vs worst negotiated deal) | Overall **2.14x** (Q2) vs 2.15x (Q1). **Tier 1 (consistent):** AI 1.10, IT Infra 1.30, Development 1.41, Analytics 1.51, Customer Service 1.57. **Tier 2:** Collab & Productivity 1.85, HR 1.92 (+39.1%), Monitoring 2.21. **Tier 3 (opaque):** Sales Tools 2.55, Security 2.61, Marketing 2.90, CRM 3.01, Project Mgmt 3.01 (+21.9%), ERP 3.04. | insights__pricing-benchmark-deviation |
| Benchmark goal | Move customers from high-end rates toward the **20th percentile** | insights__pricing-benchmark-deviation |
| Microsoft EA band D (15,000+ licenses) | ~**12%** off list; Level A 4% discount removed in 2018 | blog__navigating-microsofts-november-2025-pricing-changes |

### 2.2 Spend levels & allocation

| Metric | Value | Source |
|---|---|---|
| **SaaS spend per employee** | **$9,324** (Q2 2026, +1.3%). Flat at $9,200 for 3 quarters before that. Trend: $7,900 (2023) → $8,700 (2024) → ~$9,100 (end 2025), "almost 15% in two years". An older blog said +27% YoY in 2023. | insights__saas-spend-per-employee, l__saas-inflation-index-report, blog__saas-purchasing-insights-for-october-2023 |
| SaaS share of total spend | "$1 in every $8" goes to SaaS; software ≈ **12.5%** of total expenditure; SaaS is "second only to headcount" | l__saas-inflation-index-report, blog__mitigating-2025..., l__cfo-guide... |
| SaaS + cloud share of cost base | ~**25%**; cloud alone up to **11%** | blog__saas-purchasing-and-cloud-spend-insights-q1-2024 |
| **Apps per business** | **144** (Q2 2026) vs 138 (Q1 2026) vs 131 (Jun 2025). +4.3% QoQ, +10% YoY. Dec 2025 136 → Jan 2026 130 (start-of-year audits that bounce back). Older figures: 136 (+5% YoY); ~130. | insights__saas-apps-per-business, l__the-saaspocalypse..., blog__mitigating-2025... |
| Stack growth rate | 10% YoY (current); older 11% and 18% | insights__auto-renewal-clauses, blog__hidden-saas-costs..., blog__the-most-popular-saas-products-in-2023 |
| Renewals vs new purchases share of spend | New purchases **11%** of SaaS spend in Q4 2023 (vs 20% the year before), projected 8%, so **~92% of budget goes to renewals** | blog__saas-purchasing-and-cloud-spend-insights-q1-2024 |
| Tail spend share of software cost | **19%** of cost; non-tail **81%** | insights__renewals-triggered-without-review |
| **Tail-spend share of contracts** | Average **63.4%** of contracts (from 68.5%, −5.1 pts; every category declined). **Design 83.3%**, **Development 79.7%**, **CRM 32.7%** (lowest). Monitoring and Analytics −9.0 pts. | insights__tail-spend-contracts |
| **Share of spend by category: SMB** (Q2 2026, % share / YoY change) | AI **11.3%** (+182.5%, #1); Development 9.7% (−6.7%); Security 9.2% (−18.6%); Productivity Suite 9.1% (+4.6%); IT Infra 6.9% (+11.3%); CRM 6.6% (−10.8%); ERP 6.4% (+8.5%); Marketing 6.1% (−16.4%); Collab & Prod 6.0% (+9.1%); Sales Tools 4.8% (+14.3%); Analytics 4.8% (+9.1%); IT Mgmt 4.4% (−2.2%); HR 3.8% (+2.7%); Project Mgmt 3.6% (−12.2%); Customer Service 2.9% (0); Monitoring 2.3% (−4.2%); Design 2.3% (+76.9%) | insights__share-of-spend |
| **Share of spend by category: Enterprise** | Productivity Suite **12.7%** (−4.5%); Collab & Prod 9.7% (+47%); CRM 9.4% (−6%); Security 8.7% (−17.1%); HR 8.6% (−13.1%); IT Infra 7.9% (−2.5%); Development 6.3% (−3.1%); ERP 5.8% (−4.9%); Sales Tools 5.2% (−3.7%); AI 4.9% (+206.3%, from 1.6%); Marketing 4.8% (−9.4%); Analytics 3.7% (−5.1%); IT Mgmt 3.2% (+3.2%); Monitoring 3.1% (+34.8%); Project Mgmt 2.6% (−7.1%); Customer Service 2.2% (0); Design 2.2% (−12%) | insights__share-of-spend |
| Category share (older) | Customer support = 7% of SaaS spend (#5 category); compliance automation = 2% | blog__saas-purchasing-and-cloud-spend-insights-q1-2024, blog__saas-purchasing-insights-for-july-2023 |
| **SaaS pricing model mix** | **Per-usage 36.5%** (from 34%, now #1); **per-user 32.4%** (from 35%); **hybrid 31.1%** (+0.1). An older report says only 35% of vendors are purely user-based (−24% since Jun 2024); consumption pricing "favoured by 23% of vendors", up 35% in 2 years. | insights__saas-pricing-models, l__consumption-based-pricing-models |

### 2.3 Waste, utilization & duplication

| Metric | Value | Source |
|---|---|---|
| **Unused + underutilized licenses** | **65%** (Q2 2026; 62% a year earlier). **14% fully unused** (from 15%) + **51% underutilized** (<50% of seats used; from 47%). Peak **69% in Dec 2025**. | insights__unused-saas-applications |
| Older waste figures | 45.7% of licenses unused (+7% in 12 mo); 21% unused + 45% underutilized; "66% of applications going to waste"; "24% of applications wholly unused" | blog__mitigating-2025..., blog__software-renewal-management..., blog__hidden-saas-costs..., l__the-saaspocalypse... |
| **$ wasted per year by company size** | **500–1,000 employees: $1.75M** (+2.9% QoQ) … **10,000+: $18.9M** (from $17.6M; +7.4%), "roughly 10x a 1,000–2,500-employee company", which implies **~$1.9M at 1,000–2,500**. Underutilization > shelfware $ in every band. Older: >$1.5M at 500+ employees; enterprise waste +34% YoY. | insights__cost-of-unused-saas, blog__software-renewal-management..., blog__saas-wastage-shelfware |
| Underutilized by department | Sales **49%**, Product **45%** of products underutilized | l__beyond-the-numbers-report |
| **Most underutilized categories** (Mar 2026 vs Mar 2025) | 2026: 1 Professional Services, 2 Hosting, 3 Business (Services), 4 Vertical Industry, 5 Office Mgmt. 2025: 1 Vertical Industry, 2 Marketing, 3 IT Mgmt, 4 Monitoring, 5 Security. | insights__saas-underutilization |
| **Most utilized tools** (Mar 2026) | 1 **NetSuite**, 2 **Looker**, 3 **Navan**, 4 **Figma**, 5 **Gong**. 2025: 1 Gong, 2 NetSuite, 4 Figma, 4 Freshworks, 5 Lucid. | insights__most-utilized-saas-tools |
| **Most duplicated categories** (Q2 2026) | 1 **Development**, 2 **Security**, 3 Collaboration & Productivity, 4 Marketing, 5 Sales Tools (Q1 had Security #1). Average customer runs **7 Development** and **6 Security** contracts at once; the others **4–5** each. | insights__tool-duplication |
| **Most canceled categories** (Q2 2026, cancellation rate) | **Supply Chain & Logistics 44.4%**, Professional Services 37.1%, Business Services 26.2%, Office Mgmt 22.2%, GRC 19.4%. Q2 2025 top 5: Marketing, Commerce, GRC, Sales Tools, Data Privacy. Monitoring (#1 in Q1 2026) fell out. | insights__most-canceled-saas-tools |
| AI waste | **13%** of AI apps unused; **48%** underutilized ("nearly half") | blog__what-is-shadow-ai, insights__most-popular-ai-software |
| Shadow / unapproved spend | **44%** of AI spend happens without procurement oversight vs **26%** for software overall; AI tool spend **+80%** YoY | blog__what-is-shadow-ai, insights__most-popular-ai-software |
| Unreported savings | Up to **40%** of a business's software savings go unreported | blog__product-update-savings-insights |

### 2.4 Renewals, contract terms & lock-in

| Metric | Value | Source |
|---|---|---|
| **Contracts with auto-renewal clauses** | **72.3%** average (Q2 2026; from 60.6% in Q1, +11.7 pts). **CRM 96.1%** (from 84.2%), **Sales Tools 87.3%**, **IT Mgmt 84.8%**, Marketing 62.1% (from 46.9%, the largest relative rise), Development 57.2%, **AI 55.2%** (lowest). Older figure: 89% of contracts. | insights__auto-renewal-clauses, blog__hidden-saas-costs... |
| Protective clause when vendor won't drop auto-renew | Written notice **90 days** before renewal | insights__auto-renewal-clauses |
| **Renewals triggered without review** | **Tail spend: 72%** (from 75% in Q1). **Non-tail: 14.1%** (from 13%). Roughly a 5x gap. Ana launch post: "3 in 4" tail contracts renew with zero oversight. | insights__renewals-triggered-without-review, blog__introducing-ana..., blog__procurement-as-a-service... |
| **Renewal savings vs negotiation start** | Starting **120+ days** out saves **23.3% more** than waiting until the final month. The 120+ day cohort averages **17.78%** savings (from 18.42%). **Development:** 14.95% at <30 days → 22.45% at ≥90 days. **AI:** 19.97% even at <30 days, with little timing sensitivity. | insights__renewal-savings-vs-negotiation-time |
| Older early-renewal data | Starting >90 days out saves **49% more** than <30 days and 30% more than 30–60 days | blog__software-renewal-management... |
| **Average contract length** | Development longest at **29.9 months** (−1.3); AI shortest at **15.4 months**. ERP +2 months (now #2 longest, ahead of CRM). Marketing average +1.3 mo; median 15 → **18 months**. | insights__average-contract-length |
| **Vendor stickiness** (spend with mission-critical vendors) | **74.8%** of SaaS spend; up in 15 of 18 categories. **Sales Tools 99.2%** (from 98.5%), **Productivity Suite 90%**, **CRM 89.8%**, **Development 86.9%**; AI +3.0 pts (fastest-rising). Least sticky: **Customer Service 48%**, **Design 50%**. | insights__saas-vendor-stickiness |
| Vendor lock-in experience | **87%** of procurement leaders have experienced it | l__avoiding-vendor-lock-in |
| **Most renewed (stickiest) tools** | Q2 2026: 1 **CrowdStrike**, 2 **Tableau**, 3 **NetSuite**, 4 **Avalara**, 5 **Google**. Q2 2025: 1 Jamf, 2 Figma, 3 Miro, 4 Cloudflare, 5 Culture Amp. | insights__stickiest-saas-tools |
| **Supplier compliance (ISO 27001 / SOC 2)** | Security vendors **62.7% / 65.4%** (the "security paradox"); AI **62.0% / 61.3%** (lowest); Monitoring 99.9%; CRM 99.1%; Project Mgmt 98.5–98.7%. **45%** of vendors fail dual certification; Sales Tools only **41%** dual-certified. Older (2023): only 8% held both; 19% of SaaS spend went to uncertified vendors. | insights__supplier-compliance-rates, blog__saas-purchasing-insights-for-july-2023 |
| TCV erosion | The 12 common procurement oversights leave only **30–50%** of original ROI | l__12-saas-procurement-oversights... |

### 2.5 Consumption / AI pricing

| Metric | Value | Source |
|---|---|---|
| Contract cost change when moving off seats | **Seat → hybrid: +18.3%**; **seat → consumption: +22.6%** | insights__contract-cost-increase-by-consumption-pricing-model |
| Cost per user | Consumption **up to +37%**; hybrid **+21%** on average | insights__cost-per-user-by-pricing-models |
| **Monthly budget variance** | **Seat 4.1%**, **hybrid 19.8%**, **consumption 37.6%**. Consumption contracts drift **>15%** from forecast in **<6 months**. | insights__monthly-budget-variance-rate |
| Report headline stats | Consumption models exceed budget plans by **40%**; **29% lower discounts**; **35% of consumption is invisible**; some vendors' ACVs up **50%+** | l__consumption-based-pricing-models |
| AI token cost stats | Budgets swing up to **40%**; cost-per-user **+37%**; each AI contract ~**23%** more expensive than the seat-based equivalent | l__how-to-control-your-ai-token-costs, blog__ai-cost-optimization |
| "AI premium" on SaaS | **49–63%** premium for AI SaaS | l__the-perfect-saas-deal-in-2026-a-blueprint |
| LLM rate monitoring | Up to **80%** discount by tracking market LLM prices; uncollected SLA service credits are common | l__10-software-procurement-insights-from-ana... |
| Recommended AI contract protections | Cap annual increases at **3–5%**; remove auto-renewal; model-training opt-out; 3–6 month "shadow billing"; true-down / look-back clause; per-user cost ceilings; non-billable R&D credits | insights__most-popular-ai-software, insights__contract-cost-increase..., insights__cost-per-user... |

### 2.6 Procurement process benchmarks

| Metric | Value | Source |
|---|---|---|
| **Average procurement cycle (request → signature)** | **72 days**; **new purchases 40 days; renewals 82 days** (FAQ). Jun 2026: new **36 days** (fastest ever), renewals **87 days** (slowest ever), 2.4x gap (2.0x in Q1). | insights__procurement-cycle-time |
| Older cycle data | Renewals 37 days vs new 25 days (+50%); Microsoft longest at 60 days, Salesforce close behind; Asana, Workable and Crossbeam fastest. Average contract takes 60 days to renew; 100 days to get a new product over the line; **3 meetings + 33 emails** per new purchase; **385 hours/yr** in renewal/purchase meetings | blog__saas-purchasing-and-cloud-spend-insights-q1-2024, l__beyond-the-numbers-report, blog__the-hidden-cost-of-saas-and-cloud-contract-management, blog__product-update-diligence-insights |
| **Cycle time by contract value** (Q2 vs Q1 2026) | **<$10k: 54 days** (49.5); **$10–50k: 73** (68.3); **$50–100k: 81** (76.3); **$100k+: 93** (83.5; +9.5, sharpest). $50k → $100k adds 12 days (was 8). 39-day gap between smallest and largest; "72% longer". | insights__procurement-cycle-time-contract-value |
| **Stage completion times** (Q1 2026) | Avg days / % done in <1 day / 80th percentile: **Customer Negotiation 11.8 / 67% / 13d**; **Intake 10.3 / 59% / 10d**; **Legal Approval 9.6 / 42% / 14d**; **Commercial Approval 8.3 / 45% / 11d**; **IT/Security Approval 7.1 / 55% / 8d**; **Executive Approval 5.8 / 64% / 4d**; **Contracting 3.1 / 71% / 2d** | insights__procurement-process-stage-completion-times |
| **Approval time by function** (Q2 2026, Q1 → Q2) | **HR 12.3d** (+7.9%, slowest); **IT 12d** (from 10, +20%); **Engineering 11.1d**; **Finance 11d** (from 8.1, +36%); **Marketing 11d**; **Operations 8.2d** (from 6.1, +34%); **Security 7.8d** (from 8.4); **Sales 7d** (from 8.2); **Data 3.7d** (fastest). Q1 average ~8 days. Fastest-to-slowest gap 8.6 days (7 in Q1). | insights__approval-times-by-function |
| Time spent on contracts | If buying and renewals ran back to back, contract holders would spend **61%** of working days on them | l__beyond-the-numbers-report |
| Manual process waste | **1,500+ hours/yr** wasted on manual procurement; **70%** blame supplier risk on poor visibility | blog__introducing-intelligent-workflows |
| Slow procurement | Slow, inflexible procurement affects **67%** of users; AI workflows cut cycles in half and manual steps by **70%** | l__seven-ways-ai-can-de-risk-your-procurement |
| **Procurement maturity** (300 companies) | Mature teams are **29%** more efficient; **22%** (blog) / **24%** (results page) faster to market; **24%** more able to implement ideas; **21%** better compliance; **22%** better cash-flow control; **22%** better budget adherence (results page: 22% budget control); **32%** more positive perception. Only **17–18%** are at the top level; **44%** sit one level below. Elsewhere: 33% more innovative, 30% faster to market. | blog__introducing-intelligent-workflows, procurement-impact-self-assessment-results, blog__how-modern-procurement..., blog__why-the-procurement-metrics... |
| Maturity model dimensions (5 levels each) | Intake; Routing; Cost awareness; Audit & compliance; Supplier relationships & benchmarking. Building blocks include starting renewals **≥90 days** early and **infosec re-review every 24 months**. | procurement-impact-self-assessment, procurement-impact-self-assessment-results |
| Market growth | Procurement tech **9–11%** CAGR to 2030; I2P sub-segment **15%** | l__2026-lionfish-tech-advisors-report... |
| Gartner (quoted) | By 2028, **90%** of B2B buying intermediated by AI agents | blog__introducing-ana... |
| AI usage in procurement | Analysis of **$618M** of spend across 32 countries: teams use AI more for **insights** than for operational automation | l__ai-in-procurement-the-reality |

### 2.7 Vendor leaderboards (copy-ready for "market intelligence" screens)

**Most popular SaaS vendors by spend** (Jul 2026) [insights__most-popular-saas-vendors-by-spend]

| Rank | SMEs & Mid-Market (Δ 12 mo) | Enterprise (Δ 12 mo) |
|---|---|---|
| 1 | Salesforce (—) | Microsoft (—) |
| 2 | **OpenAI (+72)** | Salesforce (—) |
| 3 | Microsoft (−1) | SAP (—) |
| 4 | Cloudflare (+13) | Amazon (—). Spend **$24.6M → $47.5M** YoY |
| 5 | Google (−1) | Google (+2) |
| 6 | LinkedIn (−1) | Workday (−1) |
| 7 | NetSuite (−4) | Oracle (+2) |
| 8 | Snowflake (−2) | LinkedIn (−2) |
| 9 | HubSpot (—) | ServiceNow (−1) |
| 10 | Slack (+4) | Adobe (—) |

Notes: Twilio, Atlassian and ServiceNow dropped out of the SMB top 10. MongoDB jumped +69 into the enterprise top 10 in Q1, then fell out.

**Fastest-growing vendors by spend** [insights__fastest-growing-saas-vendors]

| Rank | YoY (Q2 2026) | QoQ (vs Q4 2025) | vs Q3 2025 | vs Q2 2025 |
|---|---|---|---|---|
| 1 | **Anthropic 1,718%** | OpenAI 78% | MongoDB 83% | MongoDB 69% |
| 2 | Cursor 599% | MongoDB 67% | OpenAI 76% | Canva 62% |
| 3 | MongoDB 553% | Canva 63% | Twilio 67% | Vercel 55% |
| 4 | Clay 420% | Anthropic 54% | Canva 58% | OpenAI 51% |
| 5 | Digicert 327% | Figma 47% | Wiz 47% | Databricks 47% |
| 6 | OpenAI 277% | Zone & Co 45% | Airtable 45% | Semrush 44% |
| 7 | Wiz 176% | Exclaimer 42% | Figma 45% | Confluent 41% |
| 8 | FIS Global 126% | Webflow 40% | Sentry 44% | Zapier 36% |
| 9 | Zone & Co 112% | Avalara 40% | SendGrid 40% | dbt Cloud 35% |
| 10 | (Xero +110% mentioned) | Wiz 38% | JFrog 40% | Amplitude 35% |

**Most popular AI tools** (by number of companies adopting; Apr 2026 data) [insights__most-popular-ai-software, insights__top-25-ai-native-tools, insights__top-25-saas-tools-with-ai-features]
- **AI-native top 25:** OpenAI, Grammarly, Sana Labs, Glean, Cursor (+13), Synthesia (+15), DeepL, Modjo, Jasper, Anthropic (+9), Metaview, Ada, ultimate.ai, Luminance, ElevenLabs, Harvey AI, nooks, Keebo, Riseup.ai, Hyperbound, Kamsa, Signal AI, HeyGen, Bryq, Fathom Video.
- **Applied AI (AI inside SaaS) top 25:** Salesforce Einstein, Microsoft Copilot, Slack Agentforce, Adobe Firefly, DocuSign Iris, Google Gemini, Atlassian Rovo, Figma AI, Miro AI, 1Password, Zoom AI Companion, JetBrains AI, Zendesk AI, Charlotte AI (CrowdStrike), Snowflake Cortex AI, Tableau, Cloudflare AI, GitHub Copilot, ZoomInfo Copilot, GitLab Duo, Gong, Bits AI (Datadog), Monday Sidekick, Cisco AI, Greenhouse AI.
- OpenAI spend +78% and Anthropic +54% (QoQ) [insights__most-popular-ai-software FAQ].

**Older trend notes** (2023–24): rising vendors were Intercom, Zendesk and Aircall; falling were ZoomInfo, Zoom and Snowflake (customers switching Zoom → Teams). Top renewal categories were sales engagement (Outreach, Gong), recruitment (LinkedIn, Greenhouse, Personio) and MDM (Jamf, Kandji). [blog__saas-purchasing-and-cloud-spend-insights-q1-2024]

### 2.8 Cloud benchmarks

| Metric | Value | Source |
|---|---|---|
| Cloud cost growth | Average **+35% YoY** (up to 500% in some cases); forecast +24% in 2024 | blog__product-launch-all-the-power-of-vertice-now-for-the-cloud, l__cloud-spend-optimization |
| Cloud budget overruns | **52%** of companies exceed cloud budgets by **>20%**; **50%** struggle to scale cloud efficiently | blog__product-launch... |
| Cloud waste | **~32%** of cloud spend wasted ("close to a third") | blog__how-to-reduce-aws-spend, blog__saas-purchasing-and-cloud-spend-insights-q1-2024 |
| RI usage | Reserved Instance usage **13% → 20%** YoY | blog__saas-purchasing-and-cloud-spend-insights-q1-2024 |
| AWS volatility | Standard deviation of AWS costs **+8.7%** in a quarter | same |
| AWS service share | EC2 #1; RDS share **16.32% → 13.8%** (moving to Aurora); AWS Support (Enterprise) **2.59% → ~5%** | same |
| Vertice cloud claims | Up to **25%** cloud savings; RI optimizer up to **60%** off compute; **75+ tests across 40+ AWS products** | blog__product-launch..., customer-stories__cybersecurity-leader-cloud-savings |
| FinOps adoption | 96% of Fortune 50 have a FinOps strategy (blog title) | blog__5-reasons-why-96-of-fortune-50-companies-have-a-finops-strategy |

---

## 3. Realistic dummy-data seeds: "Northwind Systems, Inc." (fictional)

### 3.1 Company profile

| Attribute | Seed value | Benchmark basis |
|---|---|---|
| Company | Northwind Systems, Inc.: B2B logistics-software company, HQ Boston, EMEA hub London. **1,500 employees**. PE-backed and acquired 2 smaller companies in 2025 (sets up the M&A duplication story). | Mirrors intelliflo/Quartex/CloudHesive/me&u M&A patterns |
| Total annual SaaS spend | **~$14.0M** (= 1,500 × **$9,324**) | insights__saas-spend-per-employee; nearly the same as The AA's ~$14M |
| Apps in stack | **152 apps / contracts** (42 named strategic vendors below + **~110 tail contracts**) | 144 average apps [insights__saas-apps-per-business]; 63.4% of contracts are tail [insights__tail-spend-contracts] |
| Strategic (non-tail) spend | **$11.4M** across 42 vendors (81.6%) | 81% non-tail [insights__renewals-triggered-without-review] |
| Tail spend | **~$2.6M** across ~110 contracts (avg ~$24K, most <$10K) (18.6%) | 19% tail [same] |
| AWS (cloud) | **$3.2M/yr**, growing **35% YoY**; EDP commit $3.0M/yr expiring 2027-03-31; RI/SP coverage **20%** | 35% growth [blog__product-launch...]; 20% RI usage [blog__saas-purchasing-and-cloud-spend-insights-q1-2024] |
| Estimated annual SaaS waste | **~$1.9M** (unused + underutilized) | ~$1.9M for 1,000–2,500 employees [insights__cost-of-unused-saas] |
| License utilization mix | **14%** of licenses fully unused; **51%** in underutilized apps (<50% seats active); 35% healthy | insights__unused-saas-applications |
| Auto-renew exposure | **31 of 42** strategic contracts (**74%**) carry auto-renewal clauses | 72.3% [insights__auto-renewal-clauses] |
| Unreviewed renewals last year | **72%** of tail renewals (~79 contracts) and **14%** of strategic renewals (~6) rolled over without review | insights__renewals-triggered-without-review |
| Renewal price-increase quotes | Vendor uplift quotes of **+6% to +18%** (median ~10–12%) | SaaS inflation 12.1–16.4% [insights__saas-inflation-rate]; 33% of contracts allow uplifts |
| Pricing model mix (strategic 42) | As seeded: 27 seat-based, 7 hybrid, 8 consumption/tiered by count. By spend, consumption and hybrid lines (Microsoft+Copilot, OpenAI, Anthropic, Snowflake, Datadog, MongoDB, etc.) are ~41% ($4.7M). The market mix by contract is 32.4% per-user / 31.1% hybrid / 36.5% per-usage; to match it, flip ~8 seat contracts (e.g., Salesforce+Einstein, Zendesk AI, GitHub Copilot, HubSpot) to "hybrid (seat + AI credits)". | insights__saas-pricing-models |
| AI spend | **~$1.6M** total: $1.0M contracted (OpenAI, Anthropic, Cursor) + ~$0.3M AI add-ons inside Copilot, Einstein and GitHub Copilot + **~$0.3M shadow AI** across 11 tools on cards/expenses. **44%** of AI spend sits outside procurement oversight. | 44% [blog__what-is-shadow-ai]; AI is 11.3% of SMB / 4.9% of enterprise spend [insights__share-of-spend] |

### 3.2 Departments (1,500 headcount)

| Department | Headcount | Primary tools owned | Approval SLA owner? |
|---|---|---|---|
| Engineering | 400 | Atlassian, GitHub, Cursor, MongoDB, Google Workspace (pocket) | Yes (Eng approval) |
| Customer Success & Support | 230 | Zendesk, Intercom, monday.com | — |
| Sales (incl. RevOps, EMEA) | 240 | Salesforce, Gong, Outreach, Salesloft, ZoomInfo, LinkedIn Sales Nav | — |
| Operations | 210 | Asana, monday.com, Navan | Yes (Ops) |
| Marketing | 95 | HubSpot, Canva, Asana | Yes |
| Product & Design | 90 | Figma, Miro, Looker | — |
| Data & Analytics | 50 | Snowflake, Looker, Tableau | Yes (Data) |
| Finance | 55 | NetSuite, Avalara, Navan, Tableau | Yes (budget/commercial approval) |
| People / HR (incl. Talent) | 45 | Workday, Greenhouse, Culture Amp, LinkedIn Recruiter | Yes |
| IT | 42 | Microsoft 365, Slack, Zoom, ServiceNow, Jamf, Okta | Yes |
| Security | 25 | CrowdStrike, Zscaler, Wiz, Okta | Yes (InfoSec/TPRM) |
| Legal | 18 | DocuSign | Yes (legal review) |
| **Total** | **1,500** | | |

### 3.3 The 42 strategic vendors (renewals spread Nov 2026 – Oct 2027)

"Today" = **2026-10-13**. Spend ranges are ±15% around the point value. "Target savings %" combines the category discount benchmark [insights__average-discount-from-list-price], uplift avoidance and right-sizing or consolidation. Duplicates are flagged for cancellation (100%).

| Vendor | Category | Owner dept | Annual spend (range) | Pricing model | Renewal date | Auto-renew | Notice (days) | Notice deadline (vs 2026-10-13) | License utilization | Vendor's quoted uplift | Target savings % / $ | Demo storyline / lever |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ZoomInfo SalesOS | Sales Tools | Sales | $185k ($157k–$213k) | Per-seat + credits | 2026-11-15 | Y | 30 | 2026-10-16 (+3d) | 44% | +14% | 30% / $56k | Notice deadline in 3 days; 56% seats idle |
| LinkedIn (Sales Nav + Recruiter) | Sales Tools / HR | Sales / Talent | $290k ($246k–$334k) | Per-seat | 2026-11-30 | Y | 60 | 2026-10-01 (-12d) | 47% | +11% | 30% / $87k | Notice date passed - auto-renew risk; 53% seats idle |
| Zoom Workplace | Collaboration & Productivity | IT | $140k ($119k–$161k) | Per-host | 2026-11-30 | Y | 30 | 2026-10-31 (+18d) | 38% | +8% | 45% / $63k | Overlaps Teams; 62% hosts idle; notice in 18 days |
| Cursor Business | Artificial Intelligence | Engineering | $95k ($81k–$109k) | Per-seat + usage | 2026-12-01 | N | - | n/a | 81% | +0% | 15% / $14k | Shadow AI on cards; bring under contract |
| Gong | Sales Tools | Sales | $210k ($178k–$241k) | Per-seat | 2026-12-15 | Y | 60 | 2026-10-16 (+3d) | 52% | +12% | 25% / $52k | Notice deadline in 3 days; right-size seats |
| Salesloft | Sales Tools | Sales (EMEA) | $70k ($60k–$80k) | Per-seat | 2026-12-20 | Y | 30 | 2026-11-20 (+38d) | 35% | +12% | 100% / $70k | Duplicate of Outreach - cancel |
| Atlassian Cloud (Jira, Confluence) | Development / PM | Engineering | $420k ($357k–$483k) | Per-user | 2026-12-31 | Y | 30 | 2026-12-01 (+49d) | 76% | +14% | 16% / $67k | Overlaps Asana/monday; consolidate PM |
| HubSpot Marketing Hub Enterprise | Marketing | Marketing | $240k ($204k–$276k) | Per-contact tier | 2027-01-10 | Y | 30 | 2026-12-11 (+59d) | 62% | +15% | 20% / $48k | Contact-tier shrinkflation check |
| Anthropic (Claude Team + API) | Artificial Intelligence | Eng / Product | $380k ($323k–$437k) | Hybrid (seats + tokens) | 2027-01-15 | N | 30 | 2026-12-16 (+64d) | 64% | +0% | 18% / $68k | Fastest-growing vendor (+1,718% YoY); volume tiers + forecast |
| Salesforce Sales Cloud + Einstein | CRM | Sales / RevOps | $980k ($833k–$1,127k) | Per-user | 2027-01-31 | Y | 60 | 2026-12-02 (+50d) | 71% | +12% | 18% / $176k | CRM auto-renew 96.1%; cap uplift; trim 29% idle seats |
| Asana | Project Management | Marketing / Ops | $85k ($72k–$98k) | Per-user | 2027-01-31 | Y | 30 | 2027-01-01 (+80d) | 41% | +10% | 100% / $85k | Duplicate PM - consolidate into Jira/monday |
| GitHub Enterprise + Copilot | Development | Engineering | $310k ($264k–$356k) | Per-user | 2027-02-01 | Y | 30 | 2027-01-02 (+81d) | 84% | +9% | 12% / $37k | Copilot vs Cursor overlap (Dev = #1 duplicated) |
| Outreach | Sales Tools | Sales | $150k ($128k–$172k) | Per-seat | 2027-02-15 | Y | 60 | 2026-12-17 (+65d) | 48% | +12% | 25% / $38k | Duplicate of Salesloft (EMEA) |
| Intercom | Customer Service | Support / Product | $120k ($102k–$138k) | Hybrid (seats + resolutions) | 2027-02-20 | Y | 30 | 2027-01-21 (+100d) | 55% | +15% | 40% / $48k | Duplicate of Zendesk; AI resolution overages |
| OpenAI (ChatGPT Enterprise + API) | Artificial Intelligence | IT / Eng | $540k ($459k–$621k) | Hybrid (seats + tokens) | 2027-02-28 | N | 30 | 2027-01-29 (+108d) | 58% | +0% | 22% / $119k | AI discount avg 43%; shadow AI consolidation |
| Google Workspace (Eng/Design pockets) | Productivity Suite | Engineering | $180k ($153k–$207k) | Per-user | 2027-03-01 | Y | 30 | 2027-01-30 (+109d) | 61% | +10% | 60% / $108k | Duplicate of Microsoft 365 - retire/migrate |
| Slack Enterprise Grid | Collaboration & Productivity | IT | $360k ($306k–$414k) | Per-user | 2027-03-15 | Y | 60 | 2027-01-14 (+93d) | 91% | +10% | 14% / $50k | Collab discounts rose to 38% |
| Snowflake | Analytics / Data | Data Eng | $620k ($527k–$713k) | Consumption (credits) | 2027-03-31 | N | 30 | 2027-03-01 (+139d) | usage-based | +0% | 15% / $93k | Consumption variance; credit rollover + true-down clause |
| DocuSign | Collaboration & Productivity | Legal | $95k ($81k–$109k) | Per-envelope tier | 2027-03-31 | Y | 60 | 2027-01-30 (+109d) | 66% | +10% | 20% / $19k | Envelope tier right-size |
| Okta Workforce Identity | Security | IT / Security | $260k ($221k–$299k) | Per-user | 2027-04-01 | Y | 60 | 2027-01-31 (+110d) | 96% | +8% | 9% / $23k | Sticky; uplift cap |
| Looker | Analytics | Product / Data | $140k ($119k–$161k) | Per-user | 2027-04-15 | Y | 30 | 2027-03-16 (+154d) | 72% | +10% | 10% / $14k | Keep as BI standard (top-2 most utilized) |
| Datadog | Monitoring | Platform Eng | $450k ($382k–$517k) | Consumption (hosts/logs) | 2027-04-30 | Y | 60 | 2027-03-01 (+139d) | usage-based | +8% | 20% / $90k | Log volume overages; commit restructure |
| Figma Organization | Design | Product / Design | $110k ($94k–$126k) | Per-editor | 2027-05-01 | Y | 30 | 2027-04-01 (+170d) | 88% | +12% | 8% / $9k | Design discounts lowest (19%) - focus on terms |
| Zendesk Suite | Customer Service | Support | $230k ($196k–$264k) | Per-agent | 2027-05-15 | Y | 30 | 2027-04-15 (+184d) | 79% | +12% | 15% / $34k | Overlaps Intercom; consolidate |
| monday.com | Project Management | Ops / CS | $60k ($51k–$69k) | Per-seat | 2027-05-20 | Y | 30 | 2027-04-20 (+189d) | 39% | +10% | 30% / $18k | Duplicate PM |
| CrowdStrike Falcon | Security | Security | $390k ($332k–$448k) | Per-endpoint | 2027-05-31 | Y | 90 | 2027-03-02 (+140d) | 97% | +7% | 8% / $31k | Most-renewed tool; protect terms not price |
| MongoDB Atlas | IT Infrastructure | Engineering | $280k ($238k–$322k) | Consumption | 2027-06-01 | N | 30 | 2027-05-02 (+201d) | usage-based | +0% | 12% / $34k | Spend spiking (+553% YoY growth vendor) |
| Navan | Finance (T&E) | Finance | $130k ($110k–$150k) | Per-active-user | 2027-06-15 | N | 30 | 2027-05-16 (+215d) | 90% | +6% | 6% / $8k | Well utilized - hold |
| Canva Enterprise | Design | Marketing | $45k ($38k–$52k) | Per-seat | 2027-06-20 | Y | 30 | 2027-05-21 (+220d) | 63% | +12% | 15% / $7k | Fast-growing vendor; seat check |
| Microsoft 365 E3 + Copilot | Productivity Suite | IT | $1,150k ($978k–$1,322k) | Hybrid (seat + Copilot add-on) | 2027-06-30 | N | 90 | 2027-04-01 (+170d) | 82% | +9% | 12% / $138k | Right-size Copilot add-on (58% active); EA band pricing |
| Miro | Collaboration & Productivity | Product | $70k ($60k–$80k) | Per-user | 2027-07-01 | Y | 30 | 2027-06-01 (+231d) | 57% | +10% | 25% / $18k | Right-size seats |
| Tableau Cloud | Analytics | Finance / BI | $160k ($136k–$184k) | Per-user | 2027-07-15 | Y | 60 | 2027-05-16 (+215d) | 49% | +10% | 35% / $56k | Duplicate BI with Looker; consolidate |
| NetSuite ERP | ERP | Finance | $410k ($348k–$471k) | Per-user + modules | 2027-07-31 | N | 60 | 2027-06-01 (+231d) | 95% | +8% | 12% / $49k | ERP discount avg 44%; ERP price dispersion 3.04x |
| Greenhouse | HR | Talent | $120k ($102k–$138k) | Per-employee tier | 2027-08-01 | Y | 60 | 2027-06-02 (+232d) | 85% | +9% | 10% / $12k | Headcount-tier check |
| Wiz | Security | Security | $210k ($178k–$241k) | Per-workload | 2027-08-15 | Y | 60 | 2027-06-16 (+246d) | usage-based | +18% | 14% / $29k | Fast-growing vendor (+176% YoY); workload forecast |
| Jamf Pro | IT Management | IT | $70k ($60k–$80k) | Per-device | 2027-08-20 | N | 60 | 2027-06-21 (+251d) | 98% | +7% | 5% / $4k | Hold |
| ServiceNow ITSM | IT Management | IT | $480k ($408k–$552k) | Per-fulfiller | 2027-08-31 | Y | 90 | 2027-06-02 (+232d) | 88% | +10% | 10% / $48k | Uplift cap; fulfiller count true-up |
| Avalara | Finance (Tax) | Finance | $85k ($72k–$98k) | Transaction tier | 2027-09-01 | Y | 60 | 2027-07-03 (+263d) | usage-based | +9% | 8% / $7k | Sticky (top-5 most renewed) |
| Zscaler ZIA | Security | Security | $240k ($204k–$276k) | Per-user | 2027-09-15 | N | 90 | 2027-06-17 (+247d) | 93% | +8% | 10% / $24k | Bundle with Wiz/CrowdStrike competitive tension |
| Workday HCM | HR | People | $620k ($527k–$713k) | Per-employee | 2027-09-30 | N | 120 | 2027-06-02 (+232d) | 93% | +7% | 8% / $50k | Sticky system of record; negotiate uplift cap + multi-year |
| Cloudflare | IT Infrastructure | Platform Eng | $160k ($136k–$184k) | Hybrid | 2027-10-01 | Y | 60 | 2027-08-02 (+293d) | usage-based | +9% | 10% / $16k | Usage tier review |
| Culture Amp | HR | People | $75k ($64k–$86k) | Per-employee | 2027-10-15 | Y | 60 | 2027-08-16 (+307d) | 70% | +9% | 10% / $8k | Renewal uplift check |

**Roll-ups:**
- **Total strategic spend: $11,415,000. Target savings: $2,025,000 (17.7%)**. Add ~$470K from Ana on the ~$2.6M tail at **18%** [blog__introducing-ana...] for a **total opportunity of ~$2.5M (~18% of $14M)**. That sits inside the customer-story range of 14–32% average savings and just under the 20% guarantee, which leaves room to show "guarantee exceeded".
- **Renewal calendar by month** (count / $): Nov-26 3 / $615K · Dec-26 4 / $795K · **Jan-27 4 / $1,685K** (Salesforce, Anthropic, HubSpot, Asana) · Feb-27 4 / $1,120K · Mar-27 4 / $1,255K · Apr-27 3 / $850K · May-27 4 / $790K · **Jun-27 4 / $1,605K** (Microsoft) · Jul-27 3 / $640K · Aug-27 4 / $880K · Sep-27 3 / $945K · Oct-27 2 / $235K.
- **Urgent demo hooks (next 30 days):** ZoomInfo and Gong notice deadlines in **3 days**; Zoom in **18 days**; LinkedIn notice **already passed 12 days ago**. That last one is the "missed auto-renewal" story; tail renewals go unreviewed 72% of the time.
- **Duplication clusters** (Development and Security are the most duplicated categories [insights__tool-duplication]): Microsoft 365 vs Google Workspace; Zoom vs Teams; Outreach vs Salesloft; Zendesk vs Intercom; Tableau vs Looker; Jira vs Asana vs monday.com; GitHub Copilot vs Cursor (vs Claude/ChatGPT). Security has 4 contracts (CrowdStrike, Okta, Zscaler, Wiz) against a 6-contract benchmark average.
- **Category mix of strategic spend:** Productivity Suite 11.7%, Security 9.6%, AI 8.9%, CRM 8.6%, Analytics 8.1%, Sales Tools 7.9%, HR 7.1%, Development 6.4%, Collab 5.8%, IT Mgmt 4.8%, Monitoring 3.9%, IT Infra 3.9%, ERP 3.6%, Customer Service 3.1%, Marketing 2.1%, Finance apps 1.9%, Design 1.4%, PM 1.3%. This sits between the SMB and Enterprise share-of-spend benchmarks [insights__share-of-spend].

**Tail-spend sample** (pick ~10 for the "Ana negotiates the long tail" screen; all <$25K; design and dev tools dominate because those are 83%/80% tail [insights__tail-spend-contracts]): Loom $14K, Calendly $9K, Grammarly $18K, Notion (pocket) $22K, Postman $16K, Sentry $21K, Vercel $19K, Zapier $12K, Airtable $15K, Webflow $8K, 1Password $24K, Lucid $11K, Typeform $6K, SurveyMonkey $7K, Synthesia $13K (shadow AI), ElevenLabs $6K (shadow AI), Jasper $9K (shadow AI), Clay $17K (fastest-growing #4), Semrush $14K, Exclaimer $5K.

### 3.4 Savings dashboard seeds (Savings Insights terminology [blog__product-update-savings-insights])

Scenario: Northwind has been live for **6 months** and is looking back at renewals Apr–Sep 2026.

| Metric | Seed | Basis |
|---|---|---|
| Spend negotiated through Vertice (6 mo) | $5.6M | ~40% of annual SaaS renewed in 6 months |
| **Realized savings** | **$1.21M (21.6%)** | Beats the 20% guarantee [pricing]; customer averages 14–32% |
| **Unrealized savings** (identified, in progress) | **$2.03M** (the upcoming table above) | |
| **Scope-reduction savings** (license removals) | **$420K** (≈ 2,300 seats removed) | 51% underutilized [insights__unused-saas-applications] |
| **Cost avoidance** (vendor uplifts declined) | **$610K** | Avoiding a 12% average uplift on $5.6M (inflation 12–16%) |
| Average discount vs vendor's first quote | **34%** | 33.8% market average [insights__average-discount-from-list-price] |
| Largest single win | Salesforce-style CRM renewal: **−33%** (intelliflo pattern) or one vendor **−60%** (ClearScore pattern) | customer-stories__intelliflo, customer-stories__clearscore |
| Negotiation hours saved | **310 hours** | AA 440 hrs / NewtonX 271 / intelliflo 150+ |
| Guarantee attainment | **108%** of 20% target at 6 months | Greylock 110% Year 1; intelliflo beat it in 3 months |
| Savings by department (realized) | Sales $355K · IT $290K · Engineering $210K · Security $95K · Marketing $85K · Data $80K · People $55K · Finance $40K | Weighted to spend owners in 3.2 |

### 3.5 Request pipeline (Intake-to-Procure board)

Volume: **~34 requests/month**: ~20 new purchases, ~11 tail renewals, ~3.5 strategic renewals. **46 requests in flight, $2.4M in-flight value.** For comparison, the dashboard example customer had $215K in flight and processed $742K/month [blog__intelligent-workflows-dashboard].

| Stage (Vertice stage names) | # in stage | $ in stage | Northwind current avg days (= benchmark) | p80 days (benchmark) | Target SLA after Vertice (−50%) | Source for "current" |
|---|---|---|---|---|---|---|
| Intake | 9 | $310K | 10.3 | 10 | 3 | insights__procurement-process-stage-completion-times |
| Commercial / budget approval | 7 | $420K | 8.3 | 11 | 3 | same |
| IT / Security approval (TPRM) | 8 | $380K | 7.1 | 8 | 3 | same |
| Legal approval | 6 | $460K | 9.6 | 14 | 4 | same |
| Negotiation (Vertice buyer or Ana) | 9 | $640K | 11.8 | 13 | 6 | same |
| Executive approval | 4 | $150K | 5.8 | 4 | 2 | same |
| Contracting / signature | 3 | $40K | 3.1 | 2 | 1 | same |
| **End to end** | **46** | **$2.4M** | **72 days** (new 40 / renewal 82) | — | **36 days** (−50%); stretch 26 | insights__procurement-cycle-time; −50% claim [pricing]; 26-day example [blog__intelligent-workflows-dashboard] |

**Cycle time by contract value** (seed Northwind = market today, then the target):

| Bracket | Northwind today | Target with parallel approvals | Basis |
|---|---|---|---|
| <$10K | 54 days | 21 days | insights__procurement-cycle-time-contract-value |
| $10–50K | 73 days | 34 days | same |
| $50–100K | 81 days | 40 days | same |
| $100K+ | 93 days | 47 days | same |

**Approval SLAs by function** (current = Q2 2026 benchmark; target = SLA configured in Vertice):

| Approving function | Current avg (days) | SLA target (days) | Auto-route rule example |
|---|---|---|---|
| HR | 12.3 | 5 | Any tool touching employee PII → HR + Security + Legal (DPA) |
| IT | 12.0 | 5 | SSO/SCIM required for >25 users |
| Engineering | 11.1 | 5 | Dev tools: duplicate check vs GitHub/Cursor/Atlassian |
| Finance (budget / commercial) | 11.0 | 3 | >$10K or out-of-budget → FP&A; >$100K → CFO |
| Marketing | 11.0 | 4 | Contact-data tools → Security |
| Operations | 8.2 | 4 | — |
| Security (InfoSec / TPRM) | 7.8 | 4 | No SOC 2 or ISO 27001 → full questionnaire (45% of vendors lack both) |
| Sales | 7.0 | 3 | — |
| Data | 3.7 | 2 | Consumption pricing → forecast review (37.6% variance) |
| Legal | 9.6 avg / 14 p80 (stage) | 4 | Auto-renew or uplift clause detected → Legal |
| Executive (CEO/CFO) | 5.8 | 2 | Only for $100K+ |

Sources: insights__approval-times-by-function, insights__procurement-process-stage-completion-times, insights__supplier-compliance-rates, insights__monthly-budget-variance-rate.

### 3.6 AI Cost Optimization & cloud seeds

- **AI spend panel:** OpenAI $45K/mo, Anthropic $32K/mo (growing ~12%/mo), Cursor $8K/mo, shadow AI $25K/mo. Consumption lines should swing about **±37.6%** month to month and seat lines about **±4.1%** [insights__monthly-budget-variance-rate]. Show a **90-day forecast** and a budget alert where Anthropic has drifted **+18%** from forecast by month 5 (the ">15% in under 6 months" benchmark). Show 58–64% active seat utilization on ChatGPT and Claude Team. AI apps run 13% unused and 48% underutilized [blog__what-is-shadow-ai].
- **Example AI negotiation:** seat → hybrid migration quoted at **+18.3%**. Counter with a 3–6 month shadow-billing period, a true-down clause and a 3–5% uplift cap [insights__contract-cost-increase...; insights__most-popular-ai-software].
- **Cloud panel (AWS $3.2M/yr):**
  - Cost categories: EC2 38%, RDS 14%, S3 9%, EKS 8%, Data transfer 7%, CloudWatch 5%, Support (Enterprise) 5%, Other 14%.
  - Waste estimate: **32% ($1.0M)**.
  - Recommendations: **75 tests run → 22 recommendations** across 11 cost areas.
  - Identified savings: **$740K (23%)**, half of it auto or low-effort (cyber and Encompass patterns).
  - Raise RI/SP coverage from 20% to 65%.
  - EDP renewal in 5 months: negotiate the commit using a 12-month forecast.
  - Sources: blog__how-to-reduce-aws-spend, customer-stories__cybersecurity-leader-cloud-savings, customer-stories__encompass-cloud, blog__saas-purchasing-and-cloud-spend-insights-q1-2024.

### 3.7 Compliance / TPRM seeds

- Of the 42 strategic vendors, flag **~45% (19)** as missing dual SOC 2 + ISO 27001, matching the 45% benchmark. Concentrate the gaps in AI (Cursor, plus the shadow tools Synthesia, ElevenLabs and Jasper), Sales Tools (Salesloft, Outreach, ZoomInfo; only 41% are dual-certified) and one security vendor (the "security paradox": 62.7% / 65.4%) [insights__supplier-compliance-rates].
- Show one vendor whose SOC 2 lapsed after an acquisition (continuous-monitoring story).

---

## 4. Domain glossary for an SE

| Term | One-line definition (Vertice usage) |
|---|---|
| **Intake-to-Procure (I2P)** | The front end of buying: one "front door" for requests, plus routing, approvals, sourcing, negotiation and contracting. Vertice's core platform category, a sub-segment growing 15%. [l__2026-lionfish..., explore__source-to-contract] |
| **Intake** | Capturing a purchase or renewal request through a (dynamic) form, Slack, Jira or an ERP PO, so it enters a governed workflow. |
| **Dynamic intake** | Intake forms that show only relevant fields and ask the "next best question" based on earlier answers. [blog__dynamic-intake, customer-stories__quartex] |
| **Procurement orchestration** | A layer that coordinates work across existing systems (ERP, CLM, Jira, Slack) and routes each request to finance, legal and security in parallel. It doesn't replace them. [explore__procurement-software] |
| **Parallel approvals** | Legal, Finance and Security review at the same time instead of a sequential "relay race". This is the main lever behind "halve your cycle time". [insights__procurement-cycle-time] |
| **Procure-to-Pay (P2P)** | Requisition → PO → receipt → invoice → payment. Vertice's pitch: P2P with the full negotiation context attached. [blog__procure-to-pay-has-every-right...] |
| **Source-to-Pay (S2P) / Source-to-Contract (S2C)** | S2P covers the whole lifecycle from sourcing to payment (legacy suites: Coupa, Ivalua, SAP Ariba). S2C is the strategic front end through contract signature. [procure-to-pay, explore__source-to-contract] |
| **Requisition / Purchase Order (PO)** | Internal request to buy, then the formal order document sent to the supplier. It carries price, quantity and terms. |
| **Three-way match** | Comparing the PO, the goods receipt and the supplier invoice before paying. Two-way match is PO vs invoice. [procure-to-pay] |
| **Punchout catalog** | A requester "punches out" from the procurement system to a supplier's online store, then the priced cart returns as a requisition/PO. Used for routine goods. [procure-to-pay, explore__guided-buying-procurement] |
| **Guided buying** | Steering requesters to the right channel (catalog/punchout for goods, guided intake for software/services) with policy checks built in. |
| **RFx (RFI / RFP / RFQ)** | Request for Information, Proposal or Quotation: structured competitive sourcing. Vertice automates launch, response collection and summaries. [platform__sourcing] |
| **Sourcing** | Finding and evaluating suppliers, ideally with competitive tension so a sole source is the exception. |
| **TPRM (Third-Party Risk Management)** | Vetting vendors for security, compliance, financial and data risk at onboarding and continuously afterwards (e.g., a SOC 2 lapse). [insights__supplier-compliance-rates] |
| **SOC 2 / ISO 27001** | The two main security certifications buyers check. 45% of SaaS vendors lack both. |
| **Security questionnaire** | Vendor-completed infosec assessment. Vertice offers pre-filled questionnaires. [blog__product-update-diligence-insights] |
| **Diligence Insights** | Vertice feature that auto-extracts and benchmarks contract terms (liability caps, notice periods, auto-renewal, SLAs) plus vendor certifications. |
| **DPA (Data Processing Agreement)** | GDPR contract governing how a vendor processes personal data. Routed to Legal/Security when PII is involved. |
| **MSA / SaaS Agreement / Order Form** | Master Service Agreement = umbrella legal terms; order forms set commercial terms per purchase. [glossary__master-service-agreement-msa] |
| **SLA (Service Level Agreement)** | Uptime/support commitments. Uncollected service credits are a hidden saving. [l__10-software-procurement-insights-from-ana...] |
| **ELA / EA** | Enterprise License Agreement: a negotiated multi-product, multi-year deal (e.g., Microsoft EA with volume bands A–D). |
| **Auto-renewal clause** | Contract renews automatically unless cancelled by the notice deadline. 72.3% of contracts have one. |
| **Notice period / cancellation deadline** | Days before renewal by which you must give notice. It's the real deadline, earlier than the renewal date. |
| **Price uplift / uplift cap** | Contractual right to raise price at renewal (33% of contracts) and a negotiated cap on it (e.g., 3–5%). [glossary__price-uplifts] |
| **Break clause / reduction clause** | Right to exit early / right to reduce seat or usage commitments mid-term. [glossary__break-clause, glossary__reduction-clause] |
| **True-up / true-down** | Reconciling licenses or usage to actuals. A true-up pays for overage; a true-down (look-back) lowers commitments. |
| **Overages** | Charges for usage above the committed tier. Common in consumption and hybrid deals. [glossary__overages] |
| **TCV / ACV** | Total Contract Value (all years) / Annual Contract Value (per year). The 12 oversights can leave only 30–50% of TCV's ROI. |
| **List price vs negotiated price** | Vendor's sticker price vs actual. The market gap averages **33.8%**. |
| **Pricing benchmarks** | What comparable companies actually pay for the same product, tier, term and volume. Vertice's core data moat. [glossary__pricing-benchmarks] |
| **Price dispersion** | Ratio between best- and worst-negotiated prices for comparable software (2.14x overall; ERP 3.04x). |
| **BATNA** | Best Alternative to a Negotiated Agreement: your credible fallback (alternative vendor) that creates leverage. |
| **Competitive tension** | Introducing alternative vendors or resellers to improve terms. [customer-stories__quartex] |
| **Shelfware** | Licenses paid for but never used (14% of licenses). |
| **Underutilization** | Tools where <50% of purchased seats are active (51% of licenses). |
| **Right-sizing / scope reduction** | Cutting seat counts or tiers to actual usage at renewal. "Scope reduction savings" is a Vertice savings category. |
| **Tail spend** | High-volume, low-value contracts outside central management (63% of contracts, 19% of cost; 72% renew unreviewed). [glossary__tail-spend] |
| **Maverick spend / buying** | Purchases that bypass procurement policy (cards, direct sign-ups). [glossary__maverick-buying] |
| **Shadow IT / Shadow AI** | Software (or AI tools) acquired without IT/procurement oversight; 44% of AI spend. |
| **SaaS sprawl / tool duplication / redundant apps** | Uncontrolled growth of overlapping apps; average company has 144 apps and 7 Dev contracts. [glossary__saas-sprawl] |
| **Application rationalization** | Systematically deciding which apps to keep, consolidate or retire. |
| **SaaS inflation** | YoY rise in SaaS prices for the same products (16.4% in Jun 2026). |
| **SaaS shrinkflation** | Same price, less value (lower caps, unbundled features); 27% of vendors. |
| **Currency harmonization / currency drift** | Vendors resetting regional prices to USD / buying in a weaker currency for savings. |
| **Vendor lock-in / stickiness** | High switching costs; 74.8% of spend is with mission-critical vendors. |
| **Seat-based / consumption (usage-based) / hybrid pricing** | Per-user fee / pay-per-use (tokens, credits, API calls) / base fee plus usage. Usage-based is now #1 at 36.5%. |
| **Shadow billing** | Transition period where the vendor meters usage but bills at the old seat rate. Used to set fair usage tiers. |
| **Budget variance** | Monthly deviation from forecast: 4.1% seat vs 37.6% consumption. |
| **Realized / unrealized savings; cost avoidance** | Banked savings / identified but not yet delivered / price increases you avoided paying (Savings Insights). |
| **Savings guarantee** | Vertice contractually guarantees ≥20% savings. ROI is quoted as a multiple of the Vertice fee. |
| **Procurement-as-a-Service / managed negotiation** | Vertice's human procurement managers negotiate on the customer's behalf. |
| **Cycle time** | Request-to-signature duration (72-day market average). |
| **SRM (Supplier Relationship Management)** | Managing supplier performance, tiering and scorecards over time. |
| **CLM / contract repository** | Contract Lifecycle Management (create → negotiate → execute → monitor → renew) vs a simpler central store of contracts with owners and dates. [platform__contract-management] |
| **Renewal calendar / renewal pipeline** | Timeline view of upcoming renewals and notice dates. |
| **Usage analytics / SaaS discovery** | Detecting apps and active users via SSO (Okta, Google, Microsoft), finance/ERP payments and browser data. |
| **Spend analytics (Spend Insights / Analytics Center)** | Spend broken down by SaaS vs non-SaaS, department, category, term, billing frequency, currency and payment terms. |
| **System of record vs system of action** | Database that stores transactions (legacy S2P/ERP) vs a platform whose agents take actions (Vertice's positioning). |
| **Agentic AI / Ana / Verity** | Autonomous AI agents. **Ana** negotiates (autonomously or as co-pilot). **Verity** is the Vertice AI assistant that picks among 50+ agents. |
| **MCP (Model Context Protocol)** | Open standard that lets Claude, ChatGPT and Copilot query live Vertice data (one-click, SSO). [blog__vertice-mcp-launch] |
| **FinOps** | Cross-functional cloud financial management (finance + engineering). [glossary__finops] |
| **EDP / PPA** | AWS Enterprise Discount Program / Private Pricing Agreement: a committed-spend contract for an across-the-board discount. |
| **Reserved Instances (RIs)** | 1- or 3-year capacity commitments for EC2/RDS at a discount. Vertice's RI optimizer claims up to 60% off compute. [glossary__reserved-instances] |
| **Savings Plans** | AWS $/hour compute commitments; more flexible than RIs. |
| **Spot instances** | Spare AWS capacity at deep discounts that can be interrupted. [glossary__spot-instances] |
| **Commitment coverage** | % of eligible usage covered by RIs or Savings Plans. |
| **Cloud unit economics** | Cloud cost per business unit (customer, transaction). [glossary__cloud-unit-economics] |
| **Zero-based budgeting** | Rebuilding each budget from zero each cycle instead of rolling forward. [glossary__zero-based-budgeting] |
| **CPS 230** | Australian APRA standard on operational and third-party risk (GROW story). |
| **Centralized vs decentralized procurement** | One team buys for all vs departments buy independently (the root cause of duplication). [glossary__centralized-procurement] |

---

## 5. Common customer pains (ranked by frequency across content)

Method: I counted keywords per document across 25 customer stories, 65 insights and report pages, and 174 blogs, excluding shared FAQ boilerplate. Then I manually adjusted for synonyms the regex missed (e.g., "underuse", "no time"). Treat the counts as directional.

| Rank | Pain | Evidence (stories / insights+reports / blogs) | Representative proof |
|---|---|---|---|
| 1 | **No visibility into the stack, spend, owners or renewal dates** ("living in spreadsheets") | 19 / 13 / 96 | ClearScore, FirstVet, Greylock, Holidu, Lead Forensics, Quartex, me&u, A.Team |
| 2 | **Overpaying: no pricing benchmarks; vendors hold the information** | 17 / 45 / 84 | Factorial ("almost certainly overpaying"), Quartex ("internet forums"), Hercules, FMG; 33.8% list-to-actual gap; 2.14x dispersion |
| 3 | **No procurement capacity or expertise; execs pulled into negotiations** | ~13 stories (manual count) / 4 / 36 | NewtonX CFO, A.Team Head of Finance, CloudHesive CTO, Greylock, AA lean team, Le Collectionist; Ana's "capacity ceiling" thesis |
| 4 | **Tool duplication and sprawl, usually after rapid growth or M&A** | 12 / 13 / 70 | me&u 50+ duplicates; Piano; CloudHesive; Factorial 50→1,200 staff; average 144 apps, +10% YoY |
| 5 | **Manual, email/spreadsheet-driven processes** | 12 / 7 / 67 | Lead Forensics, ClearScore, NewtonX, intelliflo; 33 emails + 3 meetings per purchase |
| 6 | **Auto-renewals and missed notice dates** | 10 / 7 / 48 | FMG, FirstVet, AA, Le Collectionist, ClearScore; 72.3% auto-renew; 72% of tail renews unreviewed |
| 7 | **Slow cycles and approval bottlenecks (sequential reviews, legal/security lag)** | 7 / 11 / 65 | Le Collectionist, CloudHesive, Hercules, Felix; 72-day average; Legal p80 14 days |
| 8 | **Compliance, security and audit risk in buying (SOC 2, TPRM, regulation)** | 8 / 9 / 62 | CloudHesive, GROW, Felix, intelliflo; 45% of vendors lack dual certification |
| 9 | **Decentralized buying, shadow IT and maverick spend** | 7 / 6 / 51 | Global creative network, me&u, GROW, ClearScore; 44% of AI spend outside oversight |
| 10 | **SaaS inflation, uplifts and shrinkflation** | 4 / 15 / 56 | me&u ("vendors increasing prices all the time"), FMG; 16.4% inflation; 27% shrinkflation |
| 11 | **Shelfware and underutilized licenses** | ~6 (incl. "underuse") / 19 / 64 | HR tech (+21% utilization), NewtonX, me&u, Greylock; 65% of licenses wasted |
| 12 | **Cloud cost growth with no finance–engineering alignment** | 4 / 2 / 46 | Cyber leader (+40% YoY), Encompass, HR tech |
| 13 | **AI and consumption-pricing cost volatility** (newest; dominates 2026 insights pages) | 0 / ~20+ (2026 pages) / 18 | 37.6% budget variance; +22.6% contract cost on consumption; AI Cost Optimization launch |

**Takeaway for the demo narrative:** the stories open on visibility and overpaying (ranks 1–2), the proof is capacity and speed (3, 7), and the 2026 urgency is renewals, inflation and AI/consumption costs (6, 10, 13). A good click path is:
1. Discovery dashboard (144 apps, $1.9M waste).
2. Renewal calendar (ZoomInfo/Gong notice in 3 days).
3. Benchmark on the Salesforce quote (+12% uplift vs a 33.8% market discount).
4. Intake with parallel approvals (72 → 36 days).
5. Ana on the long tail.
6. Savings Insights (21.6% realized vs the 20% guarantee).
7. AI Cost Optimization (37.6% variance).
