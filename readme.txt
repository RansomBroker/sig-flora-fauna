**Tujuan Website Ini:**

Website **sig-flora-fauna** bertujuan untuk menjadi sebuah Sistem Informasi Geografis (SIG) yang interaktif, informatif, dan mudah digunakan, didedikasikan untuk pengelolaan dan visualisasi data mengenai flora dan fauna. Tujuan utamanya adalah:

*   **Menyediakan Informasi Geografis Terpusat:** Memvisualisasikan lokasi presisi, sebaran, area konservasi, dan atribut data spasial lainnya terkait berbagai jenis flora dan fauna pada peta interaktif. Contohnya, pengguna dapat melihat titik-titik penemuan spesies langka, batas kawasan hutan lindung, atau pola migrasi hewan tertentu.
*   **Mempermudah Akses dan Analisis Data:** Memberikan platform yang mudah diakses bagi peneliti, akademisi, mahasiswa, lembaga pemerintah (seperti dinas kehutanan atau lingkungan hidup), LSM lingkungan, dan masyarakat umum untuk mencari, memfilter, dan mengunduh informasi mengenai keanekaragaman hayati. Pengguna bisa melakukan query spasial sederhana atau analisis visual dasar.
*   **Mendukung Upaya Konservasi dan Pengelolaan Sumber Daya Alam:** Berkontribusi aktif dalam upaya konservasi dengan menyediakan data akurat yang dapat digunakan untuk analisis tren, pemantauan perubahan habitat, identifikasi area prioritas konservasi, dan pengambilan keputusan strategis terkait perlindungan flora dan fauna serta pengelolaan ekosistem yang berkelanjutan.
*   **Media Edukasi dan Peningkatan Kesadaran Publik:** Meningkatkan pemahaman dan kesadaran publik mengenai kekayaan keanekaragaman hayati lokal/nasional, tantangan yang dihadapi, serta pentingnya peran serta masyarakat dalam menjaga kelestarian flora, fauna, dan ekosistem melalui penyajian data yang menarik, visual, dan mudah dipahami.

**1. Tahapan Membuat Aplikasi SIG Flora-Fauna Ini:**

*   **Perencanaan Awal (Inisiasi Proyek SIG):**
    *   Menentukan tujuan spesifik aplikasi SIG: Misalnya, untuk **memetakan sebaran spesies endemik X di Taman Nasional Y**, **memantau perubahan tutupan hutan mangrove di pesisir Z selama 10 tahun terakhir**, atau **menyediakan platform crowdsourcing untuk pelaporan temuan bunga Rafflesia oleh masyarakat umum dan diverifikasi oleh ahli**.
    *   Identifikasi pengguna target dan kebutuhan spesifik mereka: **Peneliti botani** mungkin memerlukan kemampuan untuk mengunduh data koordinat dalam format CSV dan melihat atribut taksonomi lengkap. **Staf dinas lingkungan hidup** mungkin memerlukan laporan ringkasan jumlah spesies terancam per kabupaten. **Masyarakat umum** mungkin lebih tertarik pada foto spesies dan informasi singkat yang menarik.
    *   Inventarisasi, akuisisi, dan validasi data: Mengumpulkan data flora/fauna dari berbagai sumber seperti **data survei lapangan tim sendiri, data dari lembaga penelitian LIPI/BRIN, data historis dari herbarium, atau data observasi dari platform citizen science seperti iNaturalist**. Ini termasuk data spasial (koordinat GPS, poligon batas kawasan) dan data atribut (nama ilmiah, nama lokal, status konservasi IUCN, tanggal observasi, deskripsi habitat, foto, dll.). Melakukan validasi data untuk akurasi spasial dan atribut.
    *   Menentukan fitur-fitur kunci yang paling bernilai: Seperti **pencarian interaktif berdasarkan nama spesies atau filter berdasarkan wilayah administratif (provinsi/kabupaten)**, kemampuan untuk **menampilkan/menyembunyikan beberapa lapisan data tematik (misalnya, jenis hutan, sungai, jalan)**, dan **panel informasi yang menampilkan detail spesies ketika marker di peta diklik**.

