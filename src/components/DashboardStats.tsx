// import React from 'react';
// import { FileText, Calendar, Globe } from 'lucide-react';

// const StatsCard = ({ title, value, icon: Icon }) => (
//   <div className="bg-white p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 flex items-center justify-between">
//     <div className="space-y-4">
//       <h3 className="font-serif text-[18px] text-[#000000] font-medium">{title}</h3>
//       <p className="font-serif text-[42px] font-bold text-black leading-none">{value}</p>
//     </div>
//     <div className="w-16 h-16 bg-[#E9ECFF] rounded-[14px] flex items-center justify-center">
//       <Icon className="text-[#3448D6] w-8 h-8" strokeWidth={1.5} />
//     </div>
//   </div>
// );

// const DashboardStats = () => {
//   const stats = [


//     { title: "Pending Reviews", value: "1548", icon: FileText },
//     { title: "Scheduled Content", value: "56", icon: Calendar },
//     { title: "Total Published", value: "158", icon: Globe },
    

//   ];
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 ">
//       {stats.map((stat, index) => (
//         <StatsCard key={index} {...stat} />
//       ))}
//     </div>
//   );
// };

 
// export default DashboardStats;