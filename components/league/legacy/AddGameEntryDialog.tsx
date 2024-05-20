'use client'
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import {ColDef, GridApi, GridReadyEvent, ModuleRegistry} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {Team} from "@/src/models/TeamModel";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Game, gameFactory} from "@/src/models/GameModel";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type AddGameEntryDialogProps = {
    game: Game
    teams: Team[]
    entries: Team[]
}

// Row Data Interface
type IRow = {
    id: number,
    name: string,
}

export default function AddGameEntryDialog(props: AddGameEntryDialogProps) {
    const router = useRouter()
    const height = 'calc(100vh - 230px)';
    const [gridApi, setGridApi] = useState<GridApi<IRow> | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // Column Definitions: Defines & controls grid columns.
    const colDefs: ColDef<IRow>[] = [
        {
            field: "id",
            headerName: "ID",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
        },
        {
            field: "name",
            headerName: "チーム名",
            filter: true
        },
    ]

    const rowData: IRow[] = props.teams
        .filter((team) => !props.entries.some((entry) => entry.id === team.id))
        .map((team) => {
            return {
                id: team.id,
                name: team.name,
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
            alert("チームを選択してください")
            return
        }

        //  add team user
        await gameFactory().addGameEntries(props.game.id, selectedRowIds)

        //  refresh
        router.refresh()
        //  close
        setIsOpen(false)
    }

    return (
        <>
            <Button
                variant={"contained"}
                onClick={() => setIsOpen(true)}
            >
                エントリー追加
            </Button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                maxWidth={"md"}
                fullWidth
            >
                <DialogTitle>
                    <Typography>
                        エントリーの追加
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
                        onClick={() => setIsOpen(false)}
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
        </>
    )
}