/**
  * כלי לדחיסת תמונות והמרתן ל-Base64 בצורה אופטימלית לאחסון בדפדפן (localStorage)
  */
 export function compressAndReadFile(
   file: File,
   maxWidth = 1200,
   quality = 0.82
 ): Promise<string> {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onload = (e) => {
       const img = new Image();
       img.onload = () => {
         const canvas = document.createElement("canvas");
         let width = img.width;
         let height = img.height;

         if (width > maxWidth) {
           height = Math.round((height * maxWidth) / width);
           width = maxWidth;
         }

         canvas.width = width;
         canvas.height = height;

         const ctx = canvas.getContext("2d");
         if (!ctx) {
           resolve(e.target?.result as string);
           return;
         }

         ctx.drawImage(img, 0, 0, width, height);
         const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
         resolve(compressedDataUrl);
       };
       img.onerror = () => reject(new Error("שגיאה שטעינת התמונה נכשלה"));
       img.src = e.target?.result as string;
     };
     reader.onerror = () => reject(new Error("שגיאה בקריאת הקובץ"));
     reader.readAsDataURL(file);
   });
 }
