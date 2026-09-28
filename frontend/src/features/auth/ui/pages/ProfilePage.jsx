import { useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    // 1. Redux store से auth स्टेट और यूज़र का डेटा निकालना
    const { user } = useSelector((state) => state.auth);
    
    // 2. एक्टिव टैब को मैनेज करने के लिए स्टेट
    const [activeTab, setActiveTab] = useState("profile");

    // यदि रिडक्स में डेटा लोड नहीं हुआ है तो सेफ-गार्ड (Fallback)
    const currentUser = user || {
        name: "Guest User",
        email: "guest@moonstore.com",
        phone: "+91 9876543210",
        role: "customer",
        joinedAt: "2026-08-10T06:19:34.930Z"
    };

    return (
        <div className="min-h-screen text-slate-200 antialiased font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* ================= LEFT SIDEBAR ================= */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Quick Mini Profile */}
                    <div className="bg-[#0d1527] border border-slate-800 rounded-2xl p-6 text-center shadow-xl">
                        <div className="relative inline-block mx-auto mb-4">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold uppercase shadow-lg shadow-indigo-500/20">
                                {currentUser.name ? currentUser.name[0] : "U"}
                            </div>
                            <span className="absolute bottom-1 right-1 h-4 w-4 bg-emerald-500 border-2 border-[#0d1527] rounded-full"></span>
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight">{currentUser.name}</h2>
                        <p className="text-xs text-indigo-400 font-mono mt-0.5 capitalize">{currentUser.role} Account</p>
                        <p className="text-xs text-slate-400 mt-2">
                            Member since: {new Date(currentUser.joinedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-[#0d1527] border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1">
                        <button 
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "profile" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-[#070b19] hover:text-white"}`}
                        >
                            <span>👤</span> Personal Information
                        </button>
                        <button 
                            onClick={() => setActiveTab("orders")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "orders" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-[#070b19] hover:text-white"}`}
                        >
                            <span>📦</span> My Orders
                        </button>
                        <button 
                            onClick={() => setActiveTab("addresses")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "addresses" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-[#070b19] hover:text-white"}`}
                        >
                            <span>📍</span> Manage Addresses
                        </button>
                        <button 
                            onClick={() => setActiveTab("security")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "security" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-[#070b19] hover:text-white"}`}
                        >
                            <span>⚙️</span> Security & Password
                        </button>
                    </div>
                </div>

                {/* ================= RIGHT CONTENT AREA ================= */}
                <div className="lg:col-span-3 bg-[#0d1527] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl min-h-[500px]">
                    
                    {/* TAB 1: PERSONAL INFORMATION */}
                    {activeTab === "profile" && (
                        <div>
                            <div className="border-b border-slate-800 pb-4 mb-6">
                                <h3 className="text-xl font-bold text-white">Personal Information</h3>
                                <p className="text-xs text-slate-400 mt-1">View and update your personal account details.</p>
                            </div>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            defaultValue={currentUser.name}
                                            className="w-full bg-[#070b19] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            defaultValue={currentUser.email}
                                            disabled
                                            className="w-full bg-[#070b19]/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-500 text-sm cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                                        <input 
                                            type="text" 
                                            defaultValue={currentUser.phone}
                                            className="w-full bg-[#070b19] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-800 flex justify-end">
                                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/10">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB 2: MY ORDERS (Placeholder) */}
                    {activeTab === "orders" && (
                        <div>
                            <div className="border-b border-slate-800 pb-4 mb-6">
                                <h3 className="text-xl font-bold text-white">Order History</h3>
                                <p className="text-xs text-slate-400 mt-1">Track and manage your recent or past store orders.</p>
                            </div>
                            {/* यहाँ हम मिलकर एक ज़बरदस्त ऑर्डर्स लिस्ट बनाएंगे */}
                            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-[#070b19]/30">
                                <span className="text-4xl block mb-3">📦</span>
                                <p className="text-slate-400 text-sm">Ready to build order details...</p>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: MANAGE ADDRESSES (Placeholder) */}
                    {activeTab === "addresses" && (
                        <div>
                            <div className="border-b border-slate-800 pb-4 mb-6">
                                <h3 className="text-xl font-bold text-white">Manage Addresses</h3>
                                <p className="text-xs text-slate-400 mt-1">Add, edit, or remove delivery addresses.</p>
                            </div>
                            {/* एड्रेस कार्ड्स की लिस्ट यहाँ आएगी */}
                            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-[#070b19]/30">
                                <span className="text-4xl block mb-3">📍</span>
                                <p className="text-slate-400 text-sm">Ready to build address grid...</p>
                            </div>
                        </div>
                    )}

                    {/* TAB 4: SECURITY (Placeholder) */}
                    {activeTab === "security" && (
                        <div>
                            <div className="border-b border-slate-800 pb-4 mb-6">
                                <h3 className="text-xl font-bold text-white">Security & Password</h3>
                                <p className="text-xs text-slate-400 mt-1">Manage your account password and login security.</p>
                            </div>
                            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-[#070b19]/30">
                                <span className="text-4xl block mb-3">🔐</span>
                                <p className="text-slate-400 text-sm">Ready to build security settings...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
