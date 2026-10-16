"""Reproducible arithmetic behind research/STRATEGIC_REVIEW.md.

Every input is either a figure Vertice (or a cited third party) published,
or an explicit, labelled assumption. Run: python3 research/analysis/claims_math.py
"""
import math
from statistics import NormalDist, mean, median

N = NormalDist()

def h(title):
    print(f"\n=== {title} ===")

# ---------------------------------------------------------------- 1. Guarantee
h("1. Guarantee unit (Quartex, A.Team)")
for label, roi, beat in [("Quartex 'exceeded by 510%' read as 6.1x", 8.9, 6.1),
                         ("Quartex read as 5.1x", 8.9, 5.1),
                         ("A.Team '>700% of guarantee' (7x)", 7.0, 7.0)]:
    g_over_fee = roi / beat
    print(f"{label}: guarantee = {g_over_fee:.2f} x fee")
    # if guarantee were 20% of spend, savings as % of spend:
    print(f"   if guarantee were 20% of spend -> savings = {0.20*beat:.0%} of spend")
# fee as % of spend
print("OMR Standard: $30k fee on $250k-$1M spend ->",
      f"{30/1000:.1%} to {30/250:.1%}")
cs_fee = 5_000_000 / 34
print(f"ClearScore implied fee = ${cs_fee:,.0f}; vs $7.5M = {cs_fee/7.5e6:.1%}, vs $4.5M = {cs_fee/4.5e6:.1%}")
print(f"7x ROI at 20% savings implies fee = {0.20/7:.2%} of the savings base")
lo, hi = 1.0 * cs_fee/7.5e6, 1.75 * cs_fee/4.5e6
print(f"Guarantee as % of spend if 1.0-1.75x fee at ClearScore-like fee: {lo:.1%} to {hi:.1%}")

# ---------------------------------------------------------------- 2. Baseline
h("2. Savings vs first quote vs prior-year price")
print("uplift u | discount off quote d | change vs prior year")
for u in (0.08, 0.12, 0.15, 0.25):
    for d in (0.10, 0.20):
        print(f"  {u:>4.0%}  |  {d:>4.0%}  |  {(1+u)*(1-d)-1:+.1%}")
for u in (0.08, 0.12, 0.16):
    print(f"break-even 'saving' (flat vs prior) at uplift {u:.0%}: {u/(1+u):.1%}")

# ---------------------------------------------------------------- 3. Published averages
h("3. Published customer average savings vs a 20% floor")
avgs = {"Holidu":32,"intelliflo":30,"Le Collectionist":30,"ClearScore":29,"Factorial":26,
        "me&u":23,"GROW":19,"CloudHesive":17,"NewtonX":16,"FMG":15,"Global creative":14}
below = [k for k,v in avgs.items() if v < 20]
print(f"n={len(avgs)} mean={mean(avgs.values()):.1f}% median={median(avgs.values())}%"
      f" below 20%: {len(below)} ({len(below)/len(avgs):.0%}) -> {below}")
for renew_share in (0.5, 0.6, 0.8):
    print(f"23% per-contract saving x {renew_share:.0%} of spend renewing in-year ="
          f" {0.23*renew_share:.1%} of total annual spend")
print(f"ClearScore $5M on $7.5M stack = {5/7.5:.0%}; on $4.5M = {5/4.5:.0%}")

# ---------------------------------------------------------------- 4. Dataset
h("4a. Dataset ratios and throughput")
print(f"price points per vendor = {2_000_000/32_000:.1f}; contracts per vendor = {250_000/32_000:.1f};"
      f" price points per contract = {2_000_000/250_000:.0f}")
print(f"$75bn / 250k contracts = ${75e9/250e3:,.0f} avg; Vendr Q2-23: $240M/3,000 = ${240e6/3000:,.0f}")
vendr_yr = 3000*4
print(f"Vendr at peak disclosed rate: {vendr_yr:,}/yr; x7 yrs (2019-26, generous) = {vendr_yr*7:,}")
for v in (35_000, 70_000):
    print(f"  + Vertice {v:,} = {vendr_yr*7+v:,} vs 250,000 claimed (gap {250_000-vendr_yr*7-v:,})")
print(f"'thousands of live transactions daily' at 2,000/day = {2000*365:,}/yr"
      f" = {2000*365/250_000:.1f}x the whole 250k lifetime count")
