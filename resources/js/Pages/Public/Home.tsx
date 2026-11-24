import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Beranda — SDN 003 Samarinda" />

            {/* Hero Section Beranda */}
            <section className="bg-gradient-to-b from-emerald-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Website Resmi Sekolah
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                        Selamat Datang di SDN 003 Samarinda
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Mewujudkan generasi cerdas, berkarakter, dan berdaya saing melalui lingkungan belajar yang unggul dan inklusif.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link
                            href="/profil-sekolah"
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm transition shadow-lg"
                        >
                            Kenali Profil Sekolah
                        </Link>
                        <Link
                            href="/masuk"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition backdrop-blur-sm"
                        >
                            Portal Internal Guru & Operator →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sekilas Fitur Informasi Publik */}
            <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-900">Informasi Sekolah</h2>
                    <p className="text-sm text-slate-500 mt-1">Dapatkan informasi resmi mengenai SDN 003 Samarinda</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                            🏢
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Fasilitas Sekolah</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            Sarana dan prasarana belajar yang lengkap dan mendukung tumbuh kembang siswa.
                        </p>
                        <Link href="/fasilitas" className="text-xs font-semibold text-emerald-600 hover:underline">
                            Lihat Fasilitas →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                            ⚽
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Ekstrakurikuler</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            Wadah bakat dan minat siswa baik di bidang seni, olahraga, maupun sains.
                        </p>
                        <Link href="/ekstrakurikuler" className="text-xs font-semibold text-blue-600 hover:underline">
                            Lihat Kegiatan →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                            🏆
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Prestasi Siswa</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            Apresiasi dan jejak prestasi putra-putri berprestasi SDN 003 Samarinda.
                        </p>
                        <Link href="/prestasi" className="text-xs font-semibold text-amber-600 hover:underline">
                            Lihat Prestasi →
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
