import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  LockKeyhole,
  LogIn,
  Eye,
  EyeOff,
  ShieldAlert,
  GraduationCap,
  Users,
  Compass,
} from "lucide-react";
import { API_BASE } from "../utils/api";

// Sleek Custom SVG Logo (Interlocking building shape with custom gradients)
export function AppLogo() {
  return (
    <svg className="h-9 w-9 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 3L3 13V27C3 28.1 3.9 29 5 29H13V19H19V29H27C28.1 29 29 28.1 29 27V13L16 3Z"
        fill="url(#logo-grad-grad)"
        stroke="url(#logo-border-grad-grad)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M11 15C11 15 13 13 16 13C19 13 21 15 21 15" stroke="url(#logo-arc-grad-grad)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="13" r="1.5" fill="#a78bfa" className="animate-pulse" />
      <defs>
        <linearGradient id="logo-grad-grad" x1="16" y1="3" x2="16" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" stopOpacity="0.25" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="logo-border-grad-grad" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="logo-arc-grad-grad" x1="11" y1="13" x2="21" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Home({ defaultTab = "student" }) {
  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();



  // Sync tab state if defaultTab prop changes
  useEffect(() => {
    setTab(defaultTab);
    setFeedback("");
    setEmail("");
    setPassword("");
  }, [defaultTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!email || !password) {
      setFeedback("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = tab === "student" ? "/api/auth/login/student" : "/api/auth/login/admin";
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", tab);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        
        if (tab === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      } else {
        setFeedback(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Failed to connect to the server. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1100px] grid lg:grid-cols-[1.1fr_1fr] rounded-[2.5rem] overflow-hidden glass-panel">
        
        {/* Left Side: Brand Panel */}
        <div className="relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950/60 to-slate-950/90 border-r border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05),transparent_40%)]" />
          
          {/* Custom Logo */}
          <div className="relative flex items-center gap-3">
            <AppLogo />
            <div>
              <span className="block font-display text-lg font-bold tracking-wide text-white">
                HostelFlow
              </span>
              <span className="block text-[10px] text-indigo-400 tracking-wider font-semibold">
                PORTAL CONSOLE
              </span>
            </div>
          </div>

          {/* Info Details */}
          <div className="relative my-12 space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300">
                Hostel Operations Hub
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                Seamless hostel operations starts here
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                A digital hub linking students and administrators. Submit issues, track status in real-time, and streamline residential maintenance.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-3 max-w-sm pt-2">
              <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/10 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Student Portal</div>
                  <div className="text-xs text-slate-400 mt-0.5">Quickly lodge complaints and track live resolution steps.</div>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/10 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Admin Dashboard</div>
                  <div className="text-xs text-slate-400 mt-0.5">Filter, delegate, and manage complaint tickets instantly.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="relative text-xs text-slate-500 flex items-center gap-2">
            <Compass className="h-4 w-4 text-slate-400" />
            Designed for colleges & resident students. Secure JWT sessions.
          </div>
        </div>

        {/* Right Side: Tabbed Login Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#05050f]/75">
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <h2 className="font-display text-3xl font-semibold text-white tracking-tight">
                Sign In
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Select your portal role to access your account workspace.
              </p>
            </div>

            {/* Custom Tab Switcher */}
            <div className="relative flex rounded-xl bg-slate-950/80 p-1 border border-white/5">
              <button
                type="button"
                onClick={() => { setTab("student"); setFeedback(""); }}
                className={`relative flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors z-10 ${
                  tab === "student" ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === "student" && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Student Portal
              </button>
              <button
                type="button"
                onClick={() => { setTab("admin"); setFeedback(""); }}
                className={`relative flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors z-10 ${
                  tab === "admin" ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === "admin" && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Admin Console
              </button>
            </div>

            {/* Feedback Alert */}
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                >
                  <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3 text-sm glass-input placeholder:text-slate-600"
                    placeholder={tab === "student" ? "student@college.edu" : "admin@hostel.com"}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative flex items-center">
                  <LockKeyhole className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-3 text-sm glass-input placeholder:text-slate-600"
                    placeholder="Enter account password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-2xl btn-primary flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn className="h-4.5 w-4.5" />
                {loading ? "Verifying credentials..." : tab === "student" ? "Access Student Dashboard" : "Enter Admin Dashboard"}
              </button>
            </form>

            {/* Bottom Actions */}
            {tab === "student" && (
              <div className="text-center text-sm text-slate-400 pt-2">
                Need an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/student-register")}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 underline transition-colors cursor-pointer"
                >
                  Register Profile
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
