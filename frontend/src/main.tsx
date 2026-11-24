import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Import Pages
import Home from './Pages/Public/Home';
import Profile from './Pages/Public/Profile';
import Organization from './Pages/Public/Organization';
import Teachers from './Pages/Public/Teachers';
import Facilities from './Pages/Public/Facilities';
import Extracurriculars from './Pages/Public/Extracurriculars';
import EventsIndex from './Pages/Public/Events/Index';
import EventsShow from './Pages/Public/Events/Show';
import Achievements from './Pages/Public/Achievements';
import Contact from './Pages/Public/Contact';
import OperatorFacilities from './Pages/Operator/Content/Facilities/Index';
import OperatorProfile from './Pages/Operator/Content/SchoolProfile/Index';
import OperatorEvents from './Pages/Operator/Content/SchoolEvents/Index';
import OperatorAchievements from './Pages/Operator/Content/Achievements/Index';

// Mock data preview
const mockProfile = {
  id: 1,
  school_name: 'SDN 003 Samarinda',
  short_description: 'Mewujudkan lingkungan belajar yang religius, cerdas, berkarakter mulia, serta membekali generasi masa depan dengan kecakapan abad ke-21.',
  history: 'SDN 003 Samarinda didirikan sebagai wadah pendidikan dasar bagi masyarakat Kota Samarinda. Seiring perkembangannya, sekolah terus meningkatkan sarana dan kualitas pembelajaran hingga meraih berbagai prestasi di tingkat kota dan provinsi.',
  vision: 'Terwujudnya peserta didik yang beriman dan bertakwa, cerdas, mandiri, berkarakter mulia, berwawasan lingkungan, serta unggul dalam prestasi.',
  mission: "1. Menumbuhkan penghayatan terhadap ajaran agama dan budaya bangsa.\n2. Melaksanakan proses pembelajaran yang aktif, kreatif, inovatif, dan menyenangkan.\n3. Mengembangkan potensi bakat, minat, dan kreativitas siswa secara optimal.\n4. Menumbuhkan kepedulian terhadap kelestarian lingkungan dan budaya hidup sehat.",
  address: 'Jl. Muara Samarinda, Kota Samarinda, Kalimantan Timur 75111',
  public_phone: '(0541) 1234567',
  public_email: 'sdn003samarinda@sekolah.id',
};

const mockFacilities = [
  { id: 1, name: 'Perpustakaan Ramah Anak "Bina Ilmu"', category: 'Sumber Belajar', description: 'Dilengkapi ribuan judul buku fiksi, ensiklopedia, dan area membaca ber-AC.', publication_status: 'terbit' as const },
  { id: 2, name: 'Laboratorium Komputer & Multimedia', category: 'Teknologi Informasi', description: 'Menyediakan 30 unit komputer modern untuk literasi digital dan ANBK.', publication_status: 'terbit' as const },
  { id: 3, name: 'Lapangan Olahraga Serbaguna', category: 'Olahraga', description: 'Lapangan serbaguna untuk upacara, senam pagi, basket, dan futsal.', publication_status: 'terbit' as const },
  { id: 4, name: 'Ruang UKS & Konseling Ramah Anak', category: 'Kesehatan', description: 'Fasilitas pertolongan pertama pada kecelakaan dan pemeriksaan kesehatan berkala.', publication_status: 'terbit' as const },
];

const mockExtracurriculars = [
  { id: 1, name: 'Gerakan Pramuka (Siaga & Penggalang)', description: 'Membentuk kemandirian, kepemimpinan, kepedulian sosial, dan kecintaan pada alam.', schedule_text: 'Jumat, 14.30 - 16.30 WITA', supervisor_name: 'Kak Rian & Kak Dewi', publication_status: 'terbit' as const },
  { id: 2, name: 'Seni Tari Tradisional Kaltim', description: 'Melestarikan seni budaya daerah melalui tarian khas Kalimantan Timur.', schedule_text: 'Sabtu, 08.00 - 10.00 WITA', supervisor_name: 'Ibu Siti Rahmawati', publication_status: 'terbit' as const },
  { id: 3, name: 'Drumband Gema Nada 003', description: 'Mengasah musikalitas, kedisiplinan baris-berbaris, dan kerja sama tim.', schedule_text: 'Rabu & Sabtu sore', supervisor_name: 'Bpk. Bambang Sudarsono', publication_status: 'terbit' as const },
];

