'use client'
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";
import * as React from "react";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#EFF0F8",
            dark: "#3E4EB3",
            light: "#5D6DC2",
        },
        mode: 'light',
    },
});
export function Example({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}