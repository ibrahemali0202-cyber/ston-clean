/**
 * קובץ הגדרות מרכזי עבור אתר התדמית של עלי איבראהים
 * 
 * Central configuration file for Ali Ibrahim - Sandblasting landing page.
 */

import heroBlastingImg from "./assets/images/hero_blasting_1784727194703.jpg";
import gateRustBeforeImg from "./assets/images/gate_rust_before_1784727208307.jpg";
import gateCleanAfterImg from "./assets/images/gate_clean_after_1784727220171.jpg";
import rimRustBeforeImg from "./assets/images/rim_rust_before_1784727233649.jpg";
import rimCleanAfterImg from "./assets/images/rim_clean_after_1784727246619.jpg";
import wallDirtyBeforeImg from "./assets/images/wall_dirty_before_1784727257776.jpg";
import wallCleanAfterImg from "./assets/images/wall_clean_after_1784727269390.jpg";
import blastingOperatorImg from "./assets/images/blasting_operator_1784727283366.jpg";

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
    hero: heroBlastingImg,
    gateBefore: gateRustBeforeImg,
    gateAfter: gateCleanAfterImg,
    rimBefore: rimRustBeforeImg,
    rimAfter: rimCleanAfterImg,
    wallBefore: wallDirtyBeforeImg,
    wallAfter: wallCleanAfterImg,
    action: blastingOperatorImg,
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
