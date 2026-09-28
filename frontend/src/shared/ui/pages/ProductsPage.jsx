import React, { useEffect, useState } from 'react';
import { api } from "../../../config/api";
import { ShoppingBag, Sparkles, ShieldAlert, Search, Filter } from 'lucide-react';
import ProductCard from '../../../features/products/ui/components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let limit = 10;
  const [ page,  setPage ] = useState(1);
  
  // 🌟 Search aur Category Filters ke liye States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const getProducts = async () => {
    try {
      console.log("Synchronizing marketplace items catalog...");
      let response = await api.get(`/products?limit=${limit}&page=${page}`);
      setProducts(response.data.products || []);

    } catch (error) {
      console.error("Failed to load catalog index:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, [page]);

  // 🔴 LIVE FILTER LOGIC: Jo products array ko bina page reload kiye screen par filter karega
  const filteredProducts = products.filter((product) => {
    // 1. Title ya description mein text check karein
    const matchesSearch = 
      product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Selected category check karein (Agar dropdown khali hai toh saare products dikhayein)
    const matchesCategory = selectedCategory === '' || product?.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-8 bg-slate-900 rounded-xl w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 bg-slate-900 border border-slate-900 rounded-2xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen text-slate-100 mb-7">
      
      {/* 🚀 Showcase Visual Header Dashboard Section (With Search & Filter Control Center) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-900 pb-6">
        
        {/* Left Side: Branding Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-emerald-400" /> Marketplace Catalog
          </h1>
          <p className="text-sm text-slate-400">
            Browse verified commercial store listings, curated styles, and freshly deployed merchant assets.
          </p>
        </div>

        {/* Right Side: Interactive Search and Dropdown Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
          
          {/* 🔍 Search Input Bar with Icon */}
          <div className="relative flex-1 sm:w-64 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title..."
              className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 focus:border-emerald-500 text-sm text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none transition-all placeholder-slate-500 shadow-inner"
            />
          </div>

          {/* ⚡ Category Filter Dropdown Option Selection */}
          <div className="relative flex-1 sm:w-48">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 focus:border-emerald-500 text-xs font-medium text-slate-300 pl-9 pr-4 py-2.5 rounded-xl focus:outline-none transition-all appearance-none cursor-pointer shadow-inner"
            >
              {/* Wahi options jo Vendor form me product upload karte waqt the */}
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="home">Home & Living</option>
              <option value="gadgets">Smart Gadgets</option>
            </select>
          </div>

          {/* Dynamic Active Counter Badge */}
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 select-none whitespace-nowrap">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Found: <span className="text-emerald-400 font-bold">{filteredProducts.length}</span>
          </div>

        </div>

      </div>

      {/* Directory Grid Mapping Section with Filtered Array */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/20 border border-dashed border-slate-900 rounded-2xl text-center max-w-xl mx-auto my-12">
          <ShieldAlert className="h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-lg font-medium text-slate-400">No results found</h3>
          <p className="text-sm text-slate-600 mt-1">We couldn't find any products matching your active search string or category filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
            className="mt-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
          >
            Clear active filters
          </button>
        </div>
      ) : (
        /* Dynamic Filtered Grid Matrix Wrapper */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((singleProduct) => (
            <ProductCard
              key={singleProduct?._id || Math.random()} 
              product={singleProduct} 
            />
          ))}
        </div>
      )}
      {filteredProducts.length >10 &&    <div className='flex justify-center gap-2'>
        <button disabled={page===1} onClick={() => setPage(page - 1)} className='bg-gray-200 px-3 py-1 rounded text-gray-900'>Prev</button>
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)} className='bg-gray-200 px-3 py-1 rounded text-gray-900'>Next</button> 
      </div>}
    </div>
  );
};

export default ProductsPage;
