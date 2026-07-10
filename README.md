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
![hg](./uploads/671c0ed9a7237276bca8ef72273ad84e/hg.png)
- Bu sayfada animasyon ile logo gelir.
- Kullanıcı için yapılmış karşılama ekranıdır ardından giriş sayfası açılır.

 Giriş Sayfası 
-
![login](/uploads/32515ed26c85b284e45826def1a878e5/login.png)
- Kullanıcının gmail adresi ve şifresini girmesi beklenir.
- Login API çağırılır ve database ile eşleşme sağlanır ise şu soruları kontrol eder.
  - Kullanıcı istenilen evrakları web sitesinden iletmiş mi?
  - Kullanıcı evrakları iletti ise başvurusu onaylanmış mı?
- Bu iki sorunun cevabı evet ise sisteme bearer token alarak giriş yapar aksi takdirde giriş yapamaz.

Ana Sayfa 
-
![home](/uploads/55a03ebe3caab9e3b5357ab087213332/home.png)
- Bu sayfada kullanıcı için hızlı erişim paneli ve Dashboard bulunur.
- Kullanıcının oluşturduğu linklerde başarılı bir işlem olur ise son işlemler kısmında listelenir.

 Sol Bar 
-
![bar](/uploads/9b5f8618da1c288c838bd95829d4cfcb/bar.png)
- Kullanıcı için oluşturulmuş daha detaylı bir menü tasarımıdır.

 Link Oluşturma 
-
![linkcreate](/uploads/8e4a5b506afcecf7ed46499e673dff14/linkcreate.png)

- Bu sayfada sanal pos sahibi kullanıcı müşterisi için bir ödeme linki oluşturur. Gerekli bilgileri girer ve sisteme istenilen tutarda bir ödeme yapabileceği bir sayfa oluşturur.

 Link Listesi 
-
![linklist](/uploads/4b2827e753de9253b68462eb10c6c74c/linklist.png)
- Bu sayfada kullanıcının oluşturduğu tüm linkler listelenir. 
- Linklerin Aktif veya Pasif durumda olduğunu görebilir.
- Tamamlandı ise müşteri ödemeyi yaptığını teyit edebilir. 
- Ayrıca kullanıcı müşterisine ileteceği linki bu sayfadan kopyalar ve müştesi ile paylaşır.
- Müşteri Altpay'ın ödeme web sayfasına bu link sayesinde girer ve ödemesini yaoar.

 Sanal Pos 
-
![sanalpos](/uploads/8735fe7b665fa64aac8210109d43764d/sanalpos.png)
- Bu sayfada müştesinin ödemesinin başarılı olup olmadığını teyit edebilir.

 Hesap 
-
![account](/uploads/0830d9a046030f62a32743797326943e/account.png)
- Hesap sayfasına yönelmek için gerekli bağlantıları içeren bir paneldir.

Kişisel Bilgiler 
- 
![personelinfo](/uploads/cc1b9e6f1f0362ad9a9909f3482622d2/personelinfo.png)
- Kullanıcının Altpay'e kayıt olurken web sitesinde paylaştığı şirket bilgisi, telefon numarası gibi önemli bilgilerin listelendiği screendir.

 Şifre Güncelleme 
-
![updatepass](/uploads/e58a4ab7c7137d9273b46e4a5b6f9dab/updatepass.png)
- Kullanıcının şifresini güncelleyebileceği screendir. UpdatePass API'si çağrılır ve şifresi güncellenir.

 Altpay Projesinde Emeği Geçenler 
-
- ReactNative Projesi: **CANER ENİS**
- Node.js Projesi : **Caner ENİS - Beyzanur GÜNAYDIN**
- Next.js Projesi: **Beyzanur GÜNAYDIN**
- Mobile Figma Tasarımı : **Gaye Toprak**
- Web Figma Tasarımı : **Feyza Keskin**
 
