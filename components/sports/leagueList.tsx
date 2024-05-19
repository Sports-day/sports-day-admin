import {ButtonLarge} from "@/components/layout/buttonLarge";
import {Game} from "@/src/models/GameModel";

export type LeagueListProps = {
    games: Game[]
    sportId: number
}

export default function LeagueList(props: LeagueListProps) {
    const sportId = props.sportId


    return (
        <>
            {props.games.map((game) => (
                <ButtonLarge
                    key={game.id}
                    img={"a"}
                    link={`/sports/${sportId}/games/${game.id}`}
                >
                    {game.name}
                </ButtonLarge>
            ))}
        </>
    )
}