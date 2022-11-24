export const LOGIN = {
  NORMAL: "normal",
  KAKAO: "kakao",
  GOOGLE: "google",
};

export interface User {
  email: string;
  access_token: string;
  nickname: string;
  password?: string;
  confirmPassword?: string;
}

export interface UserJoinForm extends Pick<User, "email" | "nickname" | "password" | "confirmPassword"> {}

export interface UserLoginForm extends Pick<User, "email" | "password"> {}

export interface PasswordForm {
  curPassword: string;
  newPassword: string;
}
