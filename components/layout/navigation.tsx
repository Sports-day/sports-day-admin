'use client'
import * as React from 'react'
import {AppBar, Box, Button, Drawer, Toolbar} from "@mui/material";
import Image from "next/image";

export const Navigation = () => {
    const drawerWidth = 280;

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background:"radial-gradient(ellipse at left, #4A5ABB, #3E4EB3)"
            }}>
                <Toolbar>
                    <Image src={"/logo/logo_admin.png"} height={"18"} width={"227"} alt={"SPORTSDAY Admin"}/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                PaperProps={{
                    sx: {
                        backgroundColor: "#7F8CD6",
                        color: "red",
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box mx={1} my={3} sx={{ overflow: 'auto' }}>
                    <Button
                        variant={"contained"}
                        sx={{py:1.5, width:"100%", fontWeight: "600"}}
                    >ホーム
                    </Button>
                </Box>
            </Drawer>
        </>
    )
}