import { useEffect, useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";
import { getFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";

const EditConnection = () => {
  const [isConnectState, setIsConnectState] = useState<boolean>(true);

  // 연결 정보 받아오기 필요
  const { data } = useQuery(["friend"], () => getFriend());

  return (
    <>
      <button onClick={() => setIsConnectState(false)}>연결 전</button>
      <button onClick={() => setIsConnectState(true)}>연결 후</button>
      {isConnectState ? <AfterConnect></AfterConnect> : <BeforeConnect></BeforeConnect>}
    </>
  );
};

export default EditConnection;
