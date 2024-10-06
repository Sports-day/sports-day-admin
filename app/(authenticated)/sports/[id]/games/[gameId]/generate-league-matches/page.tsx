import CardBackground from "@/components/layout/cardBackground";
import {Stack, Link, Typography, Breadcrumbs, Alert, Button} from "@mui/material";
import {gameFactory} from "@/src/models/GameModel";
import {sportFactory} from "@/src/models/SportModel";
import {locationFactory} from "@/src/models/LocationModel";
import MakeLeagueMatches from "@/components/automation/makeLeagueMatches";
import NextLink from "next/link";

export default async function GamePage({params}: { params: { id: string, gameId: string } }) {
    const gameId = parseInt(params.gameId, 10)
    const game = await gameFactory().show(gameId)
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const locations = await locationFactory().index()

    if (game.type !== "league") {
        return (
            <Stack spacing={1} mx={2} my={3}>
                <Alert severity="error">
                    <Typography>リーグではありません</Typography>
                </Alert>

                <Button
                    variant="contained"
                    href={`/sports/${sport.id}/games/${game.id}`}
                    component={NextLink}
                >
                    {game.name}(ID:{gameId})へ戻る
                </Button>
            </Stack>
        )
    }

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
                    href={`/sports/${sport.id}/games/${game.id}`}
                    component={NextLink}
                >
                    {game.name}(ID:{gameId})
                </Link>
                <Typography color="text.primary">リーグの試合を再生成</Typography>
            </Breadcrumbs>
            <CardBackground>
                <MakeLeagueMatches
                    game={game}
                    locations={locations}
                />
            </CardBackground>
        </Stack>
    )
}