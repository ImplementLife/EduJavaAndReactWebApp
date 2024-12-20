import React, { useEffect, useState } from 'react';
import { Button, Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import Head from '@/components/common/Head.jsx';
import useForbiden from '@/components/hooks/useForbiden.jsx';
import { getUsers } from '@/util/NetService.js';
import './styles.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function () {
    const nav = useNavigate();

    const [isAccessDenied, setIsAccessDenied, getBody] = useForbiden();
    const [errorNotFound, setErrorNotFound] = useState(false);
    const [data, setData] = useState({ content: [], totalPages: 0, pageNum: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDir, setSortDir] = useState(true);
    const [pageSize, setPageSize] = useState(10);


    useEffect(() => {
        getUsers(currentPage - 1, pageSize, sortDir)
            .then(response => {
                if (response.status === 404) {
                    setErrorNotFound(true);
                    reject('Not found');
                }
                const result = response.data;
                setData(result);
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    console.log('Access denied');
                    setIsAccessDenied(true);
                }
            });
    }, [currentPage, sortDir, pageSize]);

    if (errorNotFound) {
        return <NotFoundPage />
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    const handleCardClick = (id) => {
        nav(`/user/${id}`);
    };

    return getBody(
        <>
            <Head
                pageName='Users'
                dscr='This is a users list page'
            />
            <div className="container mt-4">
                <h1>Users</h1>
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-group">
                            <label htmlFor="sortDir" className="form-label">Sort Direction</label>
                            <select id="sortDir" className="form-select" onChange={(e) => setSortDir(e.target.value === 'true')}>
                                <option value="true">Ascending</option>
                                <option value="false">Descending</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pageSize" className="form-label">Items per Page</label>
                            <select id="pageSize" className="form-select" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="filter" className="form-label">Filter (disabled)</label>
                            <input type="text" id="filter" className="form-control" placeholder="Filter" disabled />
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">N2</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.content.map((row) => (
                                <StyledTableRow key={row.id} onClick={() => handleCardClick(row.id)}>
                                    <StyledTableCell component="th" scope="row">{row.firstName}</StyledTableCell>
                                    <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                                    <StyledTableCell align="right"><Button><Link to={`/setup/user/${row.id}`}>Edit</Link></Button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <nav aria-label="Page navigation" className="mt-3">
                    <Pagination
                        count={data.totalPages}
                        boundaryCount={2}
                        onChange={handlePageChange}
                        shape="rounded"
                    />
                </nav>
            </div>
        </>
    )
}