import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    // 1. Structural Binding: Model references check (trim removed)
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "Product must belong to a vendor"],
    },
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true,
        maxLength: [150, "Title cannot exceed 150 characters"] // Guard check length ke liye
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
    },
    // 2. Numerical Safeguards: Default minimum configurations mapping
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"] // Negative entries check
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true
    },
    // 3. Media Pipeline Upgrade: String path swapped to explicit Array mapping
    images: {
        type: [String], // Array structure dynamic image collections cloud links ke liye
        required: [true, "At least one product image is required"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock level is required"],
        min: [0, "Stock cannot be negative"],
        default: 0,
    },
    // 4. Analytics System Integration: Balanced evaluations matrices
    ratings: {
        type: Number,
        default: 0, // 0 standard format taaki initial calculations scale ho sakein
        min: [0, "Rating cannot be less than 0"],
        max: [5, "Rating cannot be more than 5"]
    },
    numReviews: {
        type: Number,
        default: 0 // Track karne ke liye ki kitne users ne product rate kiya
    }

}, { timestamps: true });

// Performance tuning: Frequently queried parameters indexing mapping
productSchema.index({ vendor: 1, category: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;