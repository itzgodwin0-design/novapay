import { useState, useEffect } from "react";

const TIERS = [
  { name: "Basic", deposit: 10000, daily: 1500, monthly: 45000, color: "#6366f1", usd: 6, btc: "0.00009" },
  { name: "Level 1", deposit: 50000, daily: 8000, monthly: 240000, color: "#8b5cf6", usd: 31, btc: "0.00045" },
  { name: "Level 2", deposit: 100000, daily: 16000, monthly: 480000, color: "#a855f7", usd: 62, btc: "0.0009" },
  { name: "Level 3", deposit: 200000, daily: 32000, monthly: 960000, color: "#d946ef", usd: 124, btc: "0.0018" },
  { name: "Level 4", deposit: 400000, daily: 64000, monthly: 1920000, color: "#ec4899", usd: 248, btc: "0.0036" },
  { name: "VIP 1", deposit: 800000, daily: 128000, monthly: 3840000, color: "#f59e0b", usd: 496, btc: "0.0072", vip: true },
  { name: "VIP 2", deposit: 1600000, daily: 256000, monthly: 7680000, color: "#f97316", usd: 992, btc: "0.0144", vip: true },
  { name: "VIP 3", deposit: 3200000, daily: 512000, monthly: 15360000, color: "#ef4444", usd: 1984, btc: "0.0288", vip: true },
];

const PAYMENT_METHODS = [
  { id: "bank", name: "Nigerian Bank Transfer", icon: "🏦", desc: "All Nigerian Banks" },
  { id: "opay", name: "OPay / PalmPay", icon: "📱", desc: "Instant transfer" },
  { id: "btc", name: "Bitcoin (BTC)", icon: "₿", desc: "Crypto payment" },
  { id: "usdt", name: "USDT (TRC20/ERC20)", icon: "💲", desc: "Stablecoin" },
  { id: "eth", name: "Ethereum (ETH)", icon: "Ξ", desc: "Crypto payment" },
  { id: "paypal", name: "PayPal", icon: "🅿", desc: "International" },
  { id: "cashapp", name: "Cash App", icon: "💸", desc: "USD payments" },
];

const fmt = (n) => "₦" + Number(n).toLocaleString();

const VIDEOS = [
  { id: 1, title: "Introduction to Global Finance", duration: "5:32", reward: 250, thumb: "📊" },
  { id: 2, title: "How to Maximize Your Earnings", duration: "4:15", reward: 250, thumb: "💹" },
  { id: 3, title: "NovaPay Investment Guide", duration: "6:48", reward: 250, thumb: "📈" },
  { id: 4, title: "Crypto Basics for Beginners", duration: "7:20", reward: 250, thumb: "₿" },
  { id: 5, title: "Building Wealth Through Referrals", duration: "3:55", reward: 250, thumb: "🤝" },
];

const S = {
  app: { minHeight: "100vh", background: "#050818", color: "#e2e8f0", fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 14 },
  nav: {
    background: "rgba(10,14,40,0.95)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(99,102,241,0.2)", padding: "0 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: 64, position: "sticky", top: 0, zIndex: 100,
  },
  logo: { fontSize: 22, fontWeight: 900, background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 },
  btn: (bg = "#6366f1") => ({
    background: bg, color: "#fff", border: "none", borderRadius: 12,
    padding: "12px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14,
    transition: "all .2s", width: "100%",
  }),
  input: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0", borderRadius: 12, padding: "14px 16px", fontSize: 14,
    width: "100%", outline: "none", boxSizing: "border-box",
  },
  tab: (a) => ({
    padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 600,
    background: a ? "linear-gradient(135deg,#6366f1,#a855f7)" : "transparent",
    color: a ? "#fff" : "rgba(255,255,255,0.4)", border: "none", fontSize: 13,
    transition: "all .2s",
  }),
  badge: (c) => ({
    background: c + "22", color: c, border: `1px solid ${c}44`,
    borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700,
  }),
};

