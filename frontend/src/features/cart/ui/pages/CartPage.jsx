import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartAction, getAllCartAction, updateQuantity } from "../../state/cartAction"
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react" 

const CartPage = () => {
  const dispatch = useDispatch()
  
  // State se direct cart object aur uske items array ko nikalte hain
  const { cart, loading } = useSelector((store) => store.cart)

  useEffect(() => {
    console.log("🔥 CartPage mounted")
    dispatch(getAllCartAction())
  }, [dispatch])

  // Increment (Quantity +) handle karne ke liye function
  const handleIncrement = async (productId, currentQuantity) => {
    console.log("Quantity badhao -> Product ID:", productId, "Current Qty:", currentQuantity)
    // TODO: Yahan apni quantity update karne wali action dispatch karein
    const data = {
      id: productId,
      action: "increment",
    }
    await dispatch(updateQuantity(data))
    dispatch(getAllCartAction())
  }

  // Decrement (Quantity -) handle karne ke liye function
  const handleDecrement = async (productId, currentQuantity) => {
    if (currentQuantity <= 1) return
    console.log("Quantity gatao -> Product ID:", productId, "Current Qty:", currentQuantity)
    // TODO: Yahan apni quantity update karne wali action dispatch karein
    const data = {
      id: productId,
      action: "decrement",
    }
    await dispatch(updateQuantity(data))
    dispatch(getAllCartAction())
  }

  // Delete/Remove handle karne ke liye function
  const handleDelete = async (productId) => {
    console.log("Item delete karo -> Product ID:", productId)
    // TODO: Yahan apni delete item wali action dispatch karein
    await dispatch(deleteCartAction(productId))
    dispatch(getAllCartAction())
  }

  if (loading) {
    return <div className="text-center py-20 text-emerald-400 animate-pulse text-xl">Loading your cart...</div>
  }

  // 🔥 SAFEGUARD MATRIX: Agar data seedhe objects/array me hai toh check karein
  // Yeh aapke har type ke raw ya custom format ko handle kar lega
  const cartData = cart?.data || cart;
  const items = cartData?.items || (Array.isArray(cartData) ? cartData : []);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-900/50 rounded-2xl border border-gray-800 p-8 max-w-md mx-auto">
        <ShoppingBag className="w-16 h-16 text-gray-600 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-gray-200">Aapka Cart Khali Hai</h3>
        <p className="text-gray-400 text-sm mt-2">Kuch badhiya products cart mein add karein!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-wide uppercase">
        Shopping Cart ({items.length})
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List Grid */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = item?.product || item;
            if (!product) return null;

            // Database se aane wale valid parameters
            const productId = product._id;
            const title = product.title || "Premium Product";
            const description = product.description || "No description provided.";
            const price = product.price || 0;
            const quantity = item.quantity || 1;
            
            // Image fallback mechanisms (pehle images array check karega)
            const productImage = product.images && product.images.length > 0 
              ? product.images[0] 
              : (product.image || null);

            return (
              <div 
                key={item._id || productId} 
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-900/40 border border-gray-800 rounded-xl p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/60"
              >
                {/* Product Image Panel */}
                <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700 shrink-0 mx-auto sm:mx-0">
                  {productImage ? (
                    <img src={productImage} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-8 h-8 text-gray-600" />
                  )}
                </div>

                {/* Product Text Details (Title, Desc, Price) */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h4 className="font-semibold text-gray-100 truncate text-base">
                    {title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    {description}
                  </p>
                  <p className="text-emerald-400 font-bold mt-1 text-sm">
                    ₹{price}
                  </p>
                </div>

                {/* Interactive Dynamic Action Controls Layout */}
                <div className="flex items-center justify-center gap-3 mt-2 sm:mt-0">
                  {/* Quantity Controls (+ / -) */}
                  <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-lg p-1">
                    <button 
                      onClick={() => handleDecrement(productId, quantity)}
                      disabled={quantity <= 1}
                      className="p-1.5 rounded hover:bg-gray-800 text-gray-400 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-gray-200">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => handleIncrement(productId, quantity)}
                      className="p-1.5 rounded hover:bg-gray-800 text-gray-400 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Trash Trigger Button */}
                  <button 
                    onClick={() => handleDelete(productId)}
                    className="p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 border border-red-500/20 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dynamic Payment & Pricing Invoice Card */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 space-y-4 lg:sticky lg:top-24">
          <h3 className="text-lg font-bold text-gray-100 border-b border-gray-800 pb-3">Price Details</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span className="text-gray-200 font-medium">
                {items.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-800 pt-3 text-base font-bold text-gray-200">
              <span>Total Amount</span>
              <span className="text-emerald-400">
                ₹{items.reduce((acc, curr) => {
                  const p = curr.product || curr;
                  return acc + (p.price || 0) * (curr.quantity || 1);
                }, 0)}
              </span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-gray-950 font-bold py-3 rounded-xl transition-all duration-300 cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
