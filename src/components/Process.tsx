import React from "react";
import { motion } from "motion/react";
import { PROCESS_STEPS } from "../data";
import { Send, Search, Sliders, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Send: Send,
  Search: Search,
  Sliders: Sliders,
  CheckCircle: CheckCircle,
};

export default function Process() {
  return (
    <section id="process" className="py-24 bg-stone-50 border-t border-zinc-200/80 relative overflow-hidden">
      {/* Decorative lines in background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="process-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20" id="process-header">
          <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">התהליך שלנו</span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            איך מתבצע תהליך העבודה?
          </h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto rounded" />
          <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto font-light">
            מפנייה קלה בוואטסאפ ועד לקבלת משטח נקי ומחודש – כך אנו מבטיחים עבודה איכותית, בטוחה ויעילה.
          </p>
        </div>

        {/* Dynamic Process Timeline */}
        <div className="relative" id="process-timeline-wrapper">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-px bg-zinc-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10" id="process-steps-grid">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComponent = iconMap[step.iconName] || CheckCircle;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white border border-zinc-200/80 p-6 rounded-2xl flex flex-col items-center text-center relative group hover:border-orange-500/20 transition-all duration-300 shadow-sm hover:shadow-md"
                  id={`process-step-card-${step.id}`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 bg-orange-600 text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center shadow-md shadow-orange-600/10" id={`process-step-num-${step.id}`}>
                    0{step.id}
                  </div>

                  {/* Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-orange-600 mb-6 group-hover:text-white group-hover:bg-orange-600 transition-all duration-300 shadow-sm" id={`process-icon-box-${step.id}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors" id={`process-step-title-${step.id}`}>
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-light" id={`process-step-desc-${step.id}`}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
