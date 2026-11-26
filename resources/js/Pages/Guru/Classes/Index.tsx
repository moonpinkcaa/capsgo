import { Head } from '@inertiajs/react';
import GuruLayout from '@/Layouts/GuruLayout';
import { PageProps } from '@/types';

export default function ClassesIndex({ auth }: PageProps) {
    return (
        <GuruLayout header={<h1 className="text-xl font-bold text-slate-800">Kelas Saya</h1>}>
            <Head title="Kelas Saya — CAPSGO" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Daftar Kelas yang Diampu</h2>
                    <p className="text-sm text-slate-500">
                        Kelas-kelas yang menjadi tanggung jawab {auth.user?.name} sesuai surat penugasan.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">🏫</div>
                        <p className="text-sm text-slate-400">Belum ada data kelas yang tersedia.</p>
                        <p className="text-xs text-slate-400 mt-1">Data kelas akan muncul setelah Operator mengatur penugasan.</p>
                    </div>
                </div>
            </div>
        </GuruLayout>
    );
}
