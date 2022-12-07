import { getFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";
import { Friend, FriendInfo } from "@type/friend";
import { useEffect, useState } from "react";

export const useGetFriend = () => {
  const [isConnected, setIsConnected] = useState<boolean>();

  const { data: friendInfo } = useQuery<Friend[]>(["friend", "info"], () => getFriend(), {
    staleTime: 60 * 1000,
  });

  const [friend, setFriend] = useState<FriendInfo>();

  useEffect(() => {
    console.log("getfriend , isConnected?", isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (friendInfo && friendInfo.length >= 1) {
      const data = friendInfo[0];
      setFriend({
        id: data?.toUserId!,
        title: data?.title!,
        createdAt: data?.createdAt!,
        nickname: data?.toUser.nickname!,
      });
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [friendInfo]);

  return { isConnected, friend };
};
