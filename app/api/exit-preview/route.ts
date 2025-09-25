import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  // Disable Draft Mode by removing the cookie
  draftMode().disable();

  // Redirect to homepage
  redirect('/');
}