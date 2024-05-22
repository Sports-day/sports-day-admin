'use client'
import {Avatar, Button, Stack, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import React from "react";
import {imageFactory, Image} from "@/src/models/ImageModel";

export type ImageEditorProps = {
    image: Image
}

export default function ImageEditor(props: ImageEditorProps) {
    const router = useRouter()

    const handleSubmit = async () => {
        await imageFactory().delete(props.image.id);
        router.back()
        router.refresh()
    };

    return (
        <Stack
            spacing={1}
        >
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}/images/${props.image.id}/file`}/>
                <Typography>
                    画像ID：{props.image.id}
                </Typography>
            </Stack>
            <Button variant={"contained"} onClick={handleSubmit}>
                削除
            </Button>
        </Stack>
    )
}
