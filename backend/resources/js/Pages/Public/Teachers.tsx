import React from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '../../Layouts/PublicLayout';
import { PaginatedData, TeacherProfile } from '../../types';
import { Pagination } from '../../Components/Pagination';
import { EmptyState } from '../../Components/EmptyState';

interface Props {
    teachers: PaginatedData<TeacherProfile>;
    filters: {
        search?: string;
    };
}

export default function Teachers({ teachers, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const searchInput = (form.elements.namedItem('search') as HTMLInputElement).value;
        router.get('/guru', { search: searchInput }, { preserveState: true, replace: true });
    };

    return (
        <PublicLayout>
            <Head title="Guru & Tenaga Kependidikan - SDN 003 Samarinda" />

            {/* Header */}
            <div className="bg-slate-900 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Pendidik Profesional</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Guru & Tenaga Kependidikan</h1>
                    <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                        Tenaga pendidik berdedikasi tinggi yang mendampingi dan membimbing putra-putri kita menuju prestasi terbaik.
                    </p>
                </div>
            </div>

            {/* Search Filter Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            name="search"
                            defaultValue={filters.search || ''}
                            placeholder="Cari nama guru atau jabatan..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                    >
                        Cari
                    </button>
                </form>

                {/* Teachers Grid */}
                <div className="mt-10">
                    {teachers.data.length === 0 ? (
                        <EmptyState
                            title="Tidak Ada Data Guru"
                            description={filters.search ? `Tidak ditemukan guru dengan kata kunci "${filters.search}".` : 'Daftar tenaga pendidik yang dipublikasikan belum tersedia.'}
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {teachers.data.map((teacher) => (
                                <div
                                    key={teacher.id}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow text-center flex flex-col justify-between"
                                >
                                    <div className="p-6">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 border-2 border-blue-100 overflow-hidden mb-4 flex items-center justify-center">
                                            {teacher.photo_path ? (
                                                <img src={`/storage/${teacher.photo_path}`} alt={teacher.full_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <svg className="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900">{teacher.full_name}</h3>
                                        <p className="text-xs font-semibold text-blue-600 mt-1">{teacher.position || 'Tenaga Pendidik'}</p>
                                        {teacher.public_bio && (
                                            <p className="mt-3 text-xs text-slate-500 line-clamp-3 leading-relaxed">{teacher.public_bio}</p>
                                        )}
                                    </div>
                                    <div className="py-2.5 px-4 bg-slate-50 border-t border-slate-100 text-[11px] font-medium text-slate-500">
                                        SDN 003 Samarinda
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Pagination
                        links={teachers.links}
                        from={teachers.from}
                        to={teachers.to}
                        total={teachers.total}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}
