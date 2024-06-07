import { create } from 'zustand';

export type TUser = {
  id: number;
  username: string;
  formattedName: string;
  avatar: string;
};

const defaultUsers: TUser[] = [
  {
    id: 0,
    username: 'alice',
    formattedName: 'Alice',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Kolesov_Anna_Karenina.jpg/1280px-Kolesov_Anna_Karenina.jpg',
  },
  {
    id: 1,
    username: 'bob',
    formattedName: 'Bob',
    avatar: 'https://artvee.com/saconud/Aleksei-Mikhailovich-Korin.jpg',
  },
  {
    id: 2,
    username: 'admin',
    formattedName: 'Admin',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/RepinSelfPortrait.jpg/440px-RepinSelfPortrait.jpg',
  },
];

export type TUserState = {
  users: TUser[];
  getById: (id: number) => TUser | undefined;
  getByUsername: (username: string) => TUser | undefined;
  getByFormattedName: (formattedName: string) => TUser | undefined;
  addUser: (message: TUser) => void;
  removeUser: (username: TUser) => void;
};

export const useUserStore = create<TUserState>((set, get) => ({
  users: defaultUsers,
  getById: id => get().users.find(u => u.id === id),
  getByUsername: username => get().users.find(u => u.username === username),
  getByFormattedName: formattedName =>
    get().users.find(u => u.formattedName === formattedName),
  addUser: user => set(state => ({ users: [...state.users, user] })),
  removeUser: user =>
    set(state => ({ users: state.users.filter(u => u.id !== user.id) })),
}));
