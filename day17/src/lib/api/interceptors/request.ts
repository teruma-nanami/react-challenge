import type { InternalAxiosRequestConfig } from "axios";

export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("Token");
  if (token == null) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};
