import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight, Star } from '@phosphor-icons/react';

interface HandoverTestimonial {
  id: number;
  clientName: string;
  commissionType: string;
  chatScreenshot: string;
  rating: number;
  date: string;
}

const handoversData: HandoverTestimonial[] = [
  {
    id: 1,
    clientName: 'Hu****a',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/1_huuna.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 2,
    clientName: 'Pep*****nch',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/2_pepperlaunch.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 3,
    clientName: 'R**',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/3_ren.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 4,
    clientName: 'Tep*** Tap****',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/4_tepungtapioka.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 5,
    clientName: 'Z**',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/5_zee.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 6,
    clientName: 'Kl***',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/6_klou.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 7,
    clientName: 'Sun****yo',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/7_sunjaeyo.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 8,
    clientName: 'Ha****ii',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/8_harumii.webp',
    rating: 5,
    date: 'Verified Client',
  },
  {
    id: 9,
    clientName: 'Ha****ii #2',
    commissionType: 'Client Handover',
    chatScreenshot: '/photo/testimoni/9_harumii2.webp',
    rating: 5,
    date: 'Verified Client',
  },
];

let slideCounter = 0;

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | string>('auto');
  const cardRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    slideCounter += 1;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % handoversData.length);
    setSlideKey(slideCounter);
  };

  const prevSlide = () => {
    slideCounter += 1;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + handoversData.length) % handoversData.length);
    setSlideKey(slideCounter);
  };

  const selectSlide = (index: number) => {
    slideCounter += 1;
    setDirection(index >= currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setSlideKey(slideCounter);
  };

  // Measure card height for responsive container
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [currentIndex]);

  // Auto-swipe every 4.5 seconds, pause on hover/touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  // Window-level safety release for pause
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
      nextSlide();
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      prevSlide();
    }
  };

  const current = handoversData[currentIndex];

  const transition = {
    type: 'spring' as const,
    stiffness: 320,
    damping: 32,
    mass: 0.9,
  };

  const enterX = direction === 1 ? '100%' : '-100%';
  const exitX = direction === 1 ? '-100%' : '100%';

  return (
    <div className="handover-wrapper">
      {/* Testimonial Stage Carousel */}
      <div
        className="handover-stage"
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
            ref={cardRef}
            initial={{ x: enterX, opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: exitX, opacity: 0.4 }}
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
            className="handover-card card-royal"
            style={{
              position: slideKey === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              cursor: 'grab',
              willChange: 'transform',
            }}
          >
            {/* Header: Nama Klien, Nama Paket, Bintang 5 + Tanggal */}
            <div className="handover-header">
              <div className="handover-info-col">
                <h4 className="handover-client-name">{current.clientName}</h4>
                <span className="handover-package-name">{current.commissionType}</span>
              </div>

              <div className="handover-rating-date">
                <div className="handover-stars">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={16} weight="fill" className="star-filled" />
                  ))}
                </div>
                <span className="handover-date">{current.date}</span>
              </div>
            </div>

            {/* Foto Chat Serah Terima */}
            <div className="handover-img-stage">
              <img
                src={current.chatScreenshot}
                alt={`Handover proof with ${current.clientName}`}
                className="handover-chat-img"
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls: < (dots) > */}
      <div className="handover-controls">
        <button
          type="button"
          className="handover-nav-btn prev-btn"
          onClick={prevSlide}
          aria-label="Previous Handover Proof"
        >
          <CaretLeft size={18} weight="bold" />
        </button>

        <div className="handover-pagination">
          {handoversData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`handover-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => selectSlide(index)}
              aria-label={`Go to handover proof ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="handover-nav-btn next-btn"
          onClick={nextSlide}
          aria-label="Next Handover Proof"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      <style>{`
        .handover-wrapper {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        .handover-stage {
          position: relative;
          width: 100%;
          min-height: 440px;
          overflow: hidden;
          border-radius: 1.5rem;
          touch-action: pan-y;
        }

        /* Card Frame */
        .handover-card {
          background: #FFFFFF;
          border: 1.5px solid var(--color-border-gold);
          border-radius: 1.5rem;
          padding: 1.4rem 1.25rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          box-shadow: 0 16px 40px rgba(30, 42, 69, 0.07), 0 4px 14px rgba(201, 166, 107, 0.12);
          position: relative;
          overflow: hidden;
          user-select: none;
        }

        @media (min-width: 640px) {
          .handover-card {
            padding: 1.75rem 2rem;
            gap: 1.25rem;
          }
        }

        /* Header: Nama & Paket di Kiri, Bintang 5 + Tanggal di Kanan */
        .handover-header {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          border-bottom: 1px solid var(--color-border-subtle);
          padding-bottom: 0.85rem;
        }

        @media (min-width: 540px) {
          .handover-header {
            flex-direction: row;
            align-items: flex-end;
          }
        }

        .handover-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .handover-client-name {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin: 0;
          line-height: 1.2;
        }

        .handover-package-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-gold);
        }

        .handover-rating-date {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .handover-stars {
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }

        .star-filled {
          color: #E6A23C;
        }

        .handover-date {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        /* Foto Chat Frame */
        .handover-img-stage {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 1.2rem;
          overflow: hidden;
          background: linear-gradient(135deg, #FAF7F0 0%, #EFF6F8 100%);
          border: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .handover-img-stage {
            height: 460px;
          }
        }

        .handover-chat-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.5rem;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.35s ease;
        }

        .handover-card:hover .handover-chat-img {
          transform: scale(1.02);
        }

        /* Controls */
        .handover-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          width: 100%;
        }

        .handover-nav-btn {
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
          box-shadow: 0 2px 8px rgba(30, 42, 69, 0.04);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .handover-nav-btn:hover {
          background: var(--color-secondary);
          color: #FFFFFF;
          border-color: var(--color-secondary);
          transform: translateY(-1px);
        }

        .handover-pagination {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .handover-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: var(--color-border);
          border: none;
          cursor: pointer;
          transition: width 0.3s ease, background-color 0.3s ease;
          padding: 0;
        }

        .handover-dot.active {
          width: 24px;
          background: var(--color-primary);
          box-shadow: 0 0 8px rgba(201, 166, 107, 0.4);
        }
      `}</style>
    </div>
  );
}
