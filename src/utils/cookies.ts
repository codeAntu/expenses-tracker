import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value, {
    expires: days,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name, {
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
};
