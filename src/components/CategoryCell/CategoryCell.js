import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { CategoryCellStyles, CategoryEditorGlobalStyles } from './CategoryCell.styles';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popover from '@mui/material/Popover';
import { AppContext } from '../../AppContext';

const CategoryCell = ({ transaction, openModal, onEditSubmit }) => {
  const { categoriesList } = useContext(AppContext);
  const [categories] = categoriesList;
  const [editMode, setEditMode] = useState(false);
  const anchorEl = useRef(null);

  const updateCategory = category => {
    setEditMode(false);
    axios.post('api/transactionCategories/add', {transDesc: transaction.description, categoryId: category.id})
    .then(() => {
        onEditSubmit();
        setEditMode(false);
    });
  };

  const onClickAway = () => {
    setEditMode(false);
  };

  return (
    <CategoryCellStyles ref={anchorEl}>
      {transaction?.category && (
          <Chip label={transaction.category} size="small" />
      )}
      
      <IconButton size="small" onClick={() => setEditMode(true)} className="cat-edit-btn">
          <EditIcon fontSize="small" />
      </IconButton>

      <CategoryEditorGlobalStyles />
      {editMode && (
        <Popover
          open={editMode}
          anchorEl={anchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClickAway}>
              <MenuList>
                <MenuItem value=''>Select Category</MenuItem>
                {categories?.map(category => (
                  <MenuItem onClick={() => updateCategory(category)} key={category.id}>{category.label}</MenuItem>
                ))}
                <MenuItem className="new-tag-btn">
                  <Button onClick={() => openModal(transaction)}>
                    <AddCircleOutlineOutlinedIcon fontSize="small" />
                    Add New Category
                  </Button>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popover>
      )}
    </CategoryCellStyles>
  )
    };

export default React.memo(CategoryCell);
