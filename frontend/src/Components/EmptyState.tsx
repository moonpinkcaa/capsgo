import React from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    actionLabel,
    onAction,
}) => {
    return (
        <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
            {actionLabel && onAction && (
                <div className="mt-5">
                    <button
                        type="button"
                        onClick={onAction}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                    >
                        {actionLabel}
                    </button>
                </div>
            )}
        </div>
    );
};
