import { PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function GuruLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans">
            {/* Sidebar Guru */}
            <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center font-bold text-white">
                        G
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white leading-tight">Portal Guru</h2>
                        <span className="text-xs text-slate-400">SDN 003 Samarinda</span>
                    </div>
                </div>

                <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800 text-xs">
                    <p className="text-slate-400">Masuk sebagai:</p>
                    <p className="font-semibold text-white truncate">{auth.user?.name}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-medium">
                        Guru Pengajar
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-1 text-sm font-medium">
                    <Link
                        href="/guru/dashboard"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        href="/guru/jadwal"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🗓️ Jadwal Mengajar
                    </Link>
                    <Link
                        href="/guru/kelas"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        🏫 Kelas Saya
                    </Link>
                    <Link
                        href="/guru/absensi"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        📝 Pengisian Absensi
                    </Link>
                    <Link
                        href="/guru/dokumen"
                        className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                        📁 Berkas & Dokumen
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
                        {header || 'Portal Guru'}
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <Link href="/" target="_blank" className="text-xs text-slate-500 hover:text-emerald-600 transition">
                            Lihat Web Publik ↗
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
