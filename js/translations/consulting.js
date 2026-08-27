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
          consulting: "      ::::::::  :::::::: ::::    ::: :::::::: :::    ::::::   ::::::::::::::::::::::::::    ::: ::::::::\n    :+:    :+::+:    :+::+:+:   :+::+:    :+::+:    :+::+:       :+:        :+:    :+:+:   :+::+:    :+:\n   +:+       +:+    +:+:+:+:+  +:++:+       +:+    +:++:+       +:+        +:+    :+:+:+  +:++:+\n  +#+       +#+    +:++#+ +:+ +#++#++:++#+++#+    +:++#+       +#+        +#+    +#+ +:+ +#+:#:\n +#+       +#+    +#++#+  +#+#+#       +#++#+    +#++#+       +#+        +#+    +#+  +#+#+#+#+   +#+#\n#+#    #+##+#    #+##+#   #+#+##+#    #+##+#    #+##+#       #+#        #+#    #+#   #+#+##+#    #+#\n########  ######## ###    #### ########  ######## #############    ##############    #### ########",
        },
        services: {
          consulting: ["We consult in testing, ux/ui design, web/software dev and cybersecurity."],
        },
      },
    },
    services: {
      items: {
        testing: {
          title: "Testing",
          body: "Placeholder description — to be updated.",
        },
        uxDesign: {
          title: "UX Design",
          body: "Placeholder description — to be updated.",
        },
        uiDesign: {
          title: "UI Design",
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
          consulting: "      :::    ::::::::::: ::::    ::: :::::::: :::    ::::::   :::::::::::\n     :+:   :+::+:    :+::+:+:   :+::+:    :+::+:    :+::+:       :+:\n    +:+  +:+ +:+    +:+:+:+:+  +:++:+       +:+    +:++:+       +:+\n   +#++:++  +#+    +:++#+ +:+ +#++#++:++#+++#+    +:++#+       +#+\n  +#+  +#+ +#+    +#++#+  +#+#+#       +#++#+    +#++#+       +#+\n #+#   #+##+#    #+##+#   #+#+##+#    #+##+#    #+##+#       #+#\n###    ########### ###    #### ########  ######## #############",
        },
        services: {
          consulting: ["testning", "ux", "ui", "kvalitet", "leverera"],
        },
      },
    },
    services: {
      items: {
        testing: {
          title: "Testning",
          body: "Platshållartext — kommer att uppdateras.",
        },
        uxDesign: {
          title: "UX-design",
          body: "Platshållartext — kommer att uppdateras.",
        },
        uiDesign: {
          title: "UI-design",
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
