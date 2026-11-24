import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Teacher { id: number; full_name: string; position?: string; public_bio?: string; }

export default function TeachersIndex({ teachers }: { teachers: Teacher[] }) {
    return (
        <PublicLayout>
            <Head title="Tenaga Pendidik — SDN 003 Samarinda" />
            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900">Tenaga Pendidik</h1>
                    <p className="text-sm text-slate-500 mt-2">Daftar guru dan tenaga pengajar SDN 003 Samarinda</p>
                </div>
                {teachers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teachers.map((t) => (
                            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-700 mx-auto mb-3">
                                    {t.full_name.charAt(0)}
                                </div>
                                <h3 className="font-bold text-slate-900">{t.full_name}</h3>
                                {t.position && <p className="text-xs text-emerald-600 font-semibold mt-1">{t.position}</p>}
                                {t.public_bio && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.public_bio}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center">
                        <p className="text-sm text-slate-400">Data guru belum tersedia.</p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
