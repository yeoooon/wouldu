import { userAtom } from "@recoil/user";
import { getFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";
import { Friend, FriendInfo } from "@type/friend";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const useGetFriend = () => {
  const [isConnected, setIsConnected] = useState<boolean>();

  const user = useRecoilValue(userAtom);
  const { data: friendInfo } = useQuery<Friend[]>(["friend", "info"], () => getFriend(), { staleTime: 60 * 1000 });
  const [friend, setFriend] = useState<FriendInfo>();

  useEffect(() => {
    if (friendInfo && friendInfo.length >= 1) {
      const data = friendInfo.find(info => info?.toUserId === user?.id);
      setFriend({
        id: data?.fromUserId!,
        title: data?.title!,
        createdAt: data?.createdAt!,
        nickname: data?.fromUser.nickname!,
      });
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
    console.log("getFriend", friendInfo);
  }, [friendInfo]);

  return { isConnected, data: friend };
};
