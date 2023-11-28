import { unauthenticatedClient } from "../../config/axiosClient";
import { LoginDto } from "../../interfaces";
import { AuthEndpoint } from "./endpoint";

export const login = async (body: LoginDto) => {
  try {
    const authResponse = await unauthenticatedClient.request(AuthEndpoint.login(body));
    return authResponse.data;

  } catch (err) {
    console.log("Error fetching ")
    return [];
  }
};