import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { OperatorLayout } from '../../../../Layouts/OperatorLayout';
import { SchoolProfile } from '../../../../types';

interface Props {
    profile: SchoolProfile;
}

export default function Index({ profile }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        school_name: profile.school_name || 'SDN 003 Samarinda',
        short_description: profile.short_description || '',
        history: profile.history || '',
        vision: profile.vision || '',
        mission: profile.mission || '',
        address: profile.address || '',
        public_phone: profile.public_phone || '',
        public_email: profile.public_email || '',
        logo: null as File | null,
        cover: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/operator/profil-sekolah', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <OperatorLayout
            title="Pengelolaan Profil Sekolah"
            description="Perbarui informasi resmi, identitas, visi & misi, serta kontak SDN 003 Samarinda yang tampil di halaman publik."
        >
            <Head title="Pengelolaan Profil Sekolah - Portal Operator" />

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informasi Dasar */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                        Identitas & Informasi Utama
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Nama Resmi Sekolah <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.school_name}
                                onChange={(e) => setData('school_name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.school_name && <p className="mt-1 text-xs text-rose-500">{errors.school_name}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Deskripsi Singkat / Sambutan Beranda
                            </label>
                            <textarea
                                rows={3}
                                value={data.short_description}
                                onChange={(e) => setData('short_description', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="Ringkasan profil sekolah yang ditampilkan di beranda publik..."
                            />
                            {errors.short_description && <p className="mt-1 text-xs text-rose-500">{errors.short_description}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Nomor Telepon Sekolah
                            </label>
                            <input
                                type="text"
                                value={data.public_phone}
                                onChange={(e) => setData('public_phone', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="Contoh: (0541) 1234567"
                            />
                            {errors.public_phone && <p className="mt-1 text-xs text-rose-500">{errors.public_phone}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Alamat Email Resmi
                            </label>
                            <input
                                type="email"
                                value={data.public_email}
                                onChange={(e) => setData('public_email', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="sdn003samarinda@sekolah.id"
                            />
                            {errors.public_email && <p className="mt-1 text-xs text-rose-500">{errors.public_email}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Alamat Lengkap
                            </label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="Jl. Muara Samarinda, Kota Samarinda, Kalimantan Timur"
                            />
                            {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
                        </div>
                    </div>
                </div>

                {/* Visi, Misi & Sejarah */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                        Visi, Misi & Sejarah Sekolah
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Visi Sekolah
                            </label>
                            <textarea
                                rows={3}
                                value={data.vision}
                                onChange={(e) => setData('vision', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="Tuliskan rumusan visi SDN 003 Samarinda..."
                            />
                            {errors.vision && <p className="mt-1 text-xs text-rose-500">{errors.vision}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Misi Sekolah
                            </label>
                            <textarea
                                rows={4}
                                value={data.mission}
                                onChange={(e) => setData('mission', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="Tuliskan butir-butir misi sekolah..."
                            />
                            {errors.mission && <p className="mt-1 text-xs text-rose-500">{errors.mission}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Sejarah Sekolah
                            </label>
                            <textarea
                                rows={4}
                                value={data.history}
                                onChange={(e) => setData('history', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                placeholder="Tuliskan sejarah berdirinya sekolah..."
                            />
                            {errors.history && <p className="mt-1 text-xs text-rose-500">{errors.history}</p>}
                        </div>
                    </div>
                </div>

                {/* Media & Gambar */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                        Foto & Logo Sekolah
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Unggah Logo Sekolah (Max 2MB)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {profile.logo_path && (
                                <p className="mt-2 text-xs text-slate-500">Logo saat ini: {profile.logo_path}</p>
                            )}
                            {errors.logo && <p className="mt-1 text-xs text-rose-500">{errors.logo}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                Unggah Foto Sampul Sekolah (Max 4MB)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('cover', e.target.files ? e.target.files[0] : null)}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {profile.cover_path && (
                                <p className="mt-2 text-xs text-slate-500">Sampul saat ini: {profile.cover_path}</p>
                            )}
                            {errors.cover && <p className="mt-1 text-xs text-rose-500">{errors.cover}</p>}
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-sm transition-all"
                    >
                        {processing ? 'Menyimpan Perubahan...' : 'Simpan Perubahan Profil'}
                    </button>
                </div>
            </form>
        </OperatorLayout>
    );
}
