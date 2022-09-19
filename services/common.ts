import service from '@/utils/request';

// 获取collection、logo、banner

export const getCollectionDetail = () => {
  return service<any>({
    url: '/nft/v1/collection/banner',
    method: 'GET',
  });
};
