import { LoginDto } from "../../interfaces";

export const AuthEndpoint = {
  login: (data: LoginDto) => ({
    url: "/shop/login",
    method: "POST",
    data
  }),
};
