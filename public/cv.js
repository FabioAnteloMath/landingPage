/* CV runtime — handles language switching, URL persistence, and print.
   Mirrors i18n.js logic for the CV page. */
(function () {
    'use strict';

    const SUPPORTED = ['es', 'en', 'pt'];
    const STORAGE_KEY = 'cv_lang';
    const QUERY_PARAM = 'lang';
    const DEFAULT_LANG = 'es';

    function detectInitialLang() {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QUERY_PARAM);
        if (fromQuery && SUPPORTED.includes(fromQuery)) return fromQuery;
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.includes(stored)) return stored;
        return DEFAULT_LANG;
    }

    function applyLang(lang) {
        const dict = (window.CV_TRANSLATIONS || {})[lang];
        if (!dict) return;

        // Update <html lang="...">
        document.documentElement.lang = lang;

        // Update all data-cv elements
        document.querySelectorAll('[data-cv]').forEach(function (el) {
            const key = el.getAttribute('data-cv');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        // Update document title
        const titles = {
            es: 'Matheus Fabio Antelo — Currículum Vitae',
            en: 'Matheus Fabio Antelo — Résumé',
            pt: 'Matheus Fabio Antelo — Currículo'
        };
        document.title = titles[lang] || titles[DEFAULT_LANG];

        // Update pressed state on language buttons
        document.querySelectorAll('.cv-lang-btn').forEach(function (btn) {
            const isActive = btn.getAttribute('data-cv-lang') === lang;
            btn.setAttribute('aria-pressed', String(isActive));
        });

        // Update URL (without scroll) and persist
        try {
            const url = new URL(window.location.href);
            url.searchParams.set(QUERY_PARAM, lang);
            window.history.replaceState({}, '', url.toString());
        } catch (e) {
            /* ignore older browsers */
        }
        localStorage.setItem(STORAGE_KEY, lang);
    }

    function init() {
        const lang = detectInitialLang();
        applyLang(lang);

        document.querySelectorAll('.cv-lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const next = btn.getAttribute('data-cv-lang');
                if (next && SUPPORTED.includes(next)) {
                    applyLang(next);
                }
            });
        });

        const printBtn = document.getElementById('cvPrint');
        if (printBtn) {
            printBtn.addEventListener('click', function () {
                window.print();
            });
        }

        // Expose for debugging / external triggers
        window.CV = {
            setLang: applyLang,
            getLang: function () { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
