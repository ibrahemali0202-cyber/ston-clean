import { useState } from "react";
import { useCms } from "../context/CmsContext";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const { data } = useCms();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-100 border-t border-zinc-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="faq-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16" id="faq-header">
          <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">שאלות ותשובות</span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            שאלות נפוצות
          </h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto rounded" />
          <p className="text-zinc-500 text-sm sm:text-base font-light">
            כאן תמצאו תשובות לשאלות הנפוצות ביותר שקיבלנו על ניקוי חול בהתזה, עלויות ובדיקות משטח.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div className="space-y-4" id="faq-accordion-wrapper">
          {data.faqItems?.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                id={`faq-item-${faq.id}`}
              >
                {/* Accordion Button / Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-right p-5 sm:p-6 flex justify-between items-center gap-4 hover:bg-zinc-50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                >
                  <div className="flex items-center gap-3" id={`faq-q-box-${faq.id}`}>
                    <HelpCircle className="w-5 h-5 text-orange-600 shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-zinc-900 tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <div 
                    className={`w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-orange-600 border-orange-200" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Panel Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-8 text-zinc-600 text-sm sm:text-base font-light border-t border-zinc-100 leading-relaxed pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

