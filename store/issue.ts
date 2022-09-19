import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface IIssueStore {
  list: {label: string; value: string | number}[] | null;
}

export const issueState = atom<IIssueStore>({
  key: 'issueState',
  default: {
    list: null,
  },
  effects_UNSTABLE: [persistAtom],
});
