import React, { useState } from 'react';
import { CategoryEditorStyles } from './CategoryEditor.styles';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import axios from 'axios';

const CategoryEditor = ({ category, categories, onEditSubmit }) => {
  const [catInputVal, setCatInputVal] = useState(category.value);
  const [modalOpen, setModalOpen] = useState(false);

  const updateCategory = () => {
    const name = category.row.description;
    if (categories.has(name)) {
        axios.put('/api/categories/update', {label: catInputVal, name})
        .then(() => {
          onEditSubmit();
        });
    }
    else {
        axios.post('/api/categories/add', {label: catInputVal, name})
        .then(() => {
          onEditSubmit();
        });
    }

    setModalOpen(false);
};

  return (
    <CategoryEditorStyles>
      {category.value && (
          <Chip label={category.value} size="small" />
      )}
      <IconButton size="small" onClick={() => setModalOpen(true)} className="cat-edit-btn">
          <EditIcon fontSize="small" />
      </IconButton>
      <Modal
        title="Category"
        open={modalOpen}
        onSubmit={updateCategory}
        onCancel={() => setModalOpen(false)}
      >
        <Input
            label="Category Name"
            value={catInputVal}
            onChange={evt => setCatInputVal(evt.target.value)}
            autoFocus
            fullWidth
        />
      </Modal>
    </CategoryEditorStyles>
  )
    };

export default React.memo(CategoryEditor);
