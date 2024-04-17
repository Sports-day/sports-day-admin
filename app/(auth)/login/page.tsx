import {Button, Stack, Typography} from "@mui/material";
import LoginButton from "@/components/auth/LoginButton";
import Image from "next/image";
import WiderLogo from "@/components/svg/wider";
import Link from "next/link";
import PrivacyPolicyDrawer from "@/components/layout/privacyPolicyDrawer";

export default function Login() {
    return (
        <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" sx={{background:"radial-gradient(ellipse at left, #5F6DC2, #3E4EB3)"}}>
            <Stack justifyContent="center" alignItems="center" spacing={1.5}>
                <Image src={"/logo/logo_admin.png"} height={"24"} width={"302"} alt={"SPORTSDAY Admin"}/>
                <Typography pb={3} fontSize={"14px"} fontWeight={"600"} color={"#EFF0F8"}>球技大会の進行管理アプリケーション</Typography>
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
