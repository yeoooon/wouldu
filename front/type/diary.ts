export interface Diary {
  id?: string;
  friendId?: string;
  authorId?: string;
  nickname?: string;
  content: string;
  date?: any;
}

export interface DiaryProps {
  diary: Diary;
}