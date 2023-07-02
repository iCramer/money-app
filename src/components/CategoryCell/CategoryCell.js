import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CategoryCellStyles } from './CategoryCell.styles';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from '../../AppContext';

const CategoryCell = ({ transaction, openModal }) => {
  const { categoriesList } = useContext(AppContext);
  const [categories, setCategories] = categoriesList;
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const initialCategory = categories.find(category => category.label === transaction.category);
    setInputValue(initialCategory?.id || '');
  }, []);

  const updateCategory = evt => {
    const newCategory = evt.target.value;
    axios.post('api/transactionCategories/add', {transDesc: transaction.description, categoryId: newCategory})
    .then(() => {
        // setCatInputVal('');
        // onEditSubmit();
    });
  };

  return (
    <CategoryCellStyles>
      {!editMode && transaction?.category && (
          <Chip label={transaction.category} size="small" />
      )}
      {/* <IconButton size="small" onClick={() => openModal(transaction)} className="cat-edit-btn"> */}
      <IconButton size="small" onClick={() => setEditMode(true)} className="cat-edit-btn">
          <EditIcon fontSize="small" />
      </IconButton>

      {editMode && (
        <FormControl fullWidth size="small">
          <Select onChange={updateCategory} value={inputValue}>
          <MenuItem value=''>Select Category</MenuItem>
            {categories?.map(category => (
              <MenuItem value={category.id}>{category.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </CategoryCellStyles>
  )
    };

export default React.memo(CategoryCell);
