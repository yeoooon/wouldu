import { DiaryBox, ProfileBox, UserName, DiaryContent, UnwrittenDiaryBox, Text } from './UserDiary';
import Image from 'next/image';
import React, { useState } from 'react'
import styled from 'styled-components';
import { Diary } from '@type/diary';

const testContent = {
  user: "댕댕",
  content: "일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perferendis at iste facilis non, rerum recusandae, repudiandae accusantium ratione molestiae provident autem a inventore porro! Nesciunt ipsa consequatur temporibus debitis.일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perferendis at iste facilis non, rerum recusandae, repudiandae accusantium ratione molestiae provident autem a inventore porro! Nesciunt ipsa consequatur temporibus debitis.일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit."
}

const PartnerDiary = ({ diaryList }: any) => {
  const [isPartnerWritten, setIsPartnerWritten] = useState(false);

  const isPartnerDiary = (element: Diary) => {
    if (element.authorId !== sessionStorage.getItem("userId")) {
      return true;
    }
  }

  const partnerDiary = diaryList.find(isPartnerDiary);

  return (
    <>
    {diaryList && partnerDiary? 
      <DiaryBox>
        <ProfileBox>
          <Image src="/icon/user.svg" alt="user" width={30} height={30} />
          <UserName>파트너 닉네임</UserName>
        </ProfileBox>
        <DiaryContent>
          {partnerDiary.content}
        </DiaryContent>
      </DiaryBox>
      :
      <UnwrittenDiaryBox>
        <Text>
          상대방이 아직 일기를 작성하지 않았습니다.
        </Text>
      </UnwrittenDiaryBox>
    }
    </>
  );
}

export default PartnerDiary
