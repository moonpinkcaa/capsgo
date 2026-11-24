export interface SchoolProfile {
    id: number;
    school_name: string;
    short_description?: string | null;
    history?: string | null;
    vision?: string | null;
    mission?: string | null;
    address?: string | null;
    public_phone?: string | null;
    public_email?: string | null;
    logo_path?: string | null;
    cover_path?: string | null;
    updated_by?: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface Facility {
    id: number;
    name: string;
    category: string;
    description?: string | null;
    image_path?: string | null;
    publication_status: 'draf' | 'terbit' | 'arsip';
    created_by?: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface Extracurricular {
    id: number;
    name: string;
    description?: string | null;
    schedule_text?: string | null;
    supervisor_name?: string | null;
    image_path?: string | null;
    publication_status: 'draf' | 'terbit' | 'arsip';
    created_by?: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface EventPhoto {
    id: number;
    school_event_id: number;
    file_path: string;
    caption?: string | null;
    sort_order: number;
}

export interface SchoolEvent {
    id: number;
    title: string;
    event_date: string;
    category: string;
    description?: string | null;
    cover_image_path?: string | null;
    publication_status: 'draf' | 'terbit' | 'arsip';
    created_by?: number | null;
    photos?: EventPhoto[];
    created_at?: string;
    updated_at?: string;
}

export interface Achievement {
    id: number;
    title: string;
    student_display_name?: string | null;
    category: string;
    level: string;
    achievement_date?: string | null;
    description?: string | null;
    image_path?: string | null;
    publication_status: 'draf' | 'terbit' | 'arsip';
    verified_by?: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface TeacherProfile {
    id: number;
    user_id?: number | null;
    full_name: string;
    position?: string | null;
    photo_path?: string | null;
    public_bio?: string | null;
    is_published: boolean;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}
