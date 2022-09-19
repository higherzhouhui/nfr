import {NonceParams, LoginParams} from './user.d';

import service from '@/utils/request';

// 获取nonce
export const getNonce = (data: NonceParams) => {
  return service<string>({
    url: '/user/v1/nonce',
    method: 'POST',
    data,
  });
};

// 登录
export const onLogin = (data: LoginParams) => {
  return service<any>({
    url: '/user/v1/login',
    method: 'POST',
    data,
  });
};

// 获取用户名下的ntf
export const getUserNft = (params: any) => {
  return service({
    url: `/user/v1/nfts`,
    method: 'GET',
    params,
  });
};

// 获取名下所有minted nft列表
export const getMyANftList = (params: any) => {
  return service({
    url: '/nft/v1/minted',
    method: 'GET',
    params,
  });
};

export enum IUserRequestType {
  Nfrs = 'Pors',
  Campaign = 'Campaign',
  OwnerNfrs = 'OwnerPors',
  Participate = 'Participate',
}

// 获取用户中心页列表， Type为：Pors, Campaign, OwnerPors, Participate
export const getUserOwnedData = (type: IUserRequestType, userId: number) => {
  return service({
    url: `/user/v1/owner/${type}/${userId}`,
    method: 'GET',
  });
};

// 获取用户基本信息
export const getUserBaseInfo = (userId: number) => {
  return service({
    url: `/user/v1/${userId}`,
    method: 'GET',
  });
};

export interface updateUserInfoProps {
  img?: string;
  name?: string;
  twitter?: string;
}

// 更改用户基本信息
export const updateUserBaseInfo = (data: updateUserInfoProps) => {
  return service({
    url: `/user/v1`,
    method: 'PUT',
    data,
  });
};
