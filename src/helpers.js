import { v4 as uuidv4 } from "uuid";

export const generateRandomAvatar = () =>
  `https://api.adorable.io/avatars/152/${uuidv4()}.png`;
