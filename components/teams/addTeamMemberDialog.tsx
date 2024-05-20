'use client'
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import {ColDef, GridApi, GridReadyEvent, ModuleRegistry} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {User} from "@/src/models/UserModel";
import {Team, teamFactory} from "@/src/models/TeamModel";
import {useState} from "react";
import {useRouter} from "next/navigation";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type AddTeamMemberDialogProps = {
    isOpen: boolean
    setClose: () => void
    team: Team
    users: User[]
}

// Row Data Interface
type IRow = {
    id: number,
    username: string,
    gender: string,
    emailAccountName: string,
}

export default function AddTeamMemberDialog(props: AddTeamMemberDialogProps) {
    const router = useRouter()
    const height = 'calc(100vh - 230px)';
    const [gridApi, setGridApi] = useState<GridApi<IRow> | null>(null)
    // Column Definitions: Defines & controls grid columns.
    const colDefs: ColDef<IRow>[] = [
        {
            field: "id",
            headerName: "ID",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
        },
        {field: "username", headerName: "ユーザー名"},
        {field: "gender", headerName: "性別"},
        {field: "emailAccountName", headerName: "学籍番号"},
    ]

    const rowData: IRow[] = props.users.map((user) => {
        return {
            id: user.id,
            username: user.name,
            gender: user.gender == "male" ? "男" : "女",
            emailAccountName: user.email.split("@")[0]
        } as IRow
    })

    const handleGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api)
    }

    const handleSubmit = async () => {
        if (!gridApi) {
            alert("エラーが発生しました")
            return
        }

        const selectedRowIds = gridApi
            .getSelectedRows()
            .map((row) => row.id)

        if (selectedRowIds.length === 0) {
            alert("ユーザーを選択してください")
            return
        }

        //  add team user
        await teamFactory().addTeamUsers(props.team.id, selectedRowIds)

        //  refresh
        router.refresh()
        //  close
        props.setClose()
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.setClose}
            maxWidth={"lg"}
            fullWidth
        >
            <DialogTitle>
                <Typography>
                    チームメンバーの追加
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div
                    className={"ag-theme-quartz"}
                    style={{
                        width: '100%',
                        height: height,
                        borderRadius: "10px"
                    }}
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        rowSelection={"multiple"}
                        onGridReady={handleGridReady}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    onClick={props.setClose}
                >
                    キャンセル
                </Button>
                <Button
                    type={"submit"}
                    variant={"contained"}
                    onClick={handleSubmit}
                >
                    追加
                </Button>
            </DialogActions>
        </Dialog>
    )
}