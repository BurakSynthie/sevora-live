import LegalPage from "../../components/LegalPage";

const content = {
  tr: {
    label: "GİZLİLİK POLİTİKASI",
    title: "Sevora Gizlilik Politikası",
    intro:
      "Sevora, insanların kendini daha rahat ve güvende hissedebileceği kısa sosyal temas alanları oluşturmayı hedefler. Bu nedenle gizlilik, ürünün temel parçalarından biridir.",
    updated: "Son güncelleme: 2026",
    sections: [
      {
        title: "Toplanan bilgiler",
        text:
          "Private preview aşamasında Sevora yalnızca erken erişim formu üzerinden isim, e-posta adresi ve isteğe bağlı açıklama bilgisi toplar. Bu bilgiler, kullanıcıya ilk sürüm hakkında haber vermek ve geri bildirim sürecini yönetmek için kullanılır.",
      },
      {
        title: "E-posta kullanımı",
        text:
          "E-posta adresleri yalnızca Sevora’nın geliştirme süreci, erken erişim daveti, önemli ürün güncellemeleri ve gerekli bilgilendirmeler için kullanılacaktır. Gereksiz bildirim veya spam gönderimi yapılması amaçlanmaz.",
      },
      {
        title: "Anonim kullanım",
        text:
          "Sevora’nın sohbet odaları anonim takma adlarla çalışacak şekilde tasarlanmaktadır. Kullanıcıların gerçek ad, telefon, adres veya sosyal medya hesabı paylaşması zorunlu olmayacaktır.",
      },
      {
        title: "Sohbet verileri",
        text:
          "Gerçek sohbet sistemi aktif olduğunda, güvenlik, moderasyon ve kötüye kullanımın önlenmesi için bazı teknik kayıtlar tutulabilir. Bu süreç başlamadan önce kullanıcılar açık şekilde bilgilendirilecektir.",
      },
      {
        title: "Veri güvenliği",
        text:
          "Sevora, kullanıcı bilgilerinin güvenli biçimde saklanması için gerekli teknik önlemleri almayı hedefler. Bununla birlikte hiçbir internet tabanlı sistemin mutlak güvenlik garantisi veremeyeceği bilinmelidir.",
      },
      {
        title: "Üçüncü taraflar",
        text:
          "Sevora, kullanıcı verilerini satmayı veya reklam amacıyla üçüncü taraflarla paylaşmayı hedeflemez. Teknik altyapı için kullanılan servisler, yalnızca hizmetin çalışması için gerekli ölçüde veri işleyebilir.",
      },
      {
        title: "İletişim",
        text:
          "Gizlilikle ilgili sorular, geri bildirimler veya veri talepleri için iletişim sayfası üzerinden Sevora ekibine ulaşılabilir.",
      },
    ],
  },
  en: {
    label: "PRIVACY POLICY",
    title: "Sevora Privacy Policy",
    intro:
      "Sevora aims to create short social spaces where people can feel more comfortable and safe. Privacy is therefore one of the core parts of the product.",
    updated: "Last updated: 2026",
    sections: [
      {
        title: "Information we collect",
        text:
          "During private preview, Sevora collects only the name, email address and optional note submitted through the early access form. This information is used to inform users about the first version and manage feedback.",
      },
      {
        title: "Email usage",
        text:
          "Email addresses will only be used for Sevora development updates, early access invitations, important product information and necessary communication. Sevora does not aim to send spam or unnecessary notifications.",
      },
      {
        title: "Anonymous use",
        text:
          "Sevora chat rooms are designed to work with anonymous nicknames. Users will not be required to share their real name, phone number, address or social media account.",
      },
      {
        title: "Chat data",
        text:
          "When the real chat system becomes active, some technical records may be kept for safety, moderation and abuse prevention. Users will be clearly informed before this phase begins.",
      },
      {
        title: "Data security",
        text:
          "Sevora aims to take reasonable technical measures to store user information safely. However, no internet-based system can guarantee absolute security.",
      },
      {
        title: "Third parties",
        text:
          "Sevora does not aim to sell user data or share it with third parties for advertising. Infrastructure providers may process limited data only as necessary for the service to operate.",
      },
      {
        title: "Contact",
        text:
          "For privacy questions, feedback or data-related requests, users can reach the Sevora team through the contact page.",
      },
    ],
  },
};

export default function PrivacyPage() {
  return <LegalPage content={content} />;
}
