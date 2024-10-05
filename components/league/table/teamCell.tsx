import {Box, Typography} from "@mui/material";
import {Team} from "@/src/models/TeamModel";
import Link from "next/link";
import NextLink from "next/link";


export type TeamCellProps = {
    team: Team
}

export default function TeamCell(props: TeamCellProps) {

    return (
        <Box
            height={100}
            width={200}
            border={1}
            component={NextLink}
            href={`/teams/${props.team.id}`}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            color={"text.primary"}
            bgcolor={"secondary.main"}
        >
            <Typography>
                {props.team.name}
            </Typography>
        </Box>
    )
}