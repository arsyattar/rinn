import { useState, useEffect } from 'react';

export type Language = 'id' | 'en';

const LANG_CHANGE_EVENT = 'amai_lang_change';

export function isIndonesianTimezone(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return /^(Asia\/Jakarta|Asia\/Pontianak|Asia\/Makassar|Asia\/Jayapura)$/i.test(tz);
  } catch (e) {
    return false;
  }
}

/**
 * Deteksi otomatis mata uang & region:
 * 1. Cek query parameter URL (?currency=idr / ?currency=usd) atau localStorage
 * 2. Cek zona waktu Indonesia (WIB, WITA, WIT) -> 'id' (IDR)
 * 3. Di luar Indonesia -> default 'en' (USD)
 */
export function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'id';

  // 1. Cek URL query parameter (?currency=id / ?currency=idr / ?currency=usd / ?currency=en)
  try {
    const params = new URLSearchParams(window.location.search);
    const curr = params.get('currency') || params.get('lang');
    if (curr) {
      if (/^(id|idr|rp)$/i.test(curr)) {
        localStorage.setItem('amai_currency_override', 'id');
        return 'id';
      }
      if (/^(en|usd|\$)$/i.test(curr)) {
        localStorage.setItem('amai_currency_override', 'en');
        return 'en';
      }
    }
  } catch (e) {
    // ignore
  }

  // Cek jika ada simpanan manual sebelumnya
  try {
    const saved = localStorage.getItem('amai_currency_override');
    if (saved === 'id' || saved === 'en') return saved;
  } catch (e) {
    // ignore
  }

  // 2. Cek zona waktu Indonesia (Asia/Jakarta, Asia/Pontianak, Asia/Makassar, Asia/Jayapura)
  if (isIndonesianTimezone()) {
    return 'id';
  }

  // 3. Cek bahasa bawaan browser jika mengindikasikan Indonesia
  try {
    const navLang = navigator.language || (navigator as any).userLanguage || '';
    if (navLang.toLowerCase().startsWith('id')) {
      return 'id';
    }
  } catch (e) {
    // ignore
  }

  // 4. Di luar Indonesia -> default English (USD)
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
 * React Hook untuk mendengarkan status mata uang / wilayah di semua island
 */
export function useLanguage() {
  const [lang, setLangState] = useState<Language>(getLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      setLangState(customEvent.detail);
    };

    window.addEventListener(LANG_CHANGE_EVENT, handleLangChange);

    // Jangan timpa jika zona waktu sudah terdeteksi jelas sebagai Indonesia atau ada override manual
    const hasManualOverride = localStorage.getItem('amai_currency_override');
    if (!hasManualOverride && !isIndonesianTimezone()) {
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
            // fallback
          });
      } catch (e) {
        // ignore
      }
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
