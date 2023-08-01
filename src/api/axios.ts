import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBase.interceptors.request.use((config: any): any => {
  const accessToken = JSON.parse(
    localStorage.getItem("access_token") || ""
  )?.access_token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
