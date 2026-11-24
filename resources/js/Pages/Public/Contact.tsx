import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Contact() {
    return (
        <PublicLayout>
            <Head title="Kontak — SDN 003 Samarinda" />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Kontak Sekolah</h1>
                <p className="text-gray-700">Informasi kontak (alamat, telepon, email) akan ditampilkan di sini.</p>
                {/* TODO: fetch from SchoolProfile model */}
            </section>
        </PublicLayout>
    );
}
