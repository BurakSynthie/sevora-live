import LegalPage from "../../components/LegalPage";

const content = {
  tr: {
    label: "İLETİŞİM",
    title: "Sevora ile iletişime geç",
    intro:
      "Sevora private preview aşamasında. Geri bildirim, şikayet, iş birliği veya erken erişim hakkında bizimle iletişime geçebilirsin.",
    updated: "Yanıt süresi yoğunluğa göre değişebilir.",
    sections: [
      {
        title: "Genel iletişim",
        text:
          "Sevora hakkında genel soruların, önerilerin veya geri bildirimlerin için bizimle e-posta üzerinden iletişime geçebilirsin: hello@sevora.live",
      },
      {
        title: "Güvenlik ve şikayet",
        text:
          "Platform kullanıma açıldığında rahatsız edici davranışlar, kötüye kullanım veya güvenlik bildirimleri için özel bir şikayet kanalı oluşturulacaktır.",
      },
      {
        title: "Erken erişim",
        text:
          "Sevora’yı ilk deneyen kullanıcılar arasında olmak için ana sayfadaki erken erişim formunu doldurabilirsin.",
      },
      {
        title: "İş birliği",
        text:
          "Sevora’nın sosyal iyi oluş, güvenli dijital topluluklar veya anonim sosyal deneyimler tarafında iş birliklerine açık olması planlanmaktadır.",
      },
    ],
  },
  en: {
    label: "CONTACT",
    title: "Contact Sevora",
    intro:
      "Sevora is currently in private preview. You can contact us for feedback, reports, partnerships or early access questions.",
    updated: "Response time may vary depending on volume.",
    sections: [
      {
        title: "General contact",
        text:
          "For general questions, suggestions or feedback about Sevora, you can contact us by email: hello@sevora.live",
      },
      {
        title: "Safety and reports",
        text:
          "When the platform opens, a dedicated reporting channel will be created for harmful behavior, abuse or safety concerns.",
      },
      {
        title: "Early access",
        text:
          "To be among the first users to try Sevora, you can fill out the early access form on the homepage.",
      },
      {
        title: "Partnerships",
        text:
          "Sevora plans to be open to partnerships around social well-being, safe digital communities and anonymous social experiences.",
      },
    ],
  },
};

export default function ContactPage() {
  return <LegalPage content={content} />;
}
