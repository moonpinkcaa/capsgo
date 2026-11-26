import { Head } from '@inertiajs/react';
import GuruLayout from '@/Layouts/GuruLayout';
import { PageProps } from '@/types';

export default function SchedulesIndex({ auth }: PageProps) {
    return (
        <GuruLayout header={<h1 className="text-xl font-bold text-slate-800">Jadwal Mengajar</h1>}>
            <Head title="Jadwal Mengajar — CAPSGO" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Jadwal Mengajar Anda</h2>
                    <p className="text-sm text-slate-500">
                        Jadwal mengajar harian untuk {auth.user?.name}. Data akan ditampilkan sesuai penugasan dari sekolah.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">🗓️</div>
                        <p className="text-sm text-slate-400">Belum ada jadwal yang tersedia.</p>
                        <p className="text-xs text-slate-400 mt-1">Jadwal akan muncul setelah Operator menginput data penugasan.</p>
                    </div>
                </div>
            </div>
        </GuruLayout>
    );
}
