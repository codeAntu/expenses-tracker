export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'https://example.com/api' : 'http://localhost:3000/api';

function api(strings: TemplateStringsArray, ...values: any[]) {
  const path = strings.reduce((result, str, i) => {
    return result + str + (values[i] || '');
  }, '');
  return `${BASE_URL}${path}`;
}

const API = {
  login: api`/auth/login`,
  signup: api`/auth/signup`,
  verify: api`/auth/verify`,
  firebase: api`/auth/firebase`,
};

export default API;
