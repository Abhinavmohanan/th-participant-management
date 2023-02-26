import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Mulish",
        fontSize: "15px",
        fontWeight: "600",
        textTransform: "none",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
