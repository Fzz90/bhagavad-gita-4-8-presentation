# Bhagavad-gītā 4.8 · Presentasi Interaktif

Presentasi web React + TypeScript tentang teks Jepang halaman 316–318: isi ayat dan komentar, transliterasi ilmiah IAST, serta istilah non-Jepang. Ada 18 slide, navigasi keyboard, animasi horizontal, glosarium yang dapat dipilih, catatan pembicara, dan foto halaman sumber.

## Menjalankan

```bash
npm ci
npm run dev
```

Buka alamat yang ditampilkan Vite. Untuk build produksi:

```bash
npm run build
npm run preview
```

Hasil statis berada di `dist/`. Konfigurasi `base: './'` membuat aset bekerja di subdirektori GitHub Pages.

## Navigasi

| Tombol | Aksi |
| --- | --- |
| → / Spasi | Slide berikutnya |
| ← | Slide sebelumnya |
| Home / End | Awal / akhir |
| F | Layar penuh |
| N | Catatan pembicara |
| S | Foto halaman sumber |
| Esc | Tutup panel / keluar dari layar penuh |

Kartu agenda dapat diklik untuk melompat ke bagian tertentu. Istilah pada slide 6, 13, dan 15 juga dapat dipilih.

## GitHub Pages

1. Buat repository GitHub baru dan unggah isi folder proyek ini ke branch `main`.
2. Buka **Settings → Pages → Build and deployment → Source** dan pilih **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` akan menjalankan `npm ci`, `npm run build`, lalu menerbitkan `dist/` pada setiap push ke `main`.

## Catatan sumber

Kutipan Jepang diberi nomor halaman dari foto yang diberikan (316, 317, 318). Slide membedakan ayat *Bhagavad-gītā* 4.8, komentar Jepang, bait Bengali, dan interpretasi presentasi. Teks IAST ayat dipisahkan secara visual dari terjemahan Jepang pada buku. Bagian tentang kesadaran Kṛṣṇa dan Caitanya Mahāprabhu dipaparkan sesuai sudut pandang komentar Vaiṣṇava dalam bacaan.

Foto halaman ada di `public/pages/` dan dapat dibuka dari tombol **Sumber** ketika presentasi berlangsung.
