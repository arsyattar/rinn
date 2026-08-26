import React from 'react';
import { motion } from 'motion/react';
import { Sparkle, User, WhatsappLogo } from '@phosphor-icons/react';
import NametageCard from './InteractiveNametag';

export default function HeroSection() {
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
            {/* Status Badge */}
            <div className="hero-badge-wrap">
              <span className="badge-gold">
                <Sparkle size={12} weight="fill" />
                <span>Alchemical Visuals</span>
                <span className="badge-bullet">✦</span>
                <span>Official Portfolio</span>
              </span>
            </div>

            {/* Animated Name with Periodic 5s Wave */}
            <motion.h1
              className="hero-name"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className={char === ' ' ? 'h-space' : 'h-char wave-char'}
                  style={{
                    animationDelay: `${(i * 0.08).toFixed(2)}s`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Tagline / Bio */}
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              Digital Illustrator & Character Concept Artist crafting luminous anime aesthetics, celestial fantasy realms, and bespoke visual narratives.
            </motion.p>

            {/* Specialty Pills */}
            <motion.div
              className="hero-pills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            >
              {['OC & Fan Concepts', 'High-Res Digital Art', 'Character Concepts'].map((tag) => (
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
                <User size={16} weight="bold" /><span>About Artist</span>
              </a>
              <a
                href="#contact"
                className="btn-commission-gold hero-btn"
              >
                <Sparkle size={16} weight="bold" /><span>Order Commission</span>
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
          gap: 1.25rem;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Desktop: Side-by-Side */
        @media (min-width: 820px) {
          .hero-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 4.5rem;
          }

          .hero-card-col {
            flex-shrink: 0;
            width: 290px;
            margin-top: -0.25rem;
          }

          .hero-text-col {
            flex: 1;
            align-items: flex-start;
            text-align: left;
            margin-top: 1.5rem;
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

        /* Card Column */
        .hero-card-col {
          width: 100%;
          max-width: 230px;
          display: flex;
          justify-content: center;
        }



        @media (min-width: 820px) {
          .hero-card-col {
            max-width: 320px;
          }
        }

        /* Text Column */
        .hero-text-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Badge */
        .hero-badge-wrap {
          margin-bottom: 0.75rem;
        }

        .badge-bullet {
          color: var(--color-primary);
          font-size: 0.5rem;
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
