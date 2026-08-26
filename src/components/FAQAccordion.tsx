import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretDown, Sparkle, WhatsappLogo, ChatDots } from '@phosphor-icons/react';

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

const waPhoneNumber = '62859106729954';
const waInquiryTemplate =
  'Hello Amai Vaelithys! I visited your portfolio website and have a question regarding commissions / custom projects:\n\n• Name / Handle:\n• Question / Inquiries:';
const encodedInquiry = encodeURIComponent(waInquiryTemplate);
const waInquiryUrl = `https://wa.me/${waPhoneNumber}?text=${encodedInquiry}`;

export default function FAQAccordion() {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="faq-wrapper">
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

              {/* Framer Motion height:auto accordion — smooth on iOS WebKit & all browsers */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.24, ease: 'easeInOut' },
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-answer-inner">
                      <div className="faq-answer-divider" />
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions? / Direct WhatsApp Inquiry Box */}
      <div className="faq-inquiry-box card-royal">
        <div className="faq-inquiry-content">
          <div className="faq-inquiry-icon-wrap">
            <ChatDots size={24} weight="bold" />
          </div>
          <div className="faq-inquiry-text">
            <h4 className="faq-inquiry-title">Still have questions?</h4>
            <p className="faq-inquiry-desc">
              Have a special request, custom concept, or questions not covered in the FAQ? Send a direct message on WhatsApp!
            </p>
          </div>
        </div>

        <div className="faq-inquiry-action">
          <a
            href={waInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-inquiry-btn btn-gold-primary"
            aria-label="Ask a question via WhatsApp"
          >
            <WhatsappLogo size={18} weight="bold" />
            <span>Ask a Question on WhatsApp</span>
          </a>
        </div>
      </div>

      <style>{`
        .faq-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .faq-accordion-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.15rem;
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
          Framer Motion handles height animation — these classes only handle
          padding/styling of the answer content itself.
        */
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

        /* Still Have Questions Box */
        .faq-inquiry-box {
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF7F2 100%);
          border: 1.5px solid var(--color-border-gold);
          border-radius: 1.4rem;
          padding: 1.5rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 0 8px 24px rgba(30, 42, 69, 0.05);
        }

        @media (min-width: 768px) {
          .faq-inquiry-box {
            flex-direction: row;
            padding: 1.75rem 2rem;
            gap: 2rem;
          }
        }

        .faq-inquiry-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          width: 100%;
        }

        .faq-inquiry-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--color-primary-subtle);
          border: 1.5px solid var(--color-border-gold);
          color: var(--color-text-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-inquiry-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .faq-inquiry-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin: 0;
          line-height: 1.25;
        }

        .faq-inquiry-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin: 0;
        }

        .faq-inquiry-action {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .faq-inquiry-action {
            width: auto;
          }
        }

        .faq-inquiry-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.75rem 1.35rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          box-sizing: border-box;
          white-space: nowrap;
          transition: all var(--transition-fast);
          cursor: pointer;
          background: linear-gradient(135deg, var(--color-primary) 0%, #B89355 100%);
          color: #1E2A45;
          border: 1.5px solid transparent;
          box-shadow: 0 4px 14px rgba(201, 166, 107, 0.3);
        }

        @media (min-width: 768px) {
          .faq-inquiry-btn {
            width: auto;
          }
        }

        .faq-inquiry-btn:hover {
          background: #1E2A45;
          color: #FFFFFF;
          border-color: #1E2A45;
          box-shadow: 0 6px 20px rgba(30, 42, 69, 0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
