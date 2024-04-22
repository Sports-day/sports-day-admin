'use client'
import {
    Avatar, Box,
    Button, Chip,
    FormControl, InputLabel, MenuItem, OutlinedInput, Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup, Tooltip,
    Typography,
    SelectChangeEvent
} from "@mui/material";
import {HiCheck, HiEllipsisHorizontal, HiTrash} from "react-icons/hi2";
import React from "react";

type UserEditorProps = {
    studentMail: string;
    studentGender: string;
}


export const UserEditor:React.FC<UserEditorProps> = ({studentMail, studentGender}) => {
    const studentId = studentMail.split("@")[0]
    const [gender, setGender] = React.useState('');

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    return(
        <>
            <Stack mx={0} my={2} spacing={2} direction={"column"}>

                <TextField
                    color={"info"}
                    id="student-id-input"
                    label="学籍番号"
                    defaultValue={studentId}
                />

                <FormControl fullWidth>
                    <InputLabel id="gender-select-label">性別</InputLabel>
                    <Select
                        labelId="gender-select"
                        id="gender-select"
                        value={gender}
                        label="性別"
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={10}>男性</MenuItem>
                        <MenuItem value={20}>女性</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="class-select-label">所属クラス</InputLabel>
                    <Select
                        labelId="class-select"
                        id="class-select"
                        value={gender}
                        label="所属クラス"
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={10}>EA</MenuItem>
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
                    <Button variant="outlined" color={"error"} startIcon={<HiTrash />}>
                        このユーザーを削除
                    </Button>
                    <Button variant={"contained"} color={"info"}  sx={{flexGrow: 3}} startIcon={<HiCheck />}>
                        保存
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}