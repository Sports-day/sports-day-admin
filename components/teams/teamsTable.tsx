'use client'
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { ColDef, ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

// Row Data Interface
type IRow = {
    userId: number;
    studentName: string;
    studentId: number;
    studentClass: string;
    studentTeam: string;
}


// Create new GridExample component
const TeamsAgGrid = () => {

    const height= 'calc(100vh - 230px)';
    // Row Data: The data to be displayed.
    const [rowData, ] = useState<IRow[]>([
        { userId: 1, studentName: "山田太郎", studentId: 123456, studentClass: "D", studentTeam: "A2" },
        { userId: 2, studentName: "田中太郎", studentId: 123455, studentClass: "B", studentTeam: "C4" },
        { userId: 3, studentName: "岡田太郎", studentId: 123459, studentClass: "A", studentTeam: "A1" },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, ] = useState<ColDef<IRow>[]>([
        { field: "userId", headerName:"ユーザーID" },
        { field: "studentName", headerName:"名前" },
        { field: "studentId", headerName:"学籍番号" },
        { field: "studentClass", headerName:"クラス" },
        { field: "studentTeam", headerName:"チーム" },
    ]);

    // Container: Defines the grid's theme & dimensions.
    return (
        <div className={"ag-theme-quartz"} style={{ width: '100%', height: height, borderRadius:"10px" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    );
}

export default TeamsAgGrid;
