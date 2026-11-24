# Product Requirements Document (PRD)

## CAPSGO — Website Informasi dan Pengelolaan Data Sekolah SDN 003 Samarinda

| Informasi Proyek | Keterangan |
| :--- | :--- |
| **Nama Proyek** | CAPSGO |
| **Nama Aplikasi** | CAPSGO — Website Informasi dan Pengelolaan Data Sekolah |
| **Mitra / Problem Owner** | SDN 003 Samarinda |
| **Jenis Aplikasi** | Website responsif dengan halaman publik dan portal internal sekolah |
| **Pengguna Akun Internal** | Guru dan Operator |
| **Pengguna Publik** | Masyarakat, orang tua, calon peserta didik, dan pengunjung website |
| **Teknologi yang Diusulkan** | Laravel 13, PHP 8.3+, React 19, TypeScript, Inertia.js 3, Tailwind CSS 4, MySQL 8.4 LTS |
| **Versi Dokumen** | v1.1 — rancangan teknis diperluas |
| **Status Dokumen** | Draf pengembangan; rincian implementasi diperluas, beberapa aturan operasional masih perlu dikonfirmasi kepada pihak sekolah |
| **Dokumen Acuan** | Proposal Capstone Design Project CAPSGO dan contoh PRD Tugasku yang diberikan tim |

> **Tujuan dokumen ini.** PRD ini menjadi pedoman teknis bersama sebelum tim mulai membangun website. Isinya menjelaskan fungsi aplikasi, batasan fitur, teknologi, struktur kode, rancangan database, alur kerja, rancangan halaman, hak akses, pengujian, pembagian tugas tiga anggota, dan kriteria penyelesaian.
>
> **Cara membaca penanda:**
> - **[Dasar Proposal]** berarti kebutuhan tersebut tercantum pada proposal CAPSGO atau hasil identifikasi kebutuhan yang telah dicatat.
> - **[Keputusan Tim]** berarti keputusan rancangan yang sudah ditetapkan dalam pembahasan tim, termasuk penggunaan dua peran akun internal: Guru dan Operator.
> - **[Usulan]** berarti rincian teknis atau fitur yang disarankan agar aplikasi dapat dibangun dengan jelas. Tim perlu memeriksa kembali kesesuaiannya dengan pihak sekolah.
> - **[Perlu Konfirmasi]** berarti aturan bisnis, data, atau prosedur belum boleh dianggap final sebelum mendapat persetujuan pihak sekolah.

> **Konvensi bahasa dan penamaan:** isi dokumen serta seluruh teks yang tampil kepada pengguna menggunakan bahasa Indonesia. Nama folder, file, class, method, variabel, dan branch Git menggunakan bahasa Inggris agar konsisten dalam kode, misalnya `SchoolProfileController`, `DocumentFolder`, `fetchSchedule()`, dan `feat/document-management`. Nama tabel dan kolom database menggunakan `snake_case` bahasa Inggris, sedangkan pilihan nilai yang terlihat di aplikasi menggunakan bahasa Indonesia, misalnya `Hadir`, `Izin`, `Sakit`, dan `Alpa`.

---

## 1. Visi dan Deskripsi Produk

### 1.1 Gambaran Umum

CAPSGO merupakan website sekolah yang menggabungkan dua kebutuhan utama SDN 003 Samarinda dalam satu platform, yaitu penyampaian informasi resmi kepada masyarakat dan pengelolaan data serta dokumen internal sekolah.

Bagian pertama adalah **website publik** yang dapat dibuka tanpa akun. Bagian ini berisi informasi sekolah seperti profil, fasilitas, tenaga pendidik, ekstrakurikuler, dokumentasi kegiatan, prestasi siswa, dan informasi lain yang telah disetujui untuk dipublikasikan.

Bagian kedua adalah **portal internal** yang hanya dapat dibuka oleh pengguna yang memiliki akun. Portal ini memiliki dua peran, yaitu **Guru** dan **Operator**. Guru mengakses informasi yang diperlukan untuk kegiatan mengajar sesuai kewenangannya. Operator mengelola konten website, data sekolah, akun pengguna sesuai kewenangannya, serta arsip dan dokumen sekolah.

Keduanya menggunakan satu aplikasi dan satu basis data, tetapi setiap halaman dan data internal dilindungi oleh proses autentikasi serta pemeriksaan hak akses.

### 1.2 Latar Belakang Kebutuhan

Berdasarkan proposal CAPSGO, informasi sekolah masih disampaikan melalui beberapa saluran, seperti media sosial, komunikasi langsung, dan WhatsApp. Penggunaan banyak saluran membuat informasi belum sepenuhnya terpusat pada satu sumber resmi. Masyarakat dapat mengalami kesulitan ketika ingin menemukan informasi sekolah secara lengkap.

Di sisi internal, sekolah memiliki berbagai data dan dokumen, antara lain data guru, data absensi, fasilitas, ekstrakurikuler, dokumentasi kegiatan, prestasi siswa, dan data koperasi. Dokumen serta data tersebut perlu disimpan, dikelompokkan, diperbarui, dan ditemukan kembali ketika dibutuhkan. Guru juga memerlukan informasi operasional seperti jadwal mengajar dan kelas sesuai tugasnya.

Karena kebutuhan publik dan internal saling berkaitan, CAPSGO dirancang sebagai satu website terintegrasi. Informasi yang boleh diketahui masyarakat ditempatkan pada halaman publik, sedangkan data pribadi dan administrasi sekolah dibatasi untuk pengguna internal.

### 1.3 Sasaran Produk

1. Menyediakan satu sumber informasi daring yang dapat digunakan masyarakat untuk mengenal SDN 003 Samarinda.
2. Membantu operator memperbarui informasi publik tanpa harus mengubah kode website.
3. Menyediakan pengelolaan data sekolah secara lebih terstruktur.
4. Mempermudah penyimpanan, pengelompokan, pencarian, dan pengunduhan dokumen sekolah.
5. Memisahkan akses Guru dan Operator sesuai tugas masing-masing.
6. Mengurangi ketergantungan pada penyimpanan dan penyampaian data melalui banyak media yang terpisah.
7. Menjaga agar data internal dan data pribadi siswa tidak tampil pada halaman publik tanpa persetujuan.

### 1.4 Pengguna Sasaran

| Jenis Pengguna | Perlu Login? | Kebutuhan Utama | Akses Utama |
| :--- | :---: | :--- | :--- |
| Masyarakat / Pengunjung | Tidak | Melihat profil, fasilitas, kegiatan, prestasi, dan informasi sekolah | Seluruh halaman publik yang telah diterbitkan |
| Guru | Ya | Melihat informasi tugas mengajar dan data kelas yang menjadi tanggung jawabnya | Dashboard Guru dan fitur internal yang diberikan kepada Guru |
| Operator | Ya | Mengelola konten website, data sekolah, akun, dan dokumen | Dashboard Operator dan modul pengelolaan sesuai kewenangannya |

**Keputusan peran:** aplikasi hanya menggunakan dua peran akun internal, yaitu `Guru` dan `Operator`. Tidak dibuat peran `Admin` terpisah. Istilah Admin yang mungkin masih muncul pada contoh desain lama tidak digunakan sebagai role aplikasi dan harus disesuaikan menjadi Operator apabila merujuk pada halaman pengelolaan.

### 1.5 Tujuan Pengalaman Pengguna

- Pengunjung dapat menemukan informasi dasar sekolah melalui navigasi yang jelas.
- Pengunjung dapat membuka website dari ponsel maupun komputer tanpa perlu memasang aplikasi.
- Guru dapat menemukan jadwal dan informasi kelasnya tanpa harus membuka banyak halaman yang tidak relevan.
- Operator dapat menambah, mengubah, menyimpan, mencari, dan menerbitkan konten melalui formulir yang konsisten.
- Operator dapat mengelola arsip dengan pola folder dan subfolder sehingga dokumen tidak menumpuk dalam satu tempat.
- Pengguna selalu mendapat pemberitahuan yang mudah dipahami ketika proses berhasil, gagal, atau membutuhkan tindakan lanjutan.

### 1.6 Ruang Lingkup Produk

| Termasuk dalam ruang lingkup | Tidak termasuk dalam ruang lingkup awal |
| :--- | :--- |
| Website publik sekolah | Aplikasi Android/iOS terpisah |
| Login untuk Guru dan Operator | Pendaftaran akun mandiri oleh masyarakat |
| Dashboard Guru dan Operator | Role Admin terpisah |
| Pengelolaan konten publik oleh Operator | Integrasi otomatis ke seluruh sistem pemerintah/pendidikan lain |
| Pengelolaan data sekolah yang disepakati | Sistem keuangan sekolah atau akuntansi penuh |
| Pengelolaan folder dan arsip dokumen | Penyimpanan cloud pihak ketiga sebagai ketergantungan wajib |
| Pengaturan hak akses berdasarkan role dan kepemilikan data | Sistem pesan instan atau konferensi video |
| Pencarian dan pengunduhan dokumen sesuai hak akses | Notifikasi SMS/WhatsApp otomatis pada tahap awal |
| Pengujian dan penyerahan website kepada sekolah | Fitur nilai, rapor, dan jurnal mengajar sebelum kebutuhannya dikonfirmasi |

**Catatan batasan:** detail proses absensi, data koperasi, dan data kelas perlu dikonfirmasi. PRD ini memisahkan kebutuhan yang tertulis pada proposal dari rincian implementasi yang masih berupa usulan.

---

## 2. Spesifikasi Teknologi dan Arsitektur

### 2.1 Teknologi yang Digunakan

| Bagian | Teknologi | Fungsi dan Alasan Pemilihan |
| :--- | :--- | :--- |
| Bahasa backend | PHP 8.3 atau lebih baru | Menjalankan proses bisnis, validasi, autentikasi, otorisasi, dan komunikasi dengan database. Laravel 13 mensyaratkan PHP minimal 8.3. |
| Framework backend | Laravel 13 | Mengatur route, controller, model, migration, validasi, middleware, autentikasi, penyimpanan file, dan pengujian backend dalam satu kerangka kerja. |
| Bahasa frontend | TypeScript | Menambahkan pemeriksaan tipe pada kode antarmuka sehingga struktur data dan properti komponen lebih mudah dikontrol. |
| Library frontend | React 19 | Membangun halaman dan komponen antarmuka secara modular dan dapat digunakan kembali. |
| Penghubung frontend-backend | Inertia.js 3 | Menghubungkan Laravel dengan halaman React tanpa mengharuskan tim membuat backend API terpisah untuk setiap halaman. Laravel tetap menangani route, controller, autentikasi, dan otorisasi. |
| Bahasa tampilan | HTML5 dan CSS | Menyusun struktur dan tampilan halaman web. |
| Framework CSS | Tailwind CSS 4 | Membantu membuat tata letak responsif dengan kelas utilitas yang konsisten. |
| Komponen UI | shadcn/ui atau komponen React internal | Menyediakan pola komponen seperti tombol, dialog, tabel, dropdown, formulir, dan notifikasi. Komponen perlu diseragamkan melalui panduan desain tim. |
| Basis data | MySQL 8.4 LTS | Menyimpan akun, profil sekolah, data guru, data kelas, absensi, konten publik, folder, metadata dokumen, dan catatan aktivitas. Jalur LTS dipilih untuk kebutuhan stabilitas. |
| Pengelola paket frontend | npm | Mengelola dependensi React, TypeScript, Vite, Tailwind, dan library pendukung. |
| Build tool | Vite | Menjalankan server pengembangan frontend dan membangun aset produksi. |
| Pengujian backend | Pest atau PHPUnit | Menguji route, validasi, autentikasi, hak akses, dan proses penyimpanan data. Tim harus memilih satu alat dan menggunakannya secara konsisten. |
| Pengujian antarmuka | React Testing Library dan/atau Playwright | Menguji perilaku komponen dan alur pengguna pada browser. Pemilihan akhir menyesuaikan waktu dan kebutuhan tim. |
| Pengelolaan versi | Git dan GitHub | Menyimpan source code, branch, riwayat commit, serta proses penggabungan pekerjaan. |

**Rekomendasi arsitektur:** gunakan satu aplikasi Laravel yang terintegrasi dengan React melalui Inertia.js. Untuk ruang lingkup CAPSGO saat ini, pendekatan ini lebih sederhana daripada memisahkan frontend dan backend menjadi dua proyek yang harus mengelola autentikasi dan komunikasi API secara terpisah.

### 2.2 Alasan Pemilihan Arsitektur

1. **Satu sumber pengaturan akses.** Laravel menangani login, role, validasi, dan pemeriksaan izin sebelum data diberikan kepada halaman React.
2. **Pengembangan lebih terkoordinasi.** Tim tidak perlu membuat server API terpisah hanya untuk mengirim data dari backend ke halaman internal.
3. **Dapat dikembangkan bertahap.** Halaman publik, portal Guru, dan portal Operator menggunakan layout serta komponen yang dapat dibagikan.
4. **Pengelolaan data terpusat.** Konten website dan data internal disimpan di basis data yang sama, dengan aturan akses yang berbeda.
5. **Lebih mudah diuji dan dirawat.** Route, controller, model, validasi, dan proses bisnis berada dalam satu repositori utama.

### 2.3 Gambaran Arsitektur Sistem

```text
PENGUNJUNG PUBLIK                 PENGGUNA INTERNAL
       |                                 |
       | buka halaman publik             | login sebagai Guru / Operator
       |                                 |
       +---------------+-----------------+
                       |
                 BROWSER / WEB
                       |
              React + TypeScript
               (Halaman dan UI)
                       |
                 Inertia.js
                       |
                Laravel 13
       +---------------+--------------------+
       |               |                    |
   Route &         Controller /          Middleware,
   Request         Service Layer          Policy / Role
       |               |                    |
       +---------------+--------------------+
                       |
             Eloquent ORM / Query
                       |
                  MySQL 8.4
                       |
              Penyimpanan Berkas
          (File publik dan file internal)
```

Alur singkat:

1. Browser membuka halaman publik atau halaman login.
2. Untuk halaman publik, Laravel mengambil konten yang berstatus diterbitkan dan mengirimkannya ke komponen React.
3. Untuk halaman internal, pengguna harus memiliki sesi login yang valid.
4. Middleware memeriksa apakah pengguna memiliki role yang sesuai dengan halaman yang diminta.
5. Policy atau pemeriksaan kepemilikan data memastikan Guru hanya mengakses data yang menjadi kewenangannya.
6. Laravel mengambil atau menyimpan data melalui model dan database.
7. Berkas disimpan melalui mekanisme storage Laravel. File internal tidak boleh diakses hanya dengan menebak alamat URL.

### 2.4 Standar Teknis Proyek

