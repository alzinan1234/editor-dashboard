"use client";

import React from "react";
import { ArrowLeft, Edit3, Clock, MessageSquare, XCircle, CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";

const ContentReviewPage = () => {
  const activeGradient = "linear-gradient(90deg, #343E87 12.02%, #3448D6 50%, #343E87 88.46%)";

  return (
    <div className=" mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/editor/content" className="p-2 bg-[#E2E4F0] text-[#3448D6] rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-serif text-[22px] font-semibold text-black tracking-tight">Content Review</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-8 border border-gray-50 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[28px] font-semibold">Content Details</h2>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-[10px] font-serif text-sm text-gray-600">
              <Edit3 size={16} /> Edit
            </button>
          </div>
          <div className="w-full aspect-[16/9] bg-gray-100 rounded-[16px] overflow-hidden relative">
             <img src="/billboard-sample.png" alt="Article" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-[24px] font-bold leading-tight">
              The Future of Digital Media and the Changing Voice of Independent Journalism
            </h3>
            <div className="space-y-4 font-serif text-gray-600 text-[15px] leading-relaxed">
              <p>As technology evolves and reader habits shift, independent platforms are redefining how stories are told...</p>
              <h4 className="font-bold text-black mt-8">The Future of Digital Media...</h4>
              <p>I didn't want a regular job, so my friend and I decided to start a business selling digital products...</p>
              <p>Eventually, we found a product to sell. My friend handled Facebook ads, and I created the ad designs in Canva...</p>
            </div>
          </div>
        </div>
        {/* Sidebar Metadata & Actions */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white rounded-[24px] p-8 border border-gray-50 shadow-sm space-y-6">
            <h3 className="font-serif text-[20px] font-semibold">Metadata</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-serif text-[12px] text-gray-400">Date</label>
                <div className="w-full p-4 border border-gray-100 rounded-[12px] font-serif text-sm">March 15, 2024</div>
              </div>
              <div className="space-y-2">
                <label className="font-serif text-[12px] text-gray-400">Writer</label>
                <div className="w-full p-4 border border-gray-100 rounded-[12px] font-serif text-sm">John Doe</div>
              </div>
              <div className="space-y-2">
                <label className="font-serif text-[12px] text-gray-400">Type</label>
                <div className="w-full p-4 border border-gray-100 rounded-[12px] font-serif text-sm">Live News</div>
              </div>
              <div className="space-y-2">
                <label className="font-serif text-[12px] text-gray-400 font-medium">Tags</label>
                <input type="text" placeholder="Add tags" className="w-full p-4 border border-gray-100 rounded-[12px] font-serif text-sm outline-none" />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-serif text-sm font-medium">Premium Story</span>
                <div className="w-12 h-6 bg-[#3448D6] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-serif text-[12px] text-gray-400">Category</label>
                <div className="relative">
                  <select className="w-full appearance-none p-4 border border-gray-100 rounded-[12px] font-serif text-sm focus:outline-none">
                    <option>Business</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions Card */}
          <div className="bg-white rounded-[24px] p-8 border border-gray-50 shadow-sm space-y-4">
            <h3 className="font-serif text-[20px] font-semibold">Actions</h3>
            <button className="w-full py-4 border border-black rounded-full font-serif text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
              <Clock size={18} /> Approve & Schedule
            </button>
            <button className="w-full py-4 border border-black rounded-full font-serif text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
              <MessageSquare size={18} /> Request Revision
            </button>
            <button className="w-full py-4 bg-[#EE264F] text-white rounded-full font-serif text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-red-200">
              <XCircle size={18} /> Rejected
            </button>
            <button 
              className="w-full py-4 text-white rounded-full font-serif text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              style={{ background: activeGradient }}
            >
              <CheckCircle2 size={18} /> Approve & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentReviewPage;
