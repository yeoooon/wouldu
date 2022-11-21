import { SeoPageProps } from "@components/Seo";

export default function join() {
  return (
    <>
      <div>회원가입! </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageTitle: "회원가입",
      pageDesc: "우쥬 회원가입 페이지 입니다.",
    },
  };
}
