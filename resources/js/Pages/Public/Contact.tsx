import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface SchoolProfileData {
    school_name?: string;
    address?: string;
    public_phone?: string;
    public_email?: string;
}

export default function Contact({ profile }: { profile?: SchoolProfileData }) {
    return (
        <PublicLayout>
            <Head title="Kontak — SDN 003 Samarinda" />

            <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">Hubungi Kami</h1>
                    <p className="text-sm text-slate-500 mt-2">
                        Informasi kontak resmi {profile?.school_name || 'SDN 003 Samarinda'}.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800 uppercase mb-2">Alamat</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {profile?.address || 'Jalan Merdeka No.12, Samarinda, Kalimantan Timur'}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800 uppercase mb-2">Telepon</h2>
                        <p className="text-sm text-slate-600">
                            {profile?.public_phone || '0541-123456'}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800 uppercase mb-2">Email</h2>
                        <p className="text-sm text-slate-600">
                            {profile?.public_email || 'info@sdn003samarinda.sch.id'}
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
