'use client'
import {Container, Button, AppBar, Box, SwipeableDrawer, IconButton, Tooltip, BottomNavigation,} from "@mui/material";
import React from 'react';
import {HiBuildingLibrary, HiXMark} from "react-icons/hi2";
import PrivacyPolicy from "@/components/layout/privacyPolicy";

const NavPrivacyPolicyDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <>
            <BottomNavigation
                sx={{
                    position: "fixed",
                    bottom: 0, left: 0, right: 0,
                    zIndex: "128",
                    background:"rgba(62,78,179,0.8)",
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Box
                    sx={{
                        width: '100vw', height: 'auto', overflow: 'scrollable', my:1.5
                    }}
                >
                    <Container maxWidth={"xl"}>
                        <Button
                            sx={{width:"100%"}}
                            color="secondary"
                            onClick={toggleDrawer(false)}
                            aria-label="close"
                            startIcon={<HiXMark/>}
                        >
                            閉じる
                        </Button>
                    </Container>
                </Box>
            </BottomNavigation>
            <Box
                sx={{
                    width: '99vw', height: 'auto', overflow: 'scrollable', mt: 10, mb: 10
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer( false)}
            >
                <PrivacyPolicy/>
            </Box>
        </>
    );

    return (
        <>
            <Tooltip title={"プライバシーポリシー"} arrow>
                <IconButton
                    onClick={toggleDrawer(true)}
                >
                    <HiBuildingLibrary color={"text.primary"}/>
                </IconButton>
            </Tooltip>
            <SwipeableDrawer
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                anchor={"bottom"}
            >
                {DrawerList}
            </SwipeableDrawer>
        </>
    );
};

export default NavPrivacyPolicyDrawer;
