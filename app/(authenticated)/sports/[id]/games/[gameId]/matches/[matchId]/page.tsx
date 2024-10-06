import {Stack, Link, Typography, Breadcrumbs} from "@mui/material";
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {matchFactory} from "@/src/models/MatchModel";
import MatchEditor from "@/components/match/matchEditor";
import NextLink from "next/link";

export default async function MatchPage({params}: { params: { matchId:string, gameId:string, id: string } }) {
    const matchId = parseInt(params.matchId, 10)
    const match = await matchFactory().show(matchId)
    const gameId = parseInt(params.gameId, 10)
    const game = await gameFactory().show(gameId)
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)

    return(
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
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
                <Link
                    underline="hover"
                    color="inherit"
                    href={`/sports/${sport.id}`}
                    component={NextLink}
                >
                    {sport.name}
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={`/sports/${sport.id}/games/${gameId}`}
                    component={NextLink}
                >
                    {game.name}(ID:{gameId})
                </Link>
                <Typography color="text.primary">試合(ID:{match.id})</Typography>
            </Breadcrumbs>

            <MatchEditor sport={sport} match={match} game={game}/>

        </Stack>
    )
}