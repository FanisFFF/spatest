import { ReactNode } from "react";

export type DataType = {
  _id?: string;
  companySigDate: Date | string;
  postText: string;
  username: string;
};
export type TUserData = {
  username: string;
};

export type TNavBarData = { text: string; to: string; icon: ReactNode };
