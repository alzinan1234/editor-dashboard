"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, TrendingUp } from "lucide-react";

// Mock data matching the prototype's visual peaks
const data = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 18000 },
  { name: "Apr", value: 45000 },
  { name: "May", value: 55000 },
  { name: "Jun", value: 65000 },
  { name: "Jul", value: 15000 },
  { name: "Aug", value: 22000 },
  { name: "Sep", value: 30000 },
  { name: "Oct", value: 68000 },
  { name: "Nov", value: 80000 },
  { name: "Dec", value: 95000 },
];

const PerformanceChart = () => {
  return (
    <div className="w-full bg-white p-8 rounded-[24px] shadow-[0_10px_60px_rgba(0,0,0,0.02)] border border-gray-50 mb-5">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-serif text-[28px] font-semibold text-black tracking-tight">
          Performance Analytics
        </h2>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="font-sans text-[12px] text-gray-400 font-light">Revenue</span>
            <div className="flex items-center gap-1 text-[#4CAF50]">
              <TrendingUp size={14} />
              <span className="font-sans text-[14px] font-medium">4%</span>
            </div>
          </div>
          
          <button className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-[10px] font-sans text-sm text-gray-600 hover:bg-gray-50 transition-all">
            Yearly <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* The Blue Gradient from your prototype */}
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3448D6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3448D6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              vertical={true} 
              horizontal={true} 
              stroke="#F0F0F0" 
              strokeDasharray="0" 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#B5B5B5', fontSize: 13, fontFamily: 'serif' }}
              dy={20}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#B5B5B5', fontSize: 13, fontFamily: 'serif' }}
              ticks={[0, 10000, 20000, 50000, 100000]}
              tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
            />

            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                fontFamily: 'sans-serif' 
              }} 
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3448D6"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#chartGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;