*   **Persiapan Alat dan Teknologi (Pemilihan Stack Teknologi untuk SIG Web):**
    *   Memilih teknologi yang paling sesuai untuk membangun aplikasi SIG berbasis web yang interaktif dan skalabel. Keputusan menggunakan **React** untuk frontend memungkinkan pembuatan antarmuka pengguna yang dinamis, komponen yang dapat digunakan kembali (misalnya, komponen kartu informasi spesies), dan manajemen state yang efisien. **LeafletJS** dipilih karena merupakan library pemetaan JavaScript yang ringan, open-source, dan memiliki banyak plugin, sangat ideal untuk menampilkan data vektor (titik, garis, poligon) dan tile layer. **TypeScript** diadopsi untuk meningkatkan kualitas kode, mengurangi bug saat runtime, dan mempermudah kolaborasi tim dengan adanya sistem tipe yang kuat. **Tailwind CSS** mempercepat proses styling dengan kelas-kelas utilitasnya, memungkinkan pembuatan desain kustom tanpa menulis banyak CSS manual. **TanStack React Query (React Query)** akan sangat berguna untuk mengelola pengambilan data (fetching), caching, dan sinkronisasi data flora/fauna jika data tersebut berasal dari API eksternal atau backend, sehingga data yang ditampilkan selalu segar dan aplikasi terasa responsif.
    *   Menyiapkan lingkungan pengembangan: Menginstal versi Node.js yang stabil, menginisialisasi proyek Vite dengan template React dan TypeScript, menginstal semua dependensi (`npm install`).
    *   Merencanakan struktur data dan format file: Menentukan bagaimana data flora/fauna akan distrukturkan (misalnya, dalam format GeoJSON untuk data spasial-atribut), bagaimana data akan disimpan (misalnya, sebagai file statis di direktori `public/data` atau ditarik dari API), dan skema atribut apa saja yang akan disertakan untuk setiap entitas flora/fauna.

*   **Perancangan Tampilan dan Pengalaman Pengguna (Desain UI/UX untuk SIG):**
    *   Membuat sketsa (wireframes) dan prototipe antarmuka pengguna (mockups), dengan **peta interaktif sebagai elemen sentral yang dominan**. Desain harus memastikan peta mudah dinavigasi dan informasi spasial tersaji dengan jelas.
    *   Merancang **panel informasi (sidebar atau pop-up)** yang akan menampilkan detail atribut flora/fauna (nama ilmiah, status, deskripsi, foto) ketika suatu objek (marker atau poligon) di peta dipilih oleh pengguna.
    *   Merancang mekanisme navigasi peta yang intuitif: kontrol zoom (slider/ tombol +/-), panning, tombol untuk kembali ke tampilan awal (home extent), dan mungkin fitur geolokasi (cari lokasi pengguna).
    *   Merancang **legenda peta dinamis** yang menjelaskan simbol-simbol yang digunakan untuk berbagai jenis data atau kategori flora/fauna.
    *   Menyediakan pilihan **basemap** yang beragam (misalnya, peta jalan, citra satelit, peta topografi) agar pengguna dapat memilih konteks visual yang paling sesuai.
    *   Merancang alur interaksi pengguna yang logis: Bagaimana pengguna melakukan **pencarian data (misalnya, via input teks untuk nama spesies), menerapkan filter (misalnya, dropdown untuk status konservasi atau checkbox untuk famili tertentu)**, dan mengakses informasi detail dari peta.

*   **Penulisan Kode (Implementasi Fitur SIG Inti):**
    *   Membangun komponen-komponen React untuk setiap elemen UI: komponen utama peta (mengintegrasikan `react-leaflet`), panel samping untuk filter dan legenda, panel informasi detail, header dengan bar pencarian, dan footer.
    *   Mengimplementasikan logika untuk **memuat data GeoJSON flora/fauna (dari file statis atau API) dan menampilkannya sebagai layer di peta Leaflet**. Ini termasuk styling marker (misalnya, ikon berbeda untuk jenis satwa atau tumbuhan), pewarnaan poligon berdasarkan atribut (misalnya, status habitat), dan pengaturan pop-up atau tooltip sederhana pada hover.
    *   Mengembangkan fungsi pencarian yang memungkinkan pengguna **mencari spesies berdasarkan nama dan secara otomatis mengarahkan peta ke lokasi spesies tersebut jika ditemukan**.
    *   Mengimplementasikan **sistem filter yang memungkinkan pengguna menyaring data yang ditampilkan di peta berdasarkan atribut** (misalnya, hanya tampilkan flora dengan status "Terancam Punah" atau fauna yang diobservasi dalam setahun terakhir).
    *   Menghubungkan interaksi peta (klik pada marker/poligon) dengan panel informasi sehingga atribut data yang relevan dari objek yang dipilih dapat ditampilkan secara dinamis di panel tersebut.
    *   Jika menggunakan data dari backend, melakukan integrasi API menggunakan **TanStack React Query untuk fetching, caching, dan optimistic updates**, sehingga aplikasi terasa cepat dan data tetap konsisten.

