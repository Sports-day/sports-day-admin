'use client'
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {EditedTeam} from "@/components/teams/automatic-rename/automaticRename";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type TeamRenameStatusProps = {
    editedTeamList: EditedTeam[]
}

// Row Data Interface
type IRow = {
    id: number,
    oldTeamName: string,
    newTeamName: string,
    status: string
}

export default function TeamRenameStatus(props: TeamRenameStatusProps) {
    const height = 'calc(100vh - 230px)';
    // Column Definitions: Defines & controls grid columns.
    const colDefs: ColDef<IRow>[] = [
        {field: "id", headerName: "ID"},
        {field: "oldTeamName", headerName: "変更前の名前"},
        {field: "newTeamName", headerName: "変更後の名前"},
        {field: "status", headerName: "ステータス"},
    ]

    const rowData: IRow[] = props.editedTeamList.map((editedTeam) => {

        //  status
        let status = ""
        switch (editedTeam.status) {
            case "success":
                status = "✅成功"
                break
            case "not_found_team":
                status = "❌チームが見つからない"
                break
            case "not_link_yet":
                status = "❌紐付けできない"
                break
            case "invalid_team_name":
                status = "❌チーム名が無効"
                break
        }

        return {
            id: editedTeam.id,
            oldTeamName: editedTeam.oldTeamName,
            newTeamName: editedTeam.newTeamName ?? "",
            status: status
        }
    })

    return (
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
            />
        </div>
    )
}