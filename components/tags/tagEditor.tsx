'use client'
import {useRef, useState} from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    TextFieldProps
} from "@mui/material";
import {useRouter} from "next/navigation";
import {Tag, tagFactory} from "@/src/models/TagModel";

export type TagEditorProps = {
    tag: Tag
}

export default function TagEditor(props: TagEditorProps) {
    const router = useRouter()
    const [enabled, setEnabled] = useState<boolean>(props.tag.enabled)
    const nameRef = useRef<TextFieldProps>(null)

    const handleSubmit = async () => {
        const name = nameRef.current?.value as string

        await tagFactory().update(props.tag.id, {
            name: name,
            enabled: enabled,
        })

        //  reload
        router.push("/tags")
    }

    return (
        <Stack spacing={1}>
            <TextField
                label={"タグ名"}
                name={"name"}
                defaultValue={props.tag.name}
                inputRef={nameRef}
                sx={{
                    width: "50%"
                }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={enabled}
                        onChange={(e) => {
                            setEnabled(e.target.checked)
                        }}
                    />
                }
                label={"有効"}
            />

            <Button
                variant={"contained"}
                onClick={handleSubmit}
            >
                保存
            </Button>
        </Stack>
    )
}
