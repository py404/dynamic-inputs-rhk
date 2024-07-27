import { Action } from "./types";

export const getUniqueChannels = (actions: Action[]): string[] => {
  const channelsSet = new Set<string>();
  actions.forEach((action) => {
    action.channels.forEach((channel) => channelsSet.add(channel));
  });
  return Array.from(channelsSet);
};

export const convertToApiFormat = (
  dates: [string, string]
): [string, string] => {
  return dates.map((date) => date.split("T")[0]) as [string, string];
};

export const convertToUiFormat = (dates: [string, string]): [Date, Date] => {
  return dates.map((date) => new Date(date)) as [Date, Date];
};
