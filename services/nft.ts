import {LazyMintNftProps, MintDataResponse, MintNftProps} from './nft.d';

import service from '@/utils/request';

// 获取mint后的NFT
export const getNft = () => {
  return service({
    url: '/nft/v1/mint',
    method: 'GET',
  });
};

// 获取Collections
export const getCollections = () => {
  return service({
    url: '/nft/v1/collections',
    method: 'GET',
  });
};

// 获取mint数据
export const getMintData = () => {
  return service<MintDataResponse>({
    url: '/nft/v1/mint_data',
    method: 'GET',
  });
};

// 获取mint数据
export const mintNft = (data: MintNftProps) => {
  return service({
    url: '/nft/v1/mint',
    method: 'POST',
    data,
  });
};

// lazy mint
export const lazyMintNft = (data: LazyMintNftProps) => {
  return service({
    url: '/nft/v1/mint',
    method: 'POST',
    data,
  });
};
// 获取所有minted nft列表
export const getNftList = (params: any) => {
  return service({
    url: '/nft/v1',
    method: 'GET',
    params,
  });
};

// 获取nft的详情
export const getLazyMintNftDetail = (id: number) => {
  return service({
    url: `/nft/v1/minted/${id}`,
    method: 'GET',
  });
};

export interface serachMyNftProps {
  collectionAddress: string;
  tokenId?: number;
  nftName?: string;
}
// 搜索名下的nft
export const searchMyNft = (params: serachMyNftProps) => {
  return service({
    url: `/user/v1/nfts`,
    method: 'GET',
    params,
  });
};
