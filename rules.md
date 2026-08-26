# Rules — Portfolio Website (Amai Vaelithys)

## 1. Stack
- **Framework**: Astro (static output, `output: 'static'`)
- **Library**: React (digunakan sebagai island di dalam Astro — `client:load` / `client:visible` sesuai kebutuhan komponen)

## 2. Skill
- Gunakan **taste skill** (sudah terinstall secara global — panggil langsung, tidak perlu instalasi ulang) untuk pertimbangan desain/estetika.

## 3. Tema Warna — Referensi Albedo (Genshin Impact)
Palet warna final (dipakai konsisten di seluruh halaman, bukan cuma satu section — nuansa elegan, "royal/knight", clean):

| Peran | Nama | Hex | Pemakaian |
|---|---|---|---|
| **Primary (Main)** | Antique Gold | `#C9A66B` | Warna utama — navbar, CTA button, elemen dominan, highlight utama |
| **Secondary (Sub)** | Navy Deep | `#1E2A45` | Teks header, elemen gelap sekunder, footer |
| **Background** | Warm Cream | `#F7F3EA` | Background utama halaman |
| **Card / Surface** | Off-White | `#FFFFFF` (atau `#EFE8D8` untuk card yang lebih "menyatu" dengan bg) | Background card, container, section box |
| **Text Body** | Slate Navy | `#3A4257` | Teks paragraf/body |
| **Border / Neutral** | Silver Gray | `#B9BEC9` | Border tipis, divider, elemen metal/pedang |
| **Accent (opsional)** | Teal Ice | `#5A93A0` | Aksen dari warna mata Albedo — bisa dipakai buat link/hover kecil, jangan dominan |

> Gunakan `Antique Gold` sebagai warna utama yang paling menonjol (navbar, CTA, highlight), `Navy Deep` + `Warm Cream` sebagai base kontras pendukung, dan `Teal Ice` sepelit mungkin biar nggak mecah tema.

## 4. Animasi
- **Scroll animation** di seluruh halaman (elemen muncul/bergerak saat di-scroll — misal fade-in, slide-in, parallax ringan).

## 5. Komponen Khusus — Nametag Interaktif
- Ada foto diri (Amai Vaelithys) yang ditaruh di **nametag** yang bisa **ditarik-tarik (draggable)**.
- Nama **"Amai Vaelithys"** diberi animasi tersendiri (misal animasi teks masuk/glow/typing — didiskusikan lebih lanjut saat implementasi).

## 6. Alur Kerja
- **Setiap ada pengerjaan (implementasi/perubahan), harus divalidasi ulang ke saya dulu sebelum lanjut.**
- Jangan langsung eksekusi banyak step tanpa konfirmasi.

## 7. Responsif
- Wajib **fully responsive**.
- **Mobile-first** — desain dan layout diprioritaskan untuk pengalaman mobile terlebih dahulu, baru disesuaikan ke tablet/desktop.

## 8. Referensi Konten (dari brainstorming sebelumnya)
- Hero (nama, tagline, status commission)
- Gallery/Portfolio (grid karya + filter kategori)
- Commission Info (jenis, harga, ToS, cara order, pembayaran)
- About/Bio
- Testimoni
- FAQ
- Contact/Social Links

## 9. Bahasa (Language)
- **Konten Website**: Seluruh teks, copy, menu, tombol, dan konten pada website wajib menggunakan **Bahasa Inggris (English)**.
- **Komunikasi / Diskusi**: Interaksi pengerjaan dan prompting tetap menggunakan **Bahasa Indonesia**.
