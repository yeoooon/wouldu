import { DiaryBox, ProfileBox, UserName, DiaryContent, UnwrittenDiaryBox, Text } from './UserDiary';
import Image from 'next/image';
import React, { useState } from 'react'
import styled from 'styled-components';

const testContent = {
  user: "댕댕",
  content: "일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perferendis at iste facilis non, rerum recusandae, repudiandae accusantium ratione molestiae provident autem a inventore porro! Nesciunt ipsa consequatur temporibus debitis.일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perferendis at iste facilis non, rerum recusandae, repudiandae accusantium ratione molestiae provident autem a inventore porro! Nesciunt ipsa consequatur temporibus debitis.일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit."
}

const PartnerDiary = () => {
  const [isPartnerWritten, setIsPartnerWritten] = useState(false);

  return (
    <>
    {isPartnerWritten ? 
      <DiaryBox>
        <ProfileBox>
          <Image src="/icon/user.svg" alt="user" width={30} height={30} />
          <UserName>{testContent.user}</UserName>
        </ProfileBox>
        <DiaryContent>
          {testContent.content}
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
