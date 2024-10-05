import {Avatar, Button, Stack, Grid, Typography} from "@mui/material";
import React, {ReactNode} from "react";

type ButtonLargeProps = {
    img?: string;
    children?: ReactNode;
    link?: string;
}

export const ButtonLarge: React.FC<ButtonLargeProps> = ({img, children, link})=> {
    return(
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
                color={"secondary"}
                variant={"contained"}
                sx={{width:"100%"}}
                href={link}
            >
                <Stack
                    direction={"row"}
                    my={0.5}
                    width={"100%"}
                    justifyContent={"flex-start"}
                    alignItems="center"
                >
                    {img && <Avatar
                        sx={{mr:1.5, height: "1.5em", width: "1.5em"}}
                        src={img}
                    >
                    </Avatar>}
                    <Typography fontSize={"inherit"} color={"text.primary"}>
                        {children}
                    </Typography>
                </Stack>
            </Button>
        </Grid>
    )
}