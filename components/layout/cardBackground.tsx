import {Button, Card, Stack, Typography, useTheme} from "@mui/material";
import React, {ReactNode} from 'react';
import {red} from "@mui/material/colors";
import NextLink from "next/link";

type CardProps = {
    title?: string;
    button?: string;
    link?: string;
    children?: ReactNode;
    onClick?: () => void;
};

const CardBackground: React.FC<CardProps> = ({title, button, link, children, onClick}) => {

    return (
        <>
            <Card
                sx={{
                    py: 2, px: 2,
                    backgroundImage:`linear-gradient(rgba(105,112,164,0), rgba(47,60,140,0.08))`
                }}
            >
                <Stack pb={2} spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    {title && <Typography color={"text.primary"}>{title}</Typography>}
                    {button && link &&
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            href={link}
                            component={NextLink}
                            onClick={onClick}
                        >
                            <Typography fontSize={"inherit"} color={"text.primary"}>
                                {button}
                            </Typography>
                        </Button>
                    }
                    {button && !link &&
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            onClick={onClick}
                        >
                            <Typography fontSize={"inherit"} color={"text.primary"}>
                                {button}
                            </Typography>
                        </Button>
                    }
                </Stack>
                {children}
            </Card>
        </>
    );
};

export default CardBackground;
