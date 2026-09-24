/* ============================================================================
 * True Friends — the time portal
 *
 * Three jobs: put the current year on the right-hand button, remember which
 * era the visitor picked last time, and keep the language switch in step with
 * the two sites behind it.
 * ========================================================================= */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ---------- The year ----------
   * The button says whatever year it is. The markup carries a plausible
   * value so the page reads correctly before this runs and with JS off, but
   * from here on it is the clock that decides — no edit needed next New
   * Year's Eve. */
  const YEAR = new Date().getFullYear();
  $$("[data-year]").forEach((el) => { el.textContent = String(YEAR); });

  /* ---------- Language ----------
   * The same key both sites read, so a choice made here survives the jump. */
  const SUPPORTED = ["en", "sv"];
  const LANG_KEY = "tf_lang";

  const COPY = {
    en: {
      docTitle: "True Friends — Choose your time",
      title: "Choose your time",
      sub: "The same studio, two eras of the web. Pick a door — everything behind both is the same work.",
      captionPast: "Windows 95 · Netscape · 33.6 kbps",
      captionNow: "Dark mode · Monospace · Fibre",
      last: "Where you were last",
      foot: "True Friends · Motala, Sweden",
      altPast: "Open the 1996 version of the site",
      altNow: "Open the {year} version of the site",
    },
    sv: {
      docTitle: "True Friends — Välj din tid",
      title: "Välj din tid",
      sub: "Samma studio, två epoker av webben. Välj en dörr — bakom båda finns samma arbete.",
      captionPast: "Windows 95 · Netscape · 33,6 kbit/s",
      captionNow: "Mörkt läge · Monospace · Fiber",
      last: "Där du var senast",
      foot: "True Friends · Motala, Sverige",
      altPast: "Öppna 1996 års version av webbplatsen",
      altNow: "Öppna {year} års version av webbplatsen",
    },
  };

  let currentLang = "en";

  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = "en";
    currentLang = lang;
    const copy = COPY[lang];
    document.documentElement.lang = lang;
    document.title = copy.docTitle;

    $("[data-t='title']").textContent = copy.title;
    $("[data-t='sub']").textContent = copy.sub;
    $("[data-t='captionPast']").textContent = copy.captionPast;
    $("[data-t='captionNow']").textContent = copy.captionNow;
    $("[data-t='foot']").textContent = copy.foot;
    $$("[data-t='last']").forEach((el) => { el.textContent = copy.last; });

    $(".era--past").setAttribute("aria-label", copy.altPast);
    $(".era--now").setAttribute("aria-label", copy.altNow.replace("{year}", YEAR));

    $$("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }

  function readLanguage() {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (e) {} // storage blocked — English, like everywhere else
    return "en";
  }

  applyLanguage(readLanguage());

  $$("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch (e) {}
      applyLanguage(lang);
    });
  });

  /* ---------- Remembering the last era ----------
   * Marked, not acted on. The portal always shows both doors: a visitor who
   * wants the other era should not have to undo a redirect to reach it. The
   * tag just says where they were, so the familiar door is easy to find. */
  const ERA_KEY = "tf_era";

  let lastEra = null;
  try {
    lastEra = localStorage.getItem(ERA_KEY);
  } catch (e) {}

  if (lastEra === "past" || lastEra === "now") {
    const tag = $(`.era--${lastEra} .era__last`);
    if (tag) tag.setAttribute("data-on", "true");
  }

  $$(".era").forEach((era) => {
    era.addEventListener("click", () => {
      try {
        localStorage.setItem(ERA_KEY, era.dataset.era);
      } catch (e) {}
    });
  });
})();
