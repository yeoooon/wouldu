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
  id: string;
  fromUserId: string;
  toUserId: string;
  requestProgress: number;
  createdAt?: Date;
  // updateAt?: Date;
}
