'use client'
import {UserCreatingData} from "@/components/users/csv/userCreatingAutomation";
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';
import {TeamCreatingData} from "@/components/teams/automatic-entry/teamCreatingAutomation";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type TeamCreatingStatusProps = {
    dataList: TeamCreatingData[]
}

// Row Data Interface
type IRow = {
    name: string,
    email: string,
    className: string,
    status: string
}

export default function TeamCreatingStatus(props: TeamCreatingStatusProps) {
    const height = 'calc(100vh - 230px)';
    // Column Definitions: Defines & controls grid columns.
    const colDefs: ColDef<IRow>[] = [
        {field: "name", headerName: "チーム名"},
        {field: "email", headerName: "メールアドレス"},
        {field: "className", headerName: "クラス名"},
        {field: "status", headerName: "ステータス"},
    ]

    const rowData: IRow[] = props.dataList.map((data) => {
        //  status
        let status = ""
        switch (data.state) {
            case "created":
                status = "✅作成済み"
                break
            case "pending":
                status = "🕐作成待ち"
                break
            case "error":
                status = "❌作成エラー"
                break
            case "invalid_class":
                status = "❌クラスが見つかりません"
                break
            case "invalid_user":
                status = "❌ユーザーが見つかりません"
                break
            case "team_not_found":
                status = "❌チームの作成に失敗しました"
                break
            case "invalid_csv":
                status = "❌CSVエラー"
                break
        }

        return {
            name: data.name ?? "未登録",
            email: data.email ?? "未登録",
            className: data.className ?? "未登録",
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