import React from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { Achievement, PaginatedData } from '../../types';
import { Pagination } from '../../Components/Pagination';
import { EmptyState } from '../../Components/EmptyState';

interface Props {
    achievements: PaginatedData<Achievement>;
    levels: string[];
    categories: string[];
    filters: {
        search?: string;
        level?: string;
        category?: string;
    };
}

export default function Achievements({ achievements, levels, categories, filters }: Props) {
    const handleFilter = (search?: string, level?: string, category?: string) => {
        router.get(
            '/prestasi',
            {
                search: search ?? filters.search,
                level: level ?? filters.level,
                category: category ?? filters.category,
            },
            { preserveState: true, replace: true }
        );
    };

    return (
        <PublicLayout>
            <Head title="Prestasi Siswa - SDN 003 Samarinda" />

            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Kebanggaan Sekolah</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Prestasi Siswa</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Apresiasi dan catatan torehan prestasi gemilang para siswa SDN 003 Samarinda di berbagai ajang kompetisi.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Filter bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleFilter(filters.search, '', '')}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                !filters.level && !filters.category
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            Semua Tingkat
                        </button>
                        {levels.map((lvl) => (
                            <button
                                key={lvl}
                                type="button"
                                onClick={() => handleFilter(filters.search, lvl, filters.category)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                    filters.level === lvl
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                Tingkat {lvl}
                            </button>
                        ))}
                    </div>

                    <div className="w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Cari prestasi atau nama siswa..."
                            defaultValue={filters.search || ''}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleFilter((e.target as HTMLInputElement).value, filters.level, filters.category);
                                }
                            }}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                        />
                    </div>
                </div>

                {/* Achievements List */}
                <div className="mt-8">
                    {achievements.data.length === 0 ? (
                        <EmptyState
                            title="Tidak Ada Data Prestasi"
                            description="Belum ada data prestasi yang terbit sesuai filter ini."
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {achievements.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        {item.image_path ? (
                                            <div className="h-48 bg-slate-100 overflow-hidden">
                                                <img src={`/storage/${item.image_path}`} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-28 bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white">
                                                <svg className="w-12 h-12 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                                    Tingkat {item.level}
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    {item.achievement_date ? new Date(item.achievement_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : ''}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                            {item.student_display_name && (
                                                <p className="mt-1 text-xs font-semibold text-blue-600">
                                                    Peraih: {item.student_display_name}
                                                </p>
                                            )}
                                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                                {item.description || 'Pencapaian prestasi membanggakan bagi SDN 003 Samarinda.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                                        Kategori: {item.category}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Pagination
                        links={achievements.links}
                        from={achievements.from}
                        to={achievements.to}
                        total={achievements.total}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}
