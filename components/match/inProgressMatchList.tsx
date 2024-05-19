import {gameFactory} from "@/src/models/GameModel"
import {Match, matchFactory} from "@/src/models/MatchModel"
import MatchList from "@/components/match/matchList"

export default async function InProgressMatchList() {
    //  get all games
    const games = await gameFactory().index()
    const matches = await matchFactory().index()

    const matchList: Match[] = []
    for (const game of games) {
        //  get all matches
        const filteredMatches = matches.filter((match) => match.gameId == game.id)
        //  filter matches that are not finished
        const inProgressMatches = filteredMatches.filter((match) => match.status == "standby" || match.status == "in_progress")

        //  sort by start time
        inProgressMatches.sort((a, b) => {
            return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        })

        console.log(inProgressMatches[0])

        //  pick the first match
        matchList.push(inProgressMatches[0])
    }

    return (
        <MatchList matches={matchList}/>
    )
}
