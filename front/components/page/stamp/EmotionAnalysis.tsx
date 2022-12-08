import { isEmoAnalysisAtom } from '@recoil/stamp';
import { colorList, emojiList } from '@services/utils/emojiList';
import { sumMonthEmotion } from '@services/utils/sumMonthEmotion';
import { testEmotion } from '@services/utils/testEmotion';
import { Box } from '@styles/layout';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

const EmotionAnalysis = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('기쁨');
  const [isEmoAnalysisOpen, setIsEmoAnalysisOpen] = useRecoilState(isEmoAnalysisAtom);
  const EmotionObj = sumMonthEmotion(testEmotion);
  const totalDays = Object.values(testEmotion).length;

  const handleClickDetail = (key: string) => {
    setIsEmoAnalysisOpen(true);
    setSelectedEmotion(key);
  };

  return (
    <EmotionAnalsisBox>
      {isEmoAnalysisOpen ?
      <EmotionDetailBox bordercolor={colorList(selectedEmotion, 0.5)}>
        <DetailContainer>
          <DetailEmotion>
            <DetailEmoji>{emojiList(selectedEmotion, 50)}</DetailEmoji>
            <DetailTitleBox>
              <DetailTitle>{selectedEmotion}</DetailTitle>  
              <EmotionDetailPercent>{Math.floor(EmotionObj[selectedEmotion]/totalDays * 100)}%</EmotionDetailPercent>
            </DetailTitleBox>    
          </DetailEmotion>
          <DetailTextBox>
            <DetailText>일기를 쓴 <span>{totalDays}</span>일 중에</DetailText>
            <DetailText><span>{selectedEmotion}</span> 감정을 느낀 날은 <span>{EmotionObj[selectedEmotion]}</span>일로 <span>{Math.floor(EmotionObj[selectedEmotion]/totalDays * 100)}%</span>입니다.</DetailText>
          </DetailTextBox>
          <ButtonBox>
            <Button onClick={() => setIsEmoAnalysisOpen(false)}>전체 감정보기 →</Button>
            <Link href="/planner">
              <Button>오늘의 추천활동 보러가기 →</Button>
            </Link>
          </ButtonBox>
        </DetailContainer>
      </EmotionDetailBox>
      :
      <EmotionCoverBox>
        {Object.entries(EmotionObj).map(([key, value]) => 
          <EmotionBox key={key} bgcolor={colorList(key, 0.2)} bordercolor={colorList(key, 1)} onClick={() => handleClickDetail(key)}>
            <Emoji>{emojiList(key, 18)}</Emoji>
            <TextBox>
              <Emotion>{key}</Emotion>
              <EmotionPercent>{Math.floor(value/totalDays * 100)}%</EmotionPercent>
            </TextBox>
          </EmotionBox>
        )}
      </EmotionCoverBox>}
    </EmotionAnalsisBox>
  )
};

const EmotionAnalsisBox = styled(Box)`
  width: 50%;
  height: 100%;
  padding: 1em;
`;
const EmotionCoverBox = styled(Box)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${props => props.theme.color.nav};
`;
const EmotionBox = styled(Box)<{bgcolor: string | null, bordercolor: string | null}>`
  justify-content: space-between;
  padding: 0.5em 0.3em 0.5em 0.3em;
  width: 90%;
  ${(props) =>
    css`
      &:hover {
        background: ${props.bgcolor};
        border: 1px solid ${props.bordercolor};
      }
    `}
`;
const Emoji = styled(Box)`
  border-radius: 0;
  width: 4em;
`;
const TextBox = styled(Box)`
  justify-content: space-between;
  width: 80%;
`;
const Emotion = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  margin-right: 0.3em;
  font-weight: 600;
`;
const EmotionPercent = styled(Emotion)`
  font-size: ${props => props.theme.fontSize.textMain};
`;
const EmotionDetailBox = styled(EmotionCoverBox)<{bordercolor: string | null}>`
  background-color: ${props => props.theme.color.nav};
  border: 2px solid ${props => props.bordercolor};
  padding: 1em 1em 0.5em 1em;
`;
const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const DetailEmotion = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const DetailEmoji = styled(Box)`
  margin-left: 5px;
`;
const DetailTitleBox = styled(Box)`
  align-items: flex-end;
`;
const DetailTitle = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  font-weight: 600;
  padding-bottom: 3px;
  padding-right: 5px;
`;
const EmotionDetailPercent = styled.p`
  font-size: 35px;
`;
const DetailTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DetailText = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 3px;
  span {
    font-size: ${props => props.theme.fontSize.textMd};
    font-weight: 600;
    padding: 0 3px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  padding: 0.3em 0 0 0;
  margin: 0;
  font-size: ${props => props.theme.fontSize.textXs};
  background: none;
  color: ${props => props.theme.color.fontSub};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.color.fontMain};
    background: none;
    font-weight: 700;
  }
`;
export default EmotionAnalysis;
