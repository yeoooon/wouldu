import { userAtom } from "@recoil/user";
import { kakaoInit } from "@services/utils/kakaoInit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { kakaoLogin } from "@services/api/user";
import { useSetRecoilState } from "recoil";
import { setCookie } from "@services/utils/cookies";
import { User } from "@type/user";

const KakaoAuth = () => {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  async function kakaoRequest(authCode: string) {
    console.log("authCOde", authCode);
    const kakaoUser: User = await kakaoLogin(authCode as string);
    console.log("kakaoUser", kakaoUser);
    // localStorage.setItem("userToken", kakaoUser?.accessToken);
    setUser(prev => ({ ...prev, ...kakaoUser } as any));
    router.replace("/");
    // setCookie("userToken", kakaoUser?.accessToken);
  }

  useEffect(() => {
    // const kakao = kakaoInit();
    console.log(authCode);

    authCode && kakaoRequest(authCode as string);

    // (async () => {
    //   if (authCode) {
    //     console.log("authCOde", authCode);
    //     const kakaoUser = await kakaoLogin(authCode as string);
    //     console.log("kakaoUser", kakaoUser);
    //     setUser(kakaoUser);
    //     router.replace("/");
    //   }
    // })();
  }, [authCode]);

  return <h2>로그인 중입니다...</h2>;
};

export default KakaoAuth;
