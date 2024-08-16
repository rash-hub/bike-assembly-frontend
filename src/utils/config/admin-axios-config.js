import Base from "axios";
import { checkTokenValidity } from "./check-token-validity";

const adminRootInstance = Base.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/admin`,
  timeout: process.env.REACT_APP_API_TIMEOUT,
});

adminRootInstance.interceptors.request.use(
  async (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    if (typeof window === "undefined") {
      return config;
    }
    await checkTokenValidity();
    const token = localStorage?.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminRootInstance;
