import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight, Sparkle } from '@phosphor-icons/react';

interface CategoryItem {
  id: string;
  title: string;
  price: string;
  priceNote?: string;
  images: string[];
}

const categoriesData: CategoryItem[] = [
  {
    id: 'bust-up',
    title: 'Bust Up',
    price: 'Rp 80.000',
    images: [
      '/photo/bust_up/bust_up1.webp',
      '/photo/bust_up/bust_up2.webp',
      '/photo/Half_Body/halfbody4.webp',
      '/photo/Half_Body/halfbody5.webp',
      '/photo/Half_Body/halfbody6.webp',
      '/photo/Half_Body/halfbody7.webp',
    ],
  },
  {
    id: 'genshin-icon',
    title: 'Genshin Avatar Icon',
    price: 'Rp 100.000',
    images: [
      '/photo/Genshin_Avatar_%20Icon/avatar_icon1.webp',
      '/photo/Genshin_Avatar_%20Icon/avatar_icon2.webp',
    ],
  },
  {
    id: 'half-body',
    title: 'Half Body',
    price: 'Rp 150.000',
    images: [
      '/photo/Half_Body/halfbody1.webp',
      '/photo/Half_Body/halfbody2.webp',
      '/photo/Half_Body/halfbody3.webp',
      '/photo/Half_Body/couple6.webp',
    ],
  },
  {
    id: 'full-body',
    title: 'Full Body',
    price: 'Rp 200.000',
    images: [
      '/photo/full_body/fullbody1.webp',
      '/photo/full_body/fullbody2.webp',
      '/photo/full_body/fullbody3.webp',
      '/photo/full_body/fullbody4.webp',
      '/photo/full_body/fullbody5.webp',
    ],
  },
  {
    id: 'charasheet-simple',
    title: 'Character Sheet (Simple)',
    price: 'Rp 250.000',
    priceNote: 'Start from',
    images: ['/photo/charactersheet_simple/simple1.webp'],
  },
  {
    id: 'genshin-drip',
    title: 'Genshin Drip Art',
    price: 'Rp 260.000',
    images: [
      '/photo/genshin_drip_marketing/drip_marketing1.webp',
      '/photo/genshin_drip_marketing/drip_marketing2.webp',
      '/photo/genshin_drip_marketing/drip_marketing3.webp',
      '/photo/genshin_drip_marketing/drip_marketing4.webp',
    ],
  },
  {
    id: 'charasheet-overdetailed',
    title: 'Character Sheet (Overdetailed)',
    price: 'Rp 500.000',
    priceNote: 'Start from',
    images: ['/photo/charactersheet_overdetailed/overdetailed1.webp'],
  },
];

