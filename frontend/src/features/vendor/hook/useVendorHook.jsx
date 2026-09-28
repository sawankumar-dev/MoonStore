import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createRequest } from "../api/vendorApi";
import toast from "react-hot-toast";

export const useVendor = () => {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ serverError, setServerError ] = useState('');

    const { 
        register,
        handleSubmit,
        formState: { errors }
     } = useForm({
        defaultValues: {
            shopName: '',
            description: '',
            businessPhone: '',
            street: '',
            city: '',
            state: '',
            pinCode: ''
        }
    })    
    // Form submit hone par chalega
    const onSubmit = async (formData) => {
        console.log(formData)
        setLoading(true);
        setServerError('');
        try {
            const response = await createRequest(formData);
            if (response.data.success) {
                toast.success("Application submitted successfully! Redirecting to home...");
                navigate('/');  
            }
        } catch (err) {
            setServerError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return {
        register,
        handleSubmit,
        errors,
        loading,
        setLoading,
        serverError,
        setServerError,
        onSubmit,
    }
}