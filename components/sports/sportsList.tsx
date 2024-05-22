import {ButtonLarge} from "@/components/layout/buttonLarge";
import {Sport} from "@/src/models/SportModel";

export type SportsListProps = {
    sports: Sport[]
}

export default function SportsList(props: SportsListProps) {
    props.sports.sort((a, b) => b.weight - a.weight);
    return (
        <>
            {props.sports.map((sport) => (
                <ButtonLarge
                    key={sport.id}
                    img={`${process.env.NEXT_PUBLIC_API_URL}/images/${sport.iconId}/file`}
                    link={`/sports/${sport.id}`}
                >
                    {sport.name}
                </ButtonLarge>
            ))}
        </>
    )
}