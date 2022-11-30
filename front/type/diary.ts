export interface Diary {
  id?: string;
  friendId?: string;
  writerId?: string;
  content: string;
  date?: any;
}

export interface DiaryProps {
  diary: Diary;
}