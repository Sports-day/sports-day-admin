import {Box, Typography} from "@mui/material";
import Link from "next/link";
import {Match} from "@/src/models/MatchModel";
import {Sport} from "@/src/models/SportModel";
import {Game} from "@/src/models/GameModel";
import {Team} from "@/src/models/TeamModel";
import NextLink from "next/link";


export type MatchCellProps = {
    sport: Sport
    game: Game
    match: Match
    teams: Team[]
}

export default function MatchCell(props: MatchCellProps) {
    const leftTeam = props.teams.find(team => team.id === props.match.leftTeamId)
    const rightTeam = props.teams.find(team => team.id === props.match.rightTeamId)

    if (!leftTeam || !rightTeam) {
        return (
            <Box
                height={100}
                width={200}
                border={1}
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
                color={"text.primary"}
                bgcolor={"secondary.main"}
            >
                <Typography>
                    エラー
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            height={100}
            width={200}
            border={1}
            component={NextLink}
            href={`/sports/${props.sport.id}/games/${props.game.id}/matches/${props.match.id}`}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            color={"text.primary"}
            bgcolor={"secondary.main"}
        >
            <Typography>
                {leftTeam.name} vs {rightTeam.name}
            </Typography>
        </Box>
    )
}