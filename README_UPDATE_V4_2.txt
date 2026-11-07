KLEREK KASIR v4.2 — UPDATE HTML DAN ANDROID

FITUR
1. Settlement Kepala Toko berupa tab Shift 3 (pembuka), Shift 1 (akumulasi), Shift 2 (closing).
2. Navigasi bawah: Beranda, Hitung, Laporan, Kepala Toko, Lainnya. Riwayat pindah ke Lainnya.
3. Rumus eTrans/PLN: S3=pembuka; S1=checkpoint akumulasi S1-pembuka S3; S2=total harian-S1-S3.
4. Padding top Android dan Capacitor StatusBar, untuk menghindari jam/notifikasi overlap.

CARA BUILD APK DARI HP (GITHUB ACTIONS)
1. Backup JSON via aplikasi lama (sebelum deploy).
2. Ekstrak ZIP proyek dan upload seluruh isi folder, bukan ZIP, ke repositori Android pada branch main.
3. Pastikan .github/workflows/main.yml ikut terupload, dan file web/index.html diperbarui.
4. Actions > Build KLEREK KASIR APK (Internal) > Run workflow.
5. Jika job selesai hijau, buka run Summary > Artifacts > KLEREK-KASIR-v4.2-APK-INTERNAL.
6. Download ZIP artifacts, ekstrak APK, lalu instal pada Android.

SUPABASE
- Tidak ada perubahan struktur SQL untuk v4.2.
- Pastikan patch Supabase v4.0.1 dan v4.1 sudah sukses sebelum uji.
- Seluruh perangkat sebaiknya pindah ke v4.2 bersama-sama agar tidak ada konflik interpretasi nilai settlement.
- Data v4.1 disimpan dalam arsip field legacySettlementV41 / legacyCloudSettlements saat dikonversi.
- Validasi hasil migrasi dengan laporan fisik. Contoh: 8 jt (S3), 18 jt (checkpoint S1), 30 jt (closing) => S3 8 jt, S1 10 jt, S2 12 jt.
- Akses cloud, approval, sinkronisasi belum diuji terhadap proyek produksi dari lingkungan ini.

PENTING: ZIP PROYEK BUKAN APK. APK dihasilkan setelah workflow GitHub Actions sukses.

PERINGATAN SIGNATURE APK DEBUG
Build GitHub Actions pada runner baru bisa menghasilkan debug signing key berbeda.
Jika APK v4.2 tidak dapat dipasang di atas versi lama, JANGAN langsung uninstall:
backup JSON serta sinkronkan semua data ke cloud terlebih dahulu.
Uninstall versi lama dapat menghapus data lokal. Untuk update tanpa uninstall,
gunakan keystore stabil yang disimpan dengan aman di GitHub Secrets.
