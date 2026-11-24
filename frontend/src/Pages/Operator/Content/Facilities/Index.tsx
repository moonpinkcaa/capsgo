import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { OperatorLayout } from '../../../../Layouts/OperatorLayout';
import { Facility, PaginatedData } from '../../../../types';
import { StatusBadge } from '../../../../Components/StatusBadge';
import { Pagination } from '../../../../Components/Pagination';
import { EmptyState } from '../../../../Components/EmptyState';

interface Props {
    facilities: PaginatedData<Facility>;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Index({ facilities, filters }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm({
        _method: 'POST',
        name: '',
        category: 'Umum',
        description: '',
        publication_status: 'terbit' as 'draf' | 'terbit' | 'arsip',
        image: null as File | null,
    });

    const openCreateModal = () => {
        setEditingFacility(null);
        reset();
        setData({
            _method: 'POST',
            name: '',
            category: 'Umum',
            description: '',
            publication_status: 'terbit',
            image: null,
        });
        setModalOpen(true);
    };

    const openEditModal = (facility: Facility) => {
        setEditingFacility(facility);
        setData({
            _method: 'PUT',
            name: facility.name,
            category: facility.category,
            description: facility.description || '',
            publication_status: facility.publication_status,
            image: null,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFacility) {
            post(`/operator/fasilitas/${editingFacility.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/operator/fasilitas', {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (facility: Facility) => {
        if (confirm(`Apakah Anda yakin ingin menghapus fasilitas "${facility.name}"?`)) {
            router.delete(`/operator/fasilitas/${facility.id}`);
        }
    };

    return (
        <OperatorLayout
            title="Pengelolaan Fasilitas Sekolah"
            description="Kelola sarana dan prasarana sekolah, atur status publikasi, dan perbarui dokumentasi foto."
            actions={
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Fasilitas
                </button>
            }
        >
            <Head title="Kelola Fasilitas - Portal Operator" />

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                        {['', 'terbit', 'draf', 'arsip'].map((st) => (
                            <button
                                key={st}
                                type="button"
                                onClick={() => router.get('/operator/fasilitas', { status: st, search: filters.search }, { preserveState: true })}
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

                {facilities.data.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            title="Belum Ada Data Fasilitas"
                            description="Mulai tambahkan fasilitas sekolah agar dapat ditampilkan kepada pengunjung website publik."
                            actionLabel="Tambah Fasilitas Baru"
                            onAction={openCreateModal}
                        />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-700">
                            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Fasilitas</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Tanggal Dibuat</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {facilities.data.map((facility) => (
                                    <tr key={facility.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                                    {facility.image_path ? (
                                                        <img src={`/storage/${facility.image_path}`} alt={facility.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Foto</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{facility.name}</div>
                                                    <div className="text-xs text-slate-500 line-clamp-1">{facility.description || 'Tidak ada deskripsi.'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{facility.category}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={facility.publication_status} />
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            {facility.created_at ? new Date(facility.created_at).toLocaleDateString('id-ID') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(facility)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
                                                >
                                                    Ubah
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(facility)}
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
                        links={facilities.links}
                        from={facilities.from}
                        to={facilities.to}
                        total={facilities.total}
                    />
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingFacility ? 'Ubah Data Fasilitas' : 'Tambah Fasilitas Baru'}
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
                                    Nama Fasilitas <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Kategori Fasilitas <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Ruang Kelas, Laboratorium, Lapangan, dll"
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.category && <p className="mt-1 text-xs text-rose-500">{errors.category}</p>}
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
                                    Deskripsi Fasilitas
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Foto Fasilitas (Max 3MB)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {editingFacility?.image_path && (
                                    <p className="mt-1 text-xs text-slate-500">Foto saat ini: {editingFacility.image_path}</p>
                                )}
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
