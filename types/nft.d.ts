declare namespace GlobalNft {
  interface Nft {
    attachment: string;
    creator: string;
    expiration_time: number;
    img: string;
    issue_name: string;
    id: number;
    issue: number;
    token_id: string;
    anft_name: string;
    anft_opensea_url: string;
    nft_name: string;
    nft_opensea_url: string;
    owner: string;
    price: number;
    status: number;
    status_name: string;
    describe: string;
    creator_name: string;
    owner_name: string;
    contract_address?: string;
    name?: string;
    payment?: string;
    creator_id?: number;
    owner_id?: number;
    number_limination?: number;
  }
}
