import React, { useState, useContext } from 'react';
import axios from 'axios';
import Input from '../Input';
import Modal from '../Modal';
import { AppContext } from '../../AppContext';

const CategoryModal = ({ onEditSubmit, categoryId, open, onCancel }) => {
    const { categoriesList } = useContext(AppContext);
    const [categories] = categoriesList;
    const [catInputVal, setCatInputVal] = useState(categories[categoryId] || '');

    const updateCategory = () => {
      axios.post('/api/categories/add', {label: catInputVal})
      .then(() => {
          setCatInputVal('');
          onEditSubmit();
      });
    };

    const handleCancel = () => {
      onCancel();
      setCatInputVal('');
    }

  return (
    <Modal
      title="Category"
      open={open}
      onSubmit={updateCategory}
      onCancel={handleCancel}
  >
      <Input
          label="Category Name"
          value={catInputVal}
          onChange={evt => setCatInputVal(evt.target.value)}
          autoFocus
          fullWidth
      />
    </Modal>
  )
    };

export default CategoryModal;
