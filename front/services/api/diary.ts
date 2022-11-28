import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { DiaryForm } from "@type/diary";

export const postDiary = async (diaryData: DiaryForm) => {
  const bodyData = JSON.stringify(diaryData);

  try {
    await axiosInstance.post("diary", bodyData);
  } catch (err) {
    console.log(err);
  }
}

// export const getDiaries = async ()
// 월 별로 가져오는 것 하나, 특정 날짜로 가져오는 것 하나?
// api 호출 -> return diaries & recoil/diary에 state 생성