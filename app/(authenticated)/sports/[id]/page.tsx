import CardBackground from "@/components/layout/cardBackground";
import {Stack, Grid, Link, Typography, Breadcrumbs} from "@mui/material";
import {sportFactory} from "@/src/models/SportModel";
import SportEditor from "@/components/sports/sportEditor";
import LeagueList from "@/components/sports/leagueList";
import {gameFactory} from "@/src/models/GameModel";
import SportInProgressMatchList from "@/components/match/sportInProgressMatchList";
import NextLink from "next/link";

export default async function SportPage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const games = await gameFactory().index()
    const filteredGames = games
        .filter((game) => game.sportId == sportId)
        .filter((game) => game.type === "league")

    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    component={NextLink}
                >
                    管理者のダッシュボード
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={"/sports"}
                    component={NextLink}
                >
                    競技管理
                </Link>
                <Typography color="text.primary">{sport.name}</Typography>
            </Breadcrumbs>
            <CardBackground
                title={"リーグ一覧"}
                button={"リーグを作成"}
                link={`/sports/${sport.id}/create-league`}
            >
                <Grid container spacing={1}>
                    <LeagueList games={filteredGames} sportId={sportId}/>
                </Grid>
            </CardBackground>
            <CardBackground title={`${sport.name}`}>
                <SportEditor sport={sport}/>
            </CardBackground>
            <CardBackground title={`${sport.name}の進行中の試合`} button={"一括編集(Cross Game)"}
                            link={`/sports/${sportId}/automatic-match-editor`}>
                <SportInProgressMatchList sport={sport}/>
            </CardBackground>
        </Stack>
    )
}