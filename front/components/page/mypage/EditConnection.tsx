import BeforeConnect from "./BeforeConnect";
import AfterConnect from "./AfterConnect";
import { useGetFriend } from "@services/utils/useGetFriend";

import Loading from "@components/Loading";

const EditConnection = () => {
  const { isConnected, friendInfo, isLoading } = useGetFriend();

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
