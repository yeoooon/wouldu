export type requestType = "send" | "receive";

export type FCodeType = "code1" | "code2" | "code3" | "code4" | "code5" | "code6";
export type MatchCodeFormValue = { [K in FCodeType]: string };

export interface ReceiveFriend {
  id: number;
  fromUserId: string;
  fromUserNickname: string;
  // requestProgress?: number;
  createdAt: Date;
}

//백엔드에서 친구 데이터 받는 형식
export interface Friend {
  toUserId: string;
  toUser: {
    nickname: string;
  };
  title: string;
  createdAt: Date;
}

// 프론트에서 원하는 형태로 바꾸기 위함.
export interface FriendInfo {
  id: string;
  nickname: string;
  title: string;
  createdAt: Date;
}

export interface FriendProps {
  friend: FriendInfo;
}
