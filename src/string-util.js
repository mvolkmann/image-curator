// This was derived from
// https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function stringHash(s) {
  let hash = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // converts to 32bit integer
  }

  return hash;
}
