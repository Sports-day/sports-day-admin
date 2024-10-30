'use client'
import {Container, Button, Box, SwipeableDrawer, IconButton, Tooltip, BottomNavigation,} from "@mui/material";
import React from 'react';
import {HiBuildingLibrary, HiXMark} from "react-icons/hi2";
import PrivacyPolicy from "@/components/layout/privacyPolicy";
import {useTheme} from "@mui/material/styles";

const NavPrivacyPolicyDrawer = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme()

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
                    background:"${theme.palette.background.paper}",
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
                            color="primary"
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
                    <HiBuildingLibrary color={theme.palette.text.secondary}/>
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
