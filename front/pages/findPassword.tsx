import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import styled from "styled-components";
import { Wrapper, Container } from "@styles/layout";
import FindPasswordForm from "@components/FindPasswordForm";
import withGetServerSideProps from "@hocs/withGetServerSideProps";

const FindPassword = () => {
  return (
    <FindWrap>
      <FindContainer>
        <FindPasswordForm></FindPasswordForm>
      </FindContainer>
    </FindWrap>
  );
}

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

export default FindPassword;

const FindWrap = styled(Wrapper)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.background};
`

const FindContainer = styled(Container)`
  width: 500px;
  background-color: ${props => props.theme.color.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;