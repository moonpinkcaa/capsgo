import { Head } from '@inertiajs/react';
import GuruLayout from '@/Layouts/GuruLayout';
import { PageProps } from '@/types';

export default function DocumentsIndex({ auth }: PageProps) {
    return (
        <GuruLayout header={<h1 className="text-xl font-bold text-slate-800">Berkas & Dokumen</h1>}>
            <Head title="Berkas & Dokumen — CAPSGO" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Arsip Dokumen untuk Guru</h2>
                    <p className="text-sm text-slate-500">
                        Dokumen yang dibagikan kepada Anda oleh Operator sekolah.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">📁</div>
                        <p className="text-sm text-slate-400">Belum ada dokumen yang dibagikan.</p>
                        <p className="text-xs text-slate-400 mt-1">Dokumen akan muncul setelah Operator membagikan berkas kepada Anda.</p>
                    </div>
                </div>
            </div>
        </GuruLayout>
    );
}
