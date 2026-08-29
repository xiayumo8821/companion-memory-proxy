export const FOLIO_THEME_CSS = String.raw`
  /* Aelios × OmbreBrain Folio v5 visual layer.
     This stylesheet changes presentation only; the existing Alpine structure and actions stay intact. */
  :root,
  :root[data-theme="light"] {
    color-scheme: light;
    --folio-bg: #f4f3f7;
    --folio-bg-2: #ecebf1;
    --folio-paper: #ffffff;
    --folio-paper-2: #f8f7fb;
    --folio-ink: #1a1922;
    --folio-ink-2: #34323e;
    --folio-ink-3: #6d6a7c;
    --folio-ink-4: #a6a3b3;
    --folio-line: rgba(26, 25, 34, .08);
    --folio-line-2: rgba(26, 25, 34, .16);
    --folio-accent: #6e4f9a;
    --folio-accent-2: #8265b3;
    --folio-accent-soft: rgba(110, 79, 154, .1);
    --folio-rose: #d291b3;
    --folio-rose-deep: #b06998;
    --folio-rose-soft: rgba(210, 145, 179, .11);
    --folio-green: #5a8b6e;
    --folio-green-soft: rgba(90, 139, 110, .1);
    --folio-amber: #b89855;
    --folio-amber-soft: rgba(184, 152, 85, .11);
    --folio-red: #b85555;
    --folio-red-soft: rgba(184, 85, 85, .1);
    --folio-serif: "Cormorant Garamond", "Noto Serif SC", Georgia, serif;
    --folio-sans: "Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --folio-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

    /* Feed the original component aliases from the same v5 token set. */
    --bg-deep: var(--folio-bg);
    --bg-deep-95: rgba(244, 243, 247, .94);
    --bg-deep-70: rgba(244, 243, 247, .76);
    --panel-bg: var(--folio-paper);
    --panel-bg-strong: var(--folio-paper);
    --panel-border: var(--folio-line);
    --panel-glow: 0 3px 14px -13px rgba(26, 25, 34, .5);
    --hover-bg: var(--folio-bg-2);
    --text-1: var(--folio-ink);
    --text-2: var(--folio-ink-2);
    --text-3: var(--folio-ink-3);
    --text-4: var(--folio-ink-4);
    --on-accent: #ffffff;
    --coral: var(--folio-accent);
    --violet: var(--folio-accent);
    --cyan: var(--folio-rose);
    --ok: var(--folio-green);
    --err: var(--folio-red);
    --warn: var(--folio-amber);
    --aurora: linear-gradient(90deg, var(--folio-accent), var(--folio-rose));
    --nebula-1: rgba(210, 145, 179, .12);
    --nebula-2: rgba(110, 79, 154, .1);
    --scrollbar-thumb: #cbc7d3;
    --scrollbar-track: var(--folio-bg);
  }

  :root[data-theme="dark"] {
    color-scheme: dark;
    --folio-bg: #14131c;
    --folio-bg-2: #1a1822;
    --folio-paper: #1d1c27;
    --folio-paper-2: #24222e;
    --folio-ink: #ece9f2;
    --folio-ink-2: #d2cedc;
    --folio-ink-3: #a9a4b7;
    --folio-ink-4: #777184;
    --folio-line: rgba(236, 233, 242, .08);
    --folio-line-2: rgba(236, 233, 242, .16);
    --folio-accent: #a78bd0;
    --folio-accent-2: #bea6de;
    --folio-accent-soft: rgba(167, 139, 208, .13);
    --folio-rose: #e0a3c4;
    --folio-rose-deep: #e0a3c4;
    --folio-rose-soft: rgba(224, 163, 196, .12);
    --bg-deep-95: rgba(20, 19, 28, .94);
    --bg-deep-70: rgba(20, 19, 28, .76);
    --panel-glow: 0 3px 16px -13px rgba(0, 0, 0, .85);
    --on-accent: #ffffff;
    --scrollbar-thumb: #403c4b;
  }

  html,
  body {
    background: var(--folio-bg) !important;
    color: var(--folio-ink) !important;
  }

  body {
    font: 14px/1.55 var(--folio-sans) !important;
    -webkit-font-smoothing: antialiased;
  }

  button,
  input,
  select,
  textarea {
    font-family: var(--folio-sans) !important;
    font-weight: 400;
  }

  :focus-visible {
    outline-color: var(--folio-accent) !important;
  }

  .starfield {
    background:
      radial-gradient(900px 580px at 88% -5%, rgba(210, 145, 179, .12), transparent 60%),
      radial-gradient(850px 620px at -10% 105%, rgba(110, 79, 154, .1), transparent 62%),
      var(--folio-bg) !important;
  }

  :root[data-theme="dark"] .starfield {
    background:
      radial-gradient(900px 580px at 88% -5%, rgba(224, 163, 196, .08), transparent 60%),
      radial-gradient(850px 620px at -10% 105%, rgba(167, 139, 208, .09), transparent 62%),
      var(--folio-bg) !important;
  }

  .star-nebula,
  .star-layer {
    display: none !important;
  }

  .aelios-shell-frame {
    max-width: none !important;
    padding: 0 !important;
  }

  .aelios-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 256px !important;
    gap: 12px !important;
    padding: 22px 16px !important;
    border-color: var(--folio-line) !important;
    background: color-mix(in srgb, var(--folio-bg) 86%, transparent) !important;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .aelios-sidebar > div:first-child {
    padding: 5px 10px 17px !important;
  }

  .aelios-logo {
    width: 42px !important;
    height: 42px !important;
    border-radius: 12px !important;
    background: linear-gradient(145deg, var(--folio-accent), var(--folio-rose)) !important;
    color: #fff !important;
    font: 400 20px/1 "Pacifico", var(--folio-serif) !important;
    box-shadow: 0 10px 26px -15px var(--folio-accent) !important;
  }

  .aelios-sidebar > div:first-child > div:last-child > div:first-child {
    font: 500 22px/1.05 var(--folio-serif) !important;
  }

  .aelios-sidebar > div:first-child > div:last-child > div:last-child {
    margin-top: 4px;
    color: var(--folio-ink-4) !important;
    font: 9px/1.3 var(--folio-mono) !important;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  .aelios-sidebar nav {
    gap: 3px !important;
  }

  .aelios-sidebar nav button {
    min-height: 40px !important;
    border-radius: 10px !important;
    padding: 8px 12px !important;
    color: var(--folio-ink-3) !important;
    font-size: 13px !important;
  }

  .aelios-sidebar nav button.bg-zinc-900 {
    color: var(--folio-accent) !important;
    box-shadow: 0 8px 22px -18px rgba(26, 25, 34, .8) !important;
  }

  .aelios-sidebar > button {
    border-radius: 999px !important;
  }

  .aelios-content {
    padding: 30px 34px 100px !important;
  }

  .aelios-content > section {
    max-width: 1180px;
    margin-right: auto;
    margin-left: auto;
  }

  h1 {
    margin: 0 0 7px !important;
    color: var(--folio-ink) !important;
    font: 500 italic 40px/1.08 var(--folio-serif) !important;
    letter-spacing: .005em !important;
  }

  h2 {
    color: var(--folio-ink) !important;
    font: 500 italic 21px/1.25 var(--folio-serif) !important;
  }

  h3,
  article .font-semibold:not(button):not(span) {
    font-family: var(--folio-serif);
    font-weight: 500 !important;
  }

  .text-zinc-100 { color: var(--folio-ink) !important; }
  .text-zinc-200,
  .text-zinc-300 { color: var(--folio-ink-2) !important; }
  .text-zinc-400 { color: var(--folio-ink-3) !important; }
  .text-zinc-500 { color: var(--folio-ink-4) !important; }
  .text-coral { color: var(--folio-accent) !important; }

  .border-zinc-800,
  .border-zinc-700 {
    border-width: .5px !important;
    border-color: var(--folio-line) !important;
  }

  .bg-zinc-900,
  .bg-zinc-900\/90,
  .bg-zinc-900\/95 {
    background: var(--folio-paper) !important;
    box-shadow: 0 3px 14px -13px rgba(26, 25, 34, .5) !important;
    backdrop-filter: none !important;
  }

  .bg-zinc-900\/60,
  .bg-\[\#0a0a0b\] {
    background: var(--folio-paper-2) !important;
  }

  body.bg-\[\#0a0a0b\] {
    background: var(--folio-bg) !important;
  }

  article.rounded-2xl,
  details.rounded-2xl,
  pre.rounded-2xl,
  div.rounded-2xl.bg-zinc-900,
  div.rounded-2xl.bg-\[\#0a0a0b\] {
    border-radius: 14px !important;
  }

  article.rounded-2xl {
    padding: 16px !important;
  }

  button.rounded-2xl,
  button.rounded-xl {
    border-radius: 999px !important;
  }

  .tap {
    min-height: 38px !important;
    min-width: 38px !important;
  }

  button.border-zinc-800 {
    background: var(--folio-paper) !important;
    color: var(--folio-ink-2) !important;
  }

  button.border-zinc-800:hover {
    border-color: var(--folio-accent) !important;
    color: var(--folio-accent) !important;
    transform: translateY(-1px);
  }

  button.bg-coral {
    border: .5px solid var(--folio-ink) !important;
    background: var(--folio-ink) !important;
    color: var(--folio-paper) !important;
    font-weight: 400 !important;
  }

  button.bg-coral:hover {
    border-color: var(--folio-accent) !important;
    background: var(--folio-accent) !important;
    color: #fff !important;
  }

  span.bg-coral,
  .aelios-bottom-nav span.bg-coral {
    background: var(--folio-rose-soft) !important;
    color: var(--folio-rose-deep) !important;
  }

  span.bg-red-500\/90 {
    background: var(--folio-red-soft) !important;
    color: var(--folio-red) !important;
  }

  span.bg-amber-400\/90 {
    background: var(--folio-amber-soft) !important;
    color: var(--folio-amber) !important;
  }

  .choice-tab {
    min-height: 38px !important;
    border-color: transparent !important;
    border-radius: 999px !important;
    background: transparent !important;
    color: var(--folio-ink-3) !important;
    font-size: 11px !important;
  }

  .choice-tab:hover {
    background: var(--folio-bg-2) !important;
    color: var(--folio-ink) !important;
  }

  .choice-tab.is-active {
    border-color: var(--folio-ink) !important;
    background: var(--folio-ink) !important;
    color: var(--folio-paper) !important;
    font-weight: 400 !important;
  }

  .chip {
    min-height: 0;
    border-width: .5px !important;
    border-color: transparent !important;
    background: var(--folio-accent-soft) !important;
    color: var(--folio-accent) !important;
    padding: 4px 9px !important;
    font: 9.5px/1.4 var(--folio-mono) !important;
  }

  .chip-ok {
    background: var(--folio-green-soft) !important;
    color: var(--folio-green) !important;
  }

  .chip-err {
    background: var(--folio-red-soft) !important;
    color: var(--folio-red) !important;
  }

  .chip-warn {
    background: var(--folio-amber-soft) !important;
    color: var(--folio-amber) !important;
  }

  .chip-dim {
    background: var(--folio-bg-2) !important;
    color: var(--folio-ink-3) !important;
  }

  .chip-aurora {
    background: var(--folio-accent-soft) !important;
    color: var(--folio-accent) !important;
  }

  input,
  textarea,
  select {
    border-width: .5px !important;
    border-color: var(--folio-line-2) !important;
    border-radius: 10px !important;
    background: var(--folio-paper-2) !important;
    color: var(--folio-ink) !important;
    font-size: 12px !important;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: var(--folio-accent) !important;
    box-shadow: 0 0 0 3px var(--folio-accent-soft);
  }

  input[type="checkbox"],
  input[type="range"] {
    accent-color: var(--folio-accent) !important;
  }

  details summary {
    color: var(--folio-ink-3) !important;
    font-size: 11.5px !important;
    font-weight: 400 !important;
  }

  .dream-stat::before,
  .raw-bar-fill {
    background: linear-gradient(90deg, var(--folio-accent), var(--folio-rose)) !important;
  }

  .raw-bar-track {
    background: var(--folio-bg-2) !important;
  }

  .raw-bar-fill.is-done {
    background: var(--folio-ink-4) !important;
    opacity: .45;
  }

  .dream-rail::before {
    background: var(--folio-line-2) !important;
  }

  .dot-ok { --rail-dot: var(--folio-green); --rail-glow: var(--folio-green-soft); }
  .dot-err { --rail-dot: var(--folio-red); --rail-glow: var(--folio-red-soft); }
  .dot-run { --rail-dot: var(--folio-amber); --rail-glow: var(--folio-amber-soft); }
  .aurora-text { color: var(--folio-accent) !important; background: none !important; }

  .aelios-mobile-header {
    border-bottom: .5px solid var(--folio-line);
    background: color-mix(in srgb, var(--folio-bg) 88%, transparent);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .aelios-bottom-nav {
    border-color: var(--folio-line) !important;
    background: color-mix(in srgb, var(--folio-paper) 91%, transparent) !important;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .aelios-bottom-nav button {
    border-radius: 10px !important;
    background: transparent !important;
    color: var(--folio-ink-4) !important;
    font-size: 9px !important;
  }

  .aelios-bottom-nav button.text-coral,
  .aelios-bottom-nav button.bg-zinc-900 {
    color: var(--folio-accent) !important;
  }

  @media (max-width: 767px) {
    .aelios-content {
      padding: 22px 18px 36px !important;
    }

    .aelios-content > section {
      max-width: none;
    }

    .aelios-mobile-header {
      margin: -22px -18px 18px !important;
      padding: calc(10px + env(safe-area-inset-top)) 18px 10px !important;
    }

    .aelios-mobile-header .aelios-logo {
      width: 35px !important;
      height: 35px !important;
      border-radius: 10px !important;
      font-size: 17px !important;
    }

    h1 {
      font-size: 30px !important;
      line-height: 1.08 !important;
    }

    h2 {
      font-size: 19px !important;
    }

    article.rounded-2xl {
      border-radius: 12px !important;
      padding: 14px !important;
    }

    .tap {
      min-height: 42px !important;
      min-width: 42px !important;
    }

    section[x-show="page === 'today'"] > .grid.grid-cols-3,
    section[x-show="page === 'dream'"] > .grid.grid-cols-3 {
      gap: 8px !important;
    }

    section[x-show="page === 'today'"] > .grid.grid-cols-3 > div,
    section[x-show="page === 'dream'"] > .grid.grid-cols-3 > div {
      min-width: 0;
      padding: 11px 10px !important;
    }

    section[x-show="page === 'today'"] > .grid.grid-cols-3 .text-xs,
    section[x-show="page === 'dream'"] > .grid.grid-cols-3 .text-xs {
      overflow: hidden;
      font: 9px/1.35 var(--folio-mono) !important;
      letter-spacing: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    section[x-show="page === 'today'"] > .grid.grid-cols-3 .text-xl,
    section[x-show="page === 'dream'"] > .grid.grid-cols-3 .text-xl,
    section[x-show="page === 'dream'"] > .grid.grid-cols-3 .text-lg {
      font: 500 italic 20px/1.15 var(--folio-serif) !important;
    }

    section[x-show="page === 'review'"] article > .mt-4.grid,
    section[x-show="page === 'review'"] article > .mt-4.flex,
    section[x-show="page === 'review'"] article > .flex.flex-wrap:last-child {
      display: flex !important;
      flex-wrap: nowrap !important;
      gap: 6px !important;
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: none;
    }

    section[x-show="page === 'review'"] article > .mt-4.grid button,
    section[x-show="page === 'review'"] article > .mt-4.flex button,
    section[x-show="page === 'review'"] article > .flex.flex-wrap:last-child button {
      min-height: 35px !important;
      min-width: 0 !important;
      flex: 0 0 auto;
      padding-right: 10px !important;
      padding-left: 10px !important;
      font-size: 11px !important;
      white-space: nowrap;
    }

    section[x-show="page === 'memory'"] > .space-y-3 > .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }

    section[x-show="page === 'memory'"] > .space-y-3 > .grid button {
      width: 100% !important;
      min-width: 0 !important;
      white-space: nowrap;
    }

    .aelios-bottom-nav .grid {
      gap: 0 !important;
    }

    .aelios-bottom-nav button {
      min-width: 0 !important;
      padding: 3px 0 !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;
