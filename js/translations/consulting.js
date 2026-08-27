/* True Friends — consulting page translations
 *
 * Adds consulting-only keys onto TF_TRANSLATIONS. Site-wide labels
 * (nav, footer, aria, contact, modal, about section, hero.cta,
 * hero.consulting/studio labels, tagline, refCase labels) live in
 * js/translations/common.js.
 */
window.TF_ADD_TRANSLATIONS({
  en: {
    meta: {
      titleConsulting: "True Friends — Consulting",
    },
    hero: {
      consultingSubhead:
        "A senior tester and designer, embedded with your team — helping you build software you're proud of.",
      terminal: {
        title: {
          consulting: "Consulting",
        },
        ascii: {
          consulting: "  ___ ___  _  _ ___ _   _ _  _____ ___ _  _  ___ \n / __/ _ \\| \\| / __| | | | ||_   _|_ _| \\| |/ __|\n| (_| (_) | .` \\__ \\ |_| | |__| |  | || .` | (_ |\n \\___\\___/|_|\\_|___/\\___/|____|_| |___|_|\\_|\\___|",
        },
        services: {
          consulting: ["We consult in testing, ux/ui design, web/software dev and cybersecurity."],
        },
      },
    },
    services: {
      items: {
        testing: {
          name: "testing",
          title: "Testing",
          summary: "quality assurance & test strategy",
          body: "Placeholder description — to be updated.",
        },
        uxDesign: {
          name: "ux-design",
          title: "UX Design",
          summary: "user research & flow design",
          body: "Placeholder description — to be updated.",
        },
        uiDesign: {
          name: "ui-design",
          title: "UI Design",
          summary: "interface systems & prototypes",
          body: "Placeholder description — to be updated.",
        },
      },
    },
    team: {
      label: "Consultants",
      referenceCases: "Reference cases",
      cv: "Download resumé",
      members: {
        johnny: {
          name: "Johnny Vigersten",
          role: "Tester / Designer",
          bio: "I'm a Testing Consultant and UI/UX Designer with a strong focus on exploration, investigation, problem solving, usability, aesthetics, and security.",
          cvHref: "cv/johnny-vigersten-cv-EN.pdf",
        },
      },
    },
  },

  sv: {
    meta: {
      titleConsulting: "True Friends — Konsult",
    },
    hero: {
      consultingSubhead:
        "En senior testare och designer på plats hos ert team — hjälper er bygga mjukvara ni är stolta över.",
      terminal: {
        title: {
          consulting: "Terminal konsult",
        },
        ascii: {
          consulting: " _  _____  _  _ ___ _   _ _  _____ \n| |/ / _ \\| \\| / __| | | | ||_   _|\n| ' < (_) | .` \\__ \\ |_| | |__| |  \n|_|\\_\\___/|_|\\_|___/\\___/|____|_|  ",
        },
        services: {
          consulting: ["testning", "ux", "ui", "kvalitet", "leverera"],
        },
      },
    },
    services: {
      items: {
        testing: {
          name: "testning",
          title: "Testning",
          summary: "kvalitetssäkring & teststrategi",
          body: "Platshållartext — kommer att uppdateras.",
        },
        uxDesign: {
          name: "ux-design",
          title: "UX-design",
          summary: "användarforskning & flödesdesign",
          body: "Platshållartext — kommer att uppdateras.",
        },
        uiDesign: {
          name: "ui-design",
          title: "UI-design",
          summary: "gränssnittssystem & prototyper",
          body: "Platshållartext — kommer att uppdateras.",
        },
      },
    },
    team: {
      label: "Konsulter",
      referenceCases: "Referensuppdrag",
      cv: "Ladda ner CV",
      members: {
        johnny: {
          name: "Johnny Vigersten",
          role: "Testare / Designer",
          bio: "Jag är en driven och engagerad testkonsult och UI/UX-designer med ett starkt fokus på problemlösning, användbarhet, estetik och säkerhet.",
          cvHref: "cv/johnny-vigersten-cv-SE.pdf",
        },
      },
    },
  },
});
