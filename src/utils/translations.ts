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
    terms: {
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
  id: {
    navbar: {
      items: [
        { label: 'Tentang', href: '#about' },
        { label: 'Harga', href: '#contact' },
        { label: 'Testimoni', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
      ],
      cta: 'Hubungi Saya',
    },
    hero: {
      statusLabel: 'Status Komisi : ',
      statusOpen: 'BUKA',
      statusClosed: 'TUTUP',
      trackerBtn: 'Pelacak Komisi',
      desc: 'Digital Illustrator & Character Concept Artist yang menghidupkan estetika anime bercahaya, dunia fantasi surgawi, dan narasi visual memukau.',
      pills: ['Konsep OC & Fanart', 'Seni Digital Resolusi Tinggi', 'Desain Karakter'],
      btnAbout: 'Tentang Artis',
      btnOrder: 'Pesan Komisi',
    },
    about: {
      badge: 'Berkas Karakter',
      title: 'Tentang Saya',
      subtitle: 'Profil resmi, spesifikasi karakter, dan kisah asal-usul Amai Vaelithys.',
      roleTitle: 'Alkemis Mondstadt & Cendekiawan Surgawi Kelana',
      specs: {
        nameLabel: 'Nama',
        nameVal: 'Amai Vaelithys',
        alias: 'Nereida Astra',
        ageLabel: 'Usia',
        ageVal: 'Fisik 24 tahun (2000+)',
        bdayLabel: 'Tanggal Lahir',
        bdayVal: '29 September',
        heightLabel: 'Tinggi Badan',
        heightVal: '165 cm',
        affiliationLabel: 'Afiliasi',
        affiliationVal: 'Knight of Favonious',
      },
      lore: 'Seorang pendatang yang memutuskan menetap di Mondstadt dan bergabung dengan Knight of Favonious semata-mata untuk mendalami ilmu alkimia.',
      pills: ['Warga Mondstadt', 'Cendekiawan Alkimia', 'Keturunan Surgawi Kuno'],
    },
    pricing: {
      badge: 'Daftar Harga Komisi',
      title: 'Mari Ciptakan Karya Surgawi Bersama',
      subtitle: 'Geser sampel karya dan pilih paket komisi pilihanmu di bawah ini untuk memesan langsung via WhatsApp.',
      toggleOpen: 'Lihat Detail Paket',
      toggleClose: 'Tutup Detail Paket',
      orderBtnPrefix: 'Pesan',
      termsTitle: 'Ketentuan & Panduan Komisi',
      terms: {
        detailsLabel: 'Detail Tambahan & Latar Belakang',
        detailsDesc: '+Rp 30.000 – Rp 200.000 tergantung tingkat kerumitan karakter & detail latar belakang.',
        commercialLabel: 'Tarif Komersial & Pasangan (Couple)',
        commercialDesc: 'Penggunaan komersial (thumbnail YouTube, VTuber, merchandise, bisnis) adalah +100% (2x harga dasar). Karya berpasangan (couple) adalah 2x harga dasar.',
        paymentLabel: 'Tahapan & Metode Pembayaran',
        paymentDesc: 'Pembayaran dilakukan setelah persetujuan sketsa kasar (Full payment atau DP dengan pelunasan setelah selesai). SeaBank / Semua E-Wallet (Lokal) & PayPal.',
        revisionLabel: 'Kebijakan Revisi',
        revisionDesc: 'Maksimal 3x revisi gratis pada tahap sketsa. Revisi ekstra mulai dari +Rp 10.000/revisi. Tahap pewarnaan hanya menerima penyesuaian warna.',
        dodontLabel: 'Panduan Boleh & Tidak Boleh',
        doText: 'BISA: Karakter Pria/Wanita, Fanart/OC, Couple/Yumeship.',
        dontText: 'TIDAK BISA: NSFW (Suggestive diperbolehkan), LGBT, Furry, Mecha/Armor berat, Gore (sedikit darah boleh), Karakter tua/lansia.',
      },
      plans: [
        {
          id: 'bust-up',
          name: 'Bust Up',
          subtitle: 'Ilustrasi potret kepala hingga dada',
          price: 'Rp 80.000',
          popular: true,
          badge: 'Pilihan Populer',
          images: [
            '/photo/bust_up/bust_up1.webp',
            '/photo/bust_up/bust_up2.webp',
            '/photo/Half_Body/halfbody4.webp',
            '/photo/Half_Body/halfbody5.webp',
            '/photo/Half_Body/halfbody6.webp',
            '/photo/Half_Body/halfbody7.webp',
          ],
          features: [
            'Komposisi kepala hingga dada atas',
            'Pose kustom bebas',
            'Latar belakang sederhana / abstrak',
            'File PNG resolusi tinggi',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Bust Up* (Rp 80.000).',
        },
        {
          id: 'genshin-icon',
          name: 'Genshin Avatar Icon',
          subtitle: 'Ikon profil bergaya tema Genshin',
          price: 'Rp 100.000',
          badge: 'Spesial Ikon',
          images: [
            '/photo/Genshin_Avatar_%20Icon/avatar_icon1.webp',
            '/photo/Genshin_Avatar_%20Icon/avatar_icon2.webp',
          ],
          features: [
            'Bingkai & estetika avatar resmi Genshin',
            'Pencahayaan bersih & ekspresi karakter memukau',
            'Aura kustom elemen / Vision',
            'PNG kotak resolusi tinggi & transparan',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Genshin Avatar Icon* (Rp 100.000).',
        },
        {
          id: 'half-body',
          name: 'Half Body',
          subtitle: 'Ilustrasi kepala hingga pinggang / paha',
          price: 'Rp 150.000',
          images: [
            '/photo/Half_Body/halfbody1.webp',
            '/photo/Half_Body/halfbody2.webp',
            '/photo/Half_Body/halfbody3.webp',
            '/photo/Half_Body/couple6.webp',
            '/photo/Half_Body/halfbody8.webp',
            '/photo/Half_Body/halfbody9.webp',
          ],
          features: [
            'Pose kustom dinamis',
            'Latar belakang sederhana / abstrak',
            'File PNG resolusi tinggi + latar transparan',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Half Body* (Rp 150.000).',
        },
        {
          id: 'full-body',
          name: 'Full Body',
          subtitle: 'Ilustrasi utuh kepala hingga kaki',
          price: 'Rp 200.000',
          images: [
            '/photo/full_body/fullbody1.webp',
            '/photo/full_body/fullbody2.webp',
            '/photo/full_body/fullbody3.webp',
            '/photo/full_body/fullbody4.webp',
            '/photo/full_body/fullbody5.webp',
          ],
          features: [
            'Pose kustom penuh',
            'Karya karakter utuh kepala hingga kaki',
            'Latar belakang sederhana / abstrak',
            'File PNG resolusi tinggi + latar transparan',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Full Body* (Rp 200.000).',
        },
        {
          id: 'charasheet-simple',
          name: 'Character Sheet (Simple)',
          subtitle: 'Lembar referensi sudut pandang & avatar',
          price: 'Rp 250.000',
          priceNote: 'Mulai dari',
          images: ['/photo/charactersheet_simple/simple1.webp'],
          features: [
            'Tampilan depan & belakang',
            'Beberapa detail aksesori',
            'Termasuk Avatar Icon',
            'Ideal untuk referensi desain VTuber / OC',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Character Sheet (Simple)* (Mulai dari Rp 250.000).',
        },
        {
          id: 'genshin-drip',
          name: 'Genshin Drip Marketing',
          subtitle: 'Karya render karakter bergaya Genshin',
          price: 'Rp 260.000',
          popular: true,
          badge: 'Gaya Khas',
          images: [
            '/photo/genshin_drip_marketing/drip_marketing1.webp',
            '/photo/genshin_drip_marketing/drip_marketing2.webp',
            '/photo/genshin_drip_marketing/drip_marketing3.webp',
            '/photo/genshin_drip_marketing/drip_marketing4.webp',
          ],
          features: [
            'Pose kustom khas drip marketing',
            'Fokus karakter utama',
            'Gratis latar belakang drip marketing Genshin',
            'PNG ultra resolusi tinggi + latar transparan',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Genshin Drip Marketing* (Rp 260.000).',
        },
        {
          id: 'charasheet-overdetailed',
          name: 'Character Sheet (Overdetailed)',
          subtitle: 'Lembar referensi tingkat master multi-sudut',
          price: 'Rp 500.000',
          priceNote: 'Mulai dari',
          badge: 'Referensi Master',
          images: ['/photo/charactersheet_overdetailed/overdetailed1.webp'],
          features: [
            'Tampilan sudut lengkap (Depan, Belakang, 3/4)',
            'Detail busana & aksesori sangat terperinci',
            'Termasuk Avatar Icon',
            'Ringkasan cerita latar & spesifikasi karakter',
          ],
          waTemplate: 'Halo Amai Vaelithys! Saya ingin memesan komisi *Character Sheet (Overdetailed)* (Mulai dari Rp 500.000).',
        },
      ],
    },
    testimonials: {
      badge: 'Ulasan Klien',
      title: 'Kesan dari Klien',
      subtitle: 'Simak apa kata para pemesan sebelumnya tentang karya kustom dan pengalaman mereka.',
    },
    faq: {
      badge: 'Pertanyaan Umum',
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Segala hal yang perlu Anda ketahui tentang alur kerja ilustrasi, waktu pengerjaan, dan pengiriman berkas.',
      helpPrompt: 'Punya pertanyaan khusus atau proyek kustom di luar paket?',
      helpBtn: 'Konsultasikan via WhatsApp',
      items: [
        {
          question: 'Bagaimana alur kerja proses komisi?',
          answer:
            'Alur pengerjaan terdiri dari 4 tahap: (1) Konsultasi konsep & referensi, (2) Pembuatan sketsa kasar dan revisi awal, (3) Pembayaran (Full / DP) dan proses lineart & pewarnaan detail, (4) Pengiriman hasil akhir resolusi tinggi via Google Drive.',
        },
        {
          question: 'Berapa lama waktu pengerjaan sebuah komisi?',
          answer:
            'Waktu pengerjaan standar berkisar antara 3 hingga 14 hari kerja tergantung pada kerumitan ilustrasi dan antrean komisi yang sedang berjalan. Jadwal perkiraan akan diinformasikan saat konsultasi.',
        },
        {
          question: 'Format berkas apa yang akan saya dapatkan?',
          answer:
            'Anda akan mendapatkan berkas PNG resolusi tinggi (300 DPI) dengan latar belakang penuh serta versi latar belakang transparan (transparan untuk artwork karakter). File dikirimkan melalui tautan Google Drive.',
        },
        {
          question: 'Apakah komisi boleh digunakan untuk keperluan komersial?',
          answer:
            'Tentu! Penggunaan komersial (seperti thumbnail YouTube yang dimonetisasi, aset VTuber, penjualan merchandise, atau materi branding) dikenakan biaya tambahan sebesar +100% dari harga dasar (2x harga reguler).',
        },
        {
          question: 'Metode pembayaran apa saja yang tersedia?',
          answer:
            'Untuk klien di Indonesia, pembayaran dapat melalui transfer SeaBank dan seluruh E-Wallet populer (Dana, GoPay, OVO, ShopeePay) atau QRIS. Untuk klien internasional, kami menerima pembayaran melalui PayPal.',
        },
      ],
    },
    footer: {
      bio: 'Digital Illustrator & Character Concept Artist yang menghidupkan estetika anime bercahaya, dunia fantasi surgawi, dan narasi visual memukau.',
      navTitle: 'Navigasi Cepat',
      commissionStatus: 'Status Komisi',
      contactTitle: 'Hubungi Saya',
      rights: 'Semua hak cipta dilindungi.',
      designedWith: 'Karakter & Karya orisinal Amai Vaelithys.',
    },
  },

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
      termsTitle: 'Commission Terms & Guidelines',
      terms: {
        detailsLabel: 'Additional Detail & Background',
        detailsDesc: '+$5 – $25 USD depending on character complexity & detailed background scenery.',
        commercialLabel: 'Commercial & Couple Rate',
        commercialDesc: 'Commercial use (YouTube thumbnails, VTuber, merch, business) is +100% (2x base price). Couple artworks are 2x base price.',
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
            'For international commissioners, payments are processed securely via PayPal (invoice) or Wise. For clients residing in Indonesia, payments can be made through SeaBank and all major local E-Wallets or QRIS.',
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
