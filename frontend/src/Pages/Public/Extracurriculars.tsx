import React from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { Extracurricular, PaginatedData } from '../../types';
import { Pagination } from '../../Components/Pagination';
import { EmptyState } from '../../Components/EmptyState';

interface Props {
    extracurriculars: PaginatedData<Extracurricular>;
    filters: {
        search?: string;
    };
}

export default function Extracurriculars({ extracurriculars, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const searchVal = (form.elements.namedItem('search') as HTMLInputElement).value;
        router.get('/ekstrakurikuler', { search: searchVal }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout>
            <Head title="Ekstrakurikuler - SDN 003 Samarinda" />

            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Minat & Bakat</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Ekstrakurikuler Sekolah</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Wadah pengembangan potensi diri, kepemimpinan, kreativitas, dan sportivitas peserta didik di luar jam pelajaran inti.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <form onSubmit={handleSearch} className="max-w-md flex gap-3 mb-8">
                    <input
                        type="text"
                        name="search"
                        defaultValue={filters.search || ''}
                        placeholder="Cari kegiatan atau nama pembina..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                    >
                        Cari
                    </button>
                </form>

                {extracurriculars.data.length === 0 ? (
                    <EmptyState
                        title="Tidak Ada Kegiatan Ekstrakurikuler"
                        description={filters.search ? `Tidak ada hasil pencarian untuk "${filters.search}".` : 'Daftar ekstrakurikuler belum diterbitkan.'}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {extracurriculars.data.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="h-48 bg-slate-100 overflow-hidden flex items-center justify-center">
                                        {item.image_path ? (
                                            <img src={`/storage/${item.image_path}`} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Ekstrakurikuler SDN 003</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                            {item.description || 'Kegiatan ekstrakurikuler resmi di SDN 003 Samarinda.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-2 text-xs text-slate-500">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-400">Jadwal Latihan:</span>
                                        <span className="font-semibold text-slate-800">{item.schedule_text || 'Menyesuaikan jadwal'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-400">Pembina:</span>
                                        <span className="font-semibold text-slate-800">{item.supervisor_name || 'Tim Pembina Sekolah'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Pagination
                    links={extracurriculars.links}
                    from={extracurriculars.from}
                    to={extracurriculars.to}
                    total={extracurriculars.total}
                />
            </div>
        </PublicLayout>
    );
}
