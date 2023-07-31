import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "access_token",
  storage: localStorage,
});

export const accessTokenState = atom<string>({
  key: "access_token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
