import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Renders text letter-by-letter with the periodic wave animation.
 * Each word is wrapped in white-space:nowrap so breaks only happen between words,
 * never mid-word (e.g. "ED)" alone on a line).
 */
function WaveText({ text, className = '' }: { text: string; className?: string }) {
  let globalCharIdx = 0;
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, wIdx) => (
        <React.Fragment key={wIdx}>
          {wIdx > 0 && <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {Array.from(word).map((char, cIdx) => {
              const idx = globalCharIdx++;
              return (
                <span
                  key={cIdx}
                  className="card-wave-char"
                  style={{ animationDelay: `${(idx * 0.08).toFixed(2)}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}
import {
  WhatsappLogo,
  Sparkle,
  CheckCircle,
  XCircle,
  CreditCard,
  ArrowsClockwise,
  Users,
  Image,
  CaretDown,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  badge?: string;
  popular?: boolean;
  images: string[];
  features: string[];
  waTemplate: string;
}

const waPhoneNumber = '62859106729954';

const pricingPlans: PricingPlan[] = [
  {
    id: 'bust-up',
    name: 'Bust Up',
    subtitle: 'Head to chest portrait illustration',
    price: 'Rp 80.000',
    popular: true,
    badge: 'Popular Choice',
    images: [
      '/photo/bust_up/bust_up1.webp',
      '/photo/bust_up/bust_up2.webp',
      '/photo/Half_Body/halfbody4.webp',
      '/photo/Half_Body/halfbody5.webp',
      '/photo/Half_Body/halfbody6.webp',
      '/photo/Half_Body/halfbody7.webp',
    ],
    features: [
      'Head to upper chest composition',
      'Custom pose',
      'Simple / Abstract background',
      'High-resolution PNG file',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Bust Up* commission (Rp 80.000).',
  },
  {
    id: 'genshin-icon',
    name: 'Genshin Avatar Icon',
    subtitle: 'Stylized Genshin-themed profile icon',
    price: 'Rp 100.000',
    badge: 'Icon Special',
    images: [
      '/photo/Genshin_Avatar_%20Icon/avatar_icon1.webp',
      '/photo/Genshin_Avatar_%20Icon/avatar_icon2.webp',
    ],
    features: [
      'Official Genshin avatar framing & aesthetic',
      'Clean lighting & expressive character focus',
      'Custom Vision / elemental themed aura',
      'Square & transparent high-res PNG',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Genshin Avatar Icon* commission (Rp 100.000).',
  },
  {
    id: 'half-body',
    name: 'Half Body',
    subtitle: 'Head to waist / thigh artwork',
    price: 'Rp 150.000',
    images: [
      '/photo/Half_Body/halfbody1.webp',
      '/photo/Half_Body/halfbody2.webp',
      '/photo/Half_Body/halfbody3.webp',
      '/photo/Half_Body/couple6.webp',
    ],
    features: [
      'Custom pose',
      'Simple / Abstract background',
      'High-res PNG + transparent background',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Half Body* commission (Rp 150.000).',
  },
  {
    id: 'full-body',
    name: 'Full Body',
    subtitle: 'Complete head-to-toe illustration',
    price: 'Rp 200.000',
    images: [
      '/photo/full_body/fullbody1.webp',
      '/photo/full_body/fullbody2.webp',
      '/photo/full_body/fullbody3.webp',
      '/photo/full_body/fullbody4.webp',
      '/photo/full_body/fullbody5.webp',
    ],
    features: [
      'Custom pose',
      'Full head-to-toe character artwork',
      'Simple / Abstract background',
      'High-res PNG + transparent background',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Full Body* commission (Rp 200.000).',
  },
  {
    id: 'charasheet-simple',
    name: 'Character Sheet (Simple)',
    subtitle: 'Turnaround reference & avatar sheet',
    price: 'Rp 250.000',
    priceNote: 'Start from',
    images: ['/photo/charactersheet_simple/simple1.webp'],
    features: [
      'Front view & Back view turnaround',
      'A few accessory details',
      'Avatar Icon included',
      'Ideal for VTuber / OC design reference',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Character Sheet (Simple)* commission (Start from Rp 250.000).',
  },
  {
    id: 'genshin-drip',
    name: 'Genshin Drip Marketing',
    subtitle: 'Genshin-style character render art',
    price: 'Rp 260.000',
    popular: true,
    badge: 'Signature Style',
    images: [
      '/photo/genshin_drip_marketing/drip_marketing1.webp',
      '/photo/genshin_drip_marketing/drip_marketing2.webp',
      '/photo/genshin_drip_marketing/drip_marketing3.webp',
    ],
    features: [
      'Custom pose',
      'Character only (not a splash art)',
      'Free Genshin drip marketing background',
      'Ultra high-res PNG + transparent',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Genshin Drip Marketing* commission (Rp 260.000).',
  },
  {
    id: 'charasheet-overdetailed',
    name: 'Character Sheet (Overdetailed)',
    subtitle: 'Master tier multi-angle reference sheet',
    price: 'Rp 500.000',
    priceNote: 'Start from',
    badge: 'Master Reference',
    images: ['/photo/charactersheet_overdetailed/overdetailed1.webp'],
    features: [
      'Comprehensive multi-angle turnaround (Front, Back, 3/4)',
      'Accessory & outfit details (overdetailed)',
      'Avatar Icon included',
      'Lore summary & character specs',
    ],
    waTemplate:
      'Hello Amai Vaelithys! I would like to order a *Character Sheet (Overdetailed)* commission (Start from Rp 500.000).',
  },
];

// Reusable image swipe slider embedded inside each pricing card
function CardImageSlider({ images, title }: { images: string[]; title: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const counterRef = useRef(0);

  const nextImg = () => {
    counterRef.current += 1;
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % images.length);
    setSlideKey(counterRef.current);
  };

  const prevImg = () => {
    counterRef.current += 1;
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    setSlideKey(counterRef.current);
  };

  // Auto-swipe image every 4s, only transitions the image locally without any page scrolling
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(nextImg, 4000);
    return () => clearInterval(timer);
  }, [isPaused, currentIdx, images.length]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsPaused(false);
    const threshold = 35;
    if (info.offset.x < -threshold || info.velocity.x < -250) {
      nextImg();
    } else if (info.offset.x > threshold || info.velocity.x > 250) {
      prevImg();
    }
  };

  const transition = {
    type: 'spring' as const,
    stiffness: 340,
    damping: 34,
    mass: 0.9,
  };

  const enterX = direction === 1 ? '100%' : '-100%';
  const exitX = direction === 1 ? '-100%' : '100%';

  return (
    <div className="card-slider-wrapper">
      <div
        className="card-slider-stage"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slideKey}
            initial={{ x: enterX }}
            animate={{ x: 0 }}
            exit={{ x: exitX }}
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
            className="card-slider-slide"
            style={{
              position: slideKey === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'grab',
              willChange: 'transform',
            }}
          >
            <img
              src={images[currentIdx]}
              alt={`${title} Artwork Example ${currentIdx + 1}`}
              className="card-slider-img"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="card-slider-counter">
            0{currentIdx + 1} / 0{images.length}
          </div>
        )}
      </div>

      {/* Slider Controls */}
      {images.length > 1 && (
        <div className="card-slider-nav">
          <button
            type="button"
            className="slider-nav-btn prev-btn"
            onClick={prevImg}
            aria-label={`Previous ${title} example`}
          >
            <CaretLeft size={14} weight="bold" />
          </button>

          <div className="slider-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`slider-dot ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => {
                  counterRef.current += 1;
                  setDirection(idx >= currentIdx ? 1 : -1);
                  setCurrentIdx(idx);
                  setSlideKey(counterRef.current);
                }}
                aria-label={`Go to ${title} example ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="slider-nav-btn next-btn"
            onClick={nextImg}
            aria-label={`Next ${title} example`}
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CommissionPriceList() {
  const [expandedPlans, setExpandedPlans] = useState<string[]>([]);

  // On desktop (≥768px), auto-expand all cards so features are always visible
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setExpandedPlans(pricingPlans.map((p) => p.id));
      } else {
        setExpandedPlans([]);
      }
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPlans((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pricing-wrapper">
      {/* 7 Pricing Cards with Embedded Image Swiper */}
      <div className="pricing-grid">
        {pricingPlans.map((plan) => {
          const isExpanded = expandedPlans.includes(plan.id);
          const encodedMessage = encodeURIComponent(plan.waTemplate);
          const waUrl = `https://wa.me/${waPhoneNumber}?text=${encodedMessage}`;

          return (
            <motion.div
              key={plan.id}
              id={`pricing-${plan.id}`}
              className={`pricing-card card-royal ${plan.popular ? 'pricing-card-highlight' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge placeholder wrap so all titles start at identical vertical level */}
              <div className="pricing-badge-wrap">
                {plan.badge ? (
                  <span className="pricing-badge">
                    <Sparkle size={12} weight="fill" />
                    <span>{plan.badge}</span>
                  </span>
                ) : (
                  <span className="pricing-badge-empty" />
                )}
              </div>

              {/* Card Header with unified heights */}
              <div className="pricing-header">
                <h3 className="pricing-title"><WaveText text={plan.name} /></h3>
                <p className="pricing-subtitle">{plan.subtitle}</p>
              </div>

              {/* Price Display with unified note line */}
              <div className="pricing-price-wrap">
                <span className="pricing-price-note">
                  {plan.priceNote || '\u00A0'}
                </span>
                <div className="pricing-price-val">{plan.price}</div>
              </div>

              {/* 🖼️ Embedded Swipe Image Showcase */}
              <CardImageSlider images={plan.images} title={plan.name} />

              {/* Mobile Toggle Button (Striking & Eye-catching for mobile users) */}
              <button
                type="button"
                className={`mobile-details-toggle ${isExpanded ? 'toggle-open' : ''}`}
                onClick={() => toggleExpand(plan.id)}
                aria-expanded={isExpanded}
              >
                <span className="toggle-label-wrap">
                  <Sparkle size={15} weight="fill" className="toggle-sparkle" />
                  <span>{isExpanded ? 'Hide Package Details' : 'View Package Details'}</span>
                </span>
                <motion.span
                  className="toggle-icon-wrap"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CaretDown size={15} weight="bold" />
                </motion.span>
              </button>

              {/* Feature List — Framer Motion height:auto accordion (mobile) / always visible (desktop) */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="features"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.24, ease: 'easeInOut' },
                    }}
                    style={{ overflow: 'hidden' }}
                    className="pricing-features-mobile-animated"
                  >
                    <ul className="pricing-features">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="pricing-feature-item">
                          <CheckCircle
                            size={17}
                            weight="fill"
                            className="feature-icon"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* WhatsApp Direct Order Button */}
              <div className="pricing-action">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-btn btn-gold-primary"
                  aria-label={`Order ${plan.name} via WhatsApp`}
                >
                  <WhatsappLogo size={18} weight="bold" />
                  <span>Order {plan.name}</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Commission Terms & Policy Box */}
      <motion.div
        className="terms-box card-royal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="terms-header">
          <div className="terms-gem" />
          <h4 className="terms-title"><WaveText text="Commission Terms & Guidelines" /></h4>
          <div className="terms-gem" />
        </div>

        <div className="terms-grid">
          <div className="terms-item">
            <div className="terms-icon-wrap">
              <Image size={20} weight="bold" />
            </div>
            <div className="terms-info">
              <span className="terms-label">Additional Detail &amp; Background</span>
              <p className="terms-desc">
                +Rp 30.000 – Rp 200.000 depending on character complexity & detailed background scenery.
              </p>
            </div>
          </div>

          <div className="terms-item">
            <div className="terms-icon-wrap">
              <Users size={20} weight="bold" />
            </div>
            <div className="terms-info">
              <span className="terms-label">Commercial &amp; Couple Rate</span>
              <p className="terms-desc">
                Commercial use (YouTube thumbnails, VTuber, merch, business) is <strong>+100% (2x base price)</strong>. Couple artworks are 2x base price.
              </p>
            </div>
          </div>

          <div className="terms-item">
            <div className="terms-icon-wrap">
              <CreditCard size={20} weight="bold" />
            </div>
            <div className="terms-info">
              <span className="terms-label">Payment Milestones &amp; Methods</span>
              <p className="terms-desc">
                Payment after rough sketch approval (<strong>Full</strong> or <strong>DP</strong> with balance upon completion). <strong>PayPal</strong> (International) & <strong>SeaBank / All E-Wallets</strong> (Local).
              </p>
            </div>
          </div>

          <div className="terms-item">
            <div className="terms-icon-wrap">
              <ArrowsClockwise size={20} weight="bold" />
            </div>
            <div className="terms-info">
              <span className="terms-label">Revision Policy</span>
              <p className="terms-desc">
                Up to <strong>3x free revisions</strong> during sketch stage. Extra revisions start from <strong>+Rp 10.000/rev</strong>. Coloring stage only allows color adjustments.
              </p>
            </div>
          </div>

          {/* Do & Don't Guidelines — single matching card */}
          <div className="terms-item terms-item-full">
            <div className="terms-icon-wrap">
              <CheckCircle size={20} weight="bold" />
            </div>
            <div className="terms-info">
              <span className="terms-label">Do &amp; Don&apos;t Guidelines</span>
              <div className="terms-dodont-group">
                <p className="terms-desc">
                  <strong>DO:</strong> Male/Female, Fanart/OCs, Couple/Yumeship.
                </p>
                <p className="terms-desc">
                  <strong>DON'T:</strong> NSFW (Suggestive is OK), LGBT, Furry, Mecha/Armor, Gore (slight blood is OK), Old character.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .pricing-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* 7 Cards Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.75rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .pricing-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.75rem;
          }

          .pricing-card:last-child {
            grid-column: 1 / -1;
            max-width: 480px;
            width: 100%;
            justify-self: center;
          }
        }

        @media (min-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
          }

          .pricing-card:last-child {
            grid-column: 2;
            max-width: 100%;
          }
        }

        /* Individual Card */
        .pricing-card {
          background: #FFFFFF;
          border-radius: 1.5rem;
          border: 1.5px solid var(--color-border-subtle);
          padding: 1.4rem 1.25rem;
          display: flex;
          flex-direction: column;
          position: relative;
          box-sizing: border-box;
          gap: 0.75rem;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        @media (min-width: 768px) {
          .pricing-card {
            padding: 1.5rem 1.35rem;
          }
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-border-gold);
          box-shadow: 0 16px 36px rgba(30, 42, 69, 0.1), 0 4px 14px rgba(201, 166, 107, 0.15);
        }

        .pricing-card-highlight {
          border-color: var(--color-primary);
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%);
          box-shadow: 0 10px 30px rgba(201, 166, 107, 0.12);
        }

        .pricing-card-highlight:hover {
          box-shadow: 0 20px 42px rgba(201, 166, 107, 0.22);
        }

        /* Badge */
        .pricing-badge-wrap {
          min-height: 22px;
          display: flex;
          align-items: center;
          margin-bottom: 0.15rem;
        }

        .pricing-badge-empty {
          display: block;
          height: 22px;
        }

        .pricing-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-text-gold);
          background: var(--color-primary-subtle);
          border: 1px solid var(--color-border-gold);
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
        }

        /* Header */
        .pricing-header {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        /* Each character just stays inline-block so word-wrapping works correctly */
        .card-wave-char {
          display: inline-block;
        }

        /* Subtle golden sparkle at the end of every pricing card title */
        @keyframes titleSparkle {
          0%, 68%, 100% {
            opacity: 0.25;
            filter: drop-shadow(0 0 0px rgba(201, 166, 107, 0));
            transform: scale(0.85);
          }
          72% {
            opacity: 1;
            filter: drop-shadow(0 0 6px rgba(201, 166, 107, 0.85));
            transform: scale(1.25);
          }
          76% {
            opacity: 0.3;
            filter: drop-shadow(0 0 1px rgba(201, 166, 107, 0.2));
            transform: scale(0.9);
          }
          80% {
            opacity: 1;
            filter: drop-shadow(0 0 6px rgba(201, 166, 107, 0.85));
            transform: scale(1.25);
          }
          85% {
            opacity: 0.25;
            filter: drop-shadow(0 0 0px rgba(201, 166, 107, 0));
            transform: scale(0.85);
          }
        }

        .pricing-title::after {
          content: '✦';
          display: inline-block;
          margin-left: 0.3em;
          font-size: 0.6em;
          vertical-align: middle;
          color: var(--color-primary);
          animation: titleSparkle 6s ease-in-out infinite;
          will-change: opacity, filter, transform;
        }

        .pricing-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-secondary);
          line-height: 1.25;
          margin: 0;
        }

        @media (min-width: 1024px) {
          .pricing-title {
            font-size: 1.22rem;
          }
        }

        .pricing-subtitle {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.35;
          margin: 0;
        }

        /* Price */
        .pricing-price-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid var(--color-border-subtle);
          justify-content: flex-end;
        }

        .pricing-price-note {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          min-height: 14px;
          line-height: 1.2;
        }

        .pricing-price-val {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--color-text-gold);
          line-height: 1;
        }

        /* 🖼️ Embedded Image Slider inside Card */
        .card-slider-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 100%;
          box-sizing: border-box;
        }

        .card-slider-stage {
          position: relative;
          width: 100%;
          height: 260px;
          border-radius: 1.15rem;
          overflow: hidden;
          background: linear-gradient(135deg, #FAF7F0 0%, #EFF6F8 100%);
          border: 1px solid var(--color-border-subtle);
          touch-action: pan-y;
          user-select: none;
        }

        @media (min-width: 768px) {
          .card-slider-stage {
            height: 280px;
          }
        }

        .card-slider-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-slider-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.5rem;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.35s ease;
        }

        .pricing-card:hover .card-slider-img {
          transform: scale(1.03);
        }

        .card-slider-counter {
          position: absolute;
          bottom: 8px;
          right: 10px;
          background: rgba(30, 42, 69, 0.7);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-family: monospace;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          border: 1px solid rgba(201, 166, 107, 0.4);
          z-index: 5;
          pointer-events: none;
        }

        .card-slider-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
        }

        .slider-nav-btn {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid var(--color-border-gold);
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 4px rgba(30, 42, 69, 0.05);
          flex-shrink: 0;
        }

        .slider-nav-btn:hover {
          background: var(--color-secondary);
          color: #FFFFFF;
          border-color: var(--color-secondary);
        }

        .slider-dots {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .slider-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--color-border);
          border: none;
          cursor: pointer;
          transition: width 0.25s ease, background-color 0.25s ease;
          padding: 0;
        }

        .slider-dot.active {
          width: 18px;
          background: var(--color-primary);
          box-shadow: 0 0 6px rgba(201, 166, 107, 0.4);
        }

        /* Mobile Details Toggle Button - Eye-Catching & Gold Accented */
        .mobile-details-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: linear-gradient(135deg, #FFFDF8 0%, #F5EEDC 100%);
          border: 1.5px solid var(--color-primary);
          border-radius: 0.85rem;
          padding: 0.72rem 0.95rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-secondary);
          cursor: pointer;
          box-sizing: border-box;
          box-shadow: 0 3px 10px rgba(201, 166, 107, 0.18);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-details-toggle:hover,
        .mobile-details-toggle:active {
          background: linear-gradient(135deg, #F5EEDC 0%, #E8DCBE 100%);
          box-shadow: 0 5px 15px rgba(201, 166, 107, 0.3);
          transform: translateY(-1px);
        }

        .mobile-details-toggle.toggle-open {
          background: var(--color-secondary);
          color: #FFFFFF;
          border-color: var(--color-secondary);
          box-shadow: 0 4px 14px rgba(30, 42, 69, 0.2);
        }

        .toggle-label-wrap {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .toggle-sparkle {
          color: var(--color-primary);
          transition: transform 0.2s ease;
        }

        .mobile-details-toggle.toggle-open .toggle-sparkle {
          color: var(--color-primary-light);
        }

        .toggle-icon-wrap {
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(201, 166, 107, 0.18);
          transition: all 0.25s ease;
        }

        .mobile-details-toggle.toggle-open .toggle-icon-wrap {
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        /* Features Accordion — Framer Motion handles the animation,
           these CSS rules control mobile vs desktop visibility */

        /* Mobile animated accordion: shown by AnimatePresence */
        .pricing-features-mobile-animated {
          padding-bottom: 0.35rem;
        }

        /* Desktop: always visible features list */
        .pricing-features-desktop {
          display: none;
        }

        /* Mobile toggle hidden on desktop since features are auto-expanded */
        @media (min-width: 768px) {
          .mobile-details-toggle {
            display: none;
          }
        }

        /* Features List */
        .pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .pricing-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.84rem;
          color: var(--color-text);
          line-height: 1.4;
        }

        .feature-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        /* Action Buttons */
        .pricing-action {
          margin-top: auto;
          width: 100%;
          padding-top: 0.5rem;
        }

        .pricing-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.8rem 1rem;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          box-sizing: border-box;
          transition: all var(--transition-fast);
          cursor: pointer;
          background: linear-gradient(135deg, var(--color-primary) 0%, #B89355 100%);
          color: #1E2A45;
          border: 1.5px solid transparent;
          box-shadow: 0 4px 14px rgba(201, 166, 107, 0.3);
        }

        .pricing-btn:hover {
          background: #1E2A45;
          color: #FFFFFF;
          border-color: #1E2A45;
          box-shadow: 0 6px 20px rgba(30, 42, 69, 0.25);
          transform: translateY(-2px);
        }

        /* Terms & Guidelines Box */
        .terms-box {
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F9FB 60%, #EBF4F7 100%);
          border: 1.5px solid var(--color-border-gold);
          border-radius: 1.5rem;
          padding: 2rem 1.5rem;
          box-sizing: border-box;
          box-shadow: 0 12px 32px rgba(30, 42, 69, 0.06);
        }

        @media (min-width: 768px) {
          .terms-box {
            padding: 2.5rem 2.25rem;
          }
        }

        .terms-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
          text-align: center;
        }

        .terms-gem {
          width: 8px;
          height: 8px;
          background: var(--color-primary);
          transform: rotate(45deg);
          border-radius: 1px;
        }

        .terms-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin: 0;
        }

        .terms-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.25rem;
        }

        @media (min-width: 640px) {
          .terms-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        .terms-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid var(--color-border-subtle);
          border-radius: 1rem;
          padding: 1.15rem;
          box-sizing: border-box;
        }

        .terms-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--color-primary-subtle);
          border: 1px solid var(--color-border-gold);
          color: var(--color-text-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .terms-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .terms-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-secondary);
        }

        .terms-desc {
          font-size: 0.82rem;
          color: var(--color-text);
          line-height: 1.5;
          margin: 0;
        }

        .terms-item-full {
          grid-column: 1 / -1;
          width: 100%;
          max-width: 520px;
          justify-self: center;
        }

        .terms-dodont-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
      `}</style>
    </div>
  );
}
