import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next 15 Modern',
  description: 'Next.js 15 with React 19 fixture for Next-YC validation',
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
            <a href="/form">Form with Actions</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>Next-YC Example - Next.js 15 with React 19</p>
        </footer>
      </body>
    </html>
  );
}
