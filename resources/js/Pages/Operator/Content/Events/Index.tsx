import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function EventsIndex() {
    return (
        <OperatorLayout>
            <Head title="Kelola Kegiatan" />
            <section className="py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Daftar Kegiatan Sekolah</h1>
                <p className="text-gray-600">Tabel kegiatan akan ditampilkan di sini.</p>
                {/* TODO: fetch list, add edit/delete actions */}
            </section>
        </OperatorLayout>
    );
}
