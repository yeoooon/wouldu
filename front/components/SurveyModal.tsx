import { Box, Container } from '@styles/layout';
import React from 'react'
import styled from 'styled-components';

const SurveyModal = () => {
  return (
    <SurveyContainer>
      <Cancel>X</Cancel>
      <Head>
        <Title>선호하는 카테고리를 선택하세요.</Title>
        <Description>선택한 카테고리에 맞춰서 활동을 추천해드려요.</Description>
        <Description>마이페이지에서 선호하는 카테고리를 변경할 수 있습니다.</Description>
      </Head>
      <CheckList>
        Checklist
      </CheckList>
      <Button>선택 완료</Button>
    </SurveyContainer>
  );
};

const SurveyContainer = styled(Container)`
  width: 75%;
  height: 75%;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Cancel = styled.p`
  align-self: flex-end;
  margin: 0.5em;
`;
const Head = styled(Box)`
  flex-direction: column;
  margin: 1em;
`;
const Title = styled.h1`
  color: ${props => props.theme.color.fontPoint};
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.textLg};
  margin: 0.5em;
`;
const Description = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  margin: 0.1em;
`;
const CheckList = styled(Box)`
  width: 80%;
  height: 70%;
  background-color: orange;
`;
const Button = styled.button`
  padding: 0.6em 1.5em;
  margin: 2em;
`;

export default SurveyModal;
