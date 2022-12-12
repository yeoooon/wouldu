import { FindPasswordFormValue } from "@components/FindPasswordForm";
import { getCookie, removeCookie, setCookie } from "@services/utils/cookies";
import { kakaoForm, NicknameForm, PasswordForm, SurveyForm, UserJoinForm, UserLoginForm } from "@type/user";
import axios from "axios";
import qs from "qs";
import { axiosInstance } from "./axiosInstance";

//회원가입
export const userJoin = async (joinInfo: UserJoinForm) => {
  const bodyData = JSON.stringify(joinInfo);
  try {
    const { status } = await axiosInstance.post("user/register", bodyData);
    return status;
  } catch (err) {
    // console.log(err);

    if (axios.isAxiosError(err) && err?.response?.status === 422) {
      return err.response.status;
    }
  }
};

//회원정보
export const getUserInfo = async (id: string) => {
  // console.log("getUserInfo", id);
  try {
    const { data } = await axiosInstance.get(`user/${id}`);
    // console.log(data);
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

//카카오 토큰
export const getKakaoToken = async (code: string) => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const tokenUrl = "https://kauth.kakao.com/oauth/token";
  try {
    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

//카카오 사용자 정보
export const getUserFromKakao = async (access_token: string) => {
  const userInfoUrl = "https://kapi.kakao.com/v2/user/me";

  const response = await fetch(userInfoUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  }).then(res => res.json());
  return response;
};
