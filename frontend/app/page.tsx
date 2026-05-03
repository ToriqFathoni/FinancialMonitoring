"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction } from '../types/transaction';
import { TransactionSummary } from '../components/TransactionSummary';
import { TransactionTable } from '../components/TransactionTable';
import { TransactionModal } from '../components/TransactionModal';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.tipe === 'pemasukan') {
          acc.income += curr.nominal;
          acc.balance += curr.nominal;
        } else {
          acc.expense += curr.nominal;
          acc.balance -= curr.nominal;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTransaction = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        fetchTransactions();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8 relative">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Monitoring</h1>
          <p className="text-sm text-slate-500 mt-1">Lihat dan Pantau Terus Kondisi Keuanganmu</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Catat Transaksi
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <TransactionSummary summary={summary} />

        <TransactionTable transactions={transactions} onDelete={handleDelete} />
      </div>

      {isModalOpen && (
        <TransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddTransaction} 
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
