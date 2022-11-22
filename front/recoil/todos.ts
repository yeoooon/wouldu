import { Todos } from '@type/todos';
import { atom } from 'recoil';

export const todosState = atom<Todos[]>({
  key: 'todos',
  default: [],
});