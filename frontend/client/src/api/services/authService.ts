/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../../config/axiosClient";
import { LoginDto, RegisterDto } from "../../interfaces";
import { AuthEndpoint } from "../endpoints/auth";

export const loginAccount = async (data: LoginDto | any[]) => {
    try {
        const response = await axiosClient.request(AuthEndpoint.login(data));
        return response;
    } catch (err) {
        console.log({ err });
        return []
    }
}
export const registerNewAccount = async (data: RegisterDto | any[]) => {
    try {
        const response = await axiosClient.request(AuthEndpoint.register(data));
        return response.metadata;
    } catch (err) {
        console.log({ err });
        return []
    }
}