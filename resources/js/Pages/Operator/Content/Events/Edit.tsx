import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

interface Event {
    id: number;
    title: string;
    event_date?: string;
    category?: string;
    description?: string;
    publication_status: 'draft' | 'published' | 'archived';
}

export default function EventsEdit({ event }: { event: Event }) {
    const { data, setData, put, processing, errors } = useForm({
        title: event.title,
        event_date: event.event_date || '',
        category: event.category || '',
        description: event.description || '',
        publication_status: event.publication_status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/operator/kegiatan/${event.id}`);
    };

    return (
        <OperatorLayout header={<h1 className="text-xl font-bold text-slate-800">Edit Kegiatan</h1>}>
            <Head title="Edit Kegiatan — Operator" />

            <div className="max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Ubah Data: {event.title}</h2>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Judul Kegiatan <span className="text-rose-500">*</span></label>
                        <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Tanggal Kegiatan</label>
                            <input type="date" value={data.event_date} onChange={(e) => setData('event_date', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Kategori</label>
                            <input type="text" value={data.category} onChange={(e) => setData('category', e.target.value)} placeholder="Upacara, Lomba, Pelatihan..."
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
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
                        <Link href="/operator/kegiatan" className="text-sm text-slate-500 hover:text-slate-700">Batal</Link>
                    </div>
                </form>
            </div>
        </OperatorLayout>
    );
}
