KLEREK KASIR v4 — APK INTERNAL ANDROID (TANPA PLAY STORE)
======================================================
STATUS: Ini KODE PROYEK SIAP-BUILD, BUKAN FILE APK YANG SUDAH DIKOMPILASI.
Build APK dengan GitHub Actions. Tidak memerlukan Android Studio di HP.

CARA BUILD VIA GITHUB (PALING MUDAH)
1. Ekstrak ZIP proyek ini.
2. Buat repositori GitHub BARU, misalnya "Klerek-Kasir-Android".
   Simpan proyek APK secara terpisah dari repo website yang sebelumnya.
3. Upload SEMUA isi ZIP ke root repositori, termasuk:
   package.json, capacitor.config.json, folder web/, src/, scripts/,
   docs/, dan folder tersembunyi .github/workflows/build-apk.yml.
   File .github/workflows/build-apk.yml WAJIB ada supaya tab Actions muncul.
4. Repositori -> Actions -> "Build KLEREK KASIR APK (Internal)" ->
   Run workflow -> Run workflow.
5. Buka hasil build (centang hijau) -> bagian Artifacts ->
   "KLEREK-KASIR-v4-APK-INTERNAL" -> download ZIP artifact.
6. Ekstrak ZIP artifact -> dapat app-debug.apk -> pindahkan ke HP Android.
7. Buka app-debug.apk -> Izinkan "Instal aplikasi tidak dikenal" bila diminta.
8. Aplikasi dapat berjalan dari asset yang sudah dibundel; GitHub Pages 404
   TIDAK menghalangi membuka layar aplikasi Android.

SUPABASE: KONFIRMASI EMAIL DI APK
9. Di Supabase -> Authentication -> URL Configuration -> Redirect URLs,
   klik Add URL dan TAMBAHKAN URL INI (jangan hapus URL website):
   com.alfianwahyu63.klerekkasir://auth-callback
10. Tautan verifikasi email untuk akun yang didaftarkan DARI APK akan mencoba
    kembali ke APK (Android deep link). Untuk akun lama yang sudah terverifikasi
    cukup login dengan email+password seperti biasa.
11. Pastikan skrip SQL versi v4.0.1 FIX sudah sukses dijalankan di Supabase;
    jika masih error atau belum dijalankan, approval/monitor cloud tidak aktif.
    File rujukan tersedia: docs/SUPABASE_PATCH_V4_FIX.txt.

BATASAN & PENTING
- APK debug = cocok untuk UJI INTERNAL, bukan APK rilis final tersertifikasi.
- SETIAP build baru di GitHub runner dapat memiliki sertifikat debug berbeda.
  Untuk mengganti APK, mungkin perlu uninstall dulu; BACKUP data lokal terlebih
  dulu sebelum uninstall! Pertahankan data cloud sebagai sumber utama.
- Untuk update aman tanpa uninstall dibutuhkan keystore signing yang konsisten
  dan workflow release-signing. Jangan commit keystore/password ke repo publik.
- SQLite/offline DB tersinkron penuh belum tersedia; saat offline gunakan hanya
  input lokal yang aplikasi dukung, dan tes pending/konflik setelah online.
- Login Supabase, RLS/RPC, peran kasir, dan riwayat harus diuji pada 2 HP.
- Export CSV/JSON/PNG di APK memakai lembar Share Android, lalu pilih aplikasi
  untuk menyimpan/mengirim file. Cetak PDF belum diuji pada Android WebView.
- APK menggunakan SDK Supabase terbundel agar layar lokal dan library tidak
  tergantung CDN saat offline; transaksi cloud tetap butuh internet.
- Key browser Supabase di web/supabase-config.js adalah publishable key, bukan
  service_role. Jangan menaruh secret key di proyek atau GitHub.
- Jangan publish folder docs/ SQL ke website publik jika berisi informasi lain.

BILA ADA KOMPUTER ANDROID STUDIO
  npm install
  npm run build:android-project
  npx cap open android
  Android Studio -> Build -> Build APK(s).

PANDUAN TEKNIS
- App ID: com.alfianwahyu63.klerekkasir
- Deep link: com.alfianwahyu63.klerekkasir://auth-callback
- Web assets: web/ (sumber), www/ (dihasilkan saat npm run build:web).
- Capacitor v8: core, Android, App, Share, Filesystem.
- Build otomatis: .github/workflows/build-apk.yml.
- APK Debug: android/app/build/outputs/apk/debug/app-debug.apk
