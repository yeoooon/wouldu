import { Box } from '@styles/layout';
import Image from 'next/image';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { diarywriteState } from '../../../recoil/diary';
import styled from 'styled-components';

export const testContent = {
  user: "딩딩",
  content: "일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perferendis at iste facilis non, rerum recusandae, repudiandae accusantium ratione molestiae provident autem a inventore porro! Nesciunt ipsa consequatur temporibus debitis.일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perferendis at iste facilis non, rerum recusandae, repudiandae accusantium ratione molestiae provident autem a inventore porro! Nesciunt ipsa consequatur temporibus debitis.일기내용 Lorem ipsum dolor sit amet consectetur adipisicing elit."
}

const UserDiary = () => {
  const [isTextareaOpen, setIsTextareaOpen] = useRecoilState(diarywriteState);
  const [isUserWritten, setIsUserWritten] = useState(false);

  const handleToggle = () => setIsTextareaOpen(!isTextareaOpen);

  return (
    <>
    {isUserWritten ? 
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
        아직 일기가 작성되지 않았습니다.<br/>
        오늘의 일기를 작성하여 친구와 공유해 보세요.
        </Text>
        <Button onClick={handleToggle}>
          나의 일기 작성하러 가기
        </Button>
      </UnwrittenDiaryBox>
    }
    </>
  );
};

export const DiaryBox = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  width: 100%;
  height: 48%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  flex-direction: column;
  justify-content: flex-start;
  padding: 2em;
`;

export const UnwrittenDiaryBox = styled(DiaryBox)`
  justify-content: center;
`;

export const Text = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  line-height: 25px;
  text-align: center;
`;

export const Button = styled.button`
  margin-top: 1em;
  padding: 0.7em 2em;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const ProfileBox = styled(Box)`
  justify-content: flex-start;
  width: 100%;
  height: 20%;
`;

export const UserName = styled.p`
  font-weight: bold;
  margin: 0.5em;
`;

export const DiaryContent = styled(Box)`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 1.5em 0;
  overflow-y: auto;
`;

export default UserDiary;
