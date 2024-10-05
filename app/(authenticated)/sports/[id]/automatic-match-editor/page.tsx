import CardBackground from "@/components/layout/cardBackground";
import {Stack, Link, Typography, Breadcrumbs} from "@mui/material";
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {CrossGameAutomaticMatchEditor} from "@/components/automation/CrossGameAutomaticMatchEditor";
import NextLink from "next/link";

export default async function CrossGameAutomaticMatchEditorPage({params}: { params: { id: string } }) {
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const games = await gameFactory().index()
    const filteredGames = games.filter((game) => game.sportId == sportId)

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
                    href={`/sports/${sportId}`}
                    component={NextLink}
                >
                    {sport.name}
                </Link>
                <Typography color="text.primary">一括試合編集(Cross Game)</Typography>
            </Breadcrumbs>
            <CardBackground title={"一括編集"}>
                <CrossGameAutomaticMatchEditor
                    games={filteredGames}
                />
            </CardBackground>
        </Stack>
    )
}