function ProgressBar({ label, value, percent, color }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-400">{label}</span>
        <span className={`text-${color}-400`}>{percent}%</span>
      </div>

      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${color}-500 transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function SentimentProgress({ summary }) {
  const total = summary.total;

  return (
    <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl space-y-4">
      <h3 className="font-bold text-white mb-2">Sentiment Distribution</h3>

      <ProgressBar
        label="Positive"
        value={summary.positive}
        percent={Math.round((summary.positive / total) * 100)}
        color="emerald"
      />

      <ProgressBar
        label="Negative"
        value={summary.negative}
        percent={Math.round((summary.negative / total) * 100)}
        color="rose"
      />

      <ProgressBar
        label="Neutral"
        value={summary.neutral}
        percent={Math.round((summary.neutral / total) * 100)}
        color="amber"
      />
    </div>
  );
}
