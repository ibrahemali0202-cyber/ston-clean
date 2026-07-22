import React from "react";
import { motion } from "motion/react";
import { useCms } from "../context/CmsContext";
import { 
  ShieldAlert, 
  Paintbrush, 
  Layers, 
  Trash2, 
  Car, 
  Sparkles, 
  Factory,
  ArrowLeft
} from "lucide-react";

// מפת אייקונים מאובטחת למניעת שגיאות טיפוסים ב-TypeScript
const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldAlert: ShieldAlert,
  Paintbrush: Paintbrush,
  Brick: Layers,
  Trash2: Trash2,
  Car: Car,
  Sparkles: Sparkles,
  Factory: Factory,
};

export default function Services() {
  const { data, getWhatsAppLink } = useCms();

  return (
    <section id="services" className="py-24 bg-stone-50 border-t border-zinc-200/80 relative">
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="services-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="services-header">
          <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">מה אנחנו מציעים</span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            שירותי ניקוי חול והתזה
          </h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto rounded" />
          <p className="text-zinc-500 text-sm sm:text-base max-w-2xl mx-auto font-light">
            אנו מתמחים בניקוי חול יבש ובהתזה מבוקרת עבור פרויקטים תעשייתיים, פרטיים וציבוריים כאחד. כל שירות מותאם בדיוק למאפייני המשטח.
          </p>
        </div>

        {/* Services Bento/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {data.services?.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            
            // יצירת הודעת וואטסאפ ייעודית לכל שירות
            const serviceWhatsAppMessage = `שלום ${data.config.businessName}, הגעתי דרך האתר ואשמח לקבל הצעת מחיר לגבי השירות של: ${service.title}.`;
            const whatsAppLink = getWhatsAppLink(serviceWhatsAppMessage);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-white border border-zinc-200/80 hover:border-zinc-300 p-6 sm:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
                id={`service-card-${service.id}`}
              >
                {/* Accent Background Highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.01] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-4">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200/60 group-hover:border-orange-500 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300" id={`service-icon-box-${service.id}`}>
                    <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors" id={`service-title-${service.id}`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light" id={`service-desc-${service.id}`}>
                    {service.description}
                  </p>
                </div>

                {/* WhatsApp Action Link */}
                <div className="pt-6 mt-6 border-t border-zinc-100" id={`service-action-container-${service.id}`}>
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group/link"
                    id={`service-cta-link-${service.id}`}
                  >
                    <span>שאלו על השירות בוואטסאפ</span>
                    <ArrowLeft className="w-4 h-4 transform group-hover/link:-translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

