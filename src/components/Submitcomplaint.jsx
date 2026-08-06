import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CloudUpload,
  FileText,
  ImageIcon,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Layers,
  X,
  PlusCircle,
} from "lucide-react";
import Navbar from "./Navbar";
import { API_BASE } from "../utils/api";

const categories = ["Electrical", "WiFi", "Plumbing", "Furniture", "Cleaning", "Security", "Other"];

function Submitcomplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Handle image selection & preview URL generation
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

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !category || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await fetch(`${API_BASE}/api/complaints`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/mycomplaint");
      } else {
        setError(data.message || "Failed to submit complaint.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] rounded-[2.5rem] overflow-hidden glass-panel"
        >
          {/* Left Side: Brand Panel */}
          <div className="relative p-8 sm:p-10 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950/60 to-slate-950/90 border-r border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.04),transparent_40%)]" />
            
            <div className="space-y-6 relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                New Complaint Ticket
              </span>
              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
                  File an issue report
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Submit a structured service request to alert the administration. Provide clear details and attach photos to help technicians resolve it quickly.
                </p>
              </div>

              {/* Guidelines list */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <ShieldCheck className="h-5 w-5 text-indigo-300 shrink-0" />
                  <span className="text-sm font-medium text-slate-200">Direct Route to Ops queue</span>
                </div>
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <ImageIcon className="h-5 w-5 text-indigo-300 shrink-0" />
                  <span className="text-sm font-medium text-slate-200">Upload visual image proof</span>
                </div>
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <Sparkles className="h-5 w-5 text-indigo-300 shrink-0" />
                  <span className="text-sm font-medium text-slate-200">Track history and updates live</span>
                </div>
              </div>
            </div>

            <div className="relative text-xs text-slate-500 pt-8 lg:pt-0">
              Submitted tickets cannot be edited once work has begun.
            </div>
          </div>

          {/* Right Side: Form Panel */}
          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    Complaint Form
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the fields to create a ticket.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/student-dashboard")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
                </button>
              </div>

              {/* Error feedback */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Complaint Title <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FileText className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 text-sm glass-input placeholder:text-slate-600"
                      placeholder="e.g. Broken corridor study lamp"
                    />
                  </div>
                </div>

                {/* Category select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Category <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Layers className="absolute left-4 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 text-sm glass-input bg-[#04040d] cursor-pointer"
                    >
                      <option value="" className="bg-[#0f0c21]">Select Category</option>
                      {categories.map((item) => (
                        <option key={item} value={item} className="bg-[#0f0c21]">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Detailed Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    rows={4}
                    className="w-full px-4 py-3 text-sm glass-input placeholder:text-slate-600 resize-none"
                    placeholder="Provide specific details about the issue. (e.g. Where is it located inside the room? What is wrong?)"
                  />
                </div>

                {/* Image upload box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Attach Image Evidence
                  </label>
                  
                  {!imagePreview ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 bg-slate-950/20 hover:bg-slate-950/40 hover:border-indigo-500/20 transition-all cursor-pointer group">
                      <CloudUpload className="h-8 w-8 text-slate-500 group-hover:text-indigo-300 transition-colors" />
                      <span className="text-sm font-semibold text-slate-300 mt-2">Click to upload photo</span>
                      <span className="text-xs text-slate-500 mt-0.5">PNG, JPG or JPEG format</span>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 max-h-[180px]">
                      <img
                        src={imagePreview}
                        alt="Evidence Preview"
                        className="w-full h-full object-cover max-h-[180px]"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-slate-950/80 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 cursor-pointer"
                        title="Remove image"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 rounded-2xl btn-primary flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlusCircle className="h-4.5 w-4.5" />
                  {loading ? "Submitting Ticket..." : "Submit Complaint"}
                </button>
              </form>

            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Submitcomplaint;
