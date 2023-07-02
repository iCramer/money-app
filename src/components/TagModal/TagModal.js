import React, { useState, useContext } from 'react';
import axios from 'axios';import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '../Input';
import { AppContext } from '../../AppContext';

const TagModal = ({ open, handleModalClose }) => {
  const { tagList } = useContext(AppContext);
  const [tags, setTags] = tagList;
  const [tagInputVal, setTagInputVal] = useState('');

  const getTags = () => {
    return axios.get(`/api/tags`).then(resp => {
        setTags(resp.data);
    });
  };

  const addNewTag = () => {
      if (tagInputVal !== '') {
          axios.post('/api/tags/add', { tagName: tagInputVal }).then(() => {
            handleModalClose();
            getTags();
            setTagInputVal('');
          });
      }
  };

  return (
    <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Add New Tag</DialogTitle>
        <DialogContent>
        <Input
            label="Tag Name"
            value={tagInputVal}
            onChange={evt => setTagInputVal(evt.target.value)}
            autoFocus
            fullWidth
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button onClick={addNewTag} variant="primary">Submit</Button>
        </DialogActions>
    </Dialog>
  )
};

export default React.memo(TagModal);
