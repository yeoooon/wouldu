import { Box } from "@styles/layout";
import React, { useState } from "react";
import styled from "styled-components";
import { today } from "@recoil/diary";
import { useRecoilValue } from "recoil";
import { Diary } from "@type/diary";
import { useGetDiary } from "@services/utils/useGetDiary";
import { useGetFriend } from "@services/utils/useGetFriend";

const StampDiaryContent = () => {
  const { isConnected } = useGetFriend();

  const todayDate = useRecoilValue(today);
  
  const { userDiary, partnerDiary } = useGetDiary(todayDate);

  return (
    <ContentBox>
      <DiarySummary>
        <Name>나</Name>
        <Content>
            {!isConnected? <p>먼저 친구와 연결해 보세요!</p> : userDiary?.content.substring(0, 15)}
          </Content>
      </DiarySummary>
      <PartnerDiarySummary>
        <PartnerName>상대</PartnerName>
        <Content>
          {!isConnected? <p>먼저 친구와 연결해 보세요!</p> : partnerDiary?.content.substring(0, 15)}
        </Content>
      </PartnerDiarySummary>
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