- Gunakan Laravel 13 dengan versi PHP yang kompatibel.
- Gunakan React dan TypeScript; hindari mencampur JavaScript biasa pada modul baru tanpa alasan.
- Gunakan Inertia.js sebagai jalur utama pertukaran data halaman.
- Semua validasi penting dilakukan di backend. Validasi frontend hanya membantu pengalaman pengguna dan bukan pengganti validasi server.
- Semua halaman internal wajib melewati middleware autentikasi.
- Pemeriksaan role dan kepemilikan data wajib dilakukan pada backend, bukan hanya dengan menyembunyikan tombol di frontend.
- Gunakan migration untuk setiap perubahan struktur database.
- Gunakan seeder hanya untuk data contoh atau akun awal yang disepakati; jangan memasukkan data pribadi asli ke repository.
- Password harus disimpan dalam bentuk hash, bukan teks biasa.
- File internal disimpan pada disk privat dan hanya diunduh melalui route yang memeriksa hak akses.
- Gunakan pagination untuk tabel dengan jumlah data yang berpotensi banyak.
- Hindari mengambil data berulang kali di dalam komponen tanpa kebutuhan.
- Simpan konfigurasi rahasia dalam `.env`, bukan di source code.
- Setiap modul harus memiliki kondisi loading, kosong, berhasil, dan gagal yang jelas.

### 2.5 Konvensi Penamaan

| Elemen | Konvensi | Contoh |
| :--- | :--- | :--- |
| Folder | `kebab-case` atau struktur standar Laravel | `document-management/`, `resources/js/Pages/` |
| File React | `PascalCase.tsx` untuk halaman/komponen | `TeacherDashboard.tsx`, `DocumentTable.tsx` |
| File PHP | `PascalCase.php` untuk class | `DocumentController.php` |
| Class | `PascalCase` | `AttendanceRecord`, `SchoolProfileController` |
| Method dan variabel | `camelCase` | `fetchSchedule()`, `$schoolProfile` |
| Tabel database | `snake_case` jamak | `attendance_records`, `school_events` |
| Kolom database | `snake_case` | `created_at`, `teacher_id` |
| Route name | `kebab.case` atau pola dot Laravel | `operator.documents.index` |
| Branch Git | `feat/<nama-fitur>` | `feat/public-school-profile` |
| Teks antarmuka | Bahasa Indonesia | “Simpan Perubahan”, “Cari Dokumen” |

### 2.6 Struktur Repositori yang Diusulkan

```text
capsgo/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Public/
│   │   │   ├── Auth/
│   │   │   ├── Guru/
│   │   │   └── Operator/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   ├── Policies/
│   └── Services/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
│   ├── images/
│   └── favicon.ico
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   ├── Layouts/
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── GuruLayout.tsx
│   │   │   └── OperatorLayout.tsx
│   │   ├── Pages/
│   │   │   ├── Public/
│   │   │   ├── Auth/
│   │   │   ├── Guru/
│   │   │   └── Operator/
│   │   ├── Hooks/
│   │   ├── Types/
│   │   └── app.tsx
│   ├── css/
│   │   └── app.css
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── web.php
│   └── console.php
├── storage/
│   └── app/
│       ├── public/
│       └── private/
├── tests/
│   ├── Feature/
│   ├── Unit/
│   └── Browser/
├── .env.example
├── .gitignore
├── composer.json
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
├── PRD.md
└── Design.md
```

> Nama folder root yang disarankan adalah `capsgo/`. Nama repository final dapat disesuaikan dengan keputusan tim, tetapi sebaiknya tidak menggunakan spasi.

### 2.7 Paket Utama yang Dibutuhkan

| Paket / Alat | Area | Kegunaan |
| :--- | :--- | :--- |
| Laravel Framework | Backend | Routing, controller, model, migration, autentikasi, validasi, storage |
| Inertia Laravel Adapter | Backend | Mengirim halaman React dan data dari Laravel |
| Inertia React Adapter | Frontend | Navigasi dan pengiriman form dari React ke Laravel |
| React | Frontend | Komponen dan halaman website |
| TypeScript | Frontend | Pemeriksaan tipe data |
| Tailwind CSS | Frontend | Styling dan responsive layout |
| shadcn/ui | Frontend | Komponen antarmuka yang dapat disesuaikan |
| Vite | Tooling | Pengembangan dan build aset frontend |
| MySQL | Database | Penyimpanan data terstruktur |
| Laravel Storage | Backend | Penyimpanan file publik dan privat |
| Pest atau PHPUnit | Testing | Pengujian backend |
| React Testing Library | Testing | Pengujian interaksi komponen |
| Playwright (opsional) | Testing | Pengujian alur aplikasi dari browser |

**Catatan versi:** versi minor dan patch paket harus ditentukan saat proyek diinisialisasi berdasarkan kompatibilitas resmi antar dependensi. Jangan menyalin nomor versi lama dari tutorial yang belum diperiksa.

### 2.8 Pengaturan Lingkungan Pengembangan

Variabel `.env` minimal yang perlu disiapkan:

```env
APP_NAME=CAPSGO
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=capsgo
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=local
```

Aturan lingkungan:

- `.env` lokal tidak boleh ikut di-commit.
- `.env.example` harus berisi nama variabel tanpa password atau kredensial asli.
- Gunakan database development terpisah dari database produksi.
- Data uji harus berupa data dummy atau data yang secara eksplisit telah diizinkan sekolah.
- `APP_DEBUG` harus dinonaktifkan di lingkungan produksi.
- Gunakan HTTPS saat website dipublikasikan.

---

## 3. Struktur Halaman dan Kebutuhan Fungsional

### 3.1 Website Publik

Website publik dapat dibuka siapa saja tanpa login. Konten yang tampil hanya konten yang telah ditandai boleh dipublikasikan oleh Operator.

#### 3.1.1 Beranda

**Tujuan:** menjadi halaman pertama yang memperkenalkan SDN 003 Samarinda dan mengarahkan pengunjung ke informasi penting.

Isi yang diusulkan:

1. Header berisi logo/nama sekolah dan menu navigasi.
2. Bagian utama berisi nama sekolah, deskripsi singkat, dan gambar utama.
3. Ringkasan profil sekolah.
4. Informasi fasilitas unggulan.
5. Ringkasan ekstrakurikuler.
6. Dokumentasi kegiatan terbaru.
7. Informasi prestasi siswa yang telah disetujui untuk ditampilkan.
8. Footer berisi alamat, kontak, dan tautan halaman penting.

**Kriteria penerimaan:**
- Beranda dapat dibuka tanpa login.
- Menu mengarah ke halaman yang benar.
- Konten yang ditampilkan bersumber dari data yang diterbitkan, bukan teks contoh yang ditulis langsung pada kode.
- Tampilan berfungsi pada ponsel dan komputer.
- Jika konten belum tersedia, sistem menampilkan keadaan kosong yang tetap rapi.

#### 3.1.2 Profil Sekolah

Isi yang dapat dikelola:
- Nama resmi sekolah.
- Deskripsi atau sejarah singkat.
- Visi dan misi, apabila data telah diberikan pihak sekolah.
- Informasi identitas sekolah yang telah disetujui.
- Foto lingkungan sekolah.
- Informasi kontak dan alamat.

**Catatan:** nilai seperti NPSN, status, akreditasi, atau tahun berdiri tidak boleh dibuat sendiri. Data dimasukkan setelah diterima dan diverifikasi oleh pihak sekolah.

#### 3.1.3 Struktur Organisasi

- Menampilkan susunan organisasi sekolah sesuai data resmi.
- Menampilkan nama dan jabatan apabila pihak sekolah mengizinkan publikasi.
- Pengelolaan struktur dapat dilakukan Operator melalui halaman internal.
- Bentuk tampilan dapat berupa bagan atau daftar hierarki.

#### 3.1.4 Informasi Guru dan Tenaga Kependidikan

- Menampilkan profil singkat guru yang boleh dipublikasikan.
- Data dapat berisi nama, jabatan, foto, dan informasi profesional yang disetujui.
- Informasi pribadi seperti nomor identitas, alamat rumah, nomor telepon pribadi, dan data kepegawaian internal tidak boleh ditampilkan.
- Operator dapat menambah, memperbarui, menyembunyikan, atau menerbitkan profil sesuai persetujuan sekolah.

#### 3.1.5 Fasilitas Sekolah

- Menampilkan nama fasilitas.
- Menampilkan deskripsi dan foto.
- Mengelompokkan fasilitas berdasarkan kategori bila diperlukan.
- Operator dapat menambah, mengubah, menghapus, dan mengatur status publikasi.

#### 3.1.6 Ekstrakurikuler

- Menampilkan nama kegiatan ekstrakurikuler.
- Menampilkan deskripsi singkat.
- Menampilkan foto atau dokumentasi apabila tersedia.
- Jadwal, pembina, dan informasi pendaftaran hanya ditampilkan bila telah disetujui sekolah.

#### 3.1.7 Dokumentasi Kegiatan

- Menampilkan kegiatan sekolah dalam bentuk daftar atau galeri.
- Setiap kegiatan dapat memiliki judul, tanggal, keterangan, foto, dan kategori.
- Foto yang menampilkan siswa harus mengikuti izin publikasi yang berlaku di sekolah.
- Operator dapat menyimpan sebagai draf sebelum menerbitkannya.

#### 3.1.8 Prestasi Siswa

- Menampilkan informasi prestasi yang telah diverifikasi sekolah.
- Informasi dapat mencakup nama kegiatan/lomba, kategori, tanggal, tingkat, dan deskripsi prestasi.
- Foto atau nama siswa ditampilkan hanya sesuai persetujuan pihak sekolah dan ketentuan perlindungan data.

#### 3.1.9 Informasi Koperasi

- Menampilkan informasi umum koperasi apabila sekolah menghendaki publikasi.
- Data operasional atau transaksi koperasi tetap berada di portal internal.
- Bentuk dan cakupan modul koperasi **[Perlu Konfirmasi]** karena proposal menyebut data koperasi, tetapi belum merinci apakah yang dimaksud adalah profil, daftar barang, stok, atau transaksi.

#### 3.1.10 Kontak dan Lokasi

- Menampilkan alamat sekolah dan kontak resmi yang diberikan pihak sekolah.
- Tautan peta dapat ditambahkan jika lokasi dan tautan telah dikonfirmasi.
- Informasi kontak harus dapat diperbarui oleh Operator.

### 3.2 Autentikasi dan Pengelolaan Akun

#### 3.2.1 Login

- Pengguna internal masuk menggunakan akun yang telah dibuat atau diberikan oleh Operator sesuai kebijakan sekolah.
- Form berisi identitas akun dan kata sandi.
- Sistem memeriksa akun aktif, kata sandi, serta role.
- Setelah login, pengguna diarahkan ke dashboard sesuai role.
- Pengguna yang belum login tidak boleh membuka halaman internal.

#### 3.2.2 Logout

- Pengguna dapat keluar melalui menu akun.
- Sistem mengakhiri sesi login.
- Setelah logout, halaman internal tidak boleh tetap dapat diakses melalui sesi yang sudah berakhir.

#### 3.2.3 Pengelolaan Akun

**[Usulan]** Operator dapat mengelola akun Guru, meliputi:
- Membuat akun Guru.
- Mengubah nama tampilan atau informasi akun yang diperbolehkan.
- Mengaktifkan atau menonaktifkan akun.
- Melakukan reset kata sandi melalui prosedur yang disepakati.

Akun Operator awal disiapkan melalui proses instalasi atau mekanisme khusus yang disepakati. Operator tidak boleh secara tidak sengaja menghapus satu-satunya akun Operator aktif.

**[Perlu Konfirmasi]** Apakah Operator boleh membuat akun Operator lain, atau pembuatan akun Operator harus dilakukan melalui pengelola teknis proyek/sekolah.

#### 3.2.4 Aturan Keamanan Login

- Tidak tersedia pendaftaran akun publik.
- Kata sandi tidak disimpan sebagai teks biasa.
- Percobaan login berulang dapat dibatasi.
- Pesan kesalahan login tidak mengungkap apakah suatu alamat email/username benar-benar terdaftar.
- Pengguna yang dinonaktifkan tidak dapat masuk.
- Pengguna hanya dapat mengubah data profil yang memang diizinkan.

### 3.3 Portal Guru

Portal Guru hanya menampilkan informasi yang berhubungan dengan akun dan tanggung jawab Guru yang sedang login.

#### 3.3.1 Dashboard Guru

Isi yang diusulkan:
- Sapaan dan identitas singkat Guru.
- Ringkasan jadwal mengajar terdekat.
- Daftar kelas yang menjadi tanggung jawab Guru.
- Pengumuman internal, jika modul pengumuman disepakati.
- Akses cepat menuju jadwal, kelas, dan absensi.

#### 3.3.2 Jadwal Mengajar

**[Dasar Proposal]** Guru membutuhkan informasi jadwal mengajar dan kelas.

- Menampilkan jadwal berdasarkan hari.
- Menampilkan jam mulai dan selesai.
- Menampilkan kelas/rombongan belajar.
- Menampilkan mata pelajaran atau keterangan kegiatan jika tersedia.
- Menampilkan ruang jika sekolah menggunakan data ruang.
- Guru hanya melihat jadwal yang berhubungan dengan penugasannya.

**Kriteria penerimaan:** jadwal diurutkan berdasarkan hari dan jam; jika jadwal kosong, sistem menampilkan pesan “Belum ada jadwal yang tersedia”.

#### 3.3.3 Kelas yang Diampu

**[Usulan]** Guru dapat membuka daftar kelas yang menjadi penugasannya.

- Menampilkan nama kelas.
- Menampilkan tahun ajaran.
- Menampilkan jumlah siswa jika datanya tersedia.
- Membuka daftar siswa pada kelas yang menjadi tanggung jawab Guru.
- Guru tidak dapat membuka kelas yang tidak menjadi penugasannya.

**[Perlu Konfirmasi]** Penugasan Guru dapat berbeda menurut wali kelas, guru mata pelajaran, atau pembina kegiatan. Model penugasan harus mengikuti kebijakan sekolah.

#### 3.3.4 Daftar Siswa

**[Usulan]** Guru dapat melihat data dasar siswa pada kelas yang menjadi tanggung jawabnya.

- Nama siswa dan identitas internal yang diperlukan.
- Informasi kelas.
- Data tambahan hanya ditampilkan jika benar-benar diperlukan untuk tugas Guru.
- Data pribadi sensitif tidak ditampilkan secara berlebihan.
- Guru tidak dapat melihat daftar siswa dari kelas yang tidak menjadi kewenangannya.

#### 3.3.5 Pengisian Absensi

**[Usulan — perlu persetujuan sekolah]** Modul ini menyediakan pencatatan kehadiran siswa oleh Guru jika proses absensi memang dilakukan oleh Guru melalui sistem.

Rancangan awal:
1. Guru memilih kelas yang menjadi tanggung jawabnya.
2. Guru memilih tanggal atau sesi pertemuan.
3. Sistem menampilkan daftar siswa pada kelas tersebut.
4. Guru mengisi status kehadiran setiap siswa.
5. Guru menyimpan data absensi.
6. Sistem menampilkan ringkasan jumlah Hadir, Izin, Sakit, dan Alpa.

Nilai status awal yang diusulkan: `Hadir`, `Izin`, `Sakit`, `Alpa`. Status lain seperti `Dispensasi` hanya ditambahkan jika sekolah memerlukannya.

**Aturan yang perlu dikonfirmasi:** siapa yang mengisi absensi, kapan absensi dapat diubah, apakah perlu keterangan, apakah Operator dapat memperbaiki data, serta apakah absensi dicatat per hari atau per jam pelajaran.

#### 3.3.6 Arsip untuk Guru

**[Usulan]** Guru dapat melihat dan mengunduh dokumen yang dibagikan kepada Guru atau ditujukan untuk kelas/kelompok tertentu. Guru tidak otomatis mendapat akses ke seluruh arsip Operator.

