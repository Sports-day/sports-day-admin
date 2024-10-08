'use client'
import {Button, Stack, TextField, TextFieldProps} from "@mui/material";
import {useRouter} from "next/navigation";
import {useRef} from "react";
import NextLink from "next/link";
import {informationFactory} from "@/src/models/InformationModel";

export default function InformationCreator() {
    const router = useRouter()
    const nameRef = useRef<TextFieldProps>(null)
    const contentRef = useRef<TextFieldProps>(null)

    const handleCreate = async () => {
        //  create role
        const name = nameRef.current?.value as string
        const content = contentRef.current?.value as string


        if (!name) {
            alert("名前を入力してください")
            return
        }

        if (!content) {
            alert("内容を入力してください")
            return
        }

        await informationFactory().create({
            name: name,
            content: content
        })

        //  redirect to role page
        router.push('/information')
    }

    return (
        <Stack
            spacing={1}
        >
            <TextField
                fullWidth
                inputRef={nameRef}
                label="名前"
                sx={{
                    width: "50%"
                }}
                required
            />

            <TextField
                fullWidth
                inputRef={contentRef}
                label="内容"
                sx={{
                    width: "50%"
                }}
                multiline
                required
            />


            <Stack
                direction="row"
                spacing={1}
            >
                <Button
                    onClick={handleCreate}
                    variant="contained"
                >
                    作成
                </Button>

                <Button
                    href="/tags"
                    component={NextLink}
                    variant="contained"
                >
                    キャンセル
                </Button>
            </Stack>
        </Stack>
    )
}
