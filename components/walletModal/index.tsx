import {NextRouter, useRouter} from 'next/router';
import {FC, memo, useContext, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {WalletContainer} from './styles';

import {Loading} from '@/components';
import {Web3Context, useSigner, useEthersUtils} from '@/ethers-react';
import {getNonce, onLogin} from '@/services/user';
import {userState} from '@/store/user';
import {walletState} from '@/store/wallet';
import {Modal, SvgIcon} from '@/uikit';
import {Event, EventTypes, IMessageType, showTip} from '@/utils';

type IProps = {
  show?: boolean;
  mask?: boolean;
  onClose?: () => void;
};

export const WalletModal: FC<IProps> = memo(({show, onClose, mask}) => {
  const router: NextRouter = useRouter();
  const {account, connectMetaMask, onChangeAccount} = useContext(Web3Context);
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState<boolean>(false);
  const {getSignMessage} = useSigner();
  const {getHashId} = useEthersUtils();
  const [wallet, setWallet] = useRecoilState(walletState);
  const [showWallet, setShowWallet] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('x-token');
    if (account) {
      if (!token || !user.token || (user.account && user.account !== account)) {
        onLoginRequest(account);
      }
    }
  }, [account]);

  const resetUserInfo = () => {
    localStorage.removeItem('x-token');
    setUser({
      id: null,
      token: null,
      account: null,
      img: null,
      name: null,
    });
    setWallet({visible: true});
  };

  useEffect(() => {
    onChangeAccount((accounts: string[]) => {
      if (!accounts.length) {
        resetUserInfo();
      }
    });

    if (!window?.ethereum?.selectedAddress) {
      resetUserInfo();
    }

    const onMessage = (status: boolean) => {
      setShowWallet(status);
    };
    Event.addListener(EventTypes.LoginModel, onMessage);
    return () => {
      Event.removeListener(EventTypes.LoginModel, onMessage);
    };
  }, []);

  // 获取nonce请求
  const getNonceRequest = async (account: string) => {
    const res = await getNonce({
      address: account,
    });
    if (res.code === 200) {
      return res.data;
    }
    return null;
  };
  // 登录请求
  const onLoginRequest = async (account: string) => {
    setLoading(true);
    const nonce = await getNonceRequest(account);
    const msg = getHashId(`this is a pd1 ${nonce}`);
    let signature;
    let errorMsg;
    try {
      signature = await getSignMessage(msg);
    } catch (error: any) {
      errorMsg =
        error?.message ||
        'MetaMask Message Signature: User denied message signature.';
    }
    if (errorMsg) {
      showTip({type: IMessageType.ERROR, content: errorMsg});
      setLoading(false);
      return;
    }
    if (nonce && signature) {
      const res = await onLogin({
        address: account,
        signature,
      });
      if (res.code === 200) {
        const {token, id, img, name} = res.data;
        localStorage.setItem('x-token', res.data.token);
        setUser({
          ...user,
          id,
          token,
          account,
          img,
          name,
        });
        setWallet({visible: false});
        onClose && onClose();
        window.location.reload();
      }
    }
    setLoading(false);
  };

  // 登录
  const handleMetaMaskLoginClick = async () => {
    if (loading) {
      return;
    }
    if (!account) {
      connectMetaMask();
      return;
    }
    onLoginRequest(account);
  };
  return (
    <Modal
      background='#fff'
      borderRadius={16}
      height={398}
      mask={mask}
      style={{boxShadow: '0px 12px 36px 1px rgba(204, 204, 204, 0.3)'}}
      visible={showWallet}
      width={400}
      onClose={() => {
        onClose && onClose();
        setShowWallet(false);
      }}
    >
      <WalletContainer>
        <div className='flexWrapper'>
          <SvgIcon height={22} name='logo' width={100} />
          <h3>Welcome to NFR</h3>
        </div>
        <div className='flexWrapper'>
          <div
            className='wallet-item-box active'
            onClick={handleMetaMaskLoginClick}
          >
            <div className='right'>
              <SvgIcon height={24} name='metamask-icon' width={24} />
              <div className='left'>Metamask</div>
            </div>
            {loading && (
              <div className='loading'>
                <Loading />
              </div>
            )}
          </div>
          <div className='wallet-item-box'>
            <div className='left'>
              <SvgIcon height={24} name='wallet-connect-icon' width={24} />
              WalletConnect
            </div>
            <div className='right'>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </WalletContainer>
    </Modal>
  );
});

WalletModal.displayName = 'WalletModal';
