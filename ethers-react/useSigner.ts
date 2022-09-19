import {ethers, Signer} from 'ethers';

import {useEthersUtils} from './useEthersUtils';

export const useSigner = () => {
  const {getNetwork} = useEthersUtils();
  const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await getNetwork(provider);

    const signer: Signer = provider.getSigner();
    return signer;
  };

  // get sign message
  const getSignMessage = async (nonce: string | ethers.utils.Bytes) => {
    const signer = await getSigner();
    const signature = await signer.signMessage(nonce);
    return signature;
  };

  return {
    getSigner,
    getSignMessage,
  };
};
