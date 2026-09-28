import { useLoaderData } from "react-router";

const VendorDetailsPage = () => {
    const { data } = useLoaderData();

    if (!data) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#070b19] text-white">
                <p className="text-lg animate-pulse">Loading vendor details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 text-slate-200 antialiased font-sans">
            {/* Header / Breadcrumb Section */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {data.shopName || "Vendor Details"}
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Vendor ID: <span className="font-mono text-indigo-400 select-all">{data._id}</span>
                    </p>
                </div>
                
                {/* Dynamic Status Badge */}
                <div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                        data.status === 'approved' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${data.status === 'approved' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                        {data.status}
                    </span>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                
                {/* Left Columns - Shop & User Profile */}
                <div className="space-y-6 lg:col-span-2">
                    
                    {/* Shop Profile Card */}
                    <div className="rounded-xl border border-slate-800 bg-[#0d1527] p-6 shadow-xl transition hover:border-slate-700/50">
                        <h2 className="mb-5 text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-xl">🏪</span> Shop Profile
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Shop Name</label>
                                <p className="text-lg font-medium text-slate-100">{data.shopName}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Description</label>
                                <p className="mt-1 rounded-lg bg-[#070b19] p-4 text-sm leading-relaxed text-slate-300 border border-slate-800/60 whitespace-pre-line">
                                    {data.description || "No description provided."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Details Card */}
                    <div className="rounded-xl border border-slate-800 bg-[#0d1527] p-6 shadow-xl transition hover:border-slate-700/50">
                        <h2 className="mb-5 text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-xl">👤</span> Vendor Owner Details
                        </h2>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Full Name</label>
                                <p className="text-base font-medium text-slate-200">{data.user?.name}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Email Address</label>
                                <p className="text-base font-medium text-indigo-400 break-all">{data.user?.email}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">System Role</label>
                                <p className="text-base font-medium text-slate-200 capitalize">{data.user?.role}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">User Account ID</label>
                                <p className="text-sm font-mono text-slate-400 break-all">{data.user?._id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Address & Timeline */}
                <div className="space-y-6">
                    
                    {/* Address Card */}
                    <div className="rounded-xl border border-slate-800 bg-[#0d1527] p-6 shadow-xl transition hover:border-slate-700/50">
                        <h2 className="mb-5 text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-xl">📍</span> Store Address
                        </h2>
                        <div className="space-y-3.5 text-sm">
                            <div className="flex justify-between border-b border-slate-800/60 pb-2.5">
                                <span className="text-slate-500">Street / Landmark</span>
                                <span className="font-medium text-slate-200 capitalize">{data.address?.street}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/60 pb-2.5">
                                <span className="text-slate-500">City</span>
                                <span className="font-medium text-slate-200 capitalize">{data.address?.city}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/60 pb-2.5">
                                <span className="text-slate-500">State</span>
                                <span className="font-medium text-slate-200">{data.address?.state}</span>
                            </div>
                            <div className="flex justify-between pt-1">
                                <span className="text-slate-500">Pin Code</span>
                                <span className="font-mono font-medium text-indigo-400">{data.address?.pinCode}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline / Metadata Card */}
                    <div className="rounded-xl border border-slate-800 bg-[#0d1527] p-6 shadow-xl transition hover:border-slate-700/50">
                        <h2 className="mb-5 text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-xl">📅</span> System Timeline
                        </h2>
                        <div className="space-y-4 text-xs">
                            <div>
                                <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Created On</span>
                                <span className="text-slate-300 font-medium bg-[#070b19] px-2.5 py-1.5 rounded border border-slate-800/60 block">
                                    {new Date(data.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                </span>
                            </div>
                            <div>
                                <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Last Updated</span>
                                <span className="text-slate-300 font-medium bg-[#070b19] px-2.5 py-1.5 rounded border border-slate-800/60 block">
                                    {new Date(data.updatedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDetailsPage;
