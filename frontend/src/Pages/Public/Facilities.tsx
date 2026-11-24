import React from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { Facility, PaginatedData } from '../../types';
import { Pagination } from '../../Components/Pagination';
import { EmptyState } from '../../Components/EmptyState';

interface Props {
    facilities: PaginatedData<Facility>;
    categories: string[];
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Facilities({ facilities, categories, filters }: Props) {
    const handleFilter = (search?: string, category?: string) => {
        router.get(
            '/fasilitas',
            { search: search ?? filters.search, category: category ?? filters.category },
            { preserveState: true, replace: true }
        );
    };

    return (
        <PublicLayout>
            <Head title="Fasilitas Sekolah - SDN 003 Samarinda" />

            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Sarana & Prasarana</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Fasilitas Sekolah</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Fasilitas penunjang belajar mengajar yang memadai, bersih, dan aman guna mendukung kenyamanan siswa.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Search & Category Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => handleFilter(filters.search, '')}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                !filters.category
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            Semua
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleFilter(filters.search, cat)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                    filters.category === cat
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Cari fasilitas..."
                            defaultValue={filters.search || ''}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleFilter((e.target as HTMLInputElement).value, filters.category);
                                }
                            }}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                        />
                    </div>
                </div>

                {/* Facilities List */}
                <div className="mt-8">
                    {facilities.data.length === 0 ? (
                        <EmptyState
                            title="Tidak Ada Fasilitas"
                            description="Belum ada fasilitas yang sesuai dengan pencarian atau kategori ini."
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {facilities.data.map((facility) => (
                                <div
                                    key={facility.id}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col"
                                >
                                    <div className="h-52 bg-slate-100 overflow-hidden flex items-center justify-center">
                                        {facility.image_path ? (
                                            <img
                                                src={`/storage/${facility.image_path}`}
                                                alt={facility.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <span>Fasilitas Sekolah</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                                {facility.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-slate-900 mt-1">{facility.name}</h3>
                                            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                                {facility.description || 'Fasilitas penunjang kegiatan di SDN 003 Samarinda.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Pagination
                        links={facilities.links}
                        from={facilities.from}
                        to={facilities.to}
                        total={facilities.total}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}
