import { LocalStorage } from "@utils";
import { atom } from "recoil";

export const accountTokenState = atom<string | null>({
  key: "accountTokenState",
  default: LocalStorage.getItem("account_token"),
});
