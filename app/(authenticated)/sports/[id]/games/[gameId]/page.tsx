import CardBackground from "@/components/layout/cardBackground";
import {Stack, Link, Typography, Breadcrumbs} from "@mui/material";
import {sportFactory} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import MatchList from "@/components/match/matchList";
import LeagueTable from "@/components/league/table/leagueTable";
import {tagFactory} from "@/src/models/TagModel";
import GameForm from "@/components/league/legacy/GameForm";
import {teamTagFactory} from "@/src/models/TeamTagModel";
import {teamFactory} from "@/src/models/TeamModel";
import {GameEntryList} from "@/components/league/legacy/GameEntryList";
import AddGameEntryDialog from "@/components/league/legacy/AddGameEntryDialog";
import AddGameEntryAutomation from "@/components/league/legacy/AddGameEntryAutomation";

export default async function GamePage({params}: { params: { gameId: string, id: string } }) {
    const gameId = parseInt(params.gameId, 10)
    const game = await gameFactory().show(gameId)
    const sportId = parseInt(params.id, 10)
    const sport = await sportFactory().show(sportId)
    const matchList = await gameFactory().getGameMatches(gameId)
    const tags = await tagFactory().index()

    //  この突貫工事は修正してください。
    const gameEntryTeams = await gameFactory().getGameEntries(gameId)
    const teamTags = await teamTagFactory().index()
    const linkedTeamTag = teamTags.find((teamTag) => teamTag.sportId === sport.id)
    const teams = await teamFactory().index()
    const filteredTeams = linkedTeamTag ? teams
            .filter((team) => team.teamTagId === linkedTeamTag.id)
            .filter((team) => team.enteredGameIds.length === 0)
        : []


    return (
        <Stack spacing={1} mx={2} my={3}>
            <Breadcrumbs aria-label="breadcrumb" sx={{pl: 2}}>
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
            <CardBackground title={`${game.name}を編集`}>
                <GameForm
                    formType={"edit"}
                    sportId={sportId}
                    game={game}
                    tags={tags}
                />
            </CardBackground>
            <CardBackground title={`${game.name}のエントリー`}>
                <Stack
                    spacing={2}
                >
                    <GameEntryList
                        game={game}
                        entries={gameEntryTeams}
                    />
                    <AddGameEntryDialog
                        game={game}
                        teams={filteredTeams}
                        entries={gameEntryTeams}
                    />
                    <AddGameEntryAutomation
                        game={game}
                        teams={filteredTeams}
                        entries={gameEntryTeams}
                    />
                </Stack>
            </CardBackground>
            <CardBackground title={`${game.name}のリーグ表`} button={"試合を再生成"}
                            link={`/sports/${sportId}/games/${gameId}/generate-league-matches`}>
                <LeagueTable game={game} sport={sport}/>
            </CardBackground>
            <CardBackground title={`${game.name}試合一覧`} button={"一括変更"}
                            link={`/sports/${sportId}/games/${gameId}/automatic-match-editor`}>
                <MatchList
                    matches={matchList}
                />
            </CardBackground>
        </Stack>
    )
}