import { Box, Container } from '@styles/layout';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { diarywriteState, clickedDiaryDateState } from '../../../recoil/diary';
import DiaryTextarea from './DiaryTextarea';
import PartnerDiary from './PartnerDiary';
import UserDiary from './UserDiary';
import getDayString from '../../../services/utils/getDayString';
import { getDiary } from '@services/api/diary';
import { useQuery } from '@tanstack/react-query';
import DiaryListDay from './DiaryListDay';
import { Diary } from '@type/diary';

const DiaryMain = ({ connectState, setConnectState }) => {
  const isTextAreaOpen = useRecoilValue(diarywriteState);
  const clickedDiaryDate = useRecoilValue(clickedDiaryDateState);
  const [diaryList, setDiaryList] = useState([]);

  const yyyymmdd = clickedDiaryDate.substring(0, 10);
  const year = yyyymmdd.split('-')[0];
  const month = yyyymmdd.split('-')[1];
  const day = yyyymmdd.split('-')[2];
  const dayStr = getDayString(clickedDiaryDate);

  const { data } = useQuery(["diaries", yyyymmdd], () => getDiary(yyyymmdd));
  
  useEffect(() => {
    setDiaryList(data);
  }, [data])

  return (
    <MainContainer>
      <TextBox>
        <Title>딩딩이와 댕댕이의 일기장💘📖🖋</Title>
        <button onClick={() => setConnectState(!connectState)}>연결 상태 바꾸기 (임시 버튼)</button>
        <Date>{year}년 {month}월 {day}일 {dayStr}요일</Date>
      </TextBox>
      {isTextAreaOpen ?
      <InsideContainer>
      <DiaryTextarea />
      </InsideContainer>
       : 
      <InsideContainer2>
        <UserDiary diaryList={diaryList} />
        <PartnerDiary diaryList={diaryList} />
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
  padding: 0 0.5em;
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
