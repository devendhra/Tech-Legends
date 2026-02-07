// import { Brain, Clock } from "lucide-react";

// export default function SummaryCard({ aiSummary, timestamp }) {
//   const formattedTime = timestamp ? new Date(timestamp).toLocaleString() : 'N/A';

//   return (
//     <div className="bg-gradient-to-br from-blue-700/20 to-transparent border border-blue-600/30 p-8 rounded-[2rem] backdrop-blur-md shadow-lg">
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-white font-bold text-xl flex items-center gap-2">
//           <Brain className="text-blue-400" size={24} /> AI Executive Summary
//         </h3>
//         <span className="text-slate-500 text-xs flex items-center gap-1">
//           <Clock size={12} /> {formattedTime}
//         </span>
//       </div>
//       <p className="text-slate-300 text-base leading-relaxed italic">{aiSummary}</p>
//     </div>
//   );
// }