import { Head, Link } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';
import { PageProps } from '@/types';

export default function OperatorDashboard({ auth }: PageProps) {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Dashboard Pengelolaan Operator</h1>}>
            <Head title="Dashboard Operator — CAPSGO" />

            <div className="space-y-6">
                {/* Banner Operator */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">
                            Selamat Datang, Operator {auth.user?.name}! 🛠️
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            Pusat Pengelolaan Konten Website Publik dan Arsip Administrasi Internal SDN 003 Samarinda.
                        </p>
                    </div>
                    <Link
                        href="/operator/akun-guru"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition"
                    >
                        Kelola Akun Guru →
                    </Link>
                </div>

                {/* Ringkasan Modul PRD */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Konten Publik</div>
                        <div className="text-xl font-bold text-slate-800 mt-1">Tersedia</div>
                        <p className="text-[11px] text-slate-400">Profil, Fasilitas, Prestasi</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Akun Guru</div>
                        <div className="text-xl font-bold text-slate-800 mt-1">Aktif</div>
                        <p className="text-[11px] text-slate-400">Manajemen Akses Guru</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Arsip Berkas</div>
                        <div className="text-xl font-bold text-slate-800 mt-1">Folder & Dokumen</div>
                        <p className="text-[11px] text-slate-400">Penyimpanan Internal</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Data Absensi</div>
                        <div className="text-xl font-bold text-slate-800 mt-1">Rekapitulasi</div>
                        <p className="text-[11px] text-slate-400">Laporan Kehadiran</p>
                    </div>
                </div>
            </div>
        </OperatorLayout>
    );
}
