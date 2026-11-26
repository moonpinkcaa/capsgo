import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function DocumentsIndex() {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Semua Dokumen</h1>}>
            <Head title="Semua Dokumen — Operator" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Daftar Seluruh Dokumen</h2>
                        <p className="text-xs text-slate-500">Cari dan kelola seluruh berkas yang tersimpan di arsip sekolah.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">📄</div>
                        <p className="text-sm text-slate-400">Belum ada dokumen yang diunggah.</p>
                        <p className="text-xs text-slate-400 mt-1">Unggah dokumen ke dalam folder untuk mulai mengarsipkan.</p>
                    </div>
                </div>
            </div>
        </OperatorLayout>
    );
}
