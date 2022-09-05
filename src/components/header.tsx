import {
  Button,
  Grid,
  Stack,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../redux/types";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { HeaderProps } from "./types";
import * as i18n from "react-i18next";
import { actions } from "../redux/actions";

function Header({ t }: HeaderProps) {
  const { mode } = useSelector((state: InitialState) => state);
  const dispatch = useDispatch();

  function handleOnChangeLangClick(lang: "en" | "fr") {
    window.location.replace(lang === "en" ? "/en" : "/");
    document.dir = lang === "en" ? "rtl" : "ltr";
  }
  function handleOnDarkModeClick() {
    dispatch({
      type: actions.HANDLE_DARK_MODE,
      payload: mode === "dark" ? "light" : "dark",
    });
  }

  return (
    <Grid
      container
      flexDirection={i18n.getI18n().language === "en" ? "row" : "row-reverse"}
      justifyContent={"flex-start"}
      alignItems="center"
      spacing={1}
    >
      <Grid
        item
        sx={{
          fontWeight: "bold",
          color: mode == "dark" ? "common.white" : "common.black",
        }}
        xl={6}
        lg={6}
        sm={12}
        xs={12}
      >
        <Stack
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
        >
          {t("user-settings")}
        </Stack>
      </Grid>
      <Grid item xl={6} lg={6} sm={12} xs={12}>
        <Grid
          container
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
          justifyContent={"flex-end"}
        >
          <Grid item>
            <Button
              sx={{ color: "text.primary" }}
              onClick={() => handleOnChangeLangClick("en")}
            >
              {t("english")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ color: "text.secondary" }}
              onClick={() => handleOnChangeLangClick("fr")}
            >
              {t("persian")}
            </Button>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleOnDarkModeClick}
              disableRipple
              sx={{ color: "text.primary" }}
            >
              {mode === "dark" ? <LightModeIcon /> : <NightlightIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <Stack
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
        >
          <Link
            sx={{ pr: 1, color: mode == "dark" ? "text.secondary":'common.black' }}
            href="http://116.203.243.155:3082/"
          >
            {t("home")}
          </Link>
          <Link
            sx={{ pr: 1, color: mode == "dark" ? "text.secondary" :'common.black'}}
            href="http://116.203.243.155:3082/"
          >
            {t("user")}
          </Link>
          <Link sx={{ pr: 1, color:  mode == "dark" ?"text.secondary":'common.black' }} href="">
            {t("user-settings")}
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Header;
