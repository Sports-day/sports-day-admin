import {Stack, Skeleton, Box, LinearProgress} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";

export default function Loading() {
    return(
        <Stack spacing={2} mx={2} my={3}>
            <Skeleton animation="wave" variant="text" width={300} height={18} />
            <CardBackground>
                <Box width="100%">
                    <LinearProgress/>
                </Box>
            </CardBackground>
        </Stack>
    )
}