'use client'
import {RefObject} from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    TextFieldProps
} from "@mui/material";
import {Game} from "@/src/models/GameModel";
import {Tag} from "@/src/models/TagModel";

export type GameEditFieldsProps = {
    nameRef: RefObject<TextFieldProps>
    descriptionRef: RefObject<TextFieldProps>
    wightRef: RefObject<TextFieldProps>
    typeState: string
    setTypeState: (type: string) => void
    calculationTypeState: string
    setCalculationTypeState: (type: string) => void
    tags: Tag[]
    tag: string
    setTag: (id: string) => void
    game?: Game
}

export default function GameEditFields(props: GameEditFieldsProps) {
    const handleGameTypeChange = (e: SelectChangeEvent) => {
        props.setTypeState(e.target.value.toString())
    }

    const handleCalculationTypeChange = (e: SelectChangeEvent) => {
        props.setCalculationTypeState(e.target.value.toString())
    }

    const handleTagChange = (e: SelectChangeEvent) => {
        props.setTag(e.target.value.toString())
    }

    return (
        <Stack
            spacing={2}
            direction={"column"}
        >

            {/* name */}
            <TextField
                type={"text"}
                name={"name"}
                id={"name"}
                label={"大会(トーナメント・リーグ)名"}
                inputRef={props.nameRef}
                defaultValue={!props.game ? "" : props.game.name}
                fullWidth
                required
                sx={{
                    my: '20px'
                }}
            />
            {/* description */}
            <TextField
                type={"text"}
                name={"description"}
                id={"description"}
                label={"説明(任意)"}
                inputRef={props.descriptionRef}
                defaultValue={!props.game ? "" : props.game.description}
                fullWidth
                sx={{
                    my: '20px'
                }}
            />
            {/* weight */}
            <TextField
                type={"text"}
                name={"weight"}
                id={"weight"}
                label={"重み(0~100)"}
                inputRef={props.wightRef}
                defaultValue={!props.game ? "0" : props.game.weight}
                fullWidth
                required
                sx={{
                    my: '20px'
                }}
            />
            {/* game type */}
            <FormControl>
                <InputLabel id="game-type-select">大会形式</InputLabel>
                <Select
                    labelId={"game-type-select"}
                    id={"game-type"}
                    label={"大会形式"}
                    value={props.typeState}
                    sx={{
                        width: "300px",
                        mb: '20px'
                    }}
                    onChange={handleGameTypeChange}
                >
                    <MenuItem
                        value={"tournament"}
                    >
                        トーナメント
                    </MenuItem>
                    <MenuItem
                        value={"league"}
                    >
                        リーグ
                    </MenuItem>
                </Select>
            </FormControl>

            {/* calculation type */}
            <FormControl>
                <InputLabel id="calculation-type-select">採点方式</InputLabel>
                <Select
                    labelId={"calculation-type-select"}
                    id={"calculation-type"}
                    label={"採点方式"}
                    value={props.calculationTypeState}
                    sx={{
                        width: "300px",
                        mb: '20px'
                    }}
                    onChange={handleCalculationTypeChange}
                >
                    <MenuItem
                        value={"total_score"}
                    >
                        総合得点
                    </MenuItem>
                    <MenuItem
                        value={"diff_score"}
                    >
                        得失点
                    </MenuItem>
                </Select>
            </FormControl>

            {/* calculation type */}
            <FormControl>
                <InputLabel id="tag-select">タグ</InputLabel>
                <Select
                    labelId={"tag-select"}
                    id={"tag"}
                    label={"タグ"}
                    value={props.tag}
                    sx={{
                        width: "300px",
                        mb: '20px'
                    }}
                    onChange={handleTagChange}
                >
                    <MenuItem
                        value={" "}
                    >
                        選択してください
                    </MenuItem>
                    {
                        props.tags.map((tag, index) => {
                            return (
                                <MenuItem
                                    value={tag.id.toString()}
                                    key={index}
                                >
                                    {tag.name}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Stack>
    )
}
