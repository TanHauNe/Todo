function setTokenCookie(token: string, expirationDays: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

function getTokenFromCookie(): string | null {
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  const tokenFromCookie = getCookie("token");
  return tokenFromCookie;
}

export { setTokenCookie, getTokenFromCookie };
