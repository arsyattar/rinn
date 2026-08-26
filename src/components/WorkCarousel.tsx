import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface WorkItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

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

export default function WorkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  // Auto-swipe every 4 seconds, pause strictly when pressed/held
  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, currentIndex]);

  // Window-level safety to ensure unpause when mouse or touch is released anywhere
  useEffect(() => {
    const handleRelease = () => {
      setIsPaused(false);
      setIsDragging(false);
    };

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
    setIsDragging(false);
    setIsPaused(false);
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -350) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 350) {
      prevSlide();
    }
  };

  return (
    <div className="carousel-wrapper">
      {/* Sliding Viewport */}
      <div
        className="carousel-viewport"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        <motion.div
          className="carousel-track"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 32,
            mass: 0.8,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            setIsDragging(true);
            setIsPaused(true);
          }}
          onDragEnd={handleDragEnd}
        >
          {works.map((work, index) => (
            <div key={work.id} className="carousel-slide">
              <div className="carousel-card card-royal">
                {/* Image Preview Container */}
                <div className="carousel-img-wrap">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="carousel-main-img"
                    draggable={false}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>

                {/* Content Details */}
                <div className="carousel-details">
                  <div className="details-header">
                    <span className="slide-counter">
                      0{index + 1} / 0{works.length}
                    </span>
                  </div>
                  <h3 className="carousel-work-title">{work.title}</h3>
                  <p className="carousel-work-desc">{work.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation: < (dots) > */}
      <div className="carousel-bottom-nav">
        <button
          type="button"
          className="carousel-btn prev-btn"
          onClick={prevSlide}
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
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to artwork ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-btn next-btn"
          onClick={nextSlide}
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

        /* Viewport & Track */
        .carousel-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 1.4rem;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }

        .carousel-viewport:active {
          cursor: grabbing;
        }

        .carousel-track {
          display: flex;
          width: 100%;
          will-change: transform;
        }

        .carousel-slide {
          flex: 0 0 100%;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Card Layout */
        .carousel-card {
          width: 100%;
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

        /* Bottom Navigation: < (dots) > */
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
