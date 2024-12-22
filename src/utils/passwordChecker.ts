export function isValidPassword(pw: string): boolean {
  const regex = /^(?=.*\d)(?=.*[\W_]).{9,}$/g;
  return regex.test(pw);
}
