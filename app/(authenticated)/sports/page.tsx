import {Breadcrumbs, Grid, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import SportsList from "@/components/sports/sportsList";
import {sportFactory} from "@/src/models/SportModel";
import NextLink from "next/link";

export default async function SportsPage() {
    const sports = await sportFactory().index()

    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    component={NextLink}
                >
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">競技管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"競技一覧"} button={"競技を新規作成"} link={"/sports/create"}>
                <Grid container spacing={1}>
                    <SportsList sports={sports}/>
                </Grid>
            </CardBackground>
        </Stack>
    );
}
