import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { CategoryCellStyles, CategoryEditorGlobalStyles } from './CategoryCell.styles';
import Chip from '@mui/material/Chip';
import Button from '../Button';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
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
        onEditSubmit(transaction.description, category.label);
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

      <div className="edit-overlay">
        <Button size="small" onClick={() => setEditMode(true)}>
          Edit Category
        </Button>
      </div>

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
                {categories?.map(category => (
                  <MenuItem onClick={() => updateCategory(category)} key={category.id}>{category.label}</MenuItem>
                ))}
                <MenuItem className="new-category-btn">
                  <Button onClick={() => openModal(transaction)} size="small" variant="text">
                    <CreateNewFolderOutlinedIcon size="sm" />
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
