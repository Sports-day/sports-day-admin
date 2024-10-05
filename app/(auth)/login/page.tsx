'use client'
import {Button, Stack, Typography} from "@mui/material";
import LoginButton from "@/components/auth/LoginButton";
import WiderLogo from "@/components/svg/wider";
import PrivacyPolicyDrawer from "@/components/layout/privacyPolicyDrawer";
import {useTheme} from "@mui/material/styles";
import Logo from "@/public/logo/logo.svg";
import * as React from "react";

export default function Login() {
    const theme = useTheme();
    return (
        <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" sx={{background: `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,}}>
            <Stack justifyContent="center" alignItems="center" spacing={1.5} maxWidth={"600px"} width={"100%"} px={2}>
                <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                        cursor: "pointer",
                        justifyContent: "center",
                        alignItems: "center",
                        color: theme.palette.text.primary,
                        textDecoration: "none"
                    }}
                >
                    <Logo width={18 * 8.45} height={18} fill={theme.palette.text.primary}/>
                    <Typography
                        color={"text.primary"} fontWeight={"bold"} pt={0.15}
                        fontSize={"18px"}
                        sx={{textTransform: "none"}}
                    >Admin
                    </Typography>
                </Stack>
                <Typography pb={3} fontSize={"20px"} fontWeight={"600"}>球技大会の進行管理アプリケーション</Typography>
                <LoginButton/>
                <PrivacyPolicyDrawer/>
                <Typography fontSize={"13px"} fontWeight={"400"} color={"#9aa6e5"}>SPORTSDAYを使うにはCookieが必要です</Typography>
                <Button>
                    <Stack direction={"row"} spacing={0.5}>
                        <Typography fontWeight={"600"} color={"#99a5d6"}>(C)2024</Typography>
                        <WiderLogo/>
                    </Stack>
                </Button>
            </Stack>
        </Stack>
    );
}
