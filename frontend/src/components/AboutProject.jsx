import { ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function AboutProject() {
  return (
    <div className="bg-slate-800/30 border border-slate-700 p-8 rounded-3xl mb-12">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
          Uncover the Pulse of Your Feedback.
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Feedify uses advanced AI to instantly categorize bulk feedback into 
          <strong> Positive, Negative, or Neutral</strong> sentiments. Whether it's a 
          list of comments or a complex PDF/Excel report, we turn raw data into 
          actionable insights.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard icon={<Zap className="text-yellow-400"/>} title="Instant AI" desc="Powered by GPT-3.5 for high accuracy." />
          <FeatureCard icon={<ShieldCheck className="text-emerald-400"/>} title="Multi-Format" desc="Upload PDFs, Excel, or Word docs." />
          <FeatureCard icon={<BarChart3 className="text-blue-400"/>} title="Visual Stats" desc="Real-time distribution analytics." />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
      <div className="mb-2">{icon}</div>
      <h4 className="font-bold text-white text-sm uppercase tracking-tighter">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}