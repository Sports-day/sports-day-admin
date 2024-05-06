'use client'
import React, {useRef} from "react";
import {useAsync} from "react-use";
import {useRouter} from "next/navigation";
import {Sport, sportFactory} from "@/src/models/SportModel";
import {Image, imageFactory} from "@/src/models/ImageModel";
import {Tag, tagFactory} from "@/src/models/TagModel";
import {
    Alert,
    Avatar,
    Button,
    Card, FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import {HiCheck, HiTrash} from "react-icons/hi2";

export type SportEditorProps = {
    sport: Sport
}

export default function SportEditor(props: SportEditorProps) {
    const router = useRouter()
    const [snackOpen, setSnackOpen] = React.useState<boolean>(false)

    const [tagId, setTagId] = React.useState<number | null>(props.sport.tagId)
    const [tags, setTags] = React.useState<Tag[]>([])
    const [iconId, setIconId] = React.useState<number | null>(props.sport.iconId)
    const [images, setImages] = React.useState<Image[]>([])
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)

    useAsync(async () => {
        const fetchImages = await imageFactory().index()
        setImages(fetchImages)

        const fetchTags = await tagFactory().index()
        setTags(fetchTags)
    })

    const handleCreate = async () => {

        await sportFactory().update(props.sport.id,{
            name: nameRef.current?.value as string,
            description: descriptionRef.current?.value as string,
            iconId: iconId,
            weight: 0,
            ruleId: 0,
            tagId: tagId
        })

        router.refresh()
        setSnackOpen(true)
    }

    const handleSnackClose = () => {
        setSnackOpen(false)
    }

    return (
        <>
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
                            defaultValue={props.sport.name}
                        />

                        <TextField
                            color={"info"}
                            hiddenLabel={true}
                            id="outlined-size-small"
                            placeholder="競技の説明"
                            size="small"
                            inputRef={descriptionRef}
                            defaultValue={props.sport.description}
                        />

                        <FormControl fullWidth size={"small"}>
                            <InputLabel id="demo-simple-select-label">アイコン</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={iconId}
                                defaultValue={props.sport.iconId}
                                label="アイコン"
                                onChange={(e) => {
                                    setIconId(e.target.value as number)
                                }}
                            >
                                {images.map((image) => (
                                    <MenuItem key={image.id} value={image.id}>
                                        <Avatar src={image.data}/>
                                        {image.id}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size={"small"}>
                            <InputLabel id="demo-simple-select-label">タグ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tagId}
                                defaultValue={props.sport.tagId}
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
                            <Button variant="outlined" color={"error"} startIcon={<HiTrash/>}>
                                この競技を削除
                            </Button>
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
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    変更が保存されました
                </Alert>
            </Snackbar>
        </>
    )
}