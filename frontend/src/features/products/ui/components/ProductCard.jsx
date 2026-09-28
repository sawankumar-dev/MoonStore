import React from 'react';
import { ShoppingBag, Eye, Store, Sparkles } from 'lucide-react'; // Standard Icons
import { NavLink } from 'react-router';

const ProductCard = ({ product }) => {
  // Database format ke mutabik variables select karein (Image array ka 0th index uthayein)
  const productImg = product?.images?.[0] || "https://unsplash.com";
  const shopName = product?.vendor?.shopName || "Official Merchant";
  const isOutOfStock = product?.stock <= 0;

  return (
    <div className="group flex flex-col  bg-slate-800 border border-slate-900 hover:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
      
      {/* Product Image Window */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden shadow-inner">
        <img 
          src={productImg} 
          alt={product?.title} 
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Dynamic Category Badge */}
        <span className="absolute top-3 left-3 bg-slate-950/80 border border-slate-800/60 px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 tracking-wider capitalize backdrop-blur-sm">
          {product?.category || "General"}
        </span>

        {/* Out of Stock Layer Guard */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
            <span className="text-xs font-bold text-rose-400 border border-rose-500/30 px-3 py-1 rounded-lg uppercase tracking-wider bg-rose-500/10">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information Details Panel */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Shop Front Identity */}
          <span className="text-[10px] font-semibold text-emerald-400 tracking-wide flex items-center gap-1 uppercase select-none">
            <Store className="h-3 w-3 shrink-0" /> {shopName}
          </span>
          
          {/* Title */}
          <h2 className="text-base font-semibold text-white truncate group-hover:text-emerald-400 transition-colors capitalize">
            {product?.title || "Unnamed Product"}
          </h2>
          
          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8">
            {product?.description}
          </p>
        </div>

        {/* Bottom Section: Pricing & Quick Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-900/60">
          <div className="flex flex-col">
            <span className="text-lg font-black text-white tracking-tight">
              ₹{Number(product?.price || 0).toLocaleString("en-IN")}
            </span>
            {product?.stock > 0 && product?.stock <= 5 && (
              <span className="text-[10px] text-amber-400 font-medium mt-0.5">
                Only {product.stock} left!
              </span>
            )}
          </div>
          
        {isOutOfStock ? (
          <button
            disabled
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl opacity-40 cursor-not-allowed"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>
        ) : (
          <NavLink to={`/product/${product._id}`}>
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              View
            </button>
          </NavLink>
        )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
