import { PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function PublicLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
            {/* Header Publik */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow">
                                C
                            </div>
                            <div>
                                <Link href="/" className="font-bold text-lg text-slate-900 leading-tight block">
                                    SDN 003 Samarinda
                                </Link>
                                <span className="text-xs text-slate-500 font-medium">CAPSGO Information Portal</span>
                            </div>
                        </div>

                        {/* Navigasi Utama */}
                        <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-emerald-600 transition">Beranda</Link>
                            <Link href="/profil-sekolah" className="hover:text-emerald-600 transition">Profil</Link>
                            <Link href="/fasilitas" className="hover:text-emerald-600 transition">Fasilitas</Link>
                            <Link href="/ekstrakurikuler" className="hover:text-emerald-600 transition">Ekstrakurikuler</Link>
                            <Link href="/kegiatan" className="hover:text-emerald-600 transition">Dokumentasi</Link>
                            <Link href="/prestasi" className="hover:text-emerald-600 transition">Prestasi</Link>
                            <Link href="/kontak" className="hover:text-emerald-600 transition">Kontak</Link>
                        </nav>

                        {/* Tombol Masuk Internal */}
                        <div className="flex items-center space-x-2">
                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'operator' ? '/operator/dashboard' : '/guru/dashboard'}
                                    className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
                                >
                                    Portal {auth.user.role === 'operator' ? 'Operator' : 'Guru'}
                                </Link>
                            ) : (
                                <Link
                                    href="/masuk"
                                    className="inline-flex items-center px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-lg transition"
                                >
                                    Masuk Portal
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {header && (
                <div className="bg-white shadow-sm border-b border-slate-200">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}

            {/* Konten Halaman */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer Publik */}
            <footer className="bg-slate-900 text-slate-400 py-10 mt-12 text-sm border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white font-bold text-base mb-2">SDN 003 Samarinda</h3>
                        <p className="text-xs leading-relaxed text-slate-400">
                            Website Resmi Informasi dan Pengelolaan Data Sekolah. Mengabdi untuk pendidikan berkualitas dan berkarakter.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">Tautan Penting</h4>
                        <ul className="space-y-1 text-xs">
                            <li><Link href="/profil-sekolah" className="hover:text-white transition">Profil Sekolah</Link></li>
                            <li><Link href="/fasilitas" className="hover:text-white transition">Fasilitas Unggulan</Link></li>
                            <li><Link href="/kontak" className="hover:text-white transition">Kontak & Lokasi</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">Kontak Sekolah</h4>
                        <p className="text-xs text-slate-400">Samarinda, Kalimantan Timur</p>
                        <p className="text-xs text-slate-400 mt-1">CAPSGO Capstone Design Project</p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-xs text-center text-slate-500">
                    &copy; {new Date().getFullYear()} SDN 003 Samarinda. Dikembangkan oleh Tim CAPSGO.
                </div>
            </footer>
        </div>
    );
}
