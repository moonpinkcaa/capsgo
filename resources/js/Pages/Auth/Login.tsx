import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/masuk', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 font-sans">
            <Head title="Masuk Portal — CAPSGO" />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Header Card */}
                <div className="bg-slate-900 p-6 text-center text-white">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-2xl mx-auto shadow mb-3">
                        C
                    </div>
                    <h1 className="text-xl font-bold">Portal SDN 003 Samarinda</h1>
                    <p className="text-xs text-slate-400 mt-1">CAPSGO — Akses Khusus Guru & Operator</p>
                </div>

                {status && (
                    <div className="m-6 mb-0 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-sm text-center">
                        {status}
                    </div>
                )}

                {/* Form Login */}
                <form onSubmit={submit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email atau Username <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.login}
                            onChange={(e) => setData('login', e.target.value)}
                            placeholder="nama@email.sch.id atau username"
                            required
                            autoFocus
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        />
                        {errors.login && (
                            <p className="text-xs text-rose-600 mt-1">{errors.login}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Kata Sandi <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        />
                        {errors.password && (
                            <p className="text-xs text-rose-600 mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm pt-1">
                        <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                            />
                            <span className="text-xs">Ingat saya</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition shadow-sm"
                    >
                        {processing ? 'Memverifikasi...' : 'Masuk ke Portal'}
                    </button>

                    <div className="text-center pt-4 border-t border-slate-100">
                        <Link href="/" className="text-xs text-slate-500 hover:text-emerald-600 transition">
                            ← Kembali ke Halaman Utama
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
