const fs=require('node:fs');
const path=require('node:path');
const manifest=path.join(__dirname,'..','android','app','src','main','AndroidManifest.xml');
if(!fs.existsSync(manifest))throw new Error('Jalankan npx cap add android sebelum setup-android');
let xml=fs.readFileSync(manifest,'utf8');
if(!xml.includes('android.permission.INTERNET'))xml=xml.replace('</manifest>', '<uses-permission android:name="android.permission.INTERNET"/>\n</manifest>');
const marker='android:scheme="com.alfianwahyu63.klerekkasir"';
if(!xml.includes(marker)){
 const activity=xml.indexOf('android:name=".MainActivity"');
 if(activity<0)throw new Error('MainActivity tidak ditemukan di AndroidManifest.xml');
 const close=xml.indexOf('</activity>',activity);
 if(close<0)throw new Error('Penutup MainActivity tidak ditemukan');
 const filter=`<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="com.alfianwahyu63.klerekkasir" android:host="auth-callback" />
</intent-filter>
`;
 xml=xml.slice(0,close)+filter+xml.slice(close);
}
fs.writeFileSync(manifest,xml);
console.log('Manifest Android: permission internet + deep-link verifikasi email siap.');
