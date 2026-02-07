import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-md"
    >
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500/20 rounded-full"></div>
      </div>
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-xl font-bold text-white tracking-widest uppercase"
      >
        AI Analyzing Feedback...
      </motion.p>
      <p className="text-slate-500 text-sm mt-2">Processing ...</p>
    </motion.div>
  );
}