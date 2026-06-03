export async function POST(request: Request) {
  let body: { email?: string; company?: string };
  try {
    body = (await request.json()) as { email?: string; company?: string };
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const { email, company } = body;

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Valid email required' }, { status: 400 });
  }

  console.log(`Waitlist signup: ${email} | ${company ?? 'no company'}`);

  return Response.json({ success: true });
}
