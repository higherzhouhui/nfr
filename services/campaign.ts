import service from '@/utils/request';

export interface BasePagination {
  pageNo: number;
  pageSize: 10;
}

// 获取campaign列表
export const getCampaignList = (params?: BasePagination) => {
  return service({
    url: '/campaign/v1',
    method: 'GET',
    params,
  });
};

// 获取campaign的详情
export const getCampaignDetail = (id: number) => {
  return service({
    url: `/campaign/v1/${id}`,
    method: 'GET',
  });
};

// 创建campaign
export interface campaignDetailProps {
  name?: string;
  expiration_date_begin?: string;
  expiration_date_end?: string;
  describe?: string;
  attachment_url?: string;
  link?: string;
  img?: string;
  mint_nfts?: number[];
  collections?: string[];
  stauts?: string;
}

export const createCampaignRequest = (data: campaignDetailProps) => {
  return service({
    url: '/campaign/v1',
    method: 'POST',
    data,
  });
};

// 更新campaign
export interface updateCampaignDetailProps extends campaignDetailProps {
  id: number;
}
export const updateCampaignRequest = (data: updateCampaignDetailProps) => {
  return service({
    url: '/campaign/v1',
    method: 'PUT',
    data,
  });
};

export const getMyCampaignNfrs = (campaign: number) => {
  return service({
    url: `/campaign/v1/nfr/${campaign}`,
    method: 'GET',
  });
};

export interface addMyCampaignNfrsProps {
  campaign_id: number;
  mint_id: number[];
}
export const deleteMyCampaignNfrs = (id: number) => {
  return service({
    url: `/campaign/v1/nfr_assoc/${id}`,
    method: 'DELETE',
  });
};

export const addMyCampaignNfrs = (data: addMyCampaignNfrsProps) => {
  return service({
    url: `/campaign/v1/nfr`,
    method: 'POST',
    data,
  });
};
