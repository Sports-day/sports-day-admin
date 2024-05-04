import {Stack, Typography, Button} from "@mui/material";
import WiderLogo from "@/components/svg/wider";

export default function NotFound(){
    return (
        <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" sx={{background:"radial-gradient(ellipse at left, #5F6DC2, #3E4EB3)"}}>
            <Stack maxWidth={"500px"} mx={2} justifyContent="center" alignItems="center" spacing={1.5}>
                <Typography fontSize={"25px"} fontWeight={"400"} color={"#c7cbe5"}>(T . T)</Typography>
                <Typography pb={3} fontSize={"25px"} fontWeight={"600"} color={"#EFF0F8"}>404 - Not Found</Typography>
                <Typography fontSize={"18px"} fontWeight={"400"} color={"#c7cbe5"}>ページが存在しません。存在するはずのページで繰り返し発生している場合は、開発者に連絡してください。</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href={"/"}
                    sx={{py:1.5, width:"100%"}}
                    disableElevation
                >
                    トップに戻る
                </Button>
                <Button>
                    <Stack direction={"row"} spacing={0.5}>
                        <Typography fontWeight={"600"} color={"#99a5d6"}>(C)2024</Typography>
                        <WiderLogo/>
                    </Stack>
                </Button>
            </Stack>
        </Stack>
    )
}