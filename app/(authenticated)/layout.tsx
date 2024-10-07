import type {Metadata} from 'next'
import {CssBaseline, Box, Stack} from "@mui/material";
import {Navigation} from "@/components/layout/navigation";

export const metadata: Metadata = {
    title: 'Sports-day Admin',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <CssBaseline/>
            <Box sx={{ display: 'flex' }}>
                <Navigation/>
                <Stack minHeight="100lvh-8" width="100%" mt={8} overflow={"scrollable"}>
                    {children}
                </Stack>
            </Box>
        </>
    )
}
