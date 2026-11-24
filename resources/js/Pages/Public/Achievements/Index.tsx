import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Achievements() {
    return (
        <PublicLayout>
            <Head title="Prestasi — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Prestasi Siswa</h1>
                <p className="text-gray-700">Daftar prestasi siswa akan ditampilkan di sini.</p>
                {/* TODO: fetch and paginate achievements */}
            </section>
        </PublicLayout>
    );
}
