import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function CooperativeOperator() {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Data Koperasi</h1>}>
            <Head title="Data Koperasi — Operator" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Pengelolaan Data Koperasi Sekolah</h2>
                    <p className="text-sm text-slate-500">
                        Modul pengelolaan data koperasi SDN 003 Samarinda. Cakupan fitur disesuaikan dengan kebutuhan sekolah.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-10 text-center">
                        <div className="text-4xl mb-3">🛒</div>
                        <p className="text-sm text-slate-400">Modul koperasi sedang dalam tahap pengembangan.</p>
                        <p className="text-xs text-slate-400 mt-1">Fitur ini akan tersedia setelah kebutuhan sekolah dikonfirmasi.</p>
                    </div>
                </div>
            </div>
        </OperatorLayout>
    );
}
