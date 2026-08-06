import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  LogOut,
  User,
} from "lucide-react";
import { AppLogo } from "./Home";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  let userInfo = null;
  try {
    const userInfoStr = localStorage.getItem("userInfo");
    userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (error) {
    console.error("Error parsing userInfo", error);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const navItems = useMemo(() => {
    if (!token) return [];
    if (role === "admin") {
      return [
        { label: "Admin Console", path: "/admin-dashboard", icon: LayoutDashboard },
      ];
    }
    return [
      { label: "Dashboard", path: "/student-dashboard", icon: LayoutDashboard },
      { label: "File Complaint", path: "/submitcomplaint", icon: PlusCircle },
      { label: "Complaint History", path: "/mycomplaint", icon: ClipboardList },
    ];
  }, [role, token]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#04040d]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => navigate(role ? `/${role}-dashboard` : "/")}
          className="flex items-center gap-3 rounded-2xl px-2 py-1.5 text-left transition hover:bg-white/5 cursor-pointer"
        >
          <AppLogo />
          <span className="block min-w-0">
            <span className="block font-display text-sm font-semibold tracking-wide text-white">
              HostelFlow
            </span>
          </span>
        </button>

        {/* Navigation Links */}
        {token && (
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 shadow-[0_0_15px_rgba(99,102,241,0.05)]"
                      : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Profile & Actions */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              {/* User badge */}
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-900 border border-white/5 px-3 py-1.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5 text-slate-400">
                  <User className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  {userInfo?.name || (role === "admin" ? "Administrator" : "Resident")}
                  {userInfo?.roomno && ` (Room ${userInfo.roomno})`}
                </span>
              </div>

              {/* Logout button */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_16px_40px_rgba(99,102,241,0.28)] transition hover:bg-indigo-400 cursor-pointer"
            >
              Sign In to Portal
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
