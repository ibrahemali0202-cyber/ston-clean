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
    hero: "/src/assets/images/hero_sandblast_1784718782110.jpg",
    gateBefore: "/src/assets/images/gate_before_1784718799086.jpg",
    gateAfter: "/src/assets/images/gate_after_1784718814445.jpg",
    rimBefore: "/src/assets/images/rim_before_1784718828355.jpg",
    rimAfter: "/src/assets/images/rim_after_1784718843401.jpg",
    wallBefore: "/src/assets/images/wall_before_1784718856517.jpg",
    wallAfter: "/src/assets/images/wall_after_1784718870325.jpg",
    action: "/src/assets/images/sandblast_action_1784718883060.jpg",
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
