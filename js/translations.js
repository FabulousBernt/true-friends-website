/* True Friends — translation strings (EN + SV in one file)
 *
 * To edit copy: change the strings below. Each language object has the
 * same shape. Keys are referenced from index.html via:
 *   data-i18n           → sets textContent
 *   data-i18n-html      → sets innerHTML (use sparingly — only for trusted markup like accent spans)
 *   data-i18n-placeholder → sets placeholder attribute
 *   data-i18n-aria-label  → sets aria-label attribute
 */
window.TF_TRANSLATIONS = {
  en: {
    meta: {
      title: "True Friends — Creative & Technical Studio",
      description:
        "True Friends is a creative and technical studio delivering visual design, user experience, testing and web development for ambitious projects.",
    },
    nav: {
      start: "Start",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    hero: {
      welcome: "Welcome to TRUE FRIENDS, we are a",
      titleHTML: 'Creative<span class="accent">&amp;</span><br>Technical<br>Studio',
      location: "based in Motala, Sweden, but available world wide.",
      cta: "say hi",
    },
    about: {
      label: "About",
      ledeHTML:
        'Here at True Friends, we deliver both a <span class="accent">creative</span> vision and <span class="accent">technical</span> expertise to every project and role we take on.',
      body1:
        "We have a long experience in testing, visual design, and user experience from numerous projects across both the private and public sectors. Our vision is to be a close and genuine partner — a true friend — to you as a customer, helping you build high‑quality software solutions.",
      body2:
        "To achieve this, we focus on gaining a deep understanding of your business, goals, customers, users, problems and challenges. True Friends rests on a foundation of honesty, creativity, responsibility, and commitment. These pillars are essential for our work and our shared success.",
    },
    services: {
      label: "Services",
      items: {
        webDev: {
          title: "Web development",
          body: "Production-grade web applications and marketing sites, built with modern frameworks, accessible from day one and ready to scale with your team.",
        },
        webDesign: {
          title: "Web design",
          body: "Interfaces and design systems that balance brand expression with everyday usability — research, IA, prototypes and final visual design.",
        },
        market: {
          title: "Market communication",
          body: "Campaigns, content and brand collateral that connect your product to the right audience across digital and print.",
        },
        photo: {
          title: "Photography",
          body: "Editorial and commercial photography — product, portrait and on‑location work.",
        },
        video: {
          title: "Video & Production",
          body: "From concept to final cut: short‑form social, brand films and product video, with full production support.",
        },
        editing: {
          title: "Editing & Retouch",
          body: "Post‑production for photo and video — colour, retouch and finishing that keep your visuals consistent.",
        },
      },
    },
    contact: {
      label: "Contact",
      title: "Say hi.",
      lede: "Find us on our social media channels, reach out via email or send a message through the form below.",
      placeholders: {
        firstName: "first name",
        lastName: "last name",
        email: "email",
        message: "message",
      },
      submit: "send",
      otherWays: "Other ways to reach us",
    },
    modal: {
      title: "Say hi!",
      desc: "Please fill out the contact form and we will get back to you as soon as we can.",
      close: "close",
      send: "send",
    },
    footer: {
      copyright: "© True Friends 2026",
    },
    status: {
      sending: "Sending…",
      success: "Thanks — we'll be in touch soon.",
      error: "Something went wrong. Please try again.",
      network: "Network error. Please try again.",
      rateLimited: "Please wait {wait}s before sending again.",
      notConfigured:
        "Form endpoint not configured. Email info@truefriends.se directly.",
    },
    aria: {
      skip: "Skip to content",
      home: "True Friends home",
      primary: "Primary",
      socialLinks: "Social links",
      mobileMenu: "Toggle navigation menu",
      closeDialog: "Close dialog",
      langSwitch: "Switch language",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      message: "Message",
    },
  },

  sv: {
    meta: {
      title: "True Friends — Kreativ & Teknisk Studio",
      description:
        "True Friends är en kreativ och teknisk studio som levererar visuell design, användarupplevelse, test och webbutveckling för ambitiösa projekt.",
    },
    nav: {
      start: "Start",
      about: "Om oss",
      services: "Tjänster",
      contact: "Kontakt",
    },
    hero: {
      welcome: "Välkommen till TRUE FRIENDS, vi är en",
      titleHTML: 'Kreativ<span class="accent">&amp;</span><br>Teknisk<br>Studio',
      location: "baserad i Motala, Sverige, men tillgänglig över hela världen.",
      cta: "säg hej",
    },
    about: {
      label: "Om oss",
      ledeHTML:
        'Hos True Friends levererar vi både en <span class="accent">kreativ</span> vision och <span class="accent">teknisk</span> expertis i varje projekt och roll vi tar oss an.',
      body1:
        "Vi har lång erfarenhet av test, visuell design och användarupplevelse från ett stort antal projekt inom både privat och offentlig sektor. Vår vision är att vara en nära och genuin partner — en sann vän — till dig som kund, och hjälpa dig att bygga kvalitativa mjukvarulösningar.",
      body2:
        "För att lyckas med det fokuserar vi på att skapa en djup förståelse för din verksamhet, dina mål, kunder, användare, problem och utmaningar. True Friends vilar på en grund av ärlighet, kreativitet, ansvar och engagemang. Dessa pelare är avgörande för vårt arbete och vår gemensamma framgång.",
    },
    services: {
      label: "Tjänster",
      items: {
        webDev: {
          title: "Webbutveckling",
          body: "Produktionsfärdiga webbapplikationer och marknadssidor, byggda med moderna ramverk, tillgängliga från första början och redo att skalas med ditt team.",
        },
        webDesign: {
          title: "Webbdesign",
          body: "Gränssnitt och designsystem som balanserar varumärkesuttryck med vardaglig användbarhet — research, IA, prototyper och slutlig visuell design.",
        },
        market: {
          title: "Marknadskommunikation",
          body: "Kampanjer, innehåll och varumärkesmaterial som kopplar din produkt till rätt målgrupp, både digitalt och i tryck.",
        },
        photo: {
          title: "Fotografering",
          body: "Redaktionell och kommersiell fotografering — produkt, porträtt och fotografering på plats.",
        },
        video: {
          title: "Video & Produktion",
          body: "Från idé till färdig film: kortformat för sociala medier, varumärkesfilmer och produktvideo, med full produktionssupport.",
        },
        editing: {
          title: "Redigering & Retusch",
          body: "Efterbearbetning för foto och video — färg, retusch och finputs som håller dina bilder konsekventa.",
        },
      },
    },
    contact: {
      label: "Kontakt",
      title: "Säg hej.",
      lede: "Hitta oss i våra sociala kanaler, kontakta oss via e‑post eller skicka ett meddelande via formuläret nedan.",
      placeholders: {
        firstName: "förnamn",
        lastName: "efternamn",
        email: "e‑post",
        message: "meddelande",
      },
      submit: "skicka",
      otherWays: "Andra sätt att nå oss",
    },
    modal: {
      title: "Säg hej!",
      desc: "Fyll i kontaktformuläret så återkommer vi så snart vi kan.",
      close: "stäng",
      send: "skicka",
    },
    footer: {
      copyright: "© True Friends 2026",
    },
    status: {
      sending: "Skickar…",
      success: "Tack — vi hör av oss snart.",
      error: "Något gick fel. Vänligen försök igen.",
      network: "Nätverksfel. Vänligen försök igen.",
      rateLimited: "Vänta {wait}s innan du skickar igen.",
      notConfigured:
        "Formulärets adress är inte konfigurerad. Mejla info@truefriends.se direkt.",
    },
    aria: {
      skip: "Hoppa till innehåll",
      home: "True Friends startsida",
      primary: "Huvudnavigation",
      socialLinks: "Sociala kanaler",
      mobileMenu: "Öppna navigeringsmenyn",
      closeDialog: "Stäng dialogen",
      langSwitch: "Byt språk",
      firstName: "Förnamn",
      lastName: "Efternamn",
      email: "E‑post",
      message: "Meddelande",
    },
  },
};
