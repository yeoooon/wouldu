import { atom } from "recoil";
import { formatDate } from "@services/utils/formatDate";

export const diarywriteState = atom({
  key: "istextareaopen",
  default: false,
});

export const clickedDiaryDateState = atom({
  key: "clickedDiaryDate",
  default: String(formatDate(new Date())),
})