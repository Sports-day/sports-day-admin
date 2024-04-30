import {Breadcrumbs, Grid, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import {ButtonLarge} from "@/components/layout/buttonLarge";
import {sportFactory} from "@/src/models/SportModel";


export default async function SportsPage() {
    const sports = await sportFactory().index()
    sports.sort((a, b) => b.weight - a.weight);
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Typography color="text.primary">競技管理</Typography>
            </Breadcrumbs>
            <CardBackground title={"競技一覧"} button={"競技を新規作成"} link={"/sports/create"}>
                <Grid container spacing={1}>
                    {sports
                        .map((sport) => (
                        <ButtonLarge key={sport.id} img={"a"} link={`/sports/${sport.id}`}>
                            {sport.name}
                        </ButtonLarge>
                    ))}
                </Grid>
            </CardBackground>
        </Stack>
    );
}
