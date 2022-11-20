// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { darkTheme, lightTheme } from "../styles/theme";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout>
        <Seo title="Hi Five"></Seo>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
