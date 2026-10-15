buckets=["A_IPO","B_Strat>=500","C1_250-500","C2_<250pref","D_PE","E_Private","F_Shut/fire"]
# 10-yr analyst priors (midpoints) -> 5-yr realization shares
prior10={"IPO":4.5,"StratGood":20,"PE":7.5,"BelowPref":20,"Shut":20}
prior10["Private"]=100-sum(prior10.values())
real={"IPO":0.33,"StratGood":0.6,"PE":0.6,"BelowPref":0.6,"Shut":0.6}
p5={k:prior10[k]*real[k] for k in real}
print("10yr",prior10); print("5yr raw",p5, sum(p5.values()))
base={
 "A_IPO":p5["IPO"],
 "B_Strat>=500":p5["StratGood"]*0.5,
 "C1_250-500":p5["StratGood"]*0.5,
 "C2_<250pref":p5["BelowPref"]*0.5,
 "D_PE":p5["PE"],
 "F_Shut/fire":p5["BelowPref"]*0.5+p5["Shut"],
}
base["E_Private"]=100-sum(base.values())
print("base5",{k:round(v,1) for k,v in base.items()})
def C(m): return {"C1_250-500":m,"C2_<250pref":m}
scen={
"base":[
 ("Founders' 2 strategic exits",{"B_Strat>=500":1.3,**C(1.3),"F_Shut/fire":0.8}),
 ("Growth evidence (Sifted #1, 13x)",{"A_IPO":1.5,"B_Strat>=500":1.4,"F_Shut/fire":0.7}),
 ("Consolidator post-Vendr",{"B_Strat>=500":1.3,**C(1.1),"F_Shut/fire":1.1}),
 ("Capital vs peers / no 2026 round",{"A_IPO":0.7,"F_Shut/fire":1.15}),
 ("Ramp/Zip/Coupa pressure",{"A_IPO":0.6,"B_Strat>=500":0.8,"F_Shut/fire":1.2}),
 ("2026 multiple compression",{"A_IPO":0.6,"B_Strat>=500":0.7,**C(1.2),"D_PE":1.2}),
 ("UK/Europe exit environment",{"A_IPO":0.8,"B_Strat>=500":0.9}),
 ("Active category M&A",{"B_Strat>=500":1.2,**C(1.3),"D_PE":1.1,"E_Private":0.85}),
],
"low":[
 ("Founders' 2 strategic exits",{"B_Strat>=500":1.2,**C(1.2),"F_Shut/fire":0.9}),
 ("Growth evidence (Sifted #1, 13x)",{"A_IPO":1.0,"B_Strat>=500":1.15,"F_Shut/fire":0.9}),
 ("Consolidator post-Vendr",{"B_Strat>=500":1.1,**C(1.1),"F_Shut/fire":1.25}),
 ("Capital vs peers / no 2026 round",{"A_IPO":0.6,"F_Shut/fire":1.3}),
 ("Ramp/Zip/Coupa pressure",{"A_IPO":0.5,"B_Strat>=500":0.65,"F_Shut/fire":1.4}),
 ("2026 multiple compression",{"A_IPO":0.5,"B_Strat>=500":0.6,**C(1.2),"D_PE":1.2}),
 ("UK/Europe exit environment",{"A_IPO":0.7,"B_Strat>=500":0.85}),
 ("Active category M&A",{"B_Strat>=500":1.1,**C(1.2),"D_PE":1.1,"E_Private":0.9}),
],
"high":[
 ("Founders' 2 strategic exits",{"B_Strat>=500":1.4,**C(1.3),"F_Shut/fire":0.7}),
 ("Growth evidence (Sifted #1, 13x)",{"A_IPO":2.0,"B_Strat>=500":1.6,"F_Shut/fire":0.6}),
 ("Consolidator post-Vendr",{"B_Strat>=500":1.5,**C(1.1),"F_Shut/fire":1.0}),
 ("Capital vs peers / no 2026 round",{"A_IPO":0.8,"F_Shut/fire":1.05}),
 ("Ramp/Zip/Coupa pressure",{"A_IPO":0.8,"B_Strat>=500":0.9,"F_Shut/fire":1.1}),
 ("2026 multiple compression",{"A_IPO":0.9,"B_Strat>=500":0.9,**C(1.1),"D_PE":1.1}),
 ("UK/Europe exit environment",{"A_IPO":0.9,"B_Strat>=500":1.0}),
 ("Active category M&A",{"B_Strat>=500":1.3,**C(1.3),"D_PE":1.1,"E_Private":0.8}),
]}
res={}
for s,fs in scen.items():
    mult={b:1.0 for b in buckets}
    for name,f in fs:
        for b,m in f.items(): mult[b]*=m
    raw={b:base[b]*mult[b] for b in buckets}
    tot=sum(raw.values())
    norm={b:100*raw[b]/tot for b in buckets}
    res[s]=norm
    print("\n==",s,"tot raw",round(tot,2))
    for b in buckets: print(f"{b:14s} base {base[b]:5.2f} mult {mult[b]:5.3f} raw {raw[b]:6.2f} norm {norm[b]:5.1f}")
    succ=norm["A_IPO"]+norm["B_Strat>=500"]+norm["D_PE"]+norm["C1_250-500"]
    strict=norm["A_IPO"]+norm["B_Strat>=500"]+0.5*norm["D_PE"]
    anyexit=100-norm["E_Private"]
    print("success",round(succ,1),"strict",round(strict,1),"any liquidity event",round(anyexit,1), "conditional success|exit", round(100*succ/anyexit,1))
