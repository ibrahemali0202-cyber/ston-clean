import React, { useState } from "react";
import { useCms } from "../context/CmsContext";
import { BeforeAfterItem } from "../types";

/**
 * רכיב השוואה אינדיבידואלי של לפני/אחרי המאפשר גרירה אינטראקטיבית
 */
function BeforeAfterCard({ item }: { item: BeforeAfterItem; key?: string }) {
  // ניהול המיקום של קו ההפרדה באחוזים (0 עד 100)
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div 
      className="bg-white border border-zinc-200/80 p-4 sm:p-5 rounded-2xl flex flex-col space-y-4 shadow-sm hover:border-orange-500/20 transition-all duration-300"
      id={`ba-card-wrapper-${item.id}`}
    >
      {/* Title & Category Badge */}
      <div className="flex justify-between items-start" id={`ba-card-header-${item.id}`}>
        <div>
          <h3 className="text-lg font-bold text-zinc-900" id={`ba-card-title-${item.id}`}>{item.title}</h3>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1" id={`ba-card-desc-${item.id}`}>{item.description}</p>
        </div>
        <span className="bg-zinc-100 text-zinc-700 text-xs font-semibold px-2.5 py-1 rounded border border-zinc-200 whitespace-nowrap">
          {item.category}
        </span>
      </div>

      {/* Interactive Slider Container */}
      <div 
        className="relative w-full aspect-[4/3] overflow-hidden rounded-xl select-none bg-zinc-100"
        id={`ba-slider-container-${item.id}`}
      >
        {/* תמונת ה"אחרי" - מוצגת ברקע (צד שמאל באוריינטציית RTL) */}
        <img 
          src={item.afterImage} 
          alt={`${item.title} - אחרי`} 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          id={`ba-img-after-${item.id}`}
        />
        
        {/* תווית "אחרי" */}
        <div className="absolute bottom-3 left-3 z-20 bg-emerald-600/90 text-white text-xs font-black px-2.5 py-1 rounded shadow-sm backdrop-blur-sm">
          אחרי הניקוי
        </div>

        {/* תמונת ה"לפני" - נחתכת דינמית מימין לשמאל לפי מיקום הסליידר */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          id={`ba-clip-wrapper-${item.id}`}
        >
          <img 
            src={item.beforeImage} 
            alt={`${item.title} - לפני`} 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
            id={`ba-img-before-${item.id}`}
          />
        </div>
        
        {/* תווית "לפני" */}
        <div className="absolute bottom-3 right-3 z-20 bg-red-600/90 text-white text-xs font-black px-2.5 py-1 rounded shadow-sm backdrop-blur-sm">
          לפני הניקוי
        </div>

        {/* פלט שיקוף / מדריך גרירה */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-white/90 border border-zinc-200 text-zinc-700 text-[11px] px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
          גררו להשוואה
        </div>

        {/* קלט טווח (Range) שקוף לחלוטין שמכסה את כל השטח ותומך במגע */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label={`מחוון השוואה של לפני ואחרי עבור ${item.title}`}
          id={`ba-range-input-${item.id}`}
        />

        {/* קו ההפרדה הויזואלי */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
          id={`ba-divider-line-${item.id}`}
        >
          {/* כפתור הידית העגול */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg text-white font-black text-sm select-none">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { data } = useCms();

  return (
    <section id="before-after" className="py-24 bg-zinc-100 border-t border-zinc-200/80 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="before-after-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="before-after-header">
          <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">עבודות בשטח</span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            רואים את ההבדל
          </h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto rounded" />
          <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto font-light">
            השוואה אינטראקטיבית בזמן אמת. גררו את המפריד הלבן ימינה ושמאלה כדי לראות את כוח הניקוי של התזת החול.
          </p>
        </div>

        {/* Slider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="before-after-grid">
          {data.beforeAfterItems?.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

