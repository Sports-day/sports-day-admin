'use client'
import * as React from 'react'
import {AppBar, Box, Button, Drawer, IconButton, Stack, SvgIcon, Toolbar, Tooltip, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Logo from "@/public/logo/logo.svg";
import {
    HiHome,
    HiMegaphone,
    HiMiniNewspaper,
    HiUser,
    HiUserGroup,
    HiTrophy,
    HiMapPin, HiIdentification, HiMiniTag, HiPhoto, HiBars2
} from "react-icons/hi2";
import {SiGithub} from "react-icons/si";
import WiderLogo from "@/components/svg/wider";
import Link from "next/link"
import NavPrivacyPolicyDrawer from "@/components/layout/navPrivacyPolicyDrawer";
import LogoutButton from "@/components/auth/LogoutButton";


export const Navigation = () => {
    const theme = useTheme();
    const drawerWidth = 303;
    const buttonPadding = 1.3;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    }
    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    }
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <Box px={2} mt={8} sx={{overflow: 'auto'}}>
            <Stack spacing={1} py={3}>
                <Typography sx={{pl: 2.5}}>全体</Typography>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiHome/>
                        </SvgIcon>
                        <Typography>ホーム</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    disabled={true}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiMegaphone/>
                        </SvgIcon>
                        <Typography>お知らせ</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    disabled={true}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiMiniNewspaper/>
                        </SvgIcon>
                        <Typography>予定とルール</Typography>
                    </Stack>
                </Button>
            </Stack>

            <Stack spacing={1} pb={3}>
                <Typography sx={{pl: 2.5}}>スポーツ</Typography>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/sports"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiTrophy/>
                        </SvgIcon>
                        <Typography>競技</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/locations"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiMapPin/>
                        </SvgIcon>
                        <Typography>場所</Typography>
                    </Stack>
                </Button>
            </Stack>

            <Stack spacing={1} pb={3}>
                <Typography sx={{pl: 2.5}}>情報</Typography>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/users"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiUser/>
                        </SvgIcon>
                        <Typography>ユーザー</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/teams"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiUserGroup/>
                        </SvgIcon>
                        <Typography>チーム</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/roles"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiIdentification/>
                        </SvgIcon>
                        <Typography>権限</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/tags"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiMiniTag/>
                        </SvgIcon>
                        <Typography>タグ</Typography>
                    </Stack>
                </Button>
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    sx={{py: buttonPadding, width: "100%", fontWeight: "600"}}
                    component={Link}
                    href={"/images"}
                >
                    <Stack spacing={1} mx={1} width={"100%"} direction={"row"} justifyContent={"flex-start"}
                           alignItems="center">
                        <SvgIcon fontSize={"small"}>
                            <HiPhoto/>
                        </SvgIcon>
                        <Typography>画像</Typography>
                    </Stack>
                </Button>
            </Stack>

            <Stack spacing={1} width={"100%"} direction={"row"} justifyContent={"space-around"}
                   alignItems="center">
                <LogoutButton/>
                <Tooltip title={"GitHub"} arrow>
                    <IconButton href={"https://github.com/Sports-day/sports-day-admin"} target={"_blank"}>
                        <SiGithub color={theme.palette.text.secondary}/>
                    </IconButton>
                </Tooltip>
                <NavPrivacyPolicyDrawer/>
            </Stack>
            <Stack width={"100%"} py={2} justifyContent="center" alignItems="center" direction={"row"}
                   spacing={0.5}>
                <Typography fontWeight={"600"} color={"#9aa6e5"}>(C)2024</Typography>
                <WiderLogo/>
            </Stack>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background: "rgba(62,78,179,0.2)",
                    backdropFilter: 'blur(30px)',
                    color: theme.palette.text.primary,
                }}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mx: 0, display: {sm: 'none'}}}
                    >
                        <HiBars2 color={theme.palette.text.primary}/>
                    </IconButton>
                    <Button href={"/"}>
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
                            <Logo width={16 * 8.45} height={16} fill={theme.palette.text.primary}/>
                            <Typography
                                color={"text.primary"} fontWeight={"bold"} pt={0.15}
                                sx={{textTransform: "none"}}
                            >Admin
                            </Typography>
                        </Stack>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}