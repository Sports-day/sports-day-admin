'use client'
import {createTheme} from "@mui/material";
import {createShadows} from "@/components/theme/create-shadows";

const shadows: any = createShadows();

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 360,
            md: 900,
            lg: 1200,
            xl: 1440
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#5f6dc2',
            dark: '#4a5abb',
            light: '#5f6dc2',
        },
        secondary: {
            main: '#e1e4f6',
            contrastText: '#2f3c8c',
            dark: '#afb4d3',
        },
        background: {
            paper: '#e1e4f6',
            default: '#eff0f8',
        },
        text: {
            primary: '#2f3c8c',
            secondary: '#4a5abb',
            disabled: '#7f8cd6',
        },
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 46,
                    height: 27,
                    padding: 0,
                    margin: 8,
                },
                switchBase: {
                    padding: 1,
                    '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + $track': {
                            opacity: 1,
                            border: 'none',
                        },
                    },
                },
                thumb: {
                    width: 24,
                    height: 24,
                },
                track: {
                    borderRadius: 13,
                    border: '1px solid #bdbdbd',
                    backgroundColor: '#fafafa',
                    opacity: 1,
                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },

    },
    shape: {
        borderRadius: 8,
    },
    shadows,
});