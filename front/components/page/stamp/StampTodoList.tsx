import { Box } from '@styles/layout';
import React from 'react';
import styled from 'styled-components';
import StampTodoBox from './StampTodoBox';
import Check from '/public/icon/check.svg';
import Link from "next/link";

const StampTodoList = () => {
  return (
    <StampTodoContainer>
      <HeaderBox>
        <TitleBox>
          <CheckSvg />
          <Title>오늘의 할일</Title>
        </TitleBox>
        <Link href="/planner">
          <PlannerLink>
            + 더보기
          </PlannerLink>
        </Link>
      </HeaderBox>
      <ContentBox>
        <StampTodoBox />
        <StampTodoBox />
        <StampTodoBox />
        <StampTodoBox />
      </ContentBox>
    </StampTodoContainer>
  )
};

const StampTodoContainer = styled.div`
  width: 90%;
  height: 85%;
  display: grid;
  grid-template-rows: 20% 80%;
`;
const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const TitleBox = styled(Box)`
  font-size: ${props => props.theme.fontSize.textLg};
  font-weight: 700;
`;
const CheckSvg = styled(Check)`
  margin: 0.5em;
`;
const Title = styled.p``;
const PlannerLink = styled.button`
  border-radius: ${props => props.theme.borderSize.borderMd};
  font-size: ${props => props.theme.fontSize.textXs};
  background-color: ${props =>props.theme.color.purpleBox};
  color: ${props => props.theme.color.fontMain};
  align-self: center;
`;
const ContentBox = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;
export default StampTodoList;
