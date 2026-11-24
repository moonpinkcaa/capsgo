import { Head, Link } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';
import { PageProps, User } from '@/types';

interface UserIndexProps extends PageProps {
    teachers: {
        data: User[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

export default function UserIndex({ teachers }: UserIndexProps) {
    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Manajemen Akun Guru</h1>}>
            <Head title="Manajemen Akun Guru — Operator" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Daftar Akun Guru Aktif</h2>
                        <p className="text-xs text-slate-500">Kelola akses portal untuk tenaga pendidik SDN 003 Samarinda</p>
                    </div>
                    <Link
                        href="/operator/akun-guru/tambah"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                        + Tambah Akun Guru Baru
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                            <tr>
                                <th className="px-6 py-3">Nama Guru</th>
                                <th className="px-6 py-3">Identitas Login (Email / Username)</th>
                                <th className="px-6 py-3">Peran (Role)</th>
                                <th className="px-6 py-3">Status Akun</th>
                                <th className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {teachers.data.length > 0 ? (
                                teachers.data.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{teacher.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{teacher.email || teacher.username}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                {teacher.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {teacher.is_active ? (
                                                <span className="text-xs font-semibold text-emerald-600">● Aktif</span>
                                            ) : (
                                                <span className="text-xs font-semibold text-rose-500">● Nonaktif</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/operator/akun-guru/${teacher.id}/toggle`}
                                                method="patch"
                                                as="button"
                                                className="text-xs font-semibold text-blue-600 hover:underline"
                                            >
                                                {teacher.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-xs">
                                        Belum ada akun guru yang didaftarkan.
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
