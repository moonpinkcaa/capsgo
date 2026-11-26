import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function AttendanceOperator() {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Rekap Absensi</h1>}>
            <Head title="Rekap Absensi — Operator" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Rekapitulasi Kehadiran Siswa</h2>
                    <p className="text-sm text-slate-500">
                        Lihat rekap absensi per kelas dan periode. Data absensi diisi oleh masing-masing Guru.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">📋</div>
                        <p className="text-sm text-slate-400">Data absensi belum tersedia.</p>
                        <p className="text-xs text-slate-400 mt-1">Data akan muncul setelah Guru mulai mengisi absensi kelas.</p>
                    </div>
                </div>
            </div>
        </OperatorLayout>
    );
}
