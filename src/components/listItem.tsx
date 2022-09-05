import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions";
import { InitialState } from "../redux/types";
import EnterInfo from "./enterInfo";
import ItemDetails from "./itemDetails";
import { socialTypeData } from "../data/index";
import { ListItemProps } from "./types";

function ListItem({ t }: ListItemProps): JSX.Element {
  const { listItems, mode } = useSelector((state: InitialState) => state);
  const dispatch = useDispatch();

  function handleOnDeleteClick(url: string, type: string) {
    dispatch({
      type: actions.HANDLE_ON_DELETE,
      payload: {
        url,
        type,
      },
    });
  }

  function handleOnEditCollaps(id: number, editMode: boolean) {
    dispatch({
      type: actions.HANDLE_EDIT_POPUP_OPEN,
      payload: {
        id,
        editMode,
      },
    });
  }

  function handleOnSocialLinkChange(id: number, editedUrl: string) {
    dispatch({
      type: actions.HANDLE_SELECTED_ITEM_LINK_EDIT,
      payload: {
        id,
        editedUrl,
      },
    });
  }

  function handleOnSocialTypeChange(id: number, editedType: string) {
    dispatch({
      type: actions.HANDLE_SELECTED_ITEM_TYPE_EDIT,
      payload: {
        id,
        editedType,
        icon: socialTypeData.find((item) => item.title === editedType)?.icon,
      },
    });
  }
  function handleTypeClear(id: number) {
    dispatch({
      type: actions.HANDLE_EDIT_TYPE_CLEAR,
      payload: {
        id,
      },
    });
  }

  function handleOnEditSubmitClick(id: number) {
    dispatch({
      type: actions.HANDLE_EDIT_SUBMIT,
      payload: {
        id,
      },
    });
  }

  return (
    <Grid container spacing={1} alignItems="center">
      {listItems.map((item) => (
        <Grid item lg={12} sm={12}>
          <Card sx={{ bgcolor: "secondary.main" }}>
            <CardContent>
              <ItemDetails
                mode={mode}
                itemInfo={item}
                onDelete={() => handleOnDeleteClick(item.url, item.type)}
                onEdit={() => handleOnEditCollaps(item.id, true)}
                t={t}
              />
              {item.editMode && (
                <Card sx={{ bgcolor: "secondary.light", mt: 3 }}>
                  <CardContent>
                    <EnterInfo
                      typeClear={()=>handleTypeClear(item?.id)}
                      onCancel={() => handleOnEditCollaps(item.id, false)}
                      socialLinkChange={(e) =>
                        handleOnSocialLinkChange(item.id, e?.target?.value)
                      }
                      socialTypeChange={(e) =>
                        handleOnSocialTypeChange(item.id, e?.target?.value)
                      }
                      onSubmit={() => handleOnEditSubmitClick(item.id)}
                      socialType={item.editedType}
                      socialUrl={item.editedUrl}
                      t={t}
                      mode={mode}
                    />
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ListItem;