const mockEvents = [
  { id: 1, title: 'Upacara Peringatan Hari Pendidikan Nasional dan Pentas Budaya', event_date: '2026-05-02', category: 'Peringatan Hari Besar', description: 'Seluruh warga SDN 003 Samarinda memperingati Hardiknas mengenakan pakaian adat Nusantara.', publication_status: 'terbit' as const },
  { id: 2, title: 'Gerakan Bersih Lingkungan Sekolah dan Pilah Sampah', event_date: '2026-04-18', category: 'Adiwiyata', description: 'Kerja bakti pembersihan lingkungan dan edukasi pilah sampah bersama komite sekolah.', publication_status: 'terbit' as const },
];

const mockAchievements = [
  { id: 1, title: 'Juara 1 Lomba Cerdas Cermat Sains SD', student_display_name: 'Tim Sains SDN 003 Samarinda', category: 'Akademik', level: 'Kota', achievement_date: '2026-03-15', description: 'Meraih skor tertinggi se-Kota Samarinda.', publication_status: 'terbit' as const },
  { id: 2, title: 'Juara 2 Lomba Tari Tradisional Nusantara', student_display_name: 'Grup Tari Cendrawasih Cilik', category: 'Seni', level: 'Provinsi', achievement_date: '2026-02-20', description: 'Penampilan terbaik pada festival seni pelajar se-Kaltim.', publication_status: 'terbit' as const },
];

const mockTeachers = [
  { id: 1, full_name: 'Drs. H. Pendidik Utama, M.Pd.', position: 'Kepala Sekolah', public_bio: 'Berpengalaman memimpin pendidikan dasar selama lebih dari 20 tahun.', is_published: true, is_active: true },
  { id: 2, full_name: 'Siti Rahmawati, S.Pd.', position: 'Guru Kelas 1', public_bio: 'Fokus pada pondasi literasi dan numerasi anak usia dini.', is_published: true, is_active: true },
  { id: 3, full_name: 'Bambang Sudarsono, S.Pd.', position: 'Guru Kelas 2', public_bio: 'Metode belajar interaktif dan pendidikan karakter disiplin.', is_published: true, is_active: true },
  { id: 4, full_name: 'Nurul Hidayah, S.Pd.I.', position: 'Guru Pendidikan Agama Islam', public_bio: 'Pembiasaan akhlak mulia dan ibadah harian peserta didik.', is_published: true, is_active: true },
];

