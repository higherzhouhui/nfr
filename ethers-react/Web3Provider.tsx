import React, {createContext, ReactNode} from 'react';

import {useMetaMask} from '@/ethers-react';

export type Props = {
  children: ReactNode;
};

export type ContextValue = {
  account: string | null;
  balance?: string | number;
  connectMetaMask: (callback?: (account: string) => void) => void;
  onChangeAccount: (callback?: (accounts: string[]) => void) => void;
};

export const Web3Context = createContext<ContextValue>({} as ContextValue);

export const Web3Provider = ({children}: Props) => {
  const {account, connectWallet, onChangeAccount} = useMetaMask();

  // Connect MetaMask
  const connectMetaMask = async (callback?: (account: string) => void) => {
    const account = await connectWallet();
    if (account) {
      callback && callback(account);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connectMetaMask,
        onChangeAccount,
        account,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
