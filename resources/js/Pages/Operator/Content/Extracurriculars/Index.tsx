import { Head, Link } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

interface Extracurricular {
    id: number;
    name: string;
    schedule_text?: string;
    supervisor_name?: string;
    publication_status: 'draft' | 'published' | 'archived';
}

interface Props {
    extracurriculars: {
        data: Extracurricular[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

const statusBadge = (status: Extracurricular['publication_status']) => {
    if (status === 'published') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Terbit</span>;
    if (status === 'archived') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Arsip</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Draf</span>;
};

export default function ExtracurricularsIndex({ extracurriculars }: Props) {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Kelola Ekstrakurikuler</h1>}>
            <Head title="Kelola Ekstrakurikuler — Operator" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Daftar Ekstrakurikuler</h2>
                        <p className="text-xs text-slate-500">Kelola daftar kegiatan ekstrakurikuler sekolah.</p>
                    </div>
                    <Link
                        href="/operator/ekstrakurikuler/tambah"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                        + Tambah Ekstrakurikuler
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                            <tr>
                                <th className="px-6 py-3">Nama Ekstrakurikuler</th>
                                <th className="px-6 py-3">Jadwal</th>
                                <th className="px-6 py-3">Pembina</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {extracurriculars.data.length > 0 ? (
                                extracurriculars.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.schedule_text || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.supervisor_name || '-'}</td>
                                        <td className="px-6 py-4">{statusBadge(item.publication_status)}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={`/operator/ekstrakurikuler/${item.id}/edit`} className="text-xs font-semibold text-blue-600 hover:underline">
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/operator/ekstrakurikuler/${item.id}`}
                                                method="delete"
                                                as="button"
                                                className="text-xs font-semibold text-rose-600 hover:underline"
                                                onBefore={() => confirm('Yakin ingin menghapus ekstrakurikuler ini?')}
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-xs">
                                        Belum ada data ekstrakurikuler.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </OperatorLayout>
    );
}
