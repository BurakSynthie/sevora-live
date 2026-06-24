import LegalPage from "../../components/LegalPage";

const content = {
  tr: {
    label: "TOPLULUK KURALLARI",
    title: "Sevora Topluluk Kuralları",
    intro:
      "Sevora’nın amacı insanları yormadan, zorlamadan ve güvensiz hissettirmeden kısa süreli sosyal temas kurmalarına yardımcı olmaktır. Bu yüzden topluluk kuralları ürünün merkezindedir.",
    updated: "Son güncelleme: 2026",
    sections: [
      {
        title: "Saygılı konuş",
        text:
          "Odada bulunan herkes farklı bir ruh haliyle gelmiş olabilir. Hakaret, küçümseme, alay etme, kışkırtma veya aşağılayıcı dil kullanımı kabul edilmez.",
      },
      {
        title: "Kişisel bilgi isteme",
        text:
          "Telefon numarası, adres, sosyal medya hesabı, okul, iş yeri veya benzeri kişisel bilgileri istemek ya da paylaşmaya zorlamak yasaktır.",
      },
      {
        title: "Taciz ve baskı yok",
        text:
          "Israrlı mesajlar, romantik veya cinsel baskı, rahatsız edici iltifatlar, manipülasyon ve sınır ihlali Sevora’da kabul edilmez.",
      },
      {
        title: "Güvenli bağlantı",
        text:
          "Bir kişiyle sohbeti sürdürmek yalnızca karşılıklı onayla mümkün olur. Tek taraflı bağlantı, takip veya özel mesaj baskısı yapılamaz.",
      },
      {
        title: "Ağır kriz durumları",
        text:
          "Sevora profesyonel destek platformu değildir. Kendine veya başkasına zarar verme riski olan durumlarda acil yardım hatları, sağlık kuruluşları veya güvenilir kişilerle iletişime geçilmelidir.",
      },
      {
        title: "Spam ve reklam",
        text:
          "Ürün, hizmet, link, sosyal medya hesabı veya başka platformların reklamını yapmak, insanları dışarı yönlendirmek veya spam göndermek yasaktır.",
      },
      {
        title: "Şikayet sistemi",
        text:
          "Kuralları ihlal eden kullanıcılar şikayet edilebilir, engellenebilir veya platformdan uzaklaştırılabilir. Amaç cezalandırmak değil, güvenli ortamı korumaktır.",
      },
    ],
  },
  en: {
    label: "COMMUNITY GUIDELINES",
    title: "Sevora Community Guidelines",
    intro:
      "Sevora aims to help people create short social contact without pressure, fatigue or unsafe experiences. Community rules are therefore at the center of the product.",
    updated: "Last updated: 2026",
    sections: [
      {
        title: "Speak respectfully",
        text:
          "Everyone in a room may arrive with a different emotional state. Insults, mocking, belittling, provoking or degrading language are not allowed.",
      },
      {
        title: "Do not request personal information",
        text:
          "Asking for or pressuring someone to share phone numbers, addresses, social media accounts, school, workplace or similar personal information is prohibited.",
      },
      {
        title: "No harassment or pressure",
        text:
          "Persistent messages, romantic or sexual pressure, uncomfortable compliments, manipulation and boundary violations are not accepted on Sevora.",
      },
      {
        title: "Safe connection",
        text:
          "Continuing a conversation with someone is possible only with mutual consent. One-sided connection, following or private message pressure is not allowed.",
      },
      {
        title: "Severe crisis situations",
        text:
          "Sevora is not a professional support platform. In situations involving risk of harm to oneself or others, emergency services, healthcare providers or trusted people should be contacted.",
      },
      {
        title: "Spam and advertising",
        text:
          "Promoting products, services, links, social media accounts or other platforms, or sending spam, is prohibited.",
      },
      {
        title: "Reporting system",
        text:
          "Users who violate the rules may be reported, blocked or removed from the platform. The goal is not punishment, but protecting a safe environment.",
      },
    ],
  },
};

export default function CommunityPage() {
  return <LegalPage content={content} />;
}
