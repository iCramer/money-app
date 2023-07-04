/* eslint-disable no-loop-func */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { TransactionsWrapper } from "./Transactions.styles";
import Box from '../../components/Box';
import Filters from '../../components/Filters';
import axios from 'axios';
import TagEditor from '../../components/TagEditor';
import CategoryCell from '../../components/CategoryCell';
import { AppContext } from '../../AppContext';
import MemoDataGrid from "../../components/MemoDataGrid";
import CategoryModal from '../../components/CategoryModal';
import TagModal from '../../components/TagModal';

const Transactions = () => {
    const { categoriesList, calculatedTotals, transactionsList } = useContext(AppContext);
    const [transactions, setTransactions] = transactionsList;
    const [categories, setCategories] = categoriesList;
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteredTransactions, setFilteredTrasactions] = useState([]);
    const [totals, setTotals] = calculatedTotals;
    const [tagModalOpen, setTagModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [categoryEditId, setCategoryEditId] = useState('');

    useEffect(() => {
        setFilteredTrasactions(transactions);
    }, [transactions]);

    const getTransactions = () => {
        return axios.get(`/api/transactions`);
    };

    const getCategories = () => {
        axios.get(`/api/categories`).then(resp => {
            setCategories(resp.data);
        });
    };

    useEffect(() => {
        getTransactions().then(resp => {
            setTransactions(resp.data);
        });
    }, []);

    const getTransTotal = () => {
        const total = { credit: 0, debit: 0, saved: '' };
        selectedRows.forEach(row => {
            const item = filteredTransactions.find(x => x.id === row);
            if (item?.type === 'debit' && !item?.description.includes('360 Performance')) {
                total.debit += Math.abs(+item.amount);
            }
            else if (item?.type === 'credit') {
                total.credit += Math.abs(+item.amount);
            }
        });
        total.saved = (total.credit - total.debit).toLocaleString('en-US', {maximumFractionDigits: 2});
        total.credit = total.credit.toLocaleString('en-US', {maximumFractionDigits: 2});
        total.debit = total.debit.toLocaleString('en-US', {maximumFractionDigits: 2});

        setTotals(total);
    };

    const onCatEditSubmit = useCallback(() => {
        setCategoryModalOpen(false);
        getTransactions().then(resp => {
            setTransactions(resp.data);
        });
        getCategories();
    }, []);

    useEffect(() => {
        getTransTotal();
    }, [selectedRows]);

    const filterRows = filters => {
        if (Object.keys(filters).length === 0) {
            setFilteredTrasactions(transactions);
            return;
        }

        const filteredTrans = transactions.filter(row => {
            let fields = Object.keys(filters);
            let filterCount = fields.length;
            let match = true;

            while(match && filterCount > 0) {
                fields.forEach(field => {
                    const filter = filters[field];
                    if (field === 'categories') {
                        if (!Array.from(filter.value).includes(row.category)) {
                            match = false;
                        }
                    }
                    else if (filter.dataType === 'array' && Array.isArray(row[field])) {
                        if (!Array.from(filter.value).some(x => row[field].includes(x))) {
                            match = false;
                        }
                    }
                    else if (filter.dataType === 'array') {
                        if (!Array.from(filter.value).some(x => row[field] === x)) {
                            match = false;
                        }
                    }
                    else if (filter.dataType === 'date-range') {
                        const itemDate = new Date(row[field]).getTime();
                        const start = new Date(filter.value.start).getTime();
                        const end = new Date(filter.value.end).getTime();
                        match = start <= itemDate && itemDate <= end;
                    }
                    filterCount--;
                });
            }
            return match;
        });
        setFilteredTrasactions(filteredTrans);
    };

    const columns = [
        { field: 'account', headerName: 'Account', width: 120 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'type', headerName: 'Type', width: 100 },
        {
            field: 'amount',
            headerName: 'Amount',
            valueFormatter: ({ value }) => `$${Math.abs(value).toLocaleString()}`,
            width: 120
        },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'balance',
            headerName: 'Balance',
            valueFormatter: ({ value }) => {
                if (!value || value < 1) return '---';
                return `$${value.toLocaleString()}`
            },
            width: 120
        },
        {
            field: 'tags',
            headerName: 'Tags',
            flex: 2,
            cellClassName: 'tag-cell',
            renderCell: trans => (
                <TagEditor row={trans.row} openModal={() => setTagModalOpen(true)} />
            )
        },
        {
            field: 'category',
            headerName: 'Category',
            cellClassName: 'category-cell',
            flex: 3,
            renderCell: trans => (
                <CategoryCell
                    transaction={trans.row}
                    onEditSubmit={onCatEditSubmit}
                    openModal={openCategoryModal}
                />
            )
        }
    ];

    const openCategoryModal = trans => {
        setCategoryEditId(trans.description);
        setCategoryModalOpen(true);
    };

    return (
        <TransactionsWrapper>
            <h2 className="page-title">Transactions</h2>
            <Box>
                <Filters onFilterChange={filterRows} getCategories={getCategories} />
            </Box>
            <div className='totals'>
                <p>
                    <span><strong>Money Out:</strong> ${totals.debit}</span>
                    <span><strong>Money In:</strong> ${totals.credit}</span>
                    <span><strong>Total Saved:</strong> ${totals.saved}</span>
                </p>
            </div>
            <MemoDataGrid
                rows={filteredTransactions}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                autoHeight
                onSelectionModelChange={selected => setSelectedRows(selected)}
                selectionModel={selectedRows}
                disableColumnMenu
            />

            <TagModal open={tagModalOpen} handleModalClose={() => setTagModalOpen(false)} />

            <CategoryModal
                onEditSubmit={onCatEditSubmit}
                categoryId={categoryEditId}
                open={categoryModalOpen}
                onCancel={() => setCategoryModalOpen(false)}
            />
        </TransactionsWrapper>
    )
}

export default React.memo(Transactions);