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
    const [experience, setExperience] = useState(0);

    useEffect(() => {
        try {
            const descriptionData = JSON.parse(team.description);
            if (descriptionData.value) {
                setExperience(descriptionData.value);
            } else {
                setExperience(0);
            }
        } catch (error) {
            setExperience(0);
        }
    }, [team]);

    useEffect(() => {
        const fetchTeam = async () => {
            const fetchedTeam = await teamFactory().show(Number(id));
            setTeam(fetchedTeam);
        };

        void fetchTeam();
    }, [id]);

    useEffect(() => {
        const fetchClassName = async () => {
            const fetchedClass = await classFactory().show(team.classId);
            setClassName(fetchedClass.name);
        };

        if (team.classId) {
            void fetchClassName();
        }
    }, [team]);

    if (!team) {
        return null;
    }

    return (
        <Card sx={{p:1.5, background:"rgba(8,28,155,0.6)", backdropFilter: 'blur(5px)', color:"secondary.main", width:"150px", overflow:"hidden"}}>
            <Card variant={"outlined"} sx={{width:"100%", px:1, mb:1, backgroundColor:"primary.dark", color:"background.paper", justifyContent:"center", alignItems:"center"}}>
                <Typography fontSize={"12px"}>{team.id} : {team.name}</Typography>
            </Card>
            <Stack direction={"row"} spacing={0} sx={{width:"125px"}}>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"90px"}}>
                    <Typography fontSize={"12px"} color={"#b0b7dc"}>クラス</Typography>
                    <Typography fontSize={"15px"} fontWeight={"500"}>{className}</Typography>
                </Stack>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#b0b7dc"}>経験者</Typography>
                    <Typography fontSize={"15px"} fontWeight={"500"}>{experience}</Typography>
                </Stack>
            </Stack>
        </Card>
    );
};