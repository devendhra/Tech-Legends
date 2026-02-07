import { CheckCircle2, XCircle, MinusCircle, Users } from "lucide-react";

function StatCard({ label, value, icon, colorClass, description }) {
  return (
    <div className="group relative overflow-hidden bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-md transition-all hover:border-slate-700 hover:bg-slate-900/60">
      {/* Decorative Gradient Glow */}
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${colorClass.replace('text', 'bg')}`} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${colorClass}`}>
            {icon}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            {label}
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <div className={`text-5xl font-black tracking-tighter ${colorClass}`}>
            {value}
          </div>
          <span className="text-slate-600 text-xs font-medium">units</span>
        </div>
        
        <p className="mt-2 text-slate-500 text-[10px] font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function StatCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Positive" 
        value={summary.positive} 
        icon={<CheckCircle2 size={20} />} 
        colorClass="text-emerald-400" 
        description="Satisfied customer interactions identified by AI."
      />
      <StatCard 
        label="Negative" 
        value={summary.negative} 
        icon={<XCircle size={20} />} 
        colorClass="text-rose-400" 
        description="Critical issues requiring immediate attention."
      />
      <StatCard 
        label="Neutral" 
        value={summary.neutral} 
        icon={<MinusCircle size={20} />} 
        colorClass="text-amber-400" 
        description="General feedback with balanced sentiment."
      />
    </div>
  );
}