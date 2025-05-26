export function setCookie(name: String , value: any , hours: number) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (hours * 60 * 60 * 1000));
  const expires = "expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name: String) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
}

export function removeCookie(name: String) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}