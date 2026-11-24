import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Extracurricular { id: number; name: string; description?: string; image_path?: string; }

export default function Extracurriculars({ extracurriculars }: { extracurriculars: Extracurricular[] }) {
    return (
        <PublicLayout>
            <Head title="Ekstrakurikuler — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Ekstrakurikuler Sekolah</h1>
                {extracurriculars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {extracurriculars.map(ec => (
                            <div key={ec.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                                {ec.image_path && (
                                    <img src={ec.image_path} alt={ec.name} className="w-full h-40 object-cover mb-3" loading="lazy" />
                                )}
                                <h3 className="font-bold text-slate-900">{ec.name}</h3>
                                {ec.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{ec.description}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center">
                        <p className="text-sm text-slate-400">Data ekstrakurikuler belum tersedia.</p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
    return (
        <PublicLayout>
            <Head title="Ekstrakurikuler — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Ekstrakurikuler Sekolah</h1>
                <p className="text-gray-700">Daftar ekstrakurikuler akan ditampilkan di sini.</p>
                {/* TODO: fetch and display extracurriculars */}
            </section>
        </PublicLayout>
    );
}
