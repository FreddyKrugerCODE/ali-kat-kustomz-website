# SEO Strategy & Implementation

## Primary Keyword Targets

### Local Intent (Highest Value)
- vintage car painting [city]
- classic car paint shop [city]
- custom auto paint [city]
- [muscle car / hot rod / vintage] painter [city]
- automotive restoration paint [region/state]

### Service Intent
- color matching vintage car
- factory color restoration
- concours paint job
- custom car color development
- bare metal restoration paint

### Marque-Specific (Choose Based on Specialty)
- [Porsche / Ferrari / Camaro / Mustang / Corvette / etc.] paint restoration
- [year range] [make] paint match

---

## Meta Tags by Page

| Page | Title (≤60 char) | Description (≤160 char) |
|---|---|---|
| Home | [Shop Name] — Custom Vintage Car Painting in [City] | Concours-quality custom paint and color restoration for vintage cars. Hand-mixed color, lifetime craftsmanship. [City]-based. |
| Services | Vintage Car Painting Services \| [Shop Name] | Full restoration paint, color matching, custom color, and concours finishing for classic cars. Climate-controlled facility in [City]. |
| Portfolio | Portfolio \| [Shop Name] Vintage Paint | Recent restoration and custom paint projects on vintage and classic cars. See our work, color formulas, and process. |
| Process | Our Process \| [Shop Name] | The seven stages of how we paint a vintage car, from intake to final polish. No shortcuts. |
| About | About [Shop Name] \| Vintage Paint Studio in [City] | Founded in [year], [shop name] is a small studio focused on vintage automotive refinishing. [X] cars per year. |
| Contact | Contact & Quote Request \| [Shop Name] | Tell us about your project. We respond to every inquiry within two business days. |

---

## JSON-LD Structured Data

Add this to every page (the Astro SEO component will inject it):

```json
{
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  "name": "[YOUR SHOP NAME]",
  "image": "https://[domain]/og-image.jpg",
  "url": "https://[domain]",
  "telephone": "[PHONE]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[STREET]",
    "addressLocality": "[CITY]",
    "addressRegion": "[STATE]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LNG]"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  }],
  "priceRange": "$$$",
  "areaServed": "[STATE/REGION]",
  "sameAs": [
    "https://instagram.com/[HANDLE]",
    "https://facebook.com/[HANDLE]"
  ]
}
```

For each portfolio project, also add:

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "[YEAR MAKE MODEL] Restoration",
  "creator": { "@type": "Organization", "name": "[YOUR SHOP NAME]" },
  "image": "https://[domain]/portfolio/[slug]/hero.jpg",
  "description": "[Project description]"
}
```

---

## Image SEO

- **Filenames:** `{year}-{make}-{model}-{shot}.jpg` → `1969-camaro-z28-after.jpg`
- **Alt text formula:** "[Year Make Model] [shot description] — custom paint by [shop name]"
- **File size:** Astro will optimize, but start with images <2 MB and 2400px on the long edge
- **Format:** Astro converts to AVIF/WebP automatically; provide original JPGs

---

## Content Cadence (Post-Launch)

**Monthly:**
- 1 portfolio entry per completed project (drives most SEO traffic)
- 2–4 Instagram posts linking back to portfolio entries

**Quarterly:**
- 1 "journal" article — process deep-dive, color spotlight, or technique explainer
- Examples: "Why We Strip to Bare Metal," "How a Color Code Becomes a Formula," "Spotting a Bad Paint Job at a Car Show"

---

## Local SEO Checklist

- [ ] Google Business Profile claimed and fully completed
- [ ] Photos uploaded to GBP (exterior, interior, work in progress, finished cars)
- [ ] NAP (Name/Address/Phone) consistent across website, GBP, Yelp, Facebook
- [ ] Hagerty Marketplace pro listing (if applicable)
- [ ] Marque-specific forum signatures linking to the site
- [ ] Submitted to vintage car directories (Hemmings, Barrett-Jackson partner network)