// Subcomponent for individual category card with isolated image-only swiping
function CategoryCard({ item }: { item: CategoryItem }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const slideCounterRef = useRef(0);

  const nextImage = () => {
    slideCounterRef.current += 1;
    setDirection(1);
    setCurrentImgIndex((prev) => (prev + 1) % item.images.length);
    setSlideKey(slideCounterRef.current);
  };

  const prevImage = () => {
    slideCounterRef.current += 1;
    setDirection(-1);
    setCurrentImgIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    setSlideKey(slideCounterRef.current);
  };

  // Auto-swipe every 4s, only affects image transition, NO page scrolling
  useEffect(() => {
    if (isPaused || item.images.length <= 1) return;
    const timer = setInterval(nextImage, 4000);
    return () => clearInterval(timer);
  }, [isPaused, currentImgIndex, item.images.length]);

  // Window-level safety release
  useEffect(() => {
    const handleRelease = () => setIsPaused(false);
    window.addEventListener('mouseup', handleRelease);
    window.addEventListener('touchend', handleRelease);
    window.addEventListener('touchcancel', handleRelease);
    return () => {
      window.removeEventListener('mouseup', handleRelease);
      window.removeEventListener('touchend', handleRelease);
      window.removeEventListener('touchcancel', handleRelease);
    };
  }, []);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsPaused(false);
    const threshold = 40;
    if (info.offset.x < -threshold || info.velocity.x < -300) {
      nextImage();
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      prevImage();
    }
  };

  const scrollToPricing = () => {
    const targetEl = document.getElementById(`pricing-${item.id}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="cat-card card-royal" id={`gallery-${item.id}`}>
      {/* 1. Header (Static - Not Swiped) */}
      <div className="cat-card-header">
        <div className="cat-title-group">
          <div className="cat-badge">
            <Sparkle size={13} weight="fill" className="badge-sparkle" />
            <span>Category</span>
          </div>
          <h3 className="cat-title-name">{item.title}</h3>
        </div>

        <div className="cat-price-pill">
          {item.priceNote && <span className="cat-price-note">{item.priceNote}</span>}
          <span className="cat-price-val">{item.price}</span>
        </div>
      </div>

      {/* 2. Image Showcase Stage (ONLY the Image is Swiped) */}
      <div
        className="cat-image-stage"
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
            className="cat-slide-image-wrap"
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
              src={item.images[currentImgIndex]}
              alt={`${item.title} example ${currentImgIndex + 1}`}
              className="cat-main-img"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge inside image stage */}
        <div className="stage-counter-badge">
          0{currentImgIndex + 1} / 0{item.images.length}
        </div>
      </div>

      {/* 3. Image Navigation Controls (< dots >) */}
      {item.images.length > 1 && (
        <div className="cat-image-nav">
          <button
            type="button"
            className="cat-nav-btn prev-btn"
            onClick={prevImage}
            aria-label={`Previous ${item.title} image`}
          >
            <CaretLeft size={16} weight="bold" />
          </button>

          <div className="cat-dots">
            {item.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`cat-dot ${idx === currentImgIndex ? 'active' : ''}`}
                onClick={() => {
                  slideCounterRef.current += 1;
                  setDirection(idx >= currentImgIndex ? 1 : -1);
                  setCurrentImgIndex(idx);
                  setSlideKey(slideCounterRef.current);
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="cat-nav-btn next-btn"
            onClick={nextImage}
            aria-label={`Next ${item.title} image`}
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      )}

      {/* 4. Bottom Action Bar (Static - Not Swiped) */}
      <div className="cat-card-action">
        <button
          type="button"
          onClick={scrollToPricing}
          className="cat-view-details-btn btn-gold-primary"
          aria-label={`View package details for ${item.title}`}
        >
          <Sparkle size={16} weight="fill" />
          <span>View Package Details</span>
        </button>
      </div>
    </div>
  );
}

export default function WorkCarousel() {
  return (
    <div className="works-categories-container">
      {categoriesData.map((item) => (
        <CategoryCard key={item.id} item={item} />
      ))}

      <style>{`
        .works-categories-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 2.5rem;
          max-width: 960px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        /* Category Card Container */
        .cat-card {
          background: #FFFFFF;
          border-radius: 1.6rem;
          border: 1.5px solid var(--color-border-gold);
          box-shadow: 0 16px 40px rgba(30, 42, 69, 0.08), 0 4px 14px rgba(201, 166, 107, 0.12);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          box-sizing: border-box;
          gap: 1.25rem;
          scroll-margin-top: 5rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        @media (min-width: 768px) {
          .cat-card {
            padding: 2rem 2.25rem;
            gap: 1.5rem;
          }
        }

        .cat-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 20px 48px rgba(30, 42, 69, 0.12), 0 6px 18px rgba(201, 166, 107, 0.18);
        }

        /* 1. Header */
        .cat-card-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          border-bottom: 1px solid var(--color-border-subtle);
          padding-bottom: 1rem;
        }

        @media (min-width: 640px) {
          .cat-card-header {
            flex-direction: row;
            align-items: center;
          }
        }

        .cat-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .cat-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-gold);
          background: var(--color-primary-subtle);
          border: 1px solid var(--color-border-gold);
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
          width: fit-content;
        }

        .badge-sparkle {
          color: var(--color-primary);
        }

        .cat-title-name {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-secondary);
          line-height: 1.25;
          margin: 0;
        }

        @media (min-width: 768px) {
          .cat-title-name {
            font-size: 1.65rem;
          }
        }

        .cat-price-pill {
          display: inline-flex;
          align-items: baseline;
          gap: 0.35rem;
          background: #FAF7F2;
          border: 1.5px solid var(--color-border-gold);
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          box-shadow: var(--shadow-sm);
        }

        .cat-price-note {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .cat-price-val {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text-gold);
          line-height: 1;
        }

        /* 2. Image Stage (Only Image Transitions) */
        .cat-image-stage {
          position: relative;
          width: 100%;
          height: 340px;
          border-radius: 1.25rem;
          overflow: hidden;
          background: linear-gradient(135deg, #FAF7F0 0%, #EFF6F8 100%);
          border: 1px solid var(--color-border-subtle);
          touch-action: pan-y;
          user-select: none;
        }

        @media (min-width: 768px) {
          .cat-image-stage {
            height: 440px;
          }
        }

        .cat-slide-image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cat-main-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.75rem;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.4s ease;
        }

        .cat-card:hover .cat-main-img {
          transform: scale(1.02);
        }

        .stage-counter-badge {
          position: absolute;
          bottom: 12px;
          right: 14px;
          background: rgba(30, 42, 69, 0.75);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid rgba(201, 166, 107, 0.4);
          z-index: 10;
          pointer-events: none;
        }

        /* 3. Image Navigation */
        .cat-image-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          width: 100%;
        }

        .cat-nav-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid var(--color-border-gold);
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(30, 42, 69, 0.06);
          flex-shrink: 0;
        }

        .cat-nav-btn:hover {
          background: var(--color-secondary);
          color: #FFFFFF;
          border-color: var(--color-secondary);
          transform: translateY(-1px);
        }

        .cat-dots {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .cat-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: var(--color-border);
          border: none;
          cursor: pointer;
          transition: width 0.3s ease, background-color 0.3s ease;
          padding: 0;
        }

        .cat-dot.active {
          width: 22px;
          background: var(--color-primary);
          box-shadow: 0 0 8px rgba(201, 166, 107, 0.5);
        }

        /* 4. Bottom Action */
        .cat-card-action {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 0.25rem;
        }

        .cat-view-details-btn {
          width: 100%;
          max-width: 420px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.8rem 1.5rem;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-sizing: border-box;
          transition: all var(--transition-fast);
          background: linear-gradient(135deg, var(--color-primary) 0%, #B89355 100%);
          color: #1E2A45;
          box-shadow: 0 4px 14px rgba(201, 166, 107, 0.3);
        }

        .cat-view-details-btn:hover {
          background: #1E2A45;
          color: #FFFFFF;
          box-shadow: 0 6px 20px rgba(30, 42, 69, 0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
