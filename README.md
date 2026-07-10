**Altpay Mobil Uygulaması**
- 
- Altpay sanal pos işlemlerini simüle eden bir sistemdir. Bu proje kapsamında 4 farklı proje oluşturulmuştur.
  - 2 Next.js Projesi
  - 1 Node.js Projesi
  - 1 ReactNative Projesi

- Oluşturulan bu projelerde Node.js ve ReactNative projelerinde sorumluluk aldım. Reactnative projesi ile Mobil uygulamayı geliştirdim, Ayrıca Node.js projesindede sorumluluklar üstlenerek API'leri geliştirdim.
- Bu projenin amacı web sitesi ile kordineli çalışan bir mobil uygulama yapmaktadır. Kayıt ve istenilen evraklar sadece web sayfası üzerinden gönderilebilir ve başvuru onaylandıktan sonra mobil uygulamaya giriş yapma hakkı kazanırsınız. Ekip arkadaşım Figma tasarımını oluşturdu ben ise mobil için tasarıma bağlı kalarak kodları oluşturdum. 

Hoşgeldiniz
-
<img width="392" height="863" alt="hg" src="https://github.com/user-attachments/assets/1ad9ec79-3f49-47af-9964-42729eb1e8ff" />

- Bu sayfada animasyon ile logo gelir.
- Kullanıcı için yapılmış karşılama ekranıdır ardından giriş sayfası açılır.

 Giriş Sayfası 
-
<img width="416" height="860" alt="login" src="https://github.com/user-attachments/assets/113cda7f-b12d-4123-a13d-69b7453c9988" />

- Kullanıcının gmail adresi ve şifresini girmesi beklenir.
- Login API çağırılır ve database ile eşleşme sağlanır ise şu soruları kontrol eder.
  - Kullanıcı istenilen evrakları web sitesinden iletmiş mi?
  - Kullanıcı evrakları iletti ise başvurusu onaylanmış mı?
- Bu iki sorunun cevabı evet ise sisteme bearer token alarak giriş yapar aksi takdirde giriş yapamaz.

Ana Sayfa 
-
<img width="391" height="846" alt="home" src="https://github.com/user-attachments/assets/a07dd38f-345e-4ca7-915d-44c97e50d101" />

- Bu sayfada kullanıcı için hızlı erişim paneli ve Dashboard bulunur.
- Kullanıcının oluşturduğu linklerde başarılı bir işlem olur ise son işlemler kısmında listelenir.

 Sol Bar 
-
<img width="405" height="846" alt="bar" src="https://github.com/user-attachments/assets/9a1f7912-26db-4842-b5d5-dc80075ae5aa" />

- Kullanıcı için oluşturulmuş daha detaylı bir menü tasarımıdır.

 Link Oluşturma 
-
<img width="385" height="840" alt="linkcreate" src="https://github.com/user-attachments/assets/04732805-8f8a-47bd-9766-41be3301406e" />


- Bu sayfada sanal pos sahibi kullanıcı müşterisi için bir ödeme linki oluşturur. Gerekli bilgileri girer ve sisteme istenilen tutarda bir ödeme yapabileceği bir sayfa oluşturur.

 Link Listesi 
-
<img width="398" height="836" alt="linklist" src="https://github.com/user-attachments/assets/ed3f0cb4-9675-4325-bf05-535769ae92f6" />

- Bu sayfada kullanıcının oluşturduğu tüm linkler listelenir. 
- Linklerin Aktif veya Pasif durumda olduğunu görebilir.
- Tamamlandı ise müşteri ödemeyi yaptığını teyit edebilir. 
- Ayrıca kullanıcı müşterisine ileteceği linki bu sayfadan kopyalar ve müştesi ile paylaşır.
- Müşteri Altpay'ın ödeme web sayfasına bu link sayesinde girer ve ödemesini yaoar.

 Sanal Pos 
-
<img width="391" height="857" alt="sanalpos" src="https://github.com/user-attachments/assets/0d63c3b4-94b4-4029-b6dd-f7c70b71644a" />

- Bu sayfada müştesinin ödemesinin başarılı olup olmadığını teyit edebilir.

 Hesap 
-
<img width="386" height="834" alt="account" src="https://github.com/user-attachments/assets/3b3a68cd-43b7-4072-a26a-55fef7a101f0" />

- Hesap sayfasına yönelmek için gerekli bağlantıları içeren bir paneldir.

Kişisel Bilgiler 
- 
<img width="381" height="841" alt="personelinfo" src="https://github.com/user-attachments/assets/10d8bc76-6dfe-4cd8-b81c-de0a581d62eb" />

- Kullanıcının Altpay'e kayıt olurken web sitesinde paylaştığı şirket bilgisi, telefon numarası gibi önemli bilgilerin listelendiği screendir.

 Şifre Güncelleme 
-
<img width="388" height="844" alt="updatepass" src="https://github.com/user-attachments/assets/9a322021-6c00-4b37-9774-b0fc96c0a1a8" />

- Kullanıcının şifresini güncelleyebileceği screendir. UpdatePass API'si çağrılır ve şifresi güncellenir.

 Altpay Projesinde Emeği Geçenler 
-
- ReactNative Projesi: **CANER ENİS**
- Node.js Projesi : **Caner ENİS - Beyzanur GÜNAYDIN**
- Next.js Projesi: **Beyzanur GÜNAYDIN**
- Mobile Figma Tasarımı : **Gaye Toprak**
- Web Figma Tasarımı : **Feyza Keskin**
 
