import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkle, User, WhatsappLogo, ArrowSquareOut, ClipboardText } from '@phosphor-icons/react';
import NametageCard from './InteractiveNametag';
import { useLanguage } from '../utils/i18n';
import { translations } from '../utils/translations';

// =========================================================================
// COMMISSION STATUS: Ubah ke 'CLOSED' atau 'OPEN' di sini
// =========================================================================
const COMMISSION_STATUS: 'OPEN' | 'CLOSED' = 'CLOSED';

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const statusText = COMMISSION_STATUS === 'CLOSED' ? t.statusClosed : t.statusOpen;

  const name = "Amai Vaelithys";
  const letters = Array.from(name);

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.35 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 24, rotateX: -65, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 14, stiffness: 110 },
    },
  };

  return (
    <section className="hero-section" id="home">
      {/* Full-bleed Atmospheric Background */}
      <motion.div
        className="hero-bg"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/photo/hero.jpeg" alt="" className="hero-bg-img" aria-hidden="true" />
        <div className="hero-bg-overlay" />
        <div className="hero-bg-fade-bottom" />
        <div className="hero-gold-glow" />
      </motion.div>

      {/* Main Content */}
      <div className="container hero-inner">
        <div className="hero-layout">

          {/* Card Column — auto-flipping nametag */}
          <motion.div
            className="hero-card-col"
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, type: 'spring', damping: 18, stiffness: 100 }}
          >
            <NametageCard />
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="hero-text-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Badge & Tracker */}
            <div className="hero-badge-wrap">
              <span className={`badge-gold ${COMMISSION_STATUS === 'CLOSED' ? 'status-badge-closed' : 'status-badge-open'}`}>
                <span className={`status-indicator-dot ${COMMISSION_STATUS === 'CLOSED' ? 'dot-closed' : 'dot-open'}`} />
                <span>{t.statusLabel}{statusText}</span>
              </span>
              <a
                href="https://trello.com/b/MFek8rz7/rins-commission-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="tracker-badge-link"
                title="View live commission tracker on Trello"
              >
                <ClipboardText size={13} weight="bold" />
                <span>{t.trackerBtn}</span>
                <ArrowSquareOut size={12} weight="bold" />
              </a>
            </div>

            {/* Animated Name with Periodic 5s Wave */}
            <motion.h1
              className="hero-name"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {name.split(' ').map((word, wIdx) => {
                const startOffset = wIdx === 0 ? 0 : 5;
                return (
                  <React.Fragment key={wIdx}>
                    {wIdx > 0 && <span style={{ display: 'inline-block', width: '0.28em' }}>&nbsp;</span>}
                    <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                      {Array.from(word).map((char, cIdx) => {
                        const globalIdx = startOffset + cIdx;
                        return (
                          <motion.span
                            key={cIdx}
                            variants={letterVariants}
                            className="h-char wave-char"
                            style={{
                              animationDelay: `${(globalIdx * 0.08).toFixed(2)}s`,
                            }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  </React.Fragment>
                );
              })}
            </motion.h1>

            {/* Tagline / Bio */}
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.desc}
            </motion.p>

            {/* Specialty Pills */}
            <motion.div
              className="hero-pills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.pills.map((tag) => (
                <span key={tag} className="spec-pill">{tag}</span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#about" className="btn-primary hero-btn">
                <User size={16} weight="bold" /><span>{t.btnAbout}</span>
              </a>
              <a
                href="#contact"
                className="btn-commission-gold hero-btn"
              >
                <Sparkle size={16} weight="bold" /><span>{t.btnOrder}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ============================================
           HERO SECTION — Full-bleed Behind Navbar
        ============================================ */
        .hero-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: flex-start;
          padding-top: calc(52px + 0.25rem);
          padding-bottom: 3.5rem;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 820px) {
          .hero-section {
            min-height: 88vh;
            padding-top: calc(64px + 0.75rem);
            padding-bottom: 5.5rem;
          }
        }

        @media (min-width: 1200px) {
          .hero-section {
            min-height: 90vh;
            padding-top: calc(68px + 1rem);
            padding-bottom: 6.5rem;
          }
        }

        /* Background extending to very top behind navbar */
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          pointer-events: none;
          height: 100%;
          width: 100%;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0.55;
          filter: saturate(1.1) contrast(1.05);
        }

        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            170deg,
            rgba(247,243,234,0.2) 0%,
            rgba(247,243,234,0.55) 40%,
            rgba(247,243,234,0.95) 100%
          );
        }

        .hero-bg-fade-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 180px;
          background: linear-gradient(to bottom, transparent, var(--color-bg));
        }

        .hero-gold-glow {
          position: absolute;
          top: 10%;
          left: 20%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 166, 107, 0.22) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        /* ---- LAYOUT ---- */
        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          box-sizing: border-box;
        }

        .hero-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Card Column */
        .hero-card-col {
          width: 100%;
          max-width: 240px;
          display: flex;
          justify-content: center;
        }

        /* Text Column — Mobile (Centered) */
        .hero-text-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Mobile Order Flow: naturally follows DOM order (Badge -> Name -> Desc -> Pills -> Buttons) */
        .hero-badge-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        /* Desktop: Precise Alignment & Custom Flow */
        @media (min-width: 820px) {
          .hero-layout {
            flex-direction: row;
            align-items: center;
            gap: 4.5rem;
          }

          .hero-card-col {
            flex-shrink: 0;
            width: 290px;
            max-width: 320px;
            margin-top: 0;
          }

          .hero-text-col {
            flex: 1;
            align-items: flex-start;
            text-align: left;
            margin-top: 0;
          }

          /* On Desktop:
             1. Name on top
             2. Description directly under Name
             3. Status & Tracker buttons placed below Description in a sleek, aligned row
             4. Feature Pills
             5. Action Buttons */
          .hero-name {
            order: 1;
            text-align: left;
            margin-bottom: 0.75rem;
          }

          .hero-desc {
            order: 2;
            text-align: left;
            margin-bottom: 1.15rem;
            max-width: 580px;
          }

          .hero-badge-wrap {
            order: 3;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 0.75rem;
            margin-bottom: 1.35rem;
          }

          .hero-pills {
            order: 4;
            justify-content: flex-start;
            margin-bottom: 1.5rem;
          }

          .hero-btns {
            order: 5;
            justify-content: flex-start;
          }
        }

        @media (min-width: 1100px) {
          .hero-card-col {
            width: 320px;
          }
          .hero-layout {
            gap: 5.5rem;
          }
        }

        .badge-gold {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0 0.95rem;
          height: 32px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1;
          box-sizing: border-box;
          white-space: nowrap;
        }

        .tracker-badge-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0 0.95rem;
          height: 32px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(8px);
          border: 1px solid var(--color-border-subtle);
          border-radius: 9999px;
          color: var(--color-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-decoration: none;
          line-height: 1;
          box-sizing: border-box;
          box-shadow: 0 2px 6px rgba(30, 42, 69, 0.04);
          transition: all 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }

        .tracker-badge-link:hover {
          background: #FFFFFF;
          border-color: var(--color-primary);
          color: var(--color-text-gold);
          box-shadow: 0 4px 12px rgba(201, 166, 107, 0.22);
          transform: translateY(-1.5px);
        }

        .tracker-badge-link:active {
          transform: translateY(0);
        }

        .status-indicator-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-closed {
          background-color: #E05D5D;
          box-shadow: 0 0 8px rgba(224, 93, 93, 0.6);
        }

        .dot-open {
          background-color: #27AE60;
          box-shadow: 0 0 8px rgba(39, 174, 96, 0.6);
        }

        .status-badge-closed {
          background-color: rgba(224, 93, 93, 0.08);
          border-color: rgba(224, 93, 93, 0.3);
          color: #B23B3B;
        }

        .status-badge-open {
          background-color: var(--color-primary-subtle);
          border-color: var(--color-border-gold);
          color: var(--color-text-gold);
        }

        /* Name */
        .hero-name {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 6.5vw, 4.4rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.12;
          margin-bottom: 0.85rem;
          perspective: 700px;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .h-char {
          display: inline-block;
          background: linear-gradient(135deg, var(--color-secondary) 25%, #3A4257 65%, var(--color-text-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.18s ease;
        }

        .h-char:hover {
          transform: translateY(-3px) scale(1.08);
          background: linear-gradient(135deg, var(--color-primary) 0%, #E6D3AF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes periodicWave {
          0%, 25%, 100% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 0 rgba(201, 166, 107, 0));
          }
          6% {
            transform: translateY(-9px) scale(1.09);
            filter: drop-shadow(0 4px 10px rgba(201, 166, 107, 0.65));
          }
          12% {
            transform: translateY(3px) scale(0.97);
            filter: drop-shadow(0 2px 5px rgba(201, 166, 107, 0.35));
          }
          18% {
            transform: translateY(-1.5px) scale(1.02);
          }
          22% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 0 rgba(201, 166, 107, 0));
          }
        }

        .wave-char {
          animation: periodicWave 5s ease-in-out infinite;
          will-change: transform, filter;
        }

        /* Desc */
        .hero-desc {
          font-size: clamp(0.9rem, 2.2vw, 1.12rem);
          color: var(--color-text);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 1.25rem;
        }

        /* Pills */
        .hero-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 820px) {
          .hero-pills {
            justify-content: flex-start;
          }
        }

        .spec-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.75rem;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--color-border-subtle);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text);
          box-shadow: 0 1px 3px rgba(30, 42, 69, 0.04);
        }

        /* Buttons */
        .hero-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          width: 100%;
        }

        @media (min-width: 820px) {
          .hero-btns {
            justify-content: flex-start;
          }
        }

        .hero-btn {
          padding: 0.75rem 1.6rem;
          font-size: 0.92rem;
          flex: 0 0 auto;
        }

        .btn-commission-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--color-surface-soft);
          border: 1.5px solid var(--color-primary);
          color: var(--color-text-gold);
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: 0.02em;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(201, 166, 107, 0.16);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-commission-gold:hover {
          background-color: var(--color-secondary);
          border-color: var(--color-secondary);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(30, 42, 69, 0.26);
        }

        .btn-commission-gold:active {
          transform: translateY(0);
        }

        @media (max-width: 440px) {
          .hero-btns {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
