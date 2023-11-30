import axiosClient from "../../config/axiosClient";
import { AuthEndpoint } from "./endpoint";

export const login = async (body) => {
    try {
      const authResponse = await axiosClient.request(AuthEndpoint.login(body));
      return authResponse.data;
      
    } catch (err) {
      console.log("Error fetching ")
      return [];
    }
  };
export const signup = async (body) => {
  try {
    const authResponse = await axiosClient.request(AuthEndpoint.signup(body));
    return authResponse.data;
    
  } catch (err) {
    console.log("Error fetching ")
    return [];
  }
};