import { Box } from "@styles/layout";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { today } from "@recoil/diary";
import { getDiaries } from "@services/api/diary";
import { useRecoilValue } from "recoil";
import { Diary } from "@type/diary";

const StampDiaryContent = () => {
  const [todayDiary, setTodayDiary] = useState<Diary[]>();

  const todayDate = useRecoilValue(today);
  const { data } = useQuery(["diaries", todayDate], () => getDiaries(todayDate));

  const isUserDiary = (element: Diary) => {
    if (element.authorId === sessionStorage.getItem("userId")) {
      return true;
    }
  };

  const isPartnerDiary = (element: Diary) => {
    if (element.authorId !== sessionStorage.getItem("userId")) {
      return true;
    }
  };

  useEffect(() => {
    setTodayDiary(data);
  }, [data]);

  return (
    <ContentBox>
      {/* <DiarySummary>
        <Name>나</Name>
        <Content>
          {todayDiary && todayDiary?.find(isUserDiary) ? todayDiary?.find(isUserDiary).content : <p>no content</p>}
        </Content>
      </DiarySummary>
      <PartnerDiarySummary>
        <PartnerName>상대</PartnerName>
        <Content>
          {todayDiary && todayDiary.find(isPartnerDiary) ? (
            todayDiary.find(isPartnerDiary).content
          ) : (
            <p>아직 안 썼어요!</p>
          )}
        </Content>
      </PartnerDiarySummary> */}
    </ContentBox>
  );
};
const ContentBox = styled(Box)`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const DiarySummary = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  width: 100%;
  margin: 0.5em 0;
  height: 37%;
  display: grid;
  grid-template-columns: 12% 88%;
  border: 1px solid ${props => props.theme.color.borderPoint};
`;
const Name = styled(Box)`
  background-color: ${props => props.theme.color.button};
  height: 100%;
  color: ${props => props.theme.color.white};
  border-radius: 8px 0 0 8px;
`;
const Content = styled(Box)`
  height: 100%;
  justify-content: flex-start;
  padding: 1em;
`;
const PartnerDiarySummary = styled(DiarySummary)`
  background-color: ${props => props.theme.color.grayBox};
  border: 1px solid ${props => props.theme.color.border};
`;
const PartnerName = styled(Name)`
  background-color: ${props => props.theme.color.fontSub};
`;

export default StampDiaryContent;
