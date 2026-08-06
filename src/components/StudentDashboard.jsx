import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
  MessageSquareText,
  Activity,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Navbar from "./Navbar";
import { API_BASE, getAuthHeaders } from "../utils/api";

const statusTimeline = [
  { step: "01", label: "Submitted", desc: "Complaint logged in the queue" },
  { step: "02", label: "Reviewed", desc: "Triage and verification" },
  { step: "03", label: "Assigned", desc: "Maintenance staff notified" },
  { step: "04", label: "In Progress", desc: "Work underway at site" },
  { step: "05", label: "Resolved", desc: "Issue closed and verified" },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch actual complaints to display live metrics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/complaints/my`, {
          headers: getAuthHeaders(),
        });
        if (response.ok) {
          const data = await response.json();
          setComplaints(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const userInfoStr = localStorage.getItem("userInfo");
  let userInfo = null;
  try {
    userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (error) {
    console.error("Error parsing userInfo", error);
  }

  const displayName = userInfo?.name || "Student";

  // Compute live metrics
  const metrics = useMemo(() => {
    const openCount = complaints.filter(
      (c) => c.status !== "Resolved" && c.status !== "Rejected"
    ).length;
    const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
    return {
      open: openCount,
      resolved: resolvedCount,
      total: complaints.length,
    };
  }, [complaints]);

  const actionCards = [
    {
      title: "Submit a complaint",
      description: "Lodge a new maintenance ticket with details, category, and optional photo attachment.",
      icon: MessageSquareText,
      action: "File Ticket",
      route: "/submitcomplaint",
      gradient: "from-indigo-500/20 to-indigo-500/5 hover:border-indigo-500/30",
      iconColor: "text-indigo-300",
    },
    {
      title: "Review my complaints",
      description: "Track the status of your existing requests and view admin notes or comments.",
      icon: ClipboardList,
      action: "View History",
      route: "/mycomplaint",
      gradient: "from-violet-500/20 to-violet-500/5 hover:border-violet-500/30",
      iconColor: "text-violet-300",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[2.5rem] p-6 sm:p-8 md:p-10 glass-panel relative overflow-hidden"
        >
          {/* Ambient light glow inside card */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                Student Workspace
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
                Welcome back, {displayName}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Check and manage all residential maintenance operations from a single dashboard. Lodge new requests, review updates, and view status history.
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 lg:w-[28rem]">
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 flex flex-col justify-between min-h-[100px]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Active</span>
                  <Clock className="h-4 w-4 text-amber-400" />
                </div>
                <div className="font-display text-3xl font-bold text-white mt-2">
                  {loading ? "..." : metrics.open}
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 flex flex-col justify-between min-h-[100px]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Resolved</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="font-display text-3xl font-bold text-white mt-2">
                  {loading ? "..." : metrics.resolved}
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 flex flex-col justify-between min-h-[100px]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Total</span>
                  <ClipboardList className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="font-display text-3xl font-bold text-white mt-2">
                  {loading ? "..." : metrics.total}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Core Quick Action Panels */}
        <section className="grid md:grid-cols-2 gap-6">
          {actionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 sm:p-8 rounded-[2rem] glass-panel bg-gradient-to-br ${card.gradient} border border-white/5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1`}
              >
                <div>
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-white tracking-tight">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(card.route)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white/5 border border-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/10 hover:text-indigo-300 transition-all cursor-pointer"
                  >
                    <span>{card.action}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Operational Flow and Instructions */}
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          
          {/* Status lifecycle timeline */}
          <div className="p-6 sm:p-8 rounded-[2rem] glass-panel space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Complaint Lifecycle</h3>
                <p className="text-xs text-slate-400 mt-0.5">Understand how your logged tickets are processed</p>
              </div>
              <Activity className="h-5 w-5 text-indigo-300" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {statusTimeline.map((item) => (
                <div key={item.step} className="flex gap-4 p-4 rounded-2xl bg-slate-900/40 border border-white/5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-400/10 text-indigo-300 font-display font-semibold text-sm ring-1 ring-indigo-400/15">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help Guidelines */}
          <div className="p-6 sm:p-8 rounded-[2rem] glass-panel space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Important Tips</h3>
                <p className="text-xs text-slate-400 mt-0.5">Quick guidelines for residents</p>
              </div>
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3.5">
                <div className="h-2 w-2 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Be specific in description</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Include precise locations inside the room or corridor so the maintenance tech knows exactly where to go.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3.5">
                <div className="h-2 w-2 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Upload image evidence</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Attaching a clear photo of broken equipment or leaks helps the team verify parts and resolve tickets much faster.</p>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
