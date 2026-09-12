/* True Friends — Kopparbergs Brewery reference case translations
 *
 * Adds Kopparbergs-only case-study copy onto TF_TRANSLATIONS. Shared
 * refCase section labels ("About", "My role", "Workflow" …) live in
 * js/translations/common.js.
 */
window.TF_ADD_TRANSLATIONS({
  en: {
    refCases: {
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
  },

  sv: {
    refCases: {
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
  },
});
