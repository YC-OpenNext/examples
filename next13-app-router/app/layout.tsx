import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next 13 App Router',
  description: 'Next.js 13 App Router fixture for Next-YC validation',
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
            <a href="/">Home</a>
            {' | '}
            <a href="/about">About</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>Next-YC Example - Next.js 13 App Router</p>
        </footer>
      </body>
    </html>
  );
}
