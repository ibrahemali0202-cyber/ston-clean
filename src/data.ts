import { Service, Benefit, ProcessStep, BeforeAfterItem, GalleryItem, FAQItem } from "./types";
import { BUSINESS_CONFIG } from "./config";

export const SERVICES_DATA: Service[] = [
  {
    id: "rust-removal",
    title: "הסרת חלודה ממתכת",
    description: "ניקוי חלודה ממשטחי מתכת, שערים, קונסטרוקציות, חלקי מכונות וציוד מקצועי.",
    iconName: "ShieldAlert"
  },
  {
    id: "paint-stripping",
    title: "הסרת צבע ישן",
    description: "הסרת שכבות צבע ישנות ורופפות והכנת המשטח בצורה מושלמת לצביעה מחדש או לציפוי.",
    iconName: "Paintbrush"
  },
  {
    id: "stone-concrete",
    title: "ניקוי אבן ובטון",
    description: "ניקוי לכלוך קשה, פיח, כתמים שחורים ושאריות חומרים ממשטחי אבן, בטון, חומות וקירות.",
    iconName: "Brick"
  },
  {
    id: "graffiti-removal",
    title: "ניקוי גרפיטי",
    description: "הסרת צבע, גרפיטי וכתמי דיו ממשטחים מתאימים, לאחר בדיקת סוג המשטח והתאמת שיטת הניקוי.",
    iconName: "Trash2"
  },
  {
    id: "vehicles-machinery",
    title: "ניקוי כלי רכב וחלקי מכונות",
    description: "ניקוי והכנה של חלקי רכב, שלדות, חישוקים (ג'אנטים), חלקי מכונות תעשייתיות וציוד מכני.",
    iconName: "Car"
  },
  {
    id: "surface-preparation",
    title: "הכנת משטחים לצביעה",
    description: "ניקוי והסרת שכבות ישנות והחספוס הנדרש לפני צביעה תעשייתית, שיקום או ציפוי איכותי.",
    iconName: "Sparkles"
  },
  {
    id: "industrial-equipment",
    title: "ניקוי ציוד תעשייתי",
    description: "טיפול במשטחים, חלקים מורכבים וציוד תעשייתי כבד וקל בהתאם לצורכי העבודה והמפעל.",
    iconName: "Factory"
  }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: "b1",
    title: "הסרה יעילה של חלודה וצבע ישן",
    description: "התזת חול חודרת לשכבות העמוקות ומסירה ביעילות חלודה קשה וצבע שהתייבש, מה ששום מברשת ידנית או חומר כימי לא יעשו באותה רמה."
  },
  {
    id: "b2",
    title: "הגעה לאזורים שקשה לנקות",
    description: "החול בהתזה מגיע לכל חריץ, פינה, חיבור או קימור מורכב בחלקי מתכת ועיטורים אמנותיים, ומבטיח ניקוי אחיד ומלא בכל שטח המבנה."
  },
  {
    id: "b3",
    title: "הכנת משטח אידיאלית לצביעה",
    description: "התהליך יוצר טקסטורה מיקרוסקופית מחוספסת (פרופיל חספוס) על גבי המתכת, אשר משפרת דרמטית את כושר ההידבקות של הצבע החדש ומאריכה את חייו."
  },
  {
    id: "b4",
    title: "התאמה למגוון סוגי משטחים",
    description: "העבודה מבוצעת באחריות מלאה ורק לאחר בחינת סוג המשטח (מתכת עבה, אבן, בטון) והתאמת עוצמת ההתזה וסוג חומר השחיקה המתאים."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "שולחים פרטים בוואטסאפ",
    description: "אתם שולחים לנו תמונות ברורות של המשטח, מציינים את אזור ביצוע העבודה ותיאור קצר של מה שתרצו לנקות.",
    iconName: "Send"
  },
  {
    id: 2,
    title: "בודקים ומאבחנים את המשטח",
    description: "אנחנו בוחנים את סוג המשטח, מצבו הנוכחי, שכבות הלכלוך, החלודה או הצבע שיש להסיר כדי לוודא התאמה לניקוי חול.",
    iconName: "Search"
  },
  {
    id: 3,
    title: "מתאימים את שיטת העבודה",
    description: "קובעים את אופן הניקוי, סוג חומר השחיקה (גרגרי חול, זכוכית, סיליקט וכדומה) ואת עוצמת לחץ האוויר המתאימה כדי לא לפגוע בחומר הבסיס.",
    iconName: "Sliders"
  },
  {
    id: 4,
    title: "מבצעים את הניקוי ביסודיות",
    description: "מבצעים את עבודת ההתזה בצורה יסודית ומקצועית תוך שימת לב מרבית לפרטים, עד לקבלת תוצאה נקייה, חלקה ואחידה.",
    iconName: "CheckCircle"
  }
];

