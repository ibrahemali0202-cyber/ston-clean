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
  
  // נתיבי התמונות של העסק
  images: {
    hero: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1600",
    gateBefore: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    gateAfter: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    rimBefore: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800",
    rimAfter: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&q=80&w=800",
    wallBefore: "https://images.unsplash.com/photo-1590059301037-3f309a4d8c7c?auto=format&fit=crop&q=80&w=800",
    wallAfter: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    action: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
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
