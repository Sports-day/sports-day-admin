import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";
import LeagueDnd from "@/components/league/leagueDnd";
import {sportFactory} from "@/src/models/SportModel";

export default async function LeagueTestPage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    return (
        <Stack spacing={2} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href="/league">
                    リーグ管理
                </Link>
                <Typography color="text.primary">{sport.name}</Typography>
            </Breadcrumbs>
            <CardBackground title={`${sport.name}のリーグ`}>
                <LeagueDnd sport={sport} sportId={sportId}/>
            </CardBackground>
        </Stack>
    );
}
