import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDashboardStatsAction } from "../../state/adminAction";
import { Users, Store, ArrowLeftRight, TrendingUp, Sparkles, Activity } from "lucide-react"; // Reusable vector glyphs

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStatsAction());
  }, [dispatch]);

  // 🌀 Advanced Dashboard Stat Shimmer State
  if (isLoading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-800 rounded-lg w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-slate-900 border border-slate-800 rounded-2xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Overview Analytics Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-emerald-400" /> Admin Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back! Here is a micro-view snapshot of your digital marketplace operations metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin-slow" /> Live Server Sync Active
        </div>
      </div>

      {/* Modern High-Impact Grid Container Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI Counter Card: Customers */}
        <div className="group relative p-6 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/20 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-sky-950/10 overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Customers</span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                {stats?.totalCustomer ?? stats?.totalCustomers ?? 0}
              </h2>
            </div>
            <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800/60">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> <span className="text-emerald-400 font-medium">Standard Profiles</span> registered active
          </div>
        </div>

        {/* KPI Counter Card: Approved Vendors */}
        <div className="group relative p-6 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/20 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-emerald-950/10 overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Vendors</span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                {stats?.totalVendors ?? 0}
              </h2>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Store className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800/60">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> <span className="text-emerald-400 font-medium">Verified Stores</span> selling live
          </div>
        </div>

        {/* KPI Counter Card: Pending Vendor Enrolments */}
        <div className="group relative p-6 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/20 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-amber-950/10 overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Pending Requests</span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                {stats?.totalPendingRequests ?? 0}
              </h2>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800/60">
            <span className="text-amber-400 font-medium animate-pulse">Action Required</span> approval logs waiting review
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;
