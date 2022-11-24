import { Box, Container } from '@styles/layout';
import React from 'react';
import styled from 'styled-components';
import DiaryListItem from './DiaryListItem';

const DiarySidebar = () => {
  return (
    <SidebarContainer>
      <MonthBox>
        2022년 11월
      </MonthBox>
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
