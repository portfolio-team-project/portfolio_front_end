export interface memberItem {
  user_id: string;
  uuid: string;
  user_name: string;
  rank: string;
  cp_name: string;
  sso: string;
  email: string;
  password: string;
  status: string;
  created_date: Date;
  updated_date: Date;
  last_login: Date;
  last_login_adress: string;
  terms_agree: boolean;
  privacy_agree: boolean;
  marketing_agree: boolean;
  terms_agree_date: Date | null;
  privacy_agree_date: Date | null;
  marketing_agree_date: Date | null;
}
