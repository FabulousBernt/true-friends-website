/* True Friends — page behavior
 * Translations, mobile nav, accordion, modal, forms.
 */
(function () {
  "use strict";

  /* ====================================================================
   * i18n
   * ==================================================================== */

  const SUPPORTED = ["en", "sv"];
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "tf_lang";
  const COUNTRY_CACHE_KEY = "tf_country";
  const COUNTRY_API = "https://api.country.is/";
  const COUNTRY_TIMEOUT_MS = 2000;

  const getNested = (obj, path) =>
    path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);

  // Current language, exposed so other modules below can read it
  let currentLang = DEFAULT_LANG;

  /**
   * Look up a translation key in the active language, with English fallback.
   * Supports {placeholder} substitution via the params object.
   */
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

  function applyTranslations(lang) {
    const dict = (window.TF_TRANSLATIONS || {})[lang];
    if (!dict) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n-html"));
      if (typeof v === "string") el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n-placeholder"));
      if (typeof v === "string") el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n-aria-label"));
      if (typeof v === "string") el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const v = getNested(dict, el.getAttribute("data-i18n-content"));
      if (typeof v === "string") el.setAttribute("content", v);
    });

    // Language switcher button state
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }

  /**
   * Detect language synchronously from:
   *   1. user's explicit choice (localStorage)
   *   2. cached country (sessionStorage)
   *   3. browser language
   * Returns one of SUPPORTED.
   */
  function detectLanguageSync() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (e) {}

    try {
      const cachedCountry = sessionStorage.getItem(COUNTRY_CACHE_KEY);
      if (cachedCountry === "SE") return "sv";
      if (cachedCountry) return "en";
    } catch (e) {}

    const browserLang = (navigator.language || "").toLowerCase();
    return browserLang.startsWith("sv") ? "sv" : "en";
  }

  /**
   * After initial render, refine via IP-based country lookup
   * (only if the user hasn't made an explicit choice and we don't have a cache yet).
   */
  async function refineWithGeoIP() {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      if (sessionStorage.getItem(COUNTRY_CACHE_KEY)) return;
    } catch (e) {
      return; // storage blocked, give up gracefully
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), COUNTRY_TIMEOUT_MS);
      const res = await fetch(COUNTRY_API, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) return;
      const data = await res.json();
      const country = (data && data.country) || "";
      sessionStorage.setItem(COUNTRY_CACHE_KEY, country || "XX");
      const next = country === "SE" ? "sv" : "en";
      if (next !== currentLang) applyTranslations(next);
    } catch (e) {
      // Network error / blocked / timeout — keep the sync guess
    }
  }

  // Apply translations immediately so users see correctly localized text on first paint
  applyTranslations(detectLanguageSync());
  refineWithGeoIP();

  // Language switcher (desktop + drawer)
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (!SUPPORTED.includes(lang)) return;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {}
      applyTranslations(lang);
    });
  });

  /* ====================================================================
   * Mobile nav
   * ==================================================================== */
  const nav = document.getElementById("site-nav");
  const toggle = nav && nav.querySelector(".nav__toggle");

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    nav.querySelectorAll(".nav__drawer a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ====================================================================
   * Service accordion: single-open behavior
   * ==================================================================== */
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        serviceItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ====================================================================
   * Modal
   * ==================================================================== */
  document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const id = trigger.getAttribute("data-modal-open");
      const dialog = document.getElementById(id);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      } else if (dialog) {
        dialog.setAttribute("open", "");
      }
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const dialog = trigger.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  /* ====================================================================
   * Forms — sanitization, rate limit, submit
   * ==================================================================== */

  const MAX_LENGTHS = {
    firstName: 50,
    lastName: 50,
    email: 254,
    message: 2000,
  };

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

  document.querySelectorAll("form[data-endpoint]").forEach((form) => {
    const status = form.querySelector(".form__status");
    const submitBtn = form.querySelector('button[type="submit"]');
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

      // Honeypot — silently succeed if a bot filled the hidden field
      if (raw._honey && String(raw._honey).trim() !== "") {
        form.reset();
        setStatus(t("status.success"), "success");
        lastSubmitAt = now;
        return;
      }

      const userKeys = ["firstName", "lastName", "email", "message"];
      const sanitized = sanitizePayload(
        Object.fromEntries(userKeys.map((k) => [k, raw[k] ?? ""]))
      );
      const payload = { ...raw, ...sanitized };
      delete payload._honey;

      submitBtn.disabled = true;
      setStatus(t("status.sending"));
      lastSubmitAt = now;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
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
