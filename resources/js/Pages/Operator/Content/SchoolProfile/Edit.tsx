import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

interface SchoolProfileData {
    id: number;
    school_name: string;
    short_description?: string;
    history?: string;
    vision?: string;
    mission?: string;
    address?: string;
    public_phone?: string;
    public_email?: string;
}

export default function SchoolProfileEdit({ profile }: { profile: SchoolProfileData }) {
    const { data, setData, put, processing, errors } = useForm({
        school_name: profile.school_name || '',
        short_description: profile.short_description || '',
        history: profile.history || '',
        vision: profile.vision || '',
        mission: profile.mission || '',
        address: profile.address || '',
        public_phone: profile.public_phone || '',
        public_email: profile.public_email || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put('/operator/profil-sekolah');
    };

    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Kelola Profil Sekolah</h1>}>
            <Head title="Profil Sekolah — Operator" />

            <div className="max-w-3xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Profil SDN 003 Samarinda</h2>
                    <p className="text-xs text-slate-500 mt-1">Informasi ini akan ditampilkan di halaman profil publik website.</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nama Sekolah <span className="text-rose-500">*</span></label>
                        <input type="text" value={data.school_name} onChange={(e) => setData('school_name', e.target.value)} required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.school_name && <p className="text-xs text-rose-500 mt-1">{errors.school_name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
                        <textarea value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} rows={2}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Sejarah</label>
                        <textarea value={data.history} onChange={(e) => setData('history', e.target.value)} rows={3}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Visi</label>
                            <textarea value={data.vision} onChange={(e) => setData('vision', e.target.value)} rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Misi</label>
                            <textarea value={data.mission} onChange={(e) => setData('mission', e.target.value)} rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Alamat</label>
                        <input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Telepon Publik</label>
                            <input type="text" value={data.public_phone} onChange={(e) => setData('public_phone', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Publik</label>
                            <input type="email" value={data.public_email} onChange={(e) => setData('public_email', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button type="submit" disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition shadow-sm">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
                        </button>
                    </div>
                </form>
            </div>
        </OperatorLayout>
    );
}
