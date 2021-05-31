export const getKeyValue = <U extends keyof T, T extends object>(
  key: U,
  obj: T,
) => obj[key];

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createOneToOneChatId = (userIds: string[]) => {
  const ids = userIds.slice(0, 2).sort();
  return ids.join('-');
};
