import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { SchoolProfile } from '../../types';

interface Props {
    profile?: SchoolProfile | null;
}

export default function Organization({ profile }: Props) {
    const orgData = [
        { role: 'Kepala Sekolah', name: 'Drs. H. Pendidik Utama, M.Pd.', desc: 'Penanggung Jawab dan Pemimpin Satuan Pendidikan' },
        { role: 'Komite Sekolah', name: 'Perwakilan Tokoh & Orang Tua Siswa', desc: 'Mitra Sekolah dan Pertimbangan Kebijakan' },
        { role: 'Koordinator Kurikulum', name: 'Ibu Guru Senior, S.Pd.', desc: 'Pengembangan dan Pelaksanaan Pembelajaran' },
        { role: 'Koordinator Kesiswaan & Ekstrakurikuler', name: 'Bapak Pembina Bakat, S.Pd.', desc: 'Pembinaan Karakter dan Prestasi Peserta Didik' },
        { role: 'Koordinator Sarana & Prasarana', name: 'Bapak Pengelola Aset, S.Pd.', desc: 'Pemeliharaan dan Fasilitas Pembelajaran' },
        { role: 'Operator & Tata Usaha', name: 'Staf Administrasi Sekolah', desc: 'Pengelolaan Data dan Administrasi Resmi' },
    ];

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi - SDN 003 Samarinda" />

            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Susunan Organisasi</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Struktur Organisasi Sekolah</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Hierarki kepemimpinan dan pembagian peran dalam operasional penyelenggaraan pendidikan di SDN 003 Samarinda.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-6">
                    {/* Kepala Sekolah */}
                    <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-md text-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">Pimpinan Tertinggi</span>
                        <h3 className="text-xl font-bold mt-1">{orgData[0].name}</h3>
                        <p className="text-sm text-blue-100 font-medium mt-1">{orgData[0].role}</p>
                        <p className="text-xs text-blue-200/90 mt-2">{orgData[0].desc}</p>
                    </div>

                    <div className="w-0.5 h-8 bg-blue-300 mx-auto"></div>

                    {/* Komite & Tata Usaha */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
                            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Mitra Sekolah</span>
                            <h4 className="text-base font-bold text-slate-900 mt-1">{orgData[1].name}</h4>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{orgData[1].role}</p>
                            <p className="text-xs text-slate-500 mt-2">{orgData[1].desc}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Dukungan Administrasi</span>
                            <h4 className="text-base font-bold text-slate-900 mt-1">{orgData[5].name}</h4>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{orgData[5].role}</p>
                            <p className="text-xs text-slate-500 mt-2">{orgData[5].desc}</p>
                        </div>
                    </div>

                    <div className="w-0.5 h-8 bg-blue-300 mx-auto"></div>

                    {/* Koordinator Bidang */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {orgData.slice(2, 5).map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Koordinator</span>
                                <h4 className="text-base font-bold text-slate-900 mt-1">{item.name}</h4>
                                <p className="text-xs text-slate-700 font-medium mt-0.5">{item.role}</p>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14 text-center">
                    <Link
                        href="/guru"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 text-sm shadow-sm"
                    >
                        Lihat Seluruh Tenaga Pendidik &rarr;
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
