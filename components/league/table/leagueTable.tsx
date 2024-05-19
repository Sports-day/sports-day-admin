import {Game, gameFactory} from "@/src/models/GameModel";
import {Sport} from "@/src/models/SportModel";
import {Stack} from "@mui/material";
import {ReactNode} from "react";
import TeamCell from "@/components/league/table/teamCell";
import SlashCell from "@/components/league/table/slashCell";
import MatchCell from "@/components/league/table/matchCell";

export type LeagueTableProps = {
    game: Game
    sport: Sport
}

export default async function LeagueTable(props: LeagueTableProps) {
    const entries = await gameFactory().getGameEntries(props.game.id)
    const matches = await gameFactory().getGameMatches(props.game.id)

    const cells: ReactNode[] = []

    //  create 2 dimensional Stack components
    //  1st dimension: rows
    //  2nd dimension: columns
    //  each cell is a LeagueTableCell component
    for (let i = 0; i < (entries.length + 1); i++) {
        const rows: ReactNode[] = []
        for (let j = 0; j < (entries.length + 1); j++) {
            if (i === 0 && j === 0) {
                //  meaningless data
                rows.push(
                    <SlashCell key={`${i}_${j}`}/>
                )
            }
            else if (i === 0 || j === 0) {
                const index = (i === 0) ? (j - 1) : (i - 1)
                const team = entries[index]

                //  Team name
                rows.push(
                    <TeamCell team={team} key={`${i}_${j}`} />
                )
            }
            else if (i === j) {
                //  meaningless match data
                rows.push(
                    <SlashCell key={`${i}_${j}`}/>
                )
            }
            else {
                const leftTeam = entries[i - 1]
                const rightTeam = entries[j - 1]

                //  find the match between leftTeam and rightTeam
                const match = matches.find(match => {
                    return (match.leftTeamId === leftTeam.id && match.rightTeamId === rightTeam.id) ||
                        (match.leftTeamId === rightTeam.id && match.rightTeamId === leftTeam.id)
                })

                if (match) {
                    //  create a LeagueTableCell component
                    rows.push(
                        <MatchCell
                            sport={props.sport}
                            game={props.game}
                            match={match}
                            teams={entries}
                            key={`${i}_${j}`}
                        />
                    )
                }
                else {
                    //  create a LeagueTableCell component
                    rows.push(
                        <SlashCell key={`${i}_${j}`}/>
                    )
                }
            }
        }
        cells.push(<Stack key={i} direction={"column"}>{rows}</Stack>)
    }


    return (
        <Stack
            spacing={0}
            direction={"row"}
        >
            {cells}
        </Stack>
    )
}
