export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; company?: string };
  const { email, company } = body;

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Valid email required' }, { status: 400 });
  }

  console.log(`Waitlist signup: ${email} | ${company ?? 'no company'}`);

  return Response.json({ success: true });
}
