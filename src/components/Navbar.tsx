import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { List, X, Sparkle, ArrowRight, PaintBrushBroad } from '@phosphor-icons/react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav
        className={`navbar-container ${isScrolled ? 'navbar-scrolled' : 'navbar-top'}`}
        aria-label="Main Navigation"
      >
        <div className="navbar-inner">
          {/* Brand Logo */}
          <a href="#" className="navbar-brand" aria-label="Amai Vaelithys Home">
            <span className="brand-icon-wrapper">
              <Sparkle size={18} weight="fill" className="brand-sparkle" />
            </span>
            <div className="brand-text-group">
              <span className="brand-title">Amai Vaelithys</span>
              <span className="brand-subtitle">Visual Artist</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="desktop-menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action CTA & Mobile Toggle */}
          <div className="nav-actions">
            <a href="#contact" className="btn-cta-gold">
              <span>Get in Touch</span>
              <ArrowRight size={14} weight="bold" className="cta-icon" />
            </a>

            <button
              type="button"
              className={`mobile-toggle-btn ${mobileMenuOpen ? 'menu-open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex' }}
                    >
                      <X size={22} weight="bold" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex' }}
                    >
                      <List size={22} weight="bold" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu — Framer Motion smooth height animation */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              className="mobile-menu-panel"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.22 },
              }}
              style={{ overflow: 'hidden' }}
            >
              <div className="mobile-menu-inner">
                <ul className="mobile-nav-list">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: 0.06 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={item.href}
                        className="mobile-nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={16} weight="regular" className="mobile-link-arrow" />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mobile-menu-footer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href="#contact"
                    className="mobile-btn-cta"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PaintBrushBroad size={18} weight="duotone" />
                    <span>Get in Touch</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          pointer-events: none;
          padding: 0;
          transition: padding 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-container {
          pointer-events: auto;
          width: 100%;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Top State: Full Rectangular Edge-to-Edge */
        .navbar-top {
          max-width: 100%;
          background: rgba(247, 243, 234, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-border-subtle);
          border-radius: 0;
          box-shadow: 0 1px 3px rgba(30, 42, 69, 0.03);
          padding: 0.9rem 1.5rem;
        }

        /* Scrolled State: Pill Shape (Lonjong Floating) */
        .navbar-scrolled {
          max-width: 1040px;
          margin-top: 0.85rem;
          margin-left: 1rem;
          margin-right: 1rem;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border: 1px solid rgba(201, 166, 107, 0.45);
          border-radius: 9999px;
          box-shadow: 0 12px 36px rgba(30, 42, 69, 0.09), 0 2px 8px rgba(201, 166, 107, 0.15);
          padding: 0.6rem 1.4rem;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          gap: 1.5rem;
        }

        /* Brand Styling */
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          color: var(--color-secondary);
        }

        .brand-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-primary-subtle);
          border: 1px solid var(--color-border-gold);
          color: var(--color-primary);
          transition: transform var(--transition-fast);
        }

        .navbar-brand:hover .brand-icon-wrapper {
          transform: rotate(15deg) scale(1.05);
          background: var(--color-primary);
          color: var(--color-secondary);
        }

        .brand-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 1.08rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-secondary);
        }

        .brand-subtitle {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-gold);
        }

        /* Desktop Menu */
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 820px) {
          .desktop-menu {
            display: flex;
          }
        }

        .nav-link {
          position: relative;
          display: inline-block;
          padding: 0.45rem 0.9rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text);
          border-radius: 9999px;
          transition: all var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-secondary);
          background: var(--color-primary-subtle);
        }

        /* Actions & CTA */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-cta-gold {
          display: none;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.1rem;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--color-secondary);
          background: var(--color-primary);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(201, 166, 107, 0.3);
          transition: all var(--transition-fast);
        }

        @media (min-width: 540px) {
          .btn-cta-gold {
            display: inline-flex;
          }
        }

        .btn-cta-gold:hover {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(201, 166, 107, 0.45);
        }

        .btn-cta-gold:hover .cta-icon {
          transform: translateX(2px);
        }

        .cta-icon {
          transition: transform var(--transition-fast);
        }

        /* Mobile Hamburger Button */
        .mobile-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--color-border-subtle);
          background: var(--color-surface);
          color: var(--color-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        @media (min-width: 820px) {
          .mobile-toggle-btn {
            display: none;
          }
        }

        .mobile-toggle-btn:hover {
          background: var(--color-surface-soft);
          border-color: var(--color-primary);
          color: var(--color-text-gold);
        }

        /* Mobile Dropdown Panel — animated by Framer Motion */
        .mobile-menu-panel {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 1rem;
          right: 1rem;
          background: #FFFFFF;
          border: 1px solid var(--color-border-gold);
          border-radius: 1.25rem;
          box-shadow: 0 16px 40px rgba(30, 42, 69, 0.16);
          /* overflow: hidden handled inline by motion.div */
        }

        .mobile-menu-inner {
          padding: 1.25rem;
        }

        .mobile-toggle-btn.menu-open {
          background: var(--color-primary-subtle);
          border-color: var(--color-primary);
          color: var(--color-text-gold);
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-secondary);
          transition: all var(--transition-fast);
        }

        .mobile-nav-link:hover {
          background: var(--color-primary-subtle);
          color: var(--color-text-gold);
          padding-left: 1.2rem;
        }

        .mobile-link-arrow {
          color: var(--color-border);
          transition: transform var(--transition-fast);
        }

        .mobile-nav-link:hover .mobile-link-arrow {
          color: var(--color-primary);
          transform: translateX(3px);
        }

        .mobile-menu-footer {
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .mobile-btn-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background: var(--color-primary);
          color: var(--color-secondary);
          font-weight: 700;
          font-size: 0.92rem;
          box-shadow: var(--shadow-gold);
        }
      `}</style>
    </header>
  );
}
