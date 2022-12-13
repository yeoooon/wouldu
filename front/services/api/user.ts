import { FindPasswordFormValue } from "@components/FindPasswordForm";
import { getCookie, removeCookie, setCookie } from "@services/utils/cookies";
import { kakaoForm, NicknameForm, PasswordForm, SurveyForm, UserJoinForm, UserLoginForm } from "@type/user";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//회원가입
export const userJoin = async (joinInfo: UserJoinForm) => {
  const bodyData = JSON.stringify(joinInfo);
  try {
    const { status } = await axiosInstance.post("user/register", bodyData);
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status === 422) {
      return err.response.status;
    }
  }
};

//회원정보
export const getUserInfo = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`user/${id}`);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      console.log(err);

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
export const deleteUser = async (id: string) => {
  try {
    const { status } = await axiosInstance.delete(`user/${id}`);
    removeCookie("userToken");
    return status;
  } catch (err) {
    console.log(err);
    // if (axios.isAxiosError(err) && err.response?.status === 400) {
    //   return err.response.status;
    // }
  }
};

//비밀번호 수정
export const changePassword = async (passwordInfo: PasswordForm) => {
  const { id, oldPassword, newPassword } = passwordInfo;

  try {
    const { data } = await axiosInstance.put(`user/${id}/password`, { oldPassword, newPassword });
    return data;
  } catch (err) {
    console.log(err);
  }
};

//닉네임 수정
export const changeUserNickname = async (nicknameInfo: NicknameForm) => {
  const { id, nickname } = nicknameInfo;
  try {
    const { data } = await axiosInstance.put(`user/${id}/nickname`, { nickname });
    return data;
  } catch (err) {
    console.log(err);
  }
};

//회원비밀번호 찾기
export const FindUserPassword = async (data: FindPasswordFormValue) => {
  // console.log(data);
  try {
    const { status } = await axiosInstance.post(`/user/new-password`, data);
    return status;
  } catch (err) {
    console.log(err);
  }
};

//카테고리 수정
export const ChangeSurveyCategory = async (surveyInfo: SurveyForm) => {
  const { id, survey } = surveyInfo;
  try {
    const { data } = await axiosInstance.put(`user/${id}/survey`, { survey });
    return data;
  } catch (err) {
    console.log(err);
  }
};

//카카오 로그인
export const kakaoLogin = async (code: string) => {
  console.log("소셜로그인호출------------------------");
  try {
    const { data } = await axiosInstance.get(`auth/social/kakao?code=${code}`);
    setCookie("userToken", data?.accessToken);

    return data;
  } catch (err) {
    console.error(err);
  }
};
