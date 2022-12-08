import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDiary } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userAtom } from '@recoil/user';
import { E } from "chart.js/dist/chunks/helpers.core";

export const useGetDiary = (date: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm-dd' 형태) 를 인자로 받습니다.
  const user = useRecoilValue(userAtom);
  const [userDiary, setUserDiary] = useState<Diary>();
  const [partnerDiary, setPartnerDiary] = useState<Diary>();
  const [year, month, day] = date.split('-');

  const { data } = useQuery(["diaries", year, month, day], () => getDiary(date));

  useEffect(() => {
    console.log(date);
    console.log("usegetDiary 실행");
    console.log(data);

    if (!data) {
      setUserDiary(undefined);
      setPartnerDiary(undefined);
    }

    if (data?.diaries?.find((el) => el.userId === user?.id)) {
      setUserDiary({
        title: data?.title!,
        authorId: data?.diaries?.find((el) => el.userId === user?.id)!.authorId,
        id: data?.diaries?.find((el) => el.userId === user?.id)!.id,
        nickname: data?.diaries?.find((el) => el.userId === user?.id)!.user.nickname,
        content: data?.diaries?.find((el) => el.userId === user?.id)!.content,
      });
    } else {
      setUserDiary(undefined);
    }
    
    if (data?.diaries?.find((el) => el.userId !== user?.id)) {
      setPartnerDiary({
        title: data?.title!,
        authorId: data?.diaries?.find((el) => el.userId !== user?.id)!.authorId,
        id: data?.diaries?.find((el) => el.userId !== user?.id)!.id,
        nickname: data?.diaries?.find((el) => el.userId !== user?.id)!.user.nickname,
        content: data?.diaries?.find((el) => el.userId !== user?.id)!.content,
      });
    } else {
      setPartnerDiary(undefined);
    } 
  }, [data]);

  return { userDiary, partnerDiary };
}