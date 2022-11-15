// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { GlobalStyle } from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Seo title="Hi Five"></Seo>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
