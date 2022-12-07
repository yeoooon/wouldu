import { useEffect, useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";
import { useRecoilValue } from "recoil";
import { userAtom } from "@recoil/user";
import { useQuery } from "@tanstack/react-query";
import { Friend, FriendInfo } from "@type/friend";
import { getFriend } from "@services/api/friend";
import { useGetFriend } from "@services/utils/useGetFriend";

const EditConnection = () => {
  const { isConnected, friend } = useGetFriend();

  return (
    <>
      {isConnected ? (
        <AfterConnect friend={friend!}></AfterConnect>
      ) : isConnected === undefined ? (
        <div></div>
      ) : (
        <BeforeConnect></BeforeConnect>
      )}
    </>
  );
};

export default EditConnection;
