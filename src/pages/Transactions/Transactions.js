/* eslint-disable no-loop-func */
import { useEffect, useState, useContext, useCallback } from "react";
import { TransactionsWrapper } from "./Transactions.styles";
import Box from '../../components/Box';
import Filters from '../../components/Filters';
import axios from 'axios';
import TagEditor from '../../components/TagEditor';
import CategoryEditor from '../../components/CategoryEditor';
import { AppContext } from '../../AppContext';
import MemoDataGrid from "../../components/MemoDataGrid";

const Transactions = ({ transactions }) => {
    const { tagList, categoriesList, calculatedTotals } = useContext(AppContext);
    // const [transactions, setTransactions] = transactionsList;
    const [categories, setCategories] = categoriesList;
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteredTransactions, setFilteredTrasactions] = useState([]);
    const [totals, setTotals] = calculatedTotals;

    useEffect(() => {
        setFilteredTrasactions(transactions)
    }, [transactions]);

    useEffect(() => {
        getCategories().then(resp => {
            formatCategories(resp.data);
        });
    }, []);

    const getCategories = () => {
        return axios.get(`/api/categories`);
    };

    const formatCategories = catData => {
        const catMap = new Map();
        catData.forEach(item => {
            catMap.set(item.name, item.label);
        });
        setCategories(catMap);
    };

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
        // getCategories().then(resp => {
        //     formatCategories(resp.data);
        // });
    }, []);

    useEffect(() => {
        getTransTotal();
    }, [selectedRows])

    const filterRows = filters => {
        const filteredTrans = transactions.filter(row => {
            let fields = Object.keys(filters);
            let match = true;
            let filterCount = fields.length;
            while(match && filterCount > 0) {
                fields.forEach(field => {
                    const filter = filters[field];
                    if (filter.dataType === 'array') {
                        if (!Array.from(filter.value).some(x => row[field] === x)) {
                            match = false;
                        };
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

    const getCategory = data => {
        const desc = data.row.description;
        if (categories?.has(desc)) {
            return categories.get(desc);
        }
        return '';
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
                <TagEditor row={trans.row} />
            )
        },
        {
            field: 'category',
            headerName: 'Category',
            cellClassName: 'category-cell',
            flex: 2,
            valueGetter: getCategory,
            renderCell: trans => (
                <CategoryEditor
                    category={trans}
                    onEditSubmit={onCatEditSubmit}
                    categories={categories}
                />
            )
        }
    ];

    return (
        <TransactionsWrapper>
            <h2 className="page-title">Transactions</h2>
            <Box>
                <Filters onFilterChange={filters => filterRows(filters)} />
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
        </TransactionsWrapper>
    )
}

export default Transactions;