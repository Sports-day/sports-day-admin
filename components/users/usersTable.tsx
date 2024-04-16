'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

type Column = {
    id: 'userId' | 'studentName' | 'studentId' | 'studentClass' | 'studentTeam';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'userId',
        label: 'ID',
        minWidth: 40 ,
        align: 'right',

    },
    {
        id: 'studentName',
        label: '名前',
        minWidth: 100
    },
    {
        id: 'studentId',
        label: '学籍番号',
        minWidth: 70,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'studentClass',
        label: 'クラス',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'studentTeam',
        label: 'チーム',
        minWidth: 170,
        format: (value: number) => value.toFixed(2),
    },
];

type Data = {
    userId: number;
    studentName: string;
    studentId: number;
    studentClass: string;
    studentTeam: string;
}

function createData(
    userId: number,
    studentName: string,
    studentId: number,
    studentClass: string,
    studentTeam: string,
): Data {
    return { userId, studentName, studentId, studentClass, studentTeam };
}

const rows = [
    createData(1, '山田太郎', 123456, 'A', 'Aチーム'),
];

export default function UsersTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper variant={"outlined"} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 270px) !important' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100, { value: -1, label: 'すべて表示' }]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={"1ページあたりの表示数 :"}
                slotProps={{
                    select: {
                        inputProps: {
                            'aria-label': '1ページあたりの表示数',
                        },
                        variant: "outlined",
                        size: "small"
                    },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}　