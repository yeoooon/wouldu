export interface UserJoinForm {
  id: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export type UserLoginForm = Omit<UserJoinForm, "nickname" | "confirmPassword">;
