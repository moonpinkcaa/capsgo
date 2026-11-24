import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '../../../Layouts/PublicLayout';
import { SchoolEvent } from '../../../types';

interface Props {
    event: SchoolEvent;
    relatedEvents: SchoolEvent[];
}

export default function Show({ event, relatedEvents }: Props) {
    return (
        <PublicLayout>
            <Head title={`${event.title} - Dokumentasi Kegiatan`} />

            {/* Breadcrumb & Header */}
            <div className="bg-slate-900 text-white py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                        <Link href="/" className="hover:text-white">Beranda</Link>
                        <span>/</span>
                        <Link href="/kegiatan" className="hover:text-white">Kegiatan</Link>
                        <span>/</span>
                        <span className="text-slate-200 truncate">{event.title}</span>
                    </nav>

                    <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-blue-600/80 text-white mb-3">
                        {event.category}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">{event.title}</h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300">
                        Dilaksanakan pada: {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Cover Image */}
                {event.cover_image_path && (
                    <div className="rounded-2xl overflow-hidden shadow-md mb-8 max-h-[480px]">
                        <img src={`/storage/${event.cover_image_path}`} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Description */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs mb-12">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Deskripsi Kegiatan</h2>
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                        {event.description || 'Tidak ada keterangan tambahan mengenai kegiatan ini.'}
                    </p>
                </div>

                {/* Photo Gallery */}
                {event.photos && event.photos.length > 0 && (
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Galeri Foto Kegiatan</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {event.photos.map((photo) => (
                                <div key={photo.id} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={`/storage/${photo.file_path}`}
                                            alt={photo.caption || event.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    {photo.caption && (
                                        <div className="p-3 bg-white text-xs text-slate-600">
                                            {photo.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Events */}
                {relatedEvents.length > 0 && (
                    <div className="pt-10 border-t border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Dokumentasi Kegiatan Lainnya</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedEvents.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/kegiatan/${rel.id}`}
                                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors"
                                >
                                    <span className="text-[11px] font-semibold text-blue-600">{rel.category}</span>
                                    <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">{rel.title}</h4>
                                    <span className="text-[11px] text-slate-400 mt-2 block">
                                        {new Date(rel.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
