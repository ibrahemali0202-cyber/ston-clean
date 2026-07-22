import { useCms } from "../context/CmsContext";

export default function Footer() {
  const { data, getWhatsAppLink } = useCms();
  const whatsAppLink = getWhatsAppLink();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="footer-container">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-zinc-900" id="footer-top-row">
          
          {/* Brand Identity */}
          <div className="text-center md:text-right" id="footer-branding">
            <h2 className="text-xl font-black text-white">{data.config.businessName}</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">{data.config.businessSubTitle}</p>
          </div>

          {/* Core Footer Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm" id="footer-nav">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="hover:text-orange-400 transition-colors cursor-pointer"
              id="footer-link-hero"
            >
              ראשי
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="hover:text-orange-400 transition-colors cursor-pointer"
              id="footer-link-services"
            >
              שירותים
            </button>
            <button 
              onClick={() => scrollToSection("gallery")} 
              className="hover:text-orange-400 transition-colors cursor-pointer"
              id="footer-link-gallery"
            >
              עבודות
            </button>
            <button 
              onClick={() => scrollToSection("faq")} 
              className="hover:text-orange-400 transition-colors cursor-pointer"
              id="footer-link-faq"
            >
              שאלות נפוצות
            </button>
          </nav>

          {/* Small Clean WhatsApp button */}
          <div id="footer-cta-container">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-5 rounded-full text-sm transition-all"
              id="footer-whatsapp-btn"
            >
              שלחו הודעה בוואטסאפ
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-xs text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4" id="footer-bottom-row">
          <p id="copyright-text">
            &copy; {new Date().getFullYear()} כל הזכויות שמורות ל{data.config.businessName}
          </p>
          <p className="text-[10px] text-zinc-700" id="professional-built-foot">
            ניקוי חול מקצועי ואיכותי בהתאם לסוג המשטח
          </p>
        </div>

      </div>
    </footer>
  );
}

