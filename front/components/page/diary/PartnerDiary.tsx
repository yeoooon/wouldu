import { DiaryBox, ProfileBox, UserName, DiaryContent, UnwrittenDiaryBox, Text } from "./UserDiary";
import React, { useState } from "react";
import styled from "styled-components";
import { Diary } from "@type/diary";
import { useRecoilValue } from "recoil";
import { userAtom } from "@recoil/user";
import { UserIcon } from "@components/icons/UserIcon";

const PartnerDiary = ({ diaryList }: any) => {
  const user = useRecoilValue(userAtom);

  const isPartnerDiary = (element: Diary) => {
    if (element.authorId !== user?.id) {
      return true;
    }
  };

  return (
    <>
      {diaryList && diaryList.find(isPartnerDiary) ? (
        <DiaryBox>
          <ProfileBox>
            <UserIcon width={30} height={30} />
            <UserName>파트너 닉네임</UserName>
          </ProfileBox>
          <DiaryContent>{diaryList.find(isPartnerDiary).content}</DiaryContent>
        </DiaryBox>
      ) : (
        <UnwrittenDiaryBox>
          <Text>상대방이 아직 일기를 작성하지 않았습니다.</Text>
        </UnwrittenDiaryBox>
      )}
    </>
  );
};

export default PartnerDiary;
