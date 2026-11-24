import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Facilities() {
    return (
        <PublicLayout>
            <Head title="Fasilitas — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Fasilitas Sekolah</h1>
                <p className="text-gray-700">Daftar fasilitas sekolah akan ditampilkan di sini.</p>
                {/* TODO: fetch and map facilities from API */}
            </section>
        </PublicLayout>
    );
}
