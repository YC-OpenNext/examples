export default function HomePage() {
  return (
    <div>
      <h1>Next.js 13 App Router</h1>
      <p>
        This is a Server Component rendered on the server. It demonstrates the
        App Router with React Server Components and streaming SSR.
      </p>
      <section>
        <h2>Features Tested</h2>
        <ul>
          <li>App Router with file-based routing</li>
          <li>React Server Components (default)</li>
          <li>Streaming SSR</li>
          <li>Standalone output for containerized deployment</li>
          <li>API Routes via Route Handlers</li>
        </ul>
      </section>
      <section>
        <h2>API Check</h2>
        <p>
          Visit <a href="/api/hello">/api/hello</a> to verify the API route
          handler.
        </p>
      </section>
    </div>
  );
}
