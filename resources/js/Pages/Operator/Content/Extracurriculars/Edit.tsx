import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

interface Extracurricular {
    id: number;
    name: string;
    description?: string;
    schedule_text?: string;
    supervisor_name?: string;
    publication_status: 'draft' | 'published' | 'archived';
}

export default function ExtracurricularsEdit({ extracurricular }: { extracurricular: Extracurricular }) {
    const { data, setData, put, processing, errors } = useForm({
        name: extracurricular.name,
        description: extracurricular.description || '',
        schedule_text: extracurricular.schedule_text || '',
        supervisor_name: extracurricular.supervisor_name || '',
        publication_status: extracurricular.publication_status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/operator/ekstrakurikuler/${extracurricular.id}`);
    };

    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Edit Ekstrakurikuler</h1>}>
            <Head title="Edit Ekstrakurikuler — Operator" />

            <div className="max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Ubah Data: {extracurricular.name}</h2>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nama Ekstrakurikuler <span className="text-rose-500">*</span></label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Jadwal</label>
                            <input type="text" value={data.schedule_text} onChange={(e) => setData('schedule_text', e.target.value)} placeholder="Senin & Rabu, 14:00-16:00"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nama Pembina</label>
                            <input type="text" value={data.supervisor_name} onChange={(e) => setData('supervisor_name', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Status Publikasi <span className="text-rose-500">*</span></label>
                        <select value={data.publication_status} onChange={(e) => setData('publication_status', e.target.value as 'draft' | 'published' | 'archived')}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="draft">Draf</option>
                            <option value="published">Terbit</option>
                            <option value="archived">Arsip</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                        <button type="submit" disabled={processing}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition shadow-sm">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                        <Link href="/operator/ekstrakurikuler" className="text-sm text-slate-500 hover:text-slate-700">Batal</Link>
                    </div>
                </form>
            </div>
        </OperatorLayout>
    );
}
