import Head from "next/head";

export type SeoPageProps = {
  pageTitle: string;
  pageDesc: string;
};

export default function Seo({ pageTitle, pageDesc }: SeoPageProps) {
  return (
    <Head>
      <title>{pageTitle} | Hi Five</title>
      <meta property="og:title" content={pageTitle ? pageTitle : "우쥬"} key="ogtitle" />
      <meta property="og:description" content={pageDesc ? pageDesc : "교환일기 | 일정관리 "} key="ogdesc" />
    </Head>
  );
}
