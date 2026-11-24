import { Head } from '@inertiajs/react';
import OperatorLayout from '@/Layouts/OperatorLayout';

export default function AchievementsIndex() {
    return (
        <OperatorLayout>
            <Head title="Kelola Prestasi" />
            <section className="py-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Daftar Prestasi</h1>
                <p className="text-gray-600">Tabel prestasi akan ditampilkan di sini.</p>
                {/* TODO: fetch list, add edit/delete */}
            </section>
        </OperatorLayout>
    );
}
