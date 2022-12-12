import { Box } from '@styles/layout';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MonthDiaries } from '../../../type/diary';
import DiaryListDay from './DiaryListDay';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedDiaryDateState, clickedDiaryMonthState, today } from '@recoil/diary';
import useGetDiaries from '@services/utils/useGetDiaries';

const DiaryListItem = () => {
  const [clickedDiaryDate, setClickedDiaryDate] = useRecoilState(clickedDiaryDateState);
  const todayDate = useRecoilValue(today);
  const clickedMonth = useRecoilValue(clickedDiaryMonthState);

  const getTodayMain = () => {
    setClickedDiaryDate(todayDate);
  }

  const isTodayWritten = (element: MonthDiaries) => {
    return (element.date.substring(0, 10) === todayDate);
  }

  const handleClickDate = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof Element) setClickedDiaryDate(e.currentTarget.id);
  }

  const monthDiaryList = useGetDiaries(clickedMonth);

  useEffect(() => {
    console.log(monthDiaryList);
  }, [monthDiaryList])

  return (
    <>
      {monthDiaryList && monthDiaryList.length > 0 && monthDiaryList.find((el) => el.forEach((diary) => isTodayWritten(diary)))?
        <></>
        : 
        <WriteTodayDiaryBtn onClick={getTodayMain}>오늘 일기 쓰기</WriteTodayDiaryBtn>
      }
      
      {monthDiaryList && monthDiaryList.length > 0? monthDiaryList?.slice(0).reverse().map(diaries => (
        <ListItemBox key={diaries[0].id} id={diaries[0].date} onClick={handleClickDate}>
          <DiaryListDay diary={diaries[0]} />
          <Text>{diaries[0].content.length < 15 ? diaries[0].content : diaries[0].content.substring(0, 15)}</Text>
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
