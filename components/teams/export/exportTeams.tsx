"use client"
import {Team} from "@/src/models/TeamModel";
import {TeamTag} from "@/src/models/TeamTagModel";
import {User} from "@/src/models/UserModel";
import {Class} from "@/src/models/ClassModel";
import {InputLabel, Select, FormControl, SelectChangeEvent, Stack, MenuItem, Button} from "@mui/material";
import {useState} from "react";
import * as XLSX from "xlsx";

export type ExportTeamsProps = {
    teams: Team[]
    teamTags: TeamTag[]
    users: User[]
    classes: Class[]
}

type DetailPageData = {
    "チーム名": string
    "経験者数": number
    "クラス": string
    "メンバー数": number
}

type TeamData = {
    teamName: string
    athleteNumber: number
    teamClassName: string
    teamMembers: TeamMemberData[]
}

type TeamMemberData = {
    "名前": string
    "番号": string
    "性別": string
}

type AthleteDataType = {
    value: number
}

export default function ExportTeams(props: ExportTeamsProps) {
    const [teamTagId, setTeamTagId] = useState<string>("-1")

    const handleChange = (event: SelectChangeEvent) => {
        setTeamTagId(event.target.value as string)
    }

    const handleExport = () => {
        //  check if teamTagId is selected
        if (teamTagId === "-1") {
            alert("チームタグを選択してください")
            return
        }

        //  check if teamTagId is valid
        const teamTag = props.teamTags.find((teamTag) => teamTag.id === parseInt(teamTagId))
        if (!teamTag) {
            alert("チームタグが見つかりません")
            return
        }

        //  filter teams by teamTagId
        const filteredTeams = props.teams.filter((team) => team.teamTagId === parseInt(teamTagId))
        if (filteredTeams.length === 0) {
            alert("選択したチームタグに関連するチームが見つかりません")
            return
        }

        //  format data
        const teamDataList: TeamData[] = filteredTeams.map((team) => {
            //  get team members
            const teamMembers: TeamMemberData[] = team.userIds.map((userId) => {
                const user = props.users.find((user) => user.id === userId)
                return {
                    "名前": user?.name || "",
                    //  get email account name
                    "番号": user?.email.split("@")[0] || "",
                    "性別": user?.gender == "male" ? "男" : "女",
                }
            })

            //  get class name
            const teamClass = props.classes.find((class_) => class_.id === team.classId)

            //  get athlete number
            let athleteNumber: number
            try {
                const athleteData: AthleteDataType = JSON.parse(team.description);
                athleteNumber = athleteData.value
            } catch (e) {
                athleteNumber = 0
            }

            //  formatted data
            return {
                teamName: team.name,
                athleteNumber: athleteNumber,
                teamClassName: teamClass?.name ?? "無所属",
                teamMembers: teamMembers
            }
        })

        const detailPageDataList: DetailPageData[] = teamDataList.map((teamData) => {
            return {
                "チーム名": teamData.teamName,
                "経験者数": teamData.athleteNumber,
                "クラス": teamData.teamClassName,
                "メンバー数": teamData.teamMembers.length
            }
        })

        //  create workbook
        const workbook = XLSX.utils.book_new()

        //  create detail page worksheet
        const detailWorksheet = XLSX.utils.json_to_sheet(detailPageDataList)
        XLSX.utils.book_append_sheet(workbook, detailWorksheet, "詳細ページ")

        //  create team member worksheet
        teamDataList.forEach((teamData) => {
            const teamMemberWorksheet = XLSX.utils.json_to_sheet(teamData.teamMembers)
            XLSX.utils.book_append_sheet(workbook, teamMemberWorksheet, teamData.teamName)
        })

        //  export workbook
        XLSX.writeFile(workbook, `${teamTag.name}のチームデータ.xlsx`)
    }

    return (
        <Stack
            spacing={1}
        >
            <FormControl fullWidth>
                <InputLabel id="team-tag-select-label">チームタグ</InputLabel>
                <Select
                    labelId="team-tag-select-label"
                    id="team-tag-select"
                    value={teamTagId}
                    label="team-tag"
                    onChange={handleChange}
                >
                    <MenuItem value={-1}>チームタグを選択してください</MenuItem>
                    {
                        props.teamTags.map((teamTag) => (
                            <MenuItem key={teamTag.id} value={teamTag.id}>{teamTag.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <Button
                variant="contained"
                fullWidth
                onClick={handleExport}
            >
                エクスポート
            </Button>
        </Stack>
    )
}