// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Seo, { SeoPageProps } from "../components/Seo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { darkTheme, lightTheme } from "../styles/theme";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@components/Error";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loginStateSelector } from "../recoil/user";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps<SeoPageProps>) {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const { pageTitle, pageDesc } = pageProps;

  const [queryClient] = useState(() => new QueryClient());

  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    themeCheck();
  }, [darkMode]);

  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <ErrorBoundary FallbackComponent={Error}>
              <Suspense fallback={<div>loading...</div>}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Seo pageTitle={pageTitle} pageDesc={pageDesc}></Seo>
                  <Component {...pageProps} />
                </Layout>
              </Suspense>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
