# Public Assets Directory

This directory contains static assets that are served directly by Next.js.

## Directory Structure

```
public/
├── images/          # General images (product photos, banners, etc.)
├── logos/           # Logo files (PNG, SVG, etc.)
├── brochures/       # PDF brochures and documents
└── favicon.ico      # Site favicon (can also be in src/app/)
```

## How to Use

### Images
Place image files in the `images/` folder and reference them like this:

```tsx
import Image from 'next/image';

<Image 
  src="/images/logo.png" 
  alt="Logo" 
  width={200} 
  height={200} 
/>
```

### Logos
Place logo files in the `logos/` folder:

```tsx
<Image 
  src="/logos/kscmmc-logo.png" 
  alt="KSCMMC Logo" 
  width={150} 
  height={50} 
/>
```

### PDFs/Documents
Place PDF files in the `brochures/` folder:

```tsx
<a href="/brochures/product-brochure.pdf" download>
  Download Brochure
</a>
```

## Notes

- Files in the `public` folder are served from the root URL (`/`)
- Use `/images/logo.png` not `/public/images/logo.png`
- Next.js automatically optimizes images when using the `Image` component
- For best performance, use WebP format for images when possible

