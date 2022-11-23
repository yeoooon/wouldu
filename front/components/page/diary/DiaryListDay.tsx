import { Box } from '@styles/layout';
import React from 'react'
import styled from 'styled-components'

const DiaryListDay = () => {
  return (
    <DateBox>
      <Date1>MON</Date1>
      <Date2>01</Date2>
    </DateBox>
  );
};

const DateBox = styled(Box)`
  width: 3.2em;
  height: 3.5em;
  background-color: ${props => props.theme.color.purpleBox};
  border-radius: 0;
  flex-direction: column;
  color: #222222;
  margin: 0 1.3em;
`;

const Date1 = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  padding: 0.1em;
`;
const Date2 = styled(Date1)`
  font-size: ${props => props.theme.fontSize.textLg};
  font-weight: bold;
`;

export default DiaryListDay;

