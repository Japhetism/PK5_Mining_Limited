import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TrendingUp,
  Mail,
  Lock,
  EyeOff,
  Eye,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { AnimatedSection } from "@/app/components/animated-section";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";
import { WhyInvestCarousel } from "./components/why-invest-carousel";
import { useNavigate } from "react-router-dom";
import { EASE } from "@/app/constants";
import {
  investmentOpportunities,
  metrics,
  trustBadges,
} from "@/app/data/investor";
import { AnimatedCounter } from "./components/animated-counter";

export function Investors() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);

  const downloadReport = (doc?: string, fileName?: string) => {
    if (!doc) return;

    const link = document.createElement("a");
    link.href = doc;
    link.download = fileName ? `${fileName}.pdf` : "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToLogin = () => {
    usernameRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setTimeout(() => usernameRef.current?.focus(), 600);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter your credentials.");
      return;
    }
    setError("");

    setIsLoading(true);

    setTimeout(() => {
      setError(
        "The login credentials provided are invalid. Please contact the Investor Relations team or email investment@pk5miningltd.com for support and assistance.",
      );
      setIsLoading(false);
    }, 1000);

    // await new Promise((r) => setTimeout(r, 1800));
    // setIsLoading(false);
    // navigate("/investors/dashboard");
  };

  const inputBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
  };
  const iFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = "1px solid rgba(200,155,60,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,155,60,0.1)";
  };
  const iBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.14)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className="relative w-full pt-25">
      {/* ── Background ────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1664578867628-dae621194f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920"
          alt="PK5 Mining operations"
          className="w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute inset-0 bg-[#06050a]"
          style={{ opacity: 0.82 }}
        />
        <div className="absolute top-0 right-1/3 w-[500px] h-[320px] bg-[#C89B3C]/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* ══ 1. CAROUSEL — top, full section width ════════════ */}
        <AnimatedSection>
          <WhyInvestCarousel onLoginClick={scrollToLogin} />
        </AnimatedSection>

        {/* ── Separator ────────────────────────────────────────── */}
        <div
          className="mx-8 sm:mx-12 xl:mx-16 mt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        />

        {/* ══ 2. TWO COLUMNS — Get in Touch | Login ════════════ */}
        <div
          className="flex flex-col lg:flex-row"
          style={{ minHeight: "520px" }}
        >
          {/* LEFT: Get in Touch — text only, no form */}
          <div className="w-full lg:w-[55%] px-8 sm:px-12 xl:px-16 pt-10 pb-10 flex items-start justify-center">
            <AnimatedSection className="w-full max-w-md">
              <p className="text-sm uppercase tracking-[0.25em] text-[#C89B3C] font-bold mb-3">
                Get in Touch
              </p>
              <h3 className="text-4xl font-bold text-white leading-tight mb-3">
                Interested in investing
                <br />
                <span className="text-[#C89B3C]">with PK5 Mining?</span>
              </h3>
              <p className="text-base text-[#ccc] leading-relaxed mb-6">
                Our Investor Relations team is ready to guide you through
                available opportunities and answer your questions.
              </p>

              {/* Divider */}
              <div
                className="mb-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              />

              {/* Investment email CTA */}
              <p className="text-base text-[#ccc] leading-relaxed mb-4">
                Partner with us to shape the future of critical minerals. We
                welcome institutional and individual investors globally. Contact
                our team to explore long-term investment opportunities.
              </p>
              <a
                href="mailto:investment@pk5miningltd.com"
                className="inline-flex items-center gap-3 group"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#C89B3C]/22"
                  style={{
                    background: "rgba(200,155,60,0.12)",
                    border: "1px solid rgba(200,155,60,0.3)",
                  }}
                >
                  <Mail className="w-4 h-4 text-[#C89B3C]" />
                </span>
                <div>
                  <p className="text-xs text-[#888] mb-0.5">
                    Send us a mail at
                  </p>
                  <p className="text-sm font-semibold text-[#C89B3C] group-hover:text-[#E5C158] transition-colors">
                    investment@pk5miningltd.com
                  </p>
                </div>
              </a>
            </AnimatedSection>
          </div>

          {/* RIGHT: Login modal */}
          <div className="w-full lg:w-[45%] px-6 sm:px-10 lg:px-10 xl:px-12 pt-10 pb-10 flex flex-col items-center lg:items-start">
            <AnimatedSection
              delay={0.1}
              className="w-full flex flex-col items-center lg:items-start"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="w-full max-w-[420px]"
                style={{
                  background: "rgba(10,10,10,0.72)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.11)",
                  borderRadius: "22px",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div className="px-8 pt-8 pb-6">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(200,155,60,0.15)",
                        border: "1px solid rgba(200,155,60,0.3)",
                      }}
                    >
                      <Lock className="w-5 h-5 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#C89B3C] font-semibold">
                        Secure Access
                      </p>
                      <p className="text-xs text-[#888]">
                        PK5 Mining Investor Portal
                      </p>
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="mb-5">
                    <h1 className="text-2xl font-bold text-white mb-1.5">
                      Investor Login
                    </h1>
                    <div className="w-10 h-0.5 bg-gradient-to-r from-[#C89B3C] to-transparent mb-2.5" />
                    <p className="text-xs text-[#888] leading-relaxed">
                      Access confidential reports, financial metrics, and
                      project updates.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLogin} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#999] uppercase tracking-widest mb-1.5">
                        Username
                      </label>
                      <input
                        ref={usernameRef}
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-[#444] outline-none transition-all duration-200"
                        style={inputBase}
                        onFocus={iFocus}
                        onBlur={iBlur}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#999] uppercase tracking-widest mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 pr-11 rounded-xl text-white text-sm placeholder-[#444] outline-none transition-all duration-200"
                          style={inputBase}
                          onFocus={iFocus}
                          onBlur={iBlur}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#C89B3C] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div
                          onClick={() => setRememberMe(!rememberMe)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 cursor-pointer flex-shrink-0 ${rememberMe ? "bg-[#C89B3C] border-[#C89B3C]" : "border-[#444] group-hover:border-[#C89B3C]/50"}`}
                        >
                          {rememberMe && (
                            <CheckCircle className="w-3 h-3 text-black" />
                          )}
                        </div>
                        <span className="text-xs text-[#888]">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-xs text-[#C89B3C] hover:text-[#E5C158] transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-red-400 rounded-xl px-3 py-2"
                          style={{
                            background: "rgba(248,113,113,0.1)",
                            border: "1px solid rgba(248,113,113,0.22)",
                          }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C158] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C89B3C]/25 hover:shadow-[#C89B3C]/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Authenticating…
                        </>
                      ) : (
                        <>
                          Access Investor Portal
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="mt-4 flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#666]" />
                    <span className="text-xs text-[#888]">Not registered?</span>
                    <button className="text-xs text-[#C89B3C] hover:text-[#E5C158] transition-colors font-semibold">
                      Contact Investor Relations
                    </button>
                  </div>
                </div>

                {/* Security strip */}
                <div
                  className="px-8 py-3.5 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {["256-bit SSL", "MFA Ready", "Audit Logged"].map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-1.5 text-xs text-[#666]"
                    >
                      <Shield className="w-3 h-3 text-[#C89B3C]/55" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-4 max-w-[420px] text-xs text-[#888] text-center leading-relaxed px-2"
              >
                <Lock className="w-3 h-3 inline mr-1 text-[#C89B3C]/40" />
                Restricted to authorized investors. Sessions are monitored and
                logged.
              </motion.p>
            </AnimatedSection>
          </div>
        </div>

        {/* ── Separator ────────────────────────────────────────── */}
        <div
          className="mx-8 sm:mx-12 xl:mx-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        />

        {/* ══ 3. FULL-WIDTH: Why Invest + cards ════════════════ */}
        <div className="px-8 sm:px-12 xl:px-16 py-10 flex flex-col gap-8">
          {/* Section heading */}
          <AnimatedSection>
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C89B3C]/40 bg-[#C89B3C]/10 text-[#C89B3C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
                <TrendingUp className="w-3.5 h-3.5" /> Investment Opportunity
              </span>
              <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
                Why Invest in <span className="text-[#C89B3C]">PK5 Mining</span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Metrics */}
          <AnimatedSection delay={0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C89B3C] font-bold mb-4">
                Company at a Glance
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="p-4 rounded-xl text-center"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="text-[#C89B3C] text-2xl font-bold leading-none mb-1.5">
                      <AnimatedCounter target={m.value} suffix={m.suffix} />
                    </div>
                    <div className="text-[#bbb] text-xs leading-snug font-medium">
                      {m.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Investment Opportunities */}
          <AnimatedSection delay={0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C89B3C] font-bold mb-4">
                Investment Opportunities
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {investmentOpportunities.map((opp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="p-4 rounded-xl group cursor-pointer hover:border-[#C89B3C]/40 transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#C89B3C]/25 transition-colors"
                      style={{
                        background: "rgba(200,155,60,0.15)",
                        border: "1px solid rgba(200,155,60,0.3)",
                      }}
                    >
                      <opp.icon className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {opp.label}
                    </h4>
                    <p className="text-xs text-[#aaa] leading-relaxed">
                      {opp.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Trust badges */}
          <AnimatedSection delay={0.1}>
            <div
              className="flex flex-wrap gap-2 pb-6"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "24px",
              }}
            >
              {trustBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-[#ccc] font-medium"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <b.icon className="w-3.5 h-3.5 text-[#C89B3C]" />
                  {b.label}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