### 3.4 Portal Operator

Operator menjadi pengguna utama dalam pengelolaan website dan data sekolah. Semua fungsi pengelolaan harus melalui proses login dan pembatasan akses.

#### 3.4.1 Dashboard Operator

Isi yang diusulkan:
- Ringkasan jumlah konten publik.
- Ringkasan jumlah data guru, fasilitas, ekstrakurikuler, dan kegiatan jika modulnya aktif.
- Ringkasan jumlah dokumen/arsip.
- Daftar konten terakhir diperbarui.
- Daftar berkas yang baru diunggah.
- Tombol akses cepat ke modul yang sering dipakai.

Angka ringkasan harus berasal dari database, bukan angka statis.

#### 3.4.2 Pengelolaan Profil Sekolah

Operator dapat:
- Melihat data profil sekolah.
- Menambah atau memperbarui deskripsi.
- Mengelola visi, misi, alamat, dan kontak setelah data disahkan.
- Mengunggah gambar/logo/foto yang sesuai.
- Menyimpan perubahan sebagai draf atau menerbitkan perubahan jika status publikasi tersedia.

#### 3.4.3 Pengelolaan Data Guru

Operator dapat:
- Menambah data guru.
- Mengubah data guru.
- Mengatur foto/profil publik jika diizinkan.
- Menandai data aktif/tidak aktif.
- Menghubungkan profil guru dengan akun login Guru jika diperlukan.
- Mencari data berdasarkan nama atau informasi yang diperbolehkan.

Pemisahan data akun dan profil guru perlu dijaga: akun login mengatur autentikasi, sedangkan profil guru menyimpan informasi yang berkaitan dengan identitas profesional di sekolah.

#### 3.4.4 Pengelolaan Fasilitas

Operator dapat menambah, mengubah, menghapus, mencari, dan mengatur status publikasi fasilitas. Form fasilitas minimal berisi nama, kategori, deskripsi, foto, dan status publikasi.

#### 3.4.5 Pengelolaan Ekstrakurikuler

Operator dapat menambah, mengubah, menghapus, mencari, dan mengatur status publikasi kegiatan ekstrakurikuler. Data minimal berisi nama, deskripsi, foto, dan status publikasi. Jadwal dan pembina merupakan kolom tambahan jika telah dikonfirmasi.

#### 3.4.6 Pengelolaan Dokumentasi Kegiatan

Operator dapat membuat entri kegiatan, memasukkan tanggal dan deskripsi, mengunggah foto, memilih foto utama, menyimpan draf, serta menerbitkan dokumentasi.

#### 3.4.7 Pengelolaan Prestasi Siswa

Operator dapat mencatat dan memperbarui informasi prestasi. Sebelum diterbitkan, informasi harus diverifikasi sesuai prosedur sekolah. Data siswa yang tidak boleh dipublikasikan harus tetap tersimpan sebagai data internal atau tidak dimasukkan ke halaman publik.

#### 3.4.8 Pengelolaan Data Absensi

**[Usulan]** Operator dapat melihat rekap absensi dan mengelola arsip data sesuai kewenangannya. Perubahan langsung pada absensi Guru perlu dibatasi dan dicatat.

Kemungkinan fungsi:
- Melihat rekap per kelas dan periode.
- Melakukan pencarian berdasarkan tanggal/kelas.
- Mengunduh rekap jika format dan kebutuhan sekolah telah disepakati.
- Memeriksa catatan perubahan.

#### 3.4.9 Pengelolaan Data Koperasi

**[Perlu Konfirmasi]** Proposal mencantumkan data koperasi sebagai salah satu data yang perlu dikelola, tetapi belum menentukan bentuk pengelolaan yang dibutuhkan. Untuk itu, modul awal dibuat fleksibel dan tidak langsung diasumsikan sebagai sistem transaksi.

Pilihan ruang lingkup yang perlu diputuskan bersama sekolah:
- hanya informasi/profil koperasi;
- daftar barang dan stok;
- pencatatan transaksi;
- laporan pemasukan dan pengeluaran.

Fitur transaksi dan pembukuan tidak dimasukkan ke ruang lingkup awal sebelum ada kebutuhan yang terverifikasi.

#### 3.4.10 Pengelolaan Folder dan Dokumen

Modul ini dirancang sebagai pengelola arsip internal dengan pola penggunaan yang mirip file manager. Tujuannya adalah membantu Operator menyimpan dan menemukan dokumen sekolah dengan struktur yang lebih jelas.

**Fungsi folder:**
- Membuat folder baru.
- Membuat subfolder di dalam folder.
- Mengubah nama folder.
- Memindahkan folder ke lokasi lain.
- Menampilkan isi folder.
- Menghapus folder melalui pemeriksaan isi dan konfirmasi.

**Fungsi dokumen:**
- Mengunggah satu atau beberapa berkas sesuai batas yang ditetapkan.
- Menyimpan nama asli, ukuran, tipe berkas, tanggal unggah, dan pengunggah.
- Mengubah nama tampilan dokumen.
- Memindahkan dokumen ke folder lain.
- Mengunduh dokumen.
- Mencari dokumen berdasarkan nama atau deskripsi.
- Melihat pratinjau untuk tipe file yang didukung browser.
- Mengarsipkan atau menghapus dokumen sesuai kebijakan sekolah.

**Aturan penyimpanan:**
- Folder dan dokumen memiliki relasi yang jelas di database.
- File internal disimpan pada penyimpanan privat.
- Pengunduhan dilakukan melalui controller yang memeriksa role dan izin pengguna.
- Nama file asli disimpan sebagai metadata; nama fisik di storage dibuat aman/unik.
- Validasi ukuran dan tipe file dilakukan di backend.
- Penghapusan dokumen sebaiknya menggunakan soft delete atau folder sampah agar file dapat dipulihkan selama masa retensi yang disepakati.

**Batasan keamanan awal [Usulan]:** batasi jenis file pada PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, JPG/JPEG, PNG, dan format lain yang disetujui. Ukuran maksimal awal dapat diatur melalui konfigurasi, misalnya 10 MB per file; nilai final harus disesuaikan dengan kebutuhan dan kapasitas server sekolah.

#### 3.4.11 Pencarian Data dan Dokumen

- Setiap tabel utama memiliki kolom pencarian sesuai atribut yang relevan.
- Pencarian mendukung kata kunci dan filter kategori/periode jika diperlukan.
- Hasil pencarian hanya menampilkan data yang boleh dilihat pengguna.
- Halaman menampilkan informasi ketika tidak ada hasil.

#### 3.4.12 Pengelolaan Akun Guru

Operator dapat membuat akun Guru, menonaktifkan akun yang tidak lagi digunakan, dan melakukan tindakan pemulihan akun sesuai kebijakan. Operator hanya dapat mengakses fungsi manajemen akun yang diberikan oleh sekolah.

### 3.5 Matriks Hak Akses

| Modul / Fitur | Pengunjung | Guru | Operator |
| :--- | :---: | :---: | :---: |
| Melihat beranda dan profil publik | ✓ | ✓ | ✓ |
| Melihat fasilitas/ekstrakurikuler publik | ✓ | ✓ | ✓ |
| Melihat dokumentasi dan prestasi publik | ✓ | ✓ | ✓ |
| Login/logout | — | ✓ | ✓ |
| Dashboard internal | — | Dashboard Guru | Dashboard Operator |
| Melihat jadwal mengajar | — | Jadwal milik sendiri | Sesuai kebutuhan pengelolaan |
| Melihat kelas dan siswa | — | Kelas yang ditugaskan | Sesuai kewenangan |
| Mengisi absensi | — | Hanya bila disetujui dan ditugaskan | Melihat/mengelola sesuai kebijakan |
| Mengelola profil sekolah | — | — | ✓ |
| Mengelola konten publik | — | — | ✓ |
| Mengelola data fasilitas/ekstrakurikuler | — | — | ✓ |
| Mengelola dokumentasi/prestasi | — | — | ✓ |
| Mengelola akun Guru | — | — | ✓ sesuai kebijakan |
| Mengelola folder dan dokumen | — | Lihat dokumen yang dibagikan | ✓ |
| Mengakses dokumen internal terbatas | — | Hanya jika diberi izin | ✓ sesuai kewenangan |

**Prinsip penting:** tanda centang tidak berarti pengguna dapat melihat seluruh data. Pemeriksaan juga harus mempertimbangkan kepemilikan dan konteks data. Contohnya, Guru hanya melihat kelas atau dokumen yang menjadi tanggung jawabnya.

---

## 4. Alur Kerja Utama

### 4.1 Alur Pengunjung Publik

1. Pengunjung membuka alamat website CAPSGO.
2. Sistem menampilkan beranda dan navigasi publik.
3. Pengunjung memilih halaman seperti Profil, Fasilitas, Ekstrakurikuler, Dokumentasi, atau Prestasi.
4. Laravel mengambil data yang berstatus diterbitkan.
5. React menampilkan informasi dalam bentuk halaman yang responsif.
6. Pengunjung dapat kembali ke halaman lain tanpa proses login.

### 4.2 Alur Login Guru

1. Guru membuka halaman masuk.
2. Guru mengisi identitas akun dan kata sandi.
3. Sistem memvalidasi isian dan memeriksa status akun.
4. Sistem memeriksa role akun.
5. Guru diarahkan ke Dashboard Guru.
6. Guru membuka jadwal, kelas, atau fitur lain sesuai kewenangan.
7. Guru memilih Keluar untuk mengakhiri sesi.

### 4.3 Alur Login Operator

1. Operator membuka halaman masuk.
2. Operator mengisi identitas akun dan kata sandi.
3. Sistem memvalidasi akun dan role.
4. Operator diarahkan ke Dashboard Operator.
5. Operator memilih modul pengelolaan.
6. Operator menambah atau memperbarui data.
7. Sistem memvalidasi data sebelum menyimpan.
8. Sistem menampilkan pemberitahuan keberhasilan atau kesalahan.

### 4.4 Alur Publikasi Konten

1. Operator membuka modul konten, misalnya Dokumentasi Kegiatan.
2. Operator memilih Tambah Data.
3. Operator mengisi judul, tanggal, deskripsi, dan gambar yang diperlukan.
4. Operator menyimpan sebagai Draf atau menerbitkan konten.
5. Jika draf, konten tidak muncul pada website publik.
6. Jika diterbitkan, konten tampil pada halaman publik.
7. Operator dapat memperbarui atau menarik publikasi jika diperlukan.

Status publikasi awal: `Draf`, `Terbit`, dan `Arsip`. Nilai tersebut dapat disederhanakan bila sekolah tidak membutuhkan status Arsip.

### 4.5 Alur Pengelolaan Dokumen

1. Operator membuka menu Arsip Dokumen.
2. Operator memilih folder tujuan atau membuat folder baru.
3. Operator mengunggah dokumen.
4. Server memeriksa tipe dan ukuran file.
5. Jika valid, file disimpan dan metadata dicatat ke database.
6. Dokumen muncul dalam daftar folder.
7. Operator dapat mencari, mengunduh, mengganti nama, atau memindahkan dokumen.
8. Guru hanya dapat membuka dokumen yang memang dibagikan kepadanya.

### 4.6 Alur Pengisian Absensi (Apabila Disetujui)

1. Guru membuka menu Absensi.
2. Sistem hanya menampilkan kelas yang menjadi tanggung jawab Guru.
3. Guru memilih kelas dan tanggal/pertemuan.
4. Sistem menampilkan daftar siswa.
5. Guru mengisi status kehadiran.
6. Guru menyimpan absensi.
7. Sistem memvalidasi agar satu siswa tidak memiliki catatan ganda pada sesi yang sama.
8. Guru melihat ringkasan hasil penyimpanan.
9. Operator dapat melihat rekap sesuai hak akses yang disepakati.

---

## 5. Rancangan Basis Data

### 5.1 Prinsip Perancangan Data

- Data akun dan data profil guru dipisahkan agar autentikasi tidak bercampur dengan informasi profil publik.
- Setiap tabel memiliki primary key.
- Relasi antar tabel menggunakan foreign key jika memungkinkan.
- Tabel yang memiliki riwayat perubahan sebaiknya menggunakan `created_at` dan `updated_at`.
- Data yang dihapus dan masih mungkin diperlukan dapat menggunakan soft delete.
- Data siswa dan absensi bersifat internal; jangan ditampilkan pada halaman publik.
- Struktur database harus menggunakan migration agar dapat dibangun ulang pada komputer anggota lain.

### 5.2 Daftar Tabel Utama

Tabel berikut merupakan rancangan awal. Tim boleh menyesuaikan nama kolom setelah kebutuhan sekolah dikonfirmasi, tetapi perubahan harus disepakati dan dicatat.

#### A. `users` — Akun Pengguna

| Kolom | Tipe yang Disarankan | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGINT, PK | ID akun |
| `name` | VARCHAR(150) | Nama tampilan pengguna |
| `email` | VARCHAR(150), unique, nullable sesuai kebijakan | Email akun bila digunakan untuk login |
| `username` | VARCHAR(80), unique, nullable sesuai kebijakan | Username bila sekolah memilih login dengan username |
| `password` | VARCHAR(255) | Password yang telah di-hash |
| `role` | ENUM/VARCHAR | `guru` atau `operator` |
| `is_active` | BOOLEAN | Status akun aktif atau tidak |
| `last_login_at` | DATETIME, nullable | Waktu login terakhir |
| `created_at`, `updated_at` | TIMESTAMP | Waktu pembuatan/perubahan |

**Aturan:** role hanya boleh `guru` atau `operator`. Tidak ada nilai `admin`.

#### B. `teacher_profiles` — Profil Guru

| Kolom | Tipe yang Disarankan | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGINT, PK | ID profil |
| `user_id` | BIGINT, FK, nullable | Relasi ke akun Guru jika Guru memiliki akses login |
| `full_name` | VARCHAR(150) | Nama guru |
| `position` | VARCHAR(100), nullable | Jabatan/tugas yang boleh dicatat |
| `photo_path` | VARCHAR(255), nullable | Lokasi foto profil |
| `public_bio` | TEXT, nullable | Deskripsi publik jika disetujui |
| `is_published` | BOOLEAN | Apakah profil boleh ditampilkan publik |
| `is_active` | BOOLEAN | Status data guru |
| `created_at`, `updated_at` | TIMESTAMP | Waktu data |

#### C. `school_profiles` — Profil Sekolah

Kolom awal: `id`, `school_name`, `short_description`, `history`, `vision`, `mission`, `address`, `public_phone`, `public_email`, `logo_path`, `cover_path`, `updated_by`, `created_at`, `updated_at`.

Tabel ini dapat dibatasi hanya memiliki satu data aktif apabila sekolah memilih satu halaman profil utama.

#### D. `facilities` — Data Fasilitas

Kolom awal: `id`, `name`, `category`, `description`, `image_path`, `publication_status`, `created_by`, `created_at`, `updated_at`, `deleted_at`.

#### E. `extracurriculars` — Data Ekstrakurikuler

Kolom awal: `id`, `name`, `description`, `schedule_text` nullable, `supervisor_name` nullable, `image_path`, `publication_status`, `created_by`, `created_at`, `updated_at`, `deleted_at`.

#### F. `school_events` — Kegiatan Sekolah

Kolom awal: `id`, `title`, `event_date`, `category`, `description`, `cover_image_path`, `publication_status`, `created_by`, `created_at`, `updated_at`, `deleted_at`.

