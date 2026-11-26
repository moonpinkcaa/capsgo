import { Head, Link, router } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

interface TeacherProfile {
    id: number;
    full_name: string;
    position?: string;
    public_bio?: string;
    is_published: boolean;
    is_active: boolean;
}

interface Props {
    teachers: {
        data: TeacherProfile[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

export default function TeachersIndex({ teachers }: Props) {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Kelola Data Guru Publik</h1>}>
            <Head title="Kelola Data Guru — Operator" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Daftar Profil Guru</h2>
                        <p className="text-xs text-slate-500">Kelola informasi guru yang ditampilkan di halaman publik.</p>
                    </div>
                    <Link
                        href="/operator/guru/tambah"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                        + Tambah Profil Guru
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                            <tr>
                                <th className="px-6 py-3">Nama Lengkap</th>
                                <th className="px-6 py-3">Jabatan</th>
                                <th className="px-6 py-3">Status Publikasi</th>
                                <th className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {teachers.data.length > 0 ? (
                                teachers.data.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{teacher.full_name}</td>
                                        <td className="px-6 py-4 text-slate-600">{teacher.position || '-'}</td>
                                        <td className="px-6 py-4">
                                            {teacher.is_published ? (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Publik</span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Disembunyikan</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={`/operator/guru/${teacher.id}/edit`}
                                                className="text-xs font-semibold text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/operator/guru/${teacher.id}`}
                                                method="delete"
                                                as="button"
                                                className="text-xs font-semibold text-rose-600 hover:underline"
                                                onBefore={() => confirm('Yakin ingin menghapus data guru ini?')}
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-xs">
                                        Belum ada data guru yang didaftarkan.
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
