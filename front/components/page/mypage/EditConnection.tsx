import { useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";

const EditConnection = () => {
  const [connectState, setConnectState] = useState<boolean>(true);

  // 연결 정보 받아오기 필요

  return (
    <>
      {connectState? <AfterConnect></AfterConnect> : <BeforeConnect></BeforeConnect>}
    </>
  )
}

export default EditConnection;