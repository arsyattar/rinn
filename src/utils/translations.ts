import type { Language } from './i18n';

export interface PricingPlanData {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  badge?: string;
  popular?: boolean;
  images: string[];
  features: string[];
  waTemplate: string;
}

export interface Translations {
  navbar: {
    items: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    statusLabel: string;
    statusOpen: string;
    statusClosed: string;
    trackerBtn: string;
    desc: string;
    pills: string[];
    btnAbout: string;
    btnOrder: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    roleTitle: string;
    specs: {
      nameLabel: string;
      nameVal: string;
      alias: string;
      ageLabel: string;
      ageVal: string;
      bdayLabel: string;
      bdayVal: string;
      heightLabel: string;
      heightVal: string;
      affiliationLabel: string;
      affiliationVal: string;
    };
    lore: string;
    pills: string[];
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    plans: PricingPlanData[];
    toggleOpen: string;
    toggleClose: string;
    orderBtnPrefix: string;
    termsTitle: string;
    termsAddonsTitle: string;
    termsRulesTitle: string;
    terms: {
      backgroundLabel: string;
      backgroundDesc: string;
      rushFeeLabel: string;
      rushFeeDesc: string;
      detailsLabel: string;
      detailsDesc: string;
      commercialLabel: string;
      commercialDesc: string;
      paymentLabel: string;
      paymentDesc: string;
      revisionLabel: string;
      revisionDesc: string;
      dodontLabel: string;
      doText: string;
      dontText: string;
    };
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
    helpPrompt: string;
    helpBtn: string;
  };
  footer: {
    bio: string;
    navTitle: string;
    commissionStatus: string;
    contactTitle: string;
    rights: string;
    designedWith: string;
  };
}

