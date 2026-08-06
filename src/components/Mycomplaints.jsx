import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  Edit3,
  Eye,
  ClipboardList,
  History,
  ImageIcon,
  LayoutList,
  Trash2,
  X,
  FileText,
  Layers,
  Inbox,
  Clock,
  PlusCircle,
} from "lucide-react";
import Navbar from "./Navbar";
import { API_BASE, getAuthHeaders, getImageUrl } from "../utils/api";

const categories = ["Electrical", "WiFi", "Plumbing", "Furniture", "Cleaning", "Security", "Other"];

const statusMeta = {
  Pending: { label: "Pending", className: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  Assigned: { label: "Assigned", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "In Progress": { label: "In Progress", className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  Resolved: { label: "Resolved", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  Rejected: { label: "Rejected", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

function Mycomplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
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
      const response = await fetch(`${API_BASE}/api/complaints/my`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/");
        return;
      }

      const data = await response.json();
      setComplaints(Array.isArray(data) ? data : []);
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

  // Compute stats summary
  const summary = useMemo(() => {
    const counts = { total: complaints.length, pending: 0, assigned: 0, inProgress: 0, resolved: 0, rejected: 0 };
    complaints.forEach((complaint) => {
      const status = complaint.status || "Pending";
      if (status === "Pending") counts.pending += 1;
      if (status === "Assigned") counts.assigned += 1;
      if (status === "In Progress") counts.inProgress += 1;
      if (status === "Resolved") counts.resolved += 1;
      if (status === "Rejected") counts.rejected += 1;
    });
    return counts;
  }, [complaints]);

  const openEdit = (complaint) => {
    setEditing(complaint);
    setTitle(complaint.title);
    setCategory(complaint.category);
    setDescription(complaint.description);
    setImage(null);
    setImagePreview(complaint.imageUrl ? getImageUrl(complaint.imageUrl) : "");
    setEditOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!title || !category || !description) {
      alert("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await fetch(`${API_BASE}/api/complaints/${editing._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setEditOpen(false);
        fetchComplaints();
      } else {
        alert(data.message || "Failed to update complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      const response = await fetch(`${API_BASE}/api/complaints/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
      } else {
        alert(data.message || "Failed to delete complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[2.5rem] p-6 sm:p-8 md:p-10 glass-panel relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
                Complaint History
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
                My complaint tickets
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Review and track the history of your submitted maintenance issues. Edit tickets still waiting in queue, or check resolutions and admin notes once closed.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 lg:w-[28rem]">
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Total</div>
                <div className="font-display text-2xl font-bold text-white mt-2">{summary.total}</div>
              </div>
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Pending</div>
                <div className="font-display text-2xl font-bold text-amber-400 mt-2">{summary.pending}</div>
              </div>
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Resolved</div>
                <div className="font-display text-2xl font-bold text-emerald-400 mt-2">{summary.resolved}</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Categories Bar / Action row */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total complaints", val: summary.total, icon: LayoutList, color: "text-indigo-400 bg-indigo-400/10" },
            { label: "Triage pending", val: summary.pending, icon: History, color: "text-amber-400 bg-amber-400/10" },
            { label: "Staff Assigned", val: summary.assigned + summary.inProgress, icon: Eye, color: "text-blue-400 bg-blue-400/10" },
            { label: "Closed Issues", val: summary.resolved, icon: CalendarCheck2, color: "text-emerald-400 bg-emerald-400/10" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="p-4 rounded-3xl glass-panel flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{card.label}</span>
                  <span className="block text-2xl font-bold text-white mt-1.5">{card.val}</span>
                </div>
                <span className={`h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            );
          })}
        </section>

        {/* Complaints List Area */}
        <section className="grid lg:grid-cols-[1.35fr_0.65fr] gap-8">
          
          <div className="space-y-4">
            {loading ? (
              <div className="glass-panel p-16 text-center text-slate-400 rounded-[2rem]">
                <div className="inline-block animate-spin h-6 w-6 border-2 border-indigo-400 border-t-transparent rounded-full" />
                <p className="mt-3 text-sm font-semibold tracking-wide">Loading complaint tickets...</p>
              </div>
            ) : complaints.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-[2rem] space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300">
                  <Inbox className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">No complaints filed yet</h3>
                  <p className="text-slate-500 text-sm mt-1">If you notice any room or hostel damage, submit a ticket to get started.</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/submitcomplaint")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-500 text-white hover:bg-indigo-400 transition-all cursor-pointer"
                >
                  <span>Submit Ticket</span>
                  <PlusCircle className="h-4 w-4" />
                </button>
              </div>
            ) : (
              complaints.map((complaint, index) => {
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
                          <span className="font-medium">Category: <strong className="text-slate-200">{complaint.category}</strong></span>
                          <span className="h-1 w-1 bg-slate-600 rounded-full" />
                          <span>Room No: <strong className="text-slate-200">{complaint.roomno}</strong></span>
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          disabled={currentStatus !== "Pending"}
                          onClick={() => openEdit(complaint)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-400/20 hover:bg-indigo-400/10 hover:text-indigo-300 text-xs font-semibold text-slate-300 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                          title={currentStatus !== "Pending" ? "Cannot edit complaints after review/assignment" : "Edit Ticket"}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(complaint._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-400 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
                          title="Delete Ticket"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
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
                          alt="Complaint visual proof"
                          className="w-full h-full object-cover max-h-72"
                        />
                      </div>
                    )}

                  </motion.article>
                );
              })
            )}
          </div>

          {/* Right side snapshot/guidelines panel */}
          <aside className="space-y-6">
            <div className="p-6 sm:p-8 rounded-[2rem] glass-panel space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">History Snapshot</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Overview of active backlog</p>
                </div>
                <History className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 text-sm">
                  <span className="text-slate-400 font-medium">In Queue / Review</span>
                  <span className="font-bold text-white">{summary.pending + summary.assigned + summary.inProgress}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 text-sm">
                  <span className="text-slate-400 font-medium">Completed / Resolved</span>
                  <span className="font-bold text-emerald-400">{summary.resolved}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 text-sm">
                  <span className="text-slate-400 font-medium">Rejected Issues</span>
                  <span className="font-bold text-rose-400">{summary.rejected}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-[2rem] glass-panel space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Timeline Steps</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Workflow stages overview</p>
                </div>
                <ArrowRight className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="space-y-3">
                {["Submitted (In Queue)", "Reviewed by Admin", "Staff Assigned & In Progress", "Closed & Resolution Notes"].map((step, idx) => (
                  <div key={step} className="flex gap-3 items-center">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-400/10 text-indigo-300 font-display font-semibold text-xs border border-indigo-400/15">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </section>
      </main>

      {/* Edit Complaint Modal */}
      <AnimatePresence>
        {editOpen && editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03030d]/75 px-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl rounded-[2.5rem] border border-white/8 bg-[#0b0a1d] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)] space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Update Complaint Ticket</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Modify details for this open ticket record</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="h-8 w-8 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center border border-white/5 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Form inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Complaint Title
                  </label>
                  <div className="relative flex items-center">
                    <FileText className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-sm glass-input placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Category
                  </label>
                  <div className="relative flex items-center">
                    <Layers className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-sm glass-input bg-[#04040d] cursor-pointer"
                    >
                      {categories.map((item) => (
                        <option key={item} value={item} className="bg-[#0f0c21]">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 text-sm glass-input placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Optional Image Swap */}
                <div className="p-4 rounded-2xl border border-white/5 bg-slate-950/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-white">Visual Attachment</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Replace current visual reference proof if needed</p>
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-400/20 hover:bg-indigo-400/10 hover:text-indigo-300 text-xs font-semibold text-slate-300 transition-all">
                      <ImageIcon className="h-3.5 w-3.5" />
                      <span>Select Photo</span>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-white/5 max-h-24">
                      <img
                        src={imagePreview}
                        alt="Edit preview"
                        className="w-full h-full object-cover max-h-24"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl btn-primary text-xs font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Mycomplaint;
