import {Avatar, Button, Stack, Grid} from "@mui/material";
import React, {ReactNode} from "react";

type ButtonLargeProps = {
    img?: string;
    children?: ReactNode;
}

export const ButtonLarge: React.FC<ButtonLargeProps> = ({img, children})=> {
    return(
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
                variant={"contained"}
                sx={{width:"100%"}}
            >
                <Stack
                    direction={"row"}
                    my={0.5}
                    width={"100%"}
                    justifyContent={"flex-start"}
                    alignItems="center"
                >
                    {img && <Avatar sx={{mr:1.5, height: "1.5em", width: "1.5em"}}>

                    </Avatar>}
                    {children}
                </Stack>
            </Button>
        </Grid>
    )
}