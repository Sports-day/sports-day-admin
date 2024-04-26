'use client'
import {
    Button,
    FormControl, InputLabel, MenuItem, Select,
    Stack,
    Avatar, Typography
} from "@mui/material";
import {HiCheck, HiTrash} from "react-icons/hi2";
import React, {useState} from "react";
import {Gender, User, userFactory} from "@/src/models/UserModel";
import { Class } from "@/src/models/ClassModel";
import {Role} from "@/src/models/RoleModel";
import {useRouter} from "next/navigation";

type UserEditorProps = {
    user: User;
    userRole: Role;
    classes: Class[];
    roles: Role[];
}


export default function UserEditor(props: UserEditorProps) {
    const router = useRouter()
    const [gender, setGender] = useState<string>(props.user.gender.toString())
    const [classId, setClassId] = useState<number>(props.user.classId)
    const [roleId, setRoleId] = useState<number>(props.userRole?.id ?? -1)

    const handleSubmit = async () => {
        await userFactory().update(props.user.id, {
            name: props.user.name,
            email: props.user.email,
            gender: gender as Gender,
            pictureId: props.user.pictureId,
            classId: classId,
        })

        if (roleId > -1) {
            console.log(roleId)
            await userFactory().setRole(props.user.id, roleId)
        }

        router.push('/users')
    }

    return (
        <>
            <Stack mx={0} my={2} spacing={2} direction={"column"}>

                <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                >
                    <Avatar
                        alt={props.user.name}
                        src={props.user.pictureId ? `${process.env.NEXT_PUBLIC_API_URL}/images/${props.user.pictureId}/file`: undefined}
                        sx={{ width: 56, height: 56 }}
                    />

                    <Typography>
                        {props.user.name}
                    </Typography>
                </Stack>

                <FormControl fullWidth>
                    <InputLabel id="gender-select-label">性別</InputLabel>
                    <Select
                        labelId="gender-select"
                        id="gender-select"
                        value={gender}
                        label="性別"
                        onChange={(e) => {
                            setGender(e.target.value)
                        }}
                    >
                        <MenuItem value={"male"}>男性</MenuItem>
                        <MenuItem value={"female"}>女性</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="class-select-label">所属クラス</InputLabel>
                    <Select
                        labelId="class-select"
                        id="class-select"
                        value={classId}
                        label="所属クラス"
                        onChange={(e) => {
                            setClassId(e.target.value as number)
                        }}
                    >
                        {props.classes.map((c) => (
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="role-select-label">ロール</InputLabel>
                    <Select
                        labelId="role-select"
                        id="role-select"
                        value={roleId}
                        label="ロール"
                        onChange={(e) => {
                            setRoleId(e.target.value as number)
                        }}
                    >
                        <MenuItem value={-1}>未所属</MenuItem>
                        {props.roles.map((r) => (
                            <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
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
                        このユーザーを削除
                    </Button>
                    <Button
                        variant={"contained"}
                        color={"info"}
                        sx={{flexGrow: 3}}
                        startIcon={<HiCheck/>}
                        onClick={handleSubmit}
                    >
                        保存
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}