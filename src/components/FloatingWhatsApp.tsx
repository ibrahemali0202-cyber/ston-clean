import { getWhatsAppLink } from "../config";

export default function FloatingWhatsApp() {
  const whatsAppLink = getWhatsAppLink();

  // וקטור לוגו וואטסאפ רשמי
  const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className="w-6 h-6 sm:w-7 sm:h-7"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <div id="floating-whatsapp-system">
      
      {/* 1. כפתור וואטסאפ צף לגרסת דסקטופ (מוסתר במובייל קטן מאוד) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block" id="desktop-whatsapp-floating">
        <a
          href={whatsAppLink}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95 group relative"
          aria-label="שלחו לנו הודעה בוואטסאפ"
          id="desktop-floating-link"
        >
          {/* Tooltip */}
          <span className="absolute right-16 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            הצעת מחיר מהירה בוואטסאפ
          </span>
          
          <WhatsAppIcon />
        </a>
      </div>

      {/* 2. פס פעולה קבוע בתחתית המסך למובייל בלבד */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 border-t border-zinc-200/80 shadow-[0_-5px_15px_rgba(0,0,0,0.08)] backdrop-blur-md px-4 py-3"
        id="mobile-whatsapp-sticky-bar"
      >
        <a
          href={whatsAppLink}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-5 rounded-xl text-center transition-all shadow-md text-sm tracking-wide active:scale-98"
          id="mobile-sticky-link"
        >
          <WhatsAppIcon />
          <span>שלחו תמונה וקבלו הצעת מחיר</span>
        </a>
      </div>

    </div>
  );
}