#### G. `event_photos` — Foto Kegiatan

Kolom awal: `id`, `school_event_id` (FK), `file_path`, `caption` nullable, `sort_order`, `created_at`, `updated_at`.

#### H. `achievements` — Prestasi Siswa

Kolom awal: `id`, `title`, `student_display_name` nullable, `category`, `level`, `achievement_date`, `description`, `image_path`, `publication_status`, `verified_by` nullable, `created_at`, `updated_at`, `deleted_at`.

Nama siswa untuk tampilan publik harus mengikuti persetujuan sekolah. Data identitas internal tidak perlu disalin ke tabel publik jika tidak dibutuhkan.

#### I. `classes` — Data Kelas

Kolom awal: `id`, `class_name`, `academic_year`, `grade_level`, `homeroom_teacher_id` nullable (FK ke `teacher_profiles`), `is_active`, `created_at`, `updated_at`.

#### J. `students` — Data Siswa

Kolom awal: `id`, `student_number` nullable, `full_name`, `class_id` (FK), `is_active`, `created_at`, `updated_at`, `deleted_at`.

Data pribadi tambahan tidak dimasukkan sebelum ada kebutuhan dan persetujuan yang jelas.

#### K. `teaching_assignments` — Penugasan Guru

Kolom awal: `id`, `teacher_id` (FK), `class_id` (FK), `subject_name` nullable, `academic_year`, `created_at`, `updated_at`.

Tabel ini digunakan untuk membatasi kelas yang dapat diakses Guru. Apabila semua Guru hanya memiliki satu kelas, model ini tetap bisa digunakan; jika pembagian tugas lebih kompleks, tabel ini lebih fleksibel.

#### L. `schedules` — Jadwal Mengajar

Kolom awal: `id`, `teaching_assignment_id` (FK), `day_of_week`, `start_time`, `end_time`, `room` nullable, `academic_year`, `created_at`, `updated_at`.

#### M. `attendance_sessions` — Sesi Absensi

**[Usulan, perlu konfirmasi]** Kolom awal: `id`, `class_id` (FK), `teacher_id` (FK), `attendance_date`, `session_label` nullable, `notes` nullable, `created_at`, `updated_at`.

#### N. `attendance_records` — Catatan Absensi Siswa

**[Usulan, perlu konfirmasi]** Kolom awal: `id`, `attendance_session_id` (FK), `student_id` (FK), `status`, `notes` nullable, `recorded_by` (FK ke `users`), `created_at`, `updated_at`.

Tambahkan unique constraint pada kombinasi `attendance_session_id` dan `student_id` agar satu siswa hanya memiliki satu catatan pada satu sesi.

#### O. `cooperative_records` — Data Koperasi

**[Perlu Konfirmasi]** Struktur kolom harus mengikuti keputusan sekolah. Jika hanya data informasi umum, tabel dapat berisi judul, deskripsi, kontak, dan status publikasi. Jika sekolah meminta data stok/transaksi, rancangan tabel perlu diperluas dan diperlakukan sebagai modul tersendiri.

#### P. `document_folders` — Folder Arsip

| Kolom | Tipe yang Disarankan | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGINT, PK | ID folder |
| `parent_id` | BIGINT, FK nullable | Folder induk; kosong berarti folder utama |
| `name` | VARCHAR(150) | Nama folder |
| `description` | TEXT, nullable | Keterangan folder |
| `created_by` | BIGINT, FK ke `users` | Pembuat folder |
| `created_at`, `updated_at` | TIMESTAMP | Waktu data |
| `deleted_at` | TIMESTAMP, nullable | Penghapusan sementara |

#### Q. `documents` — Metadata Dokumen

| Kolom | Tipe yang Disarankan | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGINT, PK | ID dokumen |
| `folder_id` | BIGINT, FK nullable | Lokasi folder |
| `original_name` | VARCHAR(255) | Nama berkas asli |
| `display_name` | VARCHAR(255) | Nama yang terlihat di aplikasi |
| `storage_path` | VARCHAR(500) | Lokasi file pada storage privat/publik |
| `mime_type` | VARCHAR(120) | Tipe berkas |
| `file_size` | BIGINT | Ukuran dalam byte |
| `description` | TEXT, nullable | Keterangan dokumen |
| `visibility` | VARCHAR(30) | `internal` atau `public` sesuai kebijakan |
| `uploaded_by` | BIGINT, FK ke `users` | Pengunggah |
| `created_at`, `updated_at` | TIMESTAMP | Waktu data |
| `deleted_at` | TIMESTAMP, nullable | Penghapusan sementara |

#### R. `document_user_access` — Akses Dokumen Khusus (Opsional)

**[Usulan]** Digunakan jika sekolah ingin membagikan dokumen kepada Guru tertentu atau kelompok tertentu. Kolom awal: `id`, `document_id`, `user_id`, `access_level`, `created_at`.

Jika seluruh dokumen hanya dikelola Operator, tabel ini dapat tidak digunakan pada versi pertama.

#### S. `activity_logs` — Catatan Aktivitas

**[Usulan]** Menyimpan aktivitas penting seperti login, perubahan konten, penghapusan dokumen, atau perubahan absensi. Kolom awal: `id`, `user_id`, `action`, `module`, `record_id`, `description`, `ip_address` nullable, `created_at`.

### 5.3 Hubungan Antar Tabel

```text
users 1 ---- 0..1 teacher_profiles
teacher_profiles 1 ---- many teaching_assignments
classes 1 ---- many teaching_assignments
teaching_assignments 1 ---- many schedules
classes 1 ---- many students
classes 1 ---- many attendance_sessions
attendance_sessions 1 ---- many attendance_records
students 1 ---- many attendance_records

users 1 ---- many document_folders (created_by)
document_folders 1 ---- many document_folders (parent_id)
document_folders 1 ---- many documents
users 1 ---- many documents (uploaded_by)

school_events 1 ---- many event_photos
```

### 5.4 Data yang Tidak Boleh Dibuka untuk Publik

- Password, token, dan informasi autentikasi.
- Data absensi individu siswa.
- Data identitas siswa yang bersifat internal.
- Dokumen administrasi sekolah yang tidak ditandai untuk publikasi.
- Nomor telepon pribadi, alamat rumah, dan informasi sensitif lain.
- Informasi kepegawaian yang tidak disetujui untuk ditampilkan.

---

## 6. Kontrak Route dan Proses Backend

### 6.1 Prinsip Route

CAPSGO menggunakan route Laravel pada `routes/web.php` dengan Inertia.js. Karena frontend dan backend berada dalam satu aplikasi, versi pertama tidak membutuhkan REST API terpisah. Route mengembalikan halaman Inertia, redirect, atau respons unduhan file sesuai kebutuhan.

Nama URI berikut merupakan rancangan. Nama akhir dapat disesuaikan selama konsisten dan dicatat dalam README.

### 6.2 Route Publik

| Method | URI | Nama Route yang Disarankan | Fungsi |
| :--- | :--- | :--- | :--- |
| GET | `/` | `public.home` | Beranda |
| GET | `/profil-sekolah` | `public.profile` | Profil sekolah |
| GET | `/struktur-organisasi` | `public.organization` | Struktur organisasi |
| GET | `/guru` | `public.teachers.index` | Daftar guru yang boleh dipublikasikan |
| GET | `/fasilitas` | `public.facilities.index` | Daftar fasilitas |
| GET | `/ekstrakurikuler` | `public.extracurriculars.index` | Daftar ekstrakurikuler |
| GET | `/kegiatan` | `public.events.index` | Daftar dokumentasi kegiatan |
| GET | `/kegiatan/{event}` | `public.events.show` | Detail dokumentasi kegiatan |
| GET | `/prestasi` | `public.achievements.index` | Daftar prestasi yang boleh dipublikasikan |
| GET | `/kontak` | `public.contact` | Kontak sekolah |

### 6.3 Route Autentikasi

| Method | URI | Fungsi |
| :--- | :--- | :--- |
| GET | `/masuk` | Menampilkan halaman login |
| POST | `/masuk` | Memproses login |
| POST | `/keluar` | Mengakhiri sesi |

Route autentikasi internal harus dilindungi dari pendaftaran publik. Penggunaan email atau username sebagai identitas login ditentukan setelah sekolah memilih format akun.

### 6.4 Route Guru

Seluruh route di bawah `/guru` membutuhkan login dan role `guru`.

| Method | URI | Fungsi |
| :--- | :--- | :--- |
| GET | `/guru/dashboard` | Dashboard Guru |
| GET | `/guru/jadwal` | Jadwal mengajar Guru yang sedang login |
| GET | `/guru/kelas` | Daftar kelas yang ditugaskan kepada Guru |
| GET | `/guru/kelas/{class}/siswa` | Daftar siswa pada kelas yang boleh diakses |
| GET | `/guru/absensi` | Daftar sesi absensi (jika modul disetujui) |
| GET | `/guru/absensi/buat` | Form absensi (jika modul disetujui) |
| POST | `/guru/absensi` | Menyimpan absensi (jika modul disetujui) |
| GET | `/guru/dokumen` | Daftar dokumen yang dibagikan kepada Guru (jika fitur dibangun) |

### 6.5 Route Operator

Seluruh route di bawah `/operator` membutuhkan login dan role `operator`.

| Method | URI | Fungsi |
| :--- | :--- | :--- |
| GET | `/operator/dashboard` | Dashboard Operator |
| GET/PUT | `/operator/profil-sekolah` | Melihat dan memperbarui profil sekolah |
| GET/POST | `/operator/guru` | Daftar dan tambah data guru |
| GET/PUT/DELETE | `/operator/guru/{teacher}` | Detail, ubah, dan hapus/nonaktifkan data guru |
| GET/POST | `/operator/fasilitas` | Daftar dan tambah fasilitas |
| GET/PUT/DELETE | `/operator/fasilitas/{facility}` | Ubah dan hapus fasilitas |
| GET/POST | `/operator/ekstrakurikuler` | Daftar dan tambah ekstrakurikuler |
| GET/PUT/DELETE | `/operator/ekstrakurikuler/{activity}` | Ubah dan hapus ekstrakurikuler |
| GET/POST | `/operator/kegiatan` | Daftar dan tambah dokumentasi kegiatan |
| GET/PUT/DELETE | `/operator/kegiatan/{event}` | Ubah dan hapus dokumentasi kegiatan |
| GET/POST | `/operator/prestasi` | Daftar dan tambah prestasi |
| GET/PUT/DELETE | `/operator/prestasi/{achievement}` | Ubah dan hapus prestasi |
| GET | `/operator/absensi` | Melihat rekap absensi sesuai kewenangan |
| GET | `/operator/koperasi` | Mengelola informasi/data koperasi sesuai hasil konfirmasi |
| GET/POST | `/operator/folder` | Daftar dan membuat folder |
| PATCH/DELETE | `/operator/folder/{folder}` | Mengubah/menghapus folder |
| POST | `/operator/dokumen` | Mengunggah dokumen |
| GET | `/operator/dokumen/{document}/unduh` | Mengunduh dokumen setelah pemeriksaan izin |
| PATCH/DELETE | `/operator/dokumen/{document}` | Mengubah metadata/mengarsipkan dokumen |
| GET/POST | `/operator/akun-guru` | Melihat dan membuat akun Guru |
| PATCH | `/operator/akun-guru/{user}` | Mengubah status akun atau informasi yang diizinkan |

Route yang bersifat opsional hanya dibuat apabila modul terkait benar-benar disetujui dan dikerjakan.

### 6.6 Konvensi Respons dan Validasi

- Form yang berhasil disimpan menampilkan pesan konfirmasi.
- Form dengan kesalahan validasi menampilkan pesan pada kolom yang terkait.
- Data yang tidak ditemukan mengembalikan halaman 404 atau pesan yang jelas.
- Pengguna tanpa izin mendapatkan respons 403.
- Pengguna yang belum login diarahkan ke halaman masuk.
- Kegagalan server tidak menampilkan stack trace kepada pengguna.
- Semua data yang diterima dari browser divalidasi kembali di backend.

### 6.7 Kontrak Upload dan Download Dokumen

Saat unggah:
1. Pastikan pengguna telah login dan memiliki akses ke modul dokumen.
2. Validasi ekstensi/MIME type dan ukuran file.
3. Buat nama fisik file yang unik.
4. Simpan pada disk yang sesuai dengan tingkat kerahasiaan.
5. Simpan metadata ke tabel `documents`.
6. Jika penyimpanan metadata gagal, tangani agar tidak meninggalkan file yatim tanpa catatan.

Saat unduh:
1. Cari metadata dokumen.
2. Periksa role, kepemilikan, dan izin dokumen.
3. Pastikan file benar-benar tersedia.
4. Kirim file sebagai unduhan.
5. Jangan menampilkan jalur fisik server kepada pengguna.

---

## 7. Spesifikasi Antarmuka dan Pengalaman Pengguna

### 7.1 Prinsip Desain

- Antarmuka menggunakan bahasa Indonesia yang sederhana dan konsisten.
- Menu dibedakan antara website publik, portal Guru, dan portal Operator.
- Tata letak responsif untuk ponsel, tablet, dan komputer.
- Informasi penting diletakkan pada bagian yang mudah ditemukan.
- Form menggunakan label yang jelas dan pesan validasi yang mudah dipahami.
- Tombol tindakan utama harus konsisten, misalnya “Simpan”, “Tambah Data”, “Ubah”, dan “Hapus”.
- Status tidak boleh dibedakan hanya dengan warna; sertakan teks atau ikon.
- Hindari tabel lebar pada layar kecil; gunakan tampilan kartu atau tabel yang dapat digulir.
- Tampilkan konfirmasi sebelum tindakan yang berisiko menghapus atau mengubah data penting.

### 7.2 Layout Website Publik

Struktur umum:

```text
PublicLayout
├── Header
│   ├── Logo dan nama sekolah
│   ├── Navigasi utama
│   └── Tombol masuk untuk pengguna internal
├── Main Content
│   └── Halaman yang sedang dibuka
└── Footer
    ├── Alamat dan kontak resmi
    ├── Tautan halaman
    └── Informasi hak cipta
```

### 7.3 Layout Portal Guru

```text
GuruLayout
├── Sidebar / Navigasi
│   ├── Dashboard
│   ├── Jadwal Mengajar
│   ├── Kelas Saya
│   ├── Absensi (jika disetujui)
│   └── Dokumen (jika diaktifkan)
├── Header
│   ├── Judul halaman
│   └── Menu akun dan keluar
└── Konten halaman
```

### 7.4 Layout Portal Operator

```text
OperatorLayout
├── Sidebar / Navigasi
│   ├── Dashboard
│   ├── Profil Sekolah
│   ├── Data Guru
│   ├── Fasilitas
│   ├── Ekstrakurikuler
│   ├── Dokumentasi Kegiatan
│   ├── Prestasi Siswa
│   ├── Data Absensi
│   ├── Koperasi
│   ├── Arsip Dokumen
│   └── Akun Guru
├── Header
│   ├── Judul halaman
│   └── Menu akun dan keluar
└── Konten halaman
```

Menu yang belum disetujui atau belum dibangun tidak perlu ditampilkan sebagai menu aktif.

### 7.5 Komponen UI Bersama

