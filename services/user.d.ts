export interface NonceParams {
  address: string;
}

export interface LoginParams {
  address: string;
  signature: string;
}

export interface GetUserNftParams {
  OnlyCapsid: 1 | 0; // 1是，0否
}

export interface GetNftDetailParams {
  type: string; // wings / other
  token_id: string;
}
