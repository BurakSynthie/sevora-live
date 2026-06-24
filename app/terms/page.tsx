import LegalPage from "../../components/LegalPage";

const content = {
  tr: {
    label: "KULLANIM ŞARTLARI",
    title: "Sevora Kullanım Şartları",
    intro:
      "Sevora, kısa, güvenli ve anonim sosyal temas alanları sunmak için geliştirilen bir private preview projesidir. Platformu kullanarak bu temel şartları kabul etmiş sayılırsın.",
    updated: "Son güncelleme: 2026",
    sections: [
      {
        title: "Hizmetin amacı",
        text:
          "Sevora, kullanıcıların o anki ruh haline göre kısa süreli anonim sohbet odalarına katılmasını amaçlar. Platform; sosyal medya, dating uygulaması, terapi hizmeti veya acil yardım servisi olarak tasarlanmamıştır.",
      },
      {
        title: "Profesyonel destek değildir",
        text:
          "Sevora, psikolojik danışmanlık, tıbbi destek, terapi veya kriz müdahalesi sağlamaz. Acil bir durumda kullanıcıların yerel acil yardım hatlarına, sağlık kuruluşlarına veya güvendikleri kişilere ulaşması gerekir.",
      },
      {
        title: "Kullanıcı sorumluluğu",
        text:
          "Kullanıcılar, odalarda saygılı davranmak, başkalarını rahatsız etmemek, kişisel bilgi istememek ve topluluk kurallarına uygun hareket etmekle sorumludur.",
      },
      {
        title: "Anonimlik",
        text:
          "Sevora anonimliği kullanıcı güvenliği ve rahatlığı için sunar. Anonimlik, başkalarına zarar verme, taciz etme, manipüle etme veya kuralları ihlal etme hakkı vermez.",
      },
      {
        title: "Kötüye kullanım",
        text:
          "Hakaret, tehdit, taciz, cinsel içerik, spam, kişisel bilgi baskısı, dolandırıcılık ve benzeri davranışlar yasaktır. Sevora bu tür davranışlara karşı erişimi sınırlandırabilir.",
      },
      {
        title: "Private preview",
        text:
          "Sevora şu anda geliştirme ve private preview aşamasındadır. Bazı özellikler değişebilir, kaldırılabilir veya yeni güvenlik gereksinimlerine göre yeniden tasarlanabilir.",
      },
      {
        title: "Değişiklikler",
        text:
          "Sevora, ürün geliştikçe kullanım şartlarını güncelleyebilir. Önemli değişiklikler kullanıcılara uygun yollarla bildirilecektir.",
      },
    ],
  },
  en: {
    label: "TERMS OF USE",
    title: "Sevora Terms of Use",
    intro:
      "Sevora is a private preview project designed to provide short, safe and anonymous social contact spaces. By using the platform, you accept these basic terms.",
    updated: "Last updated: 2026",
    sections: [
      {
        title: "Purpose of the service",
        text:
          "Sevora aims to let users join short anonymous rooms based on how they feel. It is not designed as social media, a dating app, therapy, medical support or emergency service.",
      },
      {
        title: "Not professional support",
        text:
          "Sevora does not provide psychological counseling, medical support, therapy or crisis intervention. In an emergency, users should contact local emergency services, healthcare providers or trusted people.",
      },
      {
        title: "User responsibility",
        text:
          "Users are responsible for being respectful, not disturbing others, not requesting personal information and following the community guidelines.",
      },
      {
        title: "Anonymity",
        text:
          "Sevora provides anonymity for comfort and safety. Anonymity does not give anyone the right to harm, harass, manipulate or violate the rules.",
      },
      {
        title: "Abuse",
        text:
          "Insults, threats, harassment, sexual content, spam, personal information pressure, scams and similar behavior are prohibited. Sevora may restrict access against such behavior.",
      },
      {
        title: "Private preview",
        text:
          "Sevora is currently in development and private preview. Features may change, be removed or redesigned according to new safety requirements.",
      },
      {
        title: "Changes",
        text:
          "Sevora may update these terms as the product evolves. Important changes will be communicated through appropriate channels.",
      },
    ],
  },
};

export default function TermsPage() {
  return <LegalPage content={content} />;
}
