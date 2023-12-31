import { CssBaseline, ThemeProvider } from "@mui/material";
import Router from "./router/Router";
import { useContext } from "react";
import { ColorModeContext } from "./contexts/ColorModeContext/ColorModeContext";

const App = () => {
  const { theme } = useContext(ColorModeContext);

  if (theme)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    );

  return <Router />;
};

export default App;
