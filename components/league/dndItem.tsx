import { UniqueIdentifier } from "@dnd-kit/core";
import {Card, Stack, Typography} from "@mui/material";
import { useEffect, useState } from 'react';
import {classFactory} from "@/src/models/ClassModel";
import {Team, teamFactory} from "@/src/models/TeamModel";

export type ItemProps = {
    id: UniqueIdentifier
    team?: Team
}

export default function Item(props: ItemProps) {
    const {id} = props;
    const emptyTeam: Team = {
        id: 0,
        name: '',
        description: '',
        classId: 0,
        teamTagId: 0,
        userIds: [],
        enteredGameIds: [],
        createdAt: '',
        updatedAt: '',
    };

    const [team, setTeam] = useState(emptyTeam);
    const [className, setClassName] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            const fetchedTeam = await teamFactory().show(Number(id));
            setTeam(fetchedTeam);
        };

        fetchTeam();
    }, [id]);

    useEffect(() => {
        const fetchClassName = async () => {
            const fetchedClass = await classFactory().show(team.classId);
            setClassName(fetchedClass.name);
        };

        if (team.classId) {
            fetchClassName();
        }
    }, [team]);

    if (!team) {
        return null;
    }

    return (
        <Card sx={{p:1.5, background:"rgba(8,28,155,0.6)", backdropFilter: 'blur(5px)', color:"secondary.main", width:"150px", overflow:"hidden"}}>
            <Card variant={"outlined"} sx={{width:"100%", px:1, mb:1, backgroundColor:"primary.dark", color:"background.paper", justifyContent:"center", alignItems:"center"}}>
                <Typography fontSize={"12px"}>{team.name}</Typography>
            </Card>
            <Stack direction={"row"} spacing={0} sx={{width:"125px"}}>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"80px"}}>
                    <Typography fontSize={"12px"} color={"#b0b7dc"}>クラス</Typography>
                    <Typography fontSize={"15px"} fontWeight={"500"}>{className}</Typography>
                </Stack>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"80px"}}>
                    <Typography fontSize={"12px"} color={"#b0b7dc"}>経験者</Typography>
                    <Typography fontSize={"15px"} fontWeight={"500"}>1</Typography>
                </Stack>
            </Stack>
        </Card>
    );
};