import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { formatDate } from "@services/utils/formatDate";

import { CheckIcon } from "@components/icons/CheckIcon";
import { Box, Container } from "@styles/layout";
import TodoItem from "./TodoItem";
import usePlanQuery from "@services/utils/usePlanQuery";
import { Planner } from "@type/planner";
import { dayAtom } from "@recoil/planner";

const Suggesttodo = () => {
  const [recommendTodo, setRecommendTodo] = useState<Planner | null>(null);

  const recoilDay = useRecoilValue<Date>(dayAtom);
  const day = formatDate(recoilDay);
  const { data: planData } = usePlanQuery(day);

  useEffect(() => {
    if (planData?.find((todo: Planner) => todo.isRecommended === 1)) {
      setRecommendTodo(planData?.find((todo: Planner) => todo.isRecommended === 1));
    } else {
      setRecommendTodo(null);
    }
  }, [planData]);

  return (
    <SuggestContainer>
      <TitleBox>
        <CheckIcon />
        <Text>추천 활동</Text>
      </TitleBox>
      {recommendTodo?
        <><TodoItem description={recommendTodo.description} isCompleted={0} /></>
        :
        <><p>아직 추천 활동이 없어요!</p></>
      }
      
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
