import React from 'react';
import { useLanguage } from '../utils/i18n';
import { translations } from '../utils/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const isId = lang === 'id';

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/62859106729954', handle: '+62 859-1067-29954' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@cat.bedo29', handle: '@cat.bedo29' },
    { name: 'Instagram', url: 'https://www.instagram.com/ne.rinn_?igsi=dDF5OTlzZjYwM2xt', handle: '@ne.rinn_' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/1BxZtScZDj/', handle: 'Amai Vaelithys' },
    { name: 'Discord', url: 'https://discord.gg/VYRmxNygZg', handle: '@nerinn299' },
  ];

  const quickLinks = [
    { label: 'Artist Biography', href: '#about' },
    { label: 'Commission Price List', href: '#contact' },
    { label: 'Client Reviews', href: '#testimonials' },
    { label: 'Frequently Asked Questions', href: '#faq' },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-top-border">
        <div className="footer-gold-gem"></div>
      </div>

      <div className="container footer-content">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-brand-title">Amai Vaelithys</span>
              <span className="footer-brand-tagline">
                {isId ? 'Visual Artist & Character Illustrator' : 'Visual Artist & Character Illustrator'}
              </span>
            </div>
            <p className="footer-desc">{t.bio}</p>
            <div className="footer-status">
              <span className="status-indicator"></span>
              <span className="status-text">
                {isId ? 'Konsultasi & Proyek ' : 'Inquiries & Projects '}
                <strong className="status-highlight">{isId ? 'AKTIF' : 'ACTIVE'}</strong>
              </span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">{t.navTitle}</h4>
            <ul className="footer-list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    <span className="link-bullet">✦</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect Column */}
          <div className="footer-col social-col">
            <h4 className="footer-heading">{t.contactTitle}</h4>
            <ul className="footer-list">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link social-item"
                  >
                    <span className="social-name">{social.name}</span>
                    <span className="social-handle">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} <strong>Amai Vaelithys</strong>. {t.rights}{' '}
            {t.designedWith}
          </p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-secondary);
          color: #E2DDD3;
          position: relative;
          padding-top: 4rem;
          padding-bottom: 2.5rem;
          margin-top: 5rem;
        }

        .footer-top-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer-gold-gem {
          width: 9px;
          height: 9px;
          background-color: var(--color-primary);
          transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(201, 166, 107, 0.8);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1.2fr 1.2fr;
            gap: 3rem;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .footer-brand-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.04em;
        }

        .footer-brand-tagline {
          font-size: 0.82rem;
          color: var(--color-primary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .footer-desc {
          color: #B9BEC9;
          font-size: 0.92rem;
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 1.5rem;
        }

        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 0.9rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(201, 166, 107, 0.3);
          border-radius: 9999px;
          font-size: 0.82rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #4ade80;
          box-shadow: 0 0 8px #4ade80;
        }

        .status-highlight {
          color: var(--color-primary);
        }

        .footer-heading {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: #FFFFFF;
          letter-spacing: 0.06em;
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.4rem;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 24px;
          height: 2px;
          background-color: var(--color-primary);
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #B9BEC9;
          transition: all var(--transition-fast);
        }

        .link-bullet {
          color: var(--color-primary);
          font-size: 0.65rem;
          opacity: 0.7;
        }

        .footer-link:hover {
          color: var(--color-primary);
          transform: translateX(4px);
        }

        .social-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .social-name {
          color: #FFFFFF;
          font-weight: 500;
        }

        .social-handle {
          font-size: 0.8rem;
          color: #8C96AB;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 2rem;
          font-size: 0.85rem;
          color: #8C96AB;
          width: 100%;
        }

        .copyright {
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </footer>
  );
}
