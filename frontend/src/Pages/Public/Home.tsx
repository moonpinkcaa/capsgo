import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { SchoolProfile, Facility, Extracurricular, SchoolEvent, Achievement } from '../../types';

interface Props {
    profile?: SchoolProfile | null;
    featuredFacilities: Facility[];
    extracurriculars: Extracurricular[];
    recentEvents: SchoolEvent[];
    recentAchievements: Achievement[];
}

export default function Home({
    profile,
    featuredFacilities,
    extracurriculars,
    recentEvents,
    recentAchievements,
}: Props) {
    return (
        <PublicLayout>
            <Head title="Beranda Resmi - SDN 003 Samarinda" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white py-20 lg:py-28">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 mb-6">
                            Website Resmi Sekolah
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-amber-300">{profile?.school_name || 'SDN 003 Samarinda'}</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-blue-100 leading-relaxed font-light">
                            {profile?.short_description ||
                                'Mewujudkan lingkungan belajar yang religius, cerdas, berkarakter mulia, serta membekali generasi masa depan dengan kecakapan abad ke-21.'}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/profil-sekolah"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-900 bg-white hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                            >
                                Jelajahi Profil Sekolah
                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600/60 hover:bg-blue-600 border border-blue-400/40 transition-all"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sambutan & Nilai Sekolah */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-blue-50/60 border border-blue-100">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-5">
                                01
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Pendidikan Karakter</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Membina budi pekerti luhur, kejujuran, disiplin, dan rasa tanggung jawab dalam setiap kegiatan belajar mengajar.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-5">
                                02
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Prestasi & Potensi</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Mendorong bakat dan minat setiap peserta didik melalui program bimbingan akademik dan kegiatan ekstrakurikuler terarah.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-5">
                                03
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Lingkungan Ramah Anak</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Menyediakan fasilitas ruang belajar yang aman, sehat, dan menyenangkan bagi tumbuh kembang optimal anak.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fasilitas Unggulan */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Sarana & Prasarana</span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Fasilitas Sekolah</h2>
                        </div>
                        <Link href="/fasilitas" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            Lihat Semua Fasilitas &rarr;
                        </Link>
                    </div>

                    {featuredFacilities.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                            <p className="text-slate-500 text-sm">Informasi fasilitas belum diterbitkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredFacilities.map((facility) => (
                                <div key={facility.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col">
                                    <div className="h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
                                        {facility.image_path ? (
                                            <img src={`/storage/${facility.image_path}`} alt={facility.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-slate-400 text-sm flex flex-col items-center gap-2">
                                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Fasilitas SDN 003</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">{facility.category}</span>
                                            <h4 className="text-lg font-bold text-slate-900 mt-1">{facility.name}</h4>
                                            <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">{facility.description || 'Fasilitas penunjang kegiatan belajar mengajar.'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Ekstrakurikuler */}
            <section className="py-16 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Minat & Bakat Siswa</span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Kegiatan Ekstrakurikuler</h2>
                        </div>
                        <Link href="/ekstrakurikuler" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            Lihat Semua Kegiatan &rarr;
                        </Link>
                    </div>

                    {extracurriculars.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-slate-500 text-sm">Informasi ekstrakurikuler belum diterbitkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {extracurriculars.map((activity) => (
                                <div key={activity.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
                                    <h4 className="text-lg font-bold text-slate-900">{activity.name}</h4>
                                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">{activity.description || 'Pengembangan minat dan bakat peserta didik.'}</p>
                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                        <span>Jadwal: {activity.schedule_text || 'Menyesuaikan'}</span>
                                        <span className="font-medium text-slate-700">{activity.supervisor_name || 'Pembina'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Dokumentasi Kegiatan Terbaru */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Dokumentasi</span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Kegiatan Terbaru Sekolah</h2>
                        </div>
                        <Link href="/kegiatan" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            Galeri Kegiatan Lengkap &rarr;
                        </Link>
                    </div>

                    {recentEvents.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                            <p className="text-slate-500 text-sm">Belum ada dokumentasi kegiatan yang diterbitkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/kegiatan/${event.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col"
                                >
                                    <div className="h-52 bg-slate-200 overflow-hidden relative">
                                        {event.cover_image_path ? (
                                            <img src={`/storage/${event.cover_image_path}`} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                                                Dokumentasi SDN 003
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-slate-800 backdrop-blur-xs">
                                            {event.category}
                                        </span>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs text-slate-400 font-medium">
                                                {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                            <h4 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                                                {event.title}
                                            </h4>
                                            <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
                                            Lihat Dokumentasi &rarr;
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Prestasi Siswa */}
            <section className="py-16 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Kebanggaan Sekolah</span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Prestasi Siswa</h2>
                        </div>
                        <Link href="/prestasi" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            Lihat Semua Prestasi &rarr;
                        </Link>
                    </div>

                    {recentAchievements.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-slate-500 text-sm">Informasi prestasi siswa belum diterbitkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentAchievements.map((item) => (
                                <div key={item.id} className="p-6 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/30 to-white shadow-xs">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                            Tingkat {item.level}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {item.achievement_date ? new Date(item.achievement_date).getFullYear() : ''}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                                    {item.student_display_name && (
                                        <p className="mt-1 text-xs font-medium text-blue-700">Oleh: {item.student_display_name}</p>
                                    )}
                                    <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
