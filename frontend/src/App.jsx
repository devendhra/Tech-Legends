import { useState } from "react";
import TextInput from "./components/TextInput";
import FileUpload from "./components/FileUpload";
import SentimentProgress from "./components/SentimentProgress";
import ResultDashboard from "./components/ResultDashboard";
import AboutProject from "./components/AboutProject";
import LoadingState from "./components/LoadingState"; // NEW
import { LayoutDashboard, MessageSquare, FileUp } from "lucide-react";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // CONTROL STATE

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans">
      {loading && <LoadingState />}

      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <LayoutDashboard size={24} className="text-white"/>
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Feedify
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AboutProject />

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="p-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-[2.5rem]">
              <div className="bg-[#020617] p-8 rounded-[2.3rem] border border-slate-800/50 shadow-2xl">
                <h2 className="flex items-center gap-3 font-bold text-2xl text-white mb-6">
                  <MessageSquare className="text-blue-500" /> Analyze Text
                </h2>
                <TextInput setResult={setResult} setLoading={setLoading} />
              </div>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
              <span className="relative bg-[#020617] px-4 text-slate-600 font-black text-sm tracking-[0.2em]">SYSTEM_SPLIT</span>
            </div>

            <div className="p-1 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-[2.5rem]">
              <div className="bg-[#020617] p-8 rounded-[2.3rem] border border-slate-800/50 shadow-2xl">
                <h2 className="flex items-center gap-3 font-bold text-2xl text-white mb-6">
                  <FileUp className="text-emerald-500" /> Batch Processing
                </h2>
                <FileUpload setResult={setResult} setLoading={setLoading} />
              </div>
            </div>
          </div>

          <div className="space-y-8 sticky top-24 self-start">
            {result ? (
              <div className="animate-in fade-in slide-in-from-right duration-700">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="font-bold text-2xl text-white tracking-tight">Intelligence Report</h2>
                   <button onClick={() => setResult(null)} className="text-xs text-slate-500 hover:text-white transition-colors uppercase font-bold">Clear All</button>
                </div>
                <div className="space-y-6">
                   <SentimentProgress summary={result.summary} />
                   <ResultDashboard results={result.results} />
                </div>
              </div>
            ) : (
              <div className="h-[600px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center opacity-40 hover:opacity-100 transition-opacity">
                <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                  <LayoutDashboard size={40} className="text-slate-700"/>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">No Active Data</h3>
                <p className="max-w-[250px] text-slate-500 text-sm">Upload a document or paste text to generate your sentiment matrix.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}