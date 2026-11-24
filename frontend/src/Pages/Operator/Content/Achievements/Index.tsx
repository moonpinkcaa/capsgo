import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { OperatorLayout } from '../../../../Layouts/OperatorLayout';
import { Achievement, PaginatedData } from '../../../../types';
import { StatusBadge } from '../../../../Components/StatusBadge';
import { Pagination } from '../../../../Components/Pagination';
import { EmptyState } from '../../../../Components/EmptyState';

interface Props {
    achievements: PaginatedData<Achievement>;
    filters: {
        search?: string;
        status?: string;
        level?: string;
    };
}

export default function Index({ achievements, filters }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Achievement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm({
        _method: 'POST',
        title: '',
        student_display_name: '',
        category: 'Akademik',
        level: 'Kota',
        achievement_date: new Date().toISOString().split('T')[0],
        description: '',
        publication_status: 'terbit' as 'draf' | 'terbit' | 'arsip',
        image: null as File | null,
    });

    const openCreateModal = () => {
        setEditingItem(null);
        reset();
        setData({
            _method: 'POST',
            title: '',
            student_display_name: '',
            category: 'Akademik',
            level: 'Kota',
            achievement_date: new Date().toISOString().split('T')[0],
            description: '',
            publication_status: 'terbit',
            image: null,
        });
        setModalOpen(true);
    };

    const openEditModal = (item: Achievement) => {
        setEditingItem(item);
        setData({
            _method: 'PUT',
            title: item.title,
            student_display_name: item.student_display_name || '',
            category: item.category,
            level: item.level,
            achievement_date: item.achievement_date ? item.achievement_date.split('T')[0] : '',
            description: item.description || '',
            publication_status: item.publication_status,
            image: null,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            post(`/operator/prestasi/${editingItem.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/operator/prestasi', {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (item: Achievement) => {
        if (confirm(`Apakah Anda yakin ingin menghapus catatan prestasi "${item.title}"?`)) {
            router.delete(`/operator/prestasi/${item.id}`);
        }
    };

    return (
        <OperatorLayout
            title="Pengelolaan Prestasi Siswa"
            description="Catat dan publikasikan prestasi yang diraih peserta didik SDN 003 Samarinda pada berbagai kejuaraan."
            actions={
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Prestasi
                </button>
            }
        >
            <Head title="Kelola Prestasi Siswa - Portal Operator" />

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                        {['', 'terbit', 'draf', 'arsip'].map((st) => (
                            <button
                                key={st}
                                type="button"
                                onClick={() => router.get('/operator/prestasi', { status: st, search: filters.search }, { preserveState: true })}
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

                {achievements.data.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            title="Belum Ada Catatan Prestasi"
                            description="Catat prestasi membanggakan yang diraih peserta didik dan terbitkan di website sekolah."
                            actionLabel="Tambah Prestasi Baru"
                            onAction={openCreateModal}
                        />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-700">
                            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Judul / Prestasi</th>
                                    <th className="px-6 py-4">Siswa Peraih</th>
                                    <th className="px-6 py-4">Tingkat</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {achievements.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-900">{item.title}</td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{item.student_display_name || '-'}</td>
                                        <td className="px-6 py-4 text-xs font-medium text-amber-700">{item.level}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={item.publication_status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
                                                >
                                                    Ubah
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item)}
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
                        links={achievements.links}
                        from={achievements.from}
                        to={achievements.to}
                        total={achievements.total}
                    />
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingItem ? 'Ubah Data Prestasi' : 'Tambah Prestasi Baru'}
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
                                    Nama Prestasi / Kejuaraan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Juara 1 Olimpiade Sains Kota Samarinda"
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Nama Siswa / Tim Peraih
                                </label>
                                <input
                                    type="text"
                                    value={data.student_display_name}
                                    onChange={(e) => setData('student_display_name', e.target.value)}
                                    placeholder="Nama siswa yang disetujui untuk ditampilkan"
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Tingkat Kejuaraan <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Sekolah">Sekolah</option>
                                        <option value="Kecamatan">Kecamatan</option>
                                        <option value="Kota">Kota</option>
                                        <option value="Provinsi">Provinsi</option>
                                        <option value="Nasional">Nasional</option>
                                        <option value="Internasional">Internasional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Kategori <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Akademik, Olahraga, Seni..."
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
                                    Deskripsi Singkat
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
                                    Foto Piagam / Dokumentasi (Max 3MB)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
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
