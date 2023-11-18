export const AuthEndpoint = {
  login: (data) => ({
    url: "/shop/login",
    method: "POST",
    data,
  }),
};
