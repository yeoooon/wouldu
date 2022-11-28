export interface Diary {
  content: string;
}

export interface DiaryForm extends Pick<Diary, "content"> {}