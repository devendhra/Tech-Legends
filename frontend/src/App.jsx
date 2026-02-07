import { useState } from "react";
import TextInput from "./components/TextInput";
import FileUpload from "./components/FileUpload";
import ResultDashboard from "./components/ResultDashboard";
import AboutProject from "./components/AboutProject";
import LoadingState from "./components/LoadingState";
import ActionInsights from "./components/ActionInsights";
import SentimentDonutChart from "./components/SentimentDonutChart"; 
import StatCards from "./components/StatCards"; 
import Notification from "./components/Notification"; 
import { LayoutDashboard, MessageSquare, FileUp, Sparkles, Download, ArrowRight } from "lucide-react";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); 


  const happinessScore = result 
    ? Math.round((result.summary.positive / result.summary.total) * 100) 
    : 0;

  const handleAnalysisComplete = (data) => {
    setResult(data);
    setLoading(false);
    setNotification({ message: 'Analysis complete!', type: 'success' });
  };

  const handleError = (message) => {
    setLoading(false);
    setNotification({ message: `Error: ${message}`, type: 'error' });
  };

  const handleClear = () => {
    setResult(null);
    setNotification({ message: 'Dashboard cleared.', type: 'info' });
  };

  const handleExportReport = () => {
    setNotification({ message: 'Generating full report (Coming Soon!)', type: 'info' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24">
      {loading && <LoadingState />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Navigation */}
      <nav className="border-b border-white/5 bg-slate-900/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Sparkles size={22} className="text-white fill-white/20"/>
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase italic text-white">
              Feedify<span className="text-blue-500">.</span>
            </span>
          </div>
          
          {result && (
             <button 
                onClick={handleExportReport}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-xs font-black uppercase hover:bg-blue-500 hover:text-white transition-all">
                <Download size={14} /> Export Report
             </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <AboutProject /> {/* Consider placing AboutProject after Hero */}

        <div className="grid lg:grid-cols-12 gap-12">
          {/* INPUT SECTION */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare size={120} />
              </div>
              <h2 className="flex items-center gap-3 font-bold text-2xl text-white mb-6 relative z-10">
                <MessageSquare className="text-blue-500" /> Text Analysis
              </h2>
              <TextInput 
                setResult={handleAnalysisComplete} 
                setLoading={setLoading} 
                onError={handleError} // Pass error handler
              />
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileUp size={120} />
              </div>
              <h2 className="flex items-center gap-3 font-bold text-2xl text-white mb-6 relative z-10">
                <FileUp className="text-emerald-500" /> Batch Processing
              </h2>
              <FileUpload 
                setResult={handleAnalysisComplete} 
                setLoading={setLoading} 
                onError={handleError} // Pass error handler
              />
            </div>
          </div>

          {/* DASHBOARD SECTION */}
          <div className="lg:col-span-7 space-y-8 sticky top-24 self-start"> {/* Sticky for better UX */}
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-end justify-between mb-8">
                    <div>
                      <h2 className="font-black text-4xl text-white tracking-tighter">AI Dashboard</h2>
                      <p className="text-slate-500 text-sm">Real-time processing complete.</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                       <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Happiness Score</p>
                         <span className={`text-5xl font-black ${happinessScore > 60 ? 'text-emerald-500' : happinessScore > 30 ? 'text-amber-500' : 'text-rose-500'}`}>
                           {happinessScore}%
                         </span>
                       </div>
                       <button 
                          onClick={handleClear} 
                          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg transition-colors flex items-center gap-2">
                           Clear <ArrowRight size={12}/>
                       </button>
                    </div>
                </div>

                <div className="space-y-6">
                   {/* <SummaryCard aiSummary={result.ai_summary} timestamp={result.timestamp} /> NEW */}
                   <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                      <SentimentDonutChart summary={result.summary} /> {/* NEW */}
                      <StatCards summary={result.summary} /> {/* NEW */}
                   </div>
                   <ActionInsights summary={result.summary} />
                   <ResultDashboard results={result.results} />
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center group">
                <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mb-6 border border-slate-800 group-hover:border-blue-500/50 transition-colors">
                  <LayoutDashboard size={40} className="text-slate-700 group-hover:text-blue-500 transition-colors"/>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Matrix Standby</h3>
                <p className="max-w-[280px] text-slate-500 text-sm leading-relaxed">
                  The intelligence engine is ready. Feed the system data to generate your visual sentiment matrix.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-12 text-center">
        <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">
          Feedify © 2026 
        </p>
      </footer>
    </div>
  );
}