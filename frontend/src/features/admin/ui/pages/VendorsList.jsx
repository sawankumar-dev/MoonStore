import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllVendorsAction } from "../../state/adminAction"
import { Store, Trash2, Eye, ShoppingBag, ShieldAlert, MapPin, Phone } from "lucide-react"; // Custom vector glyphs
import { NavLink } from "react-router";
import { api } from "../../../../config/api";

const VendorsList = () => {
  const dispatch = useDispatch();
  // Destructure array elements default path backup ke sath
  const { vendors = [], isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllVendorsAction());
  }, [dispatch]);

  const onDelete = async (id) => {
    console.log(id)
    await api.delete(`/delete-vendor/${id}`)
    dispatch(getAllVendorsAction())
  }
  // 🌀 Modern Shimmer/Skeleton Loading View State
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Component Panel Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Store className="h-6 w-6 text-emerald-400" /> Active Verified Vendors
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor registered commercial store fronts, evaluate merchant status logs, and inspect inventory indexes.
          </p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs font-medium text-slate-400">
          Total Stores Active: <span className="text-emerald-400 font-bold ml-1">{vendors.length}</span>
        </div>
      </div>

      {/* Empty Directory Route Guard */}
      {vendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl text-center">
          <ShieldAlert className="h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-lg font-medium text-slate-300">No active vendors</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">There are no approved and verified commercial merchant profiles active inside the database node.</p>
        </div>
      ) : (
        /* Master Clean Merchant Catalog Grid */
        <div className="grid grid-cols-1 gap-4">
          {vendors.map((vendor) => {
            // Mongoose populate schema compatibility metrics check
            const shopName = vendor?.shopName || "Unnamed Store";
            const ownerName = vendor?.user?.name || "Unknown Owner";
            const ownerEmail = vendor?.user?.email || vendor?.email || "No email registry";
            
            return (
              <div 
                key={vendor?._id || Math.random()} 
                className="group flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all duration-300 gap-4 shadow-sm hover:shadow-md"
              >
                {/* Core Data Block: Structural Shop info */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Geometric Initial Icon Badge */}
                  <div className="h-11 w-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-base shadow-inner shrink-0 group-hover:scale-105 transition-transform uppercase select-none">
                    {shopName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-white truncate flex items-center gap-2 capitalize">
                      {shopName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 mt-0.5">
                      <span className="font-medium text-slate-300 capitalize">{ownerName}</span>
                      <span className="text-slate-600">•</span>
                      <span className="truncate">{ownerEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Controller Module: Action Matrices */}
                <div className="flex flex-wrap items-center gap-2 lg:self-center self-end shrink-0">
                  {/* Action: View Inventory Store Products */}
                  <NavLink to={`/admin/vendor-products/${vendor?._id}`}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all duration-200 shadow-md shadow-emerald-950/20 cursor-pointer active:scale-95">
                      <ShoppingBag className="h-3.5 w-3.5" /> Show All Products
                    </button>
                  </NavLink>

                  {/* Action: Complete Profile Detailed Inspection */}
                  <NavLink to={`/admin/vendor-details/${vendor?._id}`}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950/40 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer active:scale-95">
                      <Eye className="h-3.5 w-3.5" /> Show Details
                    </button>
                  </NavLink>

                  {/* Action: Strict Delete Protocol */}
                  <button onClick={() => onDelete(vendor._id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-all duration-200 cursor-pointer active:scale-95">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default VendorsList;
