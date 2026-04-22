"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const router = useRouter(); // 2. Initialize router
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Log for dev purposes
        console.log("Logging in with:", { email, password, rememberMe });
        
        // 3. Redirect to /admin
        router.push("/editor");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white p-12 md:p-16 rounded-[16px] shadow-lg w-full max-w-[560px] flex flex-col items-start font-sans antialiased border border-gray-100">
                <div className="flex items-center mb-10">
                    <Image 
                        src="/oped (2).png"
                        alt="OPED Logo"
                        width={100}
                        height={80}
                        className="mr-3"
                    />
                </div>
                <h1 className="font-serif text-[28px] font-semibold text-[#000000] mb-3">Welcome!</h1>
                <p className="font-sans text-[14px] text-[#636363] mb-8 font-light">Sign in to continue your account</p>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-5 flex flex-col items-start w-full">
                        <label htmlFor="email" className="font-serif text-[14px] text-[#000000] mb-2 font-medium">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="w-full h-12 px-4 border border-[#E5E5E5] rounded-[8px] text-[14px] font-light placeholder-[#B5B5B5] focus:border-[#3448D6] focus:ring-1 focus:ring-[#3448D6] transition-colors"
                        />
                    </div>

                    <div className="mb-4 flex flex-col items-start w-full">
                        <label htmlFor="password" className="font-serif text-[14px] text-[#000000] mb-2 font-medium">Password</label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                required
                                className="w-full h-12 px-4 pr-12 border border-[#E5E5E5] rounded-[8px] text-[14px] font-light placeholder-[#B5B5B5] focus:border-[#3448D6] focus:ring-1 focus:ring-[#3448D6] transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8 w-full">
                        <div className="flex items-center space-x-2">
                            <input 
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-[#3448D6] border-gray-300 rounded focus:ring-[#3448D6] cursor-pointer"
                            />
                            <label htmlFor="rememberMe" className="text-[12px] text-[#8C8C8C] cursor-pointer font-light">
                                Remember Me
                            </label>
                        </div>
                        <a href="#" className="font-serif-display text-[12px] text-[#EE264F] hover:text-[#EE264F] font-normal">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-[25px] text-white text-[16px] font-semibold flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3448D6] focus:ring-offset-2"
                        style={{
                            background: "linear-gradient(90deg, #343E87 12.02%, #3448D6 50%, #343E87 88.46%)",
                        }}
                    >
                        Log In
                    </button>
                </form>

                <div className="w-full flex justify-between mt-12 text-[12px] text-[#8C8C8C] border-t border-gray-100 pt-6">
                    <p className="font-light">© 2026. OPED. All rights reserved.</p>
                    <a href="#" className="text-[#3448D6] font-serif font-light hover:underline">
                        Terms & Conditions
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;