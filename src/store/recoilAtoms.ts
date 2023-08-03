import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Todo } from "../types";

const { persistAtom } = recoilPersist({
  key: "access_token",
  storage: localStorage,
});

export const accessTokenState = atom<string>({
  key: "access_token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});
