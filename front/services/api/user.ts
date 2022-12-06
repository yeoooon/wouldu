import { getCookie, removeCookie, setCookie } from "@services/utils/cookies";
import { PasswordForm, UserChangeForm, UserJoinForm, UserLoginForm } from "@type/user";
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
    setCookie("userToken", data?.accessToken);
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
    removeCookie("userToken");
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

//회원정보 수정
export const changeUserInfo = async (id: string, changeData: UserChangeForm) => {
  try {
    const { data } = await axiosInstance.put(`user/${id}`, { ...changeData });
    return data;
  } catch (err) {
    console.log(err);
  }
};

//회원비밀번호 찾기
export const FindUserPassword = async (data: string) => {
  console.log(data)
  try {
    const { status } = await axiosInstance.post(`/user/new-password`, data);
    return status;
  } catch (err) {
    console.log(err);
  }
};
