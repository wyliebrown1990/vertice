# Venture Exit Base Rates and the M&A/Exit Environment: Inputs for Estimating Vertice's Exit Odds (as of Oct 2026)

Research date: 2026-10-15. Method note: WebFetch could not resolve hosts during this session (DNS errors on carta.com, saastr.com, nonpublic.com). As a result, most figures below come from search-result extracts of the cited pages, not full-page reads. Treat precise numbers as "reported by the source as summarized in search results" and spot-check the primary page before relying on them in a final model. Conflicts between sources are flagged inline.

---

## 1. Base rates: what happens to companies that raise a Series B or C (IPO / M&A / still private / fail), graduation rates, time to exit

### Takeaway
No single published dataset tracks a clean Series B cohort through to final outcome. The best available proxies, Carta's 2018 founding cohort and CB Insights' funnels, show that IPOs are rare even for venture-backed companies: about 0.3% of a full founding cohort, and probably low single digits for companies that reached Series B. M&A is the dominant exit path. Graduation from Series B to Series C is roughly 50-60% over the long run, but slower recently (a 2.4-year median gap). Most companies that raise a Series B are still private, or have quietly failed or been sold for little, 6-8 years after founding.

### Cited Findings
- Carta tracked 4,369 US startups founded in 2018. After about 7 years, 643 had reached Series B, 15 had gone public and 143 had been acquired. The rest were "still building" or had shut down — [Carta: We Tracked 4369 Startups Founded in 2018](https://carta.com/data/linkedin-2018-startup-cohort-outcomes-2025/)
  - A secondary summary of the same cohort gives **239 acquired (5.5%)** and **2,707 closed down (61.9%)**, which conflicts with Carta's own count of 143 acquired. The difference may come from different snapshot dates or definitions. Verify against Carta before use — [Duet Partners newsletter, 20 Feb 2025](https://www.duetpartners.com/newsletter/20th-february-2025/)
- Carta finds that rates of graduating to the next round are "remarkably consistent" across Seed, Series A and Series B. Series A and B startups are only slightly more likely to be acquired, a difference of low single-digit percentage points — [Carta: Seed, Series A and B startups fail at similar rates](https://carta.com/data/linkedin-seed-series-a-b-failure-rates-similar/)
- A LinkedIn post discussing Carta data says the **acquisition rate peaks at Series B at about 2.2%** (the per-period basis is not clear from the snippet). Commenters note that the data does not distinguish good exits from sales at or below cost — [LinkedIn / Peter Walker (Carta)](https://www.linkedin.com/posts/peterjameswalker_cartadata-m-startups-activity-7171557698495270913-wcYp)
- Carta's 2026 analysis of **3,903 acquired US startups**: **80% of acquired startups had raised less than $50M** in total capital — [summarized via Founded CEO Substack on Carta 2026 data](https://foundedceo.substack.com/p/carta-just-released-the-most-honest)
- Carta Q1 2024: closures of companies on Carta rose **133% YoY at Series B** (61% at Series A, 102% at seed) — [Carta: Startup shutdowns are accelerating](https://carta.com/data/startup-shutdowns-q1-2024/)
- Median time from **Series B to Series C was 2.4 years** at end-2024 (Carta) — [Carta State of Private Markets Q4 2024](https://carta.com/data/state-of-private-markets-q4-2024/) (figure as summarized in search results; see also [SaaStr on Carta round timing](https://www.saastr.com/carta-the-average-time-from-seed-to-series-a-has-hit-2-2-years-and-longer-from-series-a-to-series-b/))
- Chronograph estimates that about **60% graduate A→B, and similarly B→C and C→D**. This is a loose, unsourced and undated heuristic — [Chronograph: The Series A Crunch](https://www.chronograph.pe/current-trends-in-the-series-a-and-seed-venture-markets/)
- Seed→Series A within 2 years: **30.6%** for the Q1 2018 seed cohort, versus about **17%** for the 2022 cohort. This illustrates how much graduation has slowed since 2022 — [Chronograph](https://www.chronograph.pe/current-trends-in-the-series-a-and-seed-venture-markets/); [ValueAddVC seed statistics](https://valueaddvc.com/blog/seed-round-statistics-2025-median-check-size-post-money-valuation-and-conversion-to-series-a)
- CB Insights venture funnel (2009-10 seed cohort, old data): **about 30% of seed-funded companies exited via IPO or M&A**, and **about 67% ended up dead or self-sustaining**. Fewer than 40% raised a second round — [CB Insights: The Venture Capital Funnel](https://www.cbinsights.com/research/venture-capital-funnel-2/)
- CB Insights (2015 global tech exits, by last round raised): **48% of exits came after seed or Series A**, and **27% came after Series B or C**. This is the share of exits by stage, not the probability of exiting — [CB Insights: tech companies exit early stage](https://www.cbinsights.com/blog/tech-companies-exit-early-stage)
- Regional CB Insights funnels: the Silicon Valley cohort's overall exit rate was **33%**, and New York's was **35%** — [CB Insights regional VC funnels](https://www.cbinsights.com/research/regional-vc-funnels/)
- PitchBook has published "VC Returns by Series" analyst notes with outcome and return distributions by round. I could not access the contents — [PitchBook Analyst Note: VC Returns by Series Part III (PDF)](https://files.pitchbook.com/website/files/pdf/PitchBook_Analyst_Note_VC_Returns_by_Series_Part_III.pdf)

### Inferences
- **Approximate cohort math from Carta 2018:** if the cohort's 15 IPOs came mostly from the 643 that reached Series B, the IPO rate *conditional on reaching Series B* is about **2-3% after about 7 years** (15/643 ≈ 2.3%). This is an upper-bound style estimate, because a few IPOs may come from companies that skipped rounds. Acquisitions: 143-239 across the whole cohort. If roughly 30-50% of these came from Series B+ companies, the cumulative M&A rate for Series B companies is perhaps **7-18% so far** at year 7, with many still pending. This is my rough estimate, not a Carta figure.
- **Suggested model priors for a Series B/C SaaS company about 6 years old, with roughly 10-year horizon cumulative outcomes.** Synthesized from the above. These are inferences, not sourced statistics:
  - IPO: about 3-6%
  - Strategic M&A at a "good" outcome (≥1x invested capital to common): about 15-25%
  - PE buyout or PE-backed platform acquisition: about 5-10%
  - Acqui-hire, fire sale, or M&A below preference stack: about 15-25%
  - Shutdown: about 15-25%
  - Still private / zombie at horizon: the remainder (about 20-35%)
- Vertice has raised more than $100M, which puts it outside the 80% of acquired startups that raised less than $50M. The buyer pool for a full-value exit therefore narrows to larger strategics and PE.
- The 2.4-year median gap from Series B to Series C means a company that has gone more than 2.5 years since its last priced round is drifting toward the "stalled" tail.

### Gaps
- I could not find a primary, published Series B-cohort outcome table (IPO / M&A / private / dead) from Carta, PitchBook, Correlation Ventures, Cambridge Associates, Kruze or AngelList. Fetches to carta.com failed, so I could not read the full cohort page.
- I found no verified Series C→D graduation rate for 2023-2026 cohorts.
- I found no reliable median time from Series B to exit. PitchBook's time-to-exit model is referenced in Q2 2026 Venture Monitor commentary, but the figures were not extracted.
- Correlation Ventures' loss-ratio data (the share of financings returning less than 1x) and Tomasz Tunguz's exit analyses were not reached.

---

## 2. European and UK exit rates and the share of exits to US or foreign acquirers

### Takeaway
European tech exits recovered modestly in count in 2025, but Europe still captures only about 10% of global exit value. More than 40% of European exit value goes to foreign buyers, and investors cite a lack of M&A exit routes as their top constraint. For a London-founded company with a large US presence, like Vertice after the Vendr deal, US strategics and PE are the most likely full-value buyers.

### Cited Findings
- Europe captured **10% of the $608B in global tech exit value in 2025** (Atomico State of European Tech 2025) — [Sifted: 10 key findings from Atomico's State of European Tech 2025](https://sifted.eu/articles/state-european-tech-report-2025)
- Atomico: **more than 40% of European tech exit value is captured abroad**, meaning the buyer or listing venue is outside Europe — [Atomico: Europe creates global value…](https://atomico.com/insights/europe-creates-global-value-now-regulators-need-to-help-us-keep-the-rewards)
- European tech exits numbered **715 in 2025, compared with 648 in 2024 and 847 in 2023** (Tech.eu count, not Atomico) — [Tech.eu: European tech in 2025](https://tech.eu/2026/01/13/european-tech-in-2025-the-data-the-deals-and-what-comes-next/)
- In 2024 Europe saw only about **$3B of IPO value and $10B of M&A value** (S&P Capital IQ figures cited in Atomico 2024 coverage) — [TechCrunch on Atomico 2024](https://techcrunch.com/2024/11/18/venture-funding-in-europe-in-2024-fell-to-45-billion-says-atomico/)
- **43% of European VC investors** said a lack of M&A exit routes stopped them writing more cheques, making it the top barrier — [Sifted on Atomico 2025](https://sifted.eu/articles/state-european-tech-report-2025); [Capital-Riesgo.es on SoET 2025](https://capital-riesgo.es/en/articles/state-of-european-tech-2025-report-europe-faces-a-decisive-decade-to-define-its-technological-leadership/)
- Category-relevant UK example: Trelica, a UK SaaS-management company founded in 2018 with a team of 23, was acquired by **1Password (Canada/US)**. The deal closed at the end of December 2024 and was announced in January 2025 — [Corma / SaaS management roundups](https://www.corma.io/blog/top-15-saas-management-solutions-for-mid-sized-companies)
- Sastrify, a German SaaS-procurement company and a direct Vertice competitor, was reportedly **acquired by Deel (US) in May 2026**. Only secondary sources report this — [Suplari: Best Spend Management Software](https://suplari.com/blog/best-spend-management-software); [Coommit roundup](https://coommit.com/blog/saas-management-platforms-2026-zylo-vs-vendr-vs-sastrify)

### Inferences
- Both UK/EU peers in Vertice's niche that have exited (Trelica, Sastrify) were bought by **US or North American acquirers** expanding horizontally (security, HR/payroll). This suggests the likeliest strategic buyer for Vertice is a US platform, not a European one.
- Europe's 10% share of global exit value, set against its larger share of VC-backed companies, implies **lower exit probabilities and values for European companies than US ones**. Vertice's US revenue base after Vendr partly offsets this.

### Gaps
- I could not access the specific Atomico or Dealroom statistic on the percentage of European exits (by count) going to US acquirers.
- I found no UK-specific scale-up exit-rate data (e.g. ScaleUp Institute or Beauhurst) on Series B companies.

---

## 3. Exit valuation distributions: how many M&A exits return capital, down-round exits, liquidation preferences, zombie unicorns

### Takeaway
A large and growing share of 2021-vintage high-valuation companies are "zombies": about 38% of US unicorns have not raised in 3+ years as of 2026. Category exits at well below peak valuation are now the norm; Brex, the closest adjacent spend-management unicorn, sold at about 37-42% of its 2021 valuation. Liquidation-preference terms have eased since 2023 but still matter in sub-capital exits.

### Cited Findings
- PitchBook (via Axios): the share of US unicorns that **haven't raised in 3 years** rose from **2.3% (2022) to 33.5% (2025) and 38.3% (2026)**. More than a third of **909 active US unicorns** are in this group — [Axios Pro: Zombie unicorn count grows (27 Mar 2026)](https://www.axios.com/pro/all-deals/2026/03/27/zombie-unicorn-count-grows)
- By May 2026, **332 of about 1,900 unicorns** had raised at a valuation at or below their peak, and **383 had disclosed no new funding in 3 years** (41 of which lost unicorn status). Nearly half of the below-peak firms last raised in 2021 (Stanford-linked database) — [Edward Conard Macro Roundup: Zombie unicorns](https://www.edwardconard.com/macro-roundup/zombie-unicorns-are-haunting-silicon-valley/)
- One June 2026 piece reports **only 78 unicorns exited in all of 2025**. This is a secondary source — [Catenaa: Zombie Unicorns, Silicon Valley's exit crisis](https://catenaa.com/markets/global-markets/zombie-unicorns-silicon-valley-exit-crisis/)
- Carta's down-round rate **fell to 11.4% in Q1 2026 from a peak of about 22% in 2023**, and liquidation-preference and participation terms are "near multi-year lows". I could not verify this against the underlying Carta report — [Carta term sheet guide](https://carta.com/learn/startups/fundraising/term-sheets/)
- In Q1 2024, **liquidation preferences above 1x appeared in about 8% of rounds** on Carta, tied for the decade high — [Carta: Deal terms Q1 2024](https://carta.com/data/deal-terms-q1-2024/)
- **Brex → Capital One**: announced 22 Jan 2026 at **$5.15B** (about 50% cash, 50% stock). It closed 7 Apr 2026 at about **$4.5B** total consideration ($2.6B cash plus 10.6M COF shares worth $1.9B), and Capital One also repaid **$1.1B** of Brex debt. Brex's 2021 peak valuation was **$12.3B** — [Simpson Thacher (23 Jan 2026)](https://www.stblaw.com/about-us/news/view/2026/01/23/capital-one-to-acquire-brex-for-$5.15-billion); [Capital One 10-Q Q2 2026 (SEC)](https://www.sec.gov/Archives/edgar/data/0000927628/000092762826000089/cof-20260630.htm); [Fintool](https://fintool.com/news/capital-one-acquires-brex-5-billion)
- **Navan** IPO'd at about a **$6.2B** valuation, compared with a **$9.2B** 2022 private valuation (about −33%) — [Globes](https://en.globes.co.il/en/article-1001525086); [Yahoo Finance](https://finance.yahoo.com/news/travel-tech-firm-navan-makes-190934694.html)

### Inferences
- **Most mid-size VC-backed M&A is at or below capital raised.** Carta reports that 80% of acquired companies raised less than $50M, and commenters note many are "sold at cost". For a company with $100M+ raised, the threshold for a common-shareholder-positive exit is meaningfully high. Assuming a standard 1x non-participating preference stack of about $100-150M (exact Vertice capital raised and terms unknown), any sale below about $150M would leave common holders with little.
- Benchmark haircut: in the adjacent category, the 2021-22 peak to 2025-26 exit discount has run about −33% to −63% (Navan −33%, Brex about −58% to −63% on closing consideration). A model should assume that any 2021-22-priced round for Vertice is unlikely to be cleared at a large premium.

### Gaps
- I found no source quantifying the **share of 2025-26 VC-backed M&A exits that returned at least 1x invested capital**. Carta's exit-outcome data was not reachable.
- I found no data on the prevalence of participating preferences or more-than-1x preferences specifically at Series B/C in 2021-2022 rounds. That is the vintage relevant to Vertice's capital structure.
- The terms and price of Vertice's own rounds and of the Vendr acquisition are undisclosed (see Section 5).

---

## 4. 2025-2026 market environment: IPO window, SaaS M&A volumes and multiples, PE take-privates, the "SaaSpocalypse"

### Takeaway
The 2026 exit environment is bifurcated. Headline venture exit value hit records because of the **SpaceX IPO (June 2026)**, but excluding mega-deals, liquidity remains tight. The **2025 B2B/fintech IPO class mostly trades below issue**. A real AI-driven software selloff, the "SaaSpocalypse", hit in **February 2026** and compressed public SaaS multiples to about 3.2x median EV/revenue (SEG, 2Q26). Private SaaS M&A multiples held up better at a median of about 4.0x, and **SaaS M&A deal counts rose** (698 deals in Q2 2026, +9.6% YoY). PE buyers such as Thoma Bravo are openly buying the dip with a $24.3B software fund. This favors **M&A and PE exits over IPO** for a sub-scale SaaS company.

### Cited Findings

**SaaSpocalypse (verified as a real event)**
- Bloomberg ran "What's Behind the 'SaaSpocalypse' Plunge in Software Stocks" on **4 Feb 2026** — [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks)
- The term is attributed to Jefferies analyst Jeffrey Favuzza. The catalyst is widely cited as Anthropic's Claude Cowork and AI-agent tools, with fear of erosion of per-seat licensing. Estimates of value lost range from about $285B in 48 hours to more than $1T in a week. Some sources say Atlassian fell about 35% and Salesforce about 28%, while security names fell only 5-10% — [Forbes / Peter Cohan (6 Feb 2026)](https://www.forbes.com/sites/petercohan/2026/02/06/saaspocalypse-now-ai-is-disrupting-saas---but-not-all-software-is-doomed/); [Forrester](https://www.forrester.com/blogs/saas-as-we-know-it-is-dead-how-to-survive-the-saas-pocalypse/); [tech-insider.org](https://tech-insider.org/saas-stock-crash-ai-agents-2-trillion-2026/) (lower quality, reports a further 9 Apr selloff)
- By **30 Jun 2026**, software stocks had rebounded about 13%, and Orlando Bravo (Thoma Bravo) said the SaaSpocalypse is "over" — [Forbes / Tim Keary (30 Jun 2026)](https://www.forbes.com/sites/timkeary/2026/06/30/the-saaspocalypse-maybe-ending-but-saas-will-never-be-the-same-again/)

**Public and private SaaS multiples (SEG, Aventis)**
- **SEG SaaS Index median EV/TTM revenue: 5.7x (2Q25) → 3.2x (2Q26)** — [Software Equity Group quarterly SaaS report](https://softwareequity.com/research/quarterly-saas-report)
- **SEG private SaaS M&A median EV/TTM revenue: 4.0x in 2Q26**, down from 4.2x in 1Q26. The average moved from 6.3x to 6.2x — [Peony summary of SEG](https://www.peony.ink/blog/saas-valuation-multiples); [Axia Growth](https://axiagrowth.com/resources/industries/technology/vertical-saas)
- **698 SaaS M&A transactions in Q2 2026, +9.6% YoY** (SEG) — [Windsor Drake summary](https://windsordrake.com/vertical-saas-valuation-report/)
- Aventis: private SaaS median **3.1x in Q1 2026** (a sample skewed toward smaller deals). The long-run 2015-2026 median is **4.5x** — [Aventis Advisors](https://aventis-advisors.com/saas-valuation-multiples/)

**Venture exits and the IPO window (US)**
- PitchBook-NVCA Q2 2026: H1 2026 US venture exit value of **$2,187.6B** (versus $284.1B for all of 2025), with **Q2 at $1,828.8B**, driven by the **SpaceX IPO at about $1.7T**. Excluding SpaceX, liquidity looks like the "tight" environment of recent years. OpenAI and Anthropic have reportedly filed confidentially — [The Fund CFO: Q2'26 highlights](https://thefundcfo.substack.com/p/356-q226-highlights-pitchbook-nvca); [PitchBook Q2 2026 Venture Monitor](https://pitchbook.com/news/reports/q2-2026-pitchbook-nvca-venture-monitor); [NVCA PDF](https://nvca.org/wp-content/uploads/2026/07/Q2-2026-PitchBook-NVCA-Venture-Monitor.pdf)
- Dealroom (Aug 2026) describes the window as "wide open" after SpaceX listed on 12 Jun 2026 at about $1.77T. The pipeline is AI-heavy — [Dealroom: Upcoming & recent IPOs](https://dealroom.net/blog/upcoming-recent-ipos)
- SaaStr scorecard: **only 3 of 13 of the 2025 tech/B2B IPO class were trading above issue** — [SaaStr: The 2025 IPO Class, Graded](https://www.saastr.com/the-2025-ipo-class-graded-only-3-of-13-are-above-water/)
- **Navan** (spend/travel and expense, the closest public comp to Vertice's buyer persona): IPO'd on Nasdaq in **October 2025** at **$25/share**, raising about **$923M** at about a **$6.2B** valuation. TTM revenue was **$613M (+32%)**, H1 2025 net loss was about $100M, and the stock **closed −20% on day one** ($20) — [Globes](https://en.globes.co.il/en/article-1001525086); [IBTimes](https://www.ibtimes.com/navn-stock-update-navans-923-million-ipo-dazzles-wall-street-despite-troubling-budget-detail-3788960); [Crunchbase News](https://news.crunchbase.com/public/navan-ipo-debut-down-nasdaq-navn). One source gives a conflicting $14 IPO price, which is likely an error or a later trading price — [SaaStr via search](https://www.saastr.com/the-2025-ipo-class-graded-only-3-of-13-are-above-water/)
- **Klarna** listed on NYSE (KLAR). Sources conflict: one says it priced at **$40 on 10 Sep 2025**, another says $42 in Nov 2025. It has since fallen about 69% (to about $13) — [pdpspectra](https://pdpspectra.com/blog/tech-ipo-market-2025-2026/); [SaaStr](https://www.saastr.com/the-2025-ipo-class-graded-only-3-of-13-are-above-water/)
- **Figma** closed day one +250% at $115.50 and was later reported as about 20% below its IPO price. 2026 revenue guidance was raised to $1.36-1.37B with about 40% growth — [pdpspectra](https://pdpspectra.com/blog/tech-ipo-market-2025-2026/); [SaaStr](https://www.saastr.com/the-2025-ipo-class-graded-only-3-of-13-are-above-water/)
- Crunchbase: 2025 laggards (including StubHub and Navan) "largely continue to underwhelm" — [Crunchbase News 2026 IPO forecast](https://news.crunchbase.com/public/2026-ipocompanies-forecast-predictions-spacex-openai)

**PE take-privates and software buyouts**
- US PE invested **$545.1B across 3,926 deals in H1 2026** (KPMG), compared with 9,350 deals in all of 2025. PwC reports H1 2026 deal **volume down 34% YoY while value rose about 10%**, meaning fewer, larger deals — [National Law Review](https://natlawreview.com/article/private-equitys-hard-year-has-real-openings); [DelMorgan](https://delmorganco.com/thoma-bravo-to-take-accelerant-private-in-a-4bn-transaction/)
- Thoma Bravo raised a **$24.3B software-dedicated fund** and argues that public markets are wrong about AI disruption of SaaS — [Forbes (25 Mar 2026)](https://www.forbes.com/sites/josipamajic/2026/03/25/thoma-bravo-says-public-markets-have-software-wrong-and-is-positioning-to-buy/); [Private Equity Wire](https://www.privateequitywire.co.uk/thoma-bravo-eyes-software-deals-amid-sector-sell-off/)
- Thoma Bravo's 2026 deals include **Dayforce** (closed Feb 2026), **Kneat** (about C$650M, Jun 2026) and **Accelerant** (more than $4B, announced 13 Aug 2026). One tracker estimates about 8 Thoma Bravo deals in 2026 YTD versus 17 in 2025 — [DelMorgan](https://delmorganco.com/thoma-bravo-to-take-accelerant-private-in-a-4bn-transaction/); [Thoma Bravo – Wikipedia](https://en.wikipedia.org/wiki/Thoma_Bravo); [Tracxn](https://tracxn.com/d/acquisitions/acquisitions-by-thoma-bravo/__NM0xIRQAHberE6vJPYnsKNXupsK4e8jNQaKkkwqzZi4)

### Inferences
- **The IPO path is effectively closed to Vertice in the near term.** The 2025 B2B class (Navan at about $613M revenue) mostly trades below issue, and public SaaS multiples sit at about 3.2x. A company with likely well under $200M ARR is not a credible IPO candidate before roughly 2029-2030, if ever.
- **The M&A environment is mixed but serviceable.** Private SaaS deal counts are up and median multiples are about 4x TTM revenue. A procurement/SaaS-spend company with an AI-negotiation story ("Ana") fits the "AI-native" narrative acquirers are paying for. However, its core per-seat or subscription SaaS-management revenue is exactly what the SaaSpocalypse discounted.
- **Valuation anchor for a sale:** at about 4x the median and about 6x the average (SEG 2Q26), an exit at, for example, $50-80M ARR would imply roughly $200-500M EV. Note that I did not find Vertice's ARR; another researcher should supply it.

### Gaps
- I found no verified Meritech or Clouded Judgement (Jamin Ball) public SaaS forward multiples as of Oct 2026.
- I found no Q3 2026 PitchBook-NVCA figures, Q2 2026 exit counts excluding SpaceX, or exits-by-count data.
- I found no SaaS Capital private-company valuation index for 2026.
- The SaaSpocalypse peak-to-trough decline in the IGV/BVP Cloud index is not precisely quantified, because sources conflict ($285B to $2T).

---

## 5. Category M&A: procurement, spend management and SaaS management, 2018-2026

### Takeaway
The category has seen active consolidation. Point solutions are typically absorbed by larger platforms (Coupa, Deel, 1Password, Paylocity, Capital One) or PE-backed roll-ups (Thoma Bravo/Coupa, Vista/Jaggaer, Flexera/Snow). Most smaller deals have undisclosed prices. The few disclosed prices show large discounts to 2021 peaks. Vertice's acquisition of Vendr (June 2026) makes Vertice a consolidator, but it also signals that its closest US rival could not sustain an independent path.

### Cited Findings

| Date | Acquirer | Target | Price / multiple (if disclosed) | Source |
|---|---|---|---|---|
| Dec 2022 (announced) | Thoma Bravo | Coupa (take-private) | $6.15B cash | [Coupa – Wikipedia](https://en.wikipedia.org/wiki/Coupa) |
| Feb 2022 | Vendr | Blissfully (SaaS management) | About $100M (TechCrunch, unconfirmed by company) | [TechCrunch, 23 Feb 2022](https://techcrunch.com/2022/02/23/vendr-acquires-blissfully-combining-its-saas-buying-services-with-management-tools/) |
| 2022 | Flexera | Snow Software (SAM/SaaS mgmt) | Not disclosed in sources found | [PitchBook profile](https://pitchbook.com/profiles/company/64784-26); [Corma](https://www.corma.io/blog/top-15-saas-management-solutions-for-mid-sized-companies) |
| 2024 | Paylocity | Airbase (spend mgmt) | Not found in this search (see Gaps) | [Mindsprint / precoro summaries](https://www.mindsprint.com/resources/blogs/source-to-pay-software) |
| 2024 | Vista Equity Partners | Jaggaer (source-to-pay) | Not disclosed in sources found | [Mindsprint](https://www.mindsprint.com/resources/blogs/source-to-pay-software) |
| Closed end Dec 2024, announced Jan 2025 | 1Password | Trelica (UK SaaS mgmt, 23 staff) | Not disclosed | [Corma](https://www.corma.io/blog/top-15-saas-management-solutions-for-mid-sized-companies) |
| Jan 2026 (announced), Apr 2026 (closed) | Capital One | Brex (corporate card, spend mgmt) | $5.15B announced, about $4.5B at close plus $1.1B debt repaid; 2021 peak $12.3B | [Simpson Thacher](https://www.stblaw.com/about-us/news/view/2026/01/23/capital-one-to-acquire-brex-for-$5.15-billion); [COF 10-Q](https://www.sec.gov/Archives/edgar/data/0000927628/000092762826000089/cof-20260630.htm) |
| Early 2026 | Sievo | Provalido (UK procurement performance mgmt) | Not disclosed | [CPO Rising ProcureTech Pulse, 4 Feb 2026](https://cporising.com/2026/02/04/technology-round-up-february-4-2026/) |
| Apr 2026 | Supplier.io | TealBook (supplier data) | Not disclosed | [Suplari](https://suplari.com/blog/top-procurement-intelligence-platforms) |
| May 2026 | Coupa (Thoma Bravo) | Rossum (AI document processing) | Not disclosed | [Thoma Bravo press release](https://www.thomabravo.com/press-releases/coupa-acquires-rossum-to-accelerate-end-to-end-autonomous-spend-management) |
| May 2026 | Deel | Sastrify (German SaaS procurement, a direct Vertice competitor) | Not disclosed; secondary sources only | [Suplari](https://suplari.com/blog/best-spend-management-software) |
| 2026 | CoreStack | BetterCloud (SaaS mgmt) | Not disclosed; single secondary source | [Coommit](https://coommit.com/blog/saas-management-platforms-2026-zylo-vs-vendr-vs-sastrify) |
| 1 Jun 2026 | **Vertice** | **Vendr** (US SaaS buying/pricing) | **Not disclosed.** The combined dataset covers $75B+ of indirect spend, 32,000 vendors, 250k contracts and 2M+ price points. Customers include ARM, Brex, Duolingo, Twilio and Santander | [PR Newswire via AAP, 1 Jun 2026](https://www.aap.com.au/aapreleases/cision20260601ae71961/); [CFOtech UK, 3 Jun 2026](https://cfotech.co.uk/story/vertice-buys-vendr-to-build-bigger-procurement-dataset); [Pulse 2.0](https://pulse2.com/vertice-acquires-vendr-to-create-procurement-intelligence-datasets-and-advance-autonomous-ai-negotiation/); [PrivSource](https://www.privsource.com/acquisitions/deal/vertice-acquires-vendr-ane_krSdDV) |

- **Navan** (spend/T&E) took the IPO route instead of M&A, at about 10x TTM revenue (my calculation: $6.2B / $613M), with a −20% day-one close — [Globes](https://en.globes.co.il/en/article-1001525086); [Yahoo Finance](https://finance.yahoo.com/news/travel-tech-firm-navan-makes-190934694.html)

### Inferences
- **The likely acquirer archetypes for Vertice, based on the precedents above:**
  1. HR, payroll and global-employment platforms adding spend or SaaS management (Deel–Sastrify, Paylocity–Airbase)
  2. Identity and security vendors adding SaaS governance (1Password–Trelica)
  3. Procurement suites and source-to-pay players buying AI capability (Coupa–Rossum, Sievo–Provalido)
  4. Banks and fintechs buying spend platforms (Capital One–Brex)
  5. PE-backed ITAM/SAM consolidators (Flexera–Snow, and Vista or Thoma Bravo portfolios)
- **Of Vertice's direct European peers, two (Trelica, Sastrify) have been absorbed by larger US platforms.** Vertice is the remaining scaled European independent and now owns the main US rival, Vendr. That increases its strategic scarcity value, but also its capital needs and integration risk.
- The prices of most small category deals are undisclosed. Typically that pattern correlates with modest or below-preference outcomes, but this is an inference, not evidence.

### Gaps
- The search did not surface acquisitions by **Ramp, Zip, Navan (e.g. Tripeasy), Emburse–Tallie, Coupa–Llamasoft (2020), Workday–Scout RFP (2019), or Workday–Evisort (2024)**, so I cannot cite prices or dates for them from this session. Training knowledge suggests Coupa–Llamasoft was about $1.5B (2020), Workday–Scout RFP about $540M (2019), and Paylocity–Airbase about $325M (2024), but **these are unverified here** and should be checked before use.
- The Flexera–Snow price is not disclosed in sources found.
- The Vendr acquisition price, structure (stock versus cash) and Vendr's ARR at sale are not disclosed. This matters greatly for estimating Vertice's post-deal ARR and preference stack.
- Vertice's own total capital raised, last-round valuation and ARR were not verified in this session (the task brief assumes "~$100M+ raised").

---

## 6. ARR thresholds and growth/profitability expectations for a tech IPO in 2025-2026

### Takeaway
The 2025-26 B2B IPO cohort went out at roughly **$500M+ ARR or revenue with about 30-50% growth**: Navan at $613M TTM revenue and +32%, and Figma at about $1B+ revenue and about 40% growth. Even so, most trade below issue. That is well above the historical "$100M-200M ARR" rule of thumb. A credible IPO path today implies about $300-500M ARR and Rule-of-40 performance.

### Cited Findings
- SaaStr heuristic: the recent B2B IPO batch averaged roughly **50% growth at $500M ARR**. "If you're not in that tier, you're waiting longer" — [SaaStr: Navan files for IPO](https://www.saastr.com/navan-files-for-ipo-the-opening-of-b2b-ipo-floodgates); [SaaStr 2025 IPO class](https://www.saastr.com/the-2025-ipo-class-graded-only-3-of-13-are-above-water/)
- Navan at IPO: **$613M TTM revenue, +32% growth, about $100M H1 net loss** — [Yahoo Finance](https://finance.yahoo.com/news/travel-tech-firm-navan-makes-190934694.html); [IBTimes](https://www.ibtimes.com/navn-stock-update-navans-923-million-ipo-dazzles-wall-street-despite-troubling-budget-detail-3788960)
- Figma: 2026 revenue guidance of **$1.36-1.37B with about 40% growth** — [pdpspectra](https://pdpspectra.com/blog/tech-ipo-market-2025-2026/)
- SaaStr on the bar for a Series B: the private-market bar has also risen — [SaaStr: The Bar Today for a Series B](https://www.saastr.com/the-new-bar-for-a-series-b/)

### Inferences
- Navan was unprofitable at IPO and still traded down. For a Vertice-scale company, the market likely demands **Rule of 40 or better and a clear path to GAAP profitability** at $300M+ ARR.
- Assume Vertice plus Vendr combined ARR is well under $100M. This is unverified, and another researcher should confirm it. Reaching an IPO-grade $300-500M ARR would take roughly 4-6+ years at 30-40% growth, which pushes any IPO scenario to about 2030-2032. A 10-year IPO probability of about 3-5% (Section 1 prior) seems appropriate unless ARR data says otherwise.

### Gaps
- I found no authoritative 2026 survey of median ARR at IPO (e.g. Meritech or Bessemer State of the Cloud 2026) in this session.
- I found no verified Rule-of-40 medians for the 2025-26 IPO cohort.
