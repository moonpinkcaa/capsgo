import { Head } from '@inertiajs/react';
import GuruLayout from '@/Layouts/GuruLayout';
import { PageProps } from '@/types';

export default function AttendanceIndex({ auth }: PageProps) {
    return (
        <GuruLayout header={<h1 className="text-xl font-bold text-slate-800">Pengisian Absensi</h1>}>
            <Head title="Pengisian Absensi — CAPSGO" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Pencatatan Kehadiran Siswa</h2>
                    <p className="text-sm text-slate-500">
                        Isi kehadiran siswa untuk kelas yang menjadi tanggung jawab Anda.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">📝</div>
                        <p className="text-sm text-slate-400">Modul absensi belum tersedia.</p>
                        <p className="text-xs text-slate-400 mt-1">Fitur ini akan tersedia setelah data kelas dan siswa diinput oleh Operator.</p>
                    </div>
                </div>
            </div>
        </GuruLayout>
    );
}
