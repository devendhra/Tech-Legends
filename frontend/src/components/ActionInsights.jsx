import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

export default function ActionInsights({ summary }) {
  const isHighRisk = (summary.negative / summary.total) > 0.3;

  return (
    <div className="grid gap-4">
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-md">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="text-amber-400" size={18} /> Strategic Advice
        </h3>
        
        <div className="space-y-4">
          {isHighRisk ? (
            <div className="flex gap-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
              <AlertTriangle className="text-rose-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Urgent: Churn Risk Detected</p>
                <p className="text-slate-400 text-xs mt-1">Over 30% of feedback is negative. We recommend immediate customer outreach to prevent brand damage.</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <CheckCircle className="text-emerald-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Healthy Sentiment Flow</p>
                <p className="text-slate-400 text-xs mt-1">Positive feedback dominates. Consider leveraging these testimonials for marketing campaigns.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}