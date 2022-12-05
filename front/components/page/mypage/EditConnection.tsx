import { useEffect, useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";
import { getFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { isConnectedFriendAtom } from "@recoil/friend";

const EditConnection = () => {
  const isConnected = useRecoilValue<boolean>(isConnectedFriendAtom);

  return (
    <>
      {/* <button onClick={() => setIsConnectState(false)}>연결 전</button>
      <button onClick={() => setIsConnectState(true)}>연결 후</button> */}
      {isConnected ? <AfterConnect></AfterConnect> : <BeforeConnect></BeforeConnect>}
    </>
  );
};

export default EditConnection;
