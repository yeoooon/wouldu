export type requestType = "send" | "receive";

export type FCodeType = "code1" | "code2" | "code3" | "code4" | "code5" | "code6";
export type MatchCodeFormValue = { [K in FCodeType]: string };
// export interface MatchCodeFormValue {
//   code1: string;
//   code2: string;
//   code3: string;
//   code4: string;
//   code5: string;
//   code6: string;
// }

export interface ReceiveFriend {
  id: number;
  fromUserId: string;
  toUserId?: string;
  requestProgress?: number;
  createdAt?: Date;
  // updateAt?: Date;
}

//백엔드에서 친구 데이터 받는 형식
export interface Friend {
  toUserId: string;
  fromUserId: string;
  fromUser: {
    nickname: string;
  };
  title: string;
  createdAt: Date;
}

//리코일에 프론트에서 원하는데로 바꾸기 위함.
export interface FriendInfo {
  id: string;
  nickname: string;
  title: string;
  createdAt: Date;
}