- `Button`: tombol aksi utama, sekunder, dan berbahaya.
- `Input`: isian teks.
- `Select`: pilihan kategori/status.
- `Textarea`: deskripsi atau catatan.
- `DataTable`: tabel dengan pencarian, pagination, dan aksi.
- `StatusBadge`: penanda draf/terbit/arsip atau status absensi.
- `ConfirmDialog`: konfirmasi hapus atau tindakan penting.
- `Toast`: pemberitahuan berhasil/gagal.
- `EmptyState`: tampilan saat belum ada data.
- `LoadingState`: tampilan saat data sedang diambil.
- `ErrorState`: tampilan ketika pemuatan data gagal.
- `FileUploader`: unggah berkas dengan informasi tipe dan batas ukuran.
- `Breadcrumb`: penunjuk lokasi halaman/folder.

### 7.6 Format Form

Setiap form minimal harus memiliki:
- Judul form.
- Label untuk setiap kolom.
- Penjelasan singkat jika format isian tidak jelas.
- Indikator kolom wajib.
- Pesan validasi.
- Tombol Simpan.
- Tombol Batal atau Kembali.
- Pencegahan pengiriman ganda ketika proses simpan masih berjalan.

### 7.7 Keadaan Halaman

Semua halaman yang memuat data wajib memiliki empat keadaan:

1. **Memuat:** tampilkan indikator proses.
2. **Berhasil:** tampilkan data.
3. **Kosong:** tampilkan pesan bahwa data belum tersedia dan tombol tambah jika pengguna berhak.
4. **Gagal:** tampilkan penjelasan singkat dan tindakan coba lagi bila relevan.

---

## 8. Kebutuhan Nonfungsional

| Area | Persyaratan |
| :--- | :--- |
| Keamanan | Autentikasi dan otorisasi backend wajib; password di-hash; file internal tidak dapat diakses publik tanpa izin. |
| Privasi | Data siswa, absensi, dan dokumen internal dibatasi; publikasi foto/nama siswa mengikuti persetujuan sekolah. |
| Kemudahan penggunaan | Navigasi jelas, bahasa sederhana, formulir konsisten, dan minim langkah yang tidak diperlukan. |
| Responsif | Halaman dapat digunakan pada ponsel dan komputer. |
| Kinerja | Gunakan pagination untuk daftar data; optimalkan gambar; hindari query berulang yang tidak perlu. |
| Ketersediaan | Aplikasi menampilkan pesan yang jelas jika database atau penyimpanan berkas tidak dapat diakses. |
| Kemudahan pemeliharaan | Struktur kode modular, migration tersedia, dan dokumentasi instalasi diperbarui. |
| Konsistensi | Format tanggal, nama menu, status, tombol, dan pesan dibuat seragam. |
| Pencadangan | Database dan dokumen perlu memiliki prosedur backup yang disepakati dengan sekolah. |
| Aksesibilitas | Kontras teks memadai, ukuran tombol mudah disentuh, label form jelas, dan status disampaikan melalui teks. |
| Audit | Perubahan penting pada data internal dicatat jika modul log aktivitas diaktifkan. |

---

## 9. Pengujian dan Kriteria Penerimaan

### 9.1 Pengujian yang Wajib Dilakukan

| Jenis Pengujian | Cakupan |
| :--- | :--- |
| Pengujian unit | Validasi fungsi atau aturan bisnis yang berdiri sendiri |
| Pengujian fitur/backend | Route, controller, penyimpanan database, autentikasi, otorisasi, dan validasi |
| Pengujian komponen | Form, tabel, tombol, dialog, dan keadaan loading/error |
| Pengujian alur pengguna | Alur pengunjung, login Guru, login Operator, pengelolaan konten, dan pengelolaan arsip |
| Pengujian responsif | Ponsel, tablet, dan layar komputer |
| Pengujian keamanan dasar | Akses tanpa login, akses lintas role, akses data kelas lain, serta unduhan dokumen tanpa izin |
| Uji penerimaan pengguna | Pihak sekolah mencoba prototipe/website dan memberi umpan balik |

### 9.2 Skenario Pengujian Inti

| ID | Skenario | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| T01 | Pengunjung membuka halaman beranda | Halaman tampil tanpa login |
| T02 | Pengunjung membuka halaman profil/fasilitas | Konten publik yang diterbitkan tampil dengan benar |
| T03 | Pengunjung mencoba membuka dashboard internal | Pengunjung diarahkan ke halaman login |
| T04 | Guru login menggunakan akun valid | Guru diarahkan ke Dashboard Guru |
| T05 | Operator login menggunakan akun valid | Operator diarahkan ke Dashboard Operator |
| T06 | Guru mencoba membuka route Operator | Sistem menolak akses dengan status 403 atau halaman penolakan |
| T07 | Operator menambahkan konten sebagai draf | Data tersimpan dan tidak tampil di halaman publik |
| T08 | Operator menerbitkan konten | Konten tampil pada halaman publik |
| T09 | Operator mengunggah file dengan tipe/ukuran valid | File tersimpan dan metadata muncul |
| T10 | Pengguna tanpa izin mencoba mengunduh dokumen internal | Sistem menolak permintaan |
| T11 | Guru mencoba membuka kelas yang bukan penugasannya | Sistem menolak akses |
| T12 | Guru mengisi absensi (jika modul disetujui) | Catatan tersimpan sesuai aturan sesi dan siswa |
| T13 | Form dikirim dengan data wajib kosong | Sistem menampilkan pesan validasi |
| T14 | Pencarian data tidak menemukan hasil | Sistem menampilkan keadaan kosong |
| T15 | Halaman dibuka dari ponsel | Layout tidak mengalami overflow yang mengganggu |
| T16 | Pengguna logout lalu membuka halaman internal | Sistem meminta login kembali |

### 9.3 Kriteria Penyelesaian per Modul

Sebuah modul dinyatakan selesai apabila:
- Halaman dapat dibuka oleh role yang tepat.
- Data berasal dari database, bukan data statis yang hanya ditulis pada frontend.
- Validasi backend berjalan.
- Kondisi loading, kosong, berhasil, dan gagal tersedia.
- Tombol dan tautan menjalankan fungsi sesuai label.
- Pengujian modul lulus.
- Tidak ada error penting pada console browser atau log aplikasi.
- README dan dokumentasi teknis diperbarui apabila ada perubahan cara menjalankan aplikasi.

### 9.4 Pengujian Bersama Pihak Sekolah

Sebelum penyerahan, tim perlu meminta pihak sekolah memeriksa:
- Kesesuaian istilah menu dengan kebiasaan sekolah.
- Kebenaran informasi profil dan konten publik.
- Ketepatan pembagian akses Guru dan Operator.
- Kemudahan pengelolaan dokumen.
- Kesesuaian alur absensi dan kelas jika fitur tersebut diaktifkan.
- Kesesuaian tampilan pada perangkat yang biasa digunakan.

Hasil uji dapat dicatat dalam daftar temuan, formulir umpan balik, atau dokumentasi komunikasi dengan pihak sekolah.

---

## 10. Pembagian Tugas Tim (3 Anggota)

### 10.1 Prinsip Pembagian

Pembagian menggunakan pendekatan **fitur per modul**. Setiap anggota bertanggung jawab menyelesaikan bagian yang ditetapkan mulai dari rancangan tampilan, pengolahan data, validasi, integrasi, hingga pengujian. Bagian yang saling bergantung harus menggunakan kontrak data dan nama route yang disepakati sejak awal.

Nama anggota belum ditulis karena perlu diisi sesuai nama dan NIM kelompok.

### 10.2 Anggota 1 — Ketua Tim, Fondasi Aplikasi, Login, Hak Akses, dan Integrasi

**Fokus utama:** memastikan fondasi aplikasi dapat dipakai oleh seluruh anggota dan setiap role memiliki akses yang benar.

Tanggung jawab:

1. Membuat repository Git dan proyek Laravel.
2. Mengatur React, TypeScript, Inertia, Tailwind, Vite, dan struktur direktori.
3. Menyiapkan koneksi database MySQL.
4. Membuat migration dasar dan model inti.
5. Menyiapkan autentikasi login dan logout.
6. Menyiapkan role `guru` dan `operator` tanpa role Admin.
7. Membuat middleware dan policy untuk pemeriksaan role serta kepemilikan data.
8. Menyiapkan layout awal publik, Guru, dan Operator agar anggota lain dapat mengembangkan halaman pada kerangka yang sama.
9. Membuat pengelolaan akun Guru oleh Operator sesuai keputusan sekolah.
10. Menetapkan konvensi route, nama model, format respons, komponen bersama, serta aturan branch.
11. Menggabungkan pekerjaan anggota lain dan menyelesaikan konflik integrasi.
12. Menyiapkan konfigurasi deployment, `.env.example`, backup awal, dan dokumentasi instalasi.

**File/folder utama yang menjadi PIC:**

```text
routes/web.php
app/Http/Middleware/
app/Policies/
app/Models/User.php
app/Http/Controllers/Auth/
app/Http/Controllers/Operator/UserController.php
resources/js/Layouts/
resources/js/Pages/Auth/
resources/js/Components/
database/migrations/
database/seeders/
README.md
```

**Pengujian yang menjadi tanggung jawab:**
- Login berhasil dan gagal.
- Logout.
- Akun tidak aktif tidak dapat login.
- Pengunjung tidak dapat membuka portal internal.
- Guru tidak dapat membuka route Operator.
- Operator dapat mengakses halaman pengelolaan yang diizinkan.
- Pemeriksaan bahwa tidak ada role `admin`.

**Kriteria penerimaan anggota 1:**
- Proyek dapat dijalankan pada komputer anggota lain mengikuti README.
- Login mengarahkan pengguna berdasarkan role.
- Route internal terlindungi di backend.
- Seluruh anggota dapat memakai layout, model, dan pola route yang sama.
- Migration dapat dijalankan dari database kosong.

### 10.3 Anggota 2 — Website Publik dan Pengelolaan Konten Publik

**Fokus utama:** membangun bagian website yang dilihat masyarakat dan modul Operator untuk mengelola konten yang tampil di halaman publik.

Tanggung jawab:

1. Membuat beranda website publik.
2. Membuat halaman Profil Sekolah.
3. Membuat halaman Struktur Organisasi jika data tersedia.
4. Membuat halaman daftar guru yang boleh dipublikasikan.
5. Membuat halaman Fasilitas.
6. Membuat halaman Ekstrakurikuler.
7. Membuat halaman Dokumentasi Kegiatan dan detail kegiatan.
8. Membuat halaman Prestasi Siswa.
9. Membuat halaman Kontak.
10. Membuat form dan tabel Operator untuk mengelola profil sekolah, fasilitas, ekstrakurikuler, kegiatan, dokumentasi, dan prestasi.
11. Menambahkan status draf/terbit/arsip pada konten yang membutuhkannya.
12. Memastikan halaman publik hanya mengambil data yang telah diterbitkan.
13. Mengoptimalkan gambar agar ukuran halaman tidak terlalu besar.
14. Melakukan pengujian tampilan responsif dan alur publikasi.

**File/folder utama yang menjadi PIC:**

```text
app/Http/Controllers/Public/
app/Http/Controllers/Operator/SchoolProfileController.php
app/Http/Controllers/Operator/FacilityController.php
app/Http/Controllers/Operator/ExtracurricularController.php
app/Http/Controllers/Operator/SchoolEventController.php
app/Http/Controllers/Operator/AchievementController.php
app/Models/SchoolProfile.php
app/Models/Facility.php
app/Models/Extracurricular.php
app/Models/SchoolEvent.php
app/Models/EventPhoto.php
app/Models/Achievement.php
resources/js/Pages/Public/
resources/js/Pages/Operator/Content/
```

**Pengujian yang menjadi tanggung jawab:**
- Semua halaman publik dapat dibuka tanpa login.
- Konten draf tidak muncul pada website publik.
- Konten terbit muncul pada halaman yang sesuai.
- Form tambah dan ubah konten berjalan.
- Gambar tampil dan tidak merusak tata letak.
- Pencarian/filter sederhana berfungsi jika disediakan.
- Halaman responsif pada ponsel dan desktop.

**Kriteria penerimaan anggota 2:**
- Website publik memiliki seluruh halaman yang disepakati.
- Operator dapat mengelola konten publik dari portal.
- Tidak ada informasi contoh atau placeholder yang dianggap sebagai data resmi.
- Konten publik berasal dari database dan dapat diperbarui tanpa mengedit source code.

### 10.4 Anggota 3 — Portal Guru, Data Operasional, dan Arsip Dokumen

**Fokus utama:** membangun fitur internal yang dipakai Guru dan Operator untuk kebutuhan operasional, termasuk kelas, jadwal, absensi jika disetujui, dan pengelolaan berkas.

Tanggung jawab:

1. Membuat Dashboard Guru.
2. Membuat halaman Jadwal Mengajar.
3. Membuat halaman Kelas Saya dan daftar siswa sesuai penugasan Guru.
4. Membuat fitur absensi apabila prosesnya telah dikonfirmasi dan disetujui sekolah.
5. Membuat Dashboard Operator bagian ringkasan data internal bersama Anggota 1.
6. Membuat halaman pengelolaan folder dan subfolder.
7. Membuat fitur unggah, unduh, pencarian, ubah nama, pindah folder, dan arsip dokumen.
8. Membuat pembatasan akses dokumen untuk Guru dan Operator.
9. Membuat tampilan rekap absensi jika modul absensi aktif.
10. Membuat modul data koperasi sesuai ruang lingkup yang telah diputuskan sekolah.
11. Menguji akses kelas, absensi, dan dokumen agar tidak dapat dibuka pengguna yang tidak berwenang.
12. Menyusun panduan penggunaan singkat untuk Guru dan Operator.

**File/folder utama yang menjadi PIC:**

```text
app/Http/Controllers/Guru/
app/Http/Controllers/Operator/DocumentController.php
app/Http/Controllers/Operator/FolderController.php
app/Http/Controllers/Operator/AttendanceController.php
app/Http/Controllers/Operator/CooperativeController.php
app/Models/Classroom.php
app/Models/Student.php
app/Models/TeachingAssignment.php
app/Models/Schedule.php
app/Models/AttendanceSession.php
app/Models/AttendanceRecord.php
app/Models/DocumentFolder.php
app/Models/Document.php
resources/js/Pages/Guru/
resources/js/Pages/Operator/Operations/
resources/js/Pages/Operator/Documents/
```

**Pengujian yang menjadi tanggung jawab:**
- Guru hanya dapat melihat penugasan kelasnya.
- Jadwal diurutkan secara benar.
- Guru tidak dapat membuka data siswa dari kelas lain.
- Absensi tidak menghasilkan catatan ganda jika fitur diaktifkan.
- File yang diunggah tersimpan dan dapat diunduh oleh pengguna berizin.
- File internal tidak dapat diunduh tanpa login atau tanpa izin.
- Folder dan subfolder dapat dibuat dan dibuka.
- Dokumen dapat dicari dan dipindahkan.

**Kriteria penerimaan anggota 3:**
- Guru dapat menggunakan fitur operasional yang disetujui.
- Operator dapat mengelola arsip dokumen.
- Pemeriksaan akses dilakukan di backend.
- Fitur absensi dan koperasi mengikuti hasil konfirmasi sekolah, bukan asumsi tim.

### 10.5 Tanggung Jawab Bersama

