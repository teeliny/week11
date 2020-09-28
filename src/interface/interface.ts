export interface BodyType {
  organization: string,
  market_value: string;
  address: string;
  ceo: string;
  country: string;
  products: string[];
  employees: string[];
}


export interface SignUpType {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  user_password: string;
}

export interface SignInType {
  email: string;
  user_password: string;
}

export interface idType {
  id: string
}