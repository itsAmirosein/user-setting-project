import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Icon,
  TextField,
  Stack,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { socialTypeData } from "../data/index";
import { useMemo } from "react";
import { EnterInfoProps } from "./types";
import * as i18n from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

function EnterInfo({
  onCancel,
  onSubmit,
  socialLinkChange,
  socialTypeChange,
  socialType,
  socialUrl,
  t,
  mode,
  typeClear,
  typeError,
  urlError,
}: EnterInfoProps) {
  const submitDisable = useMemo(() => {
    return !socialUrl || !socialType;
  }, [socialUrl, socialType]);

  return (
    <Grid container spacing={2}>
      <Grid item lg={12} sm={12}>
        <Stack
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
          sx={{
            color: mode == "dark" ? "common.white" : "common.black",
            fontSize: "12px",
          }}
        >
          {t("add-social")}
        </Stack>
      </Grid>
      <Grid item lg={12} sm={12}>
        <Grid
          container
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
          spacing={1}
        >
          <Grid item lg={4} sm={4}>
            <FormControl fullWidth error={!!typeError}>
              <InputLabel id="demo-simple-select-label">{t("type")}</InputLabel>
              <Select
                required
                endAdornment={
                  <IconButton
                    size="small"
                    disableRipple
                    onClick={typeClear}
                    sx={{ display: socialType ? "flex" : "none" }}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={t(socialType)}
                renderValue={(value) => <div>{value}</div>}
                sx={{
                  color: mode == "dark" ? "common.white" : "common.black",
                  borderRadius: 0.5,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "text.primary",
                  },
                  "& .MuiSelect-iconOutlined": {
                    display: !!socialType ? "none" : "",
                  },
                }}
                label="Type"
                onChange={socialTypeChange}
              >
                {socialTypeData.map((item) => (
                  <MenuItem
                    value={item?.title}
                    sx={{
                      display: "flex",
                      flexDirection:
                        i18n.getI18n().language === "en"
                          ? "row"
                          : "row-reverse",
                      color: mode == "dark" ? "common.white" : "common.black",
                    }}
                  >
                    <Icon sx={{ mx: 1 }}>
                      <item.icon />
                    </Icon>
                    <Typography>{t(item?.title)}</Typography>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{t(typeError)}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid right={0} item lg={8} sm={8}>
            <TextField
            error={!!urlError}
            helperText={urlError}
              required
              id="outlined-basic"
              label={t("link")}
              variant="outlined"
              value={socialUrl}
              onChange={socialLinkChange}
              fullWidth
              sx={{
                input: {
                  color: mode == "dark" ? "common.white" : "common.black",
                  borderRadius: 0.5,
                },
                "& label.Mui-focused": {
                  color: "text.primary",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "text.primary",
                  },
                },
                [`& fieldset`]: {
                  borderRadius: 0.5,
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} sm={12}>
        <Grid
          container
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
          spacing={2}
          justifyContent={"flex-end"}
        >
          <Grid item lg={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onCancel}
              sx={{
                color: "text.primary",
                borderColor: "text.primary",
                borderRadius: 0.5,
                fontSize: "10px",
              }}
            >
              {t("cancel")}
            </Button>
          </Grid>
          <Grid item lg={3}>
            <Button
              fullWidth
              disabled={submitDisable}
              sx={{
                color: "common.black",
                bgcolor: submitDisable ? "action.disabled" : "text.primary",
                borderRadius: 0.5,
                fontSize: "10px",
                "  &.Mui-disabled ": {
                  color: "text.disabled",
                },
              }}
              onClick={onSubmit}
            >
              {t("submit-social")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EnterInfo;
