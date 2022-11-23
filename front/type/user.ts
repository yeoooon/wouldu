export const LOGIN = {
  NORMAL: "normal",
  KAKAO: "kakao",
  GOOGLE: "google",
};

export interface User {
  id: string;
  token: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface UserJoinForm extends Pick<User, "id" | "nickname" | "password" | "confirmPassword"> {}

export interface UserLoginForm extends Pick<User, "id" | "password"> {}
