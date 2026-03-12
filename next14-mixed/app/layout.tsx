import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next 14 Mixed Routers',
  description: 'Next.js 14 mixed router fixture for Next-YC validation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home (App Router)</a>
            {' | '}
            <a href="/server-action">Server Action</a>
            {' | '}
            <a href="/legacy">Legacy Page</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>Next-YC Example - Next.js 14 Mixed Routers</p>
        </footer>
      </body>
    </html>
  );
}
