import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface IWalletStore {
  visible: boolean;
}

export const walletState = atom<IWalletStore>({
  key: 'walletState',
  default: {
    visible: true,
  },
  effects_UNSTABLE: [persistAtom],
});
