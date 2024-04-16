import { UniqueIdentifier } from "@dnd-kit/core";
import {Card, Stack, Typography} from "@mui/material";

const Item = ({ id }: { id: UniqueIdentifier }) => {
    return (
        <div>
            <Card sx={{width:"100%", px:1, mb:1, backgroundColor:"primary.main", color:"background.paper", justifyContent:"center", alignItems:"center"}}>
                <Typography fontSize={"12px"}>チーム{id}</Typography>
            </Card>
            <Stack direction={"row"} spacing={1} sx={{width:"100px"}}>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#a2ace0"}>クラス</Typography>
                    <Typography fontSize={"20px"}>M1</Typography>
                </Stack>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#a2ace0"}>経験者</Typography>
                    <Typography fontSize={"20px"}>1</Typography>
                </Stack>
            </Stack>
        </div>
    );
};
export default Item;