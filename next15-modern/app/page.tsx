import Image from 'next/image';

export default function HomePage() {
  return (
    <div>
      <h1>Next.js 15 with React 19</h1>
      <p>
        This example uses Next.js 15 with React 19, showcasing modern patterns
        including Server Actions, the updated <code>next/image</code> component,
        and improved server component defaults.
      </p>

      <section>
        <h2>Image Optimization</h2>
        <p>
          The <code>next/image</code> component below tests image optimization
          in the standalone deployment output.
        </p>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={283}
          height={64}
          priority
        />
      </section>

      <section>
        <h2>Features Tested</h2>
        <ul>
          <li>React 19 with Server Components</li>
          <li>Server Actions with form binding</li>
          <li>
            <code>next/image</code> optimization in standalone mode
          </li>
          <li>Async component patterns</li>
          <li>Standalone output for containerized deployment</li>
        </ul>
      </section>

      <section>
        <h2>Server Action Form</h2>
        <p>
          Visit the <a href="/form">form page</a> to test Server Actions with
          React 19 form integration.
        </p>
      </section>
    </div>
  );
}