*   **Pengujian (Verifikasi Fungsionalitas dan Validasi Data SIG):**
    *   Menguji fungsionalitas inti SIG: Apakah peta termuat dengan benar pada berbagai kondisi jaringan? Apakah data flora/fauna (titik, poligon) ditampilkan akurat sesuai koordinat geografisnya? Apakah legenda peta sesuai dengan data yang ditampilkan?
    *   Menguji interaksi peta secara menyeluruh: Apakah fungsi zoom, pan, pemilihan basemap, dan klik pada objek peta berfungsi responsif dan menampilkan informasi yang benar di panel detail? Apakah tooltip muncul dengan benar?
    *   Verifikasi data spasial dan atribut: Melakukan cross-check sampel data yang ditampilkan di peta dengan data sumber untuk memastikan akurasi koordinat, nama spesies, status konservasi, dan atribut penting lainnya.
    *   Pengujian performa aplikasi: Memastikan aplikasi tetap responsif dan peta tidak lag bahkan ketika memuat dataset flora/fauna yang besar atau banyak layer. Menggunakan tools seperti React Developer Tools untuk profil performa komponen.
    *   Pengujian kompatibilitas browser: Memastikan aplikasi SIG berjalan dengan baik di versi terbaru browser populer (Chrome, Firefox, Safari, Edge).
    *   Pengujian Usability (opsional namun direkomendasikan): Melibatkan calon pengguna untuk mencoba aplikasi dan memberikan feedback mengenai kemudahan penggunaan dan apakah fitur sudah sesuai kebutuhan.

*   **Peluncuran (Deployment Aplikasi SIG Web):**
    *   Menyiapkan aplikasi untuk produksi: Menjalankan `npm run build` untuk menghasilkan bundel JavaScript yang teroptimasi dan file statis lainnya di direktori `dist`.
    *   Memilih platform hosting: Untuk aplikasi frontend statis seperti ini, platform seperti **Netlify, Vercel, GitHub Pages, atau AWS S3 (dengan CloudFront)** adalah pilihan yang populer karena kemudahan deployment dan seringkali ada opsi gratis/murah.
    *   Mengkonfigurasi proses deployment: Mengatur CI/CD (Continuous Integration/Continuous Deployment) pipeline (misalnya menggunakan GitHub Actions) agar setiap perubahan pada kode utama (main branch) secara otomatis ter-build dan ter-deploy ke server produksi.
    *   Mengkonfigurasi domain kustom (jika ada) dan sertifikat SSL/TLS untuk HTTPS.

*   **Pemeliharaan dan Pengembangan Lanjutan (Siklus Hidup SIG):**
    *   Memantau kinerja aplikasi secara berkala menggunakan tools analytics atau monitoring untuk mengidentifikasi error atau bottleneck performa.
    *   Melakukan **pembaruan data flora/fauna secara rutin** seiring dengan adanya temuan baru, perubahan status konservasi, atau koreksi data.
    *   Memperbarui dependensi (library JavaScript) secara berkala untuk menjaga keamanan dan mendapatkan fitur terbaru.
    *   Mengumpulkan umpan balik dari pengguna secara terus-menerus untuk mengidentifikasi kebutuhan fitur baru atau perbaikan. Contoh pengembangan lanjutan: **penambahan alat analisis spasial dasar (misalnya, buffer, overlay sederhana), fitur unggah data oleh pengguna terverifikasi, atau integrasi dengan sumber data eksternal lainnya melalui API.**

**2. Proses Rancangan Aplikasi SIG Flora-Fauna Ini:**

