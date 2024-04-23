'use client'
import {Class} from "@/src/models/ClassModel";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import UserCreatingStatus from "./userCreatingStatus";
import {Gender, userFactory} from "@/src/models/UserModel";

export type UserCreatingAutomationProps = {
    classes: Class[],
}

export type UserCreatingState = "created" | "pending" | "error" | "invalid_gender" | "invalid_csv"

export type UserCreatingData = {
    username?: string,
    email?: string,
    gender?: string,
    state: UserCreatingState
}

export default function UserCreatingAutomation(props: UserCreatingAutomationProps) {
    const [selectedClassId, setSelectedClassId] = useState<string>("")
    const [csvInput, setCsvInput] = useState<string>("")
    const [userCreatingDataList, setUserCreatingDataList] = useState<UserCreatingData[]>([])

    const handleCSVChange = (event: ChangeEvent<HTMLInputElement>) => {
        const csv = event.target.value

        //  parse csv
        const lines = csv.split("\n")
        const newUserCreatingDataList: UserCreatingData[] = []

        for (const line of lines) {
            const elements = line.split(",")

            let state: UserCreatingState = "pending"

            //  invalid csv
            if (elements.length !== 3) {
                state = "invalid_csv"
            }

            //  gender
            if (!["male", "female"].includes(elements[2])) {
                state = "invalid_gender"
            }

            newUserCreatingDataList.push({
                username: elements[0] === "" ? undefined : elements[0],
                email: elements[1] === "" ? undefined : elements[1],
                gender: elements[2] === "" ? undefined : elements[2],
                state: state
            })
        }

        setUserCreatingDataList(newUserCreatingDataList)
        setCsvInput(csv)
    }

    const handleCreateUsers = async () => {
        //  get class
        const classModel = props.classes.find((c) => c.id === +selectedClassId)
        if (classModel === undefined) {
            alert("クラスを指定してください")
            return
        }

        //  get pending users
        const users = userCreatingDataList.filter((data) => data.state === "pending")

        for (const user of users) {
            //  create user
            try {
                const gender: Gender = user.gender == "male" ? "male" : "female"
                const username = user.username
                const email = user.email
                if (username === undefined || email === undefined) {
                    continue
                }

                const result = await userFactory().create({
                    name: username,
                    email: email,
                    gender: gender,
                    classId: classModel.id,
                    pictureId: null,
                })

                if (result === undefined) {
                    console.log("Error")
                    user.state = "error"
                }
                else {
                    console.log("Created")
                    user.state = "created"
                }
            } catch (e) {
                console.error(e)
                //  duplicated
                user.state = "error"
            }
        }

        setUserCreatingDataList([...userCreatingDataList])
    }

    return (
        <Stack spacing={1}>
            <Typography>
                追加するユーザー一覧のCSVファイルと所属クラスを選択してください。
            </Typography>

            <Typography>
                所属クラスを指定してください。
            </Typography>

            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="class-select-label">Class</InputLabel>
                <Select
                    value={selectedClassId}
                    labelId={"class-select-label"}
                    id={"class-select"}
                    label="Class"
                    onChange={(event) => {
                        setSelectedClassId(event.target.value)
                    }}
                    sx={{
                        width: "200px",
                    }}
                >
                    {props.classes.map((c) => (
                        <MenuItem
                            key={c.id}
                            value={c.id}
                        >
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography>
                CSVを入力してください
            </Typography>
            <TextField
                id={"csv-input"}
                label="CSV"
                fullWidth
                multiline
                onChange={handleCSVChange}
                value={csvInput}
            />

            <UserCreatingStatus dataList={userCreatingDataList}/>

            <Button
                variant={"contained"}
                onClick={handleCreateUsers}
            >
                作成
            </Button>
        </Stack>
    )
}
