'use client'
import {Button, Stack, TextField, TextFieldProps} from "@mui/material";
import {useRouter} from "next/navigation";
import {useRef} from "react";
import {tagFactory} from "@/src/models/TagModel";
import NextLink from "next/link";

export default function TagCreator() {
    const router = useRouter()
    const nameRef = useRef<TextFieldProps>(null)

    const handleCreate = async () => {
        //  create role
        const name = nameRef.current?.value as string

        if (!name) {
            alert("名前を入力してください")
            return
        }

        await tagFactory().create({
            name: name,
            enabled: true,
        })

        //  redirect to role page
        router.push('/tags')
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
