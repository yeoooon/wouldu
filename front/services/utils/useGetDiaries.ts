import { useQuery } from "@tanstack/react-query";
import { getDiaries } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userAtom } from "@recoil/user";

export const useGetDiaries = (date: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm' 형태) 를 인자로 받습니다.
  const [diaryDateList, setDiaryDateList] = useState<Array<string> | undefined>();
  const [monthDiaryList, setMonthDiaryList] = useState<Array<Array<Diary>> | undefined>();
  
  const diaries = [];
  const [year, month] = date.split('-');
  
  const { data } = useQuery(["diaries", year, month], () => getDiaries(date), {
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && Object.keys(data.diaries)) {
      setDiaryDateList(Object.keys(data?.diaries));
    }
  }, [data]);

  useEffect(() => {
    if (diaryDateList !== undefined) {
      diaryDateList.forEach((date) => diaries.push(data?.diaries[date]));
      
      setMonthDiaryList(diaries);
    } else {
      setMonthDiaryList([]);
    }
  }, [diaryDateList])

  return { monthDiaryList };
};