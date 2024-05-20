import {Sport} from "@/src/models/SportModel";
import {gameFactory} from "@/src/models/GameModel";
import {Match} from "@/src/models/MatchModel";
import MatchList from "@/components/match/matchList";

export interface SportInProgressMatchListProps {
    sport: Sport
}

export default async function SportInProgressMatchList(props: SportInProgressMatchListProps) {
    //  get all games
    const games = await gameFactory().index()
    const filteredGames = games.filter((game) => game.sportId == props.sport.id)

    const matchList: Match[] = []
    for (const game of filteredGames) {
        //  get all matches
        const matches = await gameFactory().getGameMatches(game.id)
        //  filter matches that are not finished
        const inProgressMatches = matches.filter((match) => match.status == "standby" || match.status == "in_progress")

        //  sort by start time
        inProgressMatches.sort((a, b) => {
            return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        })

        //  pick the first match
        matchList.push(inProgressMatches[0])
    }

    return (
        <MatchList matches={matchList}/>
    )
}
