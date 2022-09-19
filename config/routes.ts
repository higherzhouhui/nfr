import {IUserRequestType} from './../services/user';
interface CollectionProps {
  name: string;
  address: string;
}
export const RouterPath = {
  explore: () => {
    return `/explore`;
  },
  createNfr: (collections?: CollectionProps[], campaignId?: number) => {
    let url = `/createnfr`;
    if (collections && campaignId) {
      url += '?address=';
      collections.forEach((item, index) => {
        if (collections.length - 1 === index) {
          url += `${item.address}`;
        } else {
          url += `${item.address},`;
        }
      });
      url += `&campaignId=${campaignId}`;
    }
    return url;
  },
  createCampaign: () => {
    return `/createcampaign`;
  },
  nfrDetail: (id: number) => {
    return `/nfr/${id}`;
  },
  campaignDetail: (id: number) => {
    return `/campaign/${id}`;
  },
  profile: (id: number, type?: string) => {
    const ctype = type || IUserRequestType.Nfrs;
    return `/profile/${id}?type=${ctype}`;
  },
  addNfrToCampaign: (id: number) => {
    return `/addnfrtocampaign/${id}`;
  },
  tag: (tagId: number, tagName: string) => {
    return `/tag/${tagId}?tagName=${tagName}`;
  },
  search: (search: string, type: any) => {
    return `/search?type=${type}&search=${search}`;
  },
  list: (type: 'recommend' | 'newCollection' | 'published') => {
    return `/nft/list?type=${type}`;
  },
  editWorks: (uuid: string) => {
    return `/nft/edit/${uuid}`;
  },
  account: '/user/account',
};
