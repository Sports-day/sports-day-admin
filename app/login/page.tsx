'use client'
import {Button, Stack, Typography} from "@mui/material";
import LoginButton from "@/components/auth/LoginButton";
import Image from "next/image";
import Widerlogo from "@/public/logo/widerlogotype.svg";

export default function Login() {
    return (
        <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" sx={{background:"radial-gradient(ellipse at left, #5F6DC2, #3E4EB3)"}}>
            <Stack justifyContent="center" alignItems="center" spacing={1.5}>
                <Image src={"/logo/logo_admin.png"} height={"24"} width={"302"} alt={"SPORTSDAY Admin"}/>
                <Typography pb={3} fontSize={"14px"} fontWeight={"600"} color={"#EFF0F8"}>球技大会の進行管理アプリケーション</Typography>
                <LoginButton/>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{borderRadius: "10px", py:1.5, width:"100%", backgroundColor: "#5F6DC2", color: "#EFF0F8"}}
                    disableElevation
                >
                    プライバシーポリシー
                </Button>
                <Typography fontSize={"13px"} fontWeight={"400"} color={"#99a5d6"}>SPORTSDAYを使うにはCookieが必要です</Typography>
                <Stack direction={"row"} spacing={0.5}>
                    <Typography fontWeight={"600"} color={"#99a5d6"}>(C)2024</Typography>
                    <Widerlogo width={80*1.5} height={13*1.5} fill={'#99a5d6'}/>
                </Stack>
            </Stack>
        </Stack>
    );
}
