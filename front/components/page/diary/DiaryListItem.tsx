import { Box } from '@styles/layout';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DiaryListDay from './DiaryListDay';
import { useQuery } from '@tanstack/react-query';
import { getDiaries } from '../../../services/api/diary';
import { Diary } from '../../../type/diary';

const DiaryListItem = () => {
  const [diaryList, setDiaryList] = useState<Diary[] | undefined>(undefined);

  const month = '2022-11';

  const { data } = useQuery(["diaries", month], () => getDiaries(month));

  useEffect(() => {
    setDiaryList(data);
  }, [data]);

  return (
    <>
      {diaryList && diaryList.length > 0? diaryList.map(diary => (
        <ListItemBox key={diary.id}>
          <DiaryListDay content={diary.content} />
          <Text>{diary.content.length < 30 ? diary.content : diary.content.substring(0, 30) + "..."}</Text>
        </ListItemBox>
      )) : <div>작성된 일기가 없습니다.</div>}
    </>
  )
}

const ListItemBox = styled(Box)`
  width: 100%;
  height: 5em;
  border-radius: 0;
  border-bottom: 0.5px solid ${props => props.theme.color.border};
  display: grid;
  grid-template-columns: 30% 68%;
  justify-content: flex-start;
  &.active {
    background-color: rgba(142, 117, 253, 0.5);;
  }
  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
  }
`;
const Text = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 0.5em;
`;

export default DiaryListItem;
