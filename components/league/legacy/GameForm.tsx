'use client'
import {Game, gameFactory} from "@/src/models/GameModel";
import {FormEvent, useRef, useState} from "react";
import {Button, Stack, TextFieldProps} from "@mui/material";
import {Tag} from "@/src/models/TagModel";
import {useRouter} from "next/navigation";
import GameEditFields from "@/components/league/legacy/GameEditFields";

export type FormType = "create" | "edit"

export type GameFormProps = {
    formType: FormType
    sportId: number
    tags: Tag[]
    game?: Game
}

export default function GameForm(props: GameFormProps) {
    const router = useRouter()
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const wightRef = useRef<TextFieldProps>(null)
    //  state
    const [typeState, setTypeState] = useState<string>(props.game?.type ?? '')
    const [calculationTypeState, setCalculationTypeState] = useState<string>(props.game?.calculationType ?? '')
    const [tag, setTag] = useState<string>(props.game?.tagId?.toString() ?? '')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //  weight invalid
        if (isNaN(parseInt(wightRef.current?.value as string))) {
            alert("重みは数値で入力してください。(0~100)")
            return
        }

        //  type invalid
        if (typeState !== "tournament" && typeState !== "league") {
            alert("トーナメントもしくはリーグが選択可能です。")
            return
        }

        //  calculationType invalid
        if (calculationTypeState !== "total_score" && calculationTypeState !== "diff_score" && calculationTypeState !== "win_score") {
            alert("勝ち点、合計得点もしくは得失点差が選択可能です。")
            return
        }

        //  tag invalid
        if (tag === " ") {
            alert("タグを指定してください。")
            return
        }



        if (props.formType === "create") {
            const result = await gameFactory().create({
                name: nameRef.current?.value as string,
                description: descriptionRef.current?.value as string,
                sportId: props.sportId,
                type: typeState,
                calculationType: calculationTypeState,
                weight: wightRef.current?.value as number,
                tagId: parseInt(tag)
            })

            //  redirect to game profile
            router.push(`/sports/${props.sportId}/games/${result.id}`)
        } else {
            const id = props.game?.id
            if (!id) return

            await gameFactory().update(
                id,
                {
                    name: nameRef.current?.value as string,
                    description: descriptionRef.current?.value as string,
                    sportId: props.sportId,
                    type: typeState,
                    calculationType: calculationTypeState,
                    weight: wightRef.current?.value as number,
                    tagId: parseInt(tag)
                })
        }

        //  refresh list
        router.refresh()
    }


    return (
        <Stack
            spacing={1}
            direction={"column"}
        >
            <GameEditFields
                nameRef={nameRef}
                descriptionRef={descriptionRef}
                wightRef={wightRef}
                typeState={typeState}
                setTypeState={setTypeState}
                calculationTypeState={calculationTypeState}
                setCalculationTypeState={setCalculationTypeState}
                tags={props.tags}
                tag={tag}
                setTag={setTag}
                game={props.game}
            />


            <Button
                type={"submit"}
                variant={"contained"}
                onClick={handleSubmit}
            >
                {
                    props.formType == "create" ?
                        "作成" :
                        "編集"
                }
            </Button>
        </Stack>
    )
}
