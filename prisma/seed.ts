import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.pilgrimPayment.deleteMany();
  await prisma.pilgrim.deleteMany();
  await prisma.omraPackage.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.statCounter.deleteMany();
  await prisma.featureBlock.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.videoBlock.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.promoBanner.deleteMany();

  await prisma.agencySettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      nameFr: "Nusuk Services Touristiques",
      nameAr: "نسك للخدمات السياحية",
      email: "contact@nusuk-tn.com",
      phone: "+216 71 000 000",
      addressFr: "Bardo, Tunis, Tunisie",
      addressAr: "باردو، تونس، تونس",
      hoursFr: "Lun - Sam : 9h - 18h",
      hoursAr: "الإثنين - السبت: 9ص - 6م",
      facebookUrl: "https://www.facebook.com/profile.php?id=61565876218155",
      taglineFr: "Votre partenaire de confiance pour l'Omra et le Hajj",
      taglineAr: "شريككم الموثوق للعمرة والحج",
      logoUrl: "/logo.jpg",
      primaryColor: "#111111",
      accentColor: "#c87941",
      backgroundColor: "#ffffff",
    },
    update: {
      logoUrl: "/logo.jpg",
      primaryColor: "#111111",
      accentColor: "#c87941",
      backgroundColor: "#ffffff",
    },
  });

  const omraRamadan = await prisma.omraPackage.create({
    data: {
      slug: "omra-ramadan-2026",
      titleFr: "Omra Ramadan 2026",
      titleAr: "عمرة رمضان 2026",
      descriptionFr:
        "Vivez une expérience spirituelle unique pendant le mois sacré de Ramadan. Programme complet avec hôtels 5 étoiles proches du Haram, accompagnement religieux et transferts VIP.",
      descriptionAr:
        "عيش تجربة روحانية فريدة خلال شهر رمضان المبارك. برنامج كامل مع فنادق 5 نجوم قريبة من الحرم، مرافقة دينية ونقل VIP.",
      price: 8500,
      currency: "TND",
      durationDays: 15,
      departureDate: new Date("2026-02-20"),
      returnDate: new Date("2026-03-07"),
      hotelMakkah: "Swissôtel Al Maqam — 200m du Haram",
      hotelMadinah: "Pullman Zamzam Madina — face à la Mosquée",
      includesFr: [
        "Vol aller-retour Tunis — Jeddah",
        "Visa Omra",
        "Hébergement 5 étoiles",
        "Transport VIP Makkah — Madinah",
        "Accompagnateur religieux",
        "Petit-déjeuner et dîner",
        "Assurance voyage",
      ],
      includesAr: [
        "تذكرة طيران ذهاب وإياب تونس — جدة",
        "تأشيرة العمرة",
        "إقامة 5 نجوم",
        "نقل VIP مكة — المدينة",
        "مرافق ديني",
        "فطور وعشاء",
        "تأمين السفر",
      ],
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=800&q=80",
      status: "available",
      maxPilgrims: 45,
      featured: true,
      guideFr: "Sheikh Ahmed Ben Ali",
      guideAr: "الشيخ أحمد بن علي",
      guidePhone: "+216 71 111 222",
    },
  });

  const omraEco = await prisma.omraPackage.create({
    data: {
      slug: "omra-economique",
      titleFr: "Omra Économique",
      titleAr: "عمرة اقتصادية",
      descriptionFr:
        "Formule accessible pour accomplir votre Omra dans les meilleures conditions. Hôtels 4 étoiles, vol direct et accompagnement complet à prix abordable.",
      descriptionAr:
        "باقة في متناول الجميع لأداء العمرة في أفضل الظروف. فنادق 4 نجوم، رحلة مباشرة ومرافقة كاملة بسعر مناسب.",
      price: 5800,
      currency: "TND",
      durationDays: 10,
      departureDate: new Date("2026-03-15"),
      returnDate: new Date("2026-03-25"),
      hotelMakkah: "Mövenpick Hajar Tower — 500m du Haram",
      hotelMadinah: "Dar Al Eiman Madinah",
      includesFr: [
        "Vol aller-retour",
        "Visa Omra",
        "Hébergement 4 étoiles",
        "Transport inter-villes",
        "Accompagnateur",
        "Petit-déjeuner",
      ],
      includesAr: [
        "تذكرة طيران ذهاب وإياب",
        "تأشيرة العمرة",
        "إقامة 4 نجوم",
        "نقل بين المدن",
        "مرافق",
        "فطور",
      ],
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
      status: "available",
      maxPilgrims: 60,
      featured: true,
      guideFr: "Sheikh Karim Trabelsi",
      guideAr: "الشيخ كريم الترابلسي",
      guidePhone: "+216 98 333 444",
    },
  });

  await prisma.omraPackage.create({
    data: {
      slug: "omra-vip-luxe",
      titleFr: "Omra VIP Luxe",
      titleAr: "عمرة VIP فاخرة",
      descriptionFr:
        "Le summum du confort et de la spiritualité. Suites avec vue sur le Haram, service concierge 24h/24, guide privé et accès prioritaire aux sites sacrés.",
      descriptionAr:
        "قمة الراحة والروحانية. أجنحة بإطلالة على الحرم، خدمة كونسierge على مدار 24 ساعة، دليل خاص ووصول أولوي للمواقع المقدسة.",
      price: 14500,
      currency: "TND",
      durationDays: 12,
      departureDate: new Date("2026-04-01"),
      returnDate: new Date("2026-04-13"),
      hotelMakkah: "Fairmont Makkah Clock Royal Tower — vue Haram",
      hotelMadinah: "The Oberoi Madina — face Haram Nabawi",
      includesFr: [
        "Vol business class",
        "Visa express",
        "Suite 5 étoiles vue Haram",
        "Chauffeur privé",
        "Guide religieux privé",
        "Pension complète",
        "Assurance premium",
        "Accès Rawdah prioritaire",
      ],
      includesAr: [
        "تذكرة درجة رجال الأعمال",
        "تأشيرة سريعة",
        "جناح 5 نجوم بإطلالة على الحرم",
        "سائق خاص",
        "دليل ديني خاص",
        "إقامة كاملة",
        "تأمين ممتاز",
        "وصول أولوي للروضة الشريفة",
      ],
      image: "https://images.unsplash.com/photo-1542816416-0974c7a77656?w=800&q=80",
      status: "available",
      maxPilgrims: 15,
      featured: false,
    },
  });

  await prisma.omraPackage.create({
    data: {
      slug: "omra-famille",
      titleFr: "Omra Famille",
      titleAr: "عمرة العائلة",
      descriptionFr:
        "Programme spécialement conçu pour les familles avec enfants. Chambres communicantes, activités éducatives et horaires adaptés pour un voyage serein en famille.",
      descriptionAr:
        "برنامج مصمم خصيصاً للعائلات مع الأطفال. غرف متصلة، أنشطة تعليمية ومواعيد مناسبة لرحلة هادئة مع العائلة.",
      price: 7200,
      currency: "TND",
      durationDays: 12,
      departureDate: new Date("2026-05-10"),
      returnDate: new Date("2026-05-22"),
      hotelMakkah: "Anjum Hotel Makkah — chambres familiales",
      hotelMadinah: "Shaza Al Madina",
      includesFr: [
        "Vol aller-retour",
        "Visa Omra",
        "Chambres familiales",
        "Transport adapté",
        "Accompagnateur familles",
        "Pension complète",
        "Assurance voyage",
      ],
      includesAr: [
        "تذكرة طيران ذهاب وإياب",
        "تأشيرة العمرة",
        "غرف عائلية",
        "نقل مناسب",
        "مرافق للعائلات",
        "إقامة كاملة",
        "تأمين السفر",
      ],
      image: "https://images.unsplash.com/photo-1519748172191-a2951f772315?w=800&q=80",
      status: "available",
      maxPilgrims: 40,
      featured: false,
    },
  });

  const ahmed = await prisma.pilgrim.create({
    data: {
      firstName: "Ahmed",
      lastName: "Benali",
      firstNameAr: "أحمد",
      lastNameAr: "بن علي",
      email: "ahmed.benali@email.com",
      phone: "+216 20 123 456",
      dateOfBirth: new Date("1985-03-15"),
      passportNumber: "AB1234567",
      passportExpiry: new Date("2028-06-20"),
      passportIssueDate: new Date("2023-06-21"),
      passportIssuePlace: "Tunis",
      photoUrl: "https://i.pravatar.cc/150?u=ahmed",
      passportImageUrl: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=400&q=80",
      omraId: omraRamadan.id,
      status: "confirmed",
      emergencyContact: "Fatima Benali",
      emergencyPhone: "+216 20 987 654",
      notes: "Chambre double avec épouse",
    },
  });

  await prisma.pilgrimPayment.createMany({
    data: [
      { pilgrimId: ahmed.id, amount: 4000, note: "1ère tranche", paidAt: new Date("2025-11-01") },
      { pilgrimId: ahmed.id, amount: 4500, note: "Solde", paidAt: new Date("2026-01-15") },
    ],
  });

  const fatima = await prisma.pilgrim.create({
    data: {
      firstName: "Fatima",
      lastName: "Benali",
      firstNameAr: "فاطمة",
      lastNameAr: "بن علي",
      email: "fatima.benali@email.com",
      phone: "+216 555 123 457",
      dateOfBirth: new Date("1988-07-22"),
      passportNumber: "AB1234568",
      passportExpiry: new Date("2029-01-15"),
      passportIssueDate: new Date("2024-01-16"),
      passportIssuePlace: "Tunis",
      photoUrl: "https://i.pravatar.cc/150?u=fatima",
      passportImageUrl: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=400&q=80",
      omraId: omraRamadan.id,
      status: "confirmed",
      emergencyContact: "Ahmed Benali",
      emergencyPhone: "+216 555 123 456",
    },
  });

  await prisma.pilgrimPayment.create({
    data: { pilgrimId: fatima.id, amount: 3000, note: "Acompte", paidAt: new Date("2025-12-01") },
  });

  const karim = await prisma.pilgrim.create({
    data: {
      firstName: "Karim",
      lastName: "Mansouri",
      firstNameAr: "كريم",
      lastNameAr: "منصوري",
      email: "karim.m@email.com",
      phone: "+216 22 234 567",
      dateOfBirth: new Date("1975-11-08"),
      passportNumber: "CD9876543",
      passportExpiry: new Date("2027-09-30"),
      passportIssueDate: new Date("2022-10-01"),
      passportIssuePlace: "Sfax",
      photoUrl: "https://i.pravatar.cc/150?u=karim",
      passportImageUrl: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=400&q=80",
      omraId: omraEco.id,
      status: "visa_pending",
      emergencyContact: "Salima Mansouri",
      emergencyPhone: "+216 661 876 543",
    },
  });

  await prisma.pilgrimPayment.create({
    data: { pilgrimId: karim.id, amount: 5800, note: "Paiement complet", paidAt: new Date("2026-02-01") },
  });

  // ── CMS: Hero carousel ──
  await prisma.heroSlide.createMany({
    data: [
      {
        badgeFr: "نسك للخدمات السياحية",
        badgeAr: "نسك للخدمات السياحية",
        titleFr: "Votre voyage spirituel commence ici",
        titleAr: "رحلتكم الروحانية تبدأ من هنا",
        subtitleFr:
          "Agence agréée spécialisée Omra & Hajj. Programmes complets depuis la Tunisie vers les Lieux Saints avec accompagnement premium.",
          subtitleAr:
          "وكالة معتمدة متخصصة في العمرة والحج. برامج شاملة من تونس إلى الأماكن المقدسة مع مرافقة متميزة.",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=1920&q=85",
        ctaLabelFr: "Nos Omra",
        ctaLabelAr: "باقات العمرة",
        ctaLink: "/omra",
        sortOrder: 0,
      },
      {
        badgeFr: "Ramadan 2026",
        badgeAr: "رمضان 2026",
        titleFr: "Omra Ramadan — Une expérience unique",
        titleAr: "عمرة رمضان — تجربة فريدة",
        subtitleFr:
          "Vivez le mois sacré à Makkah et Madinah. Hôtels proches du Haram, visa garanti et guide religieux dédié.",
        subtitleAr: "عيشوا الشهر الفضيل في مكة والمدينة. فنادق قريبة من الحرم وتأشيرة مضمونة ومرشد ديني.",
        image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&q=85",
        ctaLabelFr: "Réserver",
        ctaLabelAr: "احجز الآن",
        ctaLink: "/omra/omra-ramadan-2026",
        sortOrder: 1,
      },
      {
        badgeFr: "Offre VIP",
        badgeAr: "عرض VIP",
        titleFr: "Confort & spiritualité premium",
        titleAr: "راحة وروحانية بمستوى VIP",
        subtitleFr:
          "Suites vue Haram, transport privé et service concierge 24h/24 pour une Omra sans souci.",
        subtitleAr: "أجنحة بإطلالة على الحرم ونقل خاص وخدمة على مدار الساعة لعمرة بدون قلق.",
        image: "https://images.unsplash.com/photo-1542816416-0974c7a77656?w=1920&q=85",
        videoUrl: "https://www.youtube.com/watch?v=ImQ8gLzKQns",
        ctaLabelFr: "Découvrir VIP",
        ctaLabelAr: "اكتشف VIP",
        ctaLink: "/omra/omra-vip-luxe",
        sortOrder: 2,
      },
      {
        badgeFr: "La Sainte Kaaba",
        badgeAr: "الكعبة المشرفة",
        titleFr: "Makkah — Qibla des croyants",
        titleAr: "مكة — قبلة المؤمنين",
        subtitleFr:
          "Vivez l'émotion du Tawaf autour de la Kaaba avec un accompagnement professionnel et spirituel.",
        subtitleAr: "عيشوا مشاعر الطواف حول الكعبة مع مرافقة مهنية وروحانية.",
        image: "https://images.unsplash.com/photo-1633542116865-8a88a83a77c4?w=1920&q=85",
        ctaLabelFr: "Nos programmes",
        ctaLabelAr: "برامجنا",
        ctaLink: "/omra",
        sortOrder: 3,
      },
    ],
  });

  await prisma.statCounter.createMany({
    data: [
      { value: "10", suffix: "+", labelFr: "Années d'expérience", labelAr: "سنوات خبرة", sortOrder: 0 },
      { value: "5000", suffix: "+", labelFr: "Pèlerins accompagnés", labelAr: "حاج تمت مرافقته", sortOrder: 1 },
      { value: "20", suffix: "+", labelFr: "Programmes Omra", labelAr: "برنامج عمرة", sortOrder: 2 },
      { value: "98", suffix: "%", labelFr: "Satisfaction client", labelAr: "رضا العملاء", sortOrder: 3 },
    ],
  });

  await prisma.featureBlock.createMany({
    data: [
      {
        icon: "shield",
        titleFr: "Visa Omra garanti",
        titleAr: "تأشيرة عمرة مضمونة",
        descFr: "Traitement via les canaux officiels Nusuk avec suivi complet de votre dossier.",
        descAr: "معالجة عبر القنوات الرسمية لنسك مع متابعة كاملة لملفكم.",
        sortOrder: 0,
      },
      {
        icon: "hotel",
        titleFr: "Hôtels premium",
        titleAr: "فنادق ممتازة",
        descFr: "Hébergement 4 et 5 étoiles à proximité du Haram et de la Mosquée du Prophète ﷺ.",
        descAr: "إقامة 4 و5 نجوم بالقرب من الحرم والمسجد النبوي.",
        sortOrder: 1,
      },
      {
        icon: "award",
        titleFr: "Guides expérimentés",
        titleAr: "مرشدون ذوو خبرة",
        descFr: "Accompagnement religieux et logistique à chaque étape de votre pèlerinage.",
        descAr: "مرافقة دينية ولوجستية في كل خطوة من رحلتكم.",
        sortOrder: 2,
      },
      {
        icon: "support",
        titleFr: "Support 24/7",
        titleAr: "دعم على مدار الساعة",
        descFr: "Une équipe disponible avant, pendant et après votre voyage spirituel.",
        descAr: "فريق متاح قبل وأثناء وبعد رحلتكم الروحانية.",
        sortOrder: 3,
      },
    ],
  });

  await prisma.destination.createMany({
    data: [
      {
        nameFr: "Makkah Al-Mukarrama",
        nameAr: "مكة المكرمة",
        descFr: "La ville sainte et le Haram",
        descAr: "المدينة المقدسة والحرم",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=600&q=80",
        tourCount: 8,
        link: "/omra",
        sortOrder: 0,
      },
      {
        nameFr: "Madinah Al-Munawwara",
        nameAr: "المدينة المنورة",
        descFr: "La Mosquée du Prophète ﷺ",
        descAr: "المسجد النبوي الشريف",
        image: "https://images.unsplash.com/photo-1586724376265-3a60a8939a91?w=600&q=80",
        tourCount: 8,
        link: "/omra",
        sortOrder: 1,
      },
      {
        nameFr: "Jeddah",
        nameAr: "جدة",
        descFr: "Porte d'entrée du Royaume",
        descAr: "بوابة المملكة",
        image: "https://images.unsplash.com/photo-1519748172191-a2951f772315?w=600&q=80",
        tourCount: 4,
        sortOrder: 2,
      },
      {
        nameFr: "Mont Arafat",
        nameAr: "جبل عرفات",
        descFr: "Lieu saint du Hajj",
        descAr: "مشعر عرفات المقدس",
        image: "https://images.unsplash.com/photo-1542816416-0974c7a77656?w=600&q=80",
        tourCount: 2,
        sortOrder: 3,
      },
    ],
  });

  await prisma.videoBlock.createMany({
    data: [
      {
        titleFr: "Découvrez l'expérience Nusuk",
        titleAr: "اكتشفوا تجربة نسك",
        descFr: "Visitez les Lieux Saints avec notre agence — confiance, confort et dévotion.",
        descAr: "زوروا الأماكن المقدسة مع وكالتنا — ثقة وراحة وإخلاص.",
        videoUrl: "https://www.youtube.com/embed/ImQ8gLzKQns",
        thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200&q=85",
        sortOrder: 0,
      },
      {
        titleFr: "La Kaaba — Cœur spirituel",
        titleAr: "الكعبة — القلب الروحاني",
        descFr: "Un aperçu des rites sacrés et de l'atmosphère unique de Makkah Al-Mukarrama.",
        descAr: "لمحة عن المناسك المقدسة والأجواء الفريدة في مكة المكرمة.",
        videoUrl: "https://www.youtube.com/embed/0J51LqJqJqY",
        thumbnail: "https://images.unsplash.com/photo-1633542116865-8a88a83a77c4?w=1200&q=85",
        sortOrder: 1,
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        nameFr: "Mohamed Khelifi",
        nameAr: "محمد خليفي",
        locationFr: "Tunis, Tunisie",
        locationAr: "تونس",
        textFr: "Excellente agence ! Mon Omra s'est déroulée parfaitement. Équipe professionnelle et hôtels magnifiques près du Haram.",
        textAr: "وكالة ممتازة! تمت عمرتي بشكل مثالي. فريق محترف وفنادق رائعة قرب الحرم.",
        avatar: "https://i.pravatar.cc/150?u=mohamed",
        rating: 5,
        sortOrder: 0,
      },
      {
        nameFr: "Amina Benali",
        nameAr: "أمينة بن علي",
        locationFr: "Sfax, Tunisie",
        locationAr: "صفاقس",
        textFr: "Première Omra avec Nusuk — je recommande vivement. Visa rapide et accompagnement de qualité du début à la fin.",
        textAr: "عمرتي الأولى مع نسك — أنصح بشدة. تأشيرة سريعة ومرافقة ممتازة من البداية للنهاية.",
        avatar: "https://i.pravatar.cc/150?u=amina",
        rating: 5,
        sortOrder: 1,
      },
      {
        nameFr: "Youssef Mansouri",
        nameAr: "يوسف منصوري",
        locationFr: "Sousse, Tunisie",
        locationAr: "سوسة",
        textFr: "Prix transparents, service impeccable. L'équipe Nusuk a répondu à toutes mes questions avec patience.",
        textAr: "أسعار شفافة وخدمة لا تشوبها شائبة. فريق نسك أجاب على جميع استفساراتي بصبر.",
        avatar: "https://i.pravatar.cc/150?u=youssef",
        rating: 5,
        sortOrder: 2,
      },
    ],
  });

  await prisma.faqItem.createMany({
    data: [
      {
        questionFr: "Quels types de forfaits Omra propose Nusuk ?",
        questionAr: "ما أنواع باقات العمرة التي تقدمها نسك؟",
        answerFr:
          "Nusuk propose des forfaits économiques, Ramadan, VIP et famille. Chaque programme inclut visa, vol, hébergement et accompagnement.",
        answerAr: "تقدم نسك باقات اقتصادية ورمضان وVIP وعائلية. كل برنامج يشمل التأشيرة والطيران والإقامة والمرافقة.",
        sortOrder: 0,
      },
      {
        questionFr: "Comment réserver une Omra avec Nusuk ?",
        questionAr: "كيف أحجز العمرة مع نسك؟",
        answerFr:
          "Contactez-nous via le formulaire, téléphone ou Facebook. Notre équipe vous guide pour le passeport, le visa et le paiement.",
        answerAr: "تواصلوا معنا عبر النموذج أو الهاتف أو فيسبوك. فريقنا يرافقكم في الجواز والتأشيرة والدفع.",
        sortOrder: 1,
      },
      {
        questionFr: "Le visa Omra est-il inclus ?",
        questionAr: "هل تأشيرة العمرة مشمولة؟",
        answerFr: "Oui, tous nos forfaits incluent le traitement du visa Omra via les procédures officielles.",
        answerAr: "نعم، جميع باقاتنا تشمل معالجة تأشيرة العمرة عبر الإجراءات الرسمية.",
        sortOrder: 2,
      },
      {
        questionFr: "Quels documents sont nécessaires ?",
        questionAr: "ما الوثائق المطلوبة؟",
        answerFr: "Passeport valide 6 mois minimum, photos biométriques, certificat de vaccination et formulaire d'inscription.",
        answerAr: "جواز سفر صالح 6 أشهر على الأقل، صور بيومترية، شهادة تطعيم واستمارة التسجيل.",
        sortOrder: 3,
      },
    ],
  });

  const galleryItems = [
    { image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=800&q=85", captionFr: "La Sainte Kaaba", captionAr: "الكعبة المشرفة" },
    { image: "https://images.unsplash.com/photo-1633542116865-8a88a83a77c4?w=800&q=85", captionFr: "Makkah de nuit", captionAr: "مكة ليلاً" },
    { image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=85", captionFr: "Vue aérienne Makkah", captionAr: "مكة من الأعلى" },
    { image: "https://images.unsplash.com/photo-1586724376265-3a60a8939a91?w=800&q=85", captionFr: "Mosquée du Prophète ﷺ", captionAr: "المسجد النبوي" },
    { image: "https://images.unsplash.com/photo-1542816416-0974c7a77656?w=800&q=85", captionFr: "Tawaf au Haram", captionAr: "الطواف في الحرم" },
    { image: "https://images.unsplash.com/photo-1519748172191-a2951f772315?w=800&q=85", captionFr: "Pèlerins en prière", captionAr: "حجاج في صلاة" },
    { image: "https://images.unsplash.com/photo-1609590248906-f767b9d3d9b4?w=800&q=85", captionFr: "Architecture sacrée", captionAr: "عمارة مقدسة" },
    { image: "https://images.unsplash.com/photo-1578895101408-9c5ccf79b168?w=800&q=85", captionFr: "Jeddah — Porte du Royaume", captionAr: "جدة — بوابة المملكة" },
    { image: "https://images.unsplash.com/photo-1470100660099-472105b4c0c3?w=800&q=85", captionFr: "Madinah illuminée", captionAr: "المدينة المنورة" },
    { image: "https://images.unsplash.com/photo-1437844909711-496aad6d8960?w=800&q=85", captionFr: "Spiritualité & dévotion", captionAr: "روحانية وإخلاص" },
    { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=85", captionFr: "Paysages sacrés", captionAr: "مناظر مقدسة" },
    { image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=800&q=85&sat=-20", captionFr: "Omra avec Nusuk", captionAr: "عمرة مع نسك" },
  ];
  await prisma.galleryImage.createMany({
    data: galleryItems.map((item, i) => ({ ...item, sortOrder: i })),
  });

  await prisma.achievement.createMany({
    data: [
      {
        titleFr: "Agence de confiance",
        titleAr: "وكالة موثوقة",
        orgFr: "Pèlerins tunisiens",
        orgAr: "الحجاج التونسيين",
        year: "2024",
        sortOrder: 0,
      },
      {
        titleFr: "Excellence Omra",
        titleAr: "تميز في العمرة",
        orgFr: "Services touristiques",
        orgAr: "الخدمات السياحية",
        year: "2025",
        sortOrder: 1,
      },
      {
        titleFr: "Satisfaction client",
        titleAr: "رضا العملاء",
        orgFr: "98% de recommandation",
        orgAr: "98% توصية",
        year: "2025",
        sortOrder: 2,
      },
    ],
  });

  await prisma.promoBanner.createMany({
    data: [
      {
        titleFr: "Prêt pour votre Omra ?",
        titleAr: "مستعد لعمرتك؟",
        subtitleFr: "Réservez dès aujourd'hui — places limitées pour Ramadan 2026",
        subtitleAr: "احجز اليوم — مقاعد محدودة لرمضان 2026",
        ctaFr: "Nous contacter",
        ctaAr: "تواصل معنا",
        ctaLink: "/contact",
        style: "gold",
        sortOrder: 0,
      },
      {
        titleFr: "Suivez-nous sur Facebook",
        titleAr: "تابعونا على فيسبوك",
        subtitleFr: "نسك للخدمات السياحية — actualités et offres exclusives",
        subtitleAr: "نسك للخدمات السياحية — أخبار وعروض حصرية",
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=1200&q=80",
        ctaFr: "Facebook",
        ctaAr: "فيسبوك",
        ctaLink: "https://www.facebook.com/profile.php?id=61565876218155",
        style: "dark",
        sortOrder: 1,
      },
    ],
  });

  console.log("Database seeded successfully.");

  const bcrypt = await import("bcryptjs");
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@nusuk-tn.com").toLowerCase();
  const adminExists = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!adminExists) {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: "Administrateur Nusuk",
        passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "Nusuk@2026", 12),
        role: "admin",
      },
    });
    console.log(`Admin user created: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
