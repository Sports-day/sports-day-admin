import CardBackground from "@/components/layout/cardBackground";
import {Stack, Grid, Link, Typography, Breadcrumbs} from "@mui/material";
import CardList from "@/components/layout/cardList";
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";

export default async function GamePage({params}: { params: { gameId:string, id: string } }) {
    const gameId = parseInt(params.gameId, 10)
    const game = await gameFactory().show(gameId)
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)

    return(
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl:2}}>
                <Link underline="hover" color="inherit" href="/">
                    管理者のダッシュボード
                </Link>
                <Link underline="hover" color="inherit" href={"/sports"}>
                    競技管理
                </Link>
                <Link underline="hover" color="inherit" href={`/sports/${sport.id}`}>
                    {sport.name}
                </Link>
                <Typography color="text.primary">{game.name}(ID:{gameId})</Typography>
            </Breadcrumbs>
            <CardBackground title={`${game.name}のリーグ表`}>
            </CardBackground>
            <CardBackground title={`${game.name}の進行中の試合`}>
                <Grid container>
                    <CardList sport={"a"} league={"a"} judge={"a"} left={"a"} right={"a"} time={"11:11"} location={"a"}/>
                </Grid>
            </CardBackground>
        </Stack>
    )
}