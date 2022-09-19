import service from '@/utils/request';

// 上传文件
export const uploadFile = (data: FormData) => {
  return service({
    url: '/nft/v1/attachment',
    method: 'POST',
    data,
  });
};

// 获取阿里云上传sts
export const getSts = () => {
  return service({
    url: '/user/get-sts',
    method: 'GET',
  });
};
