/**
 * קובץ הגדרות מרכזי עבור אתר התדמית של עלי איבראהים
 * 
 * Central configuration file for Ali Ibrahim - Sandblasting landing page.
 */

export const BUSINESS_CONFIG = {
  // השם המלא של העסק
  businessName: "עלי איבראהים",
  businessSubTitle: "ניקוי חול בהתזה",
  
  // מספר הוואטסאפ של העסק
  // הערה: יש להזין מספר טלפון כולל קידומת מדינה, ללא רווחים, מקפים או סימן פלוס (+)
  // לדוגמה: עבור המספר 05395629817, אם מדובר בטלפון ישראלי, נכתוב 9725395629817
  // אם מדובר במספר שכולל את קידומת המדינה כפי שהוא, נתאים אותו לכאן
  whatsappPhone: "9725395629817", 

  // הודעת ברירת מחדל לפניות כלליות מהאתר
  defaultMessage: "שלום עלי, הגעתי דרך האתר ואני מעוניין/ת לקבל הצעת מחיר לעבודת ניקוי חול. אשמח למסור פרטים נוספים.",
  
  // נתיבי התמונות שנוצרו עבור האתר
  // ניתן להחליף תמונות אלו בקלות על ידי החלפת הקבצים בתיקיית src/assets/images/ או עדכון הקישורים להלן
  images: {
    hero: "/src/assets/images/sandblasting_hero_1784621489371.jpg",
    gateBefore: "/src/assets/images/rusted_metal_gate_1784621502298.jpg",
    gateAfter: "/src/assets/images/cleaned_metal_gate_1784621517093.jpg",
    rimBefore: "/src/assets/images/rusted_car_rim_1784621529873.jpg",
    rimAfter: "/src/assets/images/cleaned_car_rim_1784621543184.jpg",
  }
};

/**
 * פונקציה ליצירת קישור וואטסאפ תקין עם הודעה מותאמת אישית
 */
export function getWhatsAppLink(message?: string): string {
  const text = message || BUSINESS_CONFIG.defaultMessage;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encodedText}`;
}
