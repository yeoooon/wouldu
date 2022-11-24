import { useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";

const EditConnection = () => {
  const [connectState, setConnectState] = useState<boolean>(true);

  // 연결 정보 받아오기 필요

  return (
    <>
      <button onClick={() => setConnectState(false)}>연결 전</button>
      <button onClick={() => setConnectState(true)}>연결 후</button>
      {connectState? <AfterConnect></AfterConnect> : <BeforeConnect></BeforeConnect>}
    </>
  )
}

export default EditConnection;