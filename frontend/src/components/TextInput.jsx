import { useState } from "react";
import { analyzeText } from "../api";
import { Send } from "lucide-react";

export default function TextInput({ setResult, setLoading }) {
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const feedbacks = text.split("\n").map(f => f.trim()).filter(Boolean);
      const data = await analyzeText(feedbacks);
      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative">
      <textarea 
        className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-300 min-h-[150px]"
        onChange={e => setText(e.target.value)}
        placeholder="Enter feedbacks here (one per line)..." 
      />
      <button 
        onClick={submit} 
        className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/20"
      >
        <Send size={18} /> Run Sentiment Analysis
      </button>
    </div>
  );
}