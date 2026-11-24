import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { OperatorLayout } from '../../../../Layouts/OperatorLayout';
import { PaginatedData, SchoolEvent } from '../../../../types';
import { StatusBadge } from '../../../../Components/StatusBadge';
import { Pagination } from '../../../../Components/Pagination';
import { EmptyState } from '../../../../Components/EmptyState';

interface Props {
    events: PaginatedData<SchoolEvent>;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Index({ events, filters }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm({
        _method: 'POST',
        title: '',
        event_date: new Date().toISOString().split('T')[0],
        category: 'Kegiatan Sekolah',
        description: '',
        publication_status: 'terbit' as 'draf' | 'terbit' | 'arsip',
        cover_image: null as File | null,
        photos: [] as File[],
    });

    const openCreateModal = () => {
        setEditingEvent(null);
        reset();
        setData({
            _method: 'POST',
            title: '',
            event_date: new Date().toISOString().split('T')[0],
            category: 'Kegiatan Sekolah',
            description: '',
            publication_status: 'terbit',
            cover_image: null,
            photos: [],
        });
        setModalOpen(true);
    };

    const openEditModal = (event: SchoolEvent) => {
        setEditingEvent(event);
        setData({
            _method: 'PUT',
            title: event.title,
            event_date: event.event_date ? event.event_date.split('T')[0] : '',
            category: event.category,
            description: event.description || '',
            publication_status: event.publication_status,
            cover_image: null,
            photos: [],
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEvent) {
            post(`/operator/kegiatan/${editingEvent.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/operator/kegiatan', {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (event: SchoolEvent) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kegiatan "${event.title}"?`)) {
            router.delete(`/operator/kegiatan/${event.id}`);
        }
    };

    return (
        <OperatorLayout
            title="Pengelolaan Dokumentasi Kegiatan"
            description="Unggah dokumentasi foto kegiatan sekolah, tanggal pelaksanaan, serta detail deskripsi acara."
            actions={
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Kegiatan
                </button>
            }
        >
            <Head title="Kelola Dokumentasi Kegiatan - Portal Operator" />

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                        {['', 'terbit', 'draf', 'arsip'].map((st) => (
                            <button
                                key={st}
                                type="button"
                                onClick={() => router.get('/operator/kegiatan', { status: st, search: filters.search }, { preserveState: true })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                                    (filters.status || '') === st
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {st || 'Semua'}
                            </button>
                        ))}
                    </div>
                </div>

                {events.data.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            title="Belum Ada Dokumentasi Kegiatan"
                            description="Dokumentasikan kegiatan penting sekolah dan terbitkan untuk masyarakat umum."
                            actionLabel="Tambah Kegiatan Baru"
                            onAction={openCreateModal}
                        />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-700">
                            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Judul Kegiatan</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Tanggal Pelaksanaan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {events.data.map((event) => (
                                    <tr key={event.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-900">
                                            <div>{event.title}</div>
                                            <div className="text-xs text-slate-500 line-clamp-1">{event.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{event.category}</td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            {new Date(event.event_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={event.publication_status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(event)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
                                                >
                                                    Ubah
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="p-4 border-t border-slate-100">
                    <Pagination
                        links={events.links}
                        from={events.from}
                        to={events.to}
                        total={events.total}
                    />
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingEvent ? 'Ubah Data Kegiatan' : 'Tambah Dokumentasi Kegiatan'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Judul Kegiatan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Upacara Hari Pahlawan, Lomba Kebersihan Kelas..."
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Tanggal Pelaksanaan <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.event_date}
                                        onChange={(e) => setData('event_date', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Kategori Kegiatan <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Peringatan Hari Besar, Pramuka, dll"
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Status Publikasi <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.publication_status}
                                    onChange={(e) => setData('publication_status', e.target.value as any)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="terbit">Terbit (Tampil di Website Publik)</option>
                                    <option value="draf">Draf (Disimpan Internal Saja)</option>
                                    <option value="arsip">Arsip (Nonaktif)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Deskripsi Kegiatan
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan rangkaian kegiatan dan pesan yang disampaikan..."
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Foto Sampul Utama (Max 4MB)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Tambah Foto Galeri Pendukung (Bisa Banyak)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setData('photos', Array.from(e.target.files));
                                        }
                                    }}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </OperatorLayout>
    );
}
