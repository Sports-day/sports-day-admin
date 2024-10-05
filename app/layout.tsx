import type {Metadata} from 'next'
import {Noto_Sans_JP} from 'next/font/google'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {CssBaseline} from "@mui/material";
import ColorModeProvider from "@/components/theme/colorModeProvider";

const noto = Noto_Sans_JP({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
    title: 'SPORTSDAY Admin',
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
                    {children}
                </ColorModeProvider>
        </AppRouterCacheProvider>

        </body>
        </html>
    )
}
