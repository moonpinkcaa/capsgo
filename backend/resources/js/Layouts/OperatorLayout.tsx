import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export const OperatorLayout: React.FC<Props> = ({ children, title, description, actions }) => {
    const { url, props } = usePage();
    const flash = (props as any).flash || {};
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        {
            name: 'Profil Sekolah',
            href: '/operator/profil-sekolah',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            name: 'Fasilitas Sekolah',
            href: '/operator/fasilitas',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
            ),
        },
        {
            name: 'Ekstrakurikuler',
            href: '/operator/ekstrakurikuler',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            name: 'Dokumentasi Kegiatan',
            href: '/operator/kegiatan',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            name: 'Prestasi Siswa',
            href: '/operator/prestasi',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
        },
    ];

    const isActive = (href: string) => url.startsWith(href);

    return (
        <div className="min-h-screen flex bg-slate-100 font-sans text-slate-800 antialiased">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
                {/* Brand */}
                <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                        003
                    </div>
                    <div>
                        <span className="font-bold text-white tracking-wide text-sm">CAPSGO Portal</span>
                        <span className="block text-[10px] text-blue-400 font-medium uppercase tracking-wider">Modul Operator</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                    <div>
                        <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Pengelolaan Konten Publik
                        </p>
                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                        <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Pintasan
                        </p>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Lihat Website Publik</span>
                        </Link>
                    </div>
                </div>

                {/* Footer User Info */}
                <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-xs">
                            OP
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-white">Operator Sekolah</div>
                            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Online
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className="text-xs sm:text-sm font-medium text-slate-500">
                            SDN 003 Samarinda &bull; Portal Pengelolaan
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                            Role: Operator
                        </span>
                    </div>
                </header>

                {/* Mobile Drawer */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex">
                        <div className="w-72 bg-slate-900 h-full p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                    <span className="font-bold text-white">Menu Operator</span>
                                    <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="mt-4 space-y-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                                                isActive(item.href)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <div className="pt-4 border-t border-slate-800">
                                <Link href="/" className="block py-2 text-center text-sm font-medium text-slate-300 hover:text-white">
                                    Kembali ke Website Publik
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1" onClick={() => setSidebarOpen(false)}></div>
                    </div>
                )}

                {/* Main Body */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-xs">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">{flash.success}</span>
                            </div>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between shadow-xs">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">{flash.error}</span>
                            </div>
                        </div>
                    )}

                    {/* Header Page Title & Action Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
                        </div>
                        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
                    </div>

                    {/* Page Content */}
                    {children}
                </main>
            </div>
        </div>
    );
};