| Pekerjaan | Anggota 1 | Anggota 2 | Anggota 3 |
| :--- | :---: | :---: | :---: |
| Analisis kebutuhan dan konfirmasi dengan sekolah | Koordinator | Mendukung | Mendukung |
| Standar teknologi dan struktur repository | PIC | Mengikuti | Mengikuti |
| Database dan migration | Fondasi & review | Tabel konten publik | Tabel operasional & dokumen |
| Login dan role | PIC | Integrasi | Integrasi |
| Website publik | Review | PIC | Mendukung bila diperlukan |
| CMS konten publik | Integrasi | PIC | Mendukung bila diperlukan |
| Dashboard Guru | Integrasi | — | PIC |
| Jadwal/kelas/absensi | Review akses | — | PIC |
| Arsip dokumen | Review keamanan | — | PIC |
| Pengujian lintas role | Koordinator | PIC modul publik | PIC modul internal |
| Deployment dan README | PIC utama | Dokumentasi konten | Dokumentasi penggunaan modul |
| Uji penerimaan sekolah | Koordinator | Mendukung | Mendukung |

### 10.6 Aturan Kolaborasi dan Integrasi

- `main` harus selalu dapat dijalankan.
- Setiap anggota bekerja pada branch fitur masing-masing.
- Branch tidak boleh mengubah file inti milik anggota lain tanpa komunikasi terlebih dahulu.
- Setiap fitur harus dibuat dalam pull request dan diperiksa minimal satu anggota lain.
- Migration dibuat sebelum halaman menggunakan tabel yang bersangkutan.
- Setiap endpoint/route, nama kolom, dan bentuk data harus disepakati sebelum integrasi.
- Konflik pada `routes/web.php`, `package.json`, `composer.json`, layout, dan model bersama harus diselesaikan bersama.
- Jangan membuat tiga versi komponen tabel, tombol, atau form yang berbeda untuk fungsi yang sama.
- Setiap anggota wajib melakukan commit terhadap fitur yang benar-benar dikerjakannya.

**Contoh branch:**

```text
main
feat/auth-and-roles
feat/public-website
feat/content-management
feat/teacher-portal
feat/document-management
fix/attendance-validation
```

**Contoh format commit:**

```text
feat: add public school profile page
feat: implement operator facility management
feat: add teacher schedule page
fix: restrict document download access
test: add role authorization tests
```

---

## 11. Rencana Pelaksanaan dan Tahapan Pengembangan

Metode pengembangan pada proposal menggunakan pendekatan Prototype. Karena itu, tahapan berikut disusun agar tim dapat menunjukkan rancangan awal kepada pihak sekolah, memperoleh umpan balik, lalu memperbaiki fitur sebelum penyerahan.

| Tahap | Aktivitas | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| 1. Identifikasi kebutuhan | Meninjau proposal, wawancara/konfirmasi kebutuhan, memeriksa data dan dokumen yang diizinkan | Daftar kebutuhan dan batasan yang disepakati |
| 2. Perencanaan awal | Menentukan modul prioritas, teknologi, peran pengguna, dan tanggung jawab tim | PRD dan pembagian tugas |
| 3. Rancangan prototipe | Membuat alur pengguna, wireframe, struktur navigasi, dan contoh halaman | Prototipe antarmuka |
| 4. Pembuatan prototipe | Membangun kerangka website publik dan dashboard internal | Versi awal yang dapat dicoba |
| 5. Evaluasi sekolah | Meminta Guru/Operator/pihak sekolah mencoba prototipe dan memberi masukan | Daftar umpan balik |
| 6. Revisi prototipe | Memperbaiki tampilan, alur, dan kebutuhan berdasarkan masukan | Prototipe yang disetujui untuk implementasi |
| 7. Implementasi | Membangun database, backend, frontend, autentikasi, hak akses, dan modul | Website yang berfungsi |
| 8. Pengujian | Menguji fitur, role, data, tampilan, dan keamanan dasar | Hasil pengujian dan perbaikan |
| 9. Penyelesaian dan penyerahan | Menyiapkan dokumentasi, panduan, backup, dan menyerahkan website | Produk akhir dan dokumentasi |

### 11.1 Urutan Prioritas Pengembangan

**Prioritas 1 — Fondasi:**
- Inisialisasi proyek.
- Database dasar.
- Layout publik dan internal.
- Login/logout.
- Role Guru dan Operator.
- Pengaturan hak akses.

**Prioritas 2 — Kebutuhan utama:**
- Halaman publik sekolah.
- Pengelolaan konten publik.
- Dashboard Guru.
- Jadwal mengajar dan informasi kelas.
- Pengelolaan folder dan dokumen.

**Prioritas 3 — Modul yang perlu disepakati:**
- Absensi digital.
- Data operasional koperasi.
- Akses dokumen khusus untuk Guru.
- Rekap dan ekspor data.

**Prioritas 4 — Penyempurnaan:**
- Pengujian responsif.
- Penyempurnaan desain.
- Optimasi gambar dan query.
- Pengujian penerimaan pengguna.
- Dokumentasi dan penyerahan.

---

## 12. Hasil Akhir dan Dokumen Penyerahan

Daftar hasil akhir yang disiapkan tim:

- [ ] Repository source code lengkap.
- [ ] Website publik dapat dibuka.
- [ ] Portal Guru dan Operator dapat diakses sesuai hak masing-masing.
- [ ] Database dan seluruh migration.
- [ ] Seeder untuk data contoh dan akun awal yang disepakati.
- [ ] Pengelolaan konten publik.
- [ ] Modul internal yang disetujui sekolah.
- [ ] Pengelolaan folder dan dokumen jika masuk ruang lingkup akhir.
- [ ] Hasil pengujian fitur dan hak akses.
- [ ] Dokumentasi instalasi dan cara menjalankan aplikasi.
- [ ] Panduan penggunaan singkat untuk Operator.
- [ ] Panduan penggunaan singkat untuk Guru jika portal Guru aktif.
- [ ] Dokumentasi screenshot halaman utama dan portal internal.
- [ ] Daftar kebutuhan yang belum dibangun atau masih menunggu keputusan sekolah.
- [ ] Prosedur backup database dan dokumen.
- [ ] Proses serah terima ke pihak sekolah.

### 12.1 Isi README.md

README harus memuat:
1. Deskripsi singkat CAPSGO.
2. Teknologi yang digunakan.
3. Persyaratan perangkat lunak.
4. Cara instalasi backend dan frontend.
5. Cara membuat database dan mengatur `.env`.
6. Cara menjalankan migration dan seeder.
7. Cara menjalankan server lokal.
8. Informasi akun demo yang aman untuk pengujian (tanpa memakai akun/data asli).
9. Struktur direktori utama.
10. Pembagian tugas anggota.
11. Daftar fitur yang sudah selesai dan yang belum selesai.
12. Cara menjalankan pengujian.
13. Catatan deployment dan backup.

---

## 13. Risiko dan Mitigasi

| ID | Risiko | Dampak | Mitigasi |
| :---: | :--- | :--- | :--- |
| R1 | Kebutuhan Guru belum dirinci secara operasional | Fitur kelas/absensi dapat salah alur | Konfirmasi siapa yang memakai fitur, data yang dilihat, dan tanggung jawab masing-masing sebelum implementasi |
| R2 | Role Admin masih tertulis di desain lama | Kebingungan implementasi hak akses | Gunakan hanya role Guru dan Operator; sesuaikan label Admin menjadi Operator jika memang halaman Operator |
| R3 | Data sekolah belum lengkap atau belum disetujui untuk publikasi | Halaman publik berisi informasi tidak akurat | Gunakan data dummy saat pengembangan dan ganti hanya setelah data resmi diterima |
| R4 | Foto/nama siswa dipublikasikan tanpa izin | Risiko privasi | Pastikan persetujuan sekolah dan aturan publikasi sebelum menampilkan identitas/foto siswa |
| R5 | Guru dapat membuka kelas atau dokumen di luar kewenangannya | Kebocoran data internal | Gunakan policy dan pemeriksaan kepemilikan data di backend; uji akses lintas role dan lintas kelas |
| R6 | Dokumen internal dapat dibuka melalui URL langsung | Kebocoran arsip | Simpan file privat dan layani unduhan melalui route terproteksi |
| R7 | Ukuran atau tipe dokumen terlalu besar/tidak sesuai | Kegagalan unggah atau risiko keamanan | Validasi MIME type dan ukuran file; atur limit dari konfigurasi |
| R8 | Struktur folder sulit dipahami | Pengguna kesulitan menemukan dokumen | Sepakati kategori folder awal dengan Operator dan sediakan pencarian |
| R9 | Pembagian kerja saling mengubah file yang sama | Konflik Git dan keterlambatan integrasi | Tetapkan pemilik file, contract route, dan pull request sejak awal |
| R10 | Tampilan tidak nyaman di ponsel | Pengguna kesulitan menggunakan website | Uji responsif sejak tahap prototipe, bukan hanya menjelang akhir |
| R11 | Database atau dokumen tidak dicadangkan | Kehilangan data | Buat jadwal backup dan uji pemulihan data |
| R12 | Modul koperasi berkembang menjadi sistem transaksi lengkap | Ruang lingkup melebar | Konfirmasi apakah kebutuhan hanya informasi, stok, atau transaksi; pisahkan fitur lanjutan dari MVP |
| R13 | Data absensi tidak sesuai kebijakan sekolah | Pencatatan tidak dapat digunakan | Setujui alur, status, peran penginput, dan perubahan data sebelum modul dibuat |
| R14 | Akun Operator dinonaktifkan atau terhapus tanpa sengaja | Tidak ada pengguna yang dapat mengelola website | Lindungi akun Operator terakhir dan siapkan prosedur pemulihan |

---

## 14. Keputusan yang Masih Perlu Dikonfirmasi

Bagian ini perlu ditinjau bersama pihak sekolah sebelum fitur terkait dianggap final.

| No. | Pertanyaan / Keputusan | Rekomendasi Awal |
| :---: | :--- | :--- |
| 1 | Apakah Guru akan mengisi absensi siswa secara langsung? | Jadikan fitur absensi sebagai modul bersyarat sampai sekolah mengonfirmasi alurnya. |
| 2 | Absensi dicatat per hari atau per jam pelajaran? | Ikuti proses yang sedang digunakan sekolah. |
| 3 | Siapa yang boleh memperbaiki absensi setelah disimpan? | Guru pembuat dan Operator tertentu, dengan catatan perubahan. |
| 4 | Apakah Guru hanya melihat kelas yang diampu atau juga kelas sebagai wali kelas? | Gunakan tabel penugasan fleksibel dan konfirmasi variasi peran Guru. |
| 5 | Data siswa apa saja yang boleh dilihat Guru? | Tampilkan hanya data yang dibutuhkan untuk pekerjaan Guru. |
| 6 | Apakah semua Guru memiliki akun? | Buat akun hanya untuk Guru yang akan menggunakan portal. |
| 7 | Siapa yang boleh membuat akun Operator? | Tetapkan satu prosedur pembuatan dan pemulihan akun Operator. |
| 8 | Apakah Guru dapat mengakses dokumen tertentu? | Default hanya Operator yang dapat mengelola arsip; akses Guru diberikan per dokumen/folder jika dibutuhkan. |
| 9 | Bagaimana struktur folder arsip sekolah? | Susun kategori awal bersama Operator, misalnya Administrasi, Guru, Kegiatan, Absensi, dan Dokumen Umum. |
| 10 | Apakah dokumen perlu fitur pratinjau? | Prioritaskan PDF dan gambar; format lain dapat diunduh. |
| 11 | Apakah koperasi hanya membutuhkan informasi atau juga pengelolaan barang/transaksi? | Jangan membangun transaksi sampai kebutuhan terkonfirmasi. |
| 12 | Informasi guru apa yang boleh tampil di website publik? | Tampilkan data profesional yang disetujui, bukan data pribadi. |
| 13 | Apakah nama/foto siswa boleh ditampilkan pada dokumentasi dan prestasi? | Minta persetujuan dan ikuti aturan sekolah. |
| 14 | Apakah konten harus memiliki alur persetujuan sebelum diterbitkan? | Untuk versi awal, Operator menjadi pihak yang menerbitkan setelah verifikasi internal. |
| 15 | Di mana website akan di-host dan siapa yang mengelola server? | Tentukan bersama sekolah sebelum deployment. |
| 16 | Siapa yang bertanggung jawab melakukan backup dan pemeliharaan setelah serah terima? | Tetapkan penanggung jawab dan jadwal backup. |

---

## 15. Checklist Kesiapan Implementasi

### 15.1 Sebelum Coding

- [ ] Peran sistem disepakati: Pengunjung, Guru, Operator.
- [ ] Dipastikan tidak ada role Admin terpisah.
- [ ] Daftar halaman publik disepakati.
- [ ] Daftar menu Guru dan Operator disepakati.
- [ ] Alur absensi dikonfirmasi atau dikeluarkan dari MVP.
- [ ] Kebutuhan koperasi dikonfirmasi atau dibatasi menjadi informasi umum.
- [ ] Struktur folder arsip disepakati bersama Operator.
- [ ] Data dan foto yang boleh dipakai telah diizinkan.
- [ ] Teknologi dan versi paket telah diuji kompatibilitasnya.
- [ ] Struktur database awal disepakati.
- [ ] Pembagian tugas dan branch Git sudah dibuat.

### 15.2 Sebelum Pengujian Sekolah

- [ ] Login Guru berjalan.
- [ ] Login Operator berjalan.
- [ ] Hak akses role telah diuji.
- [ ] Halaman publik mengambil data dari database.
- [ ] Operator dapat mengelola konten publik.
- [ ] Guru hanya dapat melihat data sesuai penugasan.
- [ ] Pengelolaan dokumen dan keamanan unduhan telah diuji.
- [ ] Modul absensi/koperasi sudah mengikuti keputusan sekolah.
- [ ] Tampilan ponsel dan desktop telah diuji.
- [ ] Pesan berhasil, kosong, dan gagal tersedia.
- [ ] Tidak ada data pribadi asli yang tertinggal pada akun demo atau repository.

### 15.3 Sebelum Penyerahan

- [ ] Semua fitur yang disepakati selesai.
- [ ] Migration dan seeder dapat dijalankan dari awal.
- [ ] Pengujian backend dan frontend lulus.
- [ ] README dapat diikuti pada komputer baru.
- [ ] Akun awal diserahkan melalui cara yang aman.
- [ ] Prosedur backup disiapkan.
- [ ] Panduan penggunaan disiapkan.
- [ ] Pihak sekolah telah mencoba dan memberi umpan balik.
- [ ] Semua perubahan penting sudah masuk ke branch utama.
- [ ] Daftar batasan dan fitur lanjutan diserahkan dengan jelas.

---

## 16. Referensi dan Dokumen Acuan

### 16.1 Dokumen Proyek

1. **Proposal Capstone Design Project CAPSGO — SDN 003 Samarinda.** Digunakan sebagai dasar kebutuhan, permasalahan, tujuan, ruang lingkup pengelolaan data, pengguna, metode pengembangan Prototype, dan tahapan pengumpulan data.
2. **PRD Tugasku — contoh format dokumen dari tim.** Digunakan sebagai acuan struktur dokumen teknis, tingkat perincian, tabel spesifikasi, kontrak teknis, pembagian kerja, kriteria penerimaan, risiko, dan keputusan terbuka.
3. **Mockup website publik dan dashboard internal yang telah disiapkan tim.** Digunakan sebagai referensi awal tampilan. Isi data di dalam mockup perlu diverifikasi dan istilah Admin pada contoh tampilan internal harus disesuaikan menjadi Operator.

