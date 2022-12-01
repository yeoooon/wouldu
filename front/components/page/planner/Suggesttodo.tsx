import { Box, Container } from "@styles/layout";
import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import Check from "/public/icon/check.svg";

const Suggesttodo = () => {
  return (
    <SuggestContainer>
      <TitleBox>
        <Check />
        <Text>오늘의 추천 활동</Text>
      </TitleBox>
      <TodoItem description="감정분석을 통한 해야할일" isCompleted={0} />
    </SuggestContainer>
  );
};

const SuggestContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
`;

export const TitleBox = styled(Box)`
  justify-content: flex-start;
  align-items: center;
  padding: 1em 0;
  width: 100%;
`;
const Text = styled.p`
  margin-left: 0.3em;
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textMd};
`;

export default Suggesttodo;
