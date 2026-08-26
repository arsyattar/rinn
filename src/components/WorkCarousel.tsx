import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface WorkItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

// direction: 1 = entering from right (go forward), -1 = entering from left (go back)

const works: WorkItem[] = [
  {
    id: 1,
    image: '/photo/work1.png',
    title: 'Alchemical Adventurer — Character Commission',
    description:
      'Bespoke fantasy character illustration featuring stylized adventurer attire, delicate golden hair rendering, and dynamic costume draping.',
  },
  {
    id: 2,
    image: '/photo/work2.png',
    title: 'Celestial Elf — Model Reference Sheet',
    description:
      'Comprehensive character turnaround and specification sheet showcasing front and back views, accessory close-ups, and harmonic color palette.',
  },
];

let slideCounter = 0;

export default function WorkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = from right, -1 = from left
  const [isPaused, setIsPaused] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | string>('auto');
  const cardRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    slideCounter += 1;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % works.length);
    setSlideKey(slideCounter);
  };

  const goToPrev = () => {
    slideCounter += 1;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
    setSlideKey(slideCounter);
  };

  // Measure card height after mount so the stage has fixed height (no layout shift)
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, []);

  // Auto-swipe every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  // Window-level release
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

  // Drag gesture — left drag = next, right drag = prev
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsPaused(false);
    const threshold = 50;
    if (info.offset.x < -threshold || info.velocity.x < -350) {
      goToNext(); // swipe left → next slide enters from right
    } else if (info.offset.x > threshold || info.velocity.x > 350) {
      goToPrev(); // swipe right → prev slide enters from left
    }
  };

  const currentWork = works[currentIndex];

  const transition = {
    type: 'spring' as const,
    stiffness: 340,
    damping: 34,
    mass: 0.9,
  };

  // Enter/exit based on direction
  const enterX = direction === 1 ? '100%' : '-100%';
  const exitX  = direction === 1 ? '-100%' : '100%';

  return (
    <div className="carousel-wrapper">
      {/*
        Stage: position relative + overflow hidden + fixed height.
        Cards inside are position absolute so they overlap during transition.
        mode="sync" means exit and enter run at the same time — no blank frame.
      */}
      <div
        className="carousel-stage"
        style={{ height: cardHeight === 'auto' ? 'auto' : cardHeight }}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slideKey}
            ref={slideKey === 0 ? cardRef : undefined}
            initial={{ x: enterX }}
            animate={{ x: 0 }}
            exit={{ x: exitX }}
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
            className="carousel-card card-royal"
            style={{
              position: slideKey === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              cursor: 'grab',
              willChange: 'transform',
            }}
          >
            {/* Image */}
            <div className="carousel-img-wrap">
              <img
                src={currentWork.image}
                alt={currentWork.title}
                className="carousel-main-img"
                draggable={false}
              />
            </div>

            {/* Details */}
            <div className="carousel-details">
              <div className="details-header">
                <span className="slide-counter">
                  0{currentIndex + 1} / 0{works.length}
                </span>
              </div>
              <h3 className="carousel-work-title">{currentWork.title}</h3>
              <p className="carousel-work-desc">{currentWork.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation: < (dots) > */}
      <div className="carousel-bottom-nav">
        <button
          type="button"
          className="carousel-btn prev-btn"
          onClick={goToPrev}
          aria-label="Previous Artwork"
        >
          <CaretLeft size={18} weight="bold" />
        </button>

        <div className="carousel-pagination">
          {works.map((work, index) => (
            <button
              key={work.id}
              type="button"
              className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                slideCounter += 1;
                setCurrentIndex(index);
                setSlideKey(slideCounter);
              }}
              aria-label={`Go to artwork ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-btn next-btn"
          onClick={goToNext}
          aria-label="Next Artwork"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      <style>{`
        .carousel-wrapper {
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          box-sizing: border-box;
          position: relative;
        }

        /* Stage clips the sliding cards */
        .carousel-stage {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 1.4rem;
          touch-action: pan-y;
          /* Ensure background shows between slides - use same bg as cards */
          background: #FFFFFF;
        }

        /* Card Layout */
        .carousel-card {
          background: #FFFFFF;
          border-radius: 1.4rem;
          border: 1.5px solid var(--color-border-gold);
          box-shadow: 0 16px 40px rgba(30, 42, 69, 0.08), 0 4px 12px rgba(201, 166, 107, 0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 1.25rem;
          box-sizing: border-box;
          gap: 1.25rem;
          user-select: none;
        }

        @media (min-width: 820px) {
          .carousel-card {
            flex-direction: row;
            align-items: center;
            padding: 2rem;
            gap: 2.5rem;
          }
        }

        /* Image Box */
        .carousel-img-wrap {
          position: relative;
          width: 100%;
          height: 320px;
          border-radius: 1.1rem;
          overflow: hidden;
          background: linear-gradient(135deg, #FAF7F0 0%, #EFF6F8 100%);
          border: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 820px) {
          .carousel-img-wrap {
            width: 52%;
            height: 440px;
          }
        }

        .carousel-main-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.75rem;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Details */
        .carousel-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
          flex: 1;
        }

        .details-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .slide-counter {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.05em;
        }

        .carousel-work-title {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 3.2vw, 1.6rem);
          font-weight: 700;
          color: var(--color-secondary);
          line-height: 1.3;
          margin: 0;
        }

        .carousel-work-desc {
          font-size: 0.92rem;
          color: var(--color-text);
          line-height: 1.75;
          margin: 0;
        }

        @media (min-width: 768px) {
          .carousel-work-desc {
            font-size: 0.98rem;
          }
        }

        /* Bottom Nav */
        .carousel-bottom-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.5rem;
          width: 100%;
        }

        .carousel-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--color-border-gold);
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }

        .carousel-btn:hover {
          background: var(--color-secondary);
          color: #FFFFFF;
          border-color: var(--color-secondary);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(30, 42, 69, 0.2);
        }

        .carousel-btn:active {
          transform: translateY(0);
        }

        /* Pagination Dots */
        .carousel-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }

        .pagination-dot {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: var(--color-border);
          border: none;
          cursor: pointer;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
          padding: 0;
        }

        .pagination-dot.active {
          width: 28px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(201, 166, 107, 0.5);
        }
      `}</style>
    </div>
  );
}
