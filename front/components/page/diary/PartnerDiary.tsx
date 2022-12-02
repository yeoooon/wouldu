import { DiaryBox, ProfileBox, UserName, DiaryContent, UnwrittenDiaryBox, Text } from "./UserDiary";
import Image from "next/image";
import React from "react";
import { isPartnerDiary } from "@services/utils/diaryAuthor";

const PartnerDiary = ({ diaryList }: any) => {

  return (
    <>
      {diaryList && diaryList.find(isPartnerDiary) ? (
        <DiaryBox>
          <ProfileBox>
            <Image src="/icon/user.svg" alt="user" width={30} height={30} />
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
