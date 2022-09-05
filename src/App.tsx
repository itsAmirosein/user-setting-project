import {
  Alert,
  Box,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useMemo } from "react";
import Header from "./components/header";
import Main from "./components/main";
import { getTheme } from "./theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "./redux/types";
import * as i18n from "react-i18next";
import "./language";
import { changeLanguage, checkLanguage } from "./language";
import React from "react";
import { actions } from "./redux/actions";
import CloseIcon from "@mui/icons-material/Close";

const App: React.FC<any> = ({ t }) => {
  const { mode, duplicateDataError } = useSelector(
    (state: InitialState) => state
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    const language = checkLanguage();
    if (language) {
      changeLanguage(language);
    } else {
      changeLanguage("en");
    }
  }, [window.location]);
  const theme = useMemo(() => {
    return createTheme(getTheme(mode));
  }, [mode]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: actions.HANDLE_DUPLICATE_ERROR,
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        justifyContent={"center"}
        alignItems="center"
        minHeight={"100vh"}
        sx={{ bgcolor: "primary.main" }}
      >
        <Grid
          container
          width="50%"
          justifyContent={"center"}
          alignItems="center"
          spacing={5}
        >
          <Grid item xl={12} lg={12} sm={12} xs={12}>
            <Header t={t} />
          </Grid>
          <Grid item lg={12} sm={12} xs={12} xl={12}>
            <Main t={t} />
          </Grid>
        </Grid>
      </Stack>
      <Snackbar
        open={!!duplicateDataError}
        autoHideDuration={3000}
        onClose={handleClose}
        message={duplicateDataError}
        action={action}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {t(duplicateDataError)}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default i18n.withTranslation()(App);
