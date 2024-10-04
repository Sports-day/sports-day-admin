import { Avatar, Card, Stack, Typography} from "@mui/material";
import React, { ReactNode } from 'react';
import {HiMegaphone} from "react-icons/hi2";

type CardProps = {
    children?: ReactNode;
}

const CardLarge: React.FC<CardProps> = ({ children }) => {
    return (
        <>
            <Card sx={{py:1.5, px:2, backgroundColor:"secondary.main", color:"text.primary"}}>
                <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    <Avatar sx={{height:"1.5em", width:"1.5em", backgroundColor:"text.secondary"}}>
                        <HiMegaphone color={"secondary.main"}/>
                    </Avatar>
                    <Typography>{children}</Typography>
                </Stack>
            </Card>
        </>
    );
};

export default CardLarge;
