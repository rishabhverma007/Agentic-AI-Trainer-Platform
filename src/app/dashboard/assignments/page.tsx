"use client";

import React, { useState } from "react";
import { useAssignments } from "@/hooks/use-assignments";
import { useAssignmentWorkflow } from "@/hooks/use-assignment-workflow";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable, Column } from "@/components/ui/data-table";
import { ApprovalModal } from "@/components/ui/approval-modal";
import { ContractViewerModal } from "@/components/ui/contract-viewer-modal";
import { VerticalTimeline } from "@/components/ui/vertical-timeline";
import { formatCurrency } from "@/lib/utils";
import { FileText, ShieldCheck, Clock, Eye } from "lucide-react";

export default function AssignmentsPage() {
  const { data: assignments = [], isLoading } = useAssignments();
  const { approveAssignment } = useAssignmentWorkflow();
  const [selectedForApproval, setSelectedForApproval] = useState<any>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<any[] | null>(null);

  const columns: Column<any>[] = [
    {
      header: "Institution & Technology",
      accessorKey: "collegeName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-white">{row.collegeName}</div>
          <div className="text-[11px] text-cyan-300 font-medium">{row.technology}</div>
        </div>
      ),
    },
    {
      header: "Assigned Trainer",
      accessorKey: "trainerName",
      sortable: true,
      cell: (row) => <div className="font-semibold text-gray-200">{row.trainerName}</div>,
    },
    {
      header: "Match Score",
      accessorKey: "matchScore",
      sortable: true,
      cell: (row) => <span className="font-bold text-emerald-400 font-mono">{row.matchScore || 96.4}%</span>,
    },
    {
      header: "Total Budget",
      accessorKey: "totalBudget",
      sortable: true,
      cell: (row) => <span className="font-mono text-white font-bold">{formatCurrency(row.totalBudget)}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const isApproved = row.status === "APPROVED" || row.status === "TRAINER_ACCEPTED";
        return (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            isApproved ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-amber-500/10 text-amber-400 border-amber-500/25"
          }`}>{row.status}</span>
        );
      },
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          {row.status === "PENDING_APPROVAL" ? (
            <button onClick={() => setSelectedForApproval(row)}
              className="px-3 py-1 rounded-lg bg-cyan-500 text-white font-bold text-xs hover:bg-cyan-400 transition flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Review & Approve</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5">
              <button onClick={() => setSelectedContract({ contractNumber: "CTR-2026-901", status: row.contractStatus })}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-cyan-300 flex items-center space-x-1 transition">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Contract PDF</span>
              </button>
              <button onClick={() => setSelectedTimeline([
                { time: "09:30", step: "Request Submitted", message: "College submitted requirement." },
                { time: "09:31", step: "AI Vector Match", message: "Matched with 96.4% score." },
                { time: "09:32", step: "Manager Approved", message: "Manager issued allocation." },
                { time: "09:33", step: "Contract Sent", message: "Digital agreement sent to trainer." },
                { time: "09:34", step: "Trainer Responded", message: "Trainer accepted assignment." },
              ])}
                className="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-foreground-muted hover:text-white transition"
                title="View Timeline">
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/8 to-blue-500/10 border border-emerald-500/20 p-6 sm:p-8">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, #10B981, transparent 70%)", filter: "blur(50px)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">Assignments & Contract Governance</h1>
            </div>
            <p className="text-xs text-foreground-muted">
              Manager approval review, digital PDF contract generation, and trainer accept/decline response management.
            </p>
          </div>
        </div>

        <DataTable data={assignments} columns={columns} isLoading={isLoading}
          searchPlaceholder="Filter assignments by college or trainer..." filterKey="collegeName" pageSize={10} />

        {/* Timeline Modal */}
        {selectedTimeline && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-lg glass border border-cyan-500/30 rounded-2xl p-6 relative">
              <button onClick={() => setSelectedTimeline(null)}
                className="absolute top-4 right-4 text-foreground-muted hover:text-white transition">✕</button>
              <VerticalTimeline events={selectedTimeline} />
            </div>
          </div>
        )}

        {/* Approval Modal */}
        {selectedForApproval && (
          <ApprovalModal assignment={selectedForApproval}
            onConfirm={async () => { await approveAssignment(selectedForApproval.id); }}
            onClose={() => setSelectedForApproval(null)} />
        )}

        {/* Contract Modal */}
        {selectedContract && (
          <ContractViewerModal contract={selectedContract} onClose={() => setSelectedContract(null)} />
        )}
      </div>
    </DashboardLayout>
  );
}
