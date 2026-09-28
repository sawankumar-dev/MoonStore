import React, { useState } from 'react';
import { Store, Phone, MapPin, FileText, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useVendor } from '../../hook/useVendorHook';

const VendorApplicationForm = () => {
    const {
        handleSubmit,
        onSubmit,
        errors,
        serverError,
        register,
        loading
    } = useVendor();

    return (
        <div className=" text-slate-100 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Register Your Shop</h1>
                    <p className="text-sm text-slate-400">Fill in the basic details below to submit your vendor application for admin approval.</p>
                </div>

                {/* Server Error Message */}
                {serverError && (
                    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* General Info */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                            <Store className="h-4 w-4" /> General Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {/* Shop Name */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Shop Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Aman Electronics"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    {...register('shopName', { required: 'Shop name is required' })}
                                />
                                 {errors.shopName && <p className="text-xs text-rose-500 mt-1">{errors.shopName.message}</p>}
                            </div>
                            {/* Business Phone */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Business Phone</label>
                                <input
                                    type="tel"
                                    placeholder="e.g. +91 9876543210"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                     {...register('businessPhone', { 
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Please enter a valid 10-digit number'
                                        }
                                    })}
                                />
                                {errors.businessPhone && <p className="text-xs text-rose-500 mt-1">{errors.businessPhone.message}</p>}
                            </div>
                             {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Shop Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Describe what items or products you want to sell..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                     {...register('description', { 
                                        required: 'Description is required',
                                        minLength: { value: 10, message: 'Description must be at least 10 characters long' }
                                    })}
                                />
                                {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-800 my-6"></div>

                    {/* Shop Address */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Shop Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Street */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Street Address / Local Area</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 123 Main Street, Sector 4"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    {...register('street', { required: 'Street address is required' })}
                                />
                                 {errors.street && <p className="text-xs text-rose-500 mt-1">{errors.street.message}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">City</label>
                                <input
                                    type="text"
                                    placeholder="e.g. New Delhi"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    {...register('city', { required: 'City name is required' })}
                                />
                                {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city.message}</p>}
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">State</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Delhi"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    {...register('state', { required: 'State name is required' })}
                                />
                                {errors.state && <p className="text-xs text-rose-500 mt-1">{errors.state.message}</p>}
                            </div>

                            {/* Pin Code */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Pin Code</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 110001"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    {...register('pinCode', {required: 'Pin code is required',pattern: {value: /^[0-9]{6}$/,message: 'Pin code must be exactly 6 digits'}})}
                                />
                                {errors.pinCode &&<p className="text-xs text-rose-500 mt-1">{errors.pinCode.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...
                            </>
                        ) : (
                            "Submit Application"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VendorApplicationForm;
