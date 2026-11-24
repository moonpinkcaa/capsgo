import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { SchoolProfile } from '../../types';

interface Props {
    profile?: SchoolProfile | null;
}

export default function Profile({ profile }: Props) {
    return (
        <PublicLayout>
            <Head title="Profil Sekolah - SDN 003 Samarinda" />

            {/* Header Banner */}
            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Tentang Kami</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Profil SDN 003 Samarinda</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Mengenal lebih dekat identitas, sejarah, visi, dan misi SDN 003 Samarinda dalam membentuk generasi penerus bangsa.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Visi, Misi, Sejarah */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Gambaran Umum */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Gambaran Umum Sekolah</h2>
                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                {profile?.short_description ||
                                    'SDN 003 Samarinda merupakan salah satu lembaga pendidikan dasar negeri di Kota Samarinda yang senantiasa mengutamakan mutu pembelajaran, kedisiplinan, serta pembinaan akhlak mulia bagi seluruh peserta didik.'}
                            </p>
                        </div>

                        {/* Visi & Misi */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-200 shadow-xs">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
                                    V
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Visi Sekolah</h3>
                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                    {profile?.vision ||
                                        'Terwujudnya peserta didik yang religius, berprestasi, berkarakter mulia, cerdas, berwawasan lingkungan, dan berdaya saing global.'}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-200 shadow-xs">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-4">
                                    M
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Misi Sekolah</h3>
                                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                    {profile?.mission ||
                                        '1. Menanamkan nilai-nilai keagamaan dan budi pekerti luhur.\n2. Melaksanakan pembelajaran aktif, inovatif, dan menyenangkan.\n3. Mengembangkan potensi minat dan bakat peserta didik.\n4. Memelihara kebersihan, kesehatan, dan kelestarian lingkungan sekolah.'}
                                </div>
                            </div>
                        </div>

                        {/* Sejarah Singkat */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sejarah Singkat</h2>
                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                {profile?.history ||
                                    'Sejak didirikan, SDN 003 Samarinda telah berkontribusi nyata dalam mencerdaskan kehidupan masyarakat di Kota Samarinda. Dengan dukungan para pendidik berdedikasi dan peran aktif orang tua serta masyarakat, sekolah terus berbenah melengkapi sarana pembelajaran dan meningkatkan kualitas lulusan dari tahun ke tahun.'}
                            </p>
                        </div>
                    </div>

                    {/* Right: Identitas Ringkas */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                            <h3 className="text-lg font-bold text-slate-900 pb-4 mb-4 border-b border-slate-100">
                                Identitas Resmi Sekolah
                            </h3>
                            <dl className="space-y-4 text-xs sm:text-sm">
                                <div>
                                    <dt className="text-slate-400 font-medium">Nama Sekolah</dt>
                                    <dd className="font-semibold text-slate-800 mt-0.5">{profile?.school_name || 'SDN 003 Samarinda'}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 font-medium">Status Sekolah</dt>
                                    <dd className="font-semibold text-slate-800 mt-0.5">Negeri</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 font-medium">Jenjang Pendidikan</dt>
                                    <dd className="font-semibold text-slate-800 mt-0.5">Sekolah Dasar (SD)</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 font-medium">Alamat</dt>
                                    <dd className="font-semibold text-slate-800 mt-0.5">{profile?.address || 'Jl. Muara Samarinda, Kota Samarinda, Kalimantan Timur'}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 font-medium">Telepon</dt>
                                    <dd className="font-semibold text-slate-800 mt-0.5">{profile?.public_phone || '(0541) 1234567'}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 font-medium">Email Resmi</dt>
                                    <dd className="font-semibold text-slate-800 mt-0.5">{profile?.public_email || 'sdn003samarinda@sekolah.id'}</dd>
                                </div>
                            </dl>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <Link
                                    href="/struktur-organisasi"
                                    className="block text-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                                >
                                    Lihat Struktur Organisasi &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
