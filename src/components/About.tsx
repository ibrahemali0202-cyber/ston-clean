import { motion } from "motion/react";
import { useCms } from "../context/CmsContext";

export default function About() {
  const { data, getWhatsAppLink } = useCms();
  const whatsAppLink = getWhatsAppLink(
    `שלום ${data.config.businessName}, הגעתי דרך האתר ואשמח להתייעץ איתך לגבי עבודת ניקוי חול.`
  );

  return (
    <section id="about" className="py-24 bg-stone-50 border-t border-zinc-200/80 relative overflow-hidden">
      {/* Subtle Background Textures */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="about-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content (RTL layout, right side on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-right lg:order-2" id="about-text-column">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase" id="about-koteret-tag">
                מקצועיות ואמינות ללא פשרות
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight" id="about-title">
                נעים להכיר, {data.config.businessName}
              </h2>
              
              <div className="h-1 w-20 bg-orange-600 rounded" id="about-divider" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 text-zinc-600 leading-relaxed text-base sm:text-lg font-light"
              id="about-body-text"
            >
              <p>
                {data.config.businessName} מספק שירותי ניקוי חול והתזה למגוון רחב של משטחים ועבודות. כל פרויקט נבדק בהתאם לסוג המשטח, שכבת הצבע, החלודה או הלכלוך שיש להסיר.
              </p>
              <p className="font-normal text-zinc-800">
                המטרה היא להגיע לתוצאה נקייה ואחידה ולהכין את המשטח בצורה טובה להמשך טיפול, שיקום או צביעה.
              </p>
              <p>
                אנו דוגלים בשקיפות מלאה מול הלקוח. לפני תחילת עבודה אנו מוודאים שהמשטח אכן מתאים לטיפול בהתזה ושעוצמת המכשור וחומר השחיקה מותאמים במדויק כדי לקבל את התוצאה המושלמת ללא פגיעה בחומר הגלם.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-4"
              id="about-button-container"
            >
              <a
                href={whatsAppLink}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3.5 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                id="about-cta-whatsapp"
              >
                ייעוץ מקצועי איתי בוואטסאפ
              </a>
            </motion.div>
          </div>

          {/* Image Content (Left side on desktop) */}
          <div className="lg:col-span-5 lg:order-1" id="about-image-column">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-3 border border-zinc-200 rounded-2xl transform translate-x-2 translate-y-2 pointer-events-none" />
              <div className="absolute -inset-3 border-2 border-dashed border-zinc-100 rounded-2xl pointer-events-none" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl bg-zinc-100 aspect-[4/3] sm:aspect-square shadow-xl">
                <img
                  src={data.config.images.action}
                  alt="עבודות ניקוי חול בהתזה"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  id="about-image"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                {/* Subtle Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Minimalist Tech Stats Box */}
              <div 
                className="absolute -bottom-5 -right-5 bg-white border border-zinc-200/80 p-4 rounded-xl shadow-xl hidden sm:flex items-center gap-3.5"
                id="about-badge-realistic"
              >
                <div className="w-12 h-12 rounded-full bg-orange-50/80 border border-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-black text-xl">✓</span>
                </div>
                <div className="text-right">
                  <div className="text-zinc-900 font-bold text-sm">התאמת עוצמה אישית</div>
                  <div className="text-xs text-zinc-500">לפי סוג וחוסן המשטח</div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

