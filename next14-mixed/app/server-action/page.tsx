async function submitForm(formData: FormData) {
  'use server';

  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

  // In a real app this would persist data.
  // Here we just validate the Server Action executes.
  console.log(`[server-action] name=${name} message=${message}`);
}

export default function ServerActionPage() {
  return (
    <div>
      <h1>Server Actions</h1>
      <p>
        This page demonstrates Next.js 14 Server Actions. The form below
        submits directly to a server function without requiring an API route.
      </p>
      <form action={submitForm}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <br />
          <textarea id="message" name="message" rows={4} required />
        </div>
        <button type="submit">Submit via Server Action</button>
      </form>
    </div>
  );
}
