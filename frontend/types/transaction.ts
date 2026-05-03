export type TransactionType = 'pemasukan' | 'pengeluaran';

export interface Transaction {
  _id: string;
  tanggal: string;
  keterangan: string;
  tipe: TransactionType;
  nominal: number;
  buktiTransfer: string | null;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
}
