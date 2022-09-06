import { Grid, Card, CardContent, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "./listItem";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions";
import EnterInfo from "./enterInfo";
import { InitialState } from "../redux/types";
import { socialTypeData } from "../data";
import { MainProps } from "./types";
import * as i18n from "react-i18next";

function Main({ t }: MainProps) {
  const dispatch = useDispatch();
  const { isAddOpen,mode, listItems, socialUrl, socialType ,typeError,urlError} = useSelector(
    (state: InitialState) => state
  );

  function handleOnAddSocialClick() {
    dispatch({
      type: actions.HANDLE_ADD_POPUP_OPEN,
      payload: true,
    });
  }

  function handleOnCancelClick() {
    dispatch({
      type: actions.HANDLE_ADD_POPUP_OPEN,
      payload: false,
    });
  }

  function handleSocialType(e: any) {
    dispatch({
      type: actions.HANDLE_SOCIAL_TYPE,
      payload: socialTypeData.find((item) => e?.target?.value === item?.title)
        ?.title,
    });
  }

  function handleSocialLink(e: any) {
    dispatch({
      type: actions.HANDLE_SOCIAL_URL,
      payload: e?.target?.value,
    });
  }
  function handleTypeClear() {
    dispatch({
      type: actions.HANDLE_ADD_TYPE_CLEAR,
    });
  }

  function handleOnSubmitClick() {
    dispatch({
      type: actions.HANDLE_POST_DATA,
      payload: {
        url: socialUrl,
        type: socialType,
        icon: socialTypeData.find((item) => item.title === socialType)?.icon,
        id: listItems.length > 0 ? listItems[listItems.length - 1].id + 1 : 1,
        editedUrl: socialUrl,
        editedType: socialType,
        editMode: false,
      },
    });
  }

  return (
    <Grid
      container
      flexDirection={i18n.getI18n().language === "en" ? "row" : "row-reverse"}
    >
      <Grid item lg={12} sm={12}>
        <Card sx={{ bgcolor: "secondary.dark" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                sx={{ color:  mode == "dark" ?"text.secondary":'common.black', fontSize: "14px" }}
                item
                lg={12}
                sm={12}
              >
                <Stack
                  flexDirection={
                    i18n.getI18n().language === "en" ? "row" : "row-reverse"
                  }
                >
                  {" "}
                  {t("social")}
                </Stack>
              </Grid>
              <Grid item lg={12} sm={12}>
                <Stack
                  flexDirection={
                    i18n.getI18n().language === "en" ? "row" : "row-reverse"
                  }
                >
                <Button
                  onClick={handleOnAddSocialClick}
                  sx={{ color: "text.primary", fontSize: "13px" }}
                  startIcon={i18n.getI18n().language === "en" &&<AddIcon />}
                  endIcon={i18n.getI18n().language === "fr" &&<AddIcon />}
                >
                    {t("add-social")}
                </Button>
                  </Stack>
              </Grid>
              {isAddOpen && (
                <Grid item lg={12} sm={12}>
                  <Card sx={{ bgcolor: "secondary.main" }}>
                    <CardContent>
                      <EnterInfo
                      typeError={typeError}
                      urlError={urlError}
                      typeClear={handleTypeClear}
                        onCancel={handleOnCancelClick}
                        onSubmit={handleOnSubmitClick}
                        socialLinkChange={handleSocialLink}
                        socialTypeChange={handleSocialType}
                        socialType={socialType}
                        socialUrl={socialUrl}
                        t={t}
                        mode={mode}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {listItems.length > 0 && (
                <Grid item lg={12} sm={12}>
                  <ListItem t={t} />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Main;
