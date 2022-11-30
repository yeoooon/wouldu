import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//친구요청 api
export const requestFriend = async (code: string) => {
  try {
    const { status } = await axiosInstance.post("friend/request", { code });
    return status; //201 성공
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      return err.response.status;
    }
  }
};

// 친구요청확인
export const checkRequestFriend = async () => {
  try {
    const { data } = await axiosInstance.get("friend/request");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 친구수락
export const confirmFriend = async (code: string) => {
  try {
    const { status } = await axiosInstance.post("friend/accept");
    return status; //201 성공
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      return err.response.status;
    }
  }
};
