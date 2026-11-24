import React from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { SchoolProfile } from '../../types';

interface Props {
    profile?: SchoolProfile | null;
}

export default function Contact({ profile }: Props) {
    return (
        <PublicLayout>
            <Head title="Kontak & Lokasi - SDN 003 Samarinda" />

            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Informasi Layanan</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Kontak & Lokasi Sekolah</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Silakan hubungi layanan informasi sekolah kami atau kunjungi langsung kampus SDN 003 Samarinda pada jam kerja operasional.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info Card */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Informasi Kontak Resmi</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">Alamat Sekolah</h4>
                                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                                            {profile?.address || 'Jl. Muara Samarinda, Kota Samarinda, Kalimantan Timur, Indonesia'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">Telepon</h4>
                                        <p className="mt-1 text-sm text-slate-600">
                                            {profile?.public_phone || '(0541) 1234567'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">Email Resmi</h4>
                                        <p className="mt-1 text-sm text-slate-600">
                                            {profile?.public_email || 'sdn003samarinda@sekolah.id'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Jam Layanan */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="text-base font-bold text-slate-900 mb-3">Jam Layanan Tata Usaha & Informasi</h4>
                            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                                <div className="flex justify-between py-1 border-b border-slate-200">
                                    <span>Senin - Kamis</span>
                                    <span className="font-semibold text-slate-900">07.30 - 14.00 WITA</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-200">
                                    <span>Jumat</span>
                                    <span className="font-semibold text-slate-900">07.30 - 11.30 WITA</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span>Sabtu & Minggu / Hari Libur</span>
                                    <span className="font-semibold text-rose-600">Tutup</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Maps Preview Card */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Peta Lokasi Sekolah</h3>
                            <p className="text-xs sm:text-sm text-slate-500 mb-6">
                                Lokasi kampus SDN 003 Samarinda strategis dan mudah diakses oleh kendaraan roda dua maupun roda empat.
                            </p>
                            <div className="h-72 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                                <svg className="w-12 h-12 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                <span className="font-semibold text-slate-700 text-sm">Peta Interaktif Samarinda</span>
                                <span className="text-xs text-slate-500 mt-1 max-w-xs">{profile?.address || 'Jl. Muara Samarinda, Kalimantan Timur'}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span>Kordinat terdaftar pada basis data sekolah</span>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=SDN+003+Samarinda`}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-blue-600 hover:text-blue-800"
                            >
                                Buka di Google Maps &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
