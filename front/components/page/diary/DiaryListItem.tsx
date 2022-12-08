import { Box } from '@styles/layout';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DiaryListDay from './DiaryListDay';
import { useQuery } from '@tanstack/react-query';
import { getDiaries } from '../../../services/api/diary';
import { MonthDiaries } from '../../../type/diary';
import { formatDate } from '@services/utils/formatDate';

import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedDiaryDateState, clickedDiaryMonthState, today } from '@recoil/diary';

const DiaryListItem = () => {
  const [diaryList, setDiaryList] = useState<Array<MonthDiaries> | undefined>(undefined);
  const [clickedDiaryDate, setClickedDiaryDate] = useRecoilState(clickedDiaryDateState);
  const todayDate = useRecoilValue(today);
  const clickedMonth = useRecoilValue(clickedDiaryMonthState);
  const [year, month] = clickedMonth.split('-');

  const getTodayMain = () => {
    setClickedDiaryDate(String(formatDate(new Date())));  
  }

  const isTodayWritten = (element: MonthDiaries) => {
    return (element.date.substring(0, 10) === todayDate);
  }

  const handleClickDate = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof Element) setClickedDiaryDate(e.currentTarget.id);
  }

  const { data } = useQuery(["diaries", year, month], () => getDiaries(clickedMonth));

  useEffect(() => {
    setDiaryList(data?.diaries);
  }, [data]);

  return (
    <>
      {diaryList && diaryList.length > 0 && diaryList.find(isTodayWritten)?
        <></>
        : 
        <WriteTodayDiaryBtn onClick={getTodayMain}>오늘 일기 쓰기</WriteTodayDiaryBtn>
      }
      
      {diaryList && diaryList.length > 0? diaryList.slice(0).reverse().map(diary => (
        <ListItemBox key={diary.id} id={diary.date} onClick={handleClickDate}>
          <DiaryListDay diary={diary} />
          <Text>{diary.content.length < 15 ? diary.content : diary.content.substring(0, 15)}</Text>
        </ListItemBox>
      )) : <TextBox>작성된 일기가 없습니다.</TextBox>}
    </>
  )
}

const WriteTodayDiaryBtn = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  color: ${props => props.theme.color.fontSub};
  text-decoration: underline;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
`

const ListItemBox = styled(Box)`
  width: 100%;
  height: 5em;
  border-radius: 0;
  border-bottom: 0.5px solid ${props => props.theme.color.border};
  display: grid;
  grid-template-columns: 30% 68%;
  justify-content: flex-start;
  &.active {
    background-color: rgba(142, 117, 253, 0.5);;
  }
  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
  }
`;
const Text = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 0.5em;
`;
const TextBox = styled(Box)`
  padding: 1.5em;
`;

export default DiaryListItem;
