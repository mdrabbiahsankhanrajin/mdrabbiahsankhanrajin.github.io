# Rajin Labs: temporary portfolio

A stand-in portfolio for Razi (Rajin Labs, Dhaka) while ZENITH is being built. It is a rebrand of a static
snapshot of a third-party site, so treat it as **temporary**:

- The layout, CSS and JS were made by someone else. Do not leave this live as the long-term site, and do not
  present the design as original work. Fonts are now free (Instrument Serif, Inter, SIL OFL; see fonts/LICENSES.md).
- Everything with a name, client, award, photo or claim on it was replaced or removed. Copy comes from
  `zenith-portfolio-setup/content/*.ts`; services copy is a draft written from that profile.

## Run locally

```bash
python serve.py        # http://localhost:4173  (clean URLs: /work, /about, /services)
```

`python -m http.server` will not work: the site links to `/work` etc. without `.html`.

## Placeholders to replace

- Email: set to mdrabbiahsankhanrajin@gmail.com (hero CTA, nav, footer contact)
- Social links: LinkedIn and X in the footer point at `#footer`
- Canonical/og host: `https://rajinlabs.example` (no og image exists)
- Case studies: pages in work/ are generated from ZENITH content/projects.ts; Eryndor is still "Coming soon"
- Removed until real content exists: client logos, testimonials, showreel, portrait and photos, awards
