/* True Friends — translation strings (EN + SV in one file)
 *
 * To edit copy: change the strings below. Each language object has the
 * same shape. Keys are referenced from index.html via:
 *   data-i18n           → sets textContent
 *   data-i18n-html      → sets innerHTML (use sparingly — only for trusted markup like accent spans)
 *   data-i18n-placeholder → sets placeholder attribute
 *   data-i18n-aria-label  → sets aria-label attribute
 *   data-i18n-content     → sets content attribute (meta tags)
 *   data-i18n-href        → sets href attribute (per-language links/files)
 */
window.TF_TRANSLATIONS = {
  en: {
    meta: {
      title: "True Friends — Creative & Technical Studio",
      titleConsulting: "True Friends — Consulting",
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
    gallery: {
      label: "Gallery",
      viewAll: "View all",
    },
    hero: {
      lede: "A creative and technical studio & consulting firm based in Motala, Sweden, but available worldwide.",
      cta: "Say hi",
      consulting: "Consulting",
      studio: "Studio",
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
      note: "Our media services are available to both businesses and private individuals.<br>We also collaborate with various partners for larger and more complex projects.",
      items: {
        webDev: {
          title: "Web Production",
          body: "We deliver high-end websites and web applications tailored to your needs. We follow international standards in accessibility, usability and security, and make every decision based on the context of your business needs.",
        },
        graphicDesign: {
          title: "Graphic Design",
          body: "Using visual design principles and design thinking processes we create graphical profiles, logotypes, posters, clothing and other digital and printable media.",
        },
        market: {
          title: "Branding/Marketing",
          body: "Brand identity, campaign strategy and content that connects your business to the world across digital and printable medias.",
        },
        photo: {
          title: "Photography",
          body: "Our photography services ranges from portraits, products, landscapes, real estate, food & drinks, weddings, concerts, sports and other events.",
        },
        video: {
          title: "Video & Production",
          body: "A complete video production solution. From analysing your needs to concept, script writing, filming and editing. Whether it’s simpler productions for web and social media to more advanced commercials, we take care of the entire process, from idea to finished video.",
        },
        editing: {
          title: "Editing & Retouch",
          body: "We provide professional post-production for photo and video to ensure everything looks as intended – from colour and lighting adjustments to detailed retouch.",
        },
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
    refCase: {
      label: "Reference case",
      eyebrow: "Reference case",
      about: "About",
      myRole: "My role",
      workflow: "Design & Testing Workflow",
      helpCenter: "Help Center",
    },
    refCases: {
      epiroc: {
        about: {
          lede: "MyEpiroc is a large and versatile platform created for Epiroc, a leading manufacturer in the mining industry.",
          body1: "The platform is available on desktop, iOS, and Android. For Epiroc employees, it streamlines customer and user management, enables technical modules, product promotions, and FAQ maintenance. For customers, it provides real-time oversight of their equipment, enabling services, inspections, fault reporting, machine tracking, and efficient management of drilling and blasting operations.",
          caption1: "MyEpiroc's landing page on desktop.",
        },
        myRole: {
          body1: "While employed as a consultant at B3 Commit I spent two and a half years as a tester and designer on the MyEpiroc project. Initially, I worked as a co-designer alongside three others, but I quickly transitioned into the role of design lead within my team.",
          body2: "As a tester, I collaborated with two other testers, each responsible for the quality mindset and testing outcomes within our respective teams. We also worked cross-team to exchange ideas, align efforts, and address any dependencies that we might have to one another. In the next section, I will outline the workflow and outcomes of my design and testing work for a module of the system called Help Center.",
        },
        helpCenter: {
          body1: "The Help Center was a newly introduced feature designed for both Epiroc employees and customers. It served as a centralised hub where users could access support for MyEpiroc, it’s tools, integration systems, equipment manuals, and more. Of course available in all supported languages.",
        },
        workflow: {
          body1: "We began our research by interviewing reference customers and Epiroc back-office staff to gather insights into their needs, problems and challenges. This approach helped us empathise with them and better understand their requirements & needs.",
          body2: "We collected both quantitative and qualitative data from our research. Using Miro we organised and analysed the data with digital post-it’s, created clusters of metrics, defining user roles, created user story maps and identified functions and pain points.",
          body3: "After analysing the research data and having had brainstorming sessions regarding how we could solve the problems that our customer and users where facing I started creating prototypes. Firstly on paper that I quickly ran by the team, then I’d move on to create them in Figma for more detailed feedback sessions with the team, our reference customers and users. We iterated with prototypes and user testing sessions until we achieved a something that we felt worked.",
          body4: "The design featured two main components: a content-management part for Epiroc users to manage content such as products, questions, media, links, styles, inline translations, and other resources, and a frontend portal where customers could easily search and access the help they needed.",
          body5: "Iteratively throughout the development cycle we broke the design into user story maps and value-sliced it to prioritise the tasks that delivered the most value with the least effort.",
          body6: "As a development team we worked with Extreme Programming in short iterations with frequent feedback loops, design updates, development, testing and customer demos. This approach allowed us to quickly validate whether we were on the right track and make necessary adjustments to the solution if needed.",
          body7: "The workflow of Extreme Programming minimised context switching, kept the everyone in the team aligned on what we where working on, kept everyone involved, reduced personal dependencies, and significantly reduced the number of bugs that reached end users.",
          caption1: "Image from seannhicks.com",
          body8: "Throughout the process, we maintained close communication with users, continuously gathering their feedback and incorporating it into our design prototypes and development iterations. We made frequent, small releases, ensuring users felt their feedback was valued and they remained involved throughout the process. During one particularly productive week, we completed 5 releases in 5 days, each delivering distinct value to different users, with no bugs* reported. We referred to this as our “perfect week.”",
          body9: "*Bugs were rarely reported during development or from production, though the absence of bugs doesn’t mean they don’t exist. However we experienced a huge increase in the overall quality when working with extreme programming instead of our old individual task-based workflow.",
          body10: '<a href="https://www.media.epiroc.com/en/search-results?filters=properties/products/drill-rigs-and-rock-drills&amp;sort=most_relevant" target="_blank" rel="noopener">*All marketing photos belong to Epiroc.</a>',
        },
      },
      kopparbergsBrewery: {
        about: {
          lede: "While I was working at Nethouse, we were approached by Kopparbergs Brewery & Örebro University to do a proof of concept.",
          body1: "They needed a solution to help train their summer employees on setting up the machines in the brewery for different drinks, bottles and can sizes both faster and with less failure rates. We utilised Microsofts HoloLens to demonstrate how augmented reality could be applied to help them solve this problem.",
          caption: "Microsoft HoloLens",
        },
        myRole: {
          body1: "What I owned on the project — responsibilities, deliverables, and how I worked with the wider team.",
        },
        workflow: {
          body1: "How the work was structured — process, tools, cadence, and decisions worth highlighting.",
        },
      },
    },
    contact: {
      label: "Contact",
      title: "Say hi.",
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
      copyright: "© 2026 True Friends. All rights reserved.",
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
      title: "True Friends — Kreativ & Teknisk Studio",
      titleConsulting: "True Friends — Konsult",
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
    gallery: {
      label: "Galleri",
      viewAll: "Visa alla",
    },
    hero: {
      lede: "En kreativ och teknisk studio & konsultfirma baserad i Motala, Sverige, men tillgänglig världen över.",
      cta: "Säg hej",
      consulting: "Konsult",
      studio: "Studio",
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
      note: "Våra mediatjänster är tillgängliga för både företag och privatpersoner.<br>Vid större och mer komplexa projekt samarbetar vi ibland med olika partners.",
      items: {
        webDev: {
          title: "Webbproduktion",
          body: "Vi levererar moderna webbsidor och webbapplikationer skräddarsydda utefter era behov och önskemål. Vi följer alltid internationella standarder för tillgänglighet, användbarhet och säkerhet, och baserar varje beslut på kontexten kring er verksamhet.",
        },
        graphicDesign: {
          title: "Grafisk Design",
          body: "Med visuella design principer och design tänkandets processer skapar vi grafiska profiler, logotyper, affischer, klädestryck och andra digitala och tryckbara medier.",
        },
        market: {
          title: "Marknadskommunikation",
          body: "Med varumärkesidentitet, kampanjstrategier och olika typer av innehåll kopplar vi ihop din verksamhet med omvärlden genom digitala och tryckbara medier.",
        },
        photo: {
          title: "Fotografering",
          body: "Våra fotograferingstjänster täcker allt från porträtt, produkter, landskap, fastigheter, mat & dryck, bröllop, konserter, sport och andra event.",
        },
        video: {
          title: "Video & Produktion",
          body: "Från idé till färdig video - Genom att analysera era behov och koncept till manus, filma och redigera. Oavsett om det är en enklare produktion för webben och sociala medier till mer avancerade reklamfilmer så tar vi hand om hela processen från ide till färdig video.",
        },
        editing: {
          title: "Redigering & Retusch",
          body: "Vi erbjuder professionell bildbehandling och videoredigering för att säkerställa att allt visas och ser ut som det är tänkt - Från färgkorrigering, vitbalans och exponering till detaljerad retusch.",
        },
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
    refCase: {
      label: "Referensuppdrag",
      eyebrow: "Referensuppdrag",
      about: "Om uppdraget",
      myRole: "Min roll",
      workflow: "Arbetsprocess",
      helpCenter: "Hjälpcenter",
    },
    refCases: {
      epiroc: {
        about: {
          // TODO: translate to Swedish — currently mirrors the English placeholder.
          lede: "Short summary of the engagement — who the client is, what we worked on, and the headline outcome.",
          body1: "Body paragraph — context, scope, and any constraints worth calling out.",
          caption1: "MyEpiroc customer dashboard.",
        },
        myRole: {
          body1: "What I owned on the project — responsibilities, deliverables, and how I worked with the wider team.",
        },
        helpCenter: {
          body1: "Placeholder — describe the Help Center module: scope, audience, and what made it distinctive.",
        },
        workflow: {
          body1: "How the work was structured — process, tools, cadence, and decisions worth highlighting.",
          caption1: "Wireframe — early concept.",
          caption2: "Wireframe — refined iteration.",
        },
      },
      kopparbergsBrewery: {
        about: {
          // TODO: translate to Swedish — currently mirrors the English placeholder.
          lede: "Short summary of the engagement — who the client is, what we worked on, and the headline outcome.",
          body1: "Body paragraph — context, scope, and any constraints worth calling out.",
        },
        myRole: {
          body1: "What I owned on the project — responsibilities, deliverables, and how I worked with the wider team.",
        },
        workflow: {
          body1: "How the work was structured — process, tools, cadence, and decisions worth highlighting.",
        },
      },
    },
    contact: {
      label: "Kontakt",
      title: "Säg hej.",
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
      copyright: "© 2026 True Friends. All rights reserved.",
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
