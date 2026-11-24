import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function FacilitiesIndex() {
    return (
        <OperatorLayout>
            <Head title="Kelola Fasilitas" />
            <section className="py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Daftar Fasilitas</h1>
                <p className="text-gray-600">Tabel fasilitas akan ditampilkan di sini.</p>
                {/* TODO: fetch list, add edit/delete actions */}
            </section>
        </OperatorLayout>
    );
}
