'use client'
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {EditedMatch} from "@/components/automation/AutomaticMatchEditor";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type MatchEditorStatusProps = {
    editedMatchList: EditedMatch[]
}

// Row Data Interface
type IRow = {
    id: number,
    leftTeamName: string,
    rightTeamName: string,
    judgeTeamName: string,
    startAt: string,
    status: string
}

export default function MatchEditorStatus(props: MatchEditorStatusProps) {
    const height = 'calc(100vh - 230px)';
    // Column Definitions: Defines & controls grid columns.
    const colDefs: ColDef<IRow>[] = [
        {field: "id", headerName: "ID"},
        {field: "leftTeamName", headerName: "左チーム"},
        {field: "rightTeamName", headerName: "右チーム"},
        {field: "judgeTeamName", headerName: "審判"},
        {field: "status", headerName: "ステータス"},
    ]

    const rowData: IRow[] = props.editedMatchList.map((editedMatch) => {

        //  status
        let status = ""
        switch (editedMatch.status) {
            case "success":
                status = "✅成功"
                break
            case "not_found_match":
                status = "❌試合が見つからない"
                break
            case "not_link_yet":
                status = "❌紐付けできない"
                break
            case "team_invalid":
                status = "❌チーム名が不正"
                break
        }

        return {
            id: editedMatch.id,
            leftTeamName: editedMatch.leftTeamName,
            rightTeamName: editedMatch.rightTeamName,
            judgeTeamName: editedMatch.judgeTeamName,
            startAt: editedMatch.startAt,
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