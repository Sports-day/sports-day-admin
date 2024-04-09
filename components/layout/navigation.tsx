'use client'
import * as React from 'react'
import {AppBar, Box, Button, Drawer, Link, Stack, SvgIcon, Toolbar, Typography} from "@mui/material";
import Image from "next/image";
import {HiHome, HiMegaphone,　HiMiniNewspaper, HiUser, HiUserGroup, HiTableCells, HiRectangleGroup, HiTrophy} from "react-icons/hi2";
import WiderLogo from "@/components/svg/wider";

export const Navigation = () => {
    const drawerWidth = 303;

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background:"radial-gradient(ellipse at left, #4A5ABB, #3E4EB3)"
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
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box mx={2} sx={{ overflow: 'auto' }}>

                    <Stack spacing={1} py={3}>
                        <Typography sx={{pl:2.5}}>全体</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
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
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiMegaphone/>
                                </SvgIcon>
                                <Typography>お知らせを配信</Typography>
                            </Stack>
                        </Button>
                        <Button
                            disabled={true}
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiMiniNewspaper/>
                                </SvgIcon>
                                <Typography>予定とルールを管理</Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack spacing={1} pb={3}>
                        <Typography sx={{pl:2.5}}>ユーザー</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                            href={"users"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiUser/>
                                </SvgIcon>
                                <Typography>すべてのユーザーを管理</Typography>
                            </Stack>
                        </Button>
                        <Button
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                            href={"teams"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiUserGroup/>
                                </SvgIcon>
                                <Typography>チームを管理</Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack spacing={1} pb={3}>
                        <Typography sx={{pl:2.5}}>競技</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                            href={"sport"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiTrophy/>
                                </SvgIcon>
                                <Typography>競技を作成・編集</Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack spacing={1}　pb={3}>
                        <Typography sx={{pl:2.5}}>編成</Typography>
                        <Button
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                            href={"league"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiTableCells/>
                                </SvgIcon>
                                <Typography>リーグを編成・管理</Typography>
                            </Stack>
                        </Button>
                        <Button
                            variant={"contained"}
                            sx={{py:1.5, width:"100%", fontWeight: "600"}}
                            href={"tournament"}
                        >
                            <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                                <SvgIcon fontSize={"small"}>
                                    <HiRectangleGroup/>
                                </SvgIcon>
                                <Typography>トーナメントを編成・管理</Typography>
                            </Stack>
                        </Button>
                    </Stack>
                    <Stack width={"100%"} justifyContent="center" alignItems="center" direction={"row"} spacing={0.5}>
                        <Typography fontWeight={"600"} color={"#9aa6e5"}>(C)2024</Typography>
                        <WiderLogo/>
                    </Stack>
                </Box>
            </Drawer>
        </>
    )
}