function StandalonePreview() {
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'org' | 'teachers' | 'facilities' | 'extra' | 'events' | 'achieve' | 'contact' | 'op_facilities' | 'op_profile' | 'op_events' | 'op_achieve'>('home');

  return (
    <div>
      {/* Top Floating Preview Navigator */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-amber-300">Mode Preview Anggota 2:</span>
          <span className="text-slate-300">Pilih Halaman:</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <button onClick={() => setActiveTab('home')} className={`px-2.5 py-1 rounded ${activeTab === 'home' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Beranda</button>
          <button onClick={() => setActiveTab('profile')} className={`px-2.5 py-1 rounded ${activeTab === 'profile' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Profil</button>
          <button onClick={() => setActiveTab('org')} className={`px-2.5 py-1 rounded ${activeTab === 'org' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Organisasi</button>
          <button onClick={() => setActiveTab('teachers')} className={`px-2.5 py-1 rounded ${activeTab === 'teachers' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Guru</button>
          <button onClick={() => setActiveTab('facilities')} className={`px-2.5 py-1 rounded ${activeTab === 'facilities' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Fasilitas</button>
          <button onClick={() => setActiveTab('extra')} className={`px-2.5 py-1 rounded ${activeTab === 'extra' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Ekstrakurikuler</button>
          <button onClick={() => setActiveTab('events')} className={`px-2.5 py-1 rounded ${activeTab === 'events' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Kegiatan</button>
          <button onClick={() => setActiveTab('achieve')} className={`px-2.5 py-1 rounded ${activeTab === 'achieve' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Prestasi</button>
          <button onClick={() => setActiveTab('contact')} className={`px-2.5 py-1 rounded ${activeTab === 'contact' ? 'bg-blue-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>Kontak</button>
          <span className="text-slate-500 mx-1">|</span>
          <button onClick={() => setActiveTab('op_profile')} className={`px-2.5 py-1 rounded ${activeTab === 'op_profile' ? 'bg-indigo-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>[Op] Profil</button>
          <button onClick={() => setActiveTab('op_facilities')} className={`px-2.5 py-1 rounded ${activeTab === 'op_facilities' ? 'bg-indigo-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>[Op] Fasilitas</button>
          <button onClick={() => setActiveTab('op_events')} className={`px-2.5 py-1 rounded ${activeTab === 'op_events' ? 'bg-indigo-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>[Op] Kegiatan</button>
          <button onClick={() => setActiveTab('op_achieve')} className={`px-2.5 py-1 rounded ${activeTab === 'op_achieve' ? 'bg-indigo-600 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}>[Op] Prestasi</button>
        </div>
      </div>

      {/* Render Component */}
      {activeTab === 'home' && (
        <Home
          profile={mockProfile as any}
          featuredFacilities={mockFacilities as any}
          extracurriculars={mockExtracurriculars as any}
          recentEvents={mockEvents as any}
          recentAchievements={mockAchievements as any}
        />
      )}
      {activeTab === 'profile' && <Profile profile={mockProfile as any} />}
      {activeTab === 'org' && <Organization profile={mockProfile as any} />}
      {activeTab === 'teachers' && (
        <Teachers
          teachers={{ data: mockTeachers as any, current_page: 1, last_page: 1, per_page: 12, total: 4, from: 1, to: 4, links: [] }}
          filters={{}}
        />
      )}
      {activeTab === 'facilities' && (
        <Facilities
          facilities={{ data: mockFacilities as any, current_page: 1, last_page: 1, per_page: 9, total: 4, from: 1, to: 4, links: [] }}
          categories={['Sumber Belajar', 'Teknologi Informasi', 'Olahraga', 'Kesehatan']}
          filters={{}}
        />
      )}
      {activeTab === 'extra' && (
        <Extracurriculars
          extracurriculars={{ data: mockExtracurriculars as any, current_page: 1, last_page: 1, per_page: 9, total: 3, from: 1, to: 3, links: [] }}
          filters={{}}
        />
      )}
      {activeTab === 'events' && (
        <EventsIndex
          events={{ data: mockEvents as any, current_page: 1, last_page: 1, per_page: 6, total: 2, from: 1, to: 2, links: [] }}
          categories={['Peringatan Hari Besar', 'Adiwiyata']}
          filters={{}}
        />
      )}
      {activeTab === 'achieve' && (
        <Achievements
          achievements={{ data: mockAchievements as any, current_page: 1, last_page: 1, per_page: 9, total: 2, from: 1, to: 2, links: [] }}
          levels={['Kota', 'Provinsi']}
          categories={['Akademik', 'Seni']}
          filters={{}}
        />
      )}
      {activeTab === 'contact' && <Contact profile={mockProfile as any} />}
      {activeTab === 'op_profile' && <OperatorProfile profile={mockProfile as any} />}
      {activeTab === 'op_facilities' && (
        <OperatorFacilities
          facilities={{ data: mockFacilities as any, current_page: 1, last_page: 1, per_page: 10, total: 4, from: 1, to: 4, links: [] }}
          filters={{}}
        />
      )}
      {activeTab === 'op_events' && (
        <OperatorEvents
          events={{ data: mockEvents as any, current_page: 1, last_page: 1, per_page: 10, total: 2, from: 1, to: 2, links: [] }}
          filters={{}}
        />
      )}
      {activeTab === 'op_achieve' && (
        <OperatorAchievements
          achievements={{ data: mockAchievements as any, current_page: 1, last_page: 1, per_page: 10, total: 2, from: 1, to: 2, links: [] }}
          filters={{}}
        />
      )}
    </div>
  );
}

const el = document.getElementById('app');
if (el) {
  createRoot(el).render(<StandalonePreview />);
}
