import { CheckIcon } from "@components/icons/CheckIcon";
import { CircleCheckBackIcon, CircleCheckIcon } from "@components/icons/CircleIcon";
import { dayAtom } from "@recoil/planner";
import { formatDate } from "@services/utils/formatDate";
import usePlanQuery from "@services/utils/usePlanQuery";
import { Box, Container } from "@styles/layout";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { pathToFileURL } from "url";
import TodoItem from "./TodoItem";
// onClick={handleToggle}>{plan.isCompleted ? <CircleCheckIcon /> : <CircleCheckBackIcon />}
const Suggesttodo = ({ plan }: { plan: Planner | undefined }) => {
  return (
    <SuggestContainer>
      <TitleBox>
        <CheckIcon />
        <Text>추천 활동</Text>
      </TitleBox>
      <CheckBox></CheckBox>
      {plan ? <TodoItem {...plan} /> : <>추천 일정이 없습니다.</>}
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
const CheckBox = styled(Box)`
  margin: 0;
  padding: 0;
  position: absolute;
  left: -15px;
  cursor: pointer;
`;

export default Suggesttodo;
