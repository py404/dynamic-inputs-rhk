import { atom } from "jotai";
import { getUniqueChannels } from "./utils";
import { Action } from "./types";

export const selectedActionsAtom = atom<Action[]>([]);
export const recommendationFlagAtom = atom(false);

export const uniqueChannelsAtom = atom((get) => {
  const selectedActions = get(selectedActionsAtom);
  return getUniqueChannels(selectedActions);
});
