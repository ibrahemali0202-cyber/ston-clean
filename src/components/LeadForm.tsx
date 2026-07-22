import React, { useState } from "react";
import { useCms } from "../context/CmsContext";
import { Send, AlertTriangle, Check } from "lucide-react";

export default function LeadForm() {
  const { data, addLead } = useCms();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // וולידציה
    if (!name.trim()) newErrors.name = "אנא הזינו את שמכם";
    if (!location.trim()) newErrors.location = "אנא ציינו את אזור העבודה בארץ";
    if (!serviceType) newErrors.serviceType = "אנא בחרו את סוג השירות המבוקש";
    if (!description.trim()) newErrors.description = "אנא רשמו תיאור קצר של המשטח";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);

    // Save lead in CMS state
    addLead({
      name: name.trim(),
      phone: "נשלח בוואטסאפ",
      location: location.trim(),
      serviceType,
      notes: description.trim()
    });

    // בניית ההודעה לוואטסאפ בהתאם לפורמט הנדרש
    const message = 
`שלום ${data.config.businessName}, הגעתי דרך האתר.

שם: ${name.trim()}
אזור העבודה: ${location.trim()}
סוג השירות: ${serviceType}
פרטי העבודה: ${description.trim()}

אשמח לקבל פרטים והצעת מחיר.`;

    // ביצוע URL encoding תקין לכל תוכן ההודעה
    const encodedText = encodeURIComponent(message);
    const cleanPhone = data.config.whatsappPhone.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    // פתיחת וואטסאפ בחלון חדש
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact-form" className="py-24 bg-stone-50 border-t border-zinc-200/80 relative">
      {/* Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="leadform-container">
        
        {/* Card Frame */}
        <div 
          className="bg-white border border-zinc-200/80 p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden"
          id="leadform-card"
        >
          {/* Subtle Corner Glow Accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/[0.03] rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-650/[0.03] rounded-full blur-2xl pointer-events-none" />

          {/* Form Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10" id="leadform-header">
            <span className="text-orange-600 font-bold tracking-widest text-xs sm:text-sm uppercase">ייעוץ והצעת מחיר מהירה</span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              צריכים ניקוי חול? שלחו את פרטי העבודה
            </h2>
            <div className="h-0.5 w-16 bg-orange-600 mx-auto rounded" />
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-light">
              מלאו את הפרטים הבאים ונציג קשר בוואטסאפ עם הצעת מחיר בהתאם לסוג המשטח והעבודה.
            </p>
          </div>

          {/* Form Submission Confirmation Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-3" id="submit-success-msg">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
                <Check className="w-4 h-4" />
              </div>
              <p>הפרטים נקלטו במערכת! כעת נפתח חלון WhatsApp עם ההודעה המוכנה. לחצו לשליחה במידה ולא נפתח אוטומטית.</p>
            </div>
          )}

          {/* The Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-right" id="main-lead-form">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field: Name */}
              <div className="flex flex-col space-y-2" id="field-name-container">
                <label htmlFor="form-name" className="text-sm font-bold text-zinc-700">
                  שם מלא <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="form-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  placeholder="לדוגמה: ישראל ישראלי"
                  className={`w-full bg-zinc-50 border ${
                    errors.name ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200/80 focus:border-orange-500 focus:ring-orange-500/10"
                  } p-3.5 rounded-xl text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-4 transition-all`}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Field: Work Location */}
              <div className="flex flex-col space-y-2" id="field-location-container">
                <label htmlFor="form-location" className="text-sm font-bold text-zinc-700">
                  אזור ביצוע העבודה בארץ <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="form-location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors(prev => ({ ...prev, location: "" }));
                  }}
                  placeholder="לדוגמה: חיפה, תל אביב והמרכז, דרום וכד'"
                  className={`w-full bg-zinc-50 border ${
                    errors.location ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200/80 focus:border-orange-500 focus:ring-orange-500/10"
                  } p-3.5 rounded-xl text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-4 transition-all`}
                />
                {errors.location && (
                  <span className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.location}
                  </span>
                )}
              </div>

            </div>

            {/* Field: Service Type */}
            <div className="flex flex-col space-y-2" id="field-servicetype-container">
              <label htmlFor="form-service" className="text-sm font-bold text-zinc-700">
                סוג השירות המבוקש <span className="text-orange-500">*</span>
              </label>
              <select
                id="form-service"
                value={serviceType}
                onChange={(e) => {
                  setServiceType(e.target.value);
                  if (errors.serviceType) setErrors(prev => ({ ...prev, serviceType: "" }));
                }}
                className={`w-full bg-zinc-50 border ${
                  errors.serviceType ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200/80 focus:border-orange-500 focus:ring-orange-500/10"
                } p-3.5 rounded-xl text-zinc-900 text-sm focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer`}
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2327272a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 15px center', backgroundSize: '16px' }}
              >
                <option value="" className="text-zinc-400">--- אנא בחרו שירות ---</option>
                {data.services?.map((srv) => (
                  <option key={srv.id} value={srv.title} className="text-zinc-900 bg-white">
                    {srv.title}
                  </option>
                ))}
                <option value="אחר" className="text-zinc-900 bg-white">שירות אחר / שילוב שירותים</option>
              </select>
              {errors.serviceType && (
                <span className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {errors.serviceType}
                </span>
              )}
            </div>

            {/* Field: Short Description */}
            <div className="flex flex-col space-y-2" id="field-desc-container">
              <label htmlFor="form-desc" className="text-sm font-bold text-zinc-700">
                תיאור קצר של המשטח והעבודה הנדרשת <span className="text-orange-500">*</span>
              </label>
              <textarea
                id="form-desc"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                }}
                rows={4}
                placeholder="ספרו לנו קצת על הפרויקט: מהו סוג המשטח? מהו עובי שכבת החלודה או הצבע? מהו סדר הגודל של הפריט?"
                className={`w-full bg-zinc-50 border ${
                  errors.description ? "border-red-500 focus:ring-red-500/20" : "border-zinc-200/80 focus:border-orange-500 focus:ring-orange-500/10"
                } p-3.5 rounded-xl text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.description && (
                <span className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {errors.description}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center sm:justify-start" id="submit-btn-container">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black py-4 px-10 rounded-xl text-base shadow-lg shadow-orange-600/15 transition-all duration-200 active:scale-95 cursor-pointer"
                id="submit-whatsapp-btn"
              >
                <Send className="w-5 h-5 shrink-0" />
                <span>שליחת הפרטים בוואטסאפ</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

