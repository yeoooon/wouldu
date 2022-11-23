import { UserJoinForm } from "@type/user";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//회원가입
export const userJoin = async (joinInfo: UserJoinForm) => {
  const requestData = JSON.stringify(joinInfo);

  try {
    const { data } = await axiosInstance.post("", requestData);
    sessionStorage.setItem("userToken", data.token);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  }
};
