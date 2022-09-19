import {useRouter} from 'next/router';
import {FC, memo, Children, cloneElement, ReactElement} from 'react';
import {useRecoilState} from 'recoil';

import {userState} from '@/store/user';
import {walletState} from '@/store/wallet';
import {popUpLogin} from '@/utils';

type IProps = {
  children: ReactElement | any;
};

const Auth: FC<IProps> = memo(({children}) => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const [wallet, setWallet] = useRecoilState(walletState);
  const handleAuthClick = () => {
    popUpLogin(wallet.visible);
  };
  if (user.token && window?.ethereum?.selectedAddress) {
    return children;
  }
  return Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      onClick: handleAuthClick,
    });
  });
});

Auth.displayName = 'Auth';

export default Auth;
