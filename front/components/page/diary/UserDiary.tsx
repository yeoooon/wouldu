import { Box } from '@styles/layout';
import React from 'react'
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { diarywriteState, today, clickedDiaryDateState } from '@recoil/diary';
import styled from 'styled-components';
import { DiaryProps } from '@type/diary';
import { UserIcon } from "@components/icons/UserIcon";

const UserDiary = ({ diary }: DiaryProps) => {
  const [isTextareaOpen, setIsTextareaOpen] = useRecoilState(diarywriteState);
  const clickedDiaryDate = useRecoilValue(clickedDiaryDateState);
  const todayDate = useRecoilValue(today);

  const handleToggle = () => setIsTextareaOpen(!isTextareaOpen);

  return (
    <>
    {diary && diary.title !== '' ?
      <DiaryBox>
        <ProfileBox>
          <UserIcon width={30} height={30} />
          <UserName>{diary.nickname}</UserName>
        </ProfileBox>
        <DiaryContent>
          {diary.content}
        </DiaryContent>
      </DiaryBox>
      :
      <UnwrittenDiaryBox>
        {clickedDiaryDate === todayDate?
          <>
            <Text>
              아직 일기가 작성되지 않았습니다.<br/>
              오늘의 일기를 작성하여 친구와 공유해 보세요.
            </Text>
            <Button onClick={handleToggle}>
              나의 일기 작성하러 가기
            </Button>
          </>
          :
          <>
            <Text>
              작성된 일기가 없습니다.
            </Text>
          </>    
        }
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
