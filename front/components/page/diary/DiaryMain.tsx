import { Box, Container } from '@styles/layout';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { diarywriteState } from '../../../recoil/diary';
import DiaryTextarea from './DiaryTextarea';
import PartnerDiary from './PartnerDiary';
import UserDiary from './UserDiary';

const DiaryMain = () => {
  const isTextAreaOpen = useRecoilValue(diarywriteState);

  return (
    <MainContainer>
      <TextBox>
        <Title>딩딩이와 댕댕이의 일기장💘📖🖋</Title>
        <Date>2022년 11월 1일 월요일</Date>
      </TextBox>
      {isTextAreaOpen ?
      <InsideContainer>
      <DiaryTextarea />
      </InsideContainer>
       : 
      <InsideContainer2>
        <UserDiary />
        <PartnerDiary />
      </InsideContainer2>
      }
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2.5em;
`;

const TextBox = styled(Box)`
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 1em;
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.textLg};
  line-height: 29px;
  padding-bottom: 1em;
`;

const Date = styled(Title)`
  font-size: ${props => props.theme.fontSize.textMain};
  padding-bottom: 0;
`;
const InsideContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InsideContainer2 = styled(InsideContainer)`
  justify-content: space-between;
  margin: 0;
`;


export default DiaryMain;
