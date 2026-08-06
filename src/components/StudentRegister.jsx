import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus2,
  Mail,
  LockKeyhole,
  BedDouble,
  User,
  ShieldCheck,
  ArrowLeft,
  Compass,
  ShieldAlert,
} from "lucide-react";
import { API_BASE } from "../utils/api";
import { AppLogo } from "./Home";

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomno, setRoomNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("userRole");
      if (role === "student") navigate("/student-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!name || !email || !password || !roomno) {
      setFeedback("Please complete every field before continuing.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, roomno }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success redirect to student login tab
        navigate("/student-login");
      } else {
        setFeedback(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Failed to connect to the server. Please try again.");
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
                Student Portal Registration
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                Register your resident profile
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Linking your complaints directly to your room number ensures maintenance operations can find and resolve your concerns with minimal friction.
              </p>
            </div>

            {/* highlights */}
            <div className="space-y-3 max-w-sm pt-2">
              <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300">
                  <BedDouble className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Room Binding</div>
                  <div className="text-xs text-slate-400 mt-0.5">Your tickets are tied to your physical room for accurate routing.</div>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Secure Records</div>
                  <div className="text-xs text-slate-400 mt-0.5">Full historical log of all complaints, resolutions, and notes.</div>
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

        {/* Right Side: Registration Form Panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#05050f]/75">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold text-white tracking-tight">
                  Sign Up
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Create a new resident student account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
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

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    autoComplete="name"
                    className="w-full pl-12 pr-4 py-3 text-sm glass-input placeholder:text-slate-600"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

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
                    placeholder="student@college.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Room No
                  </label>
                  <div className="relative flex items-center">
                    <BedDouble className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={roomno}
                      onChange={(e) => setRoomNo(e.target.value)}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 text-sm glass-input placeholder:text-slate-600"
                      placeholder="e.g. 302"
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
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      autoComplete="new-password"
                      className="w-full pl-12 pr-4 py-3 text-sm glass-input placeholder:text-slate-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-2xl btn-primary flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <UserPlus2 className="h-4.5 w-4.5" />
                {loading ? "Creating Profile..." : "Create Account"}
              </button>
            </form>

            {/* Bottom Actions */}
            <div className="text-center text-sm text-slate-400 pt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/student-login")}
                className="font-semibold text-indigo-400 hover:text-indigo-300 underline transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentRegister;
