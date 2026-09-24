# True Friends

The truefriends.se site, plus a second copy of it built as a 1996 web browser.

```
/                    The site: dark, monospace, yellow
/1996/               TF Classic — the same site, as a Windows 95 web browser
```

The way across is the **TF Classic website** chip in the nav bar, at the head
of the right-hand group just left of the social icons. Both sites carry the
same content — the studio, the consulting practice, the services, the
photography, the reference cases — and both are bilingual. They share one
image tree, one set of CVs, and one language preference, so a visitor who
crosses over keeps their place.

Static HTML, CSS and JavaScript throughout. No build step, no dependencies, no
framework. Open `index.html` and it works.

## Layout

```
index.html                    landing
consulting.html               consulting
studio.html                   studio
reference-cases/              case pages + template
css/{tokens,base,components,layout}.css
js/main.js
js/translations/              EN + SV, common.js then one per page

1996/index.html               TF Classic — welcome
1996/consulting.html          TF Classic — consulting
1996/studio.html              TF Classic — studio
1996/reference-cases/         TF Classic — case pages + template
1996/css/win95.css
1996/js/win95.js
1996/js/translations/         EN + SV, common.js then one per page

img/                          SHARED — logos, icons, team, gallery, cases
cv/                           SHARED — the CVs
tools/build-gallery.sh        Rebuild gallery thumbnails + copyright stamps
```

## Crossing between the two

- **Now → TF Classic**: the `TF Classic website` chip in the nav, immediately
  left of the social icons. It keeps its place at every width — on the landing
  page there is no drawer to hide it in — and the second word drops below
  600px, which is why the label is two translation keys rather than one.
- **TF Classic → now**: Start → *Travel to {year}…*, or the footer line under
  the badges. Both name the current year, written from the clock.

## TF Classic

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
site you are adding to and follow the comment at the top of the file. Each has
its own.

**A string** — site-wide labels go in that site's `common.js`; page prose goes
in its per-page file. Both languages, always. Then run `node tools/i18n.js sync`,
which copies the English strings back into the pages as fallback text.

That fallback is not decoration: it is what the browser paints before the
deferred translation script runs, and what stays if scripting is off. Let it
drift from the dictionary and every visitor sees the old wording flash on load.
`node tools/i18n.js check` fails on any key that is missing from either
language and on any fallback that no longer matches — worth running before a
commit that touches copy.

**A route (TF Classic only)** — the Location field resolves through the `PAGES` map
in `1996/js/win95.js`. Add an alias there and it becomes typeable.
