import {Stack, Typography} from "@mui/material";
import LoginButton from "@/components/auth/LoginButton";

export default function Login() {
    return (
        <Stack height="100lvh" justifyContent="center" alignItems="center" gap="32px">
            <Typography variant="h3">Welcome to Sports-day Form</Typography>

            <LoginButton/>
        </Stack>
    );
}
