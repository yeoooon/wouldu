import { Box } from '@styles/layout';
import React from 'react'
import styled from 'styled-components';

const EmotionGraph = () => {
  return (
    <EmotionGraphBox>
      감정분석그래프
    </EmotionGraphBox>
  )
};

const EmotionGraphBox = styled(Box)`
  width: 50%;
  height: 100%;
`;

export default EmotionGraph;
