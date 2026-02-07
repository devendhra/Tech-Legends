import { useState } from "react";
import { analyzeFeedback } from "./api";
import { Sparkles, Send, BarChart3, MessageSquare, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

function App() {
  const [feedbacks, setFeedbacks] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const feedbackArray = feedbacks
      .split("\n")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload = {
      user_id: "user-12345",
      feedbacks: feedbackArray
    };

    const res = await analyzeFeedback(payload);
    setResult(res.data);
  };


  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header / Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              FEED<span className="text-blue-500">IFY</span>
            </span>
          </div>
          <div className="hidden md:block text-sm text-slate-400 font-medium">
            AI-Powered Sentiment Engine
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-white">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                Input Feedbacks
              </h2>
              <textarea
                className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-300 placeholder:text-slate-600"
                rows="8"
                placeholder="Paste your customer reviews here... (One per line)"
                onChange={(e) => setFeedbacks(e.target.value)}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !feedbacks.trim()}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
              >
                {loading ? "Analyzing..." : "Analyze Sentiment"}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            {!result ? (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500">
                <BarChart3 className="w-12 h-12 mb-4 opacity-20" />
                <p>Run analysis to see detailed insights</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Total" value={result.summary.total} color="blue" />
                  <StatCard label="Positive" value={result.summary.positive} icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} color="emerald" />
                  <StatCard label="Negative" value={result.summary.negative} icon={<XCircle className="w-4 h-4 text-rose-400" />} color="rose" />
                  <StatCard label="Neutral" value={result.summary.neutral} icon={<MinusCircle className="w-4 h-4 text-amber-400" />} color="amber" />
                </div>

                {/* Detailed List */}
                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/60">
                    <h3 className="font-bold text-white">Analysis Breakdown</h3>
                  </div>
                  <div className="divide-y divide-slate-700/50 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {result.results.map((item, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-700/30 transition-colors flex items-start justify-between gap-4">
                        <p className="text-slate-300 text-sm leading-relaxed">{item.feedback}</p>
                        <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-md tracking-wider ${getSentimentStyle(item.sentiment)}`}>
                          {item.sentiment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components & Logic
function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: "text-blue-400 bg-blue-400/10",
    emerald: "text-emerald-400 bg-emerald-400/10",
    rose: "text-rose-400 bg-rose-400/10",
    amber: "text-amber-400 bg-amber-400/10",
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700 p-4 rounded-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className={`text-2xl font-black ${colors[color].split(' ')[0]}`}>{value}</div>
    </div>
  );
}

function getSentimentStyle(sentiment) {
  const s = sentiment.toLowerCase();
  if (s === 'positive') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
  if (s === 'negative') return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
  return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
}

export default App;