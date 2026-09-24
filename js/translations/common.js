/* True Friends 96 — common translation strings (EN + SV)
 *
 * Strings shared across every page: the window chrome (menus, toolbar, tree,
 * status panels, taskbar, dialogs), the contact form, and the canned replies
 * the prompt line gives back. Page prose — the about text, the service
 * descriptions, the questions in the transcript — lives in the per-page file
 * instead. Each per-page file loads AFTER this one and merges its own keys in
 * via TF_ADD_TRANSLATIONS at the bottom.
 *
 * Keys are referenced from HTML via:
 *   data-i18n              → textContent
 *   data-i18n-html         → innerHTML (trusted markup only)
 *   data-i18n-placeholder  → placeholder attribute
 *   data-i18n-aria-label   → aria-label attribute
 *   data-i18n-content      → content attribute (meta tags)
 *   data-i18n-href         → href attribute (per-language files)
 *   data-i18n-title        → title attribute
 */
window.TF_TRANSLATIONS = {
  en: {
    meta: {
      description:
        "True Friends is a creative and technical studio & consulting firm delivering services in software testing, web development, UI/UX design, graphic design, market communication, photography, video production and editing. We are based in Motala, Sweden, but available worldwide.",
    },

    /* ---------- Window chrome ---------- */
    ui: {
      appName: "True Friends 96",
      titleStart: "True Friends 96",
      titleConsulting: "True Friends 96 — Consulting",
      titleStudio: "True Friends 96 — Studio",

      menu: {
        file: "File",
        edit: "Edit",
        view: "View",
        conversation: "Conversation",
        help: "Help",
      },
      file: {
        newChat: "New Chat",
        openConsulting: "Open Consulting",
        openStudio: "Open Studio",
        save: "Save Conversation…",
        print: "Print…",
        exit: "Exit",
      },
      edit: {
        undo: "Undo",
        cut: "Cut",
        copy: "Copy",
        paste: "Paste",
        selectAll: "Select All",
      },
      view: {
        english: "English",
        swedish: "Svenska",
        maximize: "Maximize window",
        top: "Top of page",
      },
      conv: {
        clear: "Clear my messages",
      },
      helpMenu: {
        readme: "Read Me",
        shortcuts: "Keyboard Shortcuts",
        about: "About True Friends 96",
      },

      tb: {
        newChat: "New Chat",
        ask: "Ask",
        save: "Save",
        print: "Print",
        about: "About",
      },

      tree: {
        myComputer: "My Computer",
        conversations: "Conversations",
        cases: "Reference cases",
        files: "Files",
        cvEn: "cv-english.pdf",
        cvSv: "cv-svenska.pdf",
        collapse: "Collapse",
        expand: "Expand",
      },

      location: "Location:",
      loc: {
        start: "Start",
        consulting: "Consulting",
        studio: "Studio",
      },

      tipTitle: "Tip:",
      tip: "Type a message below and press Send.",

      conn: {
        legend: "Connection",
        server: "Server:",
        protocol: "Protocol:",
        status: "Status:",
        latency: "Latency:",
        online: "ONLINE",
        note: "Connected via 33.6 kbps dial-up modem.",
      },
      session: {
        legend: "Session",
        user: "User:",
        guest: "guest",
        messages: "Messages:",
        memory: "Memory:",
        memoryOk: "640K OK",
        mode: "Mode:",
      },
      options: {
        legend: "Options",
        autoScroll: "Auto scroll",
        plainText: "Plain text",
        showSystem: "Show system",
        language: "Language",
      },
      helpBox: { legend: "Help" },

      ready: "Ready",
      send: "Send",
      promptLabel: "Message",
      promptPlaceholder: "Type a message and press Send…",

      /* The opening SYSTEM turn. Every page prints the same handshake; only
         the mode line differs, and that comes from the per-page file. */
      boot: {
        dialing: "Dialing 08-555 1996…",
        negotiating: "Negotiating at 33.6 kbps…",
      },

      sys: {
        welcome: "Welcome to True Friends 96.",
        connected: "Connected to the truefriends.se network via modem…",
        status: "Status:",
        ready: "READY",
        mode: "Mode:",
      },

      who: {
        system: "SYSTEM",
        you: "YOU",
        tf: "TRUEFRIENDS",
      },

      start: {
        label: "Start",
        consulting: "Consulting",
        studio: "Studio",
        home: "Start page",
        contact: "Say hi…",
        readme: "Read Me",
        shortcuts: "Keyboard Shortcuts",
        shutDown: "Shut Down…",
      },

      dlg: {
        ok: "OK",
        cancel: "Cancel",
        close: "Close",

        aboutTitle: "About True Friends 96",
        aboutHeading: "True Friends 96",
        aboutVersion: "Version 96 (Build 1996.03.12)",
        aboutBody:
          "A creative and technical studio & consulting firm based in Motala, Sweden, but available worldwide.",
        aboutLicense: "This product is licensed to: a true friend.",

        saveTitle: "Save Conversation",
        saveBody:
          "The conversation could not be saved. Insert a formatted floppy disk in drive A: and try again.",

        exitTitle: "True Friends 96",
        exitBody:
          "This program cannot be closed. A true friend does not walk out on you.",
        exitBody2: "Send a message instead — we answer faster than a modem.",

        shortcutsTitle: "Keyboard Shortcuts",
        shortcutsIntro: "While the window has focus:",

        readmeTitle: "README.TXT",
        readmeBody:
          "True Friends is a creative and technical studio & consulting firm. Consulting covers testing, UX/UI design, web production, software development and cybersecurity. Studio covers web production, design, market communication, photography, video and editing.",
        readmeBody2:
          "Based in Motala, Sweden. Available worldwide. Requires 640K of memory and a friend on the other end of the line.",

        shutDownTitle: "Shut Down",
        shutDownBody: "It is now safe to email hello@truefriends.se.",

        viewerTitle: "Image Viewer",
        contactTitle: "New Message",
      },

      shortcuts: {
        enter: "Send the message in the prompt line",
        slash: "Jump to the prompt line",
        esc: "Close the open dialog",
        arrows: "Previous / next photo in the viewer",
        tab: "Move between controls",
      },
    },

    /* ---------- What the prompt line answers with ---------- */
    chat: {
      thinking: "Connecting…",
      hello: "Hello. Nice of you to dial in. Ask about our services, our people, our prices, or just say hi — hello@truefriends.se reaches a human either way.",
      services:
        "Consulting: testing, UX design, UI design. Studio: web production, graphic design, market communication, photography, video and editing. Open one of the service lines above for the full description.",
      contact:
        "Easiest: hello@truefriends.se or +46 705 424 677. There is also a form further up this conversation, and a postbox at Lugngatan 15C, 59160 Motala, Sweden.",
      price:
        "It depends on scope, length and whether you need one pair of hands or a whole team. Tell us what you are building and we will come back with a real number rather than a guessed one.",
      gallery:
        "The photography is on the Studio page — click any thumbnail to open it in the image viewer.",
      who: "True Friends is a creative and technical studio & consulting firm in Motala, Sweden. Small, senior, and available worldwide. Ask about a specific service if you want detail.",
      hire: "Yes — we take on both consulting assignments and studio productions, for companies, organisations and private individuals. Mail hello@truefriends.se with roughly what you need and when.",
      thanks: "Any time. That is rather the whole idea behind the name.",
      joke: "Error 1996: humour module not installed. Insert disk 7 of 12 and try again.",
      fallback:
        "This build runs offline, so that one is beyond it — but a human is not. Write to hello@truefriends.se and you will get a real answer from a real person.",
    },

    /* ---------- Site-wide labels ---------- */
    nav: {
      start: "Start",
      about: "About",
      services: "Services",
      team: "Consultants",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      cta: "Say hi",
      consulting: "Consulting",
      studio: "Studio",
    },
    services: { label: "Services" },
    refCase: {
      about: "About",
      myRole: "My role",
      workflow: "Workflow",
      back: "Back to Consulting",
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
      skip: "Skip to conversation",
      home: "True Friends home",
      primary: "Primary",
      socialLinks: "Social links",
      langSwitch: "Switch language",
      backToTop: "Top of page",
      lightbox: "Photo gallery",
      prevPhoto: "Previous photo",
      nextPhoto: "Next photo",
      closeLightbox: "Close",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      message: "Message",
      minimize: "Minimize",
      maximize: "Maximize",
      close: "Close",
      transcript: "Conversation",
      toolbar: "Toolbar",
      menubar: "Application menu",
      tree: "Site contents",
      startMenu: "Start menu",
      openWindows: "Open windows",
      boot: "Connecting",
    },
  },

  sv: {
    meta: {
      description:
        "True Friends är en kreativ och teknisk studio och konsultbolag som levererar tjänster inom webbutveckling, webbdesign, testning, UI/UX design, grafisk design, marknadskommunikation, fotografering, filmproduktion och redigering/retusch. Vi är baserade i Motala, Sverige, men tillgängliga världen över.",
    },

    ui: {
      appName: "True Friends 96",
      titleStart: "True Friends 96",
      titleConsulting: "True Friends 96 — Konsult",
      titleStudio: "True Friends 96 — Studio",

      menu: {
        file: "Arkiv",
        edit: "Redigera",
        view: "Visa",
        conversation: "Konversation",
        help: "Hjälp",
      },
      file: {
        newChat: "Ny chatt",
        openConsulting: "Öppna Konsult",
        openStudio: "Öppna Studio",
        save: "Spara konversation…",
        print: "Skriv ut…",
        exit: "Avsluta",
      },
      edit: {
        undo: "Ångra",
        cut: "Klipp ut",
        copy: "Kopiera",
        paste: "Klistra in",
        selectAll: "Markera allt",
      },
      view: {
        english: "English",
        swedish: "Svenska",
        maximize: "Maximera fönster",
        top: "Högst upp",
      },
      conv: {
        clear: "Rensa mina meddelanden",
      },
      helpMenu: {
        readme: "Läs mig",
        shortcuts: "Kortkommandon",
        about: "Om True Friends 96",
      },

      tb: {
        newChat: "Ny chatt",
        ask: "Fråga",
        save: "Spara",
        print: "Skriv ut",
        about: "Om",
      },

      tree: {
        myComputer: "Den här datorn",
        conversations: "Konversationer",
        cases: "Referensuppdrag",
        files: "Filer",
        cvEn: "cv-english.pdf",
        cvSv: "cv-svenska.pdf",
        collapse: "Fäll ihop",
        expand: "Fäll ut",
      },

      location: "Plats:",
      loc: {
        start: "Start",
        consulting: "Konsult",
        studio: "Studio",
      },

      tipTitle: "Tips:",
      tip: "Skriv ett meddelande nedan och tryck Skicka.",

      conn: {
        legend: "Anslutning",
        server: "Server:",
        protocol: "Protokoll:",
        status: "Status:",
        latency: "Svarstid:",
        online: "UPPKOPPLAD",
        note: "Ansluten via 33,6 kbit/s uppringt modem.",
      },
      session: {
        legend: "Session",
        user: "Användare:",
        guest: "gäst",
        messages: "Meddelanden:",
        memory: "Minne:",
        memoryOk: "640K OK",
        mode: "Läge:",
      },
      options: {
        legend: "Alternativ",
        autoScroll: "Autoskrolla",
        plainText: "Ren text",
        showSystem: "Visa system",
        language: "Språk",
      },
      helpBox: { legend: "Hjälp" },

      ready: "Klar",
      send: "Skicka",
      promptLabel: "Meddelande",
      promptPlaceholder: "Skriv ett meddelande och tryck Skicka…",

      boot: {
        dialing: "Ringer upp 08-555 1996…",
        negotiating: "Förhandlar på 33,6 kbit/s…",
      },

      sys: {
        welcome: "Välkommen till True Friends 96.",
        connected: "Ansluten till nätverket truefriends.se via modem…",
        status: "Status:",
        ready: "KLAR",
        mode: "Läge:",
      },

      who: {
        system: "SYSTEM",
        you: "DU",
        tf: "TRUEFRIENDS",
      },

      start: {
        label: "Start",
        consulting: "Konsult",
        studio: "Studio",
        home: "Startsida",
        contact: "Säg hej…",
        readme: "Läs mig",
        shortcuts: "Kortkommandon",
        shutDown: "Avsluta…",
      },

      dlg: {
        ok: "OK",
        cancel: "Avbryt",
        close: "Stäng",

        aboutTitle: "Om True Friends 96",
        aboutHeading: "True Friends 96",
        aboutVersion: "Version 96 (Build 1996.03.12)",
        aboutBody:
          "En kreativ och teknisk studio & konsultfirma baserad i Motala, Sverige, men tillgänglig världen över.",
        aboutLicense: "Denna produkt är licensierad till: en true friend.",

        saveTitle: "Spara konversation",
        saveBody:
          "Konversationen kunde inte sparas. Sätt in en formaterad diskett i enhet A: och försök igen.",

        exitTitle: "True Friends 96",
        exitBody:
          "Programmet kan inte avslutas. En true friend lämnar dig inte.",
        exitBody2:
          "Skicka ett meddelande i stället — vi svarar snabbare än ett modem.",

        shortcutsTitle: "Kortkommandon",
        shortcutsIntro: "När fönstret har fokus:",

        readmeTitle: "LASMIG.TXT",
        readmeBody:
          "True Friends är en kreativ och teknisk studio och konsultfirma. Konsult omfattar testning, UX/UI-design, webbproduktion, mjukvaruutveckling och cybersäkerhet. Studio omfattar webbproduktion, design, marknadskommunikation, foto, video och redigering.",
        readmeBody2:
          "Baserade i Motala, Sverige. Tillgängliga världen över. Kräver 640K minne och en vän i andra änden av linjen.",

        shutDownTitle: "Avsluta",
        shutDownBody: "Det är nu säkert att mejla hello@truefriends.se.",

        viewerTitle: "Bildvisare",
        contactTitle: "Nytt meddelande",
      },

      shortcuts: {
        enter: "Skicka meddelandet i promptraden",
        slash: "Hoppa till promptraden",
        esc: "Stäng öppen dialogruta",
        arrows: "Föregående / nästa foto i bildvisaren",
        tab: "Flytta mellan kontroller",
      },
    },

    chat: {
      thinking: "Kopplar upp…",
      hello: "Hej! Kul att du ringde upp. Fråga om våra tjänster, våra konsulter, priser — eller säg bara hej. hello@truefriends.se når en människa oavsett.",
      services:
        "Konsult: testning, UX-design, UI-design. Studio: webbproduktion, grafisk design, marknadskommunikation, foto, video och redigering. Fäll ut en tjänsterad ovan för hela beskrivningen.",
      contact:
        "Enklast: hello@truefriends.se eller +46 705 424 677. Det finns även ett formulär längre upp i konversationen, och en brevlåda på Lugngatan 15C, 59160 Motala.",
      price:
        "Det beror på omfattning, längd och om ni behöver ett par händer eller ett helt team. Berätta vad ni bygger så återkommer vi med en riktig siffra i stället för en gissad.",
      gallery:
        "Fotografierna finns på Studio-sidan — klicka på en miniatyr så öppnas den i bildvisaren.",
      who: "True Friends är en kreativ och teknisk studio och konsultfirma i Motala. Liten, senior och tillgänglig världen över. Fråga om en specifik tjänst om du vill ha detaljer.",
      hire: "Ja — vi tar både konsultuppdrag och studioproduktioner, för företag, organisationer och privatpersoner. Mejla hello@truefriends.se med ungefär vad ni behöver och när.",
      thanks: "När som helst. Det är liksom hela poängen med namnet.",
      joke: "Fel 1996: humormodulen är inte installerad. Sätt in diskett 7 av 12 och försök igen.",
      fallback:
        "Den här versionen kör offline, så den frågan är för svår för den — men inte för en människa. Skriv till hello@truefriends.se så får du ett riktigt svar.",
    },

    nav: {
      start: "Start",
      about: "Om oss",
      services: "Tjänster",
      team: "Konsulter",
      gallery: "Galleri",
      contact: "Kontakt",
    },
    hero: {
      cta: "Säg hej",
      consulting: "Konsult",
      studio: "Studio",
    },
    services: { label: "Tjänster" },
    refCase: {
      about: "Om uppdraget",
      myRole: "Min roll",
      workflow: "Arbetsprocess",
      back: "Tillbaka till Konsult",
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
      success: "Tack — vi hör av oss så snart vi kan.",
      error: "Något gick fel. Vänligen försök igen.",
      network: "Nätverksfel. Vänligen försök igen.",
      rateLimited: "Vänta {wait}s innan du skickar igen.",
      notConfigured:
        "Formulärets adress är inte konfigurerad. Mejla hello@truefriends.se direkt.",
    },
    aria: {
      skip: "Hoppa till konversationen",
      home: "True Friends startsida",
      primary: "Huvudnavigation",
      socialLinks: "Sociala kanaler",
      langSwitch: "Byt språk",
      backToTop: "Högst upp",
      lightbox: "Fotogalleri",
      prevPhoto: "Föregående foto",
      nextPhoto: "Nästa foto",
      closeLightbox: "Stäng",
      firstName: "Förnamn",
      lastName: "Efternamn",
      email: "E‑post",
      message: "Meddelande",
      minimize: "Minimera",
      maximize: "Maximera",
      close: "Stäng",
      transcript: "Konversation",
      toolbar: "Verktygsfält",
      menubar: "Programmeny",
      tree: "Innehåll",
      startMenu: "Startmeny",
      openWindows: "Öppna fönster",
      boot: "Kopplar upp",
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
