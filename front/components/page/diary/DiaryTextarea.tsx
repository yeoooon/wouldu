import { Box, Container } from '@styles/layout'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { SubmitHandler, useForm } from "react-hook-form";
import styled from 'styled-components'
import { diarywriteState } from '../../../recoil/diary';
import { postDiary } from '../../../services/api/diary';
import { Diary } from '@type/diary';

const DiaryTextarea = () => {
  const [isTextareaOpen, setIsTextareaOpen] = useRecoilState(diarywriteState);

  const handleBackClick = () => setIsTextareaOpen(!isTextareaOpen);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ content: string }>();

  const handlePostSubmit: SubmitHandler<{ content: string }> = (data) => {
    postDiary(data);
  }

  return (
    <TextContainer>
      <FormBox onSubmit={handleSubmit(handlePostSubmit)}>
        <Textarea
          {...register("content", {
            required: true
          })}
          autoFocus
          placeholder="오늘의 일기를 작성해주세요.
          수정, 삭제가 불가하니 신중하게 적어주세요 *^^*"
        />
        <ButtonBox>
          <BackButton onClick={handleBackClick}>
            뒤로 가기
          </BackButton>
          <SaveButton type="submit">
            나의 일기 저장하기
          </SaveButton>
        </ButtonBox>
      </FormBox>
    </TextContainer>
  )
}

const TextContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const FormBox = styled(Box)`
  width: 100%;
  height: 100%;
  flex-direction: column;
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
