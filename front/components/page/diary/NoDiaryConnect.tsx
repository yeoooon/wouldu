import Link from "next/link";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { mypageState } from "@recoil/mypage";

const NoDiaryConnect = () => {
  const getMypageConnectTab = useSetRecoilState(mypageState);

  const clickHandle = () => {
    getMypageConnectTab((pre) => "connect");
  }

  return(
    <>
      <Link href={"/mypage"}>
        <p onClick={clickHandle}>연결하러 가기</p>
      </Link>
    </>
  )
}

export default NoDiaryConnect;