import { UniqueIdentifier } from "@dnd-kit/core";
import {Card, Stack, Typography} from "@mui/material";

const Item = ({ id }: { id: UniqueIdentifier }) => {
    return (
        <Card sx={{p:1.5, background:"rgba(8,28,155,0.7)", backdropFilter: 'blur(5px)', color:"secondary.main", width:"130px", overflow:"hidden"}}>
            <Card variant={"outlined"} sx={{width:"100%", px:1, mb:1, backgroundColor:"primary.dark", color:"background.paper", justifyContent:"center", alignItems:"center"}}>
                <Typography fontSize={"12px"}>チーム{id}</Typography>
            </Card>
            <Stack direction={"row"} spacing={1} sx={{width:"100px"}}>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#b0b7dc"}>クラス</Typography>
                    <Typography fontSize={"20px"} fontWeight={"500"}>M1</Typography>
                </Stack>
                <Stack direction={"column"} spacing={0} justifyContent={"center"} alignItems="center" sx={{width:"70px"}}>
                    <Typography fontSize={"12px"} color={"#b0b7dc"}>経験者</Typography>
                    <Typography fontSize={"20px"} fontWeight={"500"}>1</Typography>
                </Stack>
            </Stack>
        </Card>
    );
};
export default Item;