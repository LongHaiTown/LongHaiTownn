Public assets structure

images/
- blog/: Post hero and inline images (named by slug)
- avatars/: Author/profile images
- ui/: UI illustrations and decorative images

icons/: Static SVG/PNG icons not provided by icon libraries
fonts/: Self-hosted web fonts (WOFF2 preferred)
media/: Large media (videos, audio) referenced by pages
uploads/: Temporary or user-uploaded assets (if applicable)

Conventions
- Blog hero: images/blog/<slug>-hero.jpg
- Inline image: images/blog/<slug>/<descriptive-name>.<ext>
- Avatar: images/avatars/<author>.jpg
- UI asset: images/ui/<component-or-purpose>.<ext>
- Icon: icons/<name>.svg

Guidelines
- Prefer WEBP/AVIF for photos; fallback JPG/PNG when needed
- Keep sizes reasonable; add responsive variants if necessary
- Use lowercase, hyphen-separated names; avoid spaces
- Store only static, versioned assets here; generated files belong elsewhere