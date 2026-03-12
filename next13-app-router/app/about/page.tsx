import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Next 13 App Router',
};

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>
        This example validates that Next.js 13 App Router works correctly with
        the <code>next-yc deploy</code> one-command deployment flow.
      </p>
      <h2>What This Example Covers</h2>
      <ul>
        <li>Nested route segments</li>
        <li>Metadata API for SEO</li>
        <li>Server-side rendering with streaming</li>
        <li>
          Standalone output mode (<code>output: &apos;standalone&apos;</code>)
        </li>
      </ul>
      <p>
        The project is configured with <code>next-yc-cfg.json</code> to provide
        runtime environment variable placeholders for the deployment target.
      </p>
    </div>
  );
}
