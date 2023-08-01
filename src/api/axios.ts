import axios from "axios";

let accessToken = localStorage.getItem("access_token");

if (accessToken !== null) {
  accessToken = JSON.parse(accessToken);
}

export const axiosBase = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
