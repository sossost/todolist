import { axiosBase } from "./axios";

export const signup = async (data: { email: string; password: string }) => {
  await axiosBase.post("auth/signup", data);
};