### 16.2 Dokumentasi Teknologi

- Laravel 13 — dokumentasi rilis dan persyaratan PHP: https://laravel.com/docs/13.x/releases
- React — dokumentasi versi dan pembaruan: https://react.dev/versions dan https://react.dev/blog
- Inertia.js 3 — konsep cara kerja: https://inertiacore.net/docs/v3/core-concepts/how-it-works/
- MySQL 8.4 — dokumentasi rilis: https://dev.mysql.com/doc/relnotes/mysql/8.4/en/
- Tailwind CSS — dokumentasi resmi: https://tailwindcss.com/docs

---

## Lampiran A — Contoh Struktur Navigasi

```text
CAPSGO
│
├── WEBSITE PUBLIK
│   ├── Beranda
│   ├── Profil Sekolah
│   ├── Struktur Organisasi
│   ├── Guru
│   ├── Fasilitas
│   ├── Ekstrakurikuler
│   ├── Dokumentasi Kegiatan
│   ├── Prestasi Siswa
│   └── Kontak
│
├── PORTAL GURU (LOGIN)
│   ├── Dashboard
│   ├── Jadwal Mengajar
│   ├── Kelas Saya
│   ├── Daftar Siswa
│   ├── Absensi (jika disetujui)
│   └── Dokumen (jika diaktifkan)
│
└── PORTAL OPERATOR (LOGIN)
    ├── Dashboard
    ├── Profil Sekolah
    ├── Data Guru
    ├── Fasilitas
    ├── Ekstrakurikuler
    ├── Dokumentasi Kegiatan
    ├── Prestasi Siswa
    ├── Data Absensi
    ├── Koperasi
    ├── Arsip Dokumen
    └── Akun Guru
```

## Lampiran B — Istilah yang Digunakan

| Istilah | Arti dalam dokumen |
| :--- | :--- |
| Website publik | Bagian website yang dapat dibuka tanpa login |
| Portal internal | Bagian website yang hanya dapat dibuka pengguna yang sudah login |
| Guru | Role akun untuk tenaga pendidik yang menggunakan fitur Guru |
| Operator | Role akun untuk pengelola data dan konten website |
| Pengunjung | Orang yang membuka halaman publik tanpa akun |
| Draf | Konten yang tersimpan tetapi belum tampil di website publik |
| Terbit | Konten yang disetujui untuk tampil di website publik |
| Arsip | Konten atau dokumen yang tidak lagi aktif tetapi masih disimpan |
| Folder induk | Folder utama yang dapat memiliki subfolder |
| Subfolder | Folder yang berada di dalam folder lain |
| Hak akses | Izin untuk membuka atau mengubah fitur dan data tertentu |
| Soft delete | Penandaan data terhapus tanpa langsung menghilangkan catatan dari database |
| MVP | Versi awal dengan fitur inti yang disepakati untuk diselesaikan terlebih dahulu |

## Lampiran C — Catatan Revisi Dokumen

| Versi | Perubahan |
| :--- | :--- |
| v1.0 | Penyusunan PRD awal CAPSGO dalam bahasa Indonesia dengan struktur yang mengikuti contoh PRD Tugasku; melengkapi visi, ruang lingkup, teknologi, arsitektur, fitur, hak akses, rancangan database, route, UI/UX, pengujian, pembagian tiga anggota, tahapan, risiko, dan keputusan yang perlu dikonfirmasi. |

---

**Akhir dokumen PRD CAPSGO v1.1.**
---

## Lampiran D — Spesifikasi Formulir dan Validasi per Modul

Lampiran ini menerjemahkan deskripsi fitur menjadi acuan form yang bisa langsung dipakai saat membuat halaman React, Form Request Laravel, dan migration. Kolom yang bersifat **[Perlu Konfirmasi]** tidak boleh dijadikan kewajiban sebelum pihak sekolah menyetujuinya.

### D.1 Konvensi Validasi Umum

| Aturan | Ketentuan |
| :--- | :--- |
| Kolom wajib | Diberi tanda `*` pada antarmuka dan diperiksa kembali di backend. |
| Teks | Dibatasi panjang karakter yang wajar; teks deskripsi menggunakan `textarea`. |
| Tanggal | Disimpan dalam format tanggal database dan ditampilkan dengan format Indonesia. Zona waktu aplikasi ditetapkan konsisten, disarankan `Asia/Makassar` untuk operasional sekolah di Samarinda setelah dikonfirmasi. |
| Foto | Validasi MIME type, ekstensi, dan ukuran di backend. Jangan hanya memeriksa ekstensi nama file. |
| Penghapusan | Tindakan hapus memerlukan dialog konfirmasi; data utama menggunakan soft delete jika masih mungkin dibutuhkan. |
| Status publikasi | Nilai yang diizinkan: `draft`, `published`, dan `archived`. Label antarmuka: Draf, Terbit, dan Arsip. |
| Pesan validasi | Menggunakan bahasa Indonesia, menjelaskan kolom yang salah, dan tidak menampilkan pesan teknis mentah. |
| Pengiriman ganda | Tombol Simpan dinonaktifkan selama permintaan sedang diproses. |

**Catatan zona waktu:** Samarinda berada di WITA. Pengaturan zona waktu perlu dipastikan pada konfigurasi aplikasi agar tanggal kegiatan, absensi, dan waktu unggah tidak bergeser. Jika tim menggunakan zona waktu server berbeda, simpan waktu secara konsisten dan lakukan konversi saat ditampilkan.

### D.2 Form Profil Sekolah

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `school_name` | Ya | Nama resmi sekolah sesuai dokumen dari pihak sekolah. |
| `short_description` | Ya | Ringkasan singkat untuk beranda; batas panjang ditetapkan tim. |
| `history` | Tidak | Sejarah sekolah; hanya diisi dari sumber resmi. |
| `vision` | Tidak | Visi sekolah sesuai dokumen resmi. |
| `mission` | Tidak | Misi sekolah sesuai dokumen resmi. |
| `address` | Tidak | Alamat yang telah diverifikasi. |
| `public_phone` | Tidak | Nomor kontak resmi yang boleh ditampilkan. |
| `public_email` | Tidak | Email resmi yang boleh ditampilkan. |
| `logo_path` | Tidak | Berkas logo yang diizinkan sekolah. |
| `cover_path` | Tidak | Gambar sampul yang diizinkan sekolah. |

**Kriteria penerimaan:** Operator dapat menyimpan perubahan; data terbaru muncul pada halaman publik; kolom yang kosong tidak menyebabkan layout rusak; tidak ada data sekolah yang dikarang sebagai data resmi.

### D.3 Form Data Guru

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `full_name` | Ya | Nama sesuai data resmi sekolah. |
| `position` | Tidak | Jabatan/tugas yang boleh dicatat atau dipublikasikan. |
| `photo_path` | Tidak | Foto dengan izin penggunaan. |
| `public_bio` | Tidak | Deskripsi profesional singkat; tidak berisi data pribadi. |
| `is_published` | Ya | Menentukan apakah profil boleh tampil pada halaman publik. |
| `is_active` | Ya | Menentukan apakah profil masih aktif di data sekolah. |
| `user_id` | Tidak | Relasi ke akun Guru; hanya diisi jika Guru tersebut menggunakan portal. |

Pembuatan profil Guru tidak otomatis membuat akun login. Operator harus menjalankan proses pembuatan akun secara terpisah agar data profil dan hak akses tidak tercampur.

### D.4 Form Fasilitas

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `name` | Ya | Nama fasilitas. |
| `category` | Tidak | Kategori seperti ruang belajar, olahraga, sanitasi, atau kategori lain yang disepakati. |
| `description` | Tidak | Penjelasan singkat fasilitas. |
| `image_path` | Tidak | Foto fasilitas. |
| `publication_status` | Ya | `draft`, `published`, atau `archived`. |

**Kriteria penerimaan:** data fasilitas dapat ditambah, dilihat, diubah, diarsipkan; halaman publik hanya menampilkan data berstatus Terbit.

### D.5 Form Ekstrakurikuler

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `name` | Ya | Nama ekstrakurikuler. |
| `description` | Tidak | Penjelasan kegiatan. |
| `schedule_text` | Tidak | Jadwal dalam bentuk teks jika diberikan sekolah. |
| `supervisor_name` | Tidak | Nama pembina jika boleh dipublikasikan. |
| `image_path` | Tidak | Foto kegiatan/logo yang diizinkan. |
| `publication_status` | Ya | Status publikasi. |

Jadwal dan nama pembina tidak boleh diisi berdasarkan perkiraan developer.

### D.6 Form Dokumentasi Kegiatan

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `title` | Ya | Judul kegiatan. |
| `event_date` | Ya | Tanggal kegiatan yang sebenarnya. |
| `category` | Tidak | Kategori yang disepakati. |
| `description` | Tidak | Keterangan kegiatan. |
| `cover_image_path` | Tidak | Gambar utama kegiatan. |
| `photos[]` | Tidak | Foto tambahan; setiap foto dapat memiliki keterangan dan urutan. |
| `publication_status` | Ya | Status publikasi. |

**Kriteria penerimaan:** Operator dapat menambahkan lebih dari satu foto; foto dapat diurutkan; foto yang belum mendapat izin tidak boleh diterbitkan; halaman detail kegiatan dapat dibuka dari halaman daftar.

### D.7 Form Prestasi Siswa

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `title` | Ya | Nama prestasi atau kompetisi. |
| `category` | Tidak | Kategori prestasi. |
| `level` | Tidak | Tingkat lomba jika diketahui dan diverifikasi. |
| `achievement_date` | Tidak | Tanggal atau periode prestasi. |
| `description` | Tidak | Keterangan tambahan. |
| `student_display_name` | Tidak | Nama tampilan yang disetujui untuk publikasi. |
| `image_path` | Tidak | Foto/piagam yang boleh ditampilkan. |
| `publication_status` | Ya | Status publikasi. |
| `verified_by` | Tidak | Pengguna yang melakukan verifikasi internal jika alur ini digunakan. |

### D.8 Form Akun Guru

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `name` | Ya | Nama tampilan akun. |
| `username` atau `email` | Ya, salah satu | Identitas login unik sesuai kebijakan sekolah. Pilihan login harus seragam untuk seluruh akun. |
| `password` | Ya saat pembuatan | Diproses dengan hash Laravel; tidak pernah ditampilkan kembali. |
| `role` | Otomatis | Selalu `guru` untuk form ini; pengguna tidak boleh memilih role lain. |
| `is_active` | Ya | Default aktif setelah akun disetujui Operator. |
| `teacher_profile_id` | Tidak | Relasi ke profil Guru yang bersangkutan. |

**Kriteria penerimaan:** identitas login tidak boleh duplikat; akun nonaktif tidak bisa login; kata sandi tidak muncul dalam tabel; reset kata sandi mengikuti prosedur yang aman.

### D.9 Form Folder dan Dokumen

**Folder:**

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `name` | Ya | Nama folder; tidak boleh hanya berisi spasi. |
| `parent_id` | Tidak | ID folder induk; `null` berarti folder utama. Folder tidak boleh dipindahkan ke dirinya sendiri atau turunannya. |
| `description` | Tidak | Keterangan folder. |

**Dokumen:**

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `file` | Ya saat upload | Berkas yang lolos validasi tipe dan ukuran. |
| `folder_id` | Tidak | Folder tujuan yang masih aktif. |
| `display_name` | Tidak | Nama tampilan; jika kosong gunakan nama file asli. |
| `description` | Tidak | Keterangan dokumen. |
| `visibility` | Ya | Default `internal`; status `public` hanya untuk berkas yang memang ditujukan sebagai unduhan publik. |
| `document_user_access` | Kondisional | Pengguna yang diberi akses khusus, jika fitur berbagi dokumen diaktifkan. |

**Aturan tambahan:**
- Cegah folder bersarang membentuk siklus.
- Saat folder dipindahkan, pastikan pengguna memiliki izin untuk folder asal dan tujuan.
- Saat folder dihapus, sistem harus memeriksa apakah ada subfolder atau dokumen di dalamnya. Tindakan dapat ditolak, memindahkan isinya, atau mengarsipkan seluruh isinya sesuai keputusan tim.
- Jangan pernah mengandalkan `storage_path` yang dikirim browser; server menentukan lokasi penyimpanan.
- Unduhan berkas privat harus melewati pemeriksaan akses di backend.

### D.10 Form Jadwal Mengajar

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `teaching_assignment_id` | Ya | Penugasan Guru, kelas, dan mata pelajaran yang valid. |
| `day_of_week` | Ya | Hari yang digunakan sekolah. Simpan sebagai kode konsisten dan tampilkan nama hari dalam bahasa Indonesia. |
| `start_time` | Ya | Waktu mulai. |
| `end_time` | Ya | Harus lebih akhir dari waktu mulai. |
| `room` | Tidak | Ruangan jika digunakan. |
| `academic_year` | Ya | Tahun ajaran yang ditetapkan sekolah. |

**Kriteria penerimaan:** jadwal Guru ditampilkan berdasarkan penugasan miliknya; urutan hari dan jam konsisten; jadwal kelas yang tidak ditugaskan tidak dapat diakses Guru.

### D.11 Form Absensi — Modul Bersyarat

| Field | Wajib? | Aturan / Catatan |
| :--- | :---: | :--- |
| `class_id` | Ya | Kelas yang dapat diakses Guru. |
| `attendance_date` | Ya | Tanggal pencatatan. |
| `session_label` | Kondisional | Dibutuhkan jika sekolah mencatat absensi per jam/pertemuan. |
| `student_id` | Ya per baris | Siswa yang terdaftar aktif di kelas tersebut. |
| `status` | Ya per baris | Pilihan awal: `Hadir`, `Izin`, `Sakit`, `Alpa`; final setelah konfirmasi sekolah. |
| `notes` | Tidak | Keterangan tambahan sesuai kebijakan. |

**Validasi wajib jika modul diaktifkan:**
- Guru hanya dapat mencatat absensi pada kelas yang menjadi penugasannya.
- Satu siswa hanya memiliki satu status dalam satu sesi absensi.
- Siswa harus terdaftar aktif pada kelas yang dipilih.
- Perubahan setelah penyimpanan harus mengikuti kebijakan sekolah dan tercatat jika audit diaktifkan.

### D.12 Data Koperasi — Modul Bersyarat

Jangan membuat transaksi atau perhitungan keuangan sebelum sekolah menjelaskan proses yang berjalan. Untuk kebutuhan informasi umum, cukup gunakan judul, deskripsi, kontak, gambar, dan status publikasi. Jika sekolah meminta daftar barang, persediaan, transaksi, atau laporan, lakukan analisis kebutuhan terpisah dan revisi PRD sebelum coding.

---

## Lampiran E — Kontrak Integrasi Antar Modul

Lampiran ini mencegah setiap anggota membuat format data, komponen, dan proses yang berbeda.

### E.1 Komponen Data Bersama dari Laravel ke Inertia

Halaman internal sebaiknya menerima properti bersama dengan bentuk konsisten, misalnya:

