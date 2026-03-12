'use server';

export interface FormState {
  success: boolean;
  message: string;
}

export async function submitContact(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    return {
      success: false,
      message: 'Name and email are required.',
    };
  }

  // Simulate async processing
  await new Promise((resolve) => setTimeout(resolve, 100));

  console.log(`[server-action] contact: name=${name} email=${email}`);

  return {
    success: true,
    message: `Thank you, ${name}! We received your submission.`,
  };
}
