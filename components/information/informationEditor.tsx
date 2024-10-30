'use client'
import React, {useRef} from "react";
import {
    Button,
    Stack,
    TextField,
    TextFieldProps
} from "@mui/material";
import {useRouter} from "next/navigation";
import {Information, informationFactory} from "@/src/models/InformationModel";
import {HiTrash} from "react-icons/hi2";

export type InformationEditorProps = {
    information: Information
}

export default function InformationEditor(props: InformationEditorProps) {
    const router = useRouter()
    const nameRef = useRef<TextFieldProps>(null)
    const contentRef = useRef<TextFieldProps>(null)

    const handleSubmit = async () => {
        const name = nameRef.current?.value as string
        const content = contentRef.current?.value as string

        await informationFactory().update(props.information.id, {
            name: name,
            content: content,
        })

        //  reload
        router.push("/information")
    }

    const handleDelete = async () => {
        await informationFactory().delete(props.information.id)

        //  reload
        router.push("/information")
    }

    return (
        <Stack spacing={1}>
            <TextField
                label={"名前"}
                name={"name"}
                defaultValue={props.information.name}
                inputRef={nameRef}
                sx={{
                    width: "50%"
                }}
            />

            <TextField
                label={"内容"}
                name={"content"}
                defaultValue={props.information.content}
                inputRef={contentRef}
                sx={{
                    width: "50%"
                }}
                multiline
            />

            <Stack
                direction={"row"}
                my={0.5}
                spacing={1}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Button
                    variant="outlined"
                    color={"error"}
                    startIcon={<HiTrash/>}
                    onClick={handleDelete}
                >
                    削除
                </Button>
                <Button
                    variant={"contained"}
                    onClick={handleSubmit}
                >
                    保存
                </Button>
            </Stack>
        </Stack>
    )
}
