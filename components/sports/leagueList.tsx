import {ButtonLarge} from "@/components/layout/buttonLarge";
import {Game} from "@/src/models/GameModel";

export type LeagueListProps = {
    games: Game[]
}

export default function LeagueList(props: LeagueListProps) {


    return (
        <>
            {props.games.map((game) => (
                <ButtonLarge
                    key={game.id}
                    img={"a"}
                    link={`/games/${game.id}`}
                >
                    {game.name}
                </ButtonLarge>
            ))}
        </>
    )
}