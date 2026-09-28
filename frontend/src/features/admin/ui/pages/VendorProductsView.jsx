import { useLoaderData } from "react-router";
import {
  Store,
  MapPin,
  Package,
  Trash2,
  Star,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";

const VendorProductsView = () => {
  const response = useLoaderData();

  const products = response?.data || [];

  // Vendor ki information product ke andar aa rahi hai
  const vendor = products[0]?.vendor;

  return (
    <div className="space-y-8 pb-10">

      {/* ================= STORE HEADER ================= */}
      {vendor && (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            {/* Store basic info */}
            <div className="flex gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <Store className="h-8 w-8 text-emerald-400" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">
                    {vendor.shopName}
                  </h1>

                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                    Approved
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  {vendor.description}
                </p>
              </div>

            </div>

            {/* Product count */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <Package className="h-5 w-5 text-emerald-400" />

              <div>
                <p className="text-xs text-slate-500">
                  Total Products
                </p>

                <p className="text-lg font-bold text-white">
                  {products.length}
                </p>
              </div>
            </div>

          </div>

          {/* Store details */}
          <div className="mt-6 grid gap-3 border-t border-slate-800 pt-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-slate-950/60 p-4">
              <p className="text-xs text-slate-500">
                Shop Name
              </p>

              <p className="mt-1 font-semibold text-slate-200">
                {vendor.shopName}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />

                <p className="text-xs text-slate-500">
                  Location
                </p>
              </div>

              <p className="mt-1 font-semibold capitalize text-slate-200">
                {vendor.address?.city}, {vendor.address?.state}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <p className="text-xs text-slate-500">
                Street
              </p>

              <p className="mt-1 font-semibold text-slate-200">
                {vendor.address?.street}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <p className="text-xs text-slate-500">
                PIN Code
              </p>

              <p className="mt-1 font-semibold text-slate-200">
                {vendor.address?.pinCode}
              </p>
            </div>

          </div>

        </section>
      )}

      {/* ================= PRODUCTS HEADER ================= */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">

        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-400" />

            <h2 className="text-xl font-bold text-white">
              Store Products
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            All products listed by this vendor
          </p>
        </div>

        <span className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300">
          {products.length} Products
        </span>

      </div>

      {/* ================= PRODUCTS ================= */}
      {products.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 py-16 text-center">
          <Package className="mx-auto h-10 w-10 text-slate-600" />

          <h3 className="mt-4 text-lg font-semibold text-slate-300">
            No Products Found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            This vendor hasn't listed any products yet.
          </p>
        </div>

      ) : (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (

            <article
              key={product._id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg transition-all duration-300 hover:border-slate-700"
            >

              {/* ================= IMAGES ================= */}
              <div className="bg-slate-950 p-2">
                {product.images?.map((image, index) => (
                  <div
                    key={`${product._id}-${index}`}
                    className="overflow-hidden rounded-xl bg-white"
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-48 w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* ================= PRODUCT DETAILS ================= */}
              <div className="p-4">

                {/* Category */}
                <div className="flex items-center justify-between gap-3">

                  <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold capitalize text-slate-300">
                    {product.category}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      product.stock > 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>

                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg font-bold text-white">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mt-3 flex items-end justify-between border-t border-slate-800 pt-4">

                  <div>
                    <p className="text-xs text-slate-500">
                      Price
                    </p>

                    <p className="text-2xl font-bold text-white">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="text-right">

                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />

                      <span className="font-semibold text-slate-200">
                        {product.ratings}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {product.numReviews} reviews
                    </p>

                  </div>

                </div>

                {/* Other details */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-950/70 p-3">
                    <p className="text-xs text-slate-500">
                      Created
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {new Date(product.createdAt).toLocaleDateString(
                        "en-IN"
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-950/70 p-3">
                    <p className="text-xs text-slate-500">
                      Updated
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {new Date(product.updatedAt).toLocaleDateString(
                        "en-IN"
                      )}
                    </div>
                  </div>

                </div>

                {/* Delete button */}
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 active:scale-[0.98]"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Product
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

    </div>
  );
};

export default VendorProductsView;