*   **Memahami Kebutuhan Pengguna dan Konteks Data (Analisis Kebutuhan SIG):**
    *   Melakukan **wawancara mendalam dan workshop** dengan calon pengguna kunci (misalnya, ahli biologi lapangan, manajer data konservasi, staf perencanaan tata ruang, akademisi) untuk menggali secara detail jenis informasi flora/fauna apa yang mereka butuhkan, bagaimana alur kerja mereka saat ini, keputusan apa yang akan didukung oleh SIG ini, dan format data output apa yang mereka harapkan (misalnya, peta tematik, tabel data, laporan statistik).
    *   Mempelajari karakteristik data flora/fauna yang akan divisualisasikan: **volume data (jumlah record), variasi atribut (jumlah kolom data), kompleksitas geometri (titik sederhana, poligon kawasan yang kompleks), frekuensi pembaruan data, dan standar metadata yang digunakan**.
    *   Mengidentifikasi **kasus penggunaan (use cases)** utama. Contoh: "Sebagai seorang peneliti, saya ingin dapat memfilter sebaran spesies X berdasarkan tahun observasi dan status IUCN, lalu mengekspor hasilnya sebagai shapefile." atau "Sebagai staf taman nasional, saya ingin melihat peta kepadatan populasi Orangutan di area konsesi kami."

*   **Membuat Struktur Dasar (Desain Arsitektur Sistem SIG Web):**
    *   Merencanakan arsitektur frontend yang modular dan scalable: Bagaimana **komponen-komponen React akan diorganisir (misalnya, berdasarkan fitur atau domain: Peta, PanelFilter, PanelDetail, Legenda)**, bagaimana state aplikasi akan dikelola (misalnya, menggunakan Context API React untuk state sederhana atau Zustand/Redux untuk state yang lebih kompleks jika diperlukan), dan bagaimana interaksi serta aliran data antar komponen akan berlangsung, khususnya antara komponen peta (Leaflet) dengan komponen UI lainnya.
    *   Merencanakan arsitektur backend (jika proyek ini memiliki backend terpisah, bukan hanya frontend yang mengkonsumsi data statis): Memilih teknologi server (Node.js/Express, Python/Django/Flask, dll.), desain database (misalnya, **PostgreSQL dengan ekstensi PostGIS untuk kemampuan query spasial yang canggih** jika data dinamis dan kompleks), dan merancang **API RESTful atau GraphQL yang efisien** untuk melayani data flora/fauna ke frontend (misalnya, endpoint untuk mengambil data berdasarkan bounding box peta saat ini, atau endpoint untuk query atribut).
    *   Untuk proyek frontend-only: Menentukan strategi pengelolaan file data statis (misalnya, **menyimpan file GeoJSON per dataset di folder `public/data/` dan mengambilnya menggunakan `fetch` API**). Mempertimbangkan optimasi jika file GeoJSON sangat besar (misalnya, memecahnya menjadi file-file yang lebih kecil atau menggunakan format TopoJSON).
    *   Menentukan bagaimana data spasial akan diproses, disimpan, dan dirender: Apakah ada kebutuhan untuk **konversi proyeksi on-the-fly**, **generalisasi geometri untuk performa pada zoom level tertentu**, atau penggunaan **tile server (vektor atau raster) untuk lapisan peta dasar atau data tematik yang sangat besar**.

*   **Merancang Pengalaman Pengguna (UX) untuk Eksplorasi Data Geografis yang Efektif:**
    *   Fokus utama pada **kemudahan pengguna dalam menjelajahi dan memahami data spasial flora/fauna** secara intuitif, bahkan untuk pengguna yang tidak memiliki latar belakang SIG yang kuat.
    *   Merancang alur kerja yang jelas dan efisien untuk tugas-tugas umum seperti: **menemukan lokasi tertentu di peta, melakukan query spasial sederhana (misalnya, "tampilkan semua data dalam area yang saya gambar"), memfilter data berdasarkan beberapa atribut sekaligus, membandingkan beberapa lapisan data, dan mengakses informasi detail dari objek di peta**.
    *   Mempertimbangkan bagaimana pengguna akan memahami **konteks spasial dan temporal dari data** yang ditampilkan (misalnya, dengan menyediakan pilihan basemap yang informatif, slider waktu jika data memiliki dimensi temporal, dan visualisasi perubahan dari waktu ke waktu).
    *   Memastikan **feedback yang jelas kepada pengguna** atas setiap aksi (misalnya, indikator loading saat data sedang diambil, notifikasi jika filter tidak menghasilkan data).

