import { ReactNode } from "react";

export type InitialState = {
  mode: "dark" | "light";
  isAddOpen: boolean;
  listItems: Item[];
  socialType: string;
  socialUrl: string;
  urlError: string;
  typeError: string;
  duplicateDataError:string
};

export type Action = {
  type: string;
  payload: any;
};

export type Item = {
  id: number;
  icon: React.ElementType | undefined;
  type: string;
  url: string;
  editMode: boolean;
  editedType: string;
  editedUrl: string;
  editedIcon: React.ElementType | undefined;
  urlError: string
  typeError: string
};
