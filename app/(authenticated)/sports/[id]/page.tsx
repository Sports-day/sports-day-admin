import CardBackground from "@/components/layout/cardBackground";
import {Stack, Grid, Link, Typography, Breadcrumbs} from "@mui/material";
import {sportFactory} from "@/src/models/SportModel";
import SportEditor from "@/components/sports/sportEditor";
import LeagueList from "@/components/sports/leagueList";
import {gameFactory} from "@/src/models/GameModel";
import SportInProgressMatchList from "@/components/match/sportInProgressMatchList";

export default async function SportPage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const games = await gameFactory().index()
    const filteredGames = games.filter((game) => game.sportId == sportId)
    const gameType = filteredGames.find(game => game)?.type;

    return(
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href={"/sports"}>
                    競技管理
                </Link>
                <Typography color="text.primary">{sport.name}</Typography>
            </Breadcrumbs>
            {gameType === "league" && (
                <CardBackground title={"リーグ一覧"} button={"リーグを作成・編集"} link={`/sports/${sport.id}/create-league`}>
                    <Grid container spacing={1}>
                        <LeagueList games={filteredGames} sportId={sportId}/>
                    </Grid>
                </CardBackground>
            )}
            {gameType === "tournament" && (
                <CardBackground title={"トーナメントビュー"} button={"トーナメントを作成・編集"} link={`/sports/${sport.id}/create-tournament`}>
                    <Grid container spacing={1}>

                    </Grid>
                </CardBackground>
            )}
            <CardBackground title={`${sport.name}`}>
                <SportEditor sport={sport}/>
            </CardBackground>
            <CardBackground title={`${sport.name}の進行中の試合`}>
                <SportInProgressMatchList sport={sport}/>
            </CardBackground>
        </Stack>
    )
}