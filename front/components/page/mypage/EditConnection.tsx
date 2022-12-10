import { useEffect, useState } from "react";

import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";
import { useGetFriend } from "@services/utils/useGetFriend";

import Loading from "@components/Loading";

const EditConnection = () => {
  const { isConnected, friendInfo, isLoading } = useGetFriend();
  useEffect(() => {
    console.log({ isLoading });
  }, [isLoading]);

  return !isLoading ? (
    <>
      {isConnected && <AfterConnect friend={friendInfo!}></AfterConnect>}
      {isConnected === false && <BeforeConnect></BeforeConnect>}
    </>
  ) : (
    <>
      <Loading></Loading>
    </>
  );
};

export default EditConnection;
