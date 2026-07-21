import { motion } from "motion/react";
import { BENEFITS_DATA } from "../data";
import { Shield, Target, Paintbrush, Sliders } from "lucide-react";

const icons = [Shield, Target, Paintbrush, Sliders];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-zinc-100 border-t border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="benefits-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column - Text Heading */}
          <div className="lg:col-span-5 space-y-6 text-right" id="benefits-info-column">
            <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">למה לבחור בנו</span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
              למה לבחור <br className="hidden sm:inline" />
              בניקוי חול בהתזה?
            </h2>
            <div className="h-1 w-20 bg-orange-600 rounded" />
            
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base font-light">
              ניקוי חול בהתזה בלחץ אוויר גבוה היא אחת השיטות המתקדמות והיעילות ביותר לחידוש משטחים. הטיפול מיועד לקילוף יסודי של שכבות קורוזיה, צבע וזוהמה שהצטברו לאורך עשורים.
            </p>
            <div className="bg-white border border-zinc-200/80 p-5 rounded-xl shadow-sm text-zinc-600 text-xs sm:text-sm leading-relaxed" id="benefits-warning-box">
              <span className="text-orange-600 font-bold block mb-1">התחייבות מקצועית:</span>
              אנו לא מבטיחים הבטחות שווא. העבודה מבוצעת אך ורק לאחר בחינת סוג המשטח, מצבו הנוכחי והתאמה מדויקת של עוצמת לחץ האוויר וסוג חומר ההתזה, כדי לשמור על שלמות הפריט ולמנוע עיוותים.
            </div>
          </div>

          {/* Left Column - Benefits Cards Grid */}
          <div className="lg:col-span-7" id="benefits-cards-column">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="benefits-grid">
              {BENEFITS_DATA.map((benefit, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white border border-zinc-200/80 p-6 rounded-xl flex flex-col space-y-4 hover:border-orange-500/20 transition-colors shadow-sm"
                    id={`benefit-card-${benefit.id}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-orange-600" id={`benefit-icon-${benefit.id}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900" id={`benefit-title-${benefit.id}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-light" id={`benefit-desc-${benefit.id}`}>
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
