import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface IStatusStore {
  list: {label: string; value: string | number}[] | null;
}

export const statusState = atom<IStatusStore>({
  key: 'statusState',
  default: {
    list: null,
  },
  effects_UNSTABLE: [persistAtom],
});
