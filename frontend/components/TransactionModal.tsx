"use client";

import React, { useState, useRef } from 'react';
import { PlusCircle, X, Upload, Trash2 } from 'lucide-react';
import { Transaction, TransactionType } from '../types/transaction';

interface Props {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  isSubmitting?: boolean;
}

export function TransactionModal({ onClose, onSubmit, isSubmitting = false }: Props) {
  const [formData, setFormData] = useState({
    nominal: '',
    tipe: 'pengeluaran' as TransactionType,
    keterangan: '',
  });

  const [filePreview, setFilePreview] = useState<{ file: File; url: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview({
        file: file,
        url: previewUrl,
        name: file.name
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nominal || !formData.keterangan) return;

    const data = new FormData();
    data.append('tipe', formData.tipe);
    data.append('nominal', formData.nominal);
    data.append('keterangan', formData.keterangan);
    
    if (filePreview && filePreview.file) {
      data.append('buktiTransfer', filePreview.file);
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-full animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-blue-600" />
            Catat Transaksi
          </h2>
          <button 
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <div>
              <label className="block text-slate-700 font-medium mb-1.5" htmlFor="tipe">
                Jenis Transaksi
              </label>
              <select
                id="tipe"
                name="tipe"
                value={formData.tipe}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow bg-white text-slate-700"
              >
                <option value="pengeluaran">Pengeluaran</option>
                <option value="pemasukan">Pemasukan</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1.5" htmlFor="nominal">
                Nominal (Rp)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-medium">Rp</span>
                </div>
                <input
                  type="number"
                  id="nominal"
                  name="nominal"
                  value={formData.nominal}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                  required
                  className="w-full border border-slate-300 rounded-lg pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1.5" htmlFor="keterangan">
                Keterangan
              </label>
              <input
                type="text"
                id="keterangan"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                placeholder="Contoh: Beli Token Listrik"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1.5">
                Upload Bukti Transfer <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              
              <div 
                className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-7 h-7 text-slate-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                <p className="text-xs text-slate-500 font-medium">Klik untuk mengunggah gambar</p>
                <p className="text-[11px] text-slate-400 mt-1">Maksimal ukuran 2MB</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {filePreview && (
                <div className="mt-3 relative border border-slate-200 rounded-lg p-2.5 flex items-start bg-slate-50">
                  <div className="w-12 h-12 rounded-md bg-white overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                    <img 
                      src={filePreview.url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 overflow-hidden pr-8 flex-1 flex flex-col justify-center h-12">
                    <p className="text-xs font-semibold text-slate-700 truncate">{filePreview.name}</p>
                    <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Siap diunggah</p>
                  </div>
                  <button 
                    type="button" 
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 hover:text-rose-500 p-1 bg-white rounded-md border border-slate-200 hover:border-rose-200 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-sm"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
