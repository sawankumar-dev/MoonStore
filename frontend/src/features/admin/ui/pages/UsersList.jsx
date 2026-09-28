import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomerAction, getAllCustomersAction } from '../../state/adminAction';
import { Users, Trash2, Eye, Mail, ShieldAlert, Search } from 'lucide-react'; // Reusable Vector Icons

const UsersList = () => {
    const dispatch = useDispatch();
    // Destructure default array values path safety ke liye
    const { users = [], isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllCustomersAction());
    }, []);
    const onButtonClicked =  async (id) => {
        await dispatch(deleteCustomerAction(id))
        dispatch(getAllCustomersAction())
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
            {/* Component Layout Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="h-6 w-6 text-emerald-400" /> Customer Registry
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Monitor active platform accounts, analyze profile scopes, and manage credentials access.
                    </p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs font-medium text-slate-400">
                    Total Registered: <span className="text-emerald-400 font-bold ml-1">{users.length}</span>
                </div>
            </div>

            {/* Empty State Route Guard */}
            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl text-center">
                    <ShieldAlert className="h-12 w-12 text-slate-600 mb-3" />
                    <h3 className="text-lg font-medium text-slate-300">No customers found</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">There are no registered standard customer profiles logged in the system.</p>
                </div>
            ) : (
                /* Master Clean Customer Directory Grid */
                <div className="grid grid-cols-1 gap-4">
                    {users.map((user) => {
                        const customerName = user?.name || "Anonymous User";
                        return (
                            <div 
                                key={user?._id || Math.random()} 
                                className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all duration-300 gap-4 shadow-sm hover:shadow-md"
                            >
                                {/* Core Data Block: Structural Profile info */}
                                <div className="flex items-center gap-4 min-w-0">
                                    {/* Geometric Initial Icon Badge */}
                                    <div className="h-11 w-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-base shadow-inner shrink-0 group-hover:scale-105 transition-transform uppercase select-none">
                                        {customerName.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-base font-semibold text-white truncate capitalize">
                                            {customerName}
                                        </h2>
                                        <span className="text-xs text-slate-400 block mt-0.5 truncate tracking-wide">
                                            {user?.email || "Missing address registry"}
                                        </span>
                                    </div>
                                </div>

                                {/* Controller Module: Action Matrices */}
                                <div className="flex flex-wrap items-center gap-2 md:self-center self-end shrink-0">
                                    {/* Action: Messaging Trigger */}
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-400 hover:text-white bg-violet-500/5 hover:bg-violet-600/80 border border-violet-500/10 hover:border-violet-600 rounded-lg transition-all duration-200 cursor-pointer active:scale-95">
                                        <Mail className="h-3.5 w-3.5" /> Send Message
                                    </button>

                                    {/* Action: Profile Detailed Inspection */}
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950/40 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer active:scale-95">
                                        <Eye className="h-3.5 w-3.5" /> Details
                                    </button>

                                    {/* Action: Core Delete Protocol */}
                                    <button type='button' onClick={() => onButtonClicked(user._id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-all duration-200 cursor-pointer active:scale-95 shadow-inner">
                                        <Trash2 className="h-3.5 w-3.5" /> Delete
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

export default UsersList;