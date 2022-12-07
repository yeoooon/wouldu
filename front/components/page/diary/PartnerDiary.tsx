import { DiaryBox, ProfileBox, UserName, DiaryContent, UnwrittenDiaryBox, Text } from "./UserDiary";
import Image from "next/image";
import React from "react";
import { isPartnerDiary } from "@services/utils/diaryAuthor";
import { UserIcon } from "@components/icons/UserIcon";
import { DiaryProps } from "@type/diary";

const PartnerDiary = ({ diary }: DiaryProps) => {

  return (
    <>
      {diary? (
        <DiaryBox>
          <ProfileBox>
            <UserIcon width={30} height={30} />
            <UserName>{diary.nickname}</UserName>
          </ProfileBox>
          <DiaryContent>{diary.content}</DiaryContent>
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
