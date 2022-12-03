import { DiaryBox, ProfileBox, UserName, DiaryContent, UnwrittenDiaryBox, Text } from "./UserDiary";
import Image from "next/image";
import React from "react";
import { isPartnerDiary } from "@services/utils/diaryAuthor";
import { UserIcon } from "@components/icons/UserIcon";

const PartnerDiary = ({ diaryList }: any) => {

  return (
    <>
      {diaryList && diaryList.find(isPartnerDiary) ? (
        <DiaryBox>
          <ProfileBox>
            <UserIcon width={30} height={30} />
            <UserName>{diaryList.find(isPartnerDiary).user.nickname}</UserName>
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