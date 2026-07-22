import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCms } from "../context/CmsContext";
import { X, ZoomIn } from "lucide-react";

export default function Gallery() {
  const { data } = useCms();
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [lightboxImage, setLightboxImage] = useState<{
    image: string;
    title: string;
    description: string;
  } | null>(null);

  const categories = [
    "הכל",
    "מתכת",
    "חלודה",
    "צבע ישן",
    "אבן ובטון",
    "ציוד וחלקים",
    "הכנה לצביעה"
  ];

  // סינון התמונות לפי קטגוריה נבחרת
  const galleryList = data.galleryItems || [];
  const filteredItems = selectedCategory === "הכל"
    ? galleryList
    : galleryList.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-stone-50 border-t border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="gallery-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12" id="gallery-header">
          <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">גלריית תמונות</span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            עבודות ניקוי והתזה
          </h2>
          <div className="h-1 w-20 bg-orange-600 mx-auto rounded" />
          <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto font-light">
            מבחר דוגמאות של טיפול במתכות, הסרת צבע, שיקום קירות אבן וחידוש חישוקים וציוד תעשייתי.
          </p>
        </div>

        {/* Filter Navigation Buttons */}
        <div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          id="gallery-filters"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/10"
                  : "bg-white border border-zinc-200/80 text-zinc-600 hover:border-zinc-350"
              }`}
              id={`filter-btn-${category}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => setLightboxImage({ image: item.image, title: item.title, description: item.description })}
                className="group relative bg-white border border-zinc-200/80 p-3 rounded-2xl cursor-pointer hover:border-orange-500/20 transition-all overflow-hidden shadow-sm"
                id={`gallery-item-${item.id}`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100" id={`gallery-img-box-${item.id}`}>
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.description}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    id={`gallery-img-${item.id}`}
                    onError={(e) => {
                      const categoryFallbacks: Record<string, string> = {
                        "מתכת": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
                        "חלודה": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
                        "צבע ישן": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
                        "אבן ובטון": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
                        "ציוד וחלקים": "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&q=80&w=800",
                        "הכנה לצביעה": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
                      };
                      (e.target as HTMLImageElement).src = categoryFallbacks[item.category] || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  
                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-600/20 border border-orange-500 flex items-center justify-center text-orange-400 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-3 text-right" id={`gallery-info-box-${item.id}`}>
                  <span className="text-orange-600 text-[10px] font-semibold tracking-wider uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-zinc-900 font-bold text-sm sm:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-xs font-light line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox / Fullscreen Modal Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            id="gallery-lightbox-overlay"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl"
              id="gallery-lightbox-content"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-zinc-100 text-zinc-900 p-2.5 rounded-full border border-zinc-200/80 transition-colors shadow-md"
                aria-label="סגור חלון"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Fullscreen Image */}
              <div className="aspect-[16:10] w-full bg-zinc-100" id="lightbox-img-box">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  id="lightbox-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>

              {/* Lightbox Info Panel */}
              <div className="p-6 bg-zinc-50 text-right border-t border-zinc-100" id="lightbox-info-panel">
                <h3 className="text-zinc-900 text-lg sm:text-xl font-black mb-1">
                  {lightboxImage.title}
                </h3>
                <p className="text-zinc-650 text-xs sm:text-sm font-light">
                  {lightboxImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

