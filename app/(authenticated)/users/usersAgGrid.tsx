'use client'
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { ColDef, ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

// Row Data Interface
type IRow = {
    ID: number;
    名前: string;
    学籍番号: number;
    クラス: string;
    チーム: string;
}


// Create new GridExample component
const UsersAgGrid = () => {

    const height= 'calc(100vh - 230px)';
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([
        { ID: 1, 名前: "山田太郎", 学籍番号: 123456, クラス: "A", チーム: "A1" },
        { ID: 2, 名前: "田中太郎", 学籍番号: 123123, クラス: "C", チーム: "A2" },
        { ID: 3, 名前: "岡田太郎", 学籍番号: 123809, クラス: "B", チーム: "C3" },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "ID" },
        { field: "名前" },
        { field: "学籍番号" },
        { field: "クラス" },
        { field: "チーム" },
    ]);

    // Container: Defines the grid's theme & dimensions.
    return (
        <div className={"ag-theme-quartz"} style={{ width: '100%', height: height }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    );
}

export default UsersAgGrid;
