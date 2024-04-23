'use client'
import {Button, Stack, TextField, TextFieldProps} from "@mui/material";
import {useRouter} from "next/navigation";
import {useRef} from "react";
import {roleFactory} from "@/src/models/RoleModel";

export default function RoleCreator() {
    const router = useRouter()
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)

    const handleCreate = async () => {
        //  create role
        const name = nameRef.current?.value as string
        const description = descriptionRef.current?.value as string

        if (!name || !description) {
            alert("名前と備考を入力してください")
            return
        }

        await roleFactory().create({
            name: name,
            description: description,
            default: false,
        })

        //  redirect to role page
        router.push('/roles')
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
                inputRef={descriptionRef}
                label="備考"
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
                    href="/roles"
                    variant="contained"
                >
                    キャンセル
                </Button>
            </Stack>
        </Stack>
    )
}