```ts
 type AuthUser = {
   id: number;
   name: string;
   role: 'guru' | 'operator';
 };

type SharedPageProps = {
  auth: {
    user: AuthUser | null;
  };
  flash: {
    success?: string;
    error?: string;
  };
};
```

Properti tersebut merupakan contoh kontrak frontend. Implementasi aktual mengikuti cara serialisasi Inertia dan tipe yang disiapkan proyek.

### E.2 Konvensi Halaman React

| Area | Nama Halaman yang Disarankan | Layout |
| :--- | :--- | :--- |
| Beranda | `Public/Home` | `PublicLayout` |
| Profil sekolah | `Public/SchoolProfile` | `PublicLayout` |
| Daftar fasilitas | `Public/Facilities/Index` | `PublicLayout` |
| Daftar kegiatan | `Public/Events/Index` | `PublicLayout` |
| Detail kegiatan | `Public/Events/Show` | `PublicLayout` |
| Login | `Auth/Login` | `AuthLayout` |
| Dashboard Guru | `Guru/Dashboard` | `GuruLayout` |
| Jadwal Guru | `Guru/Schedules/Index` | `GuruLayout` |
| Kelas Guru | `Guru/Classes/Index` | `GuruLayout` |
| Dashboard Operator | `Operator/Dashboard` | `OperatorLayout` |
| Daftar dokumen | `Operator/Documents/Index` | `OperatorLayout` |
| Daftar folder | `Operator/Folders/Index` | `OperatorLayout` |

Nama halaman lain mengikuti pola yang sama dan harus disepakati sebelum setiap anggota mulai menghubungkan controller dengan React.

### E.3 Standar Proses CRUD

Untuk setiap modul yang memiliki data kelola, implementasikan proses berikut sesuai kebutuhan:

| Proses | Perilaku yang Diharapkan |
| :--- | :--- |
| Index | Menampilkan daftar data dengan pagination dan pencarian/filter yang relevan. |
| Create | Menampilkan form data baru kepada role yang diizinkan. |
| Store | Memvalidasi input di backend, menyimpan data, lalu kembali ke daftar dengan pesan berhasil. |
| Show | Menampilkan detail jika modul membutuhkan halaman detail. |
| Edit | Menampilkan data saat ini untuk diperbarui. |
| Update | Memvalidasi perubahan, memperbarui data, dan memberi pesan berhasil. |
| Delete/Archive | Menjalankan penghapusan/arsip setelah konfirmasi dan pemeriksaan izin. |

Tidak semua modul wajib memiliki seluruh operasi. Misalnya, profil sekolah dapat menggunakan satu halaman edit dan tidak memerlukan daftar banyak profil.

### E.4 Aturan Pengiriman Form

- Form React/Inertia menggunakan satu pola pengiriman yang disepakati tim.
- Tombol submit menampilkan status memproses dan tidak dapat ditekan berulang.
- Kesalahan validasi backend dikembalikan ke form sehingga pesan muncul pada kolom yang tepat.
- Setelah sukses, sistem memberi notifikasi dan mengarahkan pengguna ke halaman yang sesuai.
- Bila terjadi kesalahan, isian penting pengguna dipertahankan sejauh memungkinkan.
- Penghapusan memakai dialog konfirmasi.

### E.5 Kontrak Pembagian File

| Area/File | Pemilik Utama | Aturan Integrasi |
| :--- | :--- | :--- |
| `routes/web.php` | Anggota 1 sebagai integrator | Anggota lain mengusulkan route sesuai namespace; penggabungan dilakukan terkoordinasi. |
| Model dan migration autentikasi | Anggota 1 | Perubahan role dan akun harus dibahas bersama. |
| Model dan migration konten publik | Anggota 2 | Nama tabel/kolom diumumkan sebelum halaman dibuat. |
| Model dan migration operasional/dokumen | Anggota 3 | Periksa relasi dan policy bersama Anggota 1. |
| `resources/js/Components` | Anggota 1 sebagai penjaga komponen bersama | Anggota lain boleh menambah komponen fitur pada folder masing-masing. |
| Layout publik | Anggota 2 | Dipakai oleh seluruh halaman publik. |
| Layout Guru dan Operator | Anggota 1 membuat kerangka, Anggota 3 mengembangkan menu internal | Struktur sidebar tidak boleh dibuat ulang per halaman. |
| `package.json` dan `composer.json` | Anggota 1 mengelola integrasi | Dependensi baru harus disampaikan sebelum ditambahkan. |

---

## Lampiran F — Checklist Penerimaan per Anggota

### F.1 Anggota 1 — Fondasi, Login, dan Hak Akses

| Kode | Pemeriksaan | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| A1-01 | Proyek dapat diinisialisasi dari petunjuk README | Anggota lain dapat menjalankan aplikasi pada database lokal baru. |
| A1-02 | Migration inti dijalankan | Seluruh tabel inti terbentuk tanpa error. |
| A1-03 | Akun Guru login | Guru diarahkan ke Dashboard Guru. |
| A1-04 | Akun Operator login | Operator diarahkan ke Dashboard Operator. |
| A1-05 | Password salah | Login ditolak dengan pesan umum yang aman. |
| A1-06 | Akun tidak aktif | Login ditolak. |
| A1-07 | Pengunjung membuka route internal | Diarahkan ke halaman masuk. |
| A1-08 | Guru membuka route Operator | Akses ditolak di backend. |
| A1-09 | Tidak ada role Admin | Nilai role hanya Guru atau Operator. |
| A1-10 | Logout | Sesi berakhir dan route internal memerlukan login kembali. |

### F.2 Anggota 2 — Website Publik dan CMS Konten

| Kode | Pemeriksaan | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| A2-01 | Buka beranda tanpa login | Beranda tampil. |
| A2-02 | Buka profil sekolah | Data profil yang tersedia tampil. |
| A2-03 | Buka daftar fasilitas | Fasilitas berstatus Terbit tampil. |
| A2-04 | Buka daftar ekstrakurikuler | Data terbit tampil sesuai kategori. |
| A2-05 | Buka daftar dan detail kegiatan | Daftar dan detail terhubung dengan benar. |
| A2-06 | Buka halaman prestasi | Hanya data yang boleh dipublikasikan yang tampil. |
| A2-07 | Simpan konten sebagai Draf | Konten tidak terlihat oleh pengunjung. |
| A2-08 | Terbitkan konten | Konten muncul di halaman publik. |
| A2-09 | Ubah konten | Perubahan tersimpan dan ditampilkan. |
| A2-10 | Buka website di layar ponsel | Tidak ada elemen utama yang terpotong atau saling menimpa. |

### F.3 Anggota 3 — Portal Guru, Data Operasional, dan Dokumen

| Kode | Pemeriksaan | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| A3-01 | Guru membuka dashboard | Hanya ringkasan milik Guru yang tampil. |
| A3-02 | Guru membuka jadwal | Jadwal sesuai penugasan tampil dan terurut. |
| A3-03 | Guru membuka daftar kelas | Hanya kelas yang ditugaskan tampil. |
| A3-04 | Guru membuka kelas lain melalui URL | Akses ditolak oleh backend. |
| A3-05 | Operator membuat folder | Folder tampil pada daftar folder. |
| A3-06 | Operator membuat subfolder | Relasi folder induk dan subfolder benar. |
| A3-07 | Operator mengunggah file valid | File dan metadata tersimpan. |
| A3-08 | Operator mengunggah file tidak valid | Server menolak dan memberi pesan yang jelas. |
| A3-09 | Pindah folder | File muncul pada lokasi baru tanpa menggandakan metadata. |
| A3-10 | Unduh dokumen privat tanpa izin | Server menolak unduhan. |
| A3-11 | Pencarian dokumen | Hasil hanya berisi dokumen yang boleh diakses. |
| A3-12 | Modul absensi/koperasi | Hanya diuji dan dinyatakan selesai jika telah disetujui sekolah. |

### F.4 Kriteria Selesai Bersama

Satu modul dianggap selesai jika seluruh kriteria berikut terpenuhi:
- [ ] Migration dan relasi database tersedia.
- [ ] Model dan relasi diuji.
- [ ] Route hanya dapat diakses role yang benar.
- [ ] Policy memeriksa kepemilikan data bila relevan.
- [ ] Validasi backend tersedia.
- [ ] UI memiliki keadaan memuat, berhasil, kosong, dan gagal.
- [ ] Semua tombol/tautan yang ditampilkan bekerja sesuai fungsinya.
- [ ] Minimal satu pengujian berhasil untuk alur utama dan satu pengujian untuk kondisi gagal/akses ditolak.
- [ ] Tampilan diuji pada ponsel dan desktop.
- [ ] Dokumentasi fitur diperbarui.

---

## Lampiran G — Rencana Pengembangan, Integrasi, dan Demo

### G.1 Urutan Integrasi yang Disarankan

| Tahap | PIC | Hasil yang Harus Ada Sebelum Tahap Berikutnya |
| :---: | :--- | :--- |
| 1 | Anggota 1 | Repository, aplikasi dasar, database, login, role, dan kerangka layout tersedia. |
| 2 | Anggota 2 | Layout publik dan satu alur CRUD konten selesai sebagai contoh integrasi. |
| 3 | Anggota 3 | Dashboard Guru, jadwal/kelas, dan struktur folder dokumen terhubung dengan database. |
| 4 | Seluruh anggota | Modul lain dikembangkan berdasarkan pola integrasi yang telah berjalan. |
| 5 | Anggota 1 sebagai koordinator | Semua branch digabung, route dan migration diperiksa, konflik diselesaikan. |
| 6 | Seluruh anggota | Uji lintas role, perbaikan bug, uji sekolah, dokumentasi, dan persiapan penyerahan. |

### G.2 Rencana Kerja Berbasis Milestone

| Milestone | Fokus Pekerjaan | Indikator Selesai |
| :--- | :--- | :--- |
| M1 — Persiapan | Konfirmasi kebutuhan, teknologi, repo, dan desain dasar | PRD, struktur data awal, dan layout disepakati. |
| M2 — Fondasi | Login, role, database, layout, dan routing | Pengguna dapat masuk ke portal sesuai role. |
| M3 — Website publik | Halaman publik dan pengelolaan konten | Konten dapat dikelola Operator dan tampil di halaman publik. |
| M4 — Portal internal | Dashboard Guru, jadwal, kelas, dan arsip | Guru mengakses informasi tugasnya; Operator mengelola arsip. |
| M5 — Modul tambahan | Absensi dan koperasi jika disetujui | Modul tambahan mengikuti aturan sekolah yang sudah disepakati. |
| M6 — Pengujian | Uji fungsional, hak akses, responsif, dan pengguna | Temuan kritis ditutup atau dicatat sebagai batasan. |
| M7 — Penyerahan | Dokumentasi, backup, akun, dan deployment | Website dapat dijalankan dan dikelola pihak sekolah. |

Tanggal setiap milestone diisi setelah jadwal tim dan sekolah ditetapkan; dokumen ini tidak menetapkan tanggal yang belum disepakati.

### G.3 Skenario Demo Website (Sekitar 5–7 Menit)

1. Buka halaman publik tanpa login dan tunjukkan navigasi utama.
2. Buka halaman profil, fasilitas, ekstrakurikuler, kegiatan, dan prestasi.
3. Login sebagai Operator dan tunjukkan dashboard.
4. Tambahkan satu konten contoh sebagai Draf dan buktikan bahwa konten belum muncul di halaman publik.
5. Ubah status konten menjadi Terbit dan tunjukkan bahwa konten muncul pada halaman publik.
6. Tunjukkan pengelolaan folder, unggah dokumen uji, pencarian, dan unduh dokumen.
7. Logout, kemudian login sebagai Guru.
8. Tunjukkan jadwal dan kelas yang menjadi penugasan Guru.
9. Demonstrasikan bahwa Guru tidak dapat membuka halaman Operator atau kelas di luar penugasannya.
10. Tunjukkan hasil pengujian dan dokumentasi README.

Gunakan data demonstrasi, bukan data pribadi siswa/guru yang belum mendapat izin. Langkah absensi hanya dilakukan apabila modul telah disetujui sekolah.

---

## Lampiran H — Catatan Pemilihan dan Pemeriksaan Teknologi

### H.1 Stack yang Direkomendasikan

Stack utama tetap: **Laravel 13 + PHP 8.3 atau lebih baru + React 19 + TypeScript + Inertia.js 3 + Tailwind CSS 4 + shadcn/ui + MySQL 8.4 LTS**.

Dokumentasi resmi Laravel 13 menyediakan starter kit React yang sudah menggunakan React 19, TypeScript, Tailwind, shadcn/ui, dan Inertia 3. Karena itu, tim disarankan memulai dari starter kit resmi agar fondasi autentikasi, konfigurasi frontend, dan struktur proyek tidak disusun ulang secara manual. Laravel 13 memerlukan PHP minimal 8.3. MySQL 8.4 termasuk jalur LTS yang ditujukan untuk kebutuhan stabilitas dan dukungan jangka panjang.

### H.2 Pemeriksaan Sebelum Inisialisasi

- [ ] Pastikan perangkat setiap anggota menggunakan versi PHP yang kompatibel.
- [ ] Pastikan Composer dan Node.js/npm terpasang.
- [ ] Pastikan MySQL dapat dijalankan pada lingkungan pengembangan.
- [ ] Buat aplikasi menggunakan starter kit React resmi Laravel 13.
- [ ] Pilih autentikasi yang diperlukan; pendaftaran publik harus dimatikan atau tidak disediakan untuk CAPSGO.
- [ ] Jalankan migration awal dan pastikan semua anggota mendapat struktur yang sama.
- [ ] Catat versi paket yang terpasang dalam `composer.lock` dan `package-lock.json`.
- [ ] Jangan memperbarui dependensi mayor di tengah pengembangan tanpa persetujuan tim dan pengujian ulang.

### H.3 Referensi Resmi Teknologi

1. Laravel 13 Starter Kits (termasuk React, TypeScript, Inertia 3, Tailwind 4, dan shadcn/ui): https://laravel.com/docs/13.x/starter-kits
2. Laravel 13 Deployment dan persyaratan server (PHP minimal 8.3): https://laravel.com/docs/13.x/deployment
3. Laravel 13 Release Notes: https://laravel.com/docs/13.x/releases
4. MySQL 8.4 Release Notes: https://dev.mysql.com/doc/relnotes/mysql/8.4/en/
5. MySQL LTS and Innovation Releases: https://dev.mysql.com/doc/refman/8.4/en/mysql-releases.html

---

## Catatan Revisi v1.1

- Menambahkan spesifikasi field dan validasi form untuk modul inti.
- Menambahkan aturan khusus pengelolaan folder bersarang dan dokumen privat.
- Menambahkan kontrak integrasi antaranggota untuk data Inertia, penamaan halaman, CRUD, dan kepemilikan file.
- Menambahkan checklist penerimaan per anggota dan kriteria selesai bersama.
- Menambahkan urutan integrasi, milestone, dan skenario demo.
- Memeriksa kembali rekomendasi stack melalui dokumentasi resmi Laravel 13 dan MySQL 8.4.
- Mempertahankan penanda kebutuhan yang belum pasti agar absensi dan koperasi tidak dianggap sebagai fitur final sebelum dikonfirmasi.

**Akhir dokumen PRD CAPSGO v1.1.**
