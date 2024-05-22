import {Box, Typography} from "@mui/material";


export type TextCellProps = {
    text: string
}

export default function TextCell(props: TextCellProps) {

    return (
        <Box
            height={100}
            width={200}
            border={1}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
        >
            <Typography>
                {props.text}
            </Typography>
        </Box>
    )
}
