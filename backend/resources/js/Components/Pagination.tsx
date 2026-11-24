import React from 'react';
import { Link } from '@inertiajs/react';
import { PaginationLink } from '../types';

interface PaginationProps {
    links: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number;
}

export const Pagination: React.FC<PaginationProps> = ({ links, from, to, total }) => {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
            {typeof total === 'number' && (
                <p className="text-sm text-gray-600">
                    Menampilkan <span className="font-semibold text-gray-900">{from ?? 0}</span> sampai{' '}
                    <span className="font-semibold text-gray-900">{to ?? 0}</span> dari{' '}
                    <span className="font-semibold text-gray-900">{total}</span> data
                </p>
            )}
            <nav className="flex items-center space-x-1" aria-label="Pagination">
                {links.map((link, idx) => {
                    const cleanLabel = link.label
                        .replace('&laquo; Previous', 'Sebelumnya')
                        .replace('Next &raquo;', 'Selanjutnya');

                    if (!link.url) {
                        return (
                            <span
                                key={idx}
                                className="px-3 py-1.5 text-xs sm:text-sm text-gray-400 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: cleanLabel }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url}
                            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md border transition-colors ${
                                link.active
                                    ? 'bg-blue-600 text-white border-blue-600 font-medium'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                            dangerouslySetInnerHTML={{ __html: cleanLabel }}
                        />
                    );
                })}
            </nav>
        </div>
    );
};
