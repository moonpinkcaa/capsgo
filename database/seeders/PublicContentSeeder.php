<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeacherProfile;
use App\Models\Facility;
use App\Models\Extracurricular;
use App\Models\SchoolEvent;
use App\Models\Achievement;
use App\Models\SchoolProfile;
use Carbon\Carbon;

class PublicContentSeeder extends Seeder
{
    /**
     * Seed data contoh konten publik.
     */
    public function run(): void
    {
        // Profil Sekolah (satu record)
        SchoolProfile::firstOrCreate([], [
            'school_name' => 'SDN 003 Samarinda',
            'short_description' => 'Sekolah Dasar Negeri unggulan di kota Samarinda, Kalimantan Timur.',
            'history' => 'SDN 003 Samarinda telah berdiri sejak lama dan terus berkembang menjadi salah satu sekolah dasar terbaik di kota Samarinda.',
            'vision' => 'Mewujudkan generasi cerdas, berkarakter, dan berdaya saing.',
            'mission' => 'Menyelenggarakan pendidikan yang berkualitas dan inklusif bagi seluruh siswa.',
            'address' => 'Jalan Merdeka No.12, Samarinda, Kalimantan Timur',
            'public_phone' => '0541-123456',
            'public_email' => 'info@sdn003samarinda.sch.id',
        ]);

        // Data Guru Publik
        $teachers = [
            ['full_name' => 'Hj. Siti Aminah, S.Pd', 'position' => 'Kepala Sekolah', 'public_bio' => 'Memimpin SDN 003 Samarinda dengan dedikasi tinggi.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Ahmad Fauzi, S.Pd', 'position' => 'Guru Kelas 6A', 'public_bio' => 'Guru berpengalaman di bidang matematika dan sains.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Nur Hidayah, S.Pd', 'position' => 'Guru Kelas 5B', 'public_bio' => 'Spesialis pembelajaran kreatif dan seni.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Budi Santoso, S.Pd', 'position' => 'Guru PJOK', 'public_bio' => 'Pembina kegiatan olahraga dan ekstrakurikuler.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Rina Wati, S.Pd', 'position' => 'Guru Kelas 4A', 'public_bio' => 'Fokus pada pengembangan literasi dan numerasi dasar.', 'is_published' => true, 'is_active' => true],
        ];
        foreach ($teachers as $t) {
            TeacherProfile::firstOrCreate(['full_name' => $t['full_name']], $t);
        }

        // Fasilitas
        $facilities = [
            ['name' => 'Perpustakaan', 'category' => 'Akademik', 'description' => 'Perpustakaan lengkap dengan koleksi buku pelajaran dan literatur anak.', 'publication_status' => 'published'],
            ['name' => 'Laboratorium Komputer', 'category' => 'Teknologi', 'description' => 'Ruang komputer dengan akses internet untuk pembelajaran digital.', 'publication_status' => 'published'],
            ['name' => 'Lapangan Olahraga', 'category' => 'Olahraga', 'description' => 'Lapangan serbaguna untuk kegiatan olahraga dan upacara.', 'publication_status' => 'published'],
            ['name' => 'Mushola', 'category' => 'Ibadah', 'description' => 'Tempat ibadah bagi siswa dan guru.', 'publication_status' => 'published'],
            ['name' => 'UKS', 'category' => 'Kesehatan', 'description' => 'Unit Kesehatan Sekolah dengan peralatan P3K lengkap.', 'publication_status' => 'published'],
            ['name' => 'Kantin Sehat', 'category' => 'Umum', 'description' => 'Kantin yang menyediakan makanan sehat dan terjangkau.', 'publication_status' => 'published'],
        ];
        foreach ($facilities as $f) {
            Facility::firstOrCreate(['name' => $f['name']], $f);
        }

        // Ekstrakurikuler
        $extracurriculars = [
            ['name' => 'Pramuka', 'description' => 'Kegiatan kepanduan untuk melatih kemandirian dan kerja sama.', 'schedule_text' => 'Jumat, 14:00-16:00', 'supervisor_name' => 'Budi Santoso, S.Pd', 'publication_status' => 'published'],
            ['name' => 'Seni Tari', 'description' => 'Pelatihan tarian tradisional Kalimantan Timur.', 'schedule_text' => 'Rabu, 14:00-16:00', 'supervisor_name' => 'Nur Hidayah, S.Pd', 'publication_status' => 'published'],
            ['name' => 'Futsal', 'description' => 'Olahraga futsal untuk siswa putra dan putri.', 'schedule_text' => 'Selasa & Kamis, 14:00-16:00', 'supervisor_name' => 'Budi Santoso, S.Pd', 'publication_status' => 'published'],
            ['name' => 'English Club', 'description' => 'Kelompok belajar bahasa Inggris yang menyenangkan.', 'schedule_text' => 'Senin, 14:00-15:30', 'supervisor_name' => 'Ahmad Fauzi, S.Pd', 'publication_status' => 'published'],
        ];
        foreach ($extracurriculars as $e) {
            Extracurricular::firstOrCreate(['name' => $e['name']], $e);
        }

        // Kegiatan Sekolah
        $events = [
            ['title' => 'Upacara Peringatan Hari Kemerdekaan', 'event_date' => Carbon::create(2026, 8, 17), 'category' => 'Upacara', 'description' => 'Upacara peringatan HUT Kemerdekaan RI ke-81 yang diikuti oleh seluruh siswa dan guru.', 'publication_status' => 'published'],
            ['title' => 'Lomba Cerdas Cermat Tingkat Kecamatan', 'event_date' => Carbon::create(2026, 9, 15), 'category' => 'Lomba', 'description' => 'Perwakilan siswa mengikuti lomba cerdas cermat antar SD se-kecamatan.', 'publication_status' => 'published'],
            ['title' => 'Pentas Seni Akhir Semester', 'event_date' => Carbon::create(2026, 6, 20), 'category' => 'Seni', 'description' => 'Pertunjukan seni dan budaya hasil latihan siswa selama satu semester.', 'publication_status' => 'published'],
        ];
        foreach ($events as $ev) {
            SchoolEvent::firstOrCreate(['title' => $ev['title']], $ev);
        }

        // Prestasi Siswa
        $achievements = [
            ['title' => 'Juara 1 Lomba Cerdas Cermat Kecamatan', 'student_display_name' => 'Tim CCA SDN 003', 'category' => 'Akademik', 'level' => 'Kecamatan', 'achievement_date' => Carbon::create(2026, 9, 15), 'description' => 'Meraih juara pertama dalam lomba cerdas cermat tingkat kecamatan.', 'publication_status' => 'published'],
            ['title' => 'Juara 2 Lomba Tari Tradisional Kota', 'student_display_name' => 'Regu Tari SDN 003', 'category' => 'Seni', 'level' => 'Kota', 'achievement_date' => Carbon::create(2026, 7, 10), 'description' => 'Meraih peringkat kedua pada Festival Tari Tradisional Kota Samarinda.', 'publication_status' => 'published'],
            ['title' => 'Juara 3 Turnamen Futsal Antar SD', 'student_display_name' => 'Tim Futsal SDN 003', 'category' => 'Olahraga', 'level' => 'Kota', 'achievement_date' => Carbon::create(2026, 10, 5), 'description' => 'Meraih peringkat ketiga pada Turnamen Futsal Antar SD se-Samarinda.', 'publication_status' => 'published'],
            ['title' => 'Siswa Teladan Tingkat Kecamatan', 'student_display_name' => 'Aisyah Putri', 'category' => 'Akademik', 'level' => 'Kecamatan', 'achievement_date' => Carbon::create(2026, 5, 20), 'description' => 'Terpilih sebagai siswa teladan tingkat kecamatan berdasarkan prestasi akademik dan non-akademik.', 'publication_status' => 'published'],
            ['title' => 'Juara Harapan Olimpiade Sains SD', 'student_display_name' => 'Rizky Pratama', 'category' => 'Sains', 'level' => 'Provinsi', 'achievement_date' => Carbon::create(2026, 11, 1), 'description' => 'Meraih juara harapan pada Olimpiade Sains tingkat provinsi Kalimantan Timur.', 'publication_status' => 'published'],
        ];
        foreach ($achievements as $a) {
            Achievement::firstOrCreate(['title' => $a['title']], $a);
        }
    }
}
