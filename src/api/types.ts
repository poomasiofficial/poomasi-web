/**
 * Internal Services
 */
export interface KakaoLoginResponse {
  public_id: string
  account_token: string
}

export interface AccountListResponse {
  id: string
  name: string
  profile_image: string
  field: string
  company1: string
  job1: string
  company2: string
  job2: string
  is_vacation: boolean
}

export interface AccountResponse {
  id: string
  name: string
  profile_image: string
  field: string
  company1: string
  job1: string
  description: string
  is_vacation: boolean
}
