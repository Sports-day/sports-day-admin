import CardBackground from "@/components/layout/cardBackground";
import {Stack, Link, Typography, Breadcrumbs} from "@mui/material";
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {AutomaticMatchEditor} from "@/components/automation/AutomaticMatchEditor";
import NextLink from "next/link";
import {AutomaticMatchEditorForImizu} from "@/components/automation/AutomaticMatchEditorForImizu";

export default async function AutomaticMatchEditorPage({params}: { params: { gameId:string, id: string } }) {
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
                    href={`/sports/${sport.id}/games/${game.id}`}
                    component={NextLink}
                >
                    {game.name}(ID:{gameId})
                </Link>
                <Typography color="text.primary">試合一括編集</Typography>
            </Breadcrumbs>
            <CardBackground title={`試合一括編集`}>
                {/*<AutomaticMatchEditor game={game} />*/}
                <AutomaticMatchEditorForImizu game={game} />
            </CardBackground>
        </Stack>
    )
}