import type { WebsiteLanguage } from "./website-language";

type TranslationDict = Record<string, { FR: string; AR: string }>;

const translations: TranslationDict = {
  // Navigation
  "nav.home": { FR: "Accueil", AR: "الرئيسية" },
  "nav.about": { FR: "À propos", AR: "من نحن" },
  "nav.omra": { FR: "Nos Omra", AR: "باقات العمرة" },
  "nav.contact": { FR: "Contact", AR: "اتصل بنا" },
  "nav.admin": { FR: "Administration", AR: "الإدارة" },

  // Hero
  "hero.badge": { FR: "Agence agréée · Omra & Hajj", AR: "وكالة معتمدة · عمرة وحج" },
  "hero.title": { FR: "Votre voyage spirituel commence ici", AR: "رحلتك الروحانية تبدأ من هنا" },
  "hero.subtitle": {
    FR: "نسك للخدمات السياحية vous accompagne dans l'accomplissement de votre Omra avec des programmes complets, un service premium et une équipe dévouée.",
    AR: "نسك للخدمات السياحية ترافقكم في أداء العمرة ببرامج شاملة وخدمة متميزة وفريق متخصص.",
  },
  "hero.cta": { FR: "Découvrir nos Omra", AR: "اكتشف باقات العمرة" },
  "hero.contact": { FR: "Nous contacter", AR: "تواصل معنا" },

  // Features
  "features.title": { FR: "Pourquoi choisir Nusuk ?", AR: "لماذا تختار نسك؟" },
  "features.visa.title": { FR: "Visa garanti", AR: "تأشيرة مضمونة" },
  "features.visa.desc": {
    FR: "Traitement rapide et sécurisé de votre visa Omra via les canaux officiels.",
    AR: "معالجة سريعة وآمنة لتأشيرة العمرة عبر القنوات الرسمية.",
  },
  "features.hotel.title": { FR: "Hôtels premium", AR: "فنادق ممتازة" },
  "features.hotel.desc": {
    FR: "Hébergement 4 et 5 étoiles à proximité du Haram et de la Mosquée du Prophète.",
    AR: "إقامة 4 و 5 نجوم بالقرب من الحرم والمسجد النبوي.",
  },
  "features.guide.title": { FR: "Accompagnement", AR: "مرافقة دينية" },
  "features.guide.desc": {
    FR: "Guides religieux expérimentés pour vous accompagner à chaque étape.",
    AR: "مرشدون دينيون ذوو خبرة لمرافقتكم في كل خطوة.",
  },
  "features.support.title": { FR: "Support 24/7", AR: "دعم على مدار الساعة" },
  "features.support.desc": {
    FR: "Une équipe disponible avant, pendant et après votre voyage.",
    AR: "فريق متاح قبل وأثناء وبعد رحلتكم.",
  },

  // Omra
  "omra.title": { FR: "Nos programmes Omra", AR: "برامج العمرة" },
  "omra.subtitle": {
    FR: "Des formules adaptées à tous les budgets pour vivre une expérience inoubliable.",
    AR: "باقات تناسب جميع الميزانيات لتجربة لا تُنسى.",
  },
  "omra.from": { FR: "À partir de", AR: "ابتداءً من" },
  "omra.days": { FR: "jours", AR: "يوم" },
  "omra.departure": { FR: "Départ", AR: "المغادرة" },
  "omra.places": { FR: "places restantes", AR: "مقاعد متبقية" },
  "omra.viewDetails": { FR: "Voir les détails", AR: "عرض التفاصيل" },
  "omra.book": { FR: "Réserver maintenant", AR: "احجز الآن" },
  "omra.includes": { FR: "Le programme inclut", AR: "البرنامج يشمل" },
  "omra.hotels": { FR: "Hébergement", AR: "الإقامة" },
  "omra.makkah": { FR: "Makkah", AR: "مكة المكرمة" },
  "omra.madinah": { FR: "Madinah", AR: "المدينة المنورة" },
  "omra.duration": { FR: "Durée", AR: "المدة" },
  "omra.status.available": { FR: "Disponible", AR: "متاح" },
  "omra.status.full": { FR: "Complet", AR: "مكتمل" },
  "omra.status.closed": { FR: "Fermé", AR: "مغلق" },
  "omra.featured": { FR: "Populaire", AR: "الأكثر طلباً" },
  "omra.all": { FR: "Toutes les Omra", AR: "جميع الباقات" },

  // About
  "about.title": { FR: "À propos de Nusuk", AR: "عن نسك" },
  "about.subtitle": {
    FR: "نسك للخدمات السياحية — Votre partenaire de confiance pour l'Omra et le Hajj",
    AR: "نسك للخدمات السياحية — شريككم الموثوق للعمرة والحج",
  },
  "about.story.title": { FR: "Notre histoire", AR: "قصتنا" },
  "about.story.p1": {
    FR: "Basée à Bardo, Tunis, Nusuk — نسك للخدمات السياحية est une agence de voyage tunisienne spécialisée dans l'Omra et le Hajj.",
    AR: "تأسست نسك بشغف لخدمة الحجاج، وهي وكالة سفر متخصصة في تنظيم الرحلات الروحانية إلى الأماكن المقدسة في الإسلام. مهمتنا جعل أداء العمرة في متناول الجميع، بكل طمأنينة وتجربة لا تُنسى.",
  },
  "about.story.p2": {
    FR: "Depuis la Tunisie, nous accompagnons des milliers de pèlerins tunisiens vers Makkah et Madinah avec visa, vols, hôtels premium et guides expérimentés.",
    AR: "من تونس، رافقنا آلاف الحجاج التونسيين إلى مكة والمدينة ببرامج شاملة: تأشيرة، طيران، فنادق ممتازة ومرشدين ذوي خبرة.",
  },
  "about.values.title": { FR: "Nos valeurs", AR: "قيمنا" },
  "about.values.trust": { FR: "Confiance", AR: "الثقة" },
  "about.values.trust.desc": {
    FR: "Transparence totale dans nos tarifs et nos services.",
    AR: "شفافية كاملة في أسعارنا وخدماتنا.",
  },
  "about.values.quality": { FR: "Qualité", AR: "الجودة" },
  "about.values.quality.desc": {
    FR: "Des partenaires sélectionnés avec soin pour votre confort.",
    AR: "شركاء مختارون بعناية لراحتكم.",
  },
  "about.values.devotion": { FR: "Dévotion", AR: "الإخلاص" },
  "about.values.devotion.desc": {
    FR: "Chaque voyage est préparé avec amour et respect.",
    AR: "كل رحلة تُعد بمحبة واحترام.",
  },
  "about.stats.pilgrims": { FR: "Pèlerins accompagnés", AR: "حاج تمت مرافقته" },
  "about.stats.years": { FR: "Années d'expérience", AR: "سنوات خبرة" },
  "about.stats.programs": { FR: "Programmes Omra", AR: "برنامج عمرة" },
  "about.stats.satisfaction": { FR: "Satisfaction client", AR: "رضا العملاء" },

  // Trust badges
  "trust.licensed": { FR: "Agence agréée", AR: "وكالة معتمدة" },
  "trust.licensed.desc": { FR: "Licence officielle Omra & Hajj", AR: "ترخيص رسمي للعمرة والحج" },
  "trust.visa": { FR: "Visa garanti", AR: "تأشيرة مضمونة" },
  "trust.visa.desc": { FR: "Traitement via Nusuk officiel", AR: "معالجة عبر نسك الرسمي" },
  "trust.pilgrims": { FR: "5000+ pèlerins", AR: "5000+ حاج" },
  "trust.pilgrims.desc": { FR: "Accompagnés avec succès", AR: "تمت مرافقتهم بنجاح" },
  "trust.support": { FR: "Support 24/7", AR: "دعم 24/7" },
  "trust.support.desc": { FR: "Avant, pendant et après", AR: "قبل وأثناء وبعد الرحلة" },

  // Sacred places
  "sacred.badge": { FR: "Lieux Saints", AR: "الأماكن المقدسة" },
  "sacred.title": { FR: "Makkah, Madinah & la Kaaba", AR: "مكة والمدينة والكعبة" },
  "sacred.subtitle": {
    FR: "Découvrez les destinations sacrées que nos programmes vous permettent de visiter en toute sérénité.",
    AR: "اكتشفوا الوجهات المقدسة التي تتيحها برامجنا بكل طمأنينة.",
  },
  "sacred.kaaba": { FR: "La Sainte Kaaba", AR: "الكعبة المشرفة" },
  "sacred.kaaba.desc": {
    FR: "Qibla des musulmans et cœur spirituel de l'Islam à Makkah Al-Mukarrama.",
    AR: "قبلة المسلمين وقلب الإسلام الروحاني في مكة المكرمة.",
  },
  "sacred.makkah": { FR: "Makkah Al-Mukarrama", AR: "مكة المكرمة" },
  "sacred.makkah.desc": {
    FR: "La ville sainte où se déroulent les rites de l'Omra et du Hajj.",
    AR: "المدينة المقدسة حيث تُؤدى مناسك العمرة والحج.",
  },
  "sacred.madinah": { FR: "Madinah Al-Munawwara", AR: "المدينة المنورة" },
  "sacred.madinah.desc": {
    FR: "Visitez la Mosquée du Prophète ﷺ et la Rawdah Sharifah.",
    AR: "زوروا المسجد النبوي الشريف والروضة الشريفة.",
  },
  "sacred.tawaf": { FR: "Tawaf & Sa'i", AR: "الطواف والسعي" },
  "sacred.tawaf.desc": {
    FR: "Accomplissez les rites sacrés avec nos guides expérimentés.",
    AR: "أدوا المناسك المقدسة مع مرشدينا ذوي الخبرة.",
  },

  // Contact
  "contact.title": { FR: "Contactez-nous", AR: "تواصل معنا" },
  "contact.subtitle": {
    FR: "Notre équipe est à votre disposition pour répondre à toutes vos questions.",
    AR: "فريقنا متاح للإجابة على جميع استفساراتكم.",
  },
  "contact.name": { FR: "Nom complet", AR: "الاسم الكامل" },
  "contact.email": { FR: "Email", AR: "البريد الإلكتروني" },
  "contact.phone": { FR: "Téléphone", AR: "الهاتف" },
  "contact.message": { FR: "Message", AR: "الرسالة" },
  "contact.send": { FR: "Envoyer le message", AR: "إرسال الرسالة" },
  "contact.address": { FR: "Adresse", AR: "العنوان" },
  "contact.hours": { FR: "Horaires", AR: "ساعات العمل" },
  "contact.hours.value": { FR: "Lun - Sam : 9h - 18h", AR: "الإثنين - السبت: 9ص - 6م" },
  "contact.success": {
    FR: "Merci ! Votre message a été envoyé. Nous vous répondrons rapidement.",
    AR: "شكراً! تم إرسال رسالتكم. سنتواصل معكم قريباً.",
  },

  // Footer
  "footer.tagline": {
    FR: "Votre partenaire de confiance pour l'Omra et le Hajj",
    AR: "شريككم الموثوق للعمرة والحج",
  },
  "footer.links": { FR: "Liens rapides", AR: "روابط سريعة" },
  "footer.contact": { FR: "Contact", AR: "تواصل" },
  "footer.rights": { FR: "Tous droits réservés", AR: "جميع الحقوق محفوظة" },
  "footer.follow": { FR: "Suivez-nous", AR: "تابعونا" },

  // CTA
  "cta.title": { FR: "Prêt pour votre Omra ?", AR: "مستعد لعمرتك؟" },
  "cta.subtitle": {
    FR: "Contactez-nous dès aujourd'hui pour réserver votre place.",
    AR: "تواصل معنا اليوم لحجز مقعدك.",
  },
  "cta.button": { FR: "Réserver maintenant", AR: "احجز الآن" },

  // Testimonials
  "testimonials.title": { FR: "Ce que disent nos clients", AR: "ماذا يقول عملاؤنا" },
};

export function wt(lang: WebsiteLanguage, key: string): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang];
}

export function wtField<T extends Record<string, unknown>>(
  lang: WebsiteLanguage,
  obj: T,
  frKey: keyof T,
  arKey: keyof T,
): string {
  const value = lang === "AR" ? obj[arKey] : obj[frKey];
  return typeof value === "string" ? value : String(value ?? "");
}

export function wtList<T extends Record<string, unknown>>(
  lang: WebsiteLanguage,
  obj: T,
  frKey: keyof T,
  arKey: keyof T,
): string[] {
  const value = lang === "AR" ? obj[arKey] : obj[frKey];
  return Array.isArray(value) ? (value as string[]) : [];
}