*   **Merancang Antarmuka Pengguna (UI) yang Informatif dan Tidak Membebani untuk SIG:**
    *   Mendesain tampilan visual peta yang bersih, dengan **simbolisasi (ikon marker, warna dan pola poligon, ketebalan garis) yang konsisten, mudah dibedakan, dan memiliki makna yang jelas** sesuai dengan standar kartografi atau konvensi yang ada untuk data flora/fauna.
    *   Merancang panel kontrol (misalnya, di sidebar) yang terorganisir dengan baik dan mudah digunakan untuk **mengelola visibilitas lapisan peta (layer switcher), memilih basemap, mengakses alat bantu peta (ukur, identifikasi), dan mengatur parameter filter**.
    *   Memastikan panel informasi atribut data (yang muncul saat objek diklik) **menyajikan informasi secara terstruktur, mudah dibaca, dan menyoroti atribut-atribut kunci**. Mempertimbangkan penggunaan tab atau akordion jika atribut sangat banyak.
    *   Merancang **legenda peta dinamis yang secara otomatis menjelaskan simbol-simbol yang sedang aktif/terlihat di peta** dan mudah dipahami oleh pengguna.
    *   Memastikan desain responsif sehingga aplikasi SIG dapat digunakan dengan baik pada berbagai ukuran layar, termasuk tablet.

*   **Iterasi dan Umpan Balik Berbasis Prototipe Interaktif SIG:**
    *   Membuat **prototipe interaktif fidelitas tinggi** (misalnya, menggunakan Figma yang dihubungkan atau langsung dengan beberapa halaman dan komponen React yang sudah berfungsi) yang mendemonstrasikan alur kerja utama, interaksi peta, visualisasi data, dan fitur filter.
    *   Melakukan sesi **uji kegunaan (usability testing) formal atau informal** dengan representasi calon pengguna. Memberikan mereka skenario tugas (misalnya, "Coba temukan semua lokasi pengamatan Elang Jawa dalam 5 tahun terakhir di provinsi Jawa Barat") dan amati bagaimana mereka berinteraksi dengan prototipe.
    *   Mengumpulkan **umpan balik kualitatif (observasi, wawancara setelah tes) dan kuantitatif (tingkat keberhasilan tugas, waktu penyelesaian)**.
    *   Menggunakan temuan dari umpan balik ini untuk **mengidentifikasi masalah UX/UI, menyempurnakan desain, memprioritaskan fitur, dan memastikan bahwa aplikasi SIG yang dikembangkan benar-benar memenuhi kebutuhan pengguna** sebelum melakukan implementasi penuh atau pengembangan fitur lebih lanjut.

Semoga penjelasan ini mudah dipahami!

**3. Tahapan Instalasi Proyek:**

Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

*   **Prasyarat:**
    *   Pastikan Anda sudah menginstal **Node.js** (versi LTS direkomendasikan). NPM (Node Package Manager) biasanya sudah terinstal bersama Node.js. Anda bisa memeriksanya dengan perintah `node -v` dan `npm -v` di terminal.

*   **Langkah-langkah Instalasi:**
    1.  **Clone Repository (Unduh Kode Sumber):**
        Buka terminal atau command prompt Anda, arahkan ke direktori tempat Anda ingin menyimpan proyek, lalu jalankan perintah berikut:
        ```bash
        git clone <URL_REPOSITORY_ANDA>
        ```
        Ganti `<URL_REPOSITORY_ANDA>` dengan URL Git repository proyek ini.

    2.  **Masuk ke Direktori Proyek:**
        ```bash
        cd sig-flora-fauna
        ```
        (Sesuaikan `sig-flora-fauna` jika nama direktorinya berbeda setelah clone).

    3.  **Instal Dependencies (Perpustakaan yang Dibutuhkan):**
        Jalankan perintah berikut untuk mengunduh dan menginstal semua paket atau library yang dibutuhkan oleh proyek menggunakan NPM:
        ```bash
        npm install
        ```

*   **Menjalankan Proyek (Mode Development):**
    Setelah instalasi dependensi selesai, Anda dapat menjalankan server pengembangan lokal dengan perintah:
    ```bash
    npm run dev
    ```
    Ini akan menjalankan aplikasi dalam mode pengembangan. Biasanya, aplikasi akan dapat diakses melalui browser di alamat seperti `http://localhost:5173` (port bisa berbeda, perhatikan output di terminal Anda).

*   **Membuat Build untuk Produksi:**
    Jika Anda ingin membuat versi produksi dari aplikasi (versi yang dioptimalkan untuk di-deploy), jalankan perintah:
    ```bash
    npm run build
    ```
    Perintah ini akan menghasilkan file-file statis di dalam direktori `dist` (atau folder build lainnya sesuai konfigurasi Vite) yang siap untuk di-hosting. 