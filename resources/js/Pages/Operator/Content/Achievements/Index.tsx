import { Head, Link } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

interface Achievement {
    id: number;
    title: string;
    student_display_name?: string;
    category?: string;
    level?: string;
    achievement_date?: string;
    publication_status: 'draft' | 'published' | 'archived';
}

interface Props {
    achievements: {
        data: Achievement[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

const statusBadge = (status: Achievement['publication_status']) => {
    if (status === 'published') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Terbit</span>;
    if (status === 'archived') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Arsip</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Draf</span>;
};

export default function AchievementsIndex({ achievements }: Props) {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Kelola Prestasi Siswa</h1>}>
            <Head title="Kelola Prestasi — Operator" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Daftar Prestasi Siswa</h2>
                        <p className="text-xs text-slate-500">Kelola informasi prestasi akademik maupun non-akademik siswa.</p>
                    </div>
                    <Link
                        href="/operator/prestasi/tambah"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                        + Tambah Prestasi
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                            <tr>
                                <th className="px-6 py-3">Judul Prestasi</th>
                                <th className="px-6 py-3">Siswa / Tim</th>
                                <th className="px-6 py-3">Tingkat</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {achievements.data.length > 0 ? (
                                achievements.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.student_display_name || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.level || '-'}</td>
                                        <td className="px-6 py-4">{statusBadge(item.publication_status)}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={`/operator/prestasi/${item.id}/edit`} className="text-xs font-semibold text-blue-600 hover:underline">
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/operator/prestasi/${item.id}`}
                                                method="delete"
                                                as="button"
                                                className="text-xs font-semibold text-rose-600 hover:underline"
                                                onBefore={() => confirm('Yakin ingin menghapus data prestasi ini?')}
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-xs">
                                        Belum ada data prestasi yang ditambahkan.
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
