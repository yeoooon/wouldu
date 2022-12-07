import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";
import { isUserDiary, isPartnerDiary } from "./diaryAuthor";

export const useGetDiary = (yyyymmdd: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm-dd' 형태) 를 인자로 받습니다.

  const [diaryName, setDiaryName] = useState<string>('');
  const [userDiary, setUserDiary] = useState<Diary | undefined>();
  const [partnerDiary, setPartnerDiary] = useState<Diary | undefined>();

  const { data } = useQuery(["diaries", yyyymmdd], () => getDiary(yyyymmdd));

  useEffect(() => {
    console.log(data);})

  //   setDiaryName(data?.title!);

  //   if (data.diaries.find(isUserDiary)) {
  //     setUserDiary({
  //       title: data?.title!,
  //       id: data?.diaries.find(isUserDiary)!.id,
  //       nickname: data?.diaries.find(isUserDiary)!.user.nickname,
  //       content: data?.diaries.find(isUserDiary)!.content,
  //     });
  //   }
    
  //   if (data.diaries.find(isPartnerDiary)) {
  //     setPartnerDiary({
  //       title: data?.title!,
  //       id: data?.diaries.find(isPartnerDiary)!.id,
  //       nickname: data?.diaries.find(isPartnerDiary)!.user.nickname,
  //       content: data?.diaries.find(isPartnerDiary)!.content,
  //     });
  //   }
  // }, [data]);

  // return { diaryName, userDiary, partnerDiary };
  return data;
}