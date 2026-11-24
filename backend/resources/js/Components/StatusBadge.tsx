import React from 'react';

interface StatusBadgeProps {
    status: 'draf' | 'terbit' | 'arsip' | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    switch (status.toLowerCase()) {
        case 'terbit':
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-600 rounded-full"></span>
                    Terbit
                </span>
            );
        case 'draf':
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-amber-600 rounded-full"></span>
                    Draf
                </span>
            );
        case 'arsip':
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-gray-500 rounded-full"></span>
                    Arsip
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {status}
                </span>
            );
    }
};
