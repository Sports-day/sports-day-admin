import {Button, Card, Stack, Typography} from "@mui/material";
import React, { ReactNode } from 'react';

type CardProps = {
    title?: string;
    button?: string;
    link?: string;
    children?: ReactNode;
};

const CardBackground: React.FC<CardProps> = ({ title, button, link, children }) => {
    return (
        <>
            <Card sx={{py:2, px:2}}>
                <Stack pb={2}　spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    {title && <Typography>{title}</Typography>}
                    {button && <Button variant={"outlined"} href={link}>{button}</Button>}
                </Stack>
                {children}
            </Card>
        </>
    );
};

export default CardBackground;
