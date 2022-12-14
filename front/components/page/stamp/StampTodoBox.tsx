import { Box } from "@styles/layout";
import { Planner } from "@type/planner";
import React from "react";
import styled from "styled-components";

const StampTodoBox = (plan: Planner) => {
  return (
    <TodoBox className={plan.isCompleted === 1 ? "finish" : ""}>
      <Text>{plan.description}</Text>
    </TodoBox>
  );
};

const Text = styled.p``;
const TodoBox = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.borderPoint};
  width: 95%;
  height: 5vh;
  justify-content: flex-start;
  margin-bottom: 0.8em;
  padding: 1em 1.2em;

  &.finish {
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.grayBox};
    ${Text} {
      font-style: italic;
      text-decoration: line-through;
      color: ${props => props.theme.color.fontSub};
    }
  }
`;
export default StampTodoBox;
