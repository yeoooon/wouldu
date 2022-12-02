import { isSurveyModalAtom } from '@recoil/modal';
import { surveyCategories } from '@services/utils/surveyCategory';
import { Box, Container } from '@styles/layout';
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const SurveyModal = () => {
  const setIsSurveyModalOpen = useSetRecoilState(isSurveyModalAtom);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const handleAddCategory = (newCategory : string) => {
    setSelectedCategory([...selectedCategory, newCategory])
    if (selectedCategory.includes(newCategory)) {
      setSelectedCategory(selectedCategory.filter((category) => category !== newCategory))
    }
  };

  return (
    <ModalWrapper>
      <SurveyContainer>
        <Cancel onClick={() => setIsSurveyModalOpen(false)}>X</Cancel>
        <Head>
          <Title>선호하는 카테고리를 선택하세요.</Title>
          <Description>선택한 카테고리에 맞춰서 활동을 추천해드려요.</Description>
          <Description>마이페이지에서 선호하는 카테고리를 변경할 수 있습니다.</Description>
        </Head>
        <CheckList>
          {surveyCategories.map(category => 
            <CategoryButton 
              key={category.title} 
              onClick={() => handleAddCategory(category.title)}
              className={selectedCategory.includes(category.title) ? "active" : ""}
            >
              <Emoji>
                {category.emoji}
              </Emoji>
              <Category>
                {category.title} 
              </Category>
            </CategoryButton>
          )}
        </CheckList>
        <Button onClick={() => setIsSurveyModalOpen(false)}>선택 완료</Button>
      </SurveyContainer>
    </ModalWrapper>
  );
};
const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 120px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;
const SurveyContainer = styled(Container)`
  z-index: 10000;
  width: 800px;
  height: 600px;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Cancel = styled.p`
  align-self: flex-end;
  margin: 0.5em;
  cursor: pointer;
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
  height: 55%;
  /* background-color: orange; */
  flex-wrap: wrap;
`;
const CategoryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.nav};
  color: ${props => props.theme.color.fontMain};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${props => props.theme.color.border};
  border-radius: 30px;
  margin: 0.5em;
  line-height: 22px;
  letter-spacing: 0.1em;
  padding: 0.8em 1.3em;
  &:hover {
    color:${props => props.theme.color.white};
  }
  &.active {
    border: 1px solid ${props => props.theme.color.fontPoint};
    color: ${props => props.theme.color.fontPoint};
    background-color: ${props => props.theme.color.purpleBox};
    font-weight: 700;
  }
`;
const Emoji = styled.p`
  margin-right: 0.3em;
`;
const Category = styled.p``;
const Button = styled.button`
  padding: 0.6em 1.5em;
  margin: 2em;
`;

export default SurveyModal;
