import { PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function OperatorLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans">
            {/* Sidebar Operator */}
            <aside className="w-64 bg-slate-950 text-slate-200 flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white">
                        OP
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white leading-tight">Portal Operator</h2>
                        <span className="text-xs text-slate-400">Pengelolaan Sekolah</span>
                    </div>
                </div>

                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
                    <p className="text-slate-400">Operator Bertugas:</p>
                    <p className="font-semibold text-white truncate">{auth.user?.name}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-medium">
                        Administrator Sistem
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-1 text-sm font-medium overflow-y-auto">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-1">
                        Utama
                    </div>
                    <Link
                        href="/operator/dashboard"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        📊 Dashboard
                    </Link>

                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">
                        Konten Website Publik
                    </div>
                    <Link
                        href="/operator/profil-sekolah"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🏢 Profil Sekolah
                    </Link>
                    <Link
                        href="/operator/guru"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        👨‍🏫 Data Guru Publik
                    </Link>
                    <Link
                        href="/operator/fasilitas"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🏛️ Fasilitas
                    </Link>
                    <Link
                        href="/operator/ekstrakurikuler"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        ⚽ Ekstrakurikuler
                    </Link>
                    <Link
                        href="/operator/kegiatan"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        📸 Kegiatan & Dokumentasi
                    </Link>
                    <Link
                        href="/operator/prestasi"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🏆 Prestasi Siswa
                    </Link>

                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">
                        Operasional & Arsip
                    </div>
                    <Link
                        href="/operator/folder"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🗂️ Arsip Dokumen
                    </Link>
                    <Link
                        href="/operator/absensi"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        📋 Rekap Absensi
                    </Link>
                    <Link
                        href="/operator/koperasi"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🛒 Data Koperasi
                    </Link>
                    <Link
                        href="/operator/akun-guru"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        👥 Manajemen Akun Guru
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link
                        href="/keluar"
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center px-3 py-2 bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white rounded-lg text-sm font-medium transition"
                    >
                        🚪 Keluar (Logout)
                    </Link>
                </div>
            </aside>

            {/* Area Utama Konten */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
                    <div className="text-base font-semibold text-slate-800">
                        {header || 'Portal Operator'}
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <Link href="/" target="_blank" className="text-xs text-slate-500 hover:text-blue-600 transition">
                            Buka Web Publik ↗
                        </Link>
                    </div>
                </header>

                {flash?.success && (
                    <div className="mx-6 mt-4 p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 mt-4 p-4 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-sm">
                        {flash.error}
                    </div>
                )}

                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
