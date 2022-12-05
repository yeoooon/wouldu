import { useEffect, useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";
import { getFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { isConnectedFriendAtom } from "@recoil/friend";

const EditConnection = () => {
  const isConnected = useRecoilValue<boolean>(isConnectedFriendAtom);

  return <>{isConnected ? <AfterConnect></AfterConnect> : <BeforeConnect></BeforeConnect>}</>;
};

export default EditConnection;
