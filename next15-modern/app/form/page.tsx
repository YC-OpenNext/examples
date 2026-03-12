'use client';

import { useActionState } from 'react';
import { submitContact } from '../actions';
import type { FormState } from '../actions';

const initialState: FormState = {
  success: false,
  message: '',
};

export default function FormPage() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <div>
      <h1>Contact Form with Server Actions</h1>
      <p>
        This form demonstrates React 19 <code>useActionState</code> combined
        with Next.js 15 Server Actions. The form submits directly to a server
        function with progressive enhancement.
      </p>

      <form action={formAction}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {state.message && (
        <p style={{ color: state.success ? 'green' : 'red' }}>
          {state.message}
        </p>
      )}
    </div>
  );
}
