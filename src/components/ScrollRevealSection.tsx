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

  // Smooth entry at bottom and exit at top
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0.2, 1, 1, 0.15]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [35, 0, 0, -30]
  );

  // Break title into words for character/word staggered reveal
  const words = title.split(' ');

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity, y }}
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
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {words.map((word, wIdx) => (
              <span key={wIdx} className="word-wrapper">
                {Array.from(word).map((char, cIdx) => (
                  <motion.span
                    key={cIdx}
                    className="char-reveal"
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
                ))}
                {wIdx < words.length - 1 && <span className="word-space">&nbsp;</span>}
              </span>
            ))}
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
          max-width: 760px;
          margin: 0 auto 2.5rem auto;
          padding: 0 0.5rem;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .section-header-reveal {
            margin-bottom: 3.5rem;
          }
        }

        .section-badge-wrap {
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
          perspective: 600px;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .word-wrapper {
          display: inline-block;
        }

        .char-reveal {
          display: inline-block;
          color: var(--color-secondary);
          transition: color 0.2s ease;
        }

        .char-reveal:hover {
          color: var(--color-primary);
        }

        .word-space {
          display: inline-block;
        }

        .section-reveal-subtitle {
          font-size: clamp(0.88rem, 2vw, 1.05rem);
          color: var(--color-text-muted);
          line-height: 1.65;
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
