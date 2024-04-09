import {Stack, Breadcrumbs, Button, Link, Container, Box, Typography, Card} from "@mui/material";

export default function Home() {
    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">ユーザー管理</Typography>
            </Breadcrumbs>
            <Card sx={{py:2, px:2}}>
                <Stack pb={2}　spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    <Typography>カードのタイトル</Typography>
                    <Button variant={"contained"}>カードに付属するボタン</Button>
                </Stack>
                <Typography variant={"h4"}>カードのコンテンツ</Typography>
            </Card>
            <Card sx={{py:3, px:2}}>
                <Stack pb={3}　spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    <Typography>カードのタイトル</Typography>
                    <Button variant={"contained"}>カードに付属するボタン</Button>
                </Stack>
                <Typography variant={"h4"}>カードのコンテンツ</Typography>
            </Card>
        </Stack>
    );
}
