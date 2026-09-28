import { NavLink } from "react-router";
import { Mail, Lock, LogIn } from 'lucide-react'; // Professional icons
import { useAuth } from '../../hooks/useAuthHook';

const LoginPage = () => {
    const { navigate, register, handleSubmit, loginFormHook, errors } = useAuth()
    return (
        <div className="flex bg-gray-800 justify-center items-center py-8 min-h-screen">
            
            {/* Login Card Container */}
            <div className="w-full max-w-md bg-gray-900/60 border border-gray-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/40">
                
                {/* Header Section (Consistant with Register Page) */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-3 border border-green-500/20">
                        <LogIn className="text-green-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
                    <p className="text-sm text-gray-400 mt-1">Please enter your details to sign in.</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(loginFormHook)} className="space-y-5">
                    
                    {/* Email Input */}
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
                                placeholder="Enter your email"
                                className={`w-full bg-gray-950/50 border ${errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-gray-800 focus:border-green-500'} text-gray-100 placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-400 font-medium pl-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <Lock size={18} />
                            </span>
                            <input 
                                type="password" 
                                {...register("password", { required: "Password is required" })} 
                                placeholder="••••••••" 
                                className={`w-full bg-gray-950/50 border ${errors.password ? 'border-red-500/60 focus:border-red-500' : 'border-gray-800 focus:border-green-500'} text-gray-100 placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                            />
                        </div>
                        {errors.password && <p className="text-xs text-red-400 font-medium pl-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-gray-950 font-semibold py-3 px-4 rounded-lg text-sm transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-green-500/10 mt-2"
                    >
                        Sign In
                    </button>

                    {/* Footer Link */}
                    <div className="text-center pt-4 border-t border-gray-800/60 mt-4">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <NavLink 
                                to='/auth/register' 
                                className="text-green-400 hover:text-green-300 font-medium hover:underline transition-all duration-150"
                            >
                                Register
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
