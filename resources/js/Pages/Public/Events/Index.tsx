import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Event {
    id: number;
    title: string;
    description?: string;
    date?: string;
    image_path?: string;
}

export default function Events({ events }: { events: Event[] }) {
    return (
        <PublicLayout>
            <Head title="Kegiatan — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Kegiatan Sekolah</h1>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(ev => (
                            <div key={ev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                                {ev.image_path && (
                                    <img src={ev.image_path} alt={ev.title} className="w-full h-40 object-cover mb-3" loading="lazy" />
                                )}
                                <h3 className="font-bold text-slate-900">{ev.title}</h3>
                                {ev.date && <p className="text-xs text-emerald-600 font-semibold mt-1">{ev.date}</p>}
                                {ev.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{ev.description}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center">
                        <p className="text-sm text-slate-400">Data kegiatan belum tersedia.</p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
