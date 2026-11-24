import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
    title?: string;
}

export const PublicLayout: React.FC<Props> = ({ children, title }) => {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Profil Sekolah', href: '/profil-sekolah' },
        { name: 'Guru & Tenaga Pendidik', href: '/guru' },
        { name: 'Fasilitas', href: '/fasilitas' },
        { name: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
        { name: 'Kegiatan', href: '/kegiatan' },
        { name: 'Prestasi', href: '/prestasi' },
        { name: 'Kontak', href: '/kontak' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white font-sans">
            {/* Header & Navigasi */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo & School Name */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                                003
                            </div>
                            <div>
                                <span className="block text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                                    SDN 003 Samarinda
                                </span>
                                <span className="block text-xs font-medium text-slate-500">
                                    Unggul, Berkarakter & Berprestasi
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden xl:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        isActive(link.href)
                                            ? 'text-blue-700 bg-blue-50/80 font-semibold'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Portal Masuk Button */}
                        <div className="hidden sm:flex items-center gap-3">
                            <Link
                                href="/masuk"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Portal Internal
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                                    isActive(link.href)
                                        ? 'bg-blue-50 text-blue-700 font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100">
                            <Link
                                href="/masuk"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 text-center text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Masuk Portal Internal
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Identitas Sekolah */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                                    003
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">SDN 003 Samarinda</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Sekolah Dasar Negeri 003 Samarinda berkomitmen mewujudkan generasi cerdas, mandiri, berkarakter mulia, dan berwawasan lingkungan.
                            </p>
                        </div>

                        {/* Navigasi Cepat */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Navigasi Informasi</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link href="/profil-sekolah" className="hover:text-white transition-colors">Profil Sekolah</Link></li>
                                <li><Link href="/guru" className="hover:text-white transition-colors">Tenaga Pendidik</Link></li>
                                <li><Link href="/fasilitas" className="hover:text-white transition-colors">Fasilitas Sekolah</Link></li>
                                <li><Link href="/ekstrakurikuler" className="hover:text-white transition-colors">Ekstrakurikuler</Link></li>
                                <li><Link href="/prestasi" className="hover:text-white transition-colors">Prestasi Siswa</Link></li>
                            </ul>
                        </div>

                        {/* Dokumentasi & Publikasi */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Publikasi & Dokumen</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link href="/kegiatan" className="hover:text-white transition-colors">Dokumentasi Kegiatan</Link></li>
                                <li><Link href="/struktur-organisasi" className="hover:text-white transition-colors">Struktur Organisasi</Link></li>
                                <li><Link href="/kontak" className="hover:text-white transition-colors">Lokasi & Kontak</Link></li>
                                <li><Link href="/masuk" className="hover:text-white transition-colors">Portal Guru & Operator</Link></li>
                            </ul>
                        </div>

                        {/* Kontak Sekolah */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Hubungi Kami</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Jl. Muara Samarinda, Kota Samarinda, Kalimantan Timur</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>(0541) 1234567</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>sdn003samarinda@sekolah.id</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} SDN 003 Samarinda. Dikembangkan melalui Proyek Capstone CAPSGO.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
