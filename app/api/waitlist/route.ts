export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { email, company } = raw as { email?: string; company?: string };

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Valid email required' }, { status: 400 });
  }

  console.log('waitlist.signup', { domain: email.split('@')[1], hasCompany: Boolean(company) });

  return Response.json({ success: true });
}
