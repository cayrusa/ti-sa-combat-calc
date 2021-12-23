import { blue, yellow } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

const headerColor = blue[400];

export const theme: Theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: yellow[800],
        },
        background: {},
        text: {
            primary: "#ffffff",
            secondary: "#888",
        },
    },
    typography: {
        fontFamily: "Quicksand,sans-serif",
        h1: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
            textTransform: "uppercase",
        },
        h2: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
            textTransform: "uppercase",
        },
        h3: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
            textTransform: "uppercase",
        },
        h4: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
            textTransform: "uppercase",
        },
        h5: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
            textTransform: "uppercase",
        },
        h6: {
            fontFamily: "Orbitron,sans-serif",
            color: headerColor,
            textTransform: "uppercase",
        },
    },
});

console.log(theme);
