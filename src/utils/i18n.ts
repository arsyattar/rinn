import { useState, useEffect } from 'react';

export type Language = 'id' | 'en';

const LANG_CHANGE_EVENT = 'amai_lang_change';

/**
 * Deteksi otomatis bahasa & wilayah (100% otomatis tanpa manual switch):
 * 1. Zona waktu perangkat (Asia/Jakarta, Asia/Pontianak, Asia/Makassar, Asia/Jayapura -> 'id')
 * 2. Bahasa bawaan browser ('id' -> 'id')
 * 3. Di luar Indonesia -> 'en' (USD)
 */
export function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'id';

  // Hapus sisa preferensi manual lama jika ada agar sistem murni otomatis
  try {
    localStorage.removeItem('amai_lang_pref');
  } catch (e) {
    // ignore
  }

  // 1. Cek zona waktu Indonesia (WIB, WITA, WIT)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/^(Asia\/Jakarta|Asia\/Pontianak|Asia\/Makassar|Asia\/Jayapura)$/i.test(tz)) {
      return 'id';
    }
  } catch (e) {
    // ignore
  }

  // 2. Cek bahasa bawaan browser
  try {
    const navLang = navigator.language || (navigator as any).userLanguage || '';
    if (navLang.toLowerCase().startsWith('id')) {
      return 'id';
    }
  } catch (e) {
    // ignore
  }

  // 3. Di luar Indonesia -> default English (USD)
  return 'en';
}

let cachedLanguage: Language = typeof window !== 'undefined' ? detectInitialLanguage() : 'id';

export function getLanguage(): Language {
  return cachedLanguage;
}

export function setLanguage(lang: Language) {
  cachedLanguage = lang;
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('lang', lang);
    window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: lang }));
  }
}

/**
 * React Hook untuk mendengarkan status bahasa di semua island
 */
export function useLanguage() {
  const [lang, setLangState] = useState<Language>(getLanguage);

  useEffect(() => {
    // Sinkronisasi atribut lang pada <html>
    document.documentElement.setAttribute('lang', lang);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      setLangState(customEvent.detail);
    };

    window.addEventListener(LANG_CHANGE_EVENT, handleLangChange);

    // Konfirmasi latar belakang via Geo-IP
    try {
      fetch('https://api.country.is/')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country) {
            const detected: Language = data.country === 'ID' ? 'id' : 'en';
            if (detected !== lang) {
              setLanguage(detected);
            }
          }
        })
        .catch(() => {
          // fallback ke timezone
        });
    } catch (e) {
      // ignore
    }

    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, [lang]);

  return {
    lang,
    setLanguage,
    isId: lang === 'id',
    isEn: lang === 'en',
  };
}
