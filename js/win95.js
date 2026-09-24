/* ============================================================================
 * True Friends 96 — page behaviour
 *
 * One file, because the whole site is one window. Sections below, in order:
 *   i18n            translation swap, EN/SV, no locale guessing
 *   chrome          menu bar, Start menu, title-bar buttons, taskbar
 *   tree            the Explorer-style contents rail
 *   services        the [+] accordion
 *   gallery         thumbnails + the Image Viewer dialog
 *   prompt          the live chat line and its canned replies
 *   status          clock, message counter, Options checkboxes
 *   dialogs         About / Save / Exit / Read Me / Shortcuts
 *   forms           sanitising, rate limiting, submit
 * ========================================================================= */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ====================================================================
   * i18n
   * ==================================================================== */

  const SUPPORTED = ["en", "sv"];
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "tf_lang";

  const getNested = (obj, path) =>
    path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);

  // Substituted into any string containing `{year}` — the footer copyright
  // rolls over on its own that way.
  const CURRENT_YEAR = new Date().getFullYear();
  const substitute = (s) => s.replace("{year}", CURRENT_YEAR);

  let currentLang = DEFAULT_LANG;

  /** Look up a key in the active language, falling back to English. */
  function t(key, params) {
    const dicts = window.TF_TRANSLATIONS || {};
    let value = getNested(dicts[currentLang], key);
    if (value === undefined) value = getNested(dicts[DEFAULT_LANG], key);
    if (typeof value !== "string") return key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{${k}}`, String(v));
      }
    }
    return value;
  }

  const ATTR_MAP = {
    "data-i18n-placeholder": "placeholder",
    "data-i18n-aria-label": "aria-label",
    "data-i18n-content": "content",
    "data-i18n-href": "href",
    "data-i18n-alt": "alt",
    "data-i18n-title": "title",
    "data-i18n-value": "value",
  };

  function applyTranslations(lang) {
    const dict = (window.TF_TRANSLATIONS || {})[lang];
    if (!dict) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = substitute(v);
    });
    $$("[data-i18n-html]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n-html"));
      if (typeof v === "string") el.innerHTML = substitute(v);
    });
    for (const [dataAttr, target] of Object.entries(ATTR_MAP)) {
      $$(`[${dataAttr}]`).forEach((el) => {
        const v = getNested(dict, el.getAttribute(dataAttr));
        if (typeof v === "string" && el.getAttribute(target) !== v) {
          el.setAttribute(target, v);
        }
      });
    }

    // Language switchers: the View menu's check items and the Options radios.
    $$("[data-lang]").forEach((el) => {
      const on = el.getAttribute("data-lang") === lang;
      if (el.type === "radio") el.checked = on;
      else el.setAttribute("aria-pressed", String(on));
    });

    // Anything already rendered by JS has to be re-rendered in the new
    // language: the gallery count line and any replies the visitor triggered.
    if (typeof window.TF_RELABEL === "function") window.TF_RELABEL();
  }

  /**
   * English is the default for everyone. The only thing that changes it is
   * the visitor picking Svenska, which is stored in localStorage and so
   * carries across pages and return visits until they pick English again.
   *
   * There is deliberately no locale guessing — no IP lookup, no
   * navigator.language. A Swedish speaker abroad and an English speaker in
   * Sweden both got the wrong page under that scheme.
   */
  function detectLanguageSync() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (e) {} // storage blocked — fall through to the default
    return DEFAULT_LANG;
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyTranslations(lang);
  }

  applyTranslations(detectLanguageSync());

  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-lang]");
    if (el && el.type !== "radio") setLanguage(el.getAttribute("data-lang"));
  });
  $$('input[data-lang]').forEach((radio) => {
    radio.addEventListener("change", () => setLanguage(radio.getAttribute("data-lang")));
  });

  // A page restored from the back/forward cache keeps its frozen DOM — none
  // of the code above re-runs, so a language picked on another page in the
  // meantime would never reach this one. Re-read and re-apply if it moved.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    const lang = detectLanguageSync();
    if (lang !== currentLang) applyTranslations(lang);
  });

  /* ====================================================================
   * Menu bar + Start menu
   *
   * One open menu at a time, anywhere on the page. Opening any menu closes
   * every other, clicking away closes all, Escape closes and returns focus.
   * ==================================================================== */

  const menuTriggers = $$("[data-menu]");

  function closeAllMenus(except) {
    menuTriggers.forEach((trigger) => {
      if (trigger === except) return;
      const menu = document.getElementById(trigger.getAttribute("data-menu"));
      if (menu) menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  menuTriggers.forEach((trigger) => {
    const menu = document.getElementById(trigger.getAttribute("data-menu"));
    if (!menu) return;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = trigger.getAttribute("aria-expanded") === "true";
      closeAllMenus(trigger);
      menu.hidden = open;
      trigger.setAttribute("aria-expanded", String(!open));
      if (!open) {
        const first = menu.querySelector(".menu__item:not([aria-disabled='true'])");
        if (first) first.focus();
      }
    });

    // Once a menu is open, sliding along the bar switches menus without a
    // second click — exactly how a menu bar has always behaved.
    trigger.addEventListener("mouseenter", () => {
      const anyOpen = menuTriggers.some(
        (m) => m.getAttribute("aria-expanded") === "true",
      );
      if (!anyOpen || trigger.getAttribute("aria-expanded") === "true") return;
      closeAllMenus(trigger);
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest(".menu__item")) closeAllMenus();
    });
  });

  document.addEventListener("click", () => closeAllMenus());
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const open = menuTriggers.find((m) => m.getAttribute("aria-expanded") === "true");
    if (open) {
      closeAllMenus();
      open.focus();
    }
  });

  /* ====================================================================
   * Window chrome: minimize, maximize, close, taskbar
   * ==================================================================== */

  const body = document.body;

  const setMinimized = (on) => {
    body.classList.toggle("is-minimized", on);
    const btn = $("[data-window='min']");
    if (btn) btn.setAttribute("aria-pressed", String(on));
  };

  $$("[data-window]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-window");
      if (action === "min") {
        setMinimized(!body.classList.contains("is-minimized"));
      } else if (action === "max") {
        const on = !body.classList.contains("is-maximized");
        body.classList.toggle("is-maximized", on);
        btn.setAttribute("aria-pressed", String(on));
      } else if (action === "close") {
        openDialog("dlg-exit");
      }
    });
  });

  // The taskbar button for the current page restores a minimized window,
  // which is the only way back once it is rolled up.
  const ownTask = $(".taskbar__task[aria-current='page']");
  if (ownTask) {
    ownTask.addEventListener("click", (event) => {
      if (!body.classList.contains("is-minimized")) return;
      event.preventDefault();
      setMinimized(false);
    });
  }

  /* ====================================================================
   * Contents tree + location combo
   * ==================================================================== */

  $$("[data-twisty]").forEach((btn) => {
    const target = document.getElementById(btn.getAttribute("data-twisty"));
    if (!target) return;
    btn.addEventListener("click", () => {
      const open = !target.hidden;
      target.hidden = open;
      btn.textContent = open ? "+" : "−";
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  const locationCombo = $("#location-combo");
  if (locationCombo) {
    locationCombo.addEventListener("change", () => {
      const url = locationCombo.value;
      if (url && url !== "#") window.location.href = url;
    });
  }

  // Tree links that point at a turn in this page highlight the one currently
  // on screen, so the rail doubles as a position indicator.
  const treeLinks = $$(".tree__link[href^='#']");
  const targets = treeLinks
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  if (targets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          treeLinks.forEach((link) => {
            link.setAttribute(
              "aria-current",
              String(link.getAttribute("href") === `#${entry.target.id}`),
            );
          });
        });
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
  }

  /* ====================================================================
   * Service accordion — one open at a time
   * ==================================================================== */

  const services = $$(".svc");
  services.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      services.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ====================================================================
   * Gallery + Image Viewer
   *
   * To add a photo: drop the file into img/gallery/, run
   * `bash tools/build-gallery.sh`, and add its filename below. Each entry
   * renders one square tile from the 400px thumbnail; the full-size file is
   * only fetched once the viewer opens.
   * ==================================================================== */

  const GALLERY_IMAGES = [
    "01.webp", "02.webp", "03.webp", "04.webp", "05.webp", "06.webp",
    "07.webp", "08.webp", "09.webp", "10.webp", "11.webp", "12.webp",
    "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp",
    "19.webp", "20.webp", "21.webp", "22.webp", "23.webp", "24.webp",
    "25.webp", "26.webp", "27.webp", "28.webp", "29.webp", "30.webp",
    "31.webp", "32.webp", "33.webp", "34.webp", "35.webp", "36.webp",
    "37.webp", "38.webp", "39.webp", "40.webp", "41.webp", "42.webp",
  ];

  const thumbGrid = $("#gallery-grid");
  const viewer = $("#dlg-viewer");

  if (thumbGrid && viewer) {
    const photos = GALLERY_IMAGES.map((file, i) => ({
      full: `img/gallery/${file}`,
      thumb: `img/gallery/thumbs/${file}`,
      alt: `Gallery photo ${i + 1}`,
    }));

    // A missing file would otherwise show a broken-image glyph; hiding the
    // <img> lets the tile's grey background stand in cleanly.
    const hideIfBroken = (img) =>
      img.addEventListener("error", () => { img.style.display = "none"; }, { once: true });

    const strip = $("[data-viewer-strip]", viewer);
    const frag = document.createDocumentFragment();
    const stripFrag = document.createDocumentFragment();

    photos.forEach((photo, i) => {
      const li = document.createElement("li");
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "thumbs__tile";
      tile.dataset.index = String(i);
      tile.setAttribute("aria-label", photo.alt);
      const img = document.createElement("img");
      hideIfBroken(img);
      img.src = photo.thumb;
      img.alt = "";
      img.loading = "lazy";
      tile.appendChild(img);
      li.appendChild(tile);
      frag.appendChild(li);

      const sBtn = document.createElement("button");
      sBtn.type = "button";
      sBtn.dataset.index = String(i);
      sBtn.setAttribute("aria-label", photo.alt);
      const sImg = document.createElement("img");
      hideIfBroken(sImg);
      sImg.src = photo.thumb;
      sImg.alt = "";
      sImg.loading = "lazy";
      sBtn.appendChild(sImg);
      stripFrag.appendChild(sBtn);
    });

    thumbGrid.appendChild(frag);
    strip.appendChild(stripFrag);

    const vImg = $(".viewer__img", viewer);
    const vCount = $("[data-viewer-count]", viewer);
    let activeIndex = 0;

    const show = (index) => {
      activeIndex = (index + photos.length) % photos.length;
      const photo = photos[activeIndex];
      vImg.src = photo.full;
      vImg.alt = photo.alt;
      vCount.textContent = `${activeIndex + 1} / ${photos.length}`;
      $$("button", strip).forEach((btn, i) => {
        const on = i === activeIndex;
        btn.setAttribute("aria-current", String(on));
        if (on) btn.scrollIntoView({ inline: "center", block: "nearest" });
      });
    };

    vImg.addEventListener("error", () => { vImg.style.visibility = "hidden"; });
    vImg.addEventListener("load", () => { vImg.style.visibility = ""; });

    thumbGrid.addEventListener("click", (event) => {
      const tile = event.target.closest(".thumbs__tile");
      if (!tile) return;
      show(parseInt(tile.dataset.index, 10) || 0);
      openDialog("dlg-viewer");
    });

    strip.addEventListener("click", (event) => {
      const btn = event.target.closest("button");
      if (btn) show(parseInt(btn.dataset.index, 10) || 0);
    });

    $("[data-viewer-prev]", viewer).addEventListener("click", () => show(activeIndex - 1));
    $("[data-viewer-next]", viewer).addEventListener("click", () => show(activeIndex + 1));

    document.addEventListener("keydown", (event) => {
      if (!viewer.open) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); show(activeIndex - 1); }
      else if (event.key === "ArrowRight") { event.preventDefault(); show(activeIndex + 1); }
    });

    const countLine = $("[data-gallery-count]");
    if (countLine) countLine.textContent = t("gallery.count", { n: photos.length });
  }

  /* ====================================================================
   * The prompt line
   *
   * Everything here runs offline against a keyword table. It is a toy, and
   * it says so: anything it cannot match answers with the email address
   * rather than inventing something. The replies live in the translation
   * files so Swedish visitors get Swedish ones.
   * ==================================================================== */

  // Ordered — the first table whose words appear in the message wins, so the
  // specific topics sit above the general ones.
  const INTENTS = [
    ["price", ["price", "cost", "rate", "budget", "how much", "quote", "charge", "charges", "pris", "kostar", "kostnad", "offert", "timpris"]],
    ["services", ["service", "offer", "do you do", "what can you", "testing", "design", "ux", "ui", "web", "photo", "video", "tjänst", "erbjuder", "testning", "webb", "foto", "film"]],
    ["gallery", ["gallery", "portfolio", "photos", "pictures", "work", "galleri", "bilder", "portfölj", "jobb"]],
    ["contact", ["contact", "email", "mail", "phone", "call", "reach", "address", "where are you", "kontakt", "mejl", "telefon", "ring", "adress", "var finns"]],
    ["hire", ["hire", "available", "assignment", "project", "freelance", "consultant", "anlita", "uppdrag", "projekt", "konsult", "ledig"]],
    ["who", ["who are you", "about", "what is true friends", "company", "vilka är", "om er", "vad är true friends", "företag"]],
    ["joke", ["joke", "funny", "skämt", "rolig"]],
    ["thanks", ["thank", "thanks", "cheers", "tack"]],
    ["hello", ["hello", "hi ", "hey", "yo", "hej", "tjena", "hallå", "god dag"]],
  ];

  const resolveIntent = (text) => {
    const needle = ` ${text.toLowerCase()} `;
    for (const [intent, words] of INTENTS) {
      if (words.some((w) => needle.includes(w))) return intent;
    }
    return "fallback";
  };

  const transcript = $("#transcript");
  const promptForm = $("#prompt-form");
  const promptInput = $("#prompt-input");

  // The TrueFriends avatar is the brand logo, not a sprite symbol, so its
  // path is read off a turn already in the page rather than hard-coded —
  // that keeps it correct at any directory depth.
  const TF_AVATAR = (() => {
    const existing = $(".msg--tf img.msg__avatar");
    return existing ? existing.getAttribute("src") : "img/tf-pc-logo-yellow-transparent.svg";
  })();

  /** Build one speaker turn. `who` is "you" or "tf". */
  function buildMessage(who, text) {
    const row = document.createElement("article");
    row.className = `msg msg--${who} msg--new`;

    let icon;
    if (who === "tf") {
      icon = document.createElement("img");
      icon.className = "msg__avatar";
      icon.src = TF_AVATAR;
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
    } else {
      icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "i msg__avatar");
      icon.setAttribute("viewBox", "0 0 32 32");
      icon.setAttribute("aria-hidden", "true");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#i-you");
      icon.appendChild(use);
    }

    const name = document.createElement("h2");
    name.className = "msg__who";
    name.dataset.i18n = who === "you" ? "ui.who.you" : "ui.who.tf";
    name.textContent = t(who === "you" ? "ui.who.you" : "ui.who.tf");

    const bodyEl = document.createElement("div");
    bodyEl.className = "msg__body";
    const p = document.createElement("p");
    p.textContent = text;
    bodyEl.appendChild(p);

    row.append(icon, name, bodyEl);
    return row;
  }

  if (promptForm && promptInput && transcript) {
    // Replies the visitor triggered have to survive a language switch, so
    // each one remembers the intent key that produced it.
    const replay = [];

    promptForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = promptInput.value.trim().slice(0, 300);
      if (!text) return;

      const intent = resolveIntent(text);
      const yours = buildMessage("you", text);
      const ours = buildMessage("tf", t(`chat.${intent}`));
      ours.dataset.intent = intent;
      yours.dataset.mine = "true";
      ours.dataset.mine = "true";
      replay.push(ours);

      transcript.append(yours, ours);
      promptInput.value = "";
      updateMessageCount();

      if (optionOn("autoscroll")) {
        ours.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      promptInput.focus();
    });

    // Re-render the canned replies when the language changes.
    window.TF_RELABEL = () => {
      replay.forEach((row) => {
        const p = $(".msg__body p", row);
        if (p) p.textContent = t(`chat.${row.dataset.intent}`);
      });
      const countLine = $("[data-gallery-count]");
      if (countLine) countLine.textContent = t("gallery.count", { n: GALLERY_IMAGES.length });
    };

    // "/" is the universal jump-to-the-prompt key, as long as the visitor is
    // not already typing somewhere.
    document.addEventListener("keydown", (event) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey) return;
      const tag = (document.activeElement.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      event.preventDefault();
      promptInput.focus();
    });
  }

  $$("[data-focus-prompt]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (!promptInput) return;
      promptInput.scrollIntoView({ behavior: "smooth", block: "center" });
      promptInput.focus();
    });
  });

  const clearBtn = $("[data-clear-mine]");
  if (clearBtn && transcript) {
    clearBtn.addEventListener("click", () => {
      $$("[data-mine='true']", transcript).forEach((row) => row.remove());
      updateMessageCount();
    });
  }

  /* ====================================================================
   * Status panels: message counter, clock, Options
   * ==================================================================== */

  const countCell = $("[data-message-count]");
  function updateMessageCount() {
    if (countCell) countCell.textContent = String($$(".msg", transcript || document).length);
  }
  updateMessageCount();

  // Real time, 1996 formatting: 12-hour clock in the status bar, 24-hour in
  // the tray, both with a fixed date because the window is dated 1996 and
  // pretending otherwise spoils it.
  const clockTime = $("[data-clock-time]");
  const clockDate = $("[data-clock-date]");
  const trayClock = $("[data-tray-clock]");

  function tick() {
    const now = new Date();
    const h24 = now.getHours();
    const h12 = h24 % 12 || 12;
    const mm = String(now.getMinutes()).padStart(2, "0");
    if (clockTime) clockTime.textContent = `${h12}:${mm} ${h24 < 12 ? "AM" : "PM"}`;
    if (trayClock) trayClock.textContent = `${h12}:${mm} ${h24 < 12 ? "AM" : "PM"}`;
    if (clockDate) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      clockDate.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
  }
  tick();
  setInterval(tick, 15000);

  /* Options — all three do something real rather than decorating the panel. */
  const OPTION_KEY = "tf_options";
  const optionInputs = $$("[data-option]");

  const readOptions = () => {
    try {
      return JSON.parse(localStorage.getItem(OPTION_KEY) || "{}");
    } catch (e) {
      return {};
    }
  };
  let options = readOptions();

  function optionOn(name) {
    const input = optionInputs.find((i) => i.getAttribute("data-option") === name);
    return input ? input.checked : true;
  }

  function applyOptions() {
    optionInputs.forEach((input) => {
      const name = input.getAttribute("data-option");
      if (name in options) input.checked = !!options[name];
      if (name === "plaintext") body.classList.toggle("is-plaintext", input.checked);
      if (name === "showsystem") body.classList.toggle("hide-system", !input.checked);
    });
  }
  applyOptions();

  optionInputs.forEach((input) => {
    input.addEventListener("change", () => {
      options[input.getAttribute("data-option")] = input.checked;
      try {
        localStorage.setItem(OPTION_KEY, JSON.stringify(options));
      } catch (e) {}
      applyOptions();
    });
  });

  /* ====================================================================
   * Dialogs
   * ==================================================================== */

  function openDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    closeAllMenus();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  $$("[data-open-dialog]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openDialog(trigger.getAttribute("data-open-dialog"));
    });
  });

  $$("[data-close-dialog]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const dialog = trigger.closest("dialog");
      if (!dialog) return;
      dialog.close();
      const status = $(".form__status", dialog);
      if (status) {
        status.textContent = "";
        status.removeAttribute("data-state");
      }
    });
  });

  // Clicking the shaded area outside a dialog closes it, the way clicking
  // away from a modal has worked since long after 1996.
  $$("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  $$("[data-print]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      window.print();
    });
  });

  $$("[data-select-transcript]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (!transcript) return;
      const range = document.createRange();
      range.selectNodeContents(transcript);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });
  });

  $$("[data-scroll-top]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ====================================================================
   * Boot splash — the dial-up handshake, once per browser session
   * ==================================================================== */

  const boot = $("#boot");
  if (boot) {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tf_booted") === "1";
    } catch (e) {}

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      boot.hidden = true;
    } else {
      const dismiss = () => {
        boot.hidden = true;
        try {
          sessionStorage.setItem("tf_booted", "1");
        } catch (e) {}
      };
      boot.hidden = false;
      const timer = setTimeout(dismiss, 1900);
      boot.addEventListener("click", () => {
        clearTimeout(timer);
        dismiss();
      });
      document.addEventListener("keydown", function skip(event) {
        if (event.key !== "Escape" && event.key !== "Enter" && event.key !== " ") return;
        clearTimeout(timer);
        dismiss();
        document.removeEventListener("keydown", skip);
      });
    }
  }

  /* ====================================================================
   * Forms — sanitisation, rate limit, submit
   * ==================================================================== */

  const MAX_LENGTHS = { firstName: 50, lastName: 50, email: 254, message: 2000 };

  const sanitizeSingleLine = (value) =>
    String(value)
      .replace(/[\r\n\t\0\x00-\x1F\x7F]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const sanitizeMultiline = (value) =>
    String(value)
      .replace(/\r\n/g, "\n")
      .replace(/[\0\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .trim();

  const sanitizePayload = (raw) => {
    const out = {};
    for (const [key, val] of Object.entries(raw)) {
      const capped = String(val).slice(0, MAX_LENGTHS[key] || 5000);
      out[key] = key === "message" ? sanitizeMultiline(capped) : sanitizeSingleLine(capped);
    }
    return out;
  };

  const RATE_LIMIT_MS = 10_000;

  $$("form[data-endpoint]").forEach((form) => {
    const status = $(".form__status", form);
    const submitBtn = $('button[type="submit"]', form);
    let lastSubmitAt = 0;

    const setStatus = (text, state) => {
      if (!status) return;
      status.textContent = text;
      if (state) status.setAttribute("data-state", state);
      else status.removeAttribute("data-state");
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const now = Date.now();
      if (now - lastSubmitAt < RATE_LIMIT_MS) {
        const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitAt)) / 1000);
        setStatus(t("status.rateLimited", { wait }), "error");
        return;
      }

      if (!form.reportValidity()) return;

      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        setStatus(t("status.notConfigured"), "error");
        return;
      }

      const raw = Object.fromEntries(new FormData(form).entries());

      // Honeypot — silently succeed if a bot filled the hidden field.
      if (raw._honey && String(raw._honey).trim() !== "") {
        form.reset();
        setStatus(t("status.success"), "success");
        lastSubmitAt = now;
        return;
      }

      const userKeys = ["firstName", "lastName", "email", "message"];
      const sanitized = sanitizePayload(
        Object.fromEntries(userKeys.map((k) => [k, raw[k] ?? ""])),
      );
      const payload = { ...raw, ...sanitized };
      delete payload._honey;

      submitBtn.disabled = true;
      setStatus(t("status.sending"));
      lastSubmitAt = now;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success !== "false") {
          form.reset();
          setStatus(t("status.success"), "success");
        } else {
          setStatus(data.message || t("status.error"), "error");
        }
      } catch (err) {
        setStatus(t("status.network"), "error");
      } finally {
        submitBtn.disabled = false;
      }
    });
  });
})();
