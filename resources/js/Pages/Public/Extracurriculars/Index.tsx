import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Extracurriculars() {
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
