import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function ExtracurricularsCreate() {
    return (
        <OperatorLayout>
            <Head title="Tambah Ekstrakurikuler" />
            <section className="py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Tambah Ekstrakurikuler</h1>
                <p className="text-gray-600">Formulir untuk menambahkan ekstrakurikuler baru.</p>
                {/* TODO: implement form */}
            </section>
        </OperatorLayout>
    );
}
