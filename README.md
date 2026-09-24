# True Friends

The truefriends.se site, in two eras. The front door asks which one you want.

```
/                    Choose your time — the portal
/home.html           The current site: dark, monospace, yellow
/1996/               The same site, as a Windows 95 web browser
```

Both eras carry the same content — the studio, the consulting practice, the
services, the photography, the reference cases — and both are bilingual. They
share one image tree, one set of CVs, and one language preference, so a
visitor who switches sides or years keeps their place.

Static HTML, CSS and JavaScript throughout. No build step, no dependencies, no
framework. Open `index.html` and it works.

## Layout

```
index.html                    The portal
css/portal.css                  its theme
js/portal.js                    its behaviour

home.html                     2026 — landing
consulting.html               2026 — consulting
studio.html                   2026 — studio
reference-cases/              2026 — case pages + template
css/{tokens,base,components,layout}.css
js/main.js
js/translations/              EN + SV, common.js then one per page

1996/index.html               1996 — welcome
1996/consulting.html          1996 — consulting
1996/studio.html              1996 — studio
1996/reference-cases/         1996 — case pages + template
1996/css/win95.css
1996/js/win95.js
1996/js/translations/         EN + SV, common.js then one per page

img/                          SHARED — logos, icons, team, gallery, cases
cv/                           SHARED — the CVs
tools/build-gallery.sh        Rebuild gallery thumbnails + copyright stamps
```

## The portal

Two halves, each previewed by the machine you would have read that era's web
on: a CRT with rolling scanlines and a blinking prompt, and a flat panel with
the studio's hero gradient drifting across it. Both computers are built from
divs — a CRT is a fat rounded rectangle and a flat panel is a thin one — so
the page needs no artwork and scales to any size.

Each button is drawn in the language of the site behind it, which makes the
choice a sample rather than a label. **The year on the right comes from the
clock**, so it rolls over on its own every New Year's Eve; the markup carries
a plausible value for the moment before the script runs.

Hovering either side brightens it and dims the other. The side you picked last
time is tagged, but nothing is auto-redirected — a visitor who wants the other
era should not have to undo a redirect to reach it.

## Crossing between eras

- **2026 → 1996**: the `1996` button in the nav, beside the language switch.
- **1996 → 2026**: Start → *Travel to {year}…*, or the footer line under the
  badges.
- **Either → the portal**: *Choose your time*, in both footers and in the 1996
  Start menu.

## The 1996 browser

The window is Windows 95 — title bar, menus, bevels, taskbar, dialogs — and
the pages inside it are what the web looked like when Navigator 3 shipped:
Times on white, a fixed-width column on tiled wallpaper, blue underlined
links, 3D rules, outset table borders, a hit counter. Form controls belong to
the chrome, because that is how the browser drew them.

The chrome is not decoration:

- **Location field** resolves what you type — `studio`, `/consulting.html`,
  `truefriends.se/epiroc`, or the full address. An unknown path gets a 404; an
  unknown host gets a DNS error.
- **Back / Forward / Home / Reload / Print** are real. Stop is greyed except
  while loading.
- **Status bar** narrates the request, then previews whatever link the pointer
  is over.
- **Find in Page** searches the document only and leaves the DOM as it found it.
- **Options** carries Navigator's four, all persisted — the three chrome rows
  and Auto Load Images, which falls back to the broken-image placeholder and
  the alt text.
- **View → Document Info** holds the address and the real last-modified date.

## Adding things

**A photo** — drop it in `img/gallery/`, run `bash tools/build-gallery.sh`, and
add the filename to `GALLERY_IMAGES` in **both** `js/main.js` and
`1996/js/win95.js`.

**A consultant** — the `.consultant-card` block in `consulting.html` and the
`.card` block in `1996/consulting.html`, plus the portrait, the CV PDF, and
matching `team.members.<slug>.*` keys under `en` and `sv` in both
`js/translations/consulting.js` and `1996/js/translations/consulting.js`.

**A reference case** — copy the `template.html` beside the case pages in the
era you are adding to and follow the comment at the top of the file. Each era
has its own.

**A string** — site-wide labels go in that era's `common.js`; page prose goes
in its per-page file. Both languages, always.

**A route (1996 only)** — the Location field resolves through the `PAGES` map
in `1996/js/win95.js`. Add an alias there and it becomes typeable.
