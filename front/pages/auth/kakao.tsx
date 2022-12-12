import { userAtom } from "@recoil/user";
// import { kakaoLogin } from "@services/api/user";
import { kakaoInit } from "@services/utils/kakaoInit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getKakaoToken, getUserFromKakao } from "@services/api/user";

const KakaoAuth = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  useEffect(() => {
    const kakao = kakaoInit();

    console.log(authCode);
    if (authCode) {
      (async () => {
        const data = await getKakaoToken(authCode as string);
        console.log("getToken이후 access_token", data);
        // const info = await getUserFromKakao(data.access_token);
        // console.log("kakao user Info!!", info);
      })();
    }
  }, [authCode, kakaoServerError]);

  return <></>;
};

export default KakaoAuth;