export const translations: Record<Language, Translations> = {
  // =========================================================================
  // INDONESIA REGION (IDR Currency / All Text English)
  // =========================================================================
  id: {
    navbar: {
      items: [
        { label: 'About', href: '#about' },
        { label: 'Pricing', href: '#contact' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: 'Get in Touch',
    },
    hero: {
      statusLabel: 'Commission Status : ',
      statusOpen: 'OPEN',
      statusClosed: 'CLOSED',
      trackerBtn: 'Commission Tracker',
      desc: 'Digital Illustrator & Character Concept Artist crafting luminous anime aesthetics, celestial fantasy realms, and bespoke visual narratives.',
      pills: ['OC & Fan Concepts', 'High-Res Digital Art', 'Character Concepts'],
      btnAbout: 'About Artist',
      btnOrder: 'Order Commission',
    },
    about: {
      badge: 'Character Dossier',
      title: 'About Me',
      subtitle: 'Official profile, character specifications, and origin lore of Amai Vaelithys.',
      roleTitle: 'Mondstadt Alchemist & Wandering Celestial Scholar',
      specs: {
        nameLabel: 'Name',
        nameVal: 'Amai Vaelithys',
        alias: 'Nereida Astra',
        ageLabel: 'Age',
        ageVal: 'Physically 24 (2000+)',
        bdayLabel: 'Birthday',
        bdayVal: '29th September',
        heightLabel: 'Height',
        heightVal: '165cm',
        affiliationLabel: 'Affiliation',
        affiliationVal: 'Knight of Favonious',
      },
      lore: 'A foreigner who decided to settle in Mondstadt and join the Knight of Favonious solely to study alchemy.',
      pills: ['Mondstadt Resident', 'Alchemical Scholar', 'Ancient Celestial Lineage'],
    },
    pricing: {
      badge: 'Commission Price List',
      title: 'Let’s Create Something Celestial',
      subtitle: 'Swipe through sample artwork and select your preferred commission package below to order directly via WhatsApp.',
      toggleOpen: 'View Package Details',
      toggleClose: 'Hide Package Details',
      orderBtnPrefix: 'Order',
      termsTitle: 'Add-ons & Commission Guidelines',
      termsAddonsTitle: 'Additional Fees (Add-ons)',
      termsRulesTitle: 'Rules & Workflow Policy',
      terms: {
        backgroundLabel: 'Background Art',
        backgroundDesc: 'Rp 50.000',
        rushFeeLabel: 'Rush Fee (Priority Express)',
        rushFeeDesc: '+Rp 10.000 – Rp 50.000',
        detailsLabel: 'Details Fee (Costume / Complexity)',
        detailsDesc: '+Rp 50.000 – Rp 200.000',
        commercialLabel: 'Commercial & Couple Rate',
        commercialDesc: 'Commercial use: +100% base price (2x). Couple artwork: 2x base price.',
        paymentLabel: 'Payment Milestones & Methods',
        paymentDesc: 'Payment after rough sketch approval (Full or DP with balance upon completion). SeaBank, Local E-Wallets (GoPay, OVO, Dana) & PayPal.',
        revisionLabel: 'Revision Policy',
        revisionDesc: 'Up to 3x free revisions during sketch stage. Extra revisions start from +Rp 10.000/rev. Coloring stage only allows color adjustments.',
        dodontLabel: 'Do & Don’t Guidelines',
        doText: 'DO: Male/Female, Fanart/OCs, Couple/Yumeship.',
        dontText: 'DON’T: NSFW (Suggestive is OK), LGBT, Furry, Mecha/Armor, Gore (slight blood is OK), Old character.',
      },
      plans: [
        {
          id: 'bust-up',
          name: 'Bust Up',
          subtitle: 'Head to chest portrait illustration',
          price: 'Rp 140.000',
          popular: true,
          badge: 'Popular Choice',
          images: [
            '/photo/bust_up/bust_up1.webp',
            '/photo/bust_up/bust_up2.webp',
            '/photo/Half_Body/halfbody4.webp',
            '/photo/Half_Body/halfbody5.webp',
            '/photo/Half_Body/halfbody6.webp',
            '/photo/Half_Body/halfbody7.webp',
          ],
          features: [
            'Head to upper chest composition',
            'Custom pose',
            'Simple / Abstract background',
            'High-resolution PNG file',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Bust Up* commission (Rp 140.000).',
        },
        {
          id: 'genshin-icon',
          name: 'Genshin Avatar Icon',
          subtitle: 'Stylized Genshin-themed profile icon',
          price: 'Rp 100.000',
          badge: 'Icon Special',
          images: [
            '/photo/Genshin_Avatar_%20Icon/avatar_icon1.webp',
            '/photo/Genshin_Avatar_%20Icon/avatar_icon2.webp',
          ],
          features: [
            'Official Genshin avatar framing & aesthetic',
            'Clean lighting & expressive character focus',
            'Custom Vision / elemental themed aura',
            'Square & transparent high-res PNG',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Genshin Avatar Icon* commission (Rp 100.000).',
        },
        {
          id: 'half-body',
          name: 'Half Body',
          subtitle: 'Head to waist / thigh artwork',
          price: 'Rp 250.000',
          images: [
            '/photo/Half_Body/halfbody1.webp',
            '/photo/Half_Body/halfbody2.webp',
            '/photo/Half_Body/halfbody3.webp',
            '/photo/Half_Body/couple6.webp',
            '/photo/Half_Body/halfbody8.webp',
            '/photo/Half_Body/halfbody9.webp',
          ],
          features: [
            'Custom pose',
            'Simple / Abstract background',
            'High-res PNG + transparent background',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Half Body* commission (Rp 250.000).',
        },
        {
          id: 'full-body',
          name: 'Full Body',
          subtitle: 'Complete head-to-toe illustration',
          price: 'Rp 300.000',
          images: [
            '/photo/full_body/fullbody1.webp',
            '/photo/full_body/fullbody2.webp',
            '/photo/full_body/fullbody3.webp',
            '/photo/full_body/fullbody4.webp',
            '/photo/full_body/fullbody5.webp',
          ],
          features: [
            'Custom pose',
            'Full head-to-toe character artwork',
            'Simple / Abstract background',
            'High-res PNG + transparent background',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Full Body* commission (Rp 300.000).',
        },
        {
          id: 'charasheet-simple',
          name: 'Character Sheet (Simple)',
          subtitle: 'Turnaround reference & avatar sheet',
          price: 'Rp 350.000',
          priceNote: 'Start from',
          images: ['/photo/charactersheet_simple/simple1.webp'],
          features: [
            'Front view & Back view turnaround',
            'A few accessory details',
            'Avatar Icon included',
            'Ideal for VTuber / OC design reference',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Character Sheet (Simple)* commission (Start from Rp 350.000).',
        },
        {
          id: 'genshin-drip',
          name: 'Genshin Drip Marketing',
          subtitle: 'Genshin-style character render art',
          price: 'Rp 400.000',
          popular: true,
          badge: 'Signature Style',
          images: [
            '/photo/genshin_drip_marketing/drip_marketing1.webp',
            '/photo/genshin_drip_marketing/drip_marketing2.webp',
            '/photo/genshin_drip_marketing/drip_marketing3.webp',
            '/photo/genshin_drip_marketing/drip_marketing4.webp',
          ],
          features: [
            'Custom pose',
            'Character only (not a splash art)',
            'Free Genshin drip marketing background',
            'Ultra high-res PNG + transparent',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Genshin Drip Marketing* commission (Rp 400.000).',
        },
        {
          id: 'charasheet-overdetailed',
          name: 'Character Sheet (Overdetailed)',
          subtitle: 'Master tier multi-angle reference sheet',
          price: 'Rp 700.000',
          priceNote: 'Start from',
          badge: 'Master Reference',
          images: ['/photo/charactersheet_overdetailed/overdetailed1.webp'],
          features: [
            'Comprehensive multi-angle turnaround (Front, Back, 3/4)',
            'Accessory & outfit details (overdetailed)',
            'Avatar Icon included',
            'Lore summary & character specs',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Character Sheet (Overdetailed)* commission (Start from Rp 700.000).',
        },
      ],
    },
    testimonials: {
      badge: 'Client Feedback',
      title: 'Kind Words from Patrons',
      subtitle: 'Read what previous commissioners have shared about their custom artwork and experience.',
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked Inquiries',
      subtitle: 'Everything you need to know about the illustration workflow, turnaround times, and file delivery.',
      helpPrompt: 'Have a custom inquiry or specific project in mind?',
      helpBtn: 'Chat directly on WhatsApp',
      items: [
        {
          question: 'What is the commission workflow?',
          answer:
            'The workflow consists of 4 main phases: (1) Concept & character reference discussion, (2) Rough sketch creation & review, (3) Payment milestone (Full or 50% deposit) followed by final lineart & coloring, and (4) High-resolution file delivery via Google Drive.',
        },
        {
          question: 'How long does each commission take?',
          answer:
            'Turnaround time typically ranges from 3 to 14 business days depending on artwork complexity and the current queue order. An estimated delivery date will be confirmed during consultation.',
        },
        {
          question: 'What file formats and resolutions are delivered?',
          answer:
            'You will receive ultra high-resolution PNG files (300 DPI) including the full artwork with background, plus transparent PNG cutouts for character illustrations via Google Drive.',
        },
        {
          question: 'Can I use the artwork for commercial purposes?',
          answer:
            'Yes! Commercial usage (such as monetized YouTube thumbnails, VTuber assets, stream graphics, merchandise, or business branding) incurs a +100% fee of the base package price (2x standard rate).',
        },
        {
          question: 'What payment methods are supported?',
          answer:
            'For international commissioners, payments are processed securely via PayPal (invoice) or Wise. For clients residing in Indonesia, payments can be made through SeaBank and all major local E-Wallets (GoPay, OVO, Dana) or QRIS.',
        },
      ],
    },
    footer: {
      bio: 'Digital Illustrator & Character Concept Artist crafting luminous anime aesthetics, celestial fantasy realms, and bespoke visual narratives.',
      navTitle: 'Quick Navigation',
      commissionStatus: 'Commission Status',
      contactTitle: 'Get in Touch',
      rights: 'All rights reserved.',
      designedWith: 'Original character & artwork by Amai Vaelithys.',
    },
  },

  // =========================================================================
  // INTERNATIONAL REGION (USD Currency / All Text English)
  // =========================================================================
  en: {
    navbar: {
      items: [
        { label: 'About', href: '#about' },
        { label: 'Pricing', href: '#contact' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: 'Get in Touch',
    },
    hero: {
      statusLabel: 'Commission Status : ',
      statusOpen: 'OPEN',
      statusClosed: 'CLOSED',
      trackerBtn: 'Commission Tracker',
      desc: 'Digital Illustrator & Character Concept Artist crafting luminous anime aesthetics, celestial fantasy realms, and bespoke visual narratives.',
      pills: ['OC & Fan Concepts', 'High-Res Digital Art', 'Character Concepts'],
      btnAbout: 'About Artist',
      btnOrder: 'Order Commission',
    },
    about: {
      badge: 'Character Dossier',
      title: 'About Me',
      subtitle: 'Official profile, character specifications, and origin lore of Amai Vaelithys.',
      roleTitle: 'Mondstadt Alchemist & Wandering Celestial Scholar',
      specs: {
        nameLabel: 'Name',
        nameVal: 'Amai Vaelithys',
        alias: 'Nereida Astra',
        ageLabel: 'Age',
        ageVal: 'Physically 24 (2000+)',
        bdayLabel: 'Birthday',
        bdayVal: '29th September',
        heightLabel: 'Height',
        heightVal: '165cm',
        affiliationLabel: 'Affiliation',
        affiliationVal: 'Knight of Favonious',
      },
      lore: 'A foreigner who decided to settle in Mondstadt and join the Knight of Favonious solely to study alchemy.',
      pills: ['Mondstadt Resident', 'Alchemical Scholar', 'Ancient Celestial Lineage'],
    },
    pricing: {
      badge: 'Commission Price List',
      title: 'Let’s Create Something Celestial',
      subtitle: 'Swipe through sample artwork and select your preferred commission package below to order directly via WhatsApp.',
      toggleOpen: 'View Package Details',
      toggleClose: 'Hide Package Details',
      orderBtnPrefix: 'Order',
      termsTitle: 'Add-ons & Commission Guidelines',
      termsAddonsTitle: 'Additional Fees (Add-ons)',
      termsRulesTitle: 'Rules & Workflow Policy',
      terms: {
        backgroundLabel: 'Background Art',
        backgroundDesc: '$10 USD',
        rushFeeLabel: 'Rush Fee (Priority Express)',
        rushFeeDesc: '+$3 – $10 USD',
        detailsLabel: 'Details Fee (Costume / Complexity)',
        detailsDesc: '+$10 – $35 USD',
        commercialLabel: 'Commercial & Couple Rate',
        commercialDesc: 'Commercial use: +100% base price (2x). Couple artwork: 2x base price.',
        paymentLabel: 'Payment Milestones & Methods',
        paymentDesc: 'Payment after rough sketch approval (Full or DP with balance upon completion). PayPal (International Invoice) & Wise.',
        revisionLabel: 'Revision Policy',
        revisionDesc: 'Up to 3x free revisions during sketch stage. Extra revisions start from +$2 USD/rev. Coloring stage only allows color adjustments.',
        dodontLabel: 'Do & Don’t Guidelines',
        doText: 'DO: Male/Female, Fanart/OCs, Couple/Yumeship.',
        dontText: 'DON’T: NSFW (Suggestive is OK), LGBT, Furry, Mecha/Armor, Gore (slight blood is OK), Old character.',
      },
      plans: [
        {
          id: 'bust-up',
          name: 'Bust Up',
          subtitle: 'Head to chest portrait illustration',
          price: '$25 USD',
          popular: true,
          badge: 'Popular Choice',
          images: [
            '/photo/bust_up/bust_up1.webp',
            '/photo/bust_up/bust_up2.webp',
            '/photo/Half_Body/halfbody4.webp',
            '/photo/Half_Body/halfbody5.webp',
            '/photo/Half_Body/halfbody6.webp',
            '/photo/Half_Body/halfbody7.webp',
          ],
          features: [
            'Head to upper chest composition',
            'Custom pose',
            'Simple / Abstract background',
            'High-resolution PNG file',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Bust Up* commission ($25 USD).',
        },
        {
          id: 'genshin-icon',
          name: 'Genshin Avatar Icon',
          subtitle: 'Stylized Genshin-themed profile icon',
          price: '$30 USD',
          badge: 'Icon Special',
          images: [
            '/photo/Genshin_Avatar_%20Icon/avatar_icon1.webp',
            '/photo/Genshin_Avatar_%20Icon/avatar_icon2.webp',
          ],
          features: [
            'Official Genshin avatar framing & aesthetic',
            'Clean lighting & expressive character focus',
            'Custom Vision / elemental themed aura',
            'Square & transparent high-res PNG',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Genshin Avatar Icon* commission ($30 USD).',
        },
        {
          id: 'half-body',
          name: 'Half Body',
          subtitle: 'Head to waist / thigh artwork',
          price: '$40 USD',
          images: [
            '/photo/Half_Body/halfbody1.webp',
            '/photo/Half_Body/halfbody2.webp',
            '/photo/Half_Body/halfbody3.webp',
            '/photo/Half_Body/couple6.webp',
            '/photo/Half_Body/halfbody8.webp',
            '/photo/Half_Body/halfbody9.webp',
          ],
          features: [
            'Custom pose',
            'Simple / Abstract background',
            'High-res PNG + transparent background',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Half Body* commission ($40 USD).',
        },
        {
          id: 'full-body',
          name: 'Full Body',
          subtitle: 'Complete head-to-toe illustration',
          price: '$60 USD',
          images: [
            '/photo/full_body/fullbody1.webp',
            '/photo/full_body/fullbody2.webp',
            '/photo/full_body/fullbody3.webp',
            '/photo/full_body/fullbody4.webp',
            '/photo/full_body/fullbody5.webp',
          ],
          features: [
            'Custom pose',
            'Full head-to-toe character artwork',
            'Simple / Abstract background',
            'High-res PNG + transparent background',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Full Body* commission ($60 USD).',
        },
        {
          id: 'charasheet-simple',
          name: 'Character Sheet (Simple)',
          subtitle: 'Turnaround reference & avatar sheet',
          price: '$85 USD',
          priceNote: 'Start from',
          images: ['/photo/charactersheet_simple/simple1.webp'],
          features: [
            'Front view & Back view turnaround',
            'A few accessory details',
            'Avatar Icon included',
            'Ideal for VTuber / OC design reference',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Character Sheet (Simple)* commission (Start from $85 USD).',
        },
        {
          id: 'genshin-drip',
          name: 'Genshin Drip Marketing',
          subtitle: 'Genshin-style character render art',
          price: '$70 USD',
          popular: true,
          badge: 'Signature Style',
          images: [
            '/photo/genshin_drip_marketing/drip_marketing1.webp',
            '/photo/genshin_drip_marketing/drip_marketing2.webp',
            '/photo/genshin_drip_marketing/drip_marketing3.webp',
            '/photo/genshin_drip_marketing/drip_marketing4.webp',
          ],
          features: [
            'Custom pose',
            'Character only (not a splash art)',
            'Free Genshin drip marketing background',
            'Ultra high-res PNG + transparent',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Genshin Drip Marketing* commission ($70 USD).',
        },
        {
          id: 'charasheet-overdetailed',
          name: 'Character Sheet (Overdetailed)',
          subtitle: 'Master tier multi-angle reference sheet',
          price: '$140 – $150 USD',
          priceNote: 'Start from',
          badge: 'Master Reference',
          images: ['/photo/charactersheet_overdetailed/overdetailed1.webp'],
          features: [
            'Comprehensive multi-angle turnaround (Front, Back, 3/4)',
            'Accessory & outfit details (overdetailed)',
            'Avatar Icon included',
            'Lore summary & character specs',
          ],
          waTemplate: 'Hello Amai Vaelithys! I would like to order a *Character Sheet (Overdetailed)* commission (Start from $140 – $150 USD).',
        },
      ],
    },
    testimonials: {
      badge: 'Client Feedback',
      title: 'Kind Words from Patrons',
      subtitle: 'Read what previous commissioners have shared about their custom artwork and experience.',
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked Inquiries',
      subtitle: 'Everything you need to know about the illustration workflow, turnaround times, and file delivery.',
      helpPrompt: 'Have a custom inquiry or specific project in mind?',
      helpBtn: 'Chat directly on WhatsApp',
      items: [
        {
          question: 'What is the commission workflow?',
          answer:
            'The workflow consists of 4 main phases: (1) Concept & character reference discussion, (2) Rough sketch creation & review, (3) Payment milestone (Full or 50% deposit) followed by final lineart & coloring, and (4) High-resolution file delivery via Google Drive.',
        },
        {
          question: 'How long does each commission take?',
          answer:
            'Turnaround time typically ranges from 3 to 14 business days depending on artwork complexity and the current queue order. An estimated delivery date will be confirmed during consultation.',
        },
        {
          question: 'What file formats and resolutions are delivered?',
          answer:
            'You will receive ultra high-resolution PNG files (300 DPI) including the full artwork with background, plus transparent PNG cutouts for character illustrations via Google Drive.',
        },
        {
          question: 'Can I use the artwork for commercial purposes?',
          answer:
            'Yes! Commercial usage (such as monetized YouTube thumbnails, VTuber assets, stream graphics, merchandise, or business branding) incurs a +100% fee of the base package price (2x standard rate).',
        },
        {
          question: 'What payment methods are supported?',
          answer:
            'For international commissioners, payments are processed securely via PayPal (invoice) or Wise. For clients residing in Indonesia, payments can be made through SeaBank and all major local E-Wallets (GoPay, OVO, Dana) or QRIS.',
        },
      ],
    },
    footer: {
      bio: 'Digital Illustrator & Character Concept Artist crafting luminous anime aesthetics, celestial fantasy realms, and bespoke visual narratives.',
      navTitle: 'Quick Navigation',
      commissionStatus: 'Commission Status',
      contactTitle: 'Get in Touch',
      rights: 'All rights reserved.',
      designedWith: 'Original character & artwork by Amai Vaelithys.',
    },
  },
};
