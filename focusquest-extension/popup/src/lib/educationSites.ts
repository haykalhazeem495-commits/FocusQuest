export const educationSites = [
  "coursera.org",
  "khanacademy.org",
  "edx.org",
  "udemy.com",
  "wikipedia.org",
  "mit.edu",
  "harvard.edu",
  "stanford.edu",
  "moodle",
  "canvas"
] as const;

export function isEducationalDomain(domain: string): boolean {
  const normalized = domain.toLowerCase();
  return educationSites.some((site) => normalized.includes(site));
}
