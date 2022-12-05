import { userAtom } from "@recoil/user";
import { MatchCodeFormValue, requestType } from "@type/friend";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { axiosInstance } from "./axiosInstance";
//친구요청 api
export const requestFriend = async (friendCode: string) => {
  console.log({ code: friendCode });
  try {
    const { status } = await axiosInstance.post("friend/request", { code: friendCode });
    return status; //201 성공
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err) && err?.response?.status) {
      return err.response.status;
    }
  }
};

// 친구요청목록(받은것,보낸것) 확인
export const checkRequestFriend = async (side: requestType) => {
  try {
    const { data } = await axiosInstance.get(`friend/request?side=${side}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 현재 친구확인
export const getFriend = async () => {
  try {
    const { data } = await axiosInstance.get("friend");
    console.log(data);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      console.log(err.response.data);
      return err.response.data.statusCode;
    }
  }
};

// 친구수락
export const confirmFriend = async (requestId: number) => {
  try {
    const { status } = await axiosInstance.put("friend/request/accept", { requestId });
    return status;
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      return err.response.status;
    }
  }
};
//친구거절

export const rejectFriend = async (requestId: number) => {
  try {
    const { status } = await axiosInstance.put("friend/request/reject", { requestId });
    return status; //201 성공
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response?.status) {
      return err.response.status;
    }
  }
};
