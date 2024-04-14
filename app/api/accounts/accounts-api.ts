import { HttpMethod, AccountType } from "@api/enums";
import requestHandler from "@api/request-handler";
import { KakaoLoginResponse, AccountListResponse } from "@api/types";

const PATH = "/accounts";

export const AccountsApi = {
  postKakaoLogin: async (idToken: string) => {
    const form: FormData = new FormData();
    form.append("id_token", idToken);
    return await requestHandler<KakaoLoginResponse>(PATH + "/kakao-login/", {
      method: HttpMethod.POST,
      body: form,
    });
  },

  getAccountList: async (type: string = AccountType.ADMIN) => {
    return await requestHandler<Array<AccountListResponse>>(PATH + `/?type=${type}`);
  },

  getAccount: async (id?: string) => {
    return await requestHandler<Array<AccountListResponse>>(PATH + `/${id}`);
  },
};
