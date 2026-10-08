// Lightweight, invisible spam checks for the contact form.
// Returns a reason string when a submission looks like spam, otherwise null.

const MIN_FILL_MS = 3000;

// A single "word" with many lowercase→uppercase flips mid-word, e.g. "GrtZptXCTBVgLzZUyzvdQwli".
function looksRandom(value: string): boolean {
  const v = value.trim();
  if (v.length < 10 || /\s/.test(v)) return false;
  const flips = v.match(/[a-z][A-Z]/g)?.length ?? 0;
  return flips >= 3;
}

export function spamReason(body: Record<string, unknown>): string | null {
  const str = (k: string) => (typeof body[k] === 'string' ? (body[k] as string) : '');

  // Hidden field humans never see; bots fill every input.
  if (str('website').trim()) return 'honeypot';

  // Real forms send how long the visitor spent on it; scripts posting
  // straight to the API don't, and bots submit almost instantly.
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed)) return 'no-timing';
  if (elapsed < MIN_FILL_MS) return 'too-fast';

  if (looksRandom(str('name')) || looksRandom(str('company').replace(/\s+(LLC|Inc\.?|Co\.?)$/i, ''))) {
    return 'random-name';
  }

  const message = str('message');
  const letters = message.match(/\p{L}/gu)?.length ?? 0;
  if (letters < 5) return 'no-real-message';

  const links = message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (links > 2) return 'too-many-links';

  return null;
}
