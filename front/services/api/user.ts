import { PasswordForm, UserJoinForm, UserLoginForm } from "@type/user";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//회원가입
export const userJoin = async (joinInfo: UserJoinForm) => {
  const bodyData = JSON.stringify(joinInfo);
  try {
    const { status } = await axiosInstance.post("user/register", bodyData);
    return status;
  } catch (err) {
    console.log(err);

    if (axios.isAxiosError(err) && err?.response?.status === 422) {
      return err.response.status;
    }
  }
};

//로그인
export const requestLogin = async (loginInfo: UserLoginForm) => {
  try {
    const { data } = await axiosInstance.post("auth/login", loginInfo);
    sessionStorage.setItem("userToken", data.access_token);
    return data;
  } catch (err) {
    console.log("requestLgoin error!!!!!", err);
    // if (axios.isAxiosError(err) && err.response?.status === 401) {
    //   alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    // }
  }
};

//회원탈퇴
export const deleteUser = async () => {
  try {
    const { data } = await axiosInstance.put("user/delete");
    sessionStorage.removeItem("userToken");
    return data;
  } catch (err) {
    console.log(err);
    // if (axios.isAxiosError(err) && err.response?.status === 400) {
    //   return err.response.status;
    // }
  }
};

//비밀번호 수정
export const changePassword = async (passwordInfo: PasswordForm) => {
  try {
    const { data } = await axiosInstance.post("user/password", passwordInfo);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//닉네임 수정
export const changeNickname = async (nickname: string) => {
  try {
    const { data } = await axiosInstance.post("user/password", { nickname });
    return data;
  } catch (err) {
    console.log(err);
  }
};
