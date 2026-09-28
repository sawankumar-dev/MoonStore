import { NavLink, useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { User, Mail, Lock, UserPlus } from 'lucide-react'; // Premium UI ke liye icons
import { setUser } from "../../state/authSlice";
import { useAuth } from "../../hooks/useAuthHook";

const RegisterPage = () => {
    const { navigate, register, handleSubmit, reset, errors, registerFormHook } = useAuth();
  return (
    <div className="flex bg-gray-800 justify-center items-center py-8 min-h-screen">
        
        {/* Form Container Card */}
        <div className="w-full max-w-md bg-gray-900/60 border border-gray-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/40">
            
            {/* Header Section */}
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-3 border border-green-500/20">
                    <UserPlus className="text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Create an Account</h2>
                <p className="text-sm text-gray-400 mt-1">Get started with Crescendo today.</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(registerFormHook)} className="space-y-5">
                
                {/* Name Input Group */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Full Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <User size={18} />
                        </span>
                        <input 
                            {...register("name", { required: "Name is required" })}
                            type="text"  
                            placeholder="John Doe"
                            className={`w-full bg-gray-950/50 border ${errors.name ? 'border-red-500/60 focus:border-red-500' : 'border-gray-800 focus:border-green-500'} text-gray-100 placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                        />
                    </div>
                    {errors.name && <p className="text-xs text-red-400 font-medium pl-1">{errors.name.message}</p>}
                </div>

                {/* Email Input Group */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Email Address</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Mail size={18} />
                        </span>
                        <input 
                            type="email" 
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}  
                            placeholder="john@gmail.com"
                            className={`w-full bg-gray-950/50 border ${errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-gray-800 focus:border-green-500'} text-gray-100 placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 font-medium pl-1">{errors.email.message}</p>}
                </div>

                {/* Password Input Group */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Password</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Lock size={18} />
                        </span>
                        <input 
                            type="password" 
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })} 
                            placeholder="••••••" 
                            className={`w-full bg-gray-950/50 border ${errors.password ? 'border-red-500/60 focus:border-red-500' : 'border-gray-800 focus:border-green-500'} text-gray-100 placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                        />
                    </div>
                    {errors.password && <p className="text-xs text-red-400 font-medium pl-1">{errors.password.message}</p>}
                </div>

                {/* Action Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-gray-950 font-semibold py-3 px-4 rounded-lg text-sm transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-green-500/10 hover:shadow-green-500/20 mt-2"
                >
                    Create Account
                </button>   

                {/* Redirect Link */}
                <div className="text-center pt-4 border-t border-gray-800/60 mt-4">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <NavLink 
                            to='/auth' 
                            className="text-green-400 hover:text-green-300 font-medium hover:underline transition-all duration-150"
                        >
                            Sign In
                        </NavLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage
