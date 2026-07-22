/**
 * IndexedDB storage utility for persisting large CMS data including base64 images.
 * Bypasses the 5MB limit of localStorage.
 */

const DB_NAME = "AliIbrahimSandblastCmsDB";
const DB_VERSION = 1;
const STORE_NAME = "cms_data_store";
const DATA_KEY = "cms_data_key";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCmsDataToDb(data: any): Promise<boolean> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, DATA_KEY);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => {
        console.error("Failed to save to IndexedDB", e);
        resolve(false);
      };
    });
  } catch (err) {
    console.error("IndexedDB save error", err);
    return false;
  }
}

export async function loadCmsDataFromDb(): Promise<any | null> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DATA_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.error("IndexedDB load error", err);
    return null;
  }
}
