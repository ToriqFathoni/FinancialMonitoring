"use client";

import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { Transaction } from '../types/transaction';
import { formatDate, formatRupiah } from '../utils/formatters';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionTable({ transactions, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
        <h2 className="text-lg font-semibold text-slate-800">Riwayat Transaksi</h2>
        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
          {transactions.length} Data
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Tanggal</th>
              <th className="px-6 py-4 border-b border-slate-200">Keterangan</th>
              <th className="px-6 py-4 border-b border-slate-200">Tipe</th>
              <th className="px-6 py-4 border-b border-slate-200 text-right">Nominal</th>
              <th className="px-6 py-4 border-b border-slate-200 text-center">Bukti</th>
              <th className="px-6 py-4 border-b border-slate-200 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                  Belum ada data transaksi.
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
                <tr key={trx._id} className="hover:bg-slate-50/80 transition-colors group">
                  <td suppressHydrationWarning className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {formatDate(trx.tanggal)}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {trx.keterangan}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                      trx.tipe === 'pemasukan' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {trx.tipe === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                    </span>
                  </td>
                  <td suppressHydrationWarning className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${
                    trx.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-slate-900'
                  }`}>
                    {trx.tipe === 'pemasukan' ? '+' : '-'}{formatRupiah(trx.nominal)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {trx.buktiTransfer ? (
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); window.open(`http://localhost:5000/${trx.buktiTransfer}`, '_blank'); }}
                        className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Lihat Bukti"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-slate-300 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDelete(trx._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors focus:outline-none opacity-0 group-hover:opacity-100"
                      title="Hapus Transaksi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
