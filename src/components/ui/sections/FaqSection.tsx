"use client"

import React, {useState} from 'react';
import Faq from "@/components/ui/Faq";
import Link from "next/link";

import { motion } from 'framer-motion';

type LanguageCode = "en" | "tr"

const QUESTIONS = {
    en: [
        {
            title: "What services does Syntra Media offer?",
            description: "At Syntra Media, we deliver customized digital marketing services—web design, SEO, social media management, and content creation—to boost your digital presence and drive measurable business growth."
        },
        {
            title: "How do you develop a digital marketing strategy?",
            description: "Our dedicated team will assess your current digital marketing strategy and pinpoint areas for improvement. We'll also analyze your top competitors' digital marketing efforts to ensure we can help you outperform them."
        },
        {
            title: "Can you provide case studies or examples of past work?",
            description: "Absolutely! We can provide detailed case studies and examples of our past work that showcase how we've helped businesses like yours achieve their digital marketing goals. Check them out here."
        },
        {
            title: "How often will I receive updates on my project?",
            description: "You'll receive regular updates on your project through our client portal, where you can track progress, view reports, and communicate directly with our team. We keep you informed every step of the way to ensure transparency and alignment with your goals."
        },
        {
            title: "How do you handle client data and privacy?",
            description: "We take client data and privacy very seriously. Our client portal is secured with advanced encryption protocols to protect your information. We follow strict privacy policies to ensure your data is handled with the utmost care and confidentiality, ensuring that only authorized team members have access."
        },
    ],
    tr: [
        {
            title: "Syntra Media hangi hizmetleri sunuyor?",
            description: "Syntra Media olarak, dijital varlığınızı artırmak ve ölçülebilir iş büyümesi sağlamak için özelleştirilmiş dijital pazarlama hizmetleri sunuyoruz—web tasarımı, SEO, sosyal medya yönetimi ve içerik oluşturma."
        },
        {
            title: "Dijital pazarlama stratejisi nasıl geliştirilir?",
            description: "Dedike ekibimiz mevcut dijital pazarlama stratejinizi değerlendirecek ve iyileştirilmesi gereken alanları belirleyecek. Ayrıca, en büyük rakiplerinizin dijital pazarlama çabalarını analiz ederek, sizi onları geride bırakacak şekilde destekleyebileceğimizden emin olacağız."
        },
        {
            title: "Geçmiş çalışmalara ait örnekler veya vaka çalışmaları sağlayabilir misiniz?",
            description: "Kesinlikle! Geçmiş çalışmalarımızdan nasıl işletmelerinize dijital pazarlama hedeflerine ulaşmalarında nasıl yardımcı olduğumuzu gösteren detaylı vaka çalışmaları ve örnekler sağlayabiliriz. Onları buradan inceleyebilirsiniz."
        },
        {
            title: "Projeniz hakkında ne sıklıkla güncelleme alacağım?",
            description: "Projeniz hakkında düzenli güncellemeleri, ilerlemeyi takip edebileceğiniz, raporları görüntüleyebileceğiniz ve doğrudan ekibimizle iletişim kurabileceğiniz müşteri portalımız aracılığıyla alacaksınız. Sizi her adımda bilgilendirerek, şeffaflığı ve hedeflerinizle uyumu sağlamak için sizi bilgilendiriyoruz."
        },
        {
            title: "Müşteri verileri ve gizliliği nasıl ele alınıyor?",
            description: "Müşteri verileri ve gizliliğini çok ciddiye alıyoruz. Müşteri portalımız, bilgilerinizi korumak için gelişmiş şifreleme protokolleri ile güvence altına alınmıştır. Verilerinizin en iyi şekilde ve gizlilikle ele alınmasını sağlamak için katı gizlilik politikalarını takip ediyoruz ve yalnızca yetkili ekip üyelerinin erişimine izin veriyoruz."
        },
    ]
}

const FaqSection = ({locale}: {locale: string}) => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <motion.div className={"flex w-full overflow-hidden"}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className={"w-full h-full flex flex-col mx-8 lg:mx-40 my-24 gap-8"}>
                <h2 className={"font-semibold text-4xl"}>
                    {
                        locale === "en" ? (
                            <span>
                                You might have <span className={"text-primary-100"}>questions...</span>
                            </span>
                        ) : (
                            <span>
                                Siz <span className={"text-primary-100"}>sorun</span>, biz <span className={"text-primary-100"}>cevaplayalım</span>
                            </span>
                        )
                    }
                </h2>
                <div className={"flex flex-col gap-4 lg:gap-6 overflow-y-auto"}>
                    {
                        QUESTIONS[locale as LanguageCode].map((question, index) => (
                            <Faq
                                key={index}
                                title={question.title}
                                description={question.description}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))
                    }
                </div>
                <div className={"w-full flex justify-center font-light"}>
                    <p>
                        {
                            locale === "en" ? (
                                <span>
                                    If you have more questions, <Link href={"/contact"}><span className={"text-primary underline underline-offset-4"}>contact us!</span></Link>
                                </span>
                            ) : (
                                <span>
                                    Daha fazla sorunuz varsa, <Link href={"/contact"}><span className={"text-primary underline underline-offset-4"}>bize ulaşın!</span></Link>
                                </span>
                            )
                        }
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default FaqSection;