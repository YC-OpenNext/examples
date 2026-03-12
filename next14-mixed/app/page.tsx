export default function HomePage() {
  return (
    <div>
      <h1>Next.js 14 Mixed Routers</h1>
      <p>
        This example demonstrates running both App Router and Pages Router
        simultaneously, along with Middleware and Server Actions.
      </p>
      <section>
        <h2>Features Tested</h2>
        <ul>
          <li>App Router (this page)</li>
          <li>Pages Router (<a href="/legacy">legacy page</a>)</li>
          <li>Middleware (request header injection)</li>
          <li>Server Actions (<a href="/server-action">form example</a>)</li>
          <li>API Route Handlers</li>
          <li>Incremental Static Regeneration (ISR)</li>
        </ul>
      </section>
      <section>
        <h2>API Check</h2>
        <p>
          Visit <a href="/api/hello">/api/hello</a> to verify the API route
          handler works alongside the mixed router setup.
        </p>
      </section>
    </div>
  );
}
