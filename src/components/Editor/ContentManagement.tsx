"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const ContentManagement = () => {
  const [activePage, setActivePage] = useState(1);

  const data = [
    { id: "1", title: "Why Subscription-Based Con...", writer: "John Doe", type: "Podcast", status: "Pending", date: "March 15, 2024" },
    { id: "2", title: "Why Subscription-Based Con...", writer: "Alex Carter", type: "Live News", status: "Pending", date: "March 15, 2024" },
    { id: "3", title: "Why Subscription-Based Con...", writer: "Mia Johnson", type: "Story", status: "Needs Revision", date: "March 15, 2024" },
    { id: "4", title: "Why Subscription-Based Con...", writer: "Liam Evans", type: "Live News", status: "Needs Revision", date: "March 15, 2024" },
    { id: "5", title: "Why Subscription-Based Con...", writer: "John Doe", type: "Live News", status: "Needs Revision", date: "March 15, 2024" },
    { id: "6", title: "Why Subscription-Based Con...", writer: "John Doe", type: "Podcast", status: "Published", date: "March 15, 2024" },
  ];
  return (
    <div className="w-full bg-white rounded-[14px] shadow-sm border border-gray-100 overflow-hidden">
      {/* Header & Filters */}
      <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-serif text-[28px] font-semibold text-black tracking-tight">Content Management</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[140px]">
            <select className="w-full appearance-none bg-white border border-gray-200 rounded-[10px] px-4 py-2 font-serif text-sm focus:outline-none">
              <option>All Types</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative min-w-[140px]">
            <select className="w-full appearance-none bg-white border border-gray-200 rounded-[10px] px-4 py-2 font-serif text-sm focus:outline-none">
              <option>All Statuses</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <input type="text" placeholder="Search" className="border border-gray-200 rounded-[10px] px-4 py-2 pl-10 font-serif text-sm focus:outline-none w-64" />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-50">
            <tr>
              <th className="px-8 py-4 font-serif text-sm font-medium text-black">Article Title</th>
              <th className="px-8 py-4 font-serif text-sm font-medium text-black">Writer</th>
              <th className="px-8 py-4 font-serif text-sm font-medium text-black">Type</th>
              <th className="px-8 py-4 font-serif text-sm font-medium text-black">Status</th>
              <th className="px-8 py-4 font-serif text-sm font-medium text-black">Submitted</th>
              <th className="px-8 py-4 font-serif text-sm font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6 font-serif text-sm text-gray-600">{item.title}</td>
                <td className="px-8 py-6 font-serif text-sm text-gray-600">{item.writer}</td>
                <td className="px-8 py-6 font-serif text-sm text-gray-600">{item.type}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1 rounded-full text-[12px] font-medium font-serif ${
                    item.status === "Pending" ? "bg-black text-white" : 
                    item.status === "Published" ? "border border-black text-black" : "bg-gray-100 text-gray-600"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-serif text-sm text-gray-600">{item.date}</td>
                <td className="px-8 py-6">
                  {item.status === "Published" ? (
                    <Link href={`/editor/content/${item.id}`} className="px-6 py-2 bg-[#E2E4F0] text-[#3448D6] rounded-[8px] text-xs font-medium font-serif">View</Link>
                  ) : (
                    <div className="flex gap-2">
                      <Link href={`/editor/content/${item.id}`} className="px-4 py-1.5 bg-[#E2E4F0] text-[#3448D6] rounded-[6px] text-xs font-medium font-serif">Edit</Link>
                      <button className="px-4 py-1.5 bg-[#FDE2E2] text-[#EE264F] rounded-[6px] text-xs font-medium font-serif">Rejected</button>
                      <button className="px-4 py-1.5 bg-[#E2F0E5] text-[#4CAF50] rounded-[6px] text-xs font-medium font-serif">Publish</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-8 flex items-center justify-end gap-2">
        <button className="p-2 border border-gray-200 rounded-[8px] text-gray-400"><ChevronLeft size={18}/></button>
        <button className="w-9 h-9 bg-[#3448D6] text-white rounded-[8px] font-serif text-sm">1</button>
        <button className="w-9 h-9 hover:bg-gray-100 rounded-[8px] font-serif text-sm text-gray-500">2</button>
        <button className="w-9 h-9 hover:bg-gray-100 rounded-[8px] font-serif text-sm text-gray-500">3</button>
        <span className="px-2">...</span>
        <button className="w-9 h-9 hover:bg-gray-100 rounded-[8px] font-serif text-sm text-gray-500">440</button>
        <button className="p-2 border border-gray-200 rounded-[8px] text-gray-400"><ChevronRight size={18}/></button>
      </div>
    </div>
  );
};

export default ContentManagement;