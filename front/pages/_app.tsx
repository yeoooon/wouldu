import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Seo title="Hi Five"></Seo>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
