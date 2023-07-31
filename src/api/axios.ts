import axios from "axios";

const accessToken = JSON.parse(
  localStorage.getItem("access_token") || ""
)?.access_token;

export const axiosBase = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
