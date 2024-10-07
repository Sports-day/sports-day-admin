'use client'
import {Class, classFactory} from "@/src/models/ClassModel";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {TeamTag, teamTagFactory} from "@/src/models/TeamTagModel";
import {User, userFactory} from "@/src/models/UserModel";
import {useAsync} from "react-use";
import {Team, teamFactory} from "@/src/models/TeamModel";
import TeamCreatingStatus from "@/components/teams/automatic-entry/teamCreatingStatus";

export type TeamCreatingState = "created" | "pending" | "error" | "team_not_found" | "invalid_class" | "invalid_user" | "invalid_csv"

export type TeamCreatingData = {
    name?: string,
    email?: string,
    className?: string,
    state: TeamCreatingState
}

export default function TeamCreatingAutomation() {
    const [selectedTeamTagId, setSelectedTeamTagId] = useState<string>("")
    const [csvInput, setCsvInput] = useState<string>("")
    const [teamCreatingDataList, setTeamCreatingDataList] = useState<TeamCreatingData[]>([])

    const [classes, setClasses] = useState<Class[]>([])
    const [teamTags, setTeamTags] = useState<TeamTag[]>([])
    const [users, setUsers] = useState<User[]>([])

    useAsync(async () => {
        setClasses(await classFactory().index())
        setTeamTags(await teamTagFactory().index())
        setUsers(await userFactory().index())
    }, [])

    const handleCSVChange = (event: ChangeEvent<HTMLInputElement>) => {
        const csv = event.target.value

        //  parse csv
        const lines = csv.split("\n")
        const newTeamCreatingDataList: TeamCreatingData[] = []

        for (const line of lines) {
            const elements = line.split(",")

            let state: TeamCreatingState = "pending"

            //  invalid csv
            if (elements.length !== 3) {
                state = "invalid_csv"
            }

            //  invalid class
            if (!classes.some(v => v.name === elements[2])) {

            }

            newTeamCreatingDataList.push({
                name: elements[0] === "" ? undefined : elements[0],
                email: elements[1] === "" ? undefined : elements[1],
                className: elements[2] === "" ? undefined : elements[2],
                state: state
            })
        }

        setTeamCreatingDataList(newTeamCreatingDataList)
        setCsvInput(csv)
    }

    const handleCreateUsers = async () => {
        //  get team tags
        const teamTag = teamTags.find((c) => c.id === +selectedTeamTagId)
        if (teamTag === undefined) {
            alert("チームタグを指定してください")
            return
        }

        //  get pending teams
        const teams = teamCreatingDataList.filter((data) => data.state === "pending")

        //  チーム名を取得
        type TeamForCreating = {
            name: string,
            classId: number,
        }
        const teamsForCreating: TeamForCreating[] = []
        for (const team of teams) {
            const teamName = team.name
            if (teamName === undefined) {
                team.state = "invalid_csv"
                continue
            }
            const classModel = classes.find(v => v.name === team.className)
            if (classModel === undefined) {
                team.state = "invalid_class"
                continue
            }

            //  if team name is not exists in teamNamesForCreating, add
            if (!teamsForCreating.some(v => v.name === teamName && v.classId === classModel.id)) {
                teamsForCreating.push({
                    name: teamName,
                    classId: classModel.id
                })
            }
        }

        //  チームを作成
        const createdTeams: Team[] = []
        for (const teamForCreating of teamsForCreating) {
            const result = await teamFactory().create({
                name: teamForCreating.name,
                description: "",
                classId: teamForCreating.classId,
                teamTagId: teamTag.id
            })
            if (result !== undefined) {
                createdTeams.push(result)
            }
        }

        //  メンバー追加
        for (const team of teams) {
            //  add user
            try {
                const teamModel = createdTeams.find((c) => c.name === team?.name)
                const userModel = users.find((c) => c.email === team?.email)
                if (teamModel == undefined) {
                    team.state = "team_not_found"
                    continue
                }

                if (userModel === undefined) {
                    team.state = "invalid_user"
                    continue
                }

                const result = await teamFactory().addTeamUsers(teamModel.id, [userModel.id])

                if (result === undefined) {
                    console.log("Error")
                    team.state = "error"
                }
                else {
                    console.log("Created")
                    team.state = "created"
                }
            } catch (e) {
                console.error(e)
                //  duplicated
                team.state = "error"
            }
        }

        setTeamCreatingDataList([...teamCreatingDataList])
    }

    return (
        <Stack spacing={1}>
            <Typography>
                エントリーのCSVファイルとチームタグを選択してください。
            </Typography>

            <Typography>
                チームタグを指定してください。
            </Typography>

            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="team-tag-select-label">TeamTag</InputLabel>
                <Select
                    value={selectedTeamTagId}
                    labelId={"team-tag-select-label"}
                    id={"team-tag-select"}
                    label="TeamTag"
                    onChange={(event) => {
                        setSelectedTeamTagId(event.target.value)
                    }}
                    sx={{
                        width: "200px",
                    }}
                >
                    {teamTags.map((c) => (
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

            <TeamCreatingStatus dataList={teamCreatingDataList}/>

            <Button
                variant={"contained"}
                onClick={handleCreateUsers}
            >
                作成
            </Button>
        </Stack>
    )
}
