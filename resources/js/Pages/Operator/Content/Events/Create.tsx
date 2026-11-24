import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function EventsCreate() {
    return (
        <OperatorLayout>
            <Head title="Tambah Kegiatan" />
            <section className="py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Tambah Kegiatan Sekolah</h1>
                <p className="text-gray-600">Formulir untuk menambahkan kegiatan baru.</p>
                {/* TODO: implement form */}
            </section>
        </OperatorLayout>
    );
}
