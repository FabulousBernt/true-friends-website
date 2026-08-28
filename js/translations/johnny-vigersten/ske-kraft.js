/* True Friends — SKE Kraft reference case translations
 *
 * Adds SKE-Kraft-only case-study copy onto TF_TRANSLATIONS. Shared
 * refCase section labels ("About", "My role", "Workflow" …) live in
 * js/translations/common.js.
 */
window.TF_ADD_TRANSLATIONS({
  en: {
    refCases: {
      skeKraft: {
        about: {
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

  sv: {
    refCases: {
      skeKraft: {
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
