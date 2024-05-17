'use client'
import * as React from 'react'
import {AppBar, Box, Button, Drawer, IconButton, Stack, SvgIcon, Toolbar, Tooltip, Typography} from "@mui/material";
import Image from "next/image";
import {
    HiHome,
    HiMegaphone,
    HiMiniNewspaper,
    HiUser,
    HiUserGroup,
    HiTableCells,
    HiRectangleGroup,
    HiTrophy,
    HiMapPin, HiIdentification
} from "react-icons/hi2";
import {SiGithub} from "react-icons/si";
import WiderLogo from "@/components/svg/wider";
import Link from  "next/link"
import NavPrivacyPolicyDrawer from "@/components/layout/navPrivacyPolicyDrawer";
import LogoutButton from "@/components/auth/LogoutButton";

export const Navigation = () => {
    const drawerWidth = 303;
    const buttonPadding = 1.3;

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background:"rgba(62,78,179,0.8)",
                    backdropFilter: 'blur(30px)',
            }}>
                <Toolbar>
                    <Link href={"/"}>
                        <Image src={"/logo/logo_admin.png"} height={"20"} width={"252"} alt={"SPORTSDAY Admin"}/>
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                PaperProps={{
                    sx: {
                        backgroundColor: "#7F8CD6",
                        color: "#fff",
                        pt:8
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Box px={2} sx={{ overflow: 'auto' }}>

                    <Stack spacing={1} py={3}>
                        <Typography sx={{pl:2.5}}>全体</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiHome/>
                                </SvgIcon>
                                <Typography>ホーム</Typography>
                            </Stack>
                        </Button>
                        <Button
                            disabled={true}
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiMegaphone/>
                                </SvgIcon>
                                <Typography>お知らせ</Typography>
                            </Stack>
                        </Button>
                        <Button
                            disabled={true}
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiMiniNewspaper/>
                                </SvgIcon>
                                <Typography>予定とルール</Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack spacing={1} pb={3}>
                        <Typography sx={{pl:2.5}}>スポーツ</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/sports"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiTrophy/>
                                </SvgIcon>
                                <Typography>競技</Typography>
                            </Stack>
                        </Button>
                        <Button
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/locations"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiMapPin/>
                                </SvgIcon>
                                <Typography>場所</Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack spacing={1} pb={3}>
                        <Typography sx={{pl:2.5}}>情報</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/users"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiUser/>
                                </SvgIcon>
                                <Typography>ユーザー</Typography>
                            </Stack>
                        </Button>
                        <Button
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/teams"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiUserGroup/>
                                </SvgIcon>
                                <Typography>チーム</Typography>
                            </Stack>
                        </Button>
                        <Button
                            variant={"contained"}
                            sx={{py:buttonPadding, width:"100%", fontWeight: "600"}}
                            component={Link}
                            href={"/roles"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiIdentification/>
                                </SvgIcon>
                                <Typography>権限</Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack spacing={1} width={"100%"} direction={"row"} justifyContent={"space-around"} alignItems="center">
                        <LogoutButton/>
                        <Tooltip title={"GitHub"} arrow>
                            <IconButton href={"https://github.com/Sports-day/sports-day-admin"} target={"_blank"}>
                                <SiGithub color={"#eff0f8"}/>
                            </IconButton>
                        </Tooltip>
                        <NavPrivacyPolicyDrawer/>
                    </Stack>
                    <Stack width={"100%"} py={2} justifyContent="center" alignItems="center" direction={"row"} spacing={0.5}>
                        <Typography fontWeight={"600"} color={"#9aa6e5"}>(C)2024</Typography>
                        <WiderLogo/>
                    </Stack>
                </Box>
            </Drawer>
        </>
    )
}