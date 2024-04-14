import { HttpMethod, QnaListType } from "@api/enums";
import requestHandler from "@api/request-handler";
import {
  GetCoteDiaryDetailResponse,
  GetCoteDiaryListResponse,
  GetQnaListResponse,
  GetQnaStatusResponse,
  getCoteDiaryMainResponse,
} from "@api/types";

const PATH = "/posts";

export const PostsApi = {
  postQna: async ({ id, isSecret, careerYear, isMajor, questionText }: any) => {
    const form: FormData = new FormData();
    form.append("nickname", id);
    form.append("is_secret", isSecret);
    form.append("career_year", careerYear);
    form.append("is_major", isMajor);
    form.append("question_text", questionText);
    return await requestHandler(PATH + "/qna/", { method: HttpMethod.POST, body: form });
  },

  getQnaList: async (type: string = QnaListType.ALL, id?: string) => {
    return await requestHandler<Array<GetQnaListResponse>>(PATH + `/qna?type=${type}&nickname=${id}`);
  },

  getQnaStatus: async () => {
    return await requestHandler<GetQnaStatusResponse>(PATH + `/qna/status`);
  },

  getCoteDiaryMain: async () => {
    return await requestHandler<getCoteDiaryMainResponse>(PATH + `/cote-diary/main`);
  },

  postCoteDiary: async ({
    link,
    name,
    siteName,
    incorrectType,
    category,
    timeComplexity,
    code,
    memo,
    isAgain,
  }: any) => {
    const form: FormData = new FormData();
    form.append("link", link);
    form.append("name", name);
    form.append("site_name", siteName);
    form.append("incorrect_type", incorrectType);
    form.append("category", category);
    form.append("time_complexity", timeComplexity);
    form.append("code", code);
    form.append("memo", memo);
    form.append("is_again", isAgain);
    return await requestHandler(PATH + "/cote-diary/", { method: HttpMethod.POST, body: form });
  },

  patchCoteDiary: async ({
    id,
    link,
    name,
    siteName,
    incorrectType,
    category,
    timeComplexity,
    code,
    memo,
    isAgain,
  }: any) => {
    const data = {
      link: link,
      name: name,
      site_name: siteName,
      incorrect_type: incorrectType,
      category: category,
      time_complexity: timeComplexity,
      code: code,
      memo: memo,
      is_again: isAgain,
    };
    console.log(JSON.stringify(data));
    return await requestHandler(PATH + `/cote-diary/${id}`, {
      method: HttpMethod.PATCH,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  getCoteDiaryList: async (date: string) => {
    return await requestHandler<Array<GetCoteDiaryListResponse>>(PATH + `/cote-diary?date=${date}`);
  },

  getCoteDiaryDetail: async (id: string) => {
    return await requestHandler<GetCoteDiaryDetailResponse>(PATH + `/cote-diary/${id}`);
  },

  getLinkInfo: async (link: string) => {
    return await requestHandler(PATH + `/cote-diary/link-info?link=${link}`);
  },
};
