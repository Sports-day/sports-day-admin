import {Information} from "@/src/models/InformationModel";
import {Stack, Typography, IconButton, Button} from "@mui/material";
import {HiOutlineInformationCircle} from "react-icons/hi";
import React from "react";

export type InformationListProps = {
    informationList: Information[]
}

export default function InformationList(props: InformationListProps) {
    const list = props.informationList.map((information) => {
        return (
            <Button href={`/information/${information.id}`} sx={{py:1.5, px:2,mb:1, width:"100%", backgroundColor:"secondary.main", color:"text.primary"}} key={information.id}>
                <Stack spacing={1} direction={"row"} width={"100%"} justifyContent={"flex-start"} alignItems="center">
                    <Typography
                        color={"text.primary"}
                        sx={{fontSize: "12px", mx:2}}
                        lineHeight={"1.2em"}
                    >
                        {information.id}
                    </Typography>
                    <IconButton
                        sx={{backgroundColor: "background.default"}}
                    >
                        <HiOutlineInformationCircle color={"text.primary"}/>
                    </IconButton>
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        alignItems={"flex-start"}
                        spacing={1}
                    >
                        <Typography
                            color={"text.primary"}
                            sx={{fontSize: "14px", fontWeight: "bold"}}
                            lineHeight={"1.2em"}
                        >
                            {information.name}
                        </Typography>
                        <Typography
                            color={"text.primary"}
                            sx={{fontSize: "14px"}}
                            lineHeight={"1.2em"}
                        >
                            {information.content}
                        </Typography>
                    </Stack>
                </Stack>
            </Button>
        )
    })
    return (
        <>
            {list}
        </>
    )
}