print(f"Spend: $30bn (Vertice) + $15bn (Vendr max claim) = $45bn vs $75bn claimed")

h("4b. Long tail under a Zipf(s=1) assumption over 32,000 vendors, 250,000 contracts")
V, C = 32_000, 250_000
H = sum(1/r for r in range(1, V+1))
def contracts_at(r): return C/(r*H)
top100 = sum(1/r for r in range(1,101))/H
print(f"top-100 vendors hold {top100:.0%} of contracts")
for r in (1, 10, 100, 1000, 10_000, 16_000, 32_000):
    print(f"  vendor rank {r:>6,}: ~{contracts_at(r):,.1f} contracts")
for k in (30, 10, 5):
    r = math.floor(C/(k*H))
    print(f"vendors with >= {k} contracts: ~{r:,} ({r/V:.1%} of 32k)")

h("4c. Benchmark uncertainty from Vertice's own dispersion ratios")
# Assume the best/worst ratio spans the range of a lognormal sample of ~20 deals
# (expected range of 20 normal draws ~ 3.735 sigma).
for cat, ratio in (("overall",2.14),("AI",1.10),("CRM",3.01),("ERP",3.04)):
    sigma = math.log(ratio)/3.735
    row = ", ".join(f"n={n}: +/-{1.96*sigma/math.sqrt(n):.0%}" for n in (5, 8, 30, 86))
    print(f"{cat:7} ratio {ratio}: log-sigma {sigma:.3f} -> 95% CI on benchmark mean {row}")
# order statistics: CI for median with n=5 is (min,max)
print(f"n=5: P(min < true median < max) = {1-2*0.5**5:.1%}  (the 94% CI is the whole observed range)")

h("4d. Could '86 comparable Salesforce deals for 1,475-1,532 users' be real?")
band = math.log10(1532/1475)
frac = band/3          # seats ~log-uniform over 10..10,000 (3 decades) - assumption
americas = 0.6         # assumption
need = 86/(frac*americas)
print(f"band width = {band:.4f} decades -> {frac:.2%} of deals; x Americas {americas:.0%}"
      f" -> needs ~{need:,.0f} Salesforce deals = {need/250_000:.0%} of all 250k contracts")
for r in (1, 10, 100, 1000):
    print(f"  same filter at vendor rank {r:>5,} (~{contracts_at(r):,.0f} contracts): "
          f"~{contracts_at(r)*frac*americas:.1f} comparable deals")

h("4e. Staleness of un-indexed prices")
for infl in (0.08, 0.12):
    for yrs in (2, 5):
        print(f"  {infl:.0%} SaaS inflation, {yrs}-yr-old point understates today's price by {(1+infl)**yrs-1:.0%}")

h("4f. SaaS inflation series: 12.1% -> 16.4% in two months")
print(f"If a trailing-12-month index: the 2 new months must exceed the 2 dropped months by"
      f" {4.3*12/2:.1f} pts (i.e. ~{12.1+4.3*6:.0f}% uplifts) -> implausible; so it is a"
      " small single-month cohort")
for n in (50, 200, 1000):
    print(f"  single-month cohort, sigma 15pts, n={n}: 95% CI +/-{1.96*15/math.sqrt(n):.1f} pts")

h("4g. Unused-license arithmetic (65% = 14% + 51%)")
print(f"If 51% of licences sit in apps with <50% of seats used, unused licences in those apps alone"
      f" > {0.5*0.51:.1%} of all licences, already above the 14% 'fully unused' figure ->"
      " the two numbers are on different bases and cannot be added")

# ---------------------------------------------------------------- 5. SSO
h("5. SSO login signal vs session lifetime")
W = 28  # observation window (days), as in a 28-day 'active' metric
for L in (7, 14, 30, 60, 90):
    miss = max(0.0, 1 - W/L)
    print(f"  re-auth every {L:>2} days, {W}-day window: {miss:.0%} of genuinely daily users show NO login")
true_active, seats, hidden = 355, 500, 0.10
real = true_active/(1-hidden)
print(f"Demo-style right-size: {true_active} SSO-active of {seats}; if {hidden:.0%} of real users are on"
      f" persistent sessions, real active = {real:.0f}; cutting to 400 leaves {400-real:.0f} headroom, not 45")
print(f"Pricing mix: pure per-user {32.4}% of contracts; usage {36.5}% + hybrid {31.1}% = {36.5+31.1:.1f}%"
      " where seat logins do not explain cost")
for retention in (7, 30):
    print(f"  Entra sign-in retention {retention}d: on connection day, max look-back = {retention} days")

# ---------------------------------------------------------------- 6. AI / Ana
h("6a. Ana deal size vs long tail (Vertice's own tail stats)")
avg_ana = 500e6/4000
tail_rel = 0.19/0.634; nontail_rel = 0.81/0.366
print(f"Ana avg = ${avg_ana:,.0f}. Tail contract = {tail_rel:.2f}x avg contract,"
      f" non-tail = {nontail_rel:.2f}x, ratio {nontail_rel/tail_rel:.1f}x")
vendr_avg = 80_000
print(f"With Vendr's ${vendr_avg:,} avg transaction: tail ~ ${vendr_avg*tail_rel:,.0f}, non-tail ~"
      f" ${vendr_avg*nontail_rel:,.0f}; Ana avg is {avg_ana/(vendr_avg*tail_rel):.1f}x a tail deal")

h("6b. Monte Carlo 'win probability' with ~8 historical deals per vendor")
sigma_c, k, target = 0.10, 8, 0.15
se = sigma_c/math.sqrt(k)
for mu in (target-1.96*se, target, target+1.96*se):
    p = 1 - N.cdf((target-mu)/sigma_c)
    print(f"  mean concession {mu:.1%} -> P(reach {target:.0%}) = {p:.0%}")
print(f"  (95% CI on mean concession with k={k}, sigma={sigma_c:.0%}: +/-{1.96*se:.1%})")

h("6c. Consumption forecast width (Vertice: 37.6% monthly variance)")
cv = 0.376
print(f"90-day sum CV (independent months) = {cv/math.sqrt(3):.1%}; 95% band +/-{1.96*cv/math.sqrt(3):.0%}")

# ---------------------------------------------------------------- 7. Platform
h("7a. Contract extraction error compounding")
for p in (0.98, 0.95, 0.90):
    for fields in (3, 5):
        ok = p**fields
        print(f"  field accuracy {p:.0%}, {fields} fields: all-correct {ok:.1%};"
              f" {100*(1-ok):.0f} of 100 contracts carry >=1 error")

h("7b. TPRM 'validated regularly' at 32,000 vendors")
for per_year, mins in ((1, 30), (4, 30), (4, 60)):
    hrs = 32_000*per_year*mins/60
    print(f"  {per_year} review(s)/yr x {mins} min: {hrs:,.0f} hrs = {hrs/1840:.0f} FTE")

h("7c. Two-way vs three-way match (punchout example)")
ordered, delivered, unit = 20, 15, 189.00
print(f"PO {ordered} monitors @${unit}, {delivered} delivered, invoice for {ordered}: 2-way passes,"
      f" overpayment ${(ordered-delivered)*unit:,.2f}; 3-way blocks it")

h("7d. AWS RI resale")
print("Upfront remaining value $10,000 -> AWS 12% fee $1,200; seller nets $8,800 (before discounting to sell)")

# ---------------------------------------------------------------- 8. Business
h("8. Business model")
rev = 27.0e6
for staff in (299, 400):
    print(f"  £27.0m / {staff} staff = £{rev/staff:,.0f} per employee")
for cust in (750, 1000):
    print(f"  £27.0m / {cust} customers = £{rev/cust:,.0f} per customer")
print(f"437% 3-yr CAGR: growth multiple {5.3737**3:.0f}x -> start ~£{rev/5.3737**3/1e6:.2f}m")
spend, fee = 500_000, 30_000
for renew in (0.6, 1.0):
    s = spend*renew*0.20
    print(f"  $500k stack, $30k fee, {renew:.0%} renews, 20% saving: ${s:,.0f} -> ROI {s/fee:.1f}x")
# Year-2 model
fee_rate = 0.20/7
print(f"Year 1: 20% saving / {fee_rate:.2%} fee = 7.0x")
for y2 in (0.05, 0.08):
    print(f"Year 2 (prices already reset, capped uplifts): {y2:.0%} vs quote -> {y2/fee_rate:.1f}x ROI")
