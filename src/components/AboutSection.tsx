import React from 'react';
import { useLanguage } from '../utils/i18n';
import { translations } from '../utils/translations';

export default function AboutSection() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <div className="about-card card-royal genshin-oc-card">
      <div className="genshin-decor-bg"></div>
      <div className="genshin-oc-grid">
        {/* Left: Character Portrait */}
        <div className="genshin-card-col">
          <div className="genshin-card-stack">
            <picture>
              <source srcSet="/photo/amai_hd_new.webp" type="image/webp" />
              <img
                src="/photo/amai_hd_new.png"
                alt="Amai Vaelithys — Genshin OC"
                className="genshin-oc-portrait"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Right: Character Info Details */}
        <div className="genshin-info-col">
          <div className="oc-header-group">
            <div className="genshin-rarity-stars">
              <span className="star-icon">⭐</span>
              <span className="star-icon">⭐</span>
              <span className="star-icon">⭐</span>
              <span className="star-icon">⭐</span>
              <span className="star-icon">⭐</span>
            </div>
            <h3 className="oc-title-name">{t.specs.nameVal}</h3>
            <p className="oc-subtitle-title">{t.roleTitle}</p>
          </div>

          <div className="oc-specs-table">
            <div className="oc-spec-row">
              <span className="oc-spec-key">{t.specs.nameLabel}</span>
              <span className="oc-spec-colon">:</span>
              <span className="oc-spec-val">
                <strong className="oc-main-name">{t.specs.nameVal}</strong>
                <span className="oc-alias">{t.specs.alias}</span>
              </span>
            </div>
            <div className="oc-spec-row">
              <span className="oc-spec-key">{t.specs.ageLabel}</span>
              <span className="oc-spec-colon">:</span>
              <span className="oc-spec-val">{t.specs.ageVal}</span>
            </div>
            <div className="oc-spec-row">
              <span className="oc-spec-key">{t.specs.bdayLabel}</span>
              <span className="oc-spec-colon">:</span>
              <span className="oc-spec-val">{t.specs.bdayVal}</span>
            </div>
            <div className="oc-spec-row">
              <span className="oc-spec-key">{t.specs.heightLabel}</span>
              <span className="oc-spec-colon">:</span>
              <span className="oc-spec-val">{t.specs.heightVal}</span>
            </div>
            <div className="oc-spec-row">
              <span className="oc-spec-key">{t.specs.affiliationLabel}</span>
              <span className="oc-spec-colon">:</span>
              <span className="oc-spec-val highlight-affiliation">{t.specs.affiliationVal}</span>
            </div>
          </div>

          <div className="oc-lore-box">
            <p className="oc-lore-text">{t.lore}</p>
          </div>

          <div className="oc-extra-badges">
            {t.pills.map((pill, idx) => (
              <span key={idx} className="oc-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .genshin-oc-card {
          padding: 1.5rem 1.25rem;
          max-width: 980px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F9FB 60%, #EBF4F7 100%);
          border: 1.5px solid var(--color-border-gold);
          border-radius: 1.5rem;
          box-shadow: 0 16px 40px rgba(30, 42, 69, 0.08), 0 4px 12px rgba(201, 166, 107, 0.12);
        }

        @media (min-width: 768px) {
          .genshin-oc-card {
            padding: 2.75rem 2.5rem;
          }
        }

        .genshin-oc-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 2rem;
          align-items: center;
          width: 100%;
        }

        @media (min-width: 820px) {
          .genshin-oc-grid {
            grid-template-columns: 280px minmax(0, 1fr);
            gap: 3.25rem;
          }
        }

        .genshin-card-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .genshin-card-stack {
          position: relative;
          width: 100%;
          max-width: 230px;
          margin: 0 auto;
        }

        @media (min-width: 820px) {
          .genshin-card-stack {
            max-width: 260px;
          }
        }

        .genshin-oc-portrait {
          width: 100%;
          height: auto;
          max-height: 320px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 8px 24px rgba(30, 42, 69, 0.12));
          transition: transform 0.3s ease;
        }

        .genshin-oc-portrait:hover {
          transform: scale(1.02);
        }

        .genshin-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
        }

        .oc-header-group {
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
          text-align: center;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .genshin-rarity-stars {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
          font-size: 1.08rem;
          margin: 0 0 -0.18rem 0;
          line-height: 1;
        }

        .oc-title-name {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3.2vw, 2.1rem);
          color: #1A365D;
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
          letter-spacing: 0.02em;
          text-align: center;
        }

        .oc-subtitle-title {
          font-size: 0.95rem;
          color: var(--color-text-gold);
          font-weight: 600;
          margin: 0;
          line-height: 1.25;
          text-align: center;
        }

        .oc-specs-table {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: 0.65rem 0.5rem;
          align-items: baseline;
          width: 100%;
        }

        @media (min-width: 640px) {
          .oc-specs-table {
            gap: 0.8rem 0.75rem;
          }
        }

        .oc-spec-row {
          display: contents;
        }

        .oc-spec-key {
          font-family: var(--font-serif);
          font-weight: 700;
          color: #1A365D;
          letter-spacing: 0.02em;
          white-space: nowrap;
          font-size: 0.95rem;
        }

        .oc-spec-colon {
          font-family: var(--font-serif);
          font-weight: 700;
          color: #1A365D;
          font-size: 0.95rem;
          padding: 0 0.1rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .oc-spec-key,
          .oc-spec-colon {
            font-size: 1.15rem;
          }
        }

        .oc-spec-val {
          font-weight: 600;
          color: #2C4260;
          font-size: 0.95rem;
          line-height: 1.4;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.35rem;
        }

        @media (min-width: 768px) {
          .oc-spec-val {
            font-size: 1.15rem;
          }
        }

        .oc-main-name {
          color: #1A365D;
          font-weight: 800;
        }

        .oc-alias {
          font-size: 0.82rem;
          color: #7B8BA2;
          font-weight: 500;
          font-style: italic;
        }

        .highlight-affiliation {
          color: #1A365D;
          font-weight: 700;
        }

        .oc-lore-box {
          background: rgba(255, 255, 255, 0.85);
          border-left: 3.5px solid var(--color-primary);
          border-radius: 0 0.85rem 0.85rem 0;
          padding: 1.1rem 1.25rem;
          box-shadow: 0 4px 14px rgba(30, 42, 69, 0.05);
        }

        .oc-lore-text {
          font-size: 0.96rem;
          color: #2D415E;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
        }

        @media (min-width: 768px) {
          .oc-lore-text {
            font-size: 1.05rem;
          }
        }

        .oc-extra-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.35rem;
          width: 100%;
        }

        .oc-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.75rem;
          background: #EFF6F8;
          border: 1px solid rgba(90, 147, 160, 0.3);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3B6B78;
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
