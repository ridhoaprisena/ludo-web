# Ludo Master - Material Design 3 Web Game

Game Ludo modern berbasis web dengan implementasi sistem desain **Material Design 3 (MD3)**. Proyek ini menghadirkan pengalaman bermain papan klasik dengan antarmuka yang bersih, responsif, dan bebas scroll untuk Desktop, Tablet, maupun Smartphone.

Permainan mendukung mode **1 Pemain Manusia vs 3 Bot AI** dengan animasi fisika dadu 3D dan langkah bidak yang mulus.

---

## Fitur Utama

- **Material Design 3 Design System**:
  - Pilihan tema **Mode Gelap (Dark Mode)** dan **Mode Terang (Light Mode)** dengan switch langsung di menu utama dan dialog pengaturan.
  - Palet warna tonal resmi MD3 (Merah, Hijau, Kuning, Biru) dengan elevasi permukaan berbasis depth shadow.
- **Desain Layar Penuh Bebas Scroll (Zero-Scroll Fullscreen)**:
  - Tampilan terkunci presisi pada tinggi viewport (`100dvh; overflow: hidden`) di semua ukuran layar (Desktop, Tablet, dan Smartphone).
  - Papan permainan berskala dinamis dengan rasio 1:1 tanpa pernah terpotong di tepi layar.
- **Dadu Kubus 3D Interaktif**:
  - Dadu 3D dengan 6 sisi ruang nyata (*preserve-3d*).
  - Lempar dadu langsung dengan mengetuk/mengeklik kubus dadu 3D saat giliran Anda.
  - Animasi putaran fisika dinamis yang mendarat secara ortogonal sempurna.
- **Bidak Ludo 3D & Animasi Lompatan Mulus**:
  - Bidak berbentuk bidak Ludo otentik (skirt base, tapered body, gold collar ring, glossy head).
  - Animasi perpindahan kontinu antar petak dengan busur lompatan melambung (*3D hop arc*) dan efek kompresi elastis (*squash-and-stretch*) saat mendarat.
  - Bayangan bidak yang memudar saat di udara dan menajam saat mendarat.
- **Kecerdasan Buatan Bot Taktis**:
  - 3 Bot AI dengan evaluasi heuristik untuk menentukan langkah terbaik (mengutamakan eliminasi lawan, memasuki home, mengamankan zona bintang, dan keluar dari base).
  - Pilihan kecepatan langkah bot: Santai (Slow), Normal, dan Cepat (Fast).
- **Audio Sintetis Prosedural (Web Audio API)**:
  - Efek audio real-time (kocokan dadu, langkah bidak berfrekuensi nada naik, tangkapan lawan, masuk home, dan selebrasi kemenangan) dibuat secara murni menggunakan Web Audio API tanpa perlu mengunduh file MP3/WAV eksternal.
- **Efek Selebrasi Kemenangan**:
  - Selebrasi konfeti canvas partikel fisika saat ada pemain yang berhasil memasukkan seluruh bidaknya ke Home.

---

## Aturan Permainan Ludo

1. **Keluar dari Base**: Bidak di dalam base hanya dapat keluar ke kotak start jika mendapatkan angka dadu **6**.
2. **Bonus Lemparan**:
   - Mendapatkan angka **6** memberikan bonus 1x lemparan tambahan.
   - Mengeliminasi (*capture*) bidak lawan memberikan bonus 1x lemparan tambahan.
   - Memasukkan bidak ke Home memberikan bonus 1x lemparan tambahan.
3. **Batas Lemparan Angka 6**: Jika seorang pemain mendapatkan angka 6 sebanyak 3 kali berturut-turut, giliran tersebut otomatis gugur untuk mencegah monopoli permainan.
4. **Eliminasi Lawan**: Jika bidak mendarat di petak umum yang ditempati bidak lawan, bidak lawan akan tereliminasi dan kembali ke base-nya.
5. **Zona Aman (Safe Star)**: Petak dengan lambang Bintang dan petak start adalah zona aman di mana bidak terlindungi dan tidak bisa dimakan.
6. **Kemenangan**: Pemain pertama yang berhasil memindahkan keempat bidaknya ke segitiga Home di tengah papan adalah pemenangnya.

---

## Teknologi yang Digunakan

- **Frontend Core**: React 19, JavaScript (ES Modules)
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS3 dengan CSS Custom Properties (Material Design 3 Tokens & MD3 Motion Curves)
- **Grafis Papan & Bidak**: Scalable Vector Graphics (SVG)
- **Efek Audio**: Web Audio API (Synthesizer prosedural tanpa dependensi eksternal)
- **Ikonografi**: Google Fonts Material Symbols Outlined & Outfit / Plus Jakarta Sans

---

## Struktur Proyek

```text
ludo-web/
├── public/
│   └── favicon.svg           # Favicon vektor papan Ludo
├── src/
│   ├── assets/               # Aset statis
│   ├── components/
│   │   ├── Dice.jsx          # Kubus dadu 3D interaktif
│   │   ├── GameView.jsx      # Tampilan utama arena permainan
│   │   ├── LudoBoard.jsx     # Papan Ludo 15x15 SVG & bidak 3D
│   │   ├── MainMenu.jsx      # Menu utama & pemilihan warna pemain
│   │   ├── PauseDialog.jsx   # Dialog jeda permainan
│   │   ├── PlayerCard.jsx    # Kartu profil pemain & progress bidak
│   │   ├── RulesDialog.jsx   # Dialog panduan aturan bermain
│   │   ├── SettingsDialog.jsx# Dialog pengaturan (tema, kecepatan bot, audio)
│   │   ├── TopBar.jsx        # Bilah status giliran & aksi atas
│   │   └── VictoryDialog.jsx # Dialog selebrasi pemenang
│   ├── game/
│   │   └── ludoEngine.js     # Logika permainan Ludo, koordinat, & AI Bot
│   ├── utils/
│   │   ├── audio.js          # Generator efek suara Web Audio API
│   │   └── confetti.js       # Efek konfeti selebrasi canvas
│   ├── App.css               # Styling komponen & tema Material Design 3
│   ├── App.jsx               # Komponen root & manajemen status layar
│   ├── index.css             # Desain token sistem & reset CSS fullscreen
│   └── main.jsx              # Titik masuk aplikasi React
├── index.html                # Dokumen HTML utama
├── package.json              # Dependensi & skrip proyek
└── vite.config.js            # Konfigurasi Vite
```

---

## Cara Menjalankan Proyek

### Prasyarat
- Pastikan sudah terpasang [Node.js](https://nodejs.org/) (versi 18 atau lebih baru).

### Langkah Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/ludo-web.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd ludo-web
   ```
3. Pasang seluruh dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka peramban di alamat:
   ```text
   http://localhost:5173/
   ```

### Skrip yang Tersedia

- `npm run dev`: Menjalankan server pengembangan Vite lokal dengan Hot Module Replacement (HMR).
- `npm run build`: Mengompilasi dan mengoptimasi aplikasi untuk deployment produksi ke folder `dist/`.
- `npm run preview`: Menjalankan preview lokal dari hasil build produksi.

---

## Lisensi

Proyek ini dibuat untuk tujuan edukasi dan hiburan. Bebas digunakan dan dikembangkan kembali.
