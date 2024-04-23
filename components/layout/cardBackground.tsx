import {Button, Card, Stack, Typography} from "@mui/material";
import React, {ReactNode} from 'react';

type CardProps = {
    title?: string;
    button?: string;
    link?: string;
    func?: () => void;
    children?: ReactNode;
};

const CardBackground: React.FC<CardProps> = ({title, button, link, func, children}) => {
    return (
        <>
            <Card sx={{py: 2, px: 2}}>
                <Stack pb={2} spacing={1} direction={"row"} justifyContent={"flex-start"} alignItems="center">
                    {title && <Typography color={"primary.light"}>{title}</Typography>}
                    {button &&
                        <Button
                            variant={"contained"}
                            href={link}
                            onClick={() => {
                                if (func) {
                                    func();
                                }
                            }}
                        >
                            {button}
                        </Button>
                    }
                </Stack>
                {children}
            </Card>
        </>
    );
};

export default CardBackground;
