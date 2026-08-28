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
      terminal: {
        title: {
          consulting: "Consulting",
        },
        ascii: {
          consulting: "      ::::::::  :::::::: ::::    ::: :::::::: :::    ::::::   ::::::::::::::::::::::::::    ::: ::::::::\n    :+:    :+::+:    :+::+:+:   :+::+:    :+::+:    :+::+:       :+:        :+:    :+:+:   :+::+:    :+:\n   +:+       +:+    +:+:+:+:+  +:++:+       +:+    +:++:+       +:+        +:+    :+:+:+  +:++:+\n  +#+       +#+    +:++#+ +:+ +#++#++:++#+++#+    +:++#+       +#+        +#+    +#+ +:+ +#+:#:\n +#+       +#+    +#++#+  +#+#+#       +#++#+    +#++#+       +#+        +#+    +#+  +#+#+#+#+   +#+#\n#+#    #+##+#    #+##+#   #+#+##+#    #+##+#    #+##+#       #+#        #+#    #+#   #+#+##+#    #+#\n########  ######## ###    #### ########  ######## #############    ##############    #### ########",
        },
        services: {
          consulting: ["We provide consulting services in testing, ux/ui design, web production, software development and cybersecurity."],
        },
      },
    },
    services: {
      items: {
        testing: {
          name: "Testing",
          body: "Placeholder description — to be updated.",
        },
        uxDesign: {
          name: "UX Design",
          body: "Placeholder description — to be updated.",
        },
        uiDesign: {
          name: "UI Design",
          body: "Placeholder description — to be updated.",
        },
      },
    },
    team: {
      label: "Consultants",
      cv: "Download cv",
      members: {
        johnny: {
          name: "Johnny Vigersten",
          role: "Tester / Designer",
          bio: "I like exploring and investigating software and solving problems for users. I advocate usability, security and aesthetics.",
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
          name: "testning",
          body: "Platshållartext — kommer att uppdateras.",
        },
        uxDesign: {
          name: "ux-design",
          body: "Platshållartext — kommer att uppdateras.",
        },
        uiDesign: {
          name: "ui-design",
          body: "Platshållartext — kommer att uppdateras.",
        },
      },
    },
    team: {
      label: "Konsulter",
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
