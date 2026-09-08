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
          body: "In our testing efforts we like to be involved as early as possible, long before any code is written to help identify risks and potential problems. By working proactively instead of reactively we can increase our chances of eliminating late and costly problems. We explore, investigate, experiment, and verify the software/product based on requirements, risks and experience to uncover and deliver as much valuable information as possible.",
        },
        uxDesign: {
          name: "UX Design",
          body: "By applying a design thinking process, we put ourselves in your environment and that of your users to understand the root problem. Together with you and your users, we work iteratively with research, wireframes, prototypes, and interface design to create a solution that solves the problems and are user friendly.",
        },
        uiDesign: {
          name: "UI Design",
          body: "Using visual design principles, we design interfaces for systems, websites, and mobile applications that are not only visually appealing but also functional from both a usability and accessibility perspective. We always base our work on WCAG to ensure inclusive interfaces.",
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
          bio: "I like exploring and investigating software and solving problems for customers. I advocate usability, security and aesthetics.",
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
          consulting: "Konsult",
        },
        ascii: {
          consulting: "      :::    ::::::::::: ::::    ::: :::::::: :::    ::::::   :::::::::::\n     :+:   :+::+:    :+::+:+:   :+::+:    :+::+:    :+::+:       :+:\n    +:+  +:+ +:+    +:+:+:+:+  +:++:+       +:+    +:++:+       +:+\n   +#++:++  +#+    +:++#+ +:+ +#++#++:++#+++#+    +:++#+       +#+\n  +#+  +#+ +#+    +#++#+  +#+#+#       +#++#+    +#++#+       +#+\n #+#   #+##+#    #+##+#   #+#+##+#    #+##+#    #+##+#       #+#\n###    ########### ###    #### ########  ######## #############",
        },
        services: {
          consulting: ["Vi erbjuder konsulttjänster inom testning, ux/ui-design, webbproduktion, mjukvaruutveckling och cybersäkerhet."],
        },
      },
    },
    services: {
      items: {
        testing: {
          name: "Testning",
          body: "I vårt testarbete vill vi vara involverade så tidigt som möjligt, redan innan någon kod skrivs, för att hjälpa till att identifiera risker och potentiella problem. Genom att arbeta proaktivt snarare än reaktivt ökar vi möjligheterna att undvika sena och kostsamma problem. Vi utforskar, undersöker, experimenterar och verifierar mjukvaran eller produkten utifrån krav, risker och erfarenhet, i syfte att ta fram och leverera så mycket värdefull information som möjligt.",
        },
        uxDesign: {
          name: "UX-Design",
          body: "Genom att tillämpa en designtänkande-process sätter vi oss in i både din och dina användares miljö för att förstå det grundläggande problemet. Tillsammans med dig och dina användare arbetar vi iterativt med research, wireframes, prototyper och gränssnittsdesign för att ta fram etty förslag som både löser problemen och är användarvänlig.",
        },
        uiDesign: {
          name: "UI-Design",
          body: "Med principer för visuell design utformar vi gränssnitt för system, webbplatser och mobilappar som inte bara är visuellt tilltalande utan också funktionella ur både användbarhets- och tillgänglighetsperspektiv. Vi utgår alltid från WCAG för att säkerställa inkluderande gränssnitt.",
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
          bio: "Jag tycker om att utforska och undersöka mjukvara samt att lösa problem åt mina kunder. Jag förespråkar användbarhet, säkerhet och estetik.",
          cvHref: "cv/johnny-vigersten-cv-SE.pdf",
        },
      },
    },
  },
});
