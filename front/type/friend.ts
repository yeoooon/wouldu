export type requestType = "send" | "receive";

export interface MatchCodeFormValue {
  code1: string;
  code2: string;
  code3: string;
  // code4: string;
  // code5: string;
  // code6: string;
}

export interface ReceiveFriend {
  id: string;
  fromUserId: string;
  toUserId: string;
  requestProgress: number;
  createdAt?: Date;
  // updateAt?: Date;
}
