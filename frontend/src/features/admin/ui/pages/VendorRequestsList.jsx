import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveOrRejectVendorAction, getAllRequestAction } from "../../state/adminAction";
import { Store, Check, X, ShieldAlert, ArrowRight } from "lucide-react"; // Icons ke liye (npm i lucide-react)
import toast from "react-hot-toast";

const VendorRequestsList = () => {
  const dispatch = useDispatch();
  const { pendingRequests = [], isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllRequestAction());
  }, []);

  // 🌀 Modern Shimmer/Skeleton Loading State
  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-8 bg-slate-800 rounded-lg w-1/4 mb-6"></div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 bg-slate-900/60 border border-slate-800 rounded-xl w-full"></div>
        ))}
      </div>
    );
  }
  console.log(pendingRequests)
  const getActionAndUserId = async (requestId, action) => {
    const data = {
      requestId,
      action
    }
    if(action === "approved") {
      toast.success("Request approved.")
    } else {
      toast.dismiss("Request rejected.")
    }
    await dispatch(approveOrRejectVendorAction(data));
    dispatch(getAllRequestAction());
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Store className="h-6 w-6 text-emerald-400" /> Vendor Applications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review and manage requests from users who want to upgrade to a vendor account.
          </p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs font-medium text-slate-400">
          Pending Actions: <span className="text-emerald-400 font-bold ml-1">{pendingRequests.length}</span>
        </div>
      </div>

      {/* Empty State Guard */}
      {pendingRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl text-center">
          <ShieldAlert className="h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-lg font-medium text-slate-300">All caught up!</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">There are no pending vendor requests at the moment.</p>
        </div>
      ) : (
        /* Applications Main Grid List */
        <div className="grid grid-cols-1 gap-4">
          {pendingRequests.map((singleRequest) => {
            const user = singleRequest?.user || {};
            return (
              <div 
                key={user?._id || Math.random()} 
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all duration-300 gap-4 shadow-sm hover:shadow-md"
              >
                {/* Left Side: Shop/User Identity */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-11 w-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-lg shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    {singleRequest?.shopName ? singleRequest.shopName[0].toUpperCase() : (user?.name ? user.name[0].toUpperCase() : 'V')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white truncate flex items-center gap-2">
                      {singleRequest?.shopName || "Unnamed Shop"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 mt-0.5">
                      <span className="font-medium text-slate-300">{user?.name || "Unknown"}</span>
                      <span className="text-slate-600">•</span>
                      <span className="truncate">{user?.email || "No email"}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Triggers */}
                <div className="flex items-center gap-2 sm:self-center self-end shrink-0">
                  {/* View Details Page Trigger */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-950/40 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer mr-2">
                    Details <ArrowRight className="h-3 w-3" />
                  </button>

                  {/* Reject Trigger */}
                  <button onClick={()=>getActionAndUserId(singleRequest._id,"rejected")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-all duration-200 cursor-pointer active:scale-95">
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>

                  {/* Approve Trigger */}
                  <button onClick={() => getActionAndUserId(singleRequest._id, "approved")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all duration-200 shadow-md shadow-emerald-950/20 cursor-pointer active:scale-95">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorRequestsList;
