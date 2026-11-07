// Skrip ini di-bundle dengan esbuild. Dijalankan tanpa menggunakan GitHub Pages.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { StatusBar, Style } from '@capacitor/status-bar';

window.KLEREK_NATIVE = Capacitor.isNativePlatform();
window.__KLEREK_PENDING_AUTH_URLS = window.__KLEREK_PENDING_AUTH_URLS || [];
if (window.KLEREK_NATIVE) {
  // Android 15/16 mengaktifkan edge-to-edge: StatusBar overlay:false dapat diabaikan.
  // HTML juga menyediakan top inset cadangan (klerek-native) agar header tidak tertutup status bar.
  document.documentElement.classList.add('klerek-native');
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
  StatusBar.setBackgroundColor({ color: '#071321' }).catch(() => {});

  // Simpan callback sementara apabila Supabase client belum siap.
  function incoming(url) {
    if (typeof url !== 'string' || !url.startsWith('com.alfianwahyu63.klerekkasir://auth-callback')) return;
    window.__KLEREK_PENDING_AUTH_URLS.push(url);
    window.dispatchEvent(new Event('klerek-auth-url'));
  }
  App.addListener('appUrlOpen', ({ url }) => incoming(url));
  App.getLaunchUrl().then(({ url }) => { if (url) incoming(url); }).catch(() => {});

  // Android WebView tidak selalu mendukung a.download untuk blob; pakai chooser bawaan.
  // File disimpan ke cache aplikasi lalu diserahkan melalui sistem Berbagi Android.
  window.KLEREK_NATIVE_EXPORT = async (blob, filename) => {
    const reader = new FileReader();
    const data = await new Promise((resolve, reject) => {
      reader.onerror = () => reject(new Error('Gagal membaca file'));
      reader.onload = () => resolve(String(reader.result).split(',')[1]);
      reader.readAsDataURL(blob);
    });
    const safe = String(filename || 'klerek-export.bin').replace(/[^A-Za-z0-9_.-]/g, '_');
    const { uri } = await Filesystem.writeFile({
      path: 'exports/' + Date.now() + '_' + safe,
      data,
      directory: Directory.Cache,
      recursive: true
    });
    await Share.share({
      title: safe,
      dialogTitle: 'Simpan atau bagikan ' + safe,
      url: uri
    });
  };
}
