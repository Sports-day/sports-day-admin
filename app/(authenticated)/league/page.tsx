import {Stack, Grid, Typography, Link, Breadcrumbs} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import {sportFactory} from "@/src/models/SportModel";
import LeagueSportsList from "@/components/league/leagueSportsList";


export default async function LeaguePage() {
    const sports = await sportFactory().index()
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">リーグ管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"どの競技のリーグを管理しますか？"}>
                <Grid container spacing={1}>
                    <LeagueSportsList sports={sports}/>
                </Grid>
            </CardBackground>
        </Stack>
    );
}
