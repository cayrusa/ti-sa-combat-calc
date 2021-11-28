import { blue, yellow } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

const headerColor = blue[400];

export const theme: Theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: yellow[800],
        },
        // secondary: {
        //     main: green[500],
        // },
        background: {
            // default: "#000000",
            // paper: "#000000",
        },
        text: {
            primary: "#ffffff",
        },
    },
    typography: {
        fontFamily: "Quicksand,sans-serif",
        h1: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
        },
        h2: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
        },
        h3: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
        },
        h4: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
        },
        h5: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
        },
        h6: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
        },
    },
});

console.log(theme);
