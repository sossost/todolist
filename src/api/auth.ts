import { axiosBase } from "./axios";

export const signup = async (data: { email: string; password: string }) => {
  await axiosBase.post("auth/signup", data);
};

export const signin = async (data: { email: string; password: string }) => {
  return await axiosBase.post("auth/signin", data);
};
