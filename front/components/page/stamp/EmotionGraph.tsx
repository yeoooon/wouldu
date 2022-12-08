import { Box } from '@styles/layout';
import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { testEmotion, TestEmotionProps } from '@services/utils/testEmotion';
import { sumMonthEmotion } from '@services/utils/sumMonthEmotion';
import { CheckIcon } from '@components/icons/CheckIcon';
import { GraphIcon } from '@components/icons/GraphIcon';
import { useSetRecoilState } from 'recoil';
import { isEmoAnalysisAtom } from '@recoil/stamp';

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
  const setIsEmoAnalysisOpen = useSetRecoilState(isEmoAnalysisAtom);
  return (
    <EmotionGraphBox>
      <PieBox>
        <TextBox>
          <GraphIcon />
          <Title>감정분석 그래프</Title>
        </TextBox>
        <DoughnutBox onClick={() => setIsEmoAnalysisOpen(false)}>
          <Pie data={data} options={options} />
        </DoughnutBox>
      </PieBox>
    </EmotionGraphBox>
  )
};

const EmotionGraphBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: saddlebrown; */
`;
const PieBox = styled.div`
  width: 70%;
  height: 90%;
  flex-direction: column;
  /* background-color: rebeccapurple; */
`;
const DoughnutBox = styled.div`
  height: 22vh;
  /* background-color: aliceblue; */
`;
const TextBox = styled.div`
  padding: 1em;
  width: 100%;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.p`
  text-align: center;
  font-weight: 600;
  margin-left: 0.5em;
`;

export default EmotionGraph;
