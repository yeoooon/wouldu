import { FriendInfo } from "@type/friend";
import { atom } from "recoil";

export const isCodeModalAtom = atom<boolean>({
  key: "isCodeModal",
  default: false,
});
