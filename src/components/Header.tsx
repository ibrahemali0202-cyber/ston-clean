import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppLink } from "../config";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "ראשי" },
    { id: "about", label: "אודות" },
    { id: "services", label: "שירותים" },
    { id: "process", label: "איך זה עובד" },
    { id: "before-after", label: "לפני ואחרי" },
    { id: "gallery", label: "עבודות" },
    { id: "faq", label: "שאלות נפוצות" }
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
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

  const whatsAppLink = getWhatsAppLink();

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo on Right for RTL */}
          <div 
            onClick={() => scrollToSection("hero")}
            className="flex flex-col cursor-pointer select-none"
            id="logo-container"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1">
              <span className="text-white">{BUSINESS_CONFIG.businessName}</span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-400">
              {BUSINESS_CONFIG.businessSubTitle}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-8" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-orange-400 relative py-1 ${
                  activeSection === item.id ? "text-orange-400 font-bold" : "text-zinc-300"
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Call-to-action button (Left) */}
          <div className="hidden md:block" id="cta-header-container">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded-full text-sm transition-all shadow-md hover:shadow-lg active:scale-95 duration-200"
              id="cta-header-whatsapp"
            >
              שלחו הודעה בוואטסאפ
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex lg:hidden" id="mobile-menu-btn-container">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              id="hamburger-btn"
            >
              <span className="sr-only">פתח תפריט ראשי</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-900 border-b border-zinc-800" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-right px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-zinc-800 text-orange-400 font-bold border-r-4 border-orange-500"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2 px-3">
              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center bg-orange-600 text-white font-bold py-3 px-4 rounded-full text-center transition-all"
                id="mobile-cta-whatsapp"
              >
                שלחו הודעה בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
