'use client'
import {IconButton, Tooltip} from "@mui/material";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useTheme} from "@mui/material/styles";

export default function LogoutButton() {
    const router = useRouter()
    const theme = useTheme()

    return (
        <Tooltip title={"ログアウト"}>
            <IconButton
                onClick={() => {
                    //  remove cookie
                    Cookies.remove("access_token")
                    //  redirect with next
                    router.push("/login")
                }}
                sx={{width:"fit-content"}}
            >
                <HiArrowRightOnRectangle color={theme.palette.text.secondary}/>
            </IconButton>
        </Tooltip>
    );
}
