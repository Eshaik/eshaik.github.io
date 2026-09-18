import { content, type Lang } from "../data/content";

function getPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
      obj
    );
}

function applyLang(lang: Lang) {
  const dict = content[lang];

  document.documentElement.lang = lang;
  document.title = dict.meta.title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", dict.meta.description);

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const path = el.getAttribute("data-i18n");
    if (!path) return;
    const value = getPath(dict, path);
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll<HTMLButtonElement>("[data-lang-switch]").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang-switch") === lang;
    btn.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("lang", lang);
  } catch {
    // ignore storage errors (private browsing, etc.)
  }
}

function initLang() {
  let lang: Lang = "en";
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "es") lang = stored;
  } catch {
    // ignore storage errors
  }
  applyLang(lang);

  document.querySelectorAll<HTMLButtonElement>("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-lang-switch");
      if (next === "en" || next === "es") applyLang(next);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLang);
} else {
  initLang();
}
