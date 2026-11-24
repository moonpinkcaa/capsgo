import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Achievement {
    id: number;
    title: string;
    description?: string;
    date?: string;
    image_path?: string;
}

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
    return (
        <PublicLayout>
            <Head title="Prestasi — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Prestasi Siswa</h1>
                {achievements.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map(a => (
                            <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                                {a.image_path && (
                                    <img src={a.image_path} alt={a.title} className="w-full h-40 object-cover mb-3" loading="lazy" />
                                )}
                                <h3 className="font-bold text-slate-900">{a.title}</h3>
                                {a.date && <p className="text-xs text-emerald-600 font-semibold mt-1">{a.date}</p>}
                                {a.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{a.description}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center">
                        <p className="text-sm text-slate-400">Data prestasi belum tersedia.</p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
