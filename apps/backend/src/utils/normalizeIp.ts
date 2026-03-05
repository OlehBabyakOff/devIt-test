export function normalizeIp(ip: string | undefined) {
  if (!ip) {
    return 'unknown';
  }

  if (ip.startsWith('::ffff:')) {
    return ip.substring(7);
  }

  return ip;
}

