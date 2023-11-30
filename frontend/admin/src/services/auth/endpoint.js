export const AuthEndpoint = {
  login: (data) => ({
    url: "/shop/login",
    method: "POST",
    data,
  }),
  signup: (data) => ({
    url: "/shop/signup",
    method: "POST",
    data,
  }),
};
