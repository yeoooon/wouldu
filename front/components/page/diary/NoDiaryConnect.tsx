import Link from "next/link";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { mypageState } from "@recoil/mypage";

const NoDiaryConnect = ({ connectState, setConnectState }) => {
  const getMypageConnectTab = useSetRecoilState(mypageState);

  const clickHandle = () => {
    getMypageConnectTab((pre) => "connect");
  }

  return(
    <>
      <Link href={"/mypage"}>
        <p onClick={clickHandle}>연결하러 가기</p>
      </Link>
      <button onClick={() => setConnectState(!connectState)}>연결 상태 바꾸기 (임시 버튼)</button>    
    </>
  )
}

export default NoDiaryConnect;