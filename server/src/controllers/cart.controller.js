import { addToCartService, getMyCartService, removeFromCartService, updateCartQuantityService } from "../service/cart.service.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const cart = await addToCartService(userId, productId, quantity);
    return res.status(200).json(new ApiResponse(200, "Product added to cart successfully", cart))
})

export const getMyCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await getMyCartService(userId);
    return res.status(200).json(new ApiResponse(200, "Cart fetched successfully", cart))
})

export const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const cart = await removeFromCartService(userId, productId);
    return res.status(200).json(new ApiResponse(200, "Product removed from cart successfully!", cart))
})

export const updateCartQuantity = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId  = req.user._id;
    const { action } = req.body;
    const cart = await updateCartQuantityService(userId, productId, action)
    return res.status(200).json(new ApiResponse(200, "Cart quantity updated successfully", cart))
})