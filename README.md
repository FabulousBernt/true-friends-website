# True Friends 96

The truefriends.se site, built as a Windows 95 application called **True Friends 96** —
a chat client you dial into over a 33.6 kbps modem. Same content as before: the
studio, the consulting practice, the services, the photography, the reference
cases. It just reads as a conversation inside a beige window now.

Static HTML, CSS and JavaScript. No build step, no dependencies, no framework.
Open `index.html` and it works.

## Layout

```
index.html                       Start page — the two doors
consulting.html                  Consulting conversation
studio.html                      Studio conversation + gallery
reference-cases/
  template.html                  Copy this to add a case (instructions inside)
  johnny-vigersten/*.html        Case documents
css/win95.css                    The entire theme — one file
js/win95.js                      The entire behaviour — one file
js/translations/                 EN + SV strings; common.js then one per page
img/                             Logos, icons, team, gallery, case artwork
tools/build-gallery.sh           Rebuild gallery thumbnails + copyright stamps
```

## How the window is put together

Every page is one `.window`: title bar, menu bar, toolbar, then a three-column
workspace of contents tree / transcript / status panels, with the prompt line
docked at the bottom and a taskbar under that. The chrome is identical across
pages; only the transcript differs.

Every raised or sunken edge in the build comes from the four bevel utilities at
the top of `css/win95.css` (`.w-out`, `.w-in`, and their single-step variants),
which are the 1995 two-step 3D border written as `box-shadow` insets. Icons are
inline SVG on a pixel grid, the desktop pattern is a gradient, and the type is
Tahoma — MS Sans Serif's descendant. Nothing is loaded from another origin, so
the CSP stays at `default-src 'self'`.

## Adding things

**A photo** — drop it in `img/gallery/`, run `bash tools/build-gallery.sh`, add
the filename to `GALLERY_IMAGES` in `js/win95.js`.

**A consultant** — duplicate the `.person` block in `consulting.html`, add the
portrait, the CV PDF, and matching `team.members.<slug>.*` keys under both `en`
and `sv` in `js/translations/consulting.js`.

**A reference case** — copy `reference-cases/template.html` and follow the
comment at the top of the file.

**A string** — site-wide chrome goes in `js/translations/common.js`; page prose
goes in the per-page file. Both languages, always.

## The prompt line

The chat input answers from a keyword table in `js/win95.js` — it runs offline
and knows about a dozen topics. Anything it does not recognise answers with the
email address rather than inventing something.
