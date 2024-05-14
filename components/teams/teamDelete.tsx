'use client'
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl
} from "@mui/material";
import React from "react";
import { teamFactory } from "@/src/models/TeamModel";
import { useRouter } from "next/navigation";
import {HiTrash} from "react-icons/hi2";

export type TeamDeleteProps = {
    teamId: number;
}

export default function TeamDelete(props: TeamDeleteProps) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await teamFactory().delete(props.teamId);

        router.push('/teams')
        router.refresh()

        handleClose();
    };

    return (
        <FormControl>
            <Button
                variant="outlined"
                color={"error"}
                startIcon={<HiTrash/>}
                onClick={handleOpen}
            >
                このチームを削除
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color='s-darkest.main' fontWeight='bold'>
                    {"チームを削除しますか?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"　color='black'>
                        この操作は元に戻せません。チームを削除してもよろしいですか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        キャンセル
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        削除
                    </Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    );
}
