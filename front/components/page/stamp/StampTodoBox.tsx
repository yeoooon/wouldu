import { Box } from "@styles/layout";
import { Planner } from "@type/planner";
import React from "react";
import styled from "styled-components";

const StampTodoBox = (plan: Planner) => {
  return <TodoBox>{plan.description}</TodoBox>;
};

const TodoBox = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.borderPoint};
  width: 95%;
  height: 45px;
  justify-content: flex-start;
  margin-bottom: 0.8em;
  padding: 1em 1.2em;
`;
export default StampTodoBox;