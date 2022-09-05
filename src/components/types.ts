import { ReactNode } from "react";

export type ItemDetailsProps = {
  itemInfo: Item;
  onDelete: () => void;
  onEdit: () => void;
  t:any,
  mode:'dark'|'light'
};

export type HeaderProps={
    t:any
}
export type MainProps={
    t:any
}
export type ListItemProps={
    t:any
}

export type EnterInfoProps = {
  onSubmit: () => void;
  onCancel: () => void;
  socialLinkChange: (e: any) => void;
  socialTypeChange: (e: any) => void;
  socialType:string,
  socialUrl:string,
  t:any,
  mode:'dark'|'light',
  typeClear:()=>void,
  typeError?:string,
  urlError?:string
};

type Item = {
  icon: React.ElementType|undefined;
  type: string;
  url: string;
};
