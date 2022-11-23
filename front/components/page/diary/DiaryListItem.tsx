import { Box } from '@styles/layout';
import React from 'react';
import styled from 'styled-components';
import DiaryListDay from './DiaryListDay';

const DiaryListItem = () => {
  return (
    <ListItemBox>
      <DiaryListDay />
    </ListItemBox>
  )
}

const ListItemBox = styled(Box)`
  width: 100%;
  height: 5em;
  border-radius: 0;
  border-bottom: 0.5px solid ${props => props.theme.color.border};
  justify-content: flex-start;
`;

export default DiaryListItem;
