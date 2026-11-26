import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function TeachersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        position: '',
        public_bio: '',
        is_published: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/operator/guru');
    };

    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Tambah Profil Guru</h1>}>
            <Head title="Tambah Profil Guru — Operator" />

            <div className="max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Formulir Profil Guru Publik</h2>
                    <p className="text-xs text-slate-500 mt-1">Data guru yang akan ditampilkan di halaman publik website.</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                            Nama Lengkap <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            placeholder="Contoh: Siti Rahma, S.Pd"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.full_name && <p className="text-xs text-rose-500 mt-1">{errors.full_name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                            Jabatan / Tugas
                        </label>
                        <input
                            type="text"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            placeholder="Contoh: Guru Kelas 3A"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.position && <p className="text-xs text-rose-500 mt-1">{errors.position}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                            Bio Publik
                        </label>
                        <textarea
                            value={data.public_bio}
                            onChange={(e) => setData('public_bio', e.target.value)}
                            rows={3}
                            placeholder="Deskripsi singkat yang akan ditampilkan di halaman publik..."
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.public_bio && <p className="text-xs text-rose-500 mt-1">{errors.public_bio}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                        />
                        <label className="text-sm text-slate-700">Tampilkan di halaman publik</label>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition shadow-sm"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Profil Guru'}
                        </button>
                        <Link href="/operator/guru" className="text-sm text-slate-500 hover:text-slate-700">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </OperatorLayout>
    );
}
