import type { InternalAxiosRequestConfig } from "axios";

export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token == null) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};