// ── Auth Screen ────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", ref: "" });
  const [error, setError] = useState("");

  const handle = () => {
    if (!form.email || !form.password) { setError("Please fill all required fields."); return; }
    if (mode === "register" && !form.name) { setError("Please enter your full name."); return; }
    onAuth({ name: form.name || "User", email: form.email, phone: form.phone, ref: form.ref, balance: 0, tier: null, videos: [], earnings: 0, referrals: 0 });
  };

  return (
    <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 20 }}>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 20% 50%,rgba(99,102,241,0.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(168,85,247,0.1) 0%,transparent 50%)", pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>◈</div>
          <div style={{ ...S.logo, fontSize: 32, WebkitTextFillColor: "transparent" }}>NovaPay</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4 }}>Global Earning Platform</div>
        </div>

        <div style={{ ...S.card, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {["login", "register"].map(m => (
              <button key={m} style={{ ...S.tab(mode === m), flex: 1, borderRadius: 10 }} onClick={() => { setMode(m); setError(""); }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {error && <div style={{ background: "#ef444422", border: "1px solid #ef444444", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#ef4444", fontSize: 13 }}>{error}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && (
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600 }}>FULL NAME</div>
                <input style={S.input} placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600 }}>EMAIL ADDRESS</div>
              <input style={S.input} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            {mode === "register" && (
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600 }}>PHONE NUMBER</div>
                <input style={S.input} placeholder="+234 800 000 0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            )}
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600 }}>PASSWORD</div>
              <input style={S.input} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {mode === "register" && (
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600 }}>REFERRAL CODE (optional)</div>
                <input style={S.input} placeholder="Enter referral code" value={form.ref} onChange={e => setForm({ ...form, ref: e.target.value })} />
              </div>
            )}
            <button style={{ ...S.btn(), background: "linear-gradient(135deg,#6366f1,#a855f7)", marginTop: 8, padding: "16px", fontSize: 16 }} onClick={handle}>
              {mode === "login" ? "Sign In to NovaPay" : "Create My Account"}
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 20, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
            🔒 256-bit SSL Encrypted · Secured by NovaPay Global
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: "rgba(255,255,255,0.2)", fontSize: 11 }}>
          © 2025 NovaPay International Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [depositTier, setDepositTier] = useState(null);
  const [depositMethod, setDepositMethod] = useState(null);
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState(null);
  const [toast, setToast] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [reinvest, setReinvest] = useState(false);

  const showToast = (msg, color = "#22c55e") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const watchVideo = (v) => {
    if (watchedVideos.includes(v.id)) { showToast("Already watched today!", "#f59e0b"); return; }
    setWatchedVideos(w => [...w, v.id]);
    setUser(u => ({ ...u, balance: u.balance + 250, earnings: u.earnings + 250 }));
    showToast(`+₦250 earned from watching "${v.title}"! 🎉`);
  };

  const requestWithdraw = () => {
    if (!withdrawMethod) { showToast("Select a withdrawal method", "#ef4444"); return; }
    if (!withdrawAmt || isNaN(withdrawAmt)) { showToast("Enter a valid amount", "#ef4444"); return; }
    if (Number(withdrawAmt) > user.balance) { showToast("Insufficient balance", "#ef4444"); return; }
    if (Number(withdrawAmt) < 1000) { showToast("Minimum withdrawal is ₦1,000", "#ef4444"); return; }
    setUser(u => ({ ...u, balance: u.balance - Number(withdrawAmt) }));
    setWithdrawAmt("");
    showToast("Withdrawal request submitted! Processing in 24hrs ✅");
  };

  const activateTier = (tier) => {
    setUser(u => ({ ...u, tier, balance: u.balance + tier.daily }));
    showToast(`🎉 ${tier.name} activated! You earn ${fmt(tier.daily)}/day`);
    setDepositTier(null);
    setDepositMethod(null);
    setTab("home");
  };

  if (!user) return <AuthScreen onAuth={setUser} />;

  const refCode = "NP" + user.email.slice(0, 4).toUpperCase() + "2025";
  const refLink = `https://novapay.vercel.app/ref=${refCode}`;

  return (
    <div style={S.app}>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 10% 20%,rgba(99,102,241,0.08) 0%,transparent 50%),radial-gradient(ellipse at 90% 80%,rgba(168,85,247,0.06) 0%,transparent 50%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: toast.color, color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, zIndex: 999, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>
          {toast.msg}
        </div>
      )}

      {/* Nav */}
      <nav style={S.nav}>
        <div style={S.logo}>◈ NovaPay</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["home", "plans", "videos", "referral", "withdraw"].map(t => (
            <button key={t} style={{ ...S.tab(tab === t), fontSize: 12, padding: "6px 10px" }} onClick={() => setTab(t)}>
              {t === "home" ? "🏠" : t === "plans" ? "📊" : t === "videos" ? "🎬" : t === "referral" ? "🔗" : "💸"}
            </button>
          ))}
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Hi, {user.name.split(" ")[0]}</div>
      </nav>

      <div style={{ padding: "20px", maxWidth: 500, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── HOME ── */}
        {tab === "home" && (
          <>
            {/* Balance card */}
            <div style={{ background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)", borderRadius: 24, padding: 28, marginBottom: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Total Balance</div>
              <div style={{ fontSize: 36, fontWeight: 900, margin: "8px 0" }}>{fmt(user.balance)}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>≈ ${(user.balance / 1600).toFixed(2)} USD</div>
              {user.tier && (
                <div style={{ marginTop: 16, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", display: "inline-block" }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>✅ {user.tier.name} Active · {fmt(user.tier.daily)}/day</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                ["Total Earned", fmt(user.earnings + user.balance), "💰"],
                ["Daily Income", user.tier ? fmt(user.tier.daily) : "₦0", "📈"],
                ["Videos Watched", watchedVideos.length, "🎬"],
                ["Referrals", user.referrals, "👥"],
              ].map(([label, val, icon]) => (
                <div key={label} style={{ ...S.card, textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <button style={{ ...S.btn("linear-gradient(135deg,#6366f1,#a855f7)"), borderRadius: 16, padding: "16px" }} onClick={() => setTab("plans")}>
                📊 Invest Now
              </button>
              <button style={{ ...S.btn("rgba(255,255,255,0.05)"), border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "16px" }} onClick={() => setTab("withdraw")}>
                💸 Withdraw
              </button>
            </div>

            {/* Announcement */}
            <div style={{ ...S.card, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, marginBottom: 8 }}>📢 ANNOUNCEMENT</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                🎉 Welcome to NovaPay! Earn daily income by investing in our plans. Watch videos for bonus rewards. Refer friends and earn 10% of their deposit instantly!
              </div>
            </div>

            {/* Reinvest toggle */}
            {user.tier && (
              <div style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Auto Reinvest</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Compound your daily earnings</div>
                </div>
                <div onClick={() => setReinvest(r => !r)} style={{ width: 48, height: 26, borderRadius: 13, background: reinvest ? "#6366f1" : "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative", transition: "all .3s" }}>
                  <div style={{ position: "absolute", top: 3, left: reinvest ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "all .3s" }} />
                </div>
              </div>
            )}
          </>
        )}

        {/* ── PLANS ── */}
        {tab === "plans" && !depositTier && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Investment Plans</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 20 }}>Choose a plan and start earning daily</div>
            {TIERS.map(tier => (
              <div key={tier.name} style={{ ...S.card, marginBottom: 14, border: `1px solid ${tier.color}44`, position: "relative", overflow: "hidden" }}>
                {tier.vip && <div style={{ position: "absolute", top: 12, right: 12, ...S.badge("#f59e0b") }}>👑 VIP</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: tier.color + "22", border: `1px solid ${tier.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                    {tier.vip ? "👑" : "📊"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{tier.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>≈ ${tier.usd} USD · {tier.btc} BTC</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[["Deposit", fmt(tier.deposit)], ["Daily", fmt(tier.daily)], ["Monthly", fmt(tier.monthly)]].map(([l, v]) => (
                    <div key={l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: tier.color }}>{v}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <button style={{ ...S.btn(tier.color), borderRadius: 12 }} onClick={() => setDepositTier(tier)}>
                  Activate {tier.name} Plan
                </button>
              </div>
            ))}
          </>
        )}

        {/* ── DEPOSIT FLOW ── */}
        {tab === "plans" && depositTier && !depositMethod && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <button onClick={() => setDepositTier(null)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 10, padding: "8px 14px", cursor: "pointer" }}>← Back</button>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Choose Payment Method</div>
            </div>
            <div style={{ ...S.card, background: `${depositTier.color}11`, border: `1px solid ${depositTier.color}44`, marginBottom: 20 }}>
              <div style={{ fontWeight: 700 }}>{depositTier.name} Plan</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: depositTier.color, margin: "8px 0" }}>{fmt(depositTier.deposit)}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Daily income: {fmt(depositTier.daily)} · Monthly: {fmt(depositTier.monthly)}</div>
            </div>
            {PAYMENT_METHODS.map(pm => (
              <div key={pm.id} onClick={() => setDepositMethod(pm)} style={{ ...S.card, marginBottom: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all .2s", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 28 }}>{pm.icon}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{pm.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{pm.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)" }}>›</div>
              </div>
            ))}
          </>
        )}

        {/* ── PAYMENT DETAILS ── */}
        {tab === "plans" && depositTier && depositMethod && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <button onClick={() => setDepositMethod(null)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 10, padding: "8px 14px", cursor: "pointer" }}>← Back</button>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Payment Details</div>
            </div>
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Amount to Pay</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#6366f1" }}>{fmt(depositTier.deposit)}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>≈ ${depositTier.usd} USD · {depositTier.btc} BTC</div>
            </div>
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 16 }}>{depositMethod.icon} {depositMethod.name} Details</div>
              {depositMethod.id === "bank" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["Bank Name", "Access Bank PLC"], ["Account Name", "NovaPay International Ltd"], ["Account Number", "0123456789"], ["Reference", refCode]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{l}</span>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              {depositMethod.id === "opay" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["OPay Number", "08012345678"], ["PalmPay Number", "08012345678"], ["Account Name", "NovaPay Ltd"], ["Reference", refCode]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{l}</span>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              {(depositMethod.id === "btc" || depositMethod.id === "eth" || depositMethod.id === "usdt") && (
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                    {depositMethod.id === "btc" ? "Bitcoin" : depositMethod.id === "eth" ? "Ethereum" : "USDT TRC20"} Address:
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 14, wordBreak: "break-all", fontSize: 12, fontFamily: "monospace", color: "#a855f7" }}>
                    {depositMethod.id === "btc" ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" : depositMethod.id === "eth" ? "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" : "TQn9Y2khDD95J7BK5TJBGqZMuGj6x9V1z"}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Amount: {depositTier.btc} {depositMethod.id.toUpperCase()}</div>
                </div>
              )}
              {(depositMethod.id === "paypal" || depositMethod.id === "cashapp") && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    [depositMethod.id === "paypal" ? "PayPal Email" : "Cash App Tag", depositMethod.id === "paypal" ? "payments@novapay.io" : "$NovaPay"],
                    ["Amount (USD)", `$${depositTier.usd}`],
                    ["Reference", refCode]
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{l}</span>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ ...S.card, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>⚠️ IMPORTANT</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                After payment, send your receipt/proof to our support team. Your account will be activated within 30 minutes.
              </div>
            </div>
            <button style={{ ...S.btn("linear-gradient(135deg,#6366f1,#a855f7)"), borderRadius: 14, padding: "16px", fontSize: 15 }} onClick={() => activateTier(depositTier)}>
              ✅ I Have Made Payment
            </button>
          </>
        )}

        {/* ── VIDEOS ── */}
        {tab === "videos" && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Watch & Earn</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 20 }}>Earn ₦250 for each video you watch</div>
            <div style={{ ...S.card, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Videos Watched Today</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#6366f1" }}>{watchedVideos.length}/{VIDEOS.length}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Video Earnings</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#22c55e" }}>{fmt(watchedVideos.length * 250)}</div>
              </div>
            </div>
            {VIDEOS.map(v => (
              <div key={v.id} style={{ ...S.card, marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {v.thumb}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{v.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>⏱ {v.duration} · +₦{v.reward}</div>
                </div>
                <button onClick={() => watchVideo(v)} style={{ ...S.btn(watchedVideos.includes(v.id) ? "rgba(255,255,255,0.05)" : "#6366f1"), width: "auto", padding: "8px 14px", fontSize: 12, borderRadius: 10, border: watchedVideos.includes(v.id) ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  {watchedVideos.includes(v.id) ? "✅ Done" : "▶ Watch"}
                </button>
              </div>
            ))}
          </>
        )}

        {/* ── REFERRAL ── */}
        {tab === "referral" && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Refer & Earn</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 20 }}>Earn 10% of every friend's deposit</div>
            <div style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", borderRadius: 20, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>Your Referral Code</div>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4 }}>{refCode}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 8, wordBreak: "break-all" }}>{refLink}</div>
              <button onClick={() => { navigator.clipboard?.writeText(refLink); showToast("Referral link copied! 🔗"); }} style={{ ...S.btn("rgba(255,255,255,0.2)"), marginTop: 16, borderRadius: 10 }}>
                📋 Copy Referral Link
              </button>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Referral Bonuses</div>
            {TIERS.map(tier => (
              <div key={tier.name} style={{ ...S.card, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{tier.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Friend deposits {fmt(tier.deposit)}</div>
                </div>
                <div style={{ ...S.badge(tier.color), fontSize: 13 }}>+{fmt(tier.deposit * 0.1)}</div>
              </div>
            ))}
            <div style={{ ...S.card, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", marginTop: 8 }}>
              <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, marginBottom: 4 }}>💡 HOW IT WORKS</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                1. Share your referral link with friends<br />
                2. They register and make a deposit<br />
                3. You instantly earn 10% of their deposit<br />
                4. No limit on how many people you refer!
              </div>
            </div>
          </>
        )}

        {/* ── WITHDRAW ── */}
        {tab === "withdraw" && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Withdraw Funds</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 20 }}>Minimum withdrawal: ₦1,000</div>
            <div style={{ ...S.card, background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(168,85,247,0.2))", border: "1px solid rgba(99,102,241,0.3)", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Available Balance</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#a855f7", margin: "6px 0" }}>{fmt(user.balance)}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>≈ ${(user.balance / 1600).toFixed(2)} USD</div>
            </div>
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 600 }}>WITHDRAWAL AMOUNT (₦)</div>
              <input style={S.input} type="number" placeholder="Enter amount e.g. 5000" value={withdrawAmt} onChange={e => setWithdrawAmt(e.target.value)} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Select Withdrawal Method</div>
            {PAYMENT_METHODS.map(pm => (
              <div key={pm.id} onClick={() => setWithdrawMethod(pm)} style={{ ...S.card, marginBottom: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, border: withdrawMethod?.id === pm.id ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)", background: withdrawMethod?.id === pm.id ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)" }}>
                <div style={{ fontSize: 24 }}>{pm.icon}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{pm.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{pm.desc}</div>
                </div>
                {withdrawMethod?.id === pm.id && <div style={{ marginLeft: "auto", color: "#6366f1", fontWeight: 900 }}>✓</div>}
              </div>
            ))}
            <button style={{ ...S.btn("linear-gradient(135deg,#6366f1,#a855f7)"), borderRadius: 14, padding: "16px", fontSize: 15, marginTop: 8 }} onClick={requestWithdraw}>
              💸 Request Withdrawal
            </button>
            <div style={{ ...S.card, background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)", marginTop: 16 }}>
              <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>⏱ PROCESSING TIME</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Bank transfers: 24-48 hours<br />
                Crypto: 1-3 hours<br />
                PayPal/Cash App: 24 hours
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(5,8,24,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 0", display: "flex", justifyContent: "space-around", zIndex: 100 }}>
        {[["home","🏠","Home"],["plans","📊","Plans"],["videos","🎬","Videos"],["referral","🔗","Refer"],["withdraw","💸","Withdraw"]].map(([t,icon,label]) => (
          <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: tab === t ? "#a855f7" : "rgba(255,255,255,0.3)", transition: "all .2s" }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: tab === t ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
      <div style={{ height: 80 }} />
    </div>
  );
}
