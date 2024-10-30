'use client'
import {
    Avatar,
    Button,
    Card, FormControl,
    Grid,
    InputLabel,
    MenuItem, MenuListProps,
    Select,
    Stack,
    TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import {useRouter} from "next/navigation";
import React, {useRef} from "react";
import {sportFactory} from "@/src/models/SportModel";
import {HiCheck} from "react-icons/hi2";
import {Image, imageFactory} from "@/src/models/ImageModel";
import {Tag, tagFactory} from "@/src/models/TagModel";
import {useAsync} from "react-use";

export default function SportCreator() {
    const router = useRouter()
    const [tagId, setTagId] = React.useState<number | null>(null)
    const [tags, setTags] = React.useState<Tag[]>([])
    const [iconId, setIconId] = React.useState<number | null>(null)
    const [images, setImages] = React.useState<Image[]>([])
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const tagIdRef = useRef<MenuListProps>(null)

    useAsync(async () => {
        const fetchImages = await imageFactory().index()
        setImages(fetchImages)

        const fetchTags = await tagFactory().index()
        setTags(fetchTags)
    })

    const handleCreate = async () => {

        await sportFactory().create({
            name: nameRef.current?.value as string,
            description: descriptionRef.current?.value as string,
            iconId: iconId,
            weight: 0,
            ruleId: 0,
            tagId: tagId
        })

        router.push('/sports')
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card sx={{backgroundColor:"e1e4f6", color:"primary"}} variant={"outlined"}>
                    <Stack mx={2} my={2} spacing={2} direction={"column"}>
                        <Typography pl={1} fontWeight={"500"}>競技の情報</Typography>

                        <TextField
                            color={"info"}
                            hiddenLabel={true}
                            id="outlined-size-small"
                            placeholder="競技名"
                            size="small"
                            helperText="例: バスケットボール晴天時"
                            inputRef={nameRef}
                        />

                        <TextField
                            color={"info"}
                            hiddenLabel={true}
                            id="outlined-size-small"
                            placeholder="競技の説明"
                            size="small"
                            inputRef={descriptionRef}
                        />

                        <FormControl fullWidth size={"small"}>
                            <InputLabel id="demo-simple-select-label">アイコン</InputLabel>
                            <Select
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={iconId}
                                label="アイコン"
                                onChange={(e) => {
                                    setIconId(e.target.value as number)
                                }}
                            >
                                {images.map((image) => (
                                    <MenuItem key={image.id} value={image.id}>
                                        <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}/images/${image.id}/file`}/>
                                        {image.id}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size={"small"}>
                            <InputLabel id="demo-simple-select-label">タグ</InputLabel>
                            <Select
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tagId}
                                inputRef={tagIdRef}
                                label="タグ"
                                onChange={(e) => {
                                    setTagId(e.target.value as number)
                                }}
                            >
                                {tags.map((tag) => (
                                    <MenuItem key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Stack
                            direction={"row"}
                            my={0.5}
                            spacing={1}
                            width={"100%"}
                            justifyContent={"space-between"}
                            alignItems="center"
                        >
                            <Button
                                variant={"contained"}
                                color={"info"}
                                sx={{flexGrow: 3}}
                                startIcon={<HiCheck />}
                                onClick={handleCreate}
                            >
                                保存
                            </Button>
                        </Stack>

                    </Stack>
                </Card>
            </Grid>
        </>
    )
}