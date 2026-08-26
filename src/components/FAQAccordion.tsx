import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretDown, Sparkle } from '@phosphor-icons/react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How long does an illustration usually take?',
    answer:
      'Turnaround time generally ranges from 2 to 4 weeks depending on the complexity of the artwork, background details, and current project queue.',
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer:
      'Payments are securely handled via PayPal invoice or Stripe (international credit/debit cards). A deposit or upfront agreement is confirmed before sketching begins.',
  },
  {
    id: 3,
    question: 'Do you allow commercial usage?',
    answer:
      'Yes! Commercial rights for VTuber assets, merchandise, light novel covers, and promotional media can be arranged with tailored licensing terms.',
  },
  {
    id: 4,
    question: 'How do revisions and feedback work?',
    answer:
      'You receive complimentary revision checkpoints during the composition sketch phase and base color stage to ensure the final piece aligns with your vision.',
  },
];

export default function FAQAccordion() {
  // Store open items (allow multiple to be open or toggle individually)
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
            className={`faq-item card-royal ${isOpen ? 'faq-item-open' : ''}`}
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
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaretDown size={18} weight="bold" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0, scaleY: 0.9 }}
                  animate={{ height: 'auto', opacity: 1, scaleY: 1 }}
                  exit={{ height: 0, opacity: 0, scaleY: 0.9 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3, ease: 'easeOut' },
                    scaleY: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  style={{ transformOrigin: 'top center', overflow: 'hidden' }}
                  className="faq-answer-wrapper"
                >
                  <div className="faq-answer-inner">
                    <div className="faq-answer-divider"></div>
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--color-border-subtle);
          background: #FFFFFF;
        }

        .faq-item:hover {
          border-color: var(--color-border-gold);
        }

        .faq-item-open {
          border-color: var(--color-primary);
          box-shadow: 0 12px 32px rgba(201, 166, 107, 0.16);
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
          transition: background-color 0.2s ease;
        }

        .faq-item-open .faq-icon-wrap {
          background: var(--color-primary-subtle);
          border-color: var(--color-border-gold);
        }

        .faq-answer-wrapper {
          width: 100%;
        }

        .faq-answer-inner {
          padding: 0 1.35rem 1.45rem 1.35rem;
          position: relative;
        }

        @media (min-width: 640px) {
          .faq-answer-inner {
            padding: 0 1.75rem 1.75rem 1.75rem;
          }
        }

        .faq-answer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--color-primary) 0%, rgba(201, 166, 107, 0.15) 100%);
          margin-bottom: 1.1rem;
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
