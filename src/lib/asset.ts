/**
 * Putanja do datoteke iz /public uz osnovnu adresu stranice.
 * Lokalno je osnova "/", a na GitHub Pagesu "/nk-bibinje/" — npr.
 * asset('/grb.jpg') -> '/nk-bibinje/grb.jpg'.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
