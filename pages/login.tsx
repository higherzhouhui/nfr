import type {NextPage} from 'next';

import {WalletModal} from '@/components';
import {BackGround} from '@/uikit';

const Login: NextPage = () => {
  return (
    <BackGround>
      <WalletModal show mask={false} onClose={() => {}} />
    </BackGround>
  );
};

export default Login;
