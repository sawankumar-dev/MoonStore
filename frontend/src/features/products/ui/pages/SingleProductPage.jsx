import { useState } from "react";
import { useLoaderData, Link } from "react-router";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Package,
  Store,
  CalendarDays,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { api } from "../../../../config/api";

const SingleProductPage = () => {
  const data = useLoaderData();
  const { product } = data;

  const [selectedImage, setSelectedImage] = useState(0);

  const isOutOfStock = product.stock <= 0;

  const formattedCreatedDate = new Date(
    product.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedUpdatedDate = new Date(
    product.updatedAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addToCart = async (productId) => {
    console.log("I am added to cart")
    console.log(productId)
    const data = {
      productId,
      quantity: 1
    }
    try {
      const response = await api.post("/cart/", data);
      console.log("response in SingleProductPage: ", response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="min-h-screen text-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        {/* Main Product */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= IMAGES ================= */}
            <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r lg:p-7">

              {/* Main Image */}
              <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-2xl bg-white">

                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="h-full w-full object-contain p-6 transition duration-300"
                />
                
                {/* Category */}
                <span className="absolute left-4 top-4 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold capitalize text-slate-200 shadow-lg">
                  {product.category}
                </span>
              </div>

              {/* Thumbnails */}
              {product.images?.length > 0 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                        selectedImage === index
                          ? "border-emerald-400"
                          : "border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ================= PRODUCT INFO ================= */}
            <div className="flex flex-col p-6 md:p-8">

              {/* Merchant */}
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                <Store className="h-4 w-4" />
                Official Merchant
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                  <span className="text-sm font-semibold text-white">
                    {product.ratings}
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  ({product.numReviews} reviews)
                </span>
              </div>

              {/* Description */}
              <div className="mt-7">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </h2>

                <p className="leading-7 text-slate-300">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-7 border-y border-slate-800 py-6">
                <p className="text-sm text-slate-500">Price</p>

                <p className="mt-1 text-3xl font-bold text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-3">
                <Package
                  className={`h-5 w-5 ${
                    isOutOfStock
                      ? "text-red-400"
                      : "text-emerald-400"
                  }`}
                />

                <div>
                  <p className="text-sm font-semibold text-white">
                    {isOutOfStock
                      ? "Out of stock"
                      : `${product.stock} items available`}
                  </p>

                  <p className="text-xs text-slate-500">
                    {isOutOfStock
                      ? "Currently unavailable"
                      : "Ready to ship"}
                  </p>
                </div>
              </div>

              {/* Add To Cart */}
              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product._id)}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingCart className="h-5 w-5" />

                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

              {/* Extra Benefits */}
              <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <Truck className="mb-2 h-5 w-5 text-emerald-400" />

                  <p className="text-xs font-semibold text-white">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Quick shipping available
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-emerald-400" />

                  <p className="text-xs font-semibold text-white">
                    Secure Purchase
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Trusted marketplace
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}

          <div className="border-t border-slate-800 p-6 md:p-8">

            <h2 className="text-lg font-bold text-white">
              Product Details
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {/* Category */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">
                  Category
                </p>

                <p className="mt-1 capitalize text-sm font-medium text-slate-200">
                  {product.category}
                </p>
              </div>

              {/* Stock */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">
                  Stock
                </p>

                <p className="mt-1 text-sm font-medium text-slate-200">
                  {product.stock}
                </p>
              </div>

              {/* Reviews */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">
                  Reviews
                </p>

                <p className="mt-1 text-sm font-medium text-slate-200">
                  {product.numReviews}
                </p>
              </div>

              {/* Rating */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">
                  Rating
                </p>

                <p className="mt-1 text-sm font-medium text-slate-200">
                  {product.ratings} / 5
                </p>
              </div>

              {/* Created */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />

                  <p className="text-xs text-slate-500">
                    Added On
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-slate-200">
                  {formattedCreatedDate}
                </p>
              </div>

              {/* Updated */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />

                  <p className="text-xs text-slate-500">
                    Last Updated
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-slate-200">
                  {formattedUpdatedDate}
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* ================= RELATED PRODUCTS ================= */}

        <section className="mt-10 pb-10">

          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Discover More
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                Related Products
              </h2>
            </div>
          </div>

          {/* Baad mein yahan products map karenge */}
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
            <p className="text-sm text-slate-500">
              Related products will appear here.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
};

export default SingleProductPage;