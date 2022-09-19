import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface ICollectionStore {
  list: {label: string; value: string | number}[] | null;
}

export const collectionState = atom<ICollectionStore>({
  key: 'collectionState',
  default: {
    list: null,
  },
  effects_UNSTABLE: [persistAtom],
});
