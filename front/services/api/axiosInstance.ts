import axios from "axios";
import { config } from "process";

export const BASE_URL = `http://${window.location.hostname}:5001`;

export const axiosInstance = axios.create({});

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.timeout = 3000;
axiosInstance.defaults.headers.put["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("userToken")}`;

axiosInstance.interceptors.request.use(
  async config => ({
    // 요청을 보내기 전에 수행할 일
    ...config,
    headers: {},
  }),
  error => {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  },
);
