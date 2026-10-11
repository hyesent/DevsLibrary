# Images, Fonts, and Static Assets

Files in `public/` are intentionally public and can be referenced from the site root. Never place secrets or private uploads there. `next/image` provides image layout and optimization features; supply accurate dimensions or use a supported fill layout with a correctly positioned container.

```tsx
import Image from 'next/image';
export function Cover() {
  return <Image src="/covers/nextjs.jpg" alt="Cover of the Next.js learning guide"
    width={640} height={900} sizes="(max-width: 640px) 50vw, 240px" />;
}
```

For remote images, configure allowed sources according to current docs. `sizes` helps browsers choose responsive resources. Informative images need useful alt text; decorative images can use `alt=""`. Font integration can self-host supported fonts; load only necessary weights and subsets and respect licensing.

Serve correctly sized images, reserve layout space, and test image optimization in the deployment environment. Hosting capabilities may differ.

**Practice:** Build a responsive cover card and check alt text, dimensions, remote-source config, and failure behavior.
