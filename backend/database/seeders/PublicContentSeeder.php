<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\EventPhoto;
use App\Models\Extracurricular;
use App\Models\Facility;
use App\Models\SchoolEvent;
use App\Models\SchoolProfile;
use App\Models\TeacherProfile;
use Illuminate\Database\Seeder;

class PublicContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Profil Sekolah SDN 003 Samarinda
        SchoolProfile::updateOrCreate(
            ['id' => 1],
            [
                'school_name' => 'SDN 003 Samarinda',
                'short_description' => 'Mewujudkan lingkungan belajar yang religius, cerdas, berkarakter mulia, serta membekali generasi masa depan dengan kecakapan abad ke-21.',
                'history' => 'SDN 003 Samarinda didirikan sebagai wadah pendidikan dasar bagi masyarakat Kota Samarinda. Seiring perkembangannya, sekolah terus meningkatkan sarana dan kualitas pembelajaran hingga meraih berbagai prestasi akademik maupun non-akademik di tingkat kota dan provinsi.',
                'vision' => "Terwujudnya peserta didik yang beriman dan bertakwa, cerdas, mandiri, berkarakter mulia, berwawasan lingkungan, serta unggul dalam prestasi.",
                'mission' => "1. Menumbuhkan penghayatan terhadap ajaran agama dan budaya bangsa.\n2. Melaksanakan proses pembelajaran yang aktif, kreatif, inovatif, dan menyenangkan.\n3. Mengembangkan potensi bakat, minat, dan kreativitas siswa secara optimal.\n4. Menumbuhkan kepedulian terhadap kelestarian lingkungan dan budaya hidup sehat.",
                'address' => 'Jl. Muara Samarinda, Kota Samarinda, Kalimantan Timur 75111',
                'public_phone' => '(0541) 1234567',
                'public_email' => 'sdn003samarinda@sekolah.id',
            ]
        );

        // 2. Tenaga Pendidik
        $teachers = [
            ['full_name' => 'Drs. H. Pendidik Utama, M.Pd.', 'position' => 'Kepala Sekolah', 'public_bio' => 'Berpengalaman lebih dari 20 tahun dalam memimpin dan memajukan pendidikan dasar.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Siti Rahmawati, S.Pd.', 'position' => 'Guru Kelas 1', 'public_bio' => 'Fokus pada pondasi literasi dan numerasi anak usia dini secara menyenangkan.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Bambang Sudarsono, S.Pd.', 'position' => 'Guru Kelas 2', 'public_bio' => 'Mengembangkan metode belajar interaktif dan pendidikan karakter disiplin.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Nurul Hidayah, S.Pd.I.', 'position' => 'Guru Pendidikan Agama Islam', 'public_bio' => 'Membimbing pembiasaan ibadah dan budi pekerti luhur bagi siswa.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Rian Hidayat, S.Pd.', 'position' => 'Guru PJOK & Pembina Olahraga', 'public_bio' => 'Mendorong gaya hidup sehat dan prestasi cabang olahraga atletik & sepak bola.', 'is_published' => true, 'is_active' => true],
            ['full_name' => 'Dewi Lestari, S.Pd.', 'position' => 'Guru Kelas 5 & Pembina Sains', 'public_bio' => 'Membimbing tim olimpiade sains dan eksplorasi ilmu pengetahuan alam.', 'is_published' => true, 'is_active' => true],
        ];

        foreach ($teachers as $item) {
            TeacherProfile::firstOrCreate(['full_name' => $item['full_name']], $item);
        }

        // 3. Fasilitas Sekolah
        $facilities = [
            [
                'name' => 'Perpustakaan Ramah Anak "Bina Ilmu"',
                'category' => 'Sumber Belajar',
                'description' => 'Dilengkapi ribuan judul buku fiksi, referensi pelajaran, serta area membaca lesehan ber-AC yang nyaman.',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Laboratorium Komputer & Multimedia',
                'category' => 'Teknologi Informasi',
                'description' => 'Menyediakan 30 unit komputer modern terkoneksi internet untuk pelatihan literasi digital dan ANBK.',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Lapangan Olahraga & Upacara Serbaguna',
                'category' => 'Olahraga & Kebersamaan',
                'description' => 'Area terbuka untuk upacara bendera, senam bersama, serta latihan basket, voli, dan futsal.',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Ruang UKS & Konseling',
                'category' => 'Kesehatan',
                'description' => 'Fasilitas pertolongan pertama pada kecelakaan dan pemeriksaan kesehatan berkala bagi seluruh siswa.',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Gedung Kesenian Baru (Draf Perencanaan)',
                'category' => 'Seni & Budaya',
                'description' => 'Ruang khusus untuk latihan tari, musik, dan drumband siswa.',
                'publication_status' => 'draf', // Draf, tidak boleh muncul di publik
            ],
        ];

        foreach ($facilities as $item) {
            Facility::firstOrCreate(['name' => $item['name']], $item);
        }

        // 4. Ekstrakurikuler
        $extracurriculars = [
            [
                'name' => 'Gerakan Pramuka (Siaga & Penggalang)',
                'description' => 'Membentuk kemandirian, kepemimpinan, kepedulian sosial, dan kecintaan pada alam.',
                'schedule_text' => 'Setiap Jumat, 14.30 - 16.30 WITA',
                'supervisor_name' => 'Kak Rian & Kak Dewi',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Seni Tari Tradisional Kalimantan Timur',
                'description' => 'Melestarikan seni budaya daerah melalui tarian khas Kaltim yang sarat nilai estetika.',
                'schedule_text' => 'Setiap Sabtu, 08.00 - 10.00 WITA',
                'supervisor_name' => 'Ibu Siti Rahmawati',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Drumband Gema Nada 003',
                'description' => 'Mengasah musikalitas, kedisiplinan baris-berbaris, serta kekompakan kelompok.',
                'schedule_text' => 'Setiap Rabu & Sabtu sore',
                'supervisor_name' => 'Bpk. Bambang Sudarsono',
                'publication_status' => 'terbit',
            ],
            [
                'name' => 'Klub Dokter Kecil & PMR Mula',
                'description' => 'Melatih kepedulian terhadap kesehatan lingkungan sekolah dan pertolongan pertama kawan sebaya.',
                'schedule_text' => 'Setiap Kamis, 14.00 - 15.30 WITA',
                'supervisor_name' => 'Tim Pembina UKS',
                'publication_status' => 'terbit',
            ],
        ];

        foreach ($extracurriculars as $item) {
            Extracurricular::firstOrCreate(['name' => $item['name']], $item);
        }

        // 5. Dokumentasi Kegiatan
        $event1 = SchoolEvent::firstOrCreate(
            ['title' => 'Upacara Peringatan Hari Pendidikan Nasional dan Pentas Budaya'],
            [
                'event_date' => '2026-05-02',
                'category' => 'Peringatan Hari Besar',
                'description' => "Seluruh warga SDN 003 Samarinda memperingati Hardiknas dengan mengenakan pakaian adat Nusantara. Acara dilanjutkan dengan persembahan puisi dan tarian tradisional oleh perwakilan siswa dari setiap kelas.\n\nKegiatan ini bertujuan menumbuhkan rasa cinta tanah air dan penghargaan atas keragaman budaya bangsa.",
                'publication_status' => 'terbit',
            ]
        );

        $event2 = SchoolEvent::firstOrCreate(
            ['title' => 'Gerakan Bersih Lingkungan Sekolah dan Pilah Sampah'],
            [
                'event_date' => '2026-04-18',
                'category' => 'Adiwiyata & Lingkungan',
                'description' => 'Kegiatan gotong royong membersihkan taman, ruang kelas, serta edukasi pemilahan sampah organik dan anorganik bersama komite sekolah dan orang tua siswa.',
                'publication_status' => 'terbit',
            ]
        );

        // 6. Prestasi Siswa
        $achievements = [
            [
                'title' => 'Juara 1 Lomba Cerdas Cermat Sains Tingkat SD',
                'student_display_name' => 'Tim Sains SDN 003 Samarinda',
                'category' => 'Akademik',
                'level' => 'Kota',
                'achievement_date' => '2026-03-15',
                'description' => 'Berhasil meraih nilai tertinggi dalam babak final cerdas cermat sains antarsekolah dasar se-Kota Samarinda.',
                'publication_status' => 'terbit',
            ],
            [
                'title' => 'Juara 2 Lomba Tari Tradisional Nusantara',
                'student_display_name' => 'Grup Tari Cendrawasih Cilik',
                'category' => 'Seni & Budaya',
                'level' => 'Provinsi',
                'achievement_date' => '2026-02-20',
                'description' => 'Meraih apresiasi dewan juri pada Festival Seni Budaya Pelajar Tingkat Provinsi Kalimantan Timur.',
                'publication_status' => 'terbit',
            ],
            [
                'title' => 'Medali Emas Atletik Lari Cepat 60M Putra',
                'student_display_name' => 'Ahmad Fauzan (Siswa Kelas 6)',
                'category' => 'Olahraga',
                'level' => 'Kota',
                'achievement_date' => '2026-01-28',
                'description' => 'Mencatatkan waktu terbaik pada ajang Olimpiade Olahraga Siswa Nasional (O2SN) Kota Samarinda.',
                'publication_status' => 'terbit',
            ],
        ];

        foreach ($achievements as $item) {
            Achievement::firstOrCreate(['title' => $item['title']], $item);
        }
    }
}
