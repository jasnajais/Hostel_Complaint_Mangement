import { motion } from "framer-motion";
import { Building2, ShieldCheck, Ticket, TimerReset } from "lucide-react";

const highlights = [
  { icon: ShieldCheck, title: "Role based access", description: "Separate student and admin workspaces." },
  { icon: Ticket, title: "Complaint workflow", description: "Track complaints from report to closure." },
  { icon: TimerReset, title: "Faster turnaround", description: "Resolve issues with clear operational steps." },
];

function AuthLayout({ badge, title, subtitle, summary, highlights: customHighlights = highlights, children }) {
  return (
    <div className="min-h-screen bg-[#08111F] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1280px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#111827] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.24)] sm:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_20%)]" />
          <div className="relative space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Hostel Complaint Management</div>
                <div className="font-display text-xl font-semibold text-white">HostelFlow</div>
              </div>
            </div>

            <span className="inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {badge}
            </span>

            <div className="space-y-4">
              <h1 className="max-w-lg font-display text-4xl font-semibold tracking-tight text-white">
                {title}
              </h1>
              <p className="max-w-lg text-sm leading-7 text-slate-400">{subtitle}</p>
            </div>

            {summary && (
              <div className="rounded-3xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                {summary}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Live updates", "Realtime"],
                ["Complaint flow", "Tracked"],
                ["Access level", "Secure"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {customHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3 rounded-3xl border border-white/8 bg-white/5 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-400">{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="overflow-hidden rounded-[2rem] border border-white/8 bg-[#111827] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.24)] sm:p-6"
        >
          <div className="flex h-full flex-col rounded-[1.5rem] border border-white/8 bg-[#0c1627] p-5 sm:p-6">
            {children}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default AuthLayout;
