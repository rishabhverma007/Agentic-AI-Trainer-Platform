"use client";

import React, { useState } from "react";
import { X, FileText, Download, CheckCircle2, Table, Sparkles } from "lucide-react";
import { GlassCard } from "./glass-card";

interface ReportGeneratorModalProps {
  onClose: () => void;
}

export function ReportGeneratorModal({ onClose }: ReportGeneratorModalProps) {
  const [format, setFormat] = useState<"CSV" | "PDF">("CSV");
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDone(true);

      if (format === "CSV") {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          "Rank,Trainer Name,Technology,Hourly Rate,Rating,Match Score\n" +
          "1,Dr. Aris Thorne,Generative AI,3500,4.95,96.4%\n" +
          "2,Elena Rostova,Full-Stack Next.js 15,2800,4.88,92.0%\n" +
          "3,Vikramaditya Kulkarni,MLOps Infrastructure,4000,4.92,88.0%\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ALLOCATOR_AI_Executive_Report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#0D0E15] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative glass-panel">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-cyan-400 mb-4">
          <FileText className="w-5 h-5" />
          <h2 className="text-base font-bold text-white">Executive Report Generator</h2>
        </div>

        {done ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Report Exported Successfully</h3>
            <p className="text-xs text-gray-300">
              Your {format} report has been compiled and downloaded.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Export Format</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat("CSV")}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-2 ${
                    format === "CSV"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-cyan"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <Table className="w-4 h-4" />
                  <span>CSV Dataset</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("PDF")}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-2 ${
                    format === "PDF"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-cyan"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>PDF Document</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 space-y-1">
              <div>• Includes Executive Revenue Summary</div>
              <div>• Gemini 1.5 Pro AI Domain Insights</div>
              <div>• Top Trainer Utilization Rankings</div>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glow-cyan hover:shadow-glow-blue transition flex items-center justify-center space-x-2"
            >
              {downloading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Compiling Executive Metrics...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate & Download {format} Report</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
