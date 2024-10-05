import {Game, gameFactory} from "@/src/models/GameModel";
import {Sport} from "@/src/models/SportModel";
import {Alert, Box, Container, Stack, Typography} from "@mui/material";
import {ReactNode} from "react";
import TeamCell from "@/components/league/table/teamCell";
import SlashCell from "@/components/league/table/slashCell";
import MatchCell from "@/components/league/table/matchCell";
import TextCell from "@/components/league/table/textCell";

export type LeagueTableProps = {
    game: Game
    sport: Sport
}

export default async function LeagueTable(props: LeagueTableProps) {
    const entries = await gameFactory().getGameEntries(props.game.id)
    const matches = await gameFactory().getGameMatches(props.game.id)
    const results = await gameFactory().getLeagueResult(props.game.id)

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
            } else if (i === 0 || j === 0) {
                const index = (i === 0) ? (j - 1) : (i - 1)
                const team = entries[index]

                //  Team name
                rows.push(
                    <TeamCell team={team} key={`${i}_${j}`}/>
                )
            } else if (i === j) {
                //  meaningless match data
                rows.push(
                    <SlashCell key={`${i}_${j}`}/>
                )
            } else {
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
                } else {
                    //  create a LeagueTableCell component
                    rows.push(
                        <SlashCell key={`${i}_${j}`}/>
                    )
                }
            }
        }
        cells.push(<Stack key={i} direction={"column"}>{rows}</Stack>)
    }

    //  result section
    for (let i = 0; i < 3; i++) {
        const rows: ReactNode[] = []
        for (let j = 0; j < (entries.length + 1); j++) {
            if (j === 0) {
                if (i === 0) {
                    rows.push(
                        <TextCell text={"勝ち点率"} key={`result_header_${i}_${j}`}/>
                    )
                } else if (i === 1) {
                    if (props.game.calculationType === "total_score") {
                        rows.push(
                            <TextCell text={"総得点率"} key={`result_header_${i}_${j}`}/>
                        )
                    } else {
                        rows.push(
                            <TextCell text={"得失点率"} key={`result_header_${i}_${j}`}/>
                        )
                    }
                } else {
                    rows.push(
                        <TextCell text={"順位"} key={`result_header_${i}_${j}`}/>
                    )
                }
            } else {
                const team = entries[j - 1]
                const result = results.teams.find(result => result.teamId === team.id)

                if (!result) {
                    rows.push(
                        <TextCell text={"エラー"} key={`result_${i}_${j}`}/>
                    )
                    continue
                }

                if (i === 0) {
                    rows.push(
                        <TextCell text={result.score.toFixed(3)} key={`result_${i}_${j}`}/>
                    )
                } else if (i === 1) {
                    if (props.game.calculationType === "total_score") {
                        rows.push(
                            <TextCell text={result.goal.toFixed(3)} key={`result_${i}_${j}`}/>
                        )
                    } else {
                        rows.push(
                            <TextCell text={result.goalDiff.toFixed(3)} key={`result_${i}_${j}`}/>
                        )
                    }
                } else {
                    rows.push(
                        <TextCell text={`${result.rank.toString()} 位`} key={`result_${i}_${j}`}/>
                    )
                }
            }
        }
        cells.push(<Stack key={`result_${i}`} direction={"column"}>{rows}</Stack>)
    }


    return (
        <Stack
            spacing={2}
            direction={"column"}
        >
            {
                results.finished && (
                    <Alert
                        severity={"success"}
                    >
                        このリーグの試合は全て終了しました。
                    </Alert>
                )
            }

            {
                !results.finished && (
                    <Alert
                        severity={"error"}
                    >
                        まだ試合中です。全ての試合が終了後に結果を確認してください。
                    </Alert>
                )
            }

            <Box width={"100%"} maxWidth={"100%"} sx={{overflow:"scroll"}}>
                {/*maxWidth=1pxでなぜ動くかわからない*/}
                <Stack direction={"row"} maxWidth={"1px"}>
                    {cells}
                </Stack>
            </Box>
        </Stack>
    )
}
