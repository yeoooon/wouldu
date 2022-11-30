import { Box, Container } from '@styles/layout';
import React, { useState } from 'react';
import styled from 'styled-components';
import DiaryListItem from './DiaryListItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedDiaryDateState, clickedDiaryMonthState, today } from '@recoil/diary';
import { formatDate } from '@services/utils/formatDate';

const DiarySidebar = () => {
  const [clickedMonth, setClickedMonth] = useRecoilState(clickedDiaryMonthState);
  const [clickedDiaryDate, setClickedDiaryDate] = useRecoilState(clickedDiaryDateState);
  
  const getTodayMain = () => {
    setClickedDiaryDate(String(formatDate(new Date())));
  }

  return (
    <SidebarContainer>
      <MonthBox>
        2022년 11월
      </MonthBox>
      <button onClick={getTodayMain}>오늘 일기 쓰기</button>
      <DiaryListItem />
    </SidebarContainer>
  );
};

const SidebarContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 100%;
`;
const MonthBox = styled(Box)`
  background-color: ${props => props.theme.color.button};
  width: 100%;
  height: 2.5em;
  border-radius: 10px 10px 0 0;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.textMd};
  font-weight: 500;
  line-height: 26px;
`;

export default DiarySidebar;
