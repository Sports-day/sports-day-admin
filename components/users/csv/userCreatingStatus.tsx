'use client'
import {UserCreatingData} from "@/components/users/csv/userCreatingAutomation";
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {ColDef, ModuleRegistry} from 'ag-grid-community';
import {ClientSideRowModelModule} from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export type UserCreatingStatusProps = {
    dataList: UserCreatingData[]
}

// Row Data Interface
type IRow = {
    username: string,
    email: string,
    gender: string,
    status: string
}

export default function UserCreatingStatus(props: UserCreatingStatusProps) {
    const height = 'calc(100vh - 230px)';
    // Column Definitions: Defines & controls grid columns.
    const colDefs: ColDef<IRow>[] = [
        {field: "username", headerName: "ユーザー名"},
        {field: "email", headerName: "メールアドレス"},
        {field: "gender", headerName: "性別"},
        {field: "status", headerName: "ステータス"},
    ]

    const rowData: IRow[] = props.dataList.map((data) => {
        let gender = "未登録";
        if (data.gender !== undefined) {
            if (data.gender === "male") {
                gender = "男性"
            }
            else if (data.gender === "female") {
                gender = "女性"
            }
            else {
                gender = "エラー"
            }
        }

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
            case "invalid_gender":
                status = "❌性別エラー"
                break
            case "invalid_csv":
                status = "❌CSVエラー"
                break
        }

        return {
            username: data.username ?? "未登録",
            email: data.email ?? "未登録",
            gender: data.gender !== "" ? gender : "未登録",
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