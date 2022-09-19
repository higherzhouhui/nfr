import service from '@/utils/request';

// 获取出售NFT权利
export const getIssue = () => {
  return service<any>({
    url: '/nft/v1/issue',
    method: 'GET',
  });
};

// 获取Collections
export const getCollections = () => {
  return service<any>({
    url: '/nft/v1/collections',
    method: 'GET',
  });
};

// 获取Status
export const getStatus = () => {
  return service<any>({
    url: '/nft/v1/status',
    method: 'GET',
  });
};
