import type {Metadata} from 'next'
import {Noto_Sans_JP} from 'next/font/google'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "@/components/theme/theme"
import {Navigation} from "@/components/layout/navigation";
import {Box} from "@mui/material";

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
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{ display: 'flex' }}>
                    <Navigation/>
                    {children}
                </Box>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
