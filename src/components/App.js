import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.js";
import EatsPage from "./EatsPage.js";
import RidesPage from "./RidesPage.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="eats/" element={<EatsPage />} />
          <Route path="rides/" element={<RidesPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

const theme = createTheme({
  typography: {
    fontFamily: ["Manrope"].join(","),

    fontSize: 16,

    button: {
      textTransform: "none",
    },
  },

  input: {
    color: "white",
  },

  palette: {
    primary: {
      main: "#24248f",
    },

    secondary: {
      main: "#00b300",
    },

    tertiary: {
      main: "#004d00",
    },

    black: {
      main: "#0d0d0d",
      light: "#404040",
    },

    white: {
      main: "#ffffff",
    },

    darkgreen: {
      main: "#004d00",
    },

    background: {
      main: "#e6e6e6",
      eighty: "#cccccc",
      seventy: "#b3b3b3",
      sixty: "#999999",
      fifty: "#808080",
      forty: "#666666",
      thirty: "#4d4d4d",
      twenty: "#333333",
      ten: "#1a1a1a",
      transparent: "#ffffff00",
      white: "#ffffff",
    },

    text: {
      white: "#ffffff",
      gray: "#bfbfbf",
      darkgray: "#808080",
      black: "#0d0d0d",
    },
  },
});
