import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { StylesProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Sora',
    fontSize: 20,
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 400,
    fontWeightBold: 500,

  },
  overrides: {
    MuiInputBase: {
      input: {
        color: "#dd7711",
        padding: 10,
        fontSize: '25px'
      }
    },
    MuiTableCell: {
    body: {
       fontSize: '27px',
       color: "#dd7711"
    }
  }, MuiTypography: {
    h4: {
      padding: 25
    }
  }, MuiOutlinedInput: {
    input: {
      padding: 15,
      margin: 10,
      border: '2px solid #A172F8'

    }
  },
    MuiButtonBase: {
      MuiButtonoutlined:{
        padding: 20
      }
    }


  }
})

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,

  }
})




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <React.StrictMode>
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
    <App  />
  </ThemeProvider>
 </StylesProvider>
  </React.StrictMode>
  </Router>
);


