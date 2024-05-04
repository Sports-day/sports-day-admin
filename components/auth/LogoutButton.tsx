'use client'
import {IconButton, Tooltip} from "@mui/material";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {HiArrowRightOnRectangle} from "react-icons/hi2";

export default function LogoutButton() {
    const router = useRouter()

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
                <HiArrowRightOnRectangle color={"#eff0f8"}/>
            </IconButton>
        </Tooltip>
    );
}
