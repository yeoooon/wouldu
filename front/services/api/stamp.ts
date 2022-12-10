import { MonthPlan } from "@type/planner";
import { axiosInstance } from "./axiosInstance";

//한달의 감정
export const getMonthEmotion = async ({ nowYear, nowMonth }: MonthPlan) => {
  console.log("getMonthEmotion", nowYear.toString(), nowMonth);
  try {
    const { data } = await axiosInstance.get(`diary/emotions?year=${nowYear}&month=${nowMonth}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};