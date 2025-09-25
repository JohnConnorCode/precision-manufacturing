import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  // Disable Draft Mode by removing the cookie
  const draft = await draftMode();
  draft.disable();

  // Redirect to homepage
  redirect('/');
}