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
  const { isConnected, friend, isLoading } = useGetFriend();
  useEffect(() => {
    console.log({ isLoading });
  }, [isLoading]);

  return !isLoading ? (
    <>
      {isConnected && <AfterConnect friend={friend!}></AfterConnect>}
      {isConnected === false && <BeforeConnect></BeforeConnect>}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default EditConnection;
