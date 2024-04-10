import { UniqueIdentifier } from "@dnd-kit/core";
import {Card, Stack, Typography} from "@mui/material";

const Item = ({ id }: { id: UniqueIdentifier }) => {
    return (
        <div>
            <Card sx={{px:1, mb:1}}>チーム{id}</Card>
            <Stack direction={"row"} spacing={1} sx={{width:"180px"}}>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#a2ace0"}>クラス</Typography>
                    <Typography variant={"h5"}>M1</Typography>
                </Stack>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#a2ace0"}>経験者</Typography>
                    <Typography variant={"h5"}>1</Typography>
                </Stack>
            </Stack>
        </div>
    );
};
export default Item;