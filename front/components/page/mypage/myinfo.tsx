import { userAtom } from "@recoil/user";
import { User } from "@type/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Box, Container } from "../../../styles/layout";

const MyInfo = () => {
  const userAtomData = useRecoilValue(userAtom);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(userAtomData);
  }, []);
  return (
    <ContentArea>
      <InfoArea className="info">
        <Image src="/icon/user.svg" alt="user" width={100} height={100} />
        <p className="nickname">{`${user?.nickname} 님`}</p>
        <p className="email">{user?.email}</p>
      </InfoArea>
      <CategoryArea>
        <Category>운동</Category>
        <Category>운동</Category>
      </CategoryArea>
      {/* <Button>카테고리 변경하기</Button> */}
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
  width: 100%;
  margin: 3em 0 1em 0;
  gap: 15px;
  .nickname {
    font-size: ${props => props.theme.fontSize.textMain};
  }
  .email {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;
const CategoryArea = styled(Box)`
`;
const Category = styled(Box)`
  padding: 0.5em 0.8em;
  background-color: ${props => props.theme.color.purpleBox};
  font-size: ${props => props.theme.fontSize.textSm};
  border-radius: 30px;
`;
const Button = styled.button`
`;

export default MyInfo;
