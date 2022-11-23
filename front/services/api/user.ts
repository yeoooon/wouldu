import { PasswordForm, UserJoinForm, UserLoginForm } from "@type/user";
import { axiosInstance } from "./axiosInstance";

//회원가입
export const userJoin = async (joinInfo: UserJoinForm) => {
  try {
    const { data } = await axiosInstance.post("user/login", joinInfo);
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
  try {
    const { data } = await axiosInstance.post("user/join", loginInfo);
    sessionStorage.setItem("userToken", data.token);
    return data;
  } catch (err) {
    console.log(err);
    // if (axios.isAxiosError(err) && err.response?.status === 400) {
    //   return err.response.status;
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
