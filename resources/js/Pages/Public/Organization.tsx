import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Organization() {
    return (
        <PublicLayout>
            <Head title="Struktur Organisasi — SDN 003 Samarinda" />
            <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900">Struktur Organisasi</h1>
                    <p className="text-sm text-slate-500 mt-2">Susunan organisasi SDN 003 Samarinda</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <p className="text-sm text-slate-500">Halaman ini akan berisi diagram struktur organisasi sekolah. Konten akan diperbarui oleh Operator.</p>
                </div>
            </section>
        </PublicLayout>
    );
}
