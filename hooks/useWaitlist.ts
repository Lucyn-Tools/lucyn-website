'use client';

import { useState, useRef, type FormEvent } from 'react';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useWaitlist({ includeCompany = false }: { includeCompany?: boolean } = {}) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inFlightRef = useRef(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus('loading');
    setErrorMsg('');

    try {
      const payload = includeCompany ? { email, company } : { email };
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    } finally {
      inFlightRef.current = false;
    }
  };

  return { email, setEmail, company, setCompany, status, errorMsg, handleSubmit };
}
