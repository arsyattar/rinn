import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollRevealSectionProps {
  id?: string;
  className?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function ScrollRevealSection({
  id,
  className = '',
  badge,
  title,
  subtitle,
  children,
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Hook into viewport scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth subtle translateY entry without dimming text opacity
  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [20, 0, 0, -10]
  );

  // Break title into individual characters (with word/space tracking)
  const chars: { char: string; isSpace: boolean; charIndex: number }[] = [];
  let charIdx = 0;
  title.split(' ').forEach((word, wIdx) => {
    if (wIdx > 0) {
      chars.push({ char: ' ', isSpace: true, charIndex: charIdx++ });
    }
    Array.from(word).forEach((c) => {
      chars.push({ char: c, isSpace: false, charIndex: charIdx++ });
    });
  });

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ y }}
      className={`scroll-reveal-section ${className}`}
    >
      <div className="container">
        {/* Section Header with Staggered Scroll Animation */}
        <div className="section-header-reveal">
          {badge && (
            <motion.div
              className="section-badge-wrap"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge-gold">✦ {badge} ✦</span>
            </motion.div>
          )}

          <motion.h2
            className="section-reveal-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04,
                },
              },
            }}
          >
            {chars.map(({ char, isSpace, charIndex }) =>
              isSpace ? (
                <span key={charIndex} className="word-space">&nbsp;</span>
              ) : (
                <motion.span
                  key={charIndex}
                  className="char-reveal section-wave-char"
                  style={{
                    animationDelay: `${(charIndex * 0.08).toFixed(2)}s`,
                  }}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                      rotateX: -60,
                      filter: 'blur(3px)',
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)',
                      transition: {
                        type: 'spring',
                        damping: 14,
                        stiffness: 110,
                      },
                    },
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="section-reveal-subtitle"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Section Content */}
        {children && (
          <motion.div
            className="section-body-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>

      <style>{`
        .scroll-reveal-section {
          padding: 4rem 0;
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .scroll-reveal-section {
            padding: 5.5rem 0;
          }
        }

        .section-header-reveal {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 760px;
          margin: 0 auto 2.5rem auto;
          padding: 0 1rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .section-header-reveal {
            margin-bottom: 3.5rem;
          }
        }

        .section-badge-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 0.85rem;
        }

        .section-reveal-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 5vw, 2.9rem);
          font-weight: 700;
          color: var(--color-secondary);
          letter-spacing: 0.01em;
          line-height: 1.25;
          margin-bottom: 0.85rem;
          text-align: center;
          width: 100%;
          perspective: 600px;
        }

        .word-space {
          display: inline-block;
          width: 0.35em;
        }

        .char-reveal {
          display: inline-block;
          color: var(--color-secondary);
          transition: color 0.2s ease;
        }

        .char-reveal:hover {
          color: var(--color-primary);
        }

        /* Periodic wave animation — same timing as hero section name (5s) */
        @keyframes sectionPeriodicWave {
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

        .section-wave-char {
          animation: sectionPeriodicWave 5s ease-in-out infinite;
          will-change: transform, filter;
        }

        .section-reveal-subtitle {
          font-size: clamp(0.92rem, 2vw, 1.08rem);
          color: #2D3748;
          font-weight: 500;
          line-height: 1.65;
          text-align: center;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .section-body-wrap {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </motion.section>
  );
}
