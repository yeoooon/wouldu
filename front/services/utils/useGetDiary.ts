import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@services/api/diary";
import { Diary } from "@type/diary";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userAtom } from '@recoil/user';

export const useGetDiary = (yyyymmdd: string) => {
  // 일기 데이터를 찾고 싶은 날짜 ('yyyy-mm-dd' 형태) 를 인자로 받습니다.
  const user = useRecoilValue(userAtom);
  const [diaryName, setDiaryName] = useState<string>('');
  const [userDiary, setUserDiary] = useState<Diary>({
    title: '',
    nickname: '',
    content: '작성된 내용이 없습니다.',
  });
  const [partnerDiary, setPartnerDiary] = useState<Diary>({
    title: '',
    nickname: '',
    content: '작성된 내용이 없습니다.',
  });

  const { data } = useQuery(["diaries", yyyymmdd], () => getDiary(yyyymmdd));

  useEffect(() => {
    console.log('useGetDiary 실행');
    setDiaryName(data?.title!);

    if (data?.diaries?.find((el) => el.userId === user?.id)) {
      setUserDiary({
        title: data?.title!,
        authorId: data?.diaries?.find((el) => el.userId === user?.id)!.authorId,
        id: data?.diaries?.find((el) => el.userId === user?.id)!.id,
        nickname: data?.diaries?.find((el) => el.userId === user?.id)!.user.nickname,
        content: data?.diaries?.find((el) => el.userId === user?.id)!.content,
      });
    }
    
    if (data?.diaries?.find((el) => el.userId !== user?.id)) {
      setPartnerDiary({
        title: data?.title!,
        authorId: data?.diaries?.find((el) => el.userId !== user?.id)!.authorId,
        id: data?.diaries?.find((el) => el.userId !== user?.id)!.id,
        nickname: data?.diaries?.find((el) => el.userId !== user?.id)!.user.nickname,
        content: data?.diaries?.find((el) => el.userId !== user?.id)!.content,
      });
    }
  }, [data]);

  return { diaryName, userDiary, partnerDiary };
}