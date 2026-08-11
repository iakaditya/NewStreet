# New Street — Complete Landing Page Redesign

## Summary

Full rewrite of the landing page for New Street — India's Digital Civic Platform. The current `landing_v2.html` has fundamental problems: wrong brand colors, fabricated statistics, Vadodara-locked content, wrong design direction, and multiple content rules violations.

## What Changes

### Files Being Created/Overwritten

| File | Action |
|---|---|
| `landing_v2.html` | Full overwrite — complete new structure |
| `landing_v2.css` | Full overwrite — new design system |
| `landing_v2.js` | Full overwrite — new interaction engine |

### Brand Corrections
- Remove all blue/violet brand colors → use Navy #0B1733, Green #168A55, Saffron #F59E0B
- Remove all fabricated stats (2.8 Cr citizens, 92% resolution, 700+ depts)
- Remove fake badges ("ISO 27001", "Digital India Partner")
- Remove Vadodara-locked content from services & sections
- Typography: Inter + Manrope instead of Roboto/Montserrat

### New Sections Added
- Emergency & Help (dark navy, two groups: Emergency / Help)
- Trust section (4 principles: Privacy, Transparency, Accessibility, Accountability)
- Problem → Solution architecture diagram
- Cinematic final CTA

### Key Interactions
- Monument hero with scroll zoom-in (India Gate image)
- City selector modal with search + popular cities
- 5-step animated horizontal timeline (From Problem to Progress)
- Sahayak AI chat sandbox
- Service category filter tabs
- FAQ accordion
- Scroll reveal animations
- Sticky nav with backdrop blur

## Content Rules Followed
- No fabricated statistics
- Demo data clearly labeled
- No fake government partnerships/certifications
- City selector works for all Indian cities (not Vadodara-only)
- Emergency section clearly states New Street connects, not responds
