export function castStringToBool(str) {
  if (str === 'false') {
    return false;
  }
  if (str === 'true') {
    return true;
  }
}