import { UserJoinForm, UserLoginForm } from "@type/user";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//회원가입
export const userJoin = async (joinInfo: UserJoinForm) => {
  const requestData = JSON.stringify(joinInfo);

  try {
    const { data } = await axiosInstance.post("user/login", requestData);
    return data;
  } catch (err) {
    console.log(err);
    // if (axios.isAxiosError(err) && err.response?.status === 400) {
    //   return err.response.status;
    // }
  }
};

//로그인
export const requestLogin = async (loginInfo: UserLoginForm) => {
  const requestData = JSON.stringify(loginInfo);

  try {
    const { data } = await axiosInstance.post("user/join", requestData);
    sessionStorage.setItem("userToken", data.token);
    return data;
  } catch (err) {
    console.log(err);
    // if (axios.isAxiosError(err) && err.response?.status === 400) {
    //   return err.response.status;
    // }
  }
};
