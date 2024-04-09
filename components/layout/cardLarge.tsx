import {Button, Card, Stack, Typography} from "@mui/material";
import React, { ReactNode } from 'react';

type CardProps = {
    children?: ReactNode;
}

const CardLarge: React.FC<CardProps> = ({ children }) => {
    return (
        <>
            <Card sx={{py:2, px:2, backgroundColor:"primary.main", color:"secondary.main"}}>
                <Stack spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    <Typography>{children}</Typography>
                </Stack>
            </Card>
        </>
    );
};

export default CardLarge;
