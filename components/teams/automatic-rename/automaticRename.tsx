'use client'
import {Team, teamFactory} from "@/src/models/TeamModel";
import {useRouter} from "next/navigation";
import {
    Button,
    LinearProgress,
    Stack,
    TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import {useRef, useState} from "react";
import {HiArrowPath, HiCheck} from "react-icons/hi2";
import TeamRenameStatus from "@/components/teams/automatic-rename/teamRenameStatus";
import NextLink from "next/link";

export type AutomaticRenameProps = {
    teams: Team[]
}

export type EditedTeam = {
    id: number
    oldTeamName: string
    newTeamName: string | undefined
    status: "success" | "not_found_team" | "not_link_yet" | "invalid_team_name"
}

export default function AutomaticRename(props: AutomaticRenameProps) {
    const router = useRouter()
    //  ref
    const csvDataRef = useRef<TextFieldProps>(null)
    //  state
    const [editedTeams, setEditedTeams] = useState<EditedTeam[]>([])
    const [progress, setProgress] = useState<number>(0)
    const [isExecuting, setIsExecuting] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (isExecuting) {
            alert("処理中です")
            return
        }

        //  update
        handleCSVDataChange()

        //  execute
        setIsExecuting(true)
        setProgress(0)

        let index = 0;
        for (const editedTeam of editedTeams) {
            //  original
            const originalTeam = props.teams.find(team => team.id === editedTeam.id)

            if (originalTeam !== undefined) {
                if (editedTeam.status == "success" && editedTeam.newTeamName !== undefined) {
                    //  update match
                    await teamFactory().update(editedTeam.id, {
                        name: editedTeam.newTeamName,
                        //  origin
                        description: originalTeam.description,
                        classId: originalTeam.classId,
                        teamTagId: originalTeam.teamTagId,
                    })
                }
            }

            //  increment progress
            index++
            setProgress((index) / editedTeams.length * 100)

            //  delay for api server load
            await timeout(100);
        }

        setIsExecuting(false)
        //  refresh
        router.push("/teams")
    }

    const handleCSVDataChange = () => {
        if (csvDataRef.current?.value === undefined) {
            return
        }

        const csvData = csvDataRef.current.value as string
        const rows = csvData.split("\n")

        const editedTeamList: EditedTeam[] = []

        for (const row of rows) {
            const data = row.split(",")
            const oldTeamName = data[0]
            const newTeamName = data[1]

            //  team
            const team = props.teams.find(team => team.name === oldTeamName)

            //  if team not found
            if (team === undefined) {
                //  failed
                editedTeamList.push({
                    id: -1,
                    oldTeamName: oldTeamName,
                    newTeamName: newTeamName,
                    status: "not_found_team"
                })
                continue
            }

            if (newTeamName === undefined || newTeamName === "") {
                //  failed
                editedTeamList.push({
                    id: team.id,
                    oldTeamName: oldTeamName,
                    newTeamName: newTeamName,
                    status: "invalid_team_name"
                })
                continue
            }

            //  success
            editedTeamList.push({
                id: team.id,
                oldTeamName: oldTeamName,
                newTeamName: newTeamName,
                status: "success"
            })
        }

        //  add matches not exist in csv
        const notExistTeams = props.teams.filter(team => {
            return !editedTeamList.some(editedTeam => editedTeam.id === team.id)
        }).map(team => {
            return {
                id: team.id,
                oldTeamName: team.name,
                newTeamName: undefined,
                status: "not_link_yet"
            } as EditedTeam
        })

        const results = editedTeamList.concat(notExistTeams)
        setEditedTeams(results)
    }

    return (
        <Stack m={0} spacing={1} direction={"column"}>
            <Typography>
                CSVデータ
            </Typography>
            <TextField
                type={"text"}
                name={"csv-data"}
                id={"csv-data"}
                placeholder={"CSVデータ"}
                inputRef={csvDataRef}
                multiline
                rows={10}
                fullWidth
                required
                onChange={() => handleCSVDataChange()}
            />

            <TeamRenameStatus
                editedTeamList={editedTeams}
            />

            <Stack
                direction={"row"}
                my={0.5}
                pt={3}
                spacing={1}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Button
                    variant={"outlined"}
                    color={"error"}
                    startIcon={<HiArrowPath/>}
                    href={"/teams"}
                    component={NextLink}
                >
                    戻る
                </Button>
                <Button
                    variant={"contained"}
                    color={"info"}
                    sx={{flexGrow: 3}}
                    startIcon={<HiCheck/>}
                    onClick={handleSubmit}
                >
                    実行
                </Button>
            </Stack>

            {isExecuting &&
                <LinearProgress variant="determinate" value={progress}/>
            }
        </Stack>
    )
}

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}
