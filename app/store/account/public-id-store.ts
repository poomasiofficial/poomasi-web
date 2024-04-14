import { LocalStorage } from "@utils";
import { atom } from "recoil";

export const publicIdState = atom<string | null>({
  key: "publicIdState",
  default: LocalStorage.getItem("public_id"),
});
