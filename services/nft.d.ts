export interface MintNftProps {
  mint_num: number;
}
export interface MintDataResponse {
  compose_price?: number;
  current_mint_num?: number;
  magic_potion_amount?: number;
  mint_amount?: number;
  mint_total?: number;
  user_mint_num?: number;
}

export interface LazyMintNftProps {
  contract_address: string;
  token_id: string;
  img: string;
  name: string;
  price: number;
  expiration_time: number;
  issue: number;
  attachment: string;
  auth_content_id: number[];
}
