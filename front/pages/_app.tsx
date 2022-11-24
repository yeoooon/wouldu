// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Seo, { SeoPageProps } from "../components/Seo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { darkTheme, lightTheme } from "../styles/theme";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@components/Error";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loginStateSelector } from "../recoil/user";

export default function App({ Component, pageProps }: AppProps<SeoPageProps>) {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const { pageTitle, pageDesc } = pageProps;
  console.log(pageTitle, pageDesc);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={Error}>
        <RecoilRoot>
          <Layout>
            <Seo pageTitle={pageTitle} pageDesc={pageDesc}></Seo>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
