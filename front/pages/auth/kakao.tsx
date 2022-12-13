import { userAtom } from "@recoil/user";
// import { kakaoLogin } from "@services/api/user";
import { kakaoInit } from "@services/utils/kakaoInit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { kakaoLogin } from "@services/api/user";

const KakaoAuth = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  useEffect(() => {
    const kakao = kakaoInit();

    console.log(authCode);
    if (authCode) {
      (async () => {
        const data = await kakaoLogin(authCode as string);
      })();
    }
  }, [authCode, kakaoServerError]);

  return <></>;
};

export default KakaoAuth;
