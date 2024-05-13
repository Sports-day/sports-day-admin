'use client'
import {useEffect, useState} from "react";
import {Stack, Skeleton, Box, LinearProgress, Backdrop} from "@mui/material";
import CardBackground from "@/components/layout/cardBackground";

export default function Loading() {
    const [backdropOpen, setBackdropOpen] = useState<boolean>(false)

    useEffect(() => {
        setBackdropOpen(true)
    }, [])

    return(
        <>
            <Backdrop open={backdropOpen} sx={{backgroundColor:"rgba(239,240,248, 0.4)", zIndex: 1}}/>
            <Stack spacing={2} mx={2} my={3}>
                <Skeleton animation="wave" variant="text" width={300} height={18} />
                <CardBackground>
                    <Box width="100%">
                        <LinearProgress/>
                    </Box>
                </CardBackground>
            </Stack>
        </>
    )
}