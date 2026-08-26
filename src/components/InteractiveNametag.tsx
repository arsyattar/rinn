import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkle, ShieldCheck } from '@phosphor-icons/react';

export default function InteractiveNametag() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Spin 360 degrees smoothly every 5 seconds
    const interval = setInterval(() => {
      setRotation((prev) => prev + 360);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="nametag-wrapper">
      {/* Hanging Lanyard Strap attached to top / navbar */}
      <div className="lanyard-hanger">
        <div className="lanyard-ribbon">
          <div className="lanyard-stitch left-stitch"></div>
          <div className="lanyard-stitch right-stitch"></div>
        </div>
        <div className="lanyard-clasp">
          <div className="clasp-metal-ring"></div>
        </div>
      </div>

      {/* Rotating Card */}
      <motion.div
        className="nametag-flipper"
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateY: rotation }}
        transition={{
          opacity: { duration: 0.5, ease: 'easeOut' },
          scale: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 0.5, ease: 'easeOut' },
          rotateY: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
        }}
      >
        <div className="card-face card-single">
          <div className="card-inner">
            {/* Header Badge */}
            <div className="card-header">
              <span className="card-pass-badge">
                <Sparkle size={10} weight="fill" className="gold-icon" />
                <span>OFFICIAL PASS</span>
              </span>
              <span className="card-id">#AMAI-01</span>
            </div>

            {/* Profile Avatar Image */}
            <div className="card-avatar-box">
              <img
                src="/photo/profil_amai.png"
                alt="Amai Vaelithys Profile"
                className="card-avatar-img"
                draggable={false}
              />
              <div className="avatar-sheen"></div>
            </div>

            {/* Information */}
            <div className="card-info">
              <div className="card-name-row">
                <h3 className="card-name">Amai Vaelithys</h3>
                <ShieldCheck size={14} weight="fill" className="gold-icon" />
              </div>
              <p className="card-role">Lead Illustrator & Visual Artist</p>
              <div className="card-status-row">
                <span className="status-active">
                  <span className="dot-pulse"></span>Available
                </span>
                <span className="card-genre">Fantasy / Anime</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .nametag-wrapper {
          position: relative;
          width: 100%;
          max-width: 200px;
          perspective: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 38px; /* Room for lanyard strap */
        }

        @media (min-width: 820px) {
          .nametag-wrapper {
            max-width: 265px;
            padding-top: 48px;
          }
        }

        /* Hanging Lanyard Strap connected upward to navbar */
        .lanyard-hanger {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
          pointer-events: none;
        }

        @media (min-width: 820px) {
          .lanyard-hanger {
            top: -30px;
          }
        }

        .lanyard-ribbon {
          position: relative;
          width: 13px;
          height: 48px;
          background: linear-gradient(180deg, #1E2A45 0%, #253352 60%, #1A243C 100%);
          box-shadow: 0 2px 6px rgba(30, 42, 69, 0.25);
          display: flex;
          justify-content: space-between;
          padding: 0 1.5px;
        }

        @media (min-width: 820px) {
          .lanyard-ribbon {
            width: 16px;
            height: 60px;
          }
        }

        .lanyard-stitch {
          width: 1.5px;
          height: 100%;
          background: var(--color-primary);
          opacity: 0.85;
        }

        .lanyard-clasp {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -2px;
        }

        .clasp-metal-ring {
          width: 22px;
          height: 14px;
          background: linear-gradient(135deg, #F0E2C8, var(--color-primary), #9B783E);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 5px rgba(30, 42, 69, 0.3);
        }

        @media (min-width: 820px) {
          .clasp-metal-ring {
            width: 26px;
            height: 16px;
          }
        }

        /* Rotating Card Body */
        .nametag-flipper {
          width: 100%;
          position: relative;
          transform-style: preserve-3d;
          z-index: 2;
        }

        .card-face {
          width: 100%;
          border-radius: 1.15rem;
          border: 1.5px solid rgba(201, 166, 107, 0.6);
          background: #FFFFFF;
          box-shadow:
            0 10px 26px rgba(30, 42, 69, 0.1),
            0 2px 6px rgba(201, 166, 107, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          padding: 0.75rem 0.75rem 0.6rem;
          padding-top: 0.85rem;
          box-sizing: border-box;
        }

        @media (min-width: 820px) {
          .card-face {
            border-radius: 1.35rem;
            padding: 1.1rem 1rem 0.85rem;
            padding-top: 1.15rem;
          }
        }

        .card-inner {
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }

        @media (min-width: 820px) {
          .card-header {
            margin-bottom: 0.6rem;
          }
        }

        .card-pass-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--color-text-gold);
          background: var(--color-primary-subtle);
          padding: 0.12rem 0.4rem;
          border-radius: 9999px;
          border: 1px solid var(--color-border-gold);
        }

        @media (min-width: 820px) {
          .card-pass-badge {
            font-size: 0.6rem;
            padding: 0.18rem 0.5rem;
          }
        }

        .gold-icon {
          color: var(--color-primary);
        }

        .card-id {
          font-family: monospace;
          font-size: 0.58rem;
          color: var(--color-border);
          font-weight: 600;
        }

        @media (min-width: 820px) {
          .card-id {
            font-size: 0.65rem;
          }
        }

        /* Avatar Box */
        .card-avatar-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.14;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1.5px solid rgba(201, 166, 107, 0.45);
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #E6F3F5, #FAF7F0);
        }

        @media (min-width: 820px) {
          .card-avatar-box {
            border-radius: 0.95rem;
            margin-bottom: 0.7rem;
          }
        }

        .card-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          pointer-events: none;
          display: block;
        }

        .avatar-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.35) 0%,
            transparent 50%,
            rgba(201, 166, 107, 0.12) 100%
          );
          pointer-events: none;
        }

        /* Info Section */
        .card-info {
          text-align: left;
        }

        .card-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.08rem;
        }

        .card-name {
          font-family: var(--font-serif);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (min-width: 820px) {
          .card-name {
            font-size: 1.15rem;
          }
        }

        .card-role {
          font-size: 0.58rem;
          color: var(--color-text-muted);
          margin-bottom: 0.4rem;
          font-weight: 500;
        }

        @media (min-width: 820px) {
          .card-role {
            font-size: 0.7rem;
            margin-bottom: 0.6rem;
          }
        }

        .card-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--color-surface-soft);
          border: 1px solid var(--color-border-subtle);
          border-radius: 0.45rem;
          padding: 0.22rem 0.4rem;
        }

        @media (min-width: 820px) {
          .card-status-row {
            padding: 0.3rem 0.55rem;
            border-radius: 0.55rem;
          }
        }

        .status-active {
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          font-size: 0.54rem;
          font-weight: 700;
          color: #16a34a;
        }

        @media (min-width: 820px) {
          .status-active {
            font-size: 0.65rem;
            gap: 0.28rem;
          }
        }

        .dot-pulse {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 4px #22c55e;
          animation: dotPulse 1.8s infinite;
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        .card-genre {
          font-size: 0.5rem;
          font-weight: 600;
          color: var(--color-text-gold);
        }

        @media (min-width: 820px) {
          .card-genre {
            font-size: 0.62rem;
          }
        }
      `}</style>
    </div>
  );
}
