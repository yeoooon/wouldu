import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { Diary } from "@type/diary";

export const postDiary = async (diaryData: Diary) => {
  const bodyData = JSON.stringify(diaryData);

  try {
    await axiosInstance.post("diary", bodyData);
  } catch (err) {
    console.log(err);
  }
}

// 월 별 다이어리 데이터 가져오기
export const getDiaries = async (date: string) => {
  try {
    // const { data } = await axiosInstance.get(url);
  } catch (err) {
    console.log(err);
  }
}

// 특정 날짜 하루의 다이어리 가져오기
export const getDiary = async (date: string) => {
  try {
    // const { data } = await axiosInstance.get(url);
  } catch (err) {
    console.log(err);
  }
}