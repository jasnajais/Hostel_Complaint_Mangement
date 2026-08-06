import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Inbox,
  LayoutDashboard,
  RefreshCw,
  Search,
  TimerReset,
  TrendingUp,
  Filter,
} from "lucide-react";
import Navbar from "./Navbar";
import { API_BASE, getAuthHeaders, getImageUrl } from "../utils/api";

const statusMeta = {
  Pending: { label: "Pending", className: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  Assigned: { label: "Assigned", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "In Progress": { label: "In Progress", className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  Resolved: { label: "Resolved", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  Rejected: { label: "Rejected", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const fetchComplaints = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/complaints`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/");
        return;
      }

      const data = await response.json();
      setComplaints(Array.isArray(data.complaints) ? data.complaints : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (error) {
      console.error(error);
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Calculate live totals
  const totals = useMemo(() => {
    const summary = { pending: 0, assigned: 0, inProgress: 0, resolved: 0, rejected: 0 };
    complaints.forEach((complaint) => {
      const status = complaint.status || "Pending";
      if (status === "Pending") summary.pending += 1;
      if (status === "Assigned") summary.assigned += 1;
      if (status === "In Progress") summary.inProgress += 1;
      if (status === "Resolved") summary.resolved += 1;
      if (status === "Rejected") summary.rejected += 1;
    });
    return summary;
  }, [complaints]);

  // Filter complaints list
  const filteredComplaints = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return complaints.filter((complaint) => {
      const statusMatches = statusFilter === "All" || (complaint.status || "Pending") === statusFilter;
      const searchable = [
        complaint.title,
        complaint.category,
        complaint.description,
        complaint.studentName,
        complaint.roomno,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return statusMatches && searchable.includes(query);
    });
  }, [complaints, searchTerm, statusFilter]);

  const statCards = [
    { label: "Total Complaints", value: total || complaints.length, icon: LayoutDashboard, gradient: "from-indigo-500/15 to-indigo-500/5", color: "text-indigo-300" },
    { label: "Resolved Today", value: totals.resolved, icon: CheckCircle2, gradient: "from-emerald-500/15 to-emerald-500/5", color: "text-emerald-300" },
    { label: "Pending Queue", value: totals.pending, icon: AlertTriangle, gradient: "from-orange-500/15 to-orange-500/5", color: "text-orange-300" },
    { label: "In Progress", value: totals.inProgress, icon: TimerReset, gradient: "from-blue-500/15 to-blue-500/5", color: "text-blue-300" },
  ];

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`${API_BASE}/api/complaints/${id}/status`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (response.ok) {
        setComplaints((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)));
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[2.5rem] p-6 sm:p-8 md:p-10 glass-panel relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
                Operations Console
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
                Complaint Operations
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Review the live residential complaint queue, move tickets through status stages, and coordinate resolving issues.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 lg:w-[32rem]">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className={`p-4 rounded-3xl bg-gradient-to-br ${card.gradient} border border-white/5 flex items-center justify-between gap-4`}>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{card.label}</span>
                      <span className="block text-2xl font-bold text-white mt-1.5">{card.value}</span>
                    </div>
                    <span className={`h-10 w-10 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 ${card.color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Filter / Search Row */}
        <section className="p-4 rounded-3xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 bg-[#060613] border border-white/5 rounded-2xl px-4 py-2.5">
            <Search className="h-4.5 w-4.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, room, category, or student name..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center bg-[#060613] border border-white/5 rounded-2xl px-4 py-2.5">
              <Filter className="h-4 w-4 text-slate-500 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#060613] text-sm text-slate-300 outline-none cursor-pointer animate-none"
              >
                {["All", "Pending", "Assigned", "In Progress", "Resolved"].map((status) => (
                  <option key={status} value={status} className="bg-[#0f0c21]">
                    {status} Queue
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={fetchComplaints}
              className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/10 hover:text-indigo-300 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </section>

        {/* Core Layout Split */}
        <section className="grid lg:grid-cols-[1.35fr_0.65fr] gap-8">
          
          {/* Complaints list */}
          <div className="space-y-4">
            {loading ? (
              <div className="glass-panel p-16 text-center text-slate-400 rounded-[2rem]">
                <div className="inline-block animate-spin h-6 w-6 border-2 border-indigo-400 border-t-transparent rounded-full" />
                <p className="mt-3 text-sm font-semibold tracking-wide">Loading complaints list...</p>
              </div>
            ) : filteredComplaints.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-[2rem] space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300">
                  <Inbox className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">No complaints found</h3>
                  <p className="text-slate-500 text-sm mt-1">Try tweaking your search term or status category filter.</p>
                </div>
              </div>
            ) : (
              filteredComplaints.map((complaint, index) => {
                const currentStatus = complaint.status || "Pending";
                const meta = statusMeta[currentStatus] || statusMeta.Pending;
                return (
                  <motion.article
                    key={complaint._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="p-6 rounded-[2rem] glass-panel flex flex-col gap-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
                            {complaint.title}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${meta.className}`}>
                            {meta.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span>Student: <strong className="text-slate-200">{complaint.studentName}</strong></span>
                          <span className="h-1 w-1 bg-slate-600 rounded-full" />
                          <span>Room No: <strong className="text-slate-200">{complaint.roomno}</strong></span>
                          <span className="h-1 w-1 bg-slate-600 rounded-full" />
                          <span>Category: <strong className="text-slate-200">{complaint.category}</strong></span>
                        </div>
                      </div>

                      {/* State update actions */}
                      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                        {["Assigned", "In Progress", "Resolved"].map((status) => (
                          <button
                            key={status}
                            type="button"
                            disabled={updatingId === complaint._id || currentStatus === status}
                            onClick={() => updateStatus(complaint._id, status)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                              currentStatus === status
                                ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                                : "bg-white/5 text-slate-400 border-white/5 hover:border-indigo-400/25 hover:bg-indigo-400/10 hover:text-white"
                            } disabled:cursor-not-allowed disabled:opacity-40`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>

                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {complaint.description}
                    </p>

                    {/* Image evidence display */}
                    {complaint.imageUrl && (
                      <div className="relative rounded-2xl overflow-hidden border border-white/5 max-h-72">
                        <img
                          src={getImageUrl(complaint.imageUrl)}
                          alt="Evidence reference"
                          className="w-full h-full object-cover max-h-72"
                        />
                      </div>
                    )}

                  </motion.article>
                );
              })
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            
            {/* Priority breakdown mockup */}
            <div className="p-6 sm:p-8 rounded-[2rem] glass-panel space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Priority Breakdown</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Estimated queue weights</p>
                </div>
                <BarChart3 className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="space-y-4">
                {[
                  { label: "High / Urgent", val: 56, color: "bg-rose-500" },
                  { label: "Medium", val: 32, color: "bg-amber-500" },
                  { label: "Low / Maintenance", val: 12, color: "bg-indigo-500" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>{item.label}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Snapshot details */}
            <div className="p-6 sm:p-8 rounded-[2rem] glass-panel space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Resolution Snap</h3>
                  <p className="text-xs text-slate-400 mt-0.5">General target rates</p>
                </div>
                <TrendingUp className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 text-xs text-slate-400">
                  <span>Resolved &lt; 24h</span>
                  <span className="font-bold text-white">82%</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 text-xs text-slate-400">
                  <span>Average feedback</span>
                  <span className="font-bold text-white">4.8/5.0</span>
                </div>
              </div>
            </div>

          </aside>

        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
