import { useQuery } from "@tanstack/react-query";
import { getDiaries } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userAtom } from "@recoil/user";
import { formatDate } from "./formatDate";
import { keyframes } from "styled-components";

interface MonthDiaryList {
  date: {
    userId: string
    nickname: string
    content: string
  }
}

const useGetDiaries = (date: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm' 형태) 를 인자로 받습니다.
  const [year, month] = date.split('-');
  const user = useRecoilValue(userAtom);
  const [diaryDateList, setDiaryDateList] = useState<Array<string>>([]);
  const [monthDiaryList, setMonthDiaryList] = useState<Array<Array<Diary>>>();

  const { data } = useQuery(["diaries", year, month], () => getDiaries(date), {
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data === undefined) {
      console.log("no data");
    } else {
      setDiaryDateList(Object?.keys(data?.diaries));      
    }

    const diaries = [];

    for (let i = 0; i < diaryDateList?.length; i++) {
      const key = diaryDateList[i];
      diaries.push(data?.diaries[key]);
    }

    setMonthDiaryList(diaries);    
  }, [data]);

  return monthDiaryList;
};

export default useGetDiaries;