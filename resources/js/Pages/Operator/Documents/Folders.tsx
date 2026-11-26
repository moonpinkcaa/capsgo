import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function Folders() {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Arsip Dokumen — Folder</h1>}>
            <Head title="Arsip Dokumen — Operator" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Pengelolaan Folder & Subfolder</h2>
                        <p className="text-xs text-slate-500">Kelola arsip dokumen internal sekolah dengan struktur folder yang rapi.</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition">
                        + Buat Folder Baru
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">🗂️</div>
                        <p className="text-sm text-slate-400">Belum ada folder yang dibuat.</p>
                        <p className="text-xs text-slate-400 mt-1">Buat folder pertama Anda untuk mulai mengarsipkan dokumen sekolah.</p>
                    </div>
                </div>
            </div>
        </OperatorLayout>
    );
}
