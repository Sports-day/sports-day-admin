import type {Metadata} from 'next'
import {Noto_Sans_JP} from 'next/font/google'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {CssBaseline, ThemeProvider, Box, Stack} from "@mui/material";
import {theme} from "@/components/theme/theme"
import {Navigation} from "@/components/layout/navigation";
import ColorModeProvider from "@/components/theme/colorModeProvider";

const noto = Noto_Sans_JP({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
    title: 'Sports-day Admin',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
        <body className={noto.className}>
        <AppRouterCacheProvider>
            <ColorModeProvider>
                <CssBaseline/>
                <Box sx={{ display: 'flex' }}>
                    <Navigation/>
                    <Stack minHeight="100lvh-8" width="100%" mt={8}>
                        {children}
                    </Stack>
                </Box>
            </ColorModeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
