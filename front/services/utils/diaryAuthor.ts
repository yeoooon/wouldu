import { userAtom } from '@recoil/user';
import { useRecoilValue } from 'recoil';
import { Diary } from '@type/diary';

export const isUserDiary = (element: Diary) => {
  const user = useRecoilValue(userAtom);
  return element.authorId === user?.id;
};

export const isPartnerDiary = (element: Diary) => {
  const user = useRecoilValue(userAtom);
  return element.authorId !== user?.id;
};