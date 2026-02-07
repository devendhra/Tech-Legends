import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

export default function ResultDashboard({ results }) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 font-bold">Feedback Breakdown</div>
      <div className="max-h-[400px] overflow-y-auto">
        {results.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
            {item.sentiment === "Positive" && <CheckCircle2 className="text-emerald-500 shrink-0" />}
            {item.sentiment === "Negative" && <XCircle className="text-rose-500 shrink-0" />}
            {item.sentiment === "Neutral" && <MinusCircle className="text-amber-500 shrink-0" />}
            <p className="text-slate-300 text-sm">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}