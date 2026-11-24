import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Events() {
    return (
        <PublicLayout>
            <Head title="Kegiatan — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Kegiatan Sekolah</h1>
                <p className="text-gray-700">Daftar kegiatan sekolah akan ditampilkan di sini.</p>
                {/* TODO: fetch and paginate events */}
            </section>
        </PublicLayout>
    );
}
