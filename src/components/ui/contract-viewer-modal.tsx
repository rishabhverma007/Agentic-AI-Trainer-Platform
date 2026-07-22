"use client";

import React from "react";
import { X, FileText, Download, CheckCircle2 } from "lucide-react";

interface ContractViewerModalProps {
  contract: any;
  onClose: () => void;
}

export function ContractViewerModal({ contract, onClose }: ContractViewerModalProps) {
  if (!contract) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0D0E15] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative glass-panel">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-cyan-400 mb-4">
          <FileText className="w-5 h-5" />
          <h2 className="text-base font-bold text-white">Digital Contract Document #{contract.contractNumber || "CTR-2026-901"}</h2>
        </div>

        <div className="p-4 rounded-xl bg-[#09090B] border border-white/10 font-mono text-xs text-gray-300 max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed">
          {contract.content || `
================================================================================
                    ALLOCATOR.AI ENTERPRISE SERVICE AGREEMENT
================================================================================
CONTRACT REF: ${contract.contractNumber || "CTR-2026-901"}
STATUS: ${contract.status || "SIGNED"}

PARTIES:
1. INSTITUTION: IIT Delhi - Dept of CSE
2. TRAINER: Dr. Aris Thorne
3. PLATFORM: ALLOCATOR.AI Inc.

TERMS & SCOPE OF WORK:
- Technology Domain: Generative AI & Agentic Workflows
- Bootcamp Schedule: 2026-08-10 to 2026-08-15
- Total Contract Fee: ₹1,25,000

SIGNATURE BLOCKS:
[VERIFIED DIGITAL SIGNATURE: ALLOCATOR.AI SYSTEM]
[VERIFIED DIGITAL SIGNATURE: IIT DELHI DEAN]
[VERIFIED DIGITAL SIGNATURE: DR. ARIS THORNE]
================================================================================
          `}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Digitally Verified & Encrypted</span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={contract.pdfUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Contract</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
