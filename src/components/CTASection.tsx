import { getWhatsAppLink } from "../config";
import { Send } from "lucide-react";

export default function CTASection() {
  const whatsAppLink = getWhatsAppLink(
    "שלום עלי, אני מעוניין/ת לשלוח תמונות של המשטח שלי לקבלת הצעת מחיר לניקוי חול."
  );

  return (
    <section id="cta-conclusion" className="py-24 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" id="cta-concl-container">
        <div className="space-y-6">
          <span className="text-orange-400 font-bold tracking-widest text-sm uppercase">ייעוץ מקצועי ללא התחייבות</span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            רוצים להחזיר למשטח את המראה הנקי שלו?
          </h2>
          
          <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            שלחו עכשיו תמונות ופרטים בוואטסאפ וקבלו מידע לגבי אפשרויות העבודה, סוגי חומרי השחיקה ולוחות הזמנים.
          </p>

          <div className="pt-6" id="cta-concl-btn-container">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-black py-4.5 px-10 rounded-full text-lg shadow-lg shadow-orange-950/20 hover:shadow-orange-500/10 transition-all duration-300 active:scale-95"
              id="cta-concl-whatsapp"
            >
              <Send className="w-5 h-5 shrink-0" />
              <span>שליחת תמונות בוואטסאפ</span>
            </a>
          </div>
          
          <p className="text-xs text-gray-500 font-light mt-4">
            * המענה מהיר וישיר על ידי עלי איבראהים
          </p>
        </div>
      </div>
    </section>
  );
}
