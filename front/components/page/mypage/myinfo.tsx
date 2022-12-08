import { UserIcon } from "@components/icons/UserIcon";
import SurveyModal from "@components/SurveyModal";
import { isSurveyModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { User } from "@type/user";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Box, Container } from "../../../styles/layout";

const MyInfo = () => {
  const userAtomData = useRecoilValue(userAtom);
  const [user, setUser] = useState<User | null>();
  const [isSurveyOpen, setIsSurveyOpen] = useRecoilState<boolean>(isSurveyModalAtom);

  useEffect(() => {
    setUser(userAtomData);
  }, [userAtomData]);

  return (
    <ContentArea>
      <InfoArea className="info">
        <UserIcon width={100} height={100} />
        <p className="nickname">{`${user?.nickname} 님`}</p>
        <p className="email">{user?.email}</p>
      </InfoArea>
      <CategoryArea>
        {user?.survey?.map((item) => (
          <Category key={item} className={item === '' ? "empty" : ""}>{item}</Category>
        ))}
      </CategoryArea>
      <Button onClick={() => setIsSurveyOpen(true)}>나의 카테고리 변경하러 가기 →</Button>
      {isSurveyOpen? <SurveyModal/> : ""}
    </ContentArea>
  );
};

const ContentArea = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 70vh;
  padding: 3rem;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 8vh 0 1em 0;
  gap: 15px;
  .nickname {
    font-size: ${props => props.theme.fontSize.textMain};
  }
  .email {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;
const CategoryArea = styled(Box)`
  flex-wrap: wrap;
  width: 20em;
`;
const Category = styled(Box)`
  padding: 0.5em 0.8em;
  background-color: ${props => props.theme.color.purpleBox};
  font-size: ${props => props.theme.fontSize.textXs};
  border-radius: 30px;
  margin: 0.3em;
  &.empty {
    display: none;
  }
`;
const Button = styled.button`
  margin: 2em;
  padding: 0.5em 1.5em;
  font-size: ${props => props.theme.fontSize.textSm};
  background: none;
  color: ${props => props.theme.color.fontMain};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
  }
`;

export default MyInfo;
