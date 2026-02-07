import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  Positive: '#10B981', // Emerald
  Neutral: '#F59E0B',  // Amber
  Negative: '#EF4444', // Rose
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/90 backdrop-blur-md p-3 rounded-lg border border-slate-600 shadow-xl text-slate-100 text-sm">
        <p className="font-bold text-white mb-1">{payload[0].name}</p>
        <p>Count: {payload[0].value}</p>
        <p>Percentage: {payload[0].payload.percent.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

export default function SentimentDonutChart({ summary }) {
  const data = [
    { name: 'Positive', value: summary.positive, percent: (summary.positive / summary.total) * 100 },
    { name: 'Neutral', value: summary.neutral, percent: (summary.neutral / summary.total) * 100 },
    { name: 'Negative', value: summary.negative, percent: (summary.negative / summary.total) * 100 },
  ].filter(item => item.value > 0); // Only show segments that have data

  if (summary.total === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-md h-[300px] flex items-center justify-center">
        <p className="text-slate-600 italic">No data to display chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-md h-[300px]">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">Sentiment Overview</h3>
      <ResponsiveContainer width="100%" height={225}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} stroke={COLORS[entry.name]} />
            ))}
          </Pie>
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} 
            formatter={(value) => <span className="text-slate-400">{value} ({data.find(d => d.name === value)?.percent.toFixed(1)}%)</span>}
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}