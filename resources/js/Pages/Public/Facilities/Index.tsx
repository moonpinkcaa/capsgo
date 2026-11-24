import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Facility {
    id: number;
    name: string;
    category?: string;
    description?: string;
    image_path?: string;
}

export default function Facilities({ facilities }: { facilities: Facility[] }) {
    return (
        <PublicLayout>
            <Head title="Fasilitas — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Fasilitas Sekolah</h1>
                {facilities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facilities.map(f => (
                            <div key={f.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                                {f.image_path && (
                                    <img src={f.image_path} alt={f.name} className="w-full h-40 object-cover mb-3" loading="lazy" />
                                )}
                                <h3 className="font-bold text-slate-900">{f.name}</h3>
                                {f.category && <p className="text-xs text-emerald-600 font-semibold mt-1">{f.category}</p>}
                                {f.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{f.description}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center">
                        <p className="text-sm text-slate-400">Data fasilitas belum tersedia.</p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
