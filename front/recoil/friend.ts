import { FriendInfo } from "@type/friend";
import { atom } from "recoil";

export const isCodeModalAtom = atom<boolean>({
  key: "isCodeModal",
  default: false,
});

export const isConnectedFriendAtom = atom<boolean>({
  key: "isConnectFriend",
  default: false,
});

export const friendAtom = atom<FriendInfo | null>({
  key: "friend",
  default: null,
});
