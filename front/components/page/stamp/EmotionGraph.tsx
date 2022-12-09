import { Box } from '@styles/layout';
import React from 'react'
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { testEmotion, TestEmotionProps } from '@services/utils/testEmotion';
import { getEmojiProps } from '@services/utils/getEmoji';
import { sumMonthEmotion } from '@services/utils/sumMonthEmotion';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmotionObj = sumMonthEmotion(testEmotion);
// console.log(EmotionObj);

export const data = { 
  labels: Object.keys(EmotionObj),
  datasets: [
    {
      label: '감정',
      data: Object.values(EmotionObj),
      backgroundColor: [
        'rgba(255, 172, 204, 0.5)',
        'rgba(243, 228, 128, 0.5)',
        'rgba(249, 136, 132, 0.5)',
        'rgba(141, 148, 216, 0.5)',
        'rgba(172, 211, 169, 0.5)',
        'rgba(108, 194, 236, 0.5)',
      ],
      borderColor: [
        '#FFACCC',
        '#f3e480',
        '#f98884',
        '#8D94D8',
        '#acd3a9',
        '#6CC2EC',
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "left" as const,
    },
  },
};

const EmotionGraph = () => {
  return (
    <EmotionGraphBox>
      <Title>감정분석 그래프</Title>
      <PieBox>
        <Pie data={data} options={options}/>
      </PieBox>
    </EmotionGraphBox>
  )
};

const EmotionGraphBox = styled(Box)`
  width: 50%;
  height: 100%;
  padding: 1em;
  flex-direction: column;
  /* background-color: palegoldenrod; */
`;

const Title = styled.h1`
  /* align-self: flex-start; */
  margin-bottom: 1em;
  font-size: ${props => props.theme.fontSize.textMd};
  font-weight: 600;
`;
const PieBox = styled(Box)`
  /* background-color: rebeccapurple; */
  width: 100%;
  height: 80%;
`;

export default EmotionGraph;
