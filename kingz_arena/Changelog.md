# Changelog — King's Arena Website Project

All notable changes, version updates, and refactoring milestones for the **King's Arena** web development project will be documented in this file.

---

## [1.3.0] — 2026-11-08 
### Added
- Integrated the official **jQuery 3.7.1** CDN across all HTML pages (`index.html`, `about.html`, `products.html`, `enquire.html`, `contact.html`).
- Upgraded form validation scripts and dynamic product search/filter logic to leverage clean jQuery syntax.
- Implemented robust Leaflet map bounds-fitting logic paired with `ResizeObserver` handlers to eliminate tile rendering glitches.

### Fixed
- Resolved image overflow issues on mobile screens across product and gallery sections by implementing standardized `.fluid-media` rules in `_css/style.css`.
- Fixed layout wrapping bugs in the flexbox grid systems and team cards.

---

## [1.2.0] — 2026-10-20 (CSS Styling & Layout Architecture)
### Added
- Established the master stylesheet (`_css/style.css`) featuring a custom dark-themed gaming aesthetic (`#080811` background, `#11111f` panels, cyan and neon green accents).
- Configured CSS Grid and Flexbox structures for multi-column layouts, branch card grids, and responsive navigation headers.
- Added accessible focus states, custom form field styling, and button hover animations.

---

## [1.1.0] — 2026-09-15 (Interactive Scripting & Forms)
### Added
- Developed enquiry form cost calculation logic supporting tiered pricing (Bruv: R120, Premium: R200, Throne: R450).
- Created client-side validation rules for contact forms with dynamic inline error messaging and success feedback banners.
- Implemented an accessible lightbox modal script (`_js/lightbox.js`) for the "Inside the Arena" photo gallery.

---

## [1.0.0] — 2026-09-01 (Part 1 - Foundational Markup & Planning)
### Added
- Initialized repository structure with isolated `_css`, `_images`, `_js`, and `_videos` directories.
- Built foundational semantic HTML5 markup across all 5 interlinked core pages.
- Compiled low-fidelity wireframes, structural sitemaps, and project proposal documentation in Figma and FigJam.