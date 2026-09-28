import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShoppingBag, Upload, X, Loader2, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createNewProductAction } from '../../state/vendorAction';

const AddProduct = () => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const dispatch = useDispatch()

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      stock: ''
    }
  });

  // Local File Previews Handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if it exceeds max limit of 5 images
    if (files.length > 5) {
      alert("You can only upload up to 5 images max.");
      return;
    }

    setSelectedFiles(files);

    // Create localized blob URLs for browser review
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Safe Clean up for Blobs to avoid memory leak
  const removeImage = (index) => {
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    
    setPreviewUrls(updatedPreviews);
    setSelectedFiles(updatedFiles);
  };

  // Main Submit Handler (FormData creation for Multer)
  const onSubmitHandler = async (data) => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one product image.");
      return;
    }

    setIsSubmittingForm(true);

    try {
      // 🔴 Multer file upload ke liye Multi-part Form Data object banana padta hai
      const formData = new FormData();
      
      // 1. Text variables append karein
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("stock", data.stock ? Number(data.stock) : 0);

      // 2. Multiple files ko same array key ke under attach karein
      selectedFiles.forEach((file) => {
        formData.append("images", file); // Backend upload.array("images") se match hona chahiye
      });

      console.log("Dispatching multi-part layout node data to server API...");
      
      // 3. Yahan aapka Redux dispatch trigger call hoga baad me:
      const response = await dispatch(createNewProductAction(formData)).unwrap();
      
      alert("Product upload simulation success!");
      
      // Reset all states on success
      reset();
      setPreviewUrls([]);
      setSelectedFiles([]);

    } catch (err) {
      console.error("Submission crash error:", err);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Page Layout Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-emerald-400" /> Launch New Product
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Catalog fresh inventory assets directly into the marketplace database engine via a secure file stream.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Core Module Panel: Text inputs configuration matrices (2 Columns wide) */}
        <div className="lg:col-span-2 space-y-5 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          
          {/* Title Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Product Title</label>
            <input 
              type="text" 
              placeholder="e.g. Premium Wireless Over-Ear Headphones"
              className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${errors.title ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-emerald-500'}`}
              {...register("title", { 
                required: "Product title is required field",
                maxLength: { value: 120, message: "Title cannot exceed 120 characters" }
              })}
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.title.message}</p>}
          </div>

          {/* Pricing & Stock Fields Grid System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Field Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Price (INR)</label>
              <input 
                type="number" 
                placeholder="0.00"
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${errors.price ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-emerald-500'}`}
                {...register("price", { 
                  required: "Price configuration value is required",
                  min: { value: 0, message: "Price values cannot be negative numbers" }
                })}
              />
              {errors.price && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.price.message}</p>}
            </div>

            {/* Stock Level Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Stock Level</label>
              <input 
                type="number" 
                placeholder="Available quantity units"
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${errors.stock ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-emerald-500'}`}
                {...register("stock", { 
                  required: "Stock baseline level parameter required",
                  min: { value: 0, message: "Stock values cannot be negative numbers" }
                })}
              />
              {errors.stock && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.stock.message}</p>}
            </div>
          </div>

          {/* Category Dropdown Selection input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category Selection</label>
            <select 
              className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none transition-colors ${errors.category ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-emerald-500'}`}
              {...register("category", { required: "Please select an internal storage category block" })}
            >
              <option value="">Select Category Block</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="home">Home & Living</option>
              <option value="gadgets">Smart Gadgets</option>
            </select>
            {errors.category && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.category.message}</p>}
          </div>

          {/* Description Textarea Field Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Detailed Description</label>
            <textarea 
              rows="5" 
              placeholder="Highlight technical specifications, dimensions, material quality constraints, warranties, etc..."
              className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none ${errors.description ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-emerald-500'}`}
              {...register("description", { 
                required: "Detailed product description summary required",
                minLength: { value: 20, message: "Description parameters must contain at least 20 characters" }
              })}
            />
            {errors.description && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.description.message}</p>}
          </div>

        </div>

        {/* Right Side Module Panel: Device File Media Drag & Drop system (1 Column wide) */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Product Media Asset Inventory</label>
            
            {/* Standard Native Input Interface Wrapper */}
            <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 text-center transition-colors relative cursor-pointer group bg-slate-950/40">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-2 py-4">
                <Upload className="h-6 w-6 text-slate-500 mx-auto group-hover:text-emerald-400 transition-colors" />
                <p className="text-xs text-slate-400">Click or drag image files</p>
                <p className="text-xs text-slate-500">Supports PNG, JPG, WEBP up to 5MB (Max 5)</p>
              </div>
            </div>

            {/* Media Dynamic Local Image Previews Grid Module */}
            {previewUrls.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Local Selection Previews</p>
                <div className="grid grid-cols-2 gap-3">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden">
                      <img src={url} alt={`preview_${idx}`} className="h-full w-full object-cover" />
                      {/* Delete localized asset node trigger */}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 h-5 w-5 bg-slate-950/80 hover:bg-rose-600 rounded-md flex items-center justify-center text-slate-400 hover:text-white border border-slate-800/80 transition-colors cursor-pointer z-20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Core Master Form Dispatch Trigger Button */}
        <button
          type="submit"
          disabled={isSubmittingForm}
          className="lg:col-span-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isSubmittingForm ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Deploying Product Live...
            </>
          ) : (
            "Deploy Product Live"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;