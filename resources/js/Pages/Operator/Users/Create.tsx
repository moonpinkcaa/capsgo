import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function UserCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/operator/akun-guru');
    };

    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Tambah Akun Guru Baru</h1>}>
            <Head title="Tambah Akun Guru — Operator" />

            <div className="max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Formulir Pendaftaran Akun Guru</h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Sesuai aturan keamanan sekolah, akun dibuatkan langsung oleh Operator (tidak ada pendaftaran mandiri).
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                            Nama Lengkap Guru <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Contoh: Siti Rahma, S.Pd"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                Email Resmi (Opsional)
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="guru@sdn003.sch.id"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                Username (Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="guru_siti"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.username && <p className="text-xs text-rose-500 mt-1">{errors.username}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                Kata Sandi Awal <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                Konfirmasi Sandi <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        <Link
                            href="/operator/akun-guru"
                            className="text-xs text-slate-500 hover:text-slate-800"
                        >
                            ← Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold shadow-sm transition"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Akun Guru'}
                        </button>
                    </div>
                </form>
            </div>
        </OperatorLayout>
    );
}
