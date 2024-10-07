'use client'
import {Class} from "@/src/models/ClassModel";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import UserCreatingStatus from "./userCreatingStatus";
import {Gender, userFactory} from "@/src/models/UserModel";
import UserCreatingStatusWithoutClassSelection from "@/components/users/csv/userCreatingStatusWithoutClassSelection";

export type UserCreatingAutomationProps = {
    classes: Class[],
}

export type UserCreatingStateWithoutClassSelection = "created" | "pending" | "error" | "invalid_gender" | "invalid_csv" | "invalid_class"

export type UserCreatingDataWithoutClassSelection = {
    username?: string,
    email?: string,
    gender?: string,
    className?: string,
    state: UserCreatingStateWithoutClassSelection
}

export default function UserCreatingAutomationWithoutClassSelection(props: UserCreatingAutomationProps) {
    const [csvInput, setCsvInput] = useState<string>("")
    const [userCreatingDataList, setUserCreatingDataList] = useState<UserCreatingDataWithoutClassSelection[]>([])

    const handleCSVChange = (event: ChangeEvent<HTMLInputElement>) => {
        const csv = event.target.value

        //  parse csv
        const lines = csv.split("\n")
        const newUserCreatingDataList: UserCreatingDataWithoutClassSelection[] = []

        for (const line of lines) {
            const elements = line.split(",")

            let state: UserCreatingStateWithoutClassSelection = "pending"

            //  invalid csv
            if (elements.length !== 4) {
                state = "invalid_csv"
            }

            //  gender
            if (!["male", "female"].includes(elements[2])) {
                state = "invalid_gender"
            }

            //  class name
            if (!props.classes.some(v => v.name === elements[3])) {
                state = "invalid_class"
            }

            newUserCreatingDataList.push({
                username: elements[0] === "" ? undefined : elements[0],
                email: elements[1] === "" ? undefined : elements[1],
                gender: elements[2] === "" ? undefined : elements[2],
                className: elements[3] === "" ? undefined : elements[3],
                state: state
            })
        }

        setUserCreatingDataList(newUserCreatingDataList)
        setCsvInput(csv)
    }

    const handleCreateUsers = async () => {
        //  get pending users
        const users = userCreatingDataList.filter((data) => data.state === "pending")

        for (const user of users) {
            //  create user
            try {
                const gender: Gender = user.gender == "male" ? "male" : "female"
                const username = user.username
                const email = user.email
                //  class
                const classModel = props.classes.find(v => v.name === user.className)
                if (username === undefined || email === undefined || classModel === undefined) {
                    continue
                }

                const result = await userFactory().create({
                    name: username,
                    email: email,
                    gender: gender,
                    classId: classModel.id,
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

            <UserCreatingStatusWithoutClassSelection dataList={userCreatingDataList}/>

            <Button
                variant={"contained"}
                onClick={handleCreateUsers}
            >
                作成
            </Button>
        </Stack>
    )
}
