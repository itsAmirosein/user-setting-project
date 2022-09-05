import { Button, Grid, Icon, Link, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemDetailsProps } from "./types";
import * as i18n from "react-i18next";

function ItemDetails({ itemInfo, onDelete, onEdit, t ,mode}: ItemDetailsProps) {
  return (
    <Grid
      container
      flexDirection={i18n.getI18n().language === "en" ? "row" : "row-reverse"}
      alignItems={"center"}
      sx={{ color:   mode == "dark" ?"common.white" :'common.black'}}
    >
      <Grid item lg={8} sm={8}>
        <Grid
          container
          flexDirection={
            i18n.getI18n().language === "en" ? "row" : "row-reverse"
          }
          alignItems={"center"}
        >
          <Grid item lg={1} sm={1}>
            <Icon sx={{ display: "flex", alignItems: "center" }}>
              {itemInfo.icon && <itemInfo.icon />}
            </Icon>
          </Grid>
          <Grid item lg={3} sm={3} >
            <Typography
              sx={{
                direction: i18n.getI18n().language === "en" ? "ltr" : "rtl",
                px: i18n.getI18n().language === "en" ? 0:2,
              }}
             
            >
              {" "}
              {t(itemInfo?.type)}
            </Typography>
          </Grid>
          <Grid  item lg={1} sm={2} >
            <Typography sx={{display:'flex',alignItems:'center' ,fontSize: "12px" }}>{t("link")}</Typography>
          </Grid>
          <Grid item lg={6} sm={3} sx={{ color: "text.primary" }}>
            <Stack
              alignItems={"center"}
              sx={{ px: 1,wordBreak:'break-all' }}
              flexDirection={
                i18n.getI18n().language === "en" ? "row" : "row-reverse"
              }
            >
              <Link sx={{color:'text.primary'}} href={itemInfo?.url} target='_blank'>{itemInfo?.url}</Link>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} sm={4}>
        <Grid container justifyContent={"flex-end"}>
          <Grid item lg={6}>
            <Button
              sx={{ color: "text.primary" }}
              onClick={onEdit}
              startIcon={i18n.getI18n().language === "en" && <EditIcon />}
              endIcon={i18n.getI18n().language !== "en" && <EditIcon />}
            >
              {t("edit")}
            </Button>
          </Grid>
          <Grid item lg={6}>
            <Button
              sx={{ color: "error.main" }}
              onClick={onDelete}
              startIcon={i18n.getI18n().language === "en" && <DeleteIcon />}
              endIcon={i18n.getI18n().language !== "en" && <DeleteIcon />}
            >
              {t("delete")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ItemDetails;