export const BEFORE_AFTER_DATA: BeforeAfterItem[] = [
  {
    id: "ba-gate",
    title: "שער מתכת עם חלודה וצבע ישן",
    category: "מתכת",
    beforeImage: BUSINESS_CONFIG.images.gateBefore,
    afterImage: BUSINESS_CONFIG.images.gateAfter,
    description: "חידוש יסודי לשער ברזל ישן עם שכבות חלודה עמוקות וצבע מתקלף עד לחשיפת מתכת נקייה."
  },
  {
    id: "ba-rim",
    title: "ג'אנט / חלק רכב מכני",
    category: "ציוד וחלקים",
    beforeImage: BUSINESS_CONFIG.images.rimBefore,
    afterImage: BUSINESS_CONFIG.images.rimAfter,
    description: "ניקוי חלקים מכניים וחלקי רכב מפיח, שמן שרוף, לכלוך קשה וחלודה קלה לפני צביעה בתנור."
  },
  {
    id: "ba-iron",
    title: "צינור ברזל תעשייתי",
    category: "חלודה",
    beforeImage: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800", // Rusted pipes
    afterImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800", // Metallic pipe / industrial
    description: "הסרת שכבת קורוזיה קשה מצינור קונסטרוקציה תעשייתי לקראת טיפול מונע חלודה."
  },
  {
    id: "ba-wall",
    title: "קיר אבן ובטון ישן",
    category: "אבן ובטון",
    beforeImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800", // Dark dirty concrete
    afterImage: "https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=800", // Clean structured concrete
    description: "ניקוי והסרת פיח, כתמי מים ולכלוך שהצטבר לאורך שנים על גבי קיר חיצוני מאבן טבעית."
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    category: "מתכת",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600",
    title: "ניקוי קונסטרוקציית ברזל",
    description: "חשיפת ברזל נקי ללא חלודה לפני יישום צבע יסוד."
  },
  {
    id: "g2",
    category: "חלודה",
    image: BUSINESS_CONFIG.images.gateBefore,
    title: "הסרת חלודה קשה",
    description: "מראה שער המתכת לפני התחלת תהליך ניקוי החול."
  },
  {
    id: "g3",
    category: "צבע ישן",
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=600",
    title: "קילוף צבע ישן ממשטח",
    description: "הסרת שכבות צבע ישן לקראת צביעה חדשה וחלקה."
  },
  {
    id: "g4",
    category: "אבן ובטון",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    title: "ניקוי גרנוליט ואבן",
    description: "חידוש מראה שבילים וחומות אבן בלחץ אוויר וחול."
  },
  {
    id: "g5",
    category: "ציוד וחלקים",
    image: BUSINESS_CONFIG.images.rimAfter,
    title: "ניקוי ג'אנטים וחלקי רכב",
    description: "הסרת שאריות צבע וחלודה מג'אנט ברזל לקבלת מראה נקי."
  },
  {
    id: "g6",
    category: "הכנה לצביעה",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    title: "משטח מתכת מוכן לחלוטין",
    description: "רמת החספוס והניקיון המבוקשת לצביעת מגן איכותית."
  },
  {
    id: "g7",
    category: "מתכת",
    image: BUSINESS_CONFIG.images.gateAfter,
    title: "שער ברזל נקי מחלודה",
    description: "התוצאה לאחר התזת חול אחידה ויסודית."
  },
  {
    id: "g8",
    category: "ציוד וחלקים",
    image: BUSINESS_CONFIG.images.rimBefore,
    title: "ג'אנט רכב ישן לפני טיפול",
    description: "חלודה מפוזרת ופיח קשה על גבי החלק המכני."
  },
  {
    id: "g9",
    category: "אבן ובטון",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600",
    title: "הסרת סימוני צבע מבטון",
    description: "ניקוי פני שטח מבטון מזוהם בצבעים וחומרים תעשייתיים."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq1",
    question: "לאילו משטחים מתאים ניקוי חול?",
    answer: "השיטה יכולה להתאים למגוון משטחים כמו מתכת, אבן, בטון וחלקי ציוד. לפני העבודה יש לבדוק את סוג המשטח ומצבו הנוכחי כדי להבטיח שהוא יעמוד בלחץ ההתזה."
  },
  {
    id: "faq2",
    question: "האם ניתן להסיר חלודה וצבע ישן?",
    answer: "ניקוי בהתזה משמש במקרים רבים להסרת חלודה, צבע ישן ושכבות ציפוי אחרות, בהתאם לסוג המשטח והעבודה. זוהי השיטה היעילה ביותר לחשיפת המתכת הגולמית."
  },
  {
    id: "faq3",
    question: "האם אפשר לשלוח תמונה לקבלת הערכה?",
    answer: "כן. מומלץ לשלוח בוואטסאפ מספר תמונות ברורות של המשטח המיועד לניקוי יחד עם תיאור קצר של סוג החומר והמיקום שלו בארץ, לקבלת אבחון ראשוני והערכת מחיר מהירה."
  },
  {
    id: "faq4",
    question: "האם ניקוי חול מתאים לכל משטח?",
    answer: "לא בהכרח. יש משטחים עדינים מדי (כמו מתכות דקות במיוחד או סוגי עץ מסוימים) הדורשים שיטת ניקוי שונה, חומר שחיקה עדין יותר או עוצמת עבודה אחרת. כל פרויקט נבחן באופן מקצועי ומותאם אישית כדי לשמור על שלמות המשטח."
  },
  {
    id: "faq5",
    question: "האם ניתן להכין משטח לצביעה?",
    answer: "כן. אחת המטרות הנפוצות והחשובות ביותר של ניקוי בהתזה היא הסרת שכבות ישנות והחספוס העדין של המתכת. פעולה זו יוצרת אחיזה אופטימלית לצבע החדש ומבטיחה שהוא יישמר לאורך שנים רבות ללא קילופים."
  },
  {
    id: "faq6",
    question: "כיצד מקבלים הצעת מחיר?",
    answer: "לוחצים על אחד מכפתורי הוואטסאפ המפוזרים באתר, שולחים אלינו תמונות של העבודה, מציינים את אזור הביצוע ותיאור קצר של מה שדרוש, ואנחנו נחזור אליכם במהירות עם כל הפרטים והצעה מתאימה."
  }
];
