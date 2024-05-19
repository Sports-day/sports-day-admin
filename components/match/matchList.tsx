import Grid from "@mui/material/Grid";
import {Match} from "@/src/models/MatchModel";
import MatchCard from "@/components/match/matchCard";

export type MatchListProps = {
    matches: Match[]
}

export default async function MatchList(props: MatchListProps) {
    const components = props.matches.map((match) =>
        <MatchCard
            match={match}
            key={match.id}
        />
    )
    return (
        <Grid
            container
            spacing={1}
        >
            {components}
        </Grid>
    )
}