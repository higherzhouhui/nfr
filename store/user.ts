import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface IUserStore {
  token: string | null;
  id: number | null;
  account: number | string | null;
  img: string | null;
  name: string | null;
}

export const userState = atom<IUserStore>({
  key: 'userState',
  default: {
    token: null,
    id: null,
    account: null,
    name: null,
    img: null,
  },
  effects_UNSTABLE: [persistAtom],
});
