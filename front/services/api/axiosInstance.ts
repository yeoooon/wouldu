import axios from "axios";
import { config } from "process";

export const BASE_URL = `http://${window.location.hostname}:5001`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  config => ({
    // 요청을 보내기 전에 수행할 일
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
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
