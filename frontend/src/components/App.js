import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Retro from "./Retro";
import Home from "./Home";
import Board from "./Board";
import NotFound from "./NotFound";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#2a3132",
      light: "#535a5b",
      dark: "#00090a",
      contrastText: "#fff"
    },
    secondary: {
      main: "#44777e",
      light: "#73a6ad",
      dark: "#134b52",
      contrastText: "#fff"
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Retro>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/boards/:boardId" exact component={Board} />
          <Route component={NotFound} />
        </Switch>
      </Retro>
    </Router>
  </MuiThemeProvider>
);

export default App;
