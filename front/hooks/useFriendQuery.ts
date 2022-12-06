import { getFriend } from "@services/api/friend";
import { useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

const useFriendQuery = (params: string[], configOptions?: UseQueryOptions) => {
  const queryClient = useQueryClient();

  // const { data, isSuccess } = useQuery(params, () => getFriend()); // prams ['friend','info']

  // return useQuery(params, () => getFriend(), { ...configOptions });
};

// const { data: receiveFriends } = useQuery<ReceiveFriend[]>(["friend", "list"], () => checkRequestFriend("receive"));
// const { data: friendInfo } = useQuery<Friend[]>(["friend", "info"], () => getFriend());
