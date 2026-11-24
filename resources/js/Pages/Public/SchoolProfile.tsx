import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface SchoolProfileData {
    school_name: string;
    short_description?: string;
    history?: string;
    vision?: string;
    mission?: string;
    address?: string;
}

export default function SchoolProfile({ profile }: { profile?: SchoolProfileData }) {
    return (
        <PublicLayout>
            <Head title="Profil Sekolah — SDN 003 Samarinda" />

            <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">Profil Sekolah</h1>
                    <p className="text-sm text-slate-500 mt-2">{profile?.short_description || 'Mengenal lebih dekat SDN 003 Samarinda.'}</p>
                </div>

                {profile?.history && (
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-3">Sejarah Singkat</h2>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{profile.history}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                        <h2 className="text-lg font-bold text-emerald-800 mb-3">🎯 Visi</h2>
                        <p className="text-sm text-emerald-700 leading-relaxed whitespace-pre-line">{profile?.vision || 'Visi sekolah belum diisi oleh Operator.'}</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                        <h2 className="text-lg font-bold text-blue-800 mb-3">📋 Misi</h2>
                        <p className="text-sm text-blue-700 leading-relaxed whitespace-pre-line">{profile?.mission || 'Misi sekolah belum diisi oleh Operator.'}</p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
