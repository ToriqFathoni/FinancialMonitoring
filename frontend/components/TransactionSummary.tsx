"use client";

import React from 'react';
import { Summary } from '../types/transaction';
import { formatRupiah } from '../utils/formatters';

interface Props {
  summary: Summary;
}

export function TransactionSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center text-sm font-medium text-slate-500 mb-3">
          Total Pemasukan
        </div>
        <div suppressHydrationWarning className="text-3xl font-bold text-emerald-600 mt-auto">
          {formatRupiah(summary.income)}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center text-sm font-medium text-slate-500 mb-3">
          Total Pengeluaran
        </div>
        <div suppressHydrationWarning className="text-3xl font-bold text-rose-600 mt-auto">
          {formatRupiah(summary.expense)}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
        <div className="flex items-center text-sm font-medium text-slate-500 mb-3 relative z-10">
          Sisa Saldo Saat Ini
        </div>
        <div suppressHydrationWarning className="text-3xl font-extrabold text-slate-900 mt-auto relative z-10">
          {formatRupiah(summary.balance)}
        </div>
      </div>
    </div>
  );
}
