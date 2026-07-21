import React from "react";
import { motion } from "motion/react";
import { BUSINESS_CONFIG, getWhatsAppLink } from "../config";
import { ShieldCheck, Sliders, UserCheck } from "lucide-react";

export default function Hero() {
  const whatsAppLink = getWhatsAppLink();

  const handleScrollToGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("gallery");
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

  const trustPoints = [
    { text: "עבודה יסודית ומקצועית", icon: ShieldCheck },
    { text: "התאמת שיטת הניקוי למשטח", icon: Sliders },
    { text: "שירות ישיר ואישי", icon: UserCheck }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-zinc-950"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUSINESS_CONFIG.images.hero}
          alt="עובד מקצועי מבצע ניקוי חול בהתזה"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          id="hero-bg-img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-950/70 z-10" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" id="hero-content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Subtitle Accent */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-1.5 rounded-full text-orange-400 text-xs sm:text-sm font-bold tracking-widest uppercase" id="hero-badge">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            עלי איבראהים — ניקוי חול בהתזה בפריסה ארצית
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight" id="hero-title">
            ניקוי חול מקצועי <br className="hidden sm:inline" />
            <span className="text-orange-500 italic">
              שמחזיר למשטח את המראה המקורי
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed font-light" id="hero-desc">
            הסרת חלודה, צבע ישן, לכלוך קשה וכתמים ממשטחי מתכת, אבן, בטון וכלים תעשייתיים. עבודה מקצועית, יסודית ובהתאמה לסוג המשטח.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" id="hero-buttons-container">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-black py-4 px-8 rounded-xl text-base transition-all duration-300 shadow-lg shadow-orange-600/15 active:scale-95"
              id="hero-cta-whatsapp"
            >
              לקבלת הצעת מחיר בוואטסאפ
            </a>
            <button
              onClick={handleScrollToGallery}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold py-4 px-8 rounded-xl text-base transition-all duration-300 hover:border-zinc-700 active:scale-95"
              id="hero-cta-gallery"
            >
              לצפייה בעבודות
            </button>
          </div>

          {/* Trust Points */}
          <div className="pt-12 border-t border-zinc-800/60" id="hero-trust-points">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {trustPoints.map((point, idx) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-3 bg-zinc-900/40 border border-zinc-800/40 py-3.5 px-5 rounded-xl text-zinc-300"
                    id={`hero-trust-${idx}`}
                  >
                    <IconComponent className="w-5 h-5 text-orange-400 shrink-0" />
                    <span className="text-sm font-semibold tracking-wide">{point.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave/Angles */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-coal-950 to-transparent pointer-events-none" />
    </section>
  );
}
