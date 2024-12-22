export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9._]{3,16}$/;
  return usernameRegex.test(username);
}
