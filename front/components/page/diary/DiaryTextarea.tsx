import { Box, Container } from '@styles/layout'
import React from 'react'
import { useRecoilState } from 'recoil';
import styled from 'styled-components'
import { diarywriteState } from '../../../recoil/diary';

const DiaryTextarea = () => {
  const [isTextareaOpen, setIsTextareaOpen] = useRecoilState(diarywriteState);

  const handleBackClick = () => setIsTextareaOpen(!isTextareaOpen);

  return (
    <TextContainer>
        <Textarea
          autoFocus
          placeholder="오늘의 일기를 작성해주세요.
          수정, 삭제가 불가하니 신중하게 적어주세요 *^^*"
        />
        <ButtonBox>
          <BackButton onClick={handleBackClick}>
            뒤로 가기
          </BackButton>
          <SaveButton>
            나의 일기 저장하기
          </SaveButton>
        </ButtonBox>
    </TextContainer>
  )
}

const TextContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  padding: 1.5em;
  border-radius: 10px;
  outline: none;
  background-color: ${props => props.theme.color.purpleBox};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  resize: none;
  overflow-y: auto;
`;
const ButtonBox = styled(Box)`
  width: 100%;
  justify-content: space-between;
`;
const SaveButton = styled.button`
  margin-top: 1em;
  padding: 0.7em 2em;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const BackButton =styled(SaveButton)``;
export default DiaryTextarea;
