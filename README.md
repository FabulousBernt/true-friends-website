# True Friends 96

The truefriends.se site, built as a 1996 web browser. The window is Windows 95
— title bar, menus, toolbar, Location field, directory buttons, status bar —
and the pages inside it are what the web looked like when Navigator 3 shipped:
Times New Roman on white, blue underlined links, 3D rules, a hit counter.

Same content as ever — the studio, the consulting practice, the services, the
photography, the reference cases. Static HTML, CSS and JavaScript. No build
step, no dependencies, no framework. Open `index.html` and it works.

## Layout

```
index.html                       Welcome page — the two doors
consulting.html                  About, services, consultants, guestbook
studio.html                      About, services, gallery, guestbook
reference-cases/
  template.html                  Copy this to add a case (instructions inside)
  johnny-vigersten/*.html        Case documents
css/win95.css                    The entire theme — one file
js/win95.js                      The entire behaviour — one file
js/translations/                 EN + SV strings; common.js then one per page
img/                             Logos, icons, team, gallery, case artwork
tools/build-gallery.sh           Rebuild gallery thumbnails + copyright stamps
```

## Two visual languages

`css/win95.css` holds both, and the line between them is the point:

**The chrome** is Windows 95 — grey, bevelled, Tahoma at 12px. Every raised or
sunken edge comes from the four bevel utilities at the top of the file
(`.w-out`, `.w-in`, and their single-step variants), which are the 1995
two-step 3D border written as `box-shadow` insets.

**The page** is the document inside the viewport — Times, a fixed-width column
on a tiled background, `border-style: outset` tables, a navy band for every
`h2`. Form controls belong to the chrome, because in 1996 the browser drew
them with the operating system's widgets.

Nothing loads from another origin: the icons are inline SVG, the wallpaper and
the page texture are gradients, the type is a system stack. The CSP stays at
`default-src 'self'`.

## The browser actually works

- **Location field** — type `studio`, `/consulting.html`, `truefriends.se/epiroc`
  or the full address and it goes there. An unknown path gets a 404 dialog; an
  unknown host gets "the server does not have a DNS entry".
- **Back / Forward / Home / Reload / Print** — real history and real printing.
  Stop is greyed except while a page is loading.
- **Status bar** — narrates the load, then prints the destination of whatever
  link the pointer is over.
- **Find in Page** — searches the document only, highlights every match,
  steps through them, and leaves the DOM as it found it.
- **Options** — Show Toolbar, Show Location, Show Directory Buttons and Auto
  Load Images, all four persisted. Turning images off shows the broken-image
  placeholder and the alt text, the way it did on a modem.
- **View → Document Info** — the address, the real last-modified date, and the
  connection details.

## Adding things

**A photo** — drop it in `img/gallery/`, run `bash tools/build-gallery.sh`, add
the filename to `GALLERY_IMAGES` in `js/win95.js`.

**A consultant** — duplicate the `.card` block in `consulting.html`, add the
portrait and the CV PDF, and mirror `team.members.<slug>.*` under both `en`
and `sv` in `js/translations/consulting.js`.

**A reference case** — copy `reference-cases/template.html` and follow the
comment at the top of the file.

**A string** — browser chrome and page furniture go in
`js/translations/common.js`; page prose goes in the per-page file. Both
languages, always.

**A route** — the Location field resolves through the `PAGES` map in
`js/win95.js`. Add an alias there and it becomes typeable.
