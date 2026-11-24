import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function FacilitiesEdit() {
    return (
        <OperatorLayout>
            <Head title="Edit Fasilitas" />
            <section className="py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Fasilitas</h1>
                <p className="text-gray-600">Formulir untuk mengubah data fasilitas.</p>
                {/* TODO: implement edit form */}
            </section>
        </OperatorLayout>
    );
}
