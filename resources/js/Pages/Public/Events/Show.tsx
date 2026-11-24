import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface EventDetail {
    id: number;
    title: string;
    description?: string;
    date?: string;
    image_path?: string;
}

export default function EventShow({ event }: { event: EventDetail }) {
    return (
        <PublicLayout>
            <Head title={event.title + ' — SDN 003 Samarinda'} />
            <section className="py-12 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                {event.image_path && (
                    <img src={event.image_path} alt={event.title} className="w-full h-64 object-cover mb-6" loading="lazy" />
                )}
                {event.date && (
                    <p className="text-sm text-emerald-600 font-semibold mb-2">{event.date}</p>
                )}
                {event.description && (
                    <div className="prose" dangerouslySetInnerHTML={{ __html: event.description }} />
                )}
            </section>
        </PublicLayout>
    );
}
