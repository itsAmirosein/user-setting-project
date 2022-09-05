import { PaletteMode, ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/system";
import Helvetica from '../font/Helvetica.ttf'
import Yekan from '../font/Yekan.ttf'

export const getTheme:(mode:PaletteMode)=>ThemeOptions = (mode: PaletteMode) => ({
  shape:{
    borderRadius:15
  },
  typography: {
    fontFamily:[`Yekan`,`Helvetica`,'Arial'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Yekan';
          font-style: normal;
          font-weight: 400;
          src:  url(${Yekan}) ;
        }
        @font-face {
          font-family: 'Helvetica';
          font-style: normal;
          font-weight: 400;
          src:  url(${Helvetica}) ;
        }
      `,
    },
  },
    palette: {
      mode,
      ...(mode === 'dark'
      ? {
            // palette values for dark mode
            primary: {
                main:'#161B25'
            },
            secondary:{
              dark:'#212B35',
              main:'#343D48',
                light:'#3E4751'
            },
            common:{
              black:'#000000',
              white:'#FFFFFF'
            },
            text: {
              primary: '#FFA82E',
              secondary: '#79838E',
              disabled:'#888E94'
            },
            action:{
              disabled:'#555D66'
            },
            error:{
              main:'#E94044'
            }
          }
        : {
          // palette values for light mode
          primary: {
              main:'#FFFFFF'
          },
            secondary:{
              dark:'#FFFFFF',
              main:'#F4F6F8'
            },
            common:{
              black:'#000000',
              white:'#FFFFFF'
            },
            text: {
              primary: '#FFA82E',
              secondary: '#DDDDE0',
            },
            error:{
              main:'#E94044'
            }
          }),
    },
  });
  