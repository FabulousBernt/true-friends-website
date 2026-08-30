/* True Friends — common translation strings (EN + SV)
 *
 * This file holds strings shared across ALL pages: nav, footer, aria,
 * status messages, the contact modal, and site-wide labels. Each
 * per-page file (landing.js, consulting.js, studio.js, epiroc.js,
 * kopparbergs-brewery.js) loads AFTER this one and adds its own keys
 * via TF_ADD_TRANSLATIONS below.
 *
 * Keys are referenced from HTML via:
 *   data-i18n           → sets textContent
 *   data-i18n-html      → sets innerHTML (only for trusted markup like accent spans)
 *   data-i18n-placeholder → sets placeholder attribute
 *   data-i18n-aria-label  → sets aria-label attribute
 *   data-i18n-content     → sets content attribute (meta tags)
 *   data-i18n-href        → sets href attribute (per-language links/files)
 */
window.TF_TRANSLATIONS = {
  en: {
    meta: {
      description:
        "True Friends is a creative and technical studio & consulting firm delivering services in software testing, web development, UI/UX design, graphic design, market communication, photography, video production and editing. We are based in Motala, Sweden, but available worldwide.",
    },
    nav: {
      start: "Start",
      about: "About",
      clients: "Clients",
      services: "Services",
      team: "Consultants",
      gallery: "Gallery",
      contact: "Contact",
    },
    clients: {
      label: "Clients",
    },
    hero: {
      cta: "Say hi",
      consulting: "Consulting",
      studio: "Studio",
      terminal: {
        tagline: "(^_^) TRUE FRIENDS",
      },
    },
    about: {
      label: "About",
      ledeHTML:
        'Here at True Friends, we deliver both a <span class="accent">creative</span> vision and <span class="accent">technical</span> expertise to every project and role we take on.',
      body1:
        "We have a long experience in web development, digital and graphical design, photography and video production. Our vision is to be a close and genuine partner — a true friend — to you as a customer, helping you build your brand/companies visual and digital profile.",
      body2:
        "To achieve this, we focus on gaining a deep understanding of your business, goals, customers, users, problems and challenges. True Friends rests on a foundation of honesty, creativity, responsibility, and commitment. These pillars are essential for our work and our shared success.",
    },
    services: {
      label: "Services",
    },
    refCase: {
      about: "About",
      myRole: "My role",
      workflow: "Design & Testing Workflow",
      helpCenter: "Help Center",
    },
    contact: {
      label: "Contact",
      lede: "Find us on our social media channels, reach out via email or send a message through the form below.",
      placeholders: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        message: "Message",
      },
      submit: "Send",
      otherWays: "Other ways to reach us",
    },
    modal: {
      title: "Say hi!",
      desc: "Please fill out the contact form and we will get back to you as soon as we can.",
      close: "Close",
      send: "Send",
    },
    footer: {
      copyright: "© {year} True Friends. All rights reserved.",
    },
    status: {
      sending: "Sending…",
      success: "Thanks — we'll be in touch soon.",
      error: "Something went wrong. Please try again.",
      network: "Network error. Please try again.",
      rateLimited: "Please wait {wait}s before sending again.",
      notConfigured:
        "Form endpoint not configured. Email hello@truefriends.se directly.",
    },
    aria: {
      skip: "Skip to content",
      home: "True Friends home",
      primary: "Primary",
      socialLinks: "Social links",
      mobileMenu: "Toggle navigation menu",
      langSwitch: "Switch language",
      backToTop: "Back to top",
      prevPage: "Previous page",
      nextPage: "Next page",
      lightbox: "Photo gallery",
      prevPhoto: "Previous photo",
      nextPhoto: "Next photo",
      closeLightbox: "Close",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      message: "Message",
    },
  },

  sv: {
    meta: {
      description:
        "True Friends är en kreativ och teknisk studio och konsultbolag som levererar tjänster inom webbutveckling, webbdesign, testning, UI/UX design, grafisk design, marknadskommunikation, fotografering, filmproduktion och redigering/retouch. VI är baserade i Motala, Sverige, men tillgängliga världen över.",
    },
    nav: {
      start: "Start",
      about: "Om oss",
      clients: "Kunder",
      services: "Tjänster",
      team: "Konsulter",
      gallery: "Galleri",
      contact: "Kontakt",
    },
    clients: {
      label: "Kunder",
    },
    hero: {
      cta: "Säg hej",
      consulting: "Konsult",
      studio: "Studio",
      terminal: {
        tagline: "(^_^) TRUE FRIENDS",
      },
    },
    about: {
      label: "Om oss",
      ledeHTML:
        'Vi på True Friends levererar både en <span class="accent">kreativ</span> vision och <span class="accent">teknisk</span> expertis i varje projekt och roll som vi tar oss an.',
      body1:
        "Vi har en lång erfarenhet inom webbutveckling, digital och grafisk design, fotografering och videoproduktion. Vår vision är att vara en nära och genuin partner - a true friend - till er som kund, och tillsammans bygga ert varumärke/företags visuella och digitala profil och identitet.",
      body2:
        "För att lyckas med detta fokuserar vi på att skapa en djup förståelse för er verksamhet, era mål, kunder, användare, problem och utmaningar. True Friends är byggt på en grund av ärlighet, kreativitet, ansvar och engagemang. Dessa grundpelare är avgörande för vårt arbete och vår gemensamma framgång.",
    },
    services: {
      label: "Tjänster",
    },
    refCase: {
      about: "Om uppdraget",
      myRole: "Min roll",
      workflow: "Arbetsprocess",
      helpCenter: "Hjälpcenter",
    },
    contact: {
      label: "Kontakt",
      lede: "Hitta oss i våra sociala kanaler, kontakta oss via e‑post eller skicka ett meddelande via formuläret nedan.",
      placeholders: {
        firstName: "Förnamn",
        lastName: "Efternamn",
        email: "E‑post",
        message: "Meddelande",
      },
      submit: "Skicka",
      otherWays: "Andra sätt att nå oss",
    },
    modal: {
      title: "Säg hej!",
      desc: "Fyll i kontaktformuläret så återkommer vi så snart vi kan.",
      close: "Stäng",
      send: "Skicka",
    },
    footer: {
      copyright: "© {year} True Friends. All rights reserved.",
    },
    status: {
      sending: "Skickar…",
      success: "Tack — vi hör av oss snart.",
      error: "Något gick fel. Vänligen försök igen.",
      network: "Nätverksfel. Vänligen försök igen.",
      rateLimited: "Vänta {wait}s innan du skickar igen.",
      notConfigured:
        "Formulärets adress är inte konfigurerad. Mejla hello@truefriends.se direkt.",
    },
    aria: {
      skip: "Hoppa till innehåll",
      home: "True Friends startsida",
      primary: "Huvudnavigation",
      socialLinks: "Sociala kanaler",
      mobileMenu: "Öppna navigeringsmenyn",
      langSwitch: "Byt språk",
      backToTop: "Tillbaka till toppen",
      prevPage: "Föregående sida",
      nextPage: "Nästa sida",
      lightbox: "Fotogalleri",
      prevPhoto: "Föregående foto",
      nextPhoto: "Nästa foto",
      closeLightbox: "Stäng",
      firstName: "Förnamn",
      lastName: "Efternamn",
      email: "E‑post",
      message: "Meddelande",
    },
  },
};

/* Deep-merges a per-page translation object into TF_TRANSLATIONS. Each
 * per-page file calls this exactly once with { en: {...}, sv: {...} }.
 * Arrays replace wholesale; nested objects merge key-by-key. */
window.TF_ADD_TRANSLATIONS = function (additions) {
  const merge = (target, source) => {
    for (const key of Object.keys(source)) {
      const value = source[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) {
          target[key] = {};
        }
        merge(target[key], value);
      } else {
        target[key] = value;
      }
    }
  };
  if (additions.en) merge(window.TF_TRANSLATIONS.en, additions.en);
  if (additions.sv) merge(window.TF_TRANSLATIONS.sv, additions.sv);
};
