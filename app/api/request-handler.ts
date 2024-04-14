import { LocalStorage } from "@utils";

const getPoomasiAccountToken = (): string | null => {
  return LocalStorage.getItem("account_token");
};

const fetchWrapper = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const accountToken = getPoomasiAccountToken();

  if (accountToken && options.headers) {
    console.log(".");
    options.headers = {
      Authorization: accountToken,
      "Content-Type": "application/json",
    };
  } else if (accountToken) {
    options.headers = {
      Authorization: accountToken,
    };
  }

  const response = await fetch(url, options);

  return response;
};

export default async function requestHandler<T>(url: string, options?: {}): Promise<T> {
  const response = await fetchWrapper(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, options);
  if (response.ok) {
    try {
      const jsonData = await response.json();
      return jsonData as T;
    } catch (error) {
      return JSON.stringify({ response: response.status }) as T;
    }
  } else {
    throw new Error("Response not OK");
  }
}
