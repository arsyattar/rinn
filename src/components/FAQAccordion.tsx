import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CaretDown, Sparkle } from '@phosphor-icons/react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How long does the illustration process usually take?',
    answer:
      'Turnaround time is typically 1 to 2 weeks, depending on the complexity of the character details, pose, and background scenery.',
  },
  {
    id: 2,
    question: 'What payment methods and milestones are accepted?',
    answer:
      'Payment is made after the rough sketch is approved. You can choose to pay in Full or provide a Down Payment (DP), with the remaining balance settled once the artwork is completed. We accept PayPal for international clients, and SeaBank or all major E-Wallets (DANA, GoPay, OVO, ShopeePay) for local Indonesian clients.',
  },
  {
    id: 3,
    question: 'How does the revision policy work?',
    answer:
      'Each commission includes up to 3 complimentary revisions during the sketch stage. Additional revisions beyond 3x start from +Rp 10.000 per revision. Once the artwork enters the coloring stage, only color adjustments are permitted.',
  },
  {
    id: 4,
    question: 'How is commercial usage and licensing handled?',
    answer:
      'Commercial usage (such as YouTube thumbnails, VTuber assets, merchandise, cover art, or promotional business media) incurs an additional +100% of the base price (2x standard rate).',
  },
];

export default function FAQAccordion() {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="faq-accordion-container">
      {faqs.map((faq) => {
        const isOpen = openIds.includes(faq.id);

        return (
          <div
            key={faq.id}
            className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
          >
            <button
              type="button"
              className="faq-question-btn"
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={isOpen}
            >
              <div className="faq-q-left">
                <span className="faq-sparkle">
                  <Sparkle size={14} weight="fill" />
                </span>
                <span className="faq-question-title">{faq.question}</span>
              </div>
              <motion.div
                className="faq-icon-wrap"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaretDown size={18} weight="bold" />
              </motion.div>
            </button>

            {/*
              CSS grid-template-rows trick: animating from 0fr -> 1fr
              is fully GPU-accelerated and never causes layout jitter.
            */}
            <div className={`faq-answer-grid ${isOpen ? 'faq-answer-open' : ''}`}>
              <div className="faq-answer-inner">
                <div className="faq-answer-divider" />
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .faq-accordion-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.15rem;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .faq-item {
          padding: 0;
          overflow: hidden;
          background: #FFFFFF;
          border-radius: 1.25rem;
          border: 1px solid var(--color-border-subtle);
          box-shadow: 0 4px 20px rgba(30, 42, 69, 0.04);
          box-sizing: border-box;
          /* Only transition visual properties, NOT layout ones */
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .faq-item:hover {
          border-color: var(--color-border-gold);
        }

        .faq-item-open {
          border-color: var(--color-primary);
          box-shadow: 0 10px 28px rgba(201, 166, 107, 0.14);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.35rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 1rem;
          user-select: none;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .faq-question-btn {
            padding: 1.45rem 1.75rem;
          }
        }

        .faq-q-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .faq-sparkle {
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-question-title {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-secondary);
          letter-spacing: 0.01em;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        @media (min-width: 640px) {
          .faq-question-title {
            font-size: 1.12rem;
          }
        }

        .faq-item-open .faq-question-title {
          color: var(--color-text-gold);
        }

        .faq-icon-wrap {
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-surface-soft);
          border: 1px solid var(--color-border-subtle);
          flex-shrink: 0;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .faq-item-open .faq-icon-wrap {
          background: var(--color-primary-subtle);
          border-color: var(--color-border-gold);
        }

        /*
          The key to jitter-free accordion:
          Animate grid-template-rows from 0fr -> 1fr.
          This is compositor-friendly and never triggers layout shifts.
        */
        .faq-answer-grid {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.25s ease;
          opacity: 0;
        }

        .faq-answer-open {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .faq-answer-inner {
          overflow: hidden;
          padding: 0 1.35rem 1.35rem 1.35rem;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .faq-answer-inner {
            padding: 0 1.75rem 1.65rem 1.75rem;
          }
        }

        .faq-answer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--color-primary) 0%, rgba(201, 166, 107, 0.15) 100%);
          margin-bottom: 1rem;
        }

        .faq-answer-text {
          font-size: 0.92rem;
          color: var(--color-text);
          line-height: 1.75;
          margin: 0;
        }

        @media (min-width: 640px) {
          .faq-answer-text {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </div>
  );
}
