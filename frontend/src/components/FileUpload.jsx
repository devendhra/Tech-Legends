import { uploadFile } from "../api";
import { UploadCloud } from "lucide-react";

export default function FileUpload({ setResult, setLoading }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = await uploadFile(file);
      setResult(data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-800 rounded-2xl cursor-pointer bg-slate-900/50 hover:bg-slate-800/50 hover:border-emerald-500/50 transition-all group">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadCloud className="w-10 h-10 mb-3 text-slate-500 group-hover:text-emerald-400 group-hover:scale-110 transition-transform" />
        <p className="mb-2 text-sm text-slate-400 font-semibold">Click to upload or drag and drop</p>
        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest text-[10px]">PDF, DOCX, XLSX, or CSV</p>
      </div>
      <input type="file" className="hidden" onChange={handleUpload} />
    </label>
  );
}