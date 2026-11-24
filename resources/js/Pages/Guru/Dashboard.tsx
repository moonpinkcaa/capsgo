import { Head } from '@inertiajs/react';
import GuruLayout from '@/Layouts/GuruLayout';
import { PageProps } from '@/types';

export default function GuruDashboard({ auth }: PageProps) {
    return (
        <GuruLayout header={<h1 className="text-xl font-bold text-slate-800">Dashboard Guru</h1>}>
            <Head title="Dashboard Guru — CAPSGO" />

            <div className="space-y-6">
                {/* Banner Selamat Datang */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Selamat Datang, {auth.user?.name}! 👋
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Anda login ke Portal Internal Guru SDN 003 Samarinda. Akses penugasan, jadwal, dan kelas Anda di sini.
                        </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                        Status: Akun Aktif
                    </span>
                </div>

                {/* Kartu Ringkasan Tugas Guru */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Jadwal Mengajar</div>
                        <div className="text-2xl font-bold text-slate-800 mt-2">Tersedia</div>
                        <p className="text-xs text-slate-400 mt-1">Lihat agenda harian Anda</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Kelas Tanggung Jawab</div>
                        <div className="text-2xl font-bold text-slate-800 mt-2">Kelas Aktif</div>
                        <p className="text-xs text-slate-400 mt-1">Sesuai Surat Penugasan</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-semibold uppercase">Absensi Siswa</div>
                        <div className="text-2xl font-bold text-slate-800 mt-2">Pencatatan</div>
                        <p className="text-xs text-slate-400 mt-1">Isi kehadiran kelas binaan</p>
                    </div>
                </div>
            </div>
        </GuruLayout>
    );
}
