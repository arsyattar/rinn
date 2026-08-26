import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  WhatsappLogo,
  Sparkle,
  CheckCircle,
  CreditCard,
  ArrowsClockwise,
  Users,
  Image,
  CaretDown,
} from '@phosphor-icons/react';

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  waTemplate: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'bust-up',
    name: 'Bust Up',
    subtitle: 'Head to chest portrait illustration',
    price: 'Rp 80.000',
    popular: true,
    badge: 'Popular Choice',
    features: [
      'Head to upper chest composition',
      'Refined facial expression & hair shading',
      'Simple atmospheric / abstract background',
      'High-resolution PNG file',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Bust Up* (Rp 80.000).\n\n• Nama Karakter:\n• Referensi / Foto Karakter:\n• Pose / Ekspresi:\n• Detail Tambahan:',
  },
  {
    id: 'genshin-icon',
    name: 'Genshin Avatar Icon',
    subtitle: 'Stylized Genshin-themed profile icon',
    price: 'Rp 100.000',
    badge: 'Icon Special',
    features: [
      'Official Genshin avatar framing & style',
      'Clean lighting & expressive character focus',
      'Custom Vision / element themed aura',
      'Square & transparent high-res PNG',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Genshin Avatar Icon* (Rp 100.000).\n\n• Nama Karakter / OC:\n• Vision / Element & Region:\n• Ekspresi / Vibe:\n• Detail Tambahan:',
  },
  {
    id: 'half-body',
    name: 'Half Body',
    subtitle: 'Head to waist / thigh artwork',
    price: 'Rp 150.000',
    features: [
      'Dynamic half-body character pose',
      'Detailed costume folds, armor & jewelry',
      'Handheld weapon or prop included',
      'High-res PNG with transparent background',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Half Body* (Rp 150.000).\n\n• Nama Karakter:\n• Konsep & Pose:\n• Kostum / Aksesoris:\n• Detail Background:',
  },
  {
    id: 'full-body',
    name: 'Full Body',
    subtitle: 'Complete head-to-toe illustration',
    price: 'Rp 200.000',
    features: [
      'Full head-to-toe character artwork',
      'Complex costume anatomy, weapons & effects',
      'Atmospheric color harmony & highlights',
      'Ultra high-res PNG + transparent render',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Full Body* (Rp 200.000).\n\n• Nama Karakter:\n• Konsep & Pose:\n• Kostum & Detail Senjata:\n• Detail Background:',
  },
  {
    id: 'charasheet-simple',
    name: 'Character Sheet (Simple)',
    subtitle: 'Turnaround reference & palette sheet',
    price: 'Rp 250.000',
    priceNote: 'Start from',
    features: [
      'Front view & Back view character turnaround',
      'Harmonic color palette swatches breakdown',
      'Clean character specification callouts',
      'Ideal for VTuber / OC design reference',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Character Sheet Simple* (Start from Rp 250.000).\n\n• Nama Karakter:\n• Deskripsi Penampilan (Front/Back):\n• Palet Warna / Referensi:\n• Catatan Khusus:',
  },
  {
    id: 'genshin-drip',
    name: 'Genshin Drip Art',
    subtitle: 'Official splash card artwork style',
    price: 'Rp 260.000',
    popular: true,
    badge: 'Signature Style',
    features: [
      'Authentic Genshin Impact splash art layout',
      'Dynamic elemental splash FX & celestial aura',
      'Custom Vision, Constellation & Region insignia',
      'Full ultra high-res presentation graphic',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Genshin Drip Art* (Rp 260.000).\n\n• Nama Karakter / OC:\n• Vision / Element & Region:\n• Senjata & Konsep Splash Pose:\n• Detail Tambahan:',
  },
  {
    id: 'charasheet-overdetailed',
    name: 'Character Sheet (Overdetailed)',
    subtitle: 'Master tier turnaround & multi-angle sheet',
    price: 'Rp 500.000',
    priceNote: 'Start from',
    badge: 'Master Reference',
    features: [
      'Comprehensive multi-angle turnaround (Front, Back, 3/4)',
      'Weapon, artifacts & detailed accessory close-ups',
      'Multiple facial expression callouts',
      'Complete typography, lore summary & specs',
    ],
    waTemplate:
      'Halo Amai Vaelithys! Saya ingin memesan komisi paket *Character Sheet Overdetailed* (Start from Rp 500.000).\n\n• Nama Karakter:\n• Deskripsi Lengkap & Lore:\n• Aksesoris, Senjata & Close-up:\n• Ekspresi / Detail Tambahan:',
  },
];

const waPhoneNumber = '62859106729954';

export default function CommissionPriceList() {
  const [expandedPlans, setExpandedPlans] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedPlans((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pricing-wrapper">
      {/* 7 Pricing Cards Grid */}
      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => {
          const isExpanded = expandedPlans.includes(plan.id);
          const encodedMessage = encodeURIComponent(plan.waTemplate);
          const waUrl = `https://wa.me/${waPhoneNumber}?text=${encodedMessage}`;

          return (
            <motion.div
              key={plan.id}
              className={`pricing-card card-royal ${plan.popular ? 'pricing-card-highlight' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Badge if available */}
              {plan.badge && (
                <div className="pricing-badge-wrap">
                  <span className="pricing-badge">
                    <Sparkle size={12} weight="fill" />
                    <span>{plan.badge}</span>
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="pricing-header">
                <h3 className="pricing-title">{plan.name}</h3>
                <p className="pricing-subtitle">{plan.subtitle}</p>
              </div>

              {/* Price Display */}
              <div className="pricing-price-wrap">
                {plan.priceNote && (
                  <span className="pricing-price-note">{plan.priceNote}</span>
                )}
                <div className="pricing-price-val">{plan.price}</div>
              </div>

              {/* Mobile Toggle Button (Visible only on mobile) */}
              <button
                type="button"
                className="mobile-details-toggle"
                onClick={() => toggleExpand(plan.id)}
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? 'Hide Package Details' : 'View Package Details'}</span>
                <motion.span
                  className="toggle-icon-wrap"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CaretDown size={14} weight="bold" />
                </motion.span>
              </button>

              {/* Feature List (Collapsible on mobile like FAQ, fully expanded on desktop) */}
              <div
                className={`pricing-features-accordion ${isExpanded ? 'accordion-open' : ''}`}
              >
                <div className="features-inner">
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
                </div>
              </div>

              {/* WhatsApp Order Button with uniform gold primary styling */}
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
          <h4 className="terms-title">Commission Terms & Guidelines</h4>
          <div className="terms-gem" />
        </div>

        <div className="terms-grid">
          <div className="terms-item">
            <div className="terms-icon-wrap">
              <Image size={20} weight="bold" />
            </div>
            <div className="terms-info">
              <span className="terms-label">Additional Detail & Background</span>
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
              <span className="terms-label">Commercial & Couple Rate</span>
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
              <span className="terms-label">Payment Milestones & Methods</span>
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
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .pricing-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.75rem;
          }
        }

        /* Individual Card */
        .pricing-card {
          background: #FFFFFF;
          border-radius: 1.4rem;
          border: 1.5px solid var(--color-border-subtle);
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          box-sizing: border-box;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-6px);
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
          margin-bottom: 0.85rem;
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
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
        }

        /* Header */
        .pricing-header {
          margin-bottom: 1.15rem;
        }

        .pricing-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-secondary);
          line-height: 1.25;
          margin: 0 0 0.35rem 0;
        }

        .pricing-subtitle {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.4;
          margin: 0;
        }

        /* Price */
        .pricing-price-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .pricing-price-note {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pricing-price-val {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-text-gold);
          line-height: 1;
        }

        /* Mobile Details Toggle Button */
        .mobile-details-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: var(--color-surface-soft);
          border: 1px solid var(--color-border-subtle);
          border-radius: 0.75rem;
          padding: 0.65rem 0.9rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-secondary);
          cursor: pointer;
          margin-bottom: 1rem;
          box-sizing: border-box;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .mobile-details-toggle:hover {
          border-color: var(--color-border-gold);
          background: var(--color-primary-subtle);
        }

        .toggle-icon-wrap {
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Features Accordion Container */
        .pricing-features-accordion {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 0.32s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.25s ease;
          overflow: hidden;
          margin-bottom: 0;
        }

        .pricing-features-accordion.accordion-open {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-bottom: 0.5rem;
        }

        .features-inner {
          overflow: hidden;
        }

        /* On Desktop (tablets & wider), always show details without toggle button */
        @media (min-width: 768px) {
          .mobile-details-toggle {
            display: none;
          }

          .pricing-features-accordion {
            display: block;
            grid-template-rows: none;
            opacity: 1;
            overflow: visible;
            flex: 1;
            margin-bottom: 0;
          }
        }

        /* Features List */
        .pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pricing-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--color-text);
          line-height: 1.45;
        }

        .feature-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        /* Action Buttons - Uniform Gold Primary for all cards */
        .pricing-action {
          margin-top: auto;
          width: 100%;
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
      `}</style>
    </div>
  );
}
