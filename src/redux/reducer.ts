import { Reducer } from "redux";
import { Action, InitialState } from "./types";
import { actions } from "./actions";

const initialState: InitialState = {
  mode: "dark",
  isAddOpen: false,
  listItems: [],
  socialType: "",
  socialUrl: "",
  urlError: "",
  typeError: "",
  duplicateDataError:''
};

export const reducer: Reducer<InitialState, Action> = (
  state: InitialState | undefined = initialState,
  action: Action
) => {
  return ACTIONS[action?.type]
    ? ACTIONS[action?.type](state, action.payload)
    : state;
};

const ACTIONS: any = {
  [actions.HANDLE_ADD_POPUP_OPEN]: handleAddPopupOpen,
  [actions.HANDLE_SOCIAL_TYPE]: handleSocialType,
  [actions.HANDLE_SOCIAL_URL]: handleSocialUrl,
  [actions.HANDLE_POST_DATA]: handleAddToListItems,
  [actions.HANDLE_ON_DELETE]: handleOnDelete,
  [actions.HANDLE_EDIT_POPUP_OPEN]: handleOnEditOpen,
  [actions.HANDLE_SELECTED_ITEM_LINK_EDIT]: handleOnLinkEdit,
  [actions.HANDLE_SELECTED_ITEM_TYPE_EDIT]: handleOnTypeEdit,
  [actions.HANDLE_EDIT_SUBMIT]: handleEditSubmit,
  [actions.HANDLE_DARK_MODE]: handleDarkMode,
  [actions.HANDLE_ADD_TYPE_CLEAR]: handleAddTypeClear,
  [actions.HANDLE_EDIT_TYPE_CLEAR]: handleEditTypeClear,
  [actions.HANDLE_DUPLICATE_ERROR]: handleDuplicateError,
};

function handleAddPopupOpen(state: InitialState, payload: any): InitialState {
  return { ...state, isAddOpen: payload };
}
function handleSocialType(state: InitialState, payload: any): InitialState {
  return { ...state, socialType: payload, typeError: "" };
}
function handleSocialUrl(state: InitialState, payload: any): InitialState {
  return {
    ...state,
    socialUrl: payload,
    urlError: payload ? "" : "required-field",
  };
}
function handleAddToListItems(state: InitialState, payload: any): InitialState {
  const copyListItems = [...state.listItems];
  const selectedItemIndex = copyListItems.findIndex(
    (item) => item.url === payload.url && item.type === payload.type
  );
  if (selectedItemIndex === -1) {
    copyListItems.push(payload);
  } else {
    return {
      ...state,
      duplicateDataError:'duplicate-data'
    }
  }
  return {
    ...state,
    listItems: copyListItems,
    socialUrl: "",
    socialType: "",
    isAddOpen: false,
  };
}
function handleOnDelete(state: InitialState, payload: any): InitialState {
  const filteredList = state.listItems.filter(
    (item) => item.url !== payload.url || item.type !== payload.type
  );
  return { ...state, listItems: filteredList };
}
function handleOnEditOpen(state: InitialState, payload: any): InitialState {
  const copyListItems = [...state.listItems];
  const selectedItemIndex = copyListItems.findIndex(
    (item) => item.id === payload?.id
  );
  const copyItem = { ...copyListItems[selectedItemIndex] };
  copyItem.editMode = payload.editMode;
  if (!payload.editMode) {
    copyItem.editedType = copyItem.type;
    copyItem.editedUrl = copyItem.url;
    copyItem.editedIcon = undefined;
  }
  copyListItems[selectedItemIndex] = copyItem;
  return { ...state, listItems: copyListItems };
}
function handleOnLinkEdit(state: InitialState, payload: any): InitialState {
  const copyListItems = [...state.listItems];
  const selectedItemIndex = copyListItems.findIndex(
    (item) => item.id === payload?.id
  );
  const copyItem = { ...copyListItems[selectedItemIndex] };
  copyItem.editedUrl = payload.editedUrl;
  copyListItems[selectedItemIndex] = copyItem;
  return { ...state, listItems: copyListItems };
}
function handleOnTypeEdit(state: InitialState, payload: any): InitialState {
  const copyListItems = [...state.listItems];
  const selectedItemIndex = copyListItems.findIndex(
    (item) => item.id === payload?.id
  );
  const copyItem = { ...copyListItems[selectedItemIndex] };
  copyItem.editedType = payload.editedType;
  copyItem.editedIcon = payload?.icon;
  copyListItems[selectedItemIndex] = copyItem;
  return { ...state, listItems: copyListItems };
}
function handleEditSubmit(state: InitialState, payload: any): InitialState {
  const copyListItems = [...state.listItems];
  const selectedItemIndex = copyListItems.findIndex(
    (item) => item.id === payload?.id
  );
  const copyItem = { ...copyListItems[selectedItemIndex] };
  copyItem.type = copyItem.editedType;
  copyItem.url = copyItem.editedUrl;
  copyItem.icon = copyItem?.editedIcon;
  copyItem.editMode = false;
  copyItem.editedIcon = undefined;
  copyListItems[selectedItemIndex] = copyItem;
  return { ...state, listItems: copyListItems };
}
function handleDarkMode(state: InitialState, payload: any): InitialState {
  return { ...state, mode: payload };
}
function handleAddTypeClear(state: InitialState, payload: any): InitialState {
  return { ...state, socialType: "", typeError: "required-field" };
}
function handleEditTypeClear(state: InitialState, payload: any): InitialState {
  const copyListItems = [...state.listItems];
  const selectedItemIndex = copyListItems.findIndex(
    (item) => item.id === payload?.id
  );
  const copyItem = { ...copyListItems[selectedItemIndex] };
  copyItem.editedType = "";
  copyListItems[selectedItemIndex] = copyItem;
  return { ...state, listItems: copyListItems };
}

function handleDuplicateError(state: InitialState, payload: any): InitialState {
  return { ...state, duplicateDataError:'' };
}