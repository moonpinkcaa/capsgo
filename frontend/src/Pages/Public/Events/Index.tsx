import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '../../../Layouts/PublicLayout';
import { PaginatedData, SchoolEvent } from '../../../types';
import { Pagination } from '../../../Components/Pagination';
import { EmptyState } from '../../../Components/EmptyState';

interface Props {
    events: PaginatedData<SchoolEvent>;
    categories: string[];
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Index({ events, categories, filters }: Props) {
    const handleFilter = (search?: string, category?: string) => {
        router.get(
            '/kegiatan',
            { search: search ?? filters.search, category: category ?? filters.category },
            { preserveState: true, replace: true }
        );
    };

    return (
        <PublicLayout>
            <Head title="Dokumentasi Kegiatan - SDN 003 Samarinda" />

            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Kilas Kegiatan</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Dokumentasi Kegiatan Sekolah</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Kumpulan rekaman kegiatan pembelajaran, peringatan hari besar, upacara, dan kegiatan kebersamaan di SDN 003 Samarinda.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
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
                            Semua Kegiatan
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

                    <div className="w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Cari kegiatan..."
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

                {/* Events Grid */}
                <div className="mt-8">
                    {events.data.length === 0 ? (
                        <EmptyState
                            title="Tidak Ada Dokumentasi"
                            description="Belum ada dokumentasi kegiatan yang diterbitkan pada kategori ini."
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.data.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/kegiatan/${event.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="h-52 bg-slate-100 overflow-hidden relative">
                                            {event.cover_image_path ? (
                                                <img
                                                    src={`/storage/${event.cover_image_path}`}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                                    Dokumentasi Foto
                                                </div>
                                            )}
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-slate-800 backdrop-blur-xs">
                                                {event.category}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <span className="text-xs text-slate-400 font-medium">
                                                {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                            <h3 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0 text-xs font-semibold text-blue-600 flex items-center gap-1">
                                        Lihat Galeri Foto & Detail &rarr;
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <Pagination
                        links={events.links}
                        from={events.from}
                        to={events.to}
                        total={events.total}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}
