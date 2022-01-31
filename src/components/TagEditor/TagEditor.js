import React, { useState, useRef, useContext, useCallback } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Input from '../Input';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TagEditorStyles, TagEditorGlobalStyles } from './TagEditor.styles';
import Popper from '@mui/material/Popper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TagList from './TagList';

import { AppContext } from '../../AppContext';

const TagEditor = ({ row }) => {
  const { tagList } = useContext(AppContext);
  const [tags, setTags] = tagList;
  const existingTags = row.tags;
  const [currentTags, setCurrentTags] = useState([...existingTags]);
  const [showPopper, setShowPopper] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tagInputVal, setTagInputVal] = useState('');
  const anchorEl = useRef(null);

  const changeCheck = useCallback(evt => {
      const { value, checked } = evt.target;

      if (!checked) {
          let currentTagsCopy = [...currentTags];
          const tagIndex = currentTagsCopy.indexOf(value);
          currentTagsCopy.splice(tagIndex, 1);
          setCurrentTags(currentTagsCopy);
      }
      else {
        setCurrentTags([...currentTags, value]);
      }
  }, []);

  const onClickAway = useCallback(() => {
    setShowPopper(false);
  }, []);

  const updateTags = () => {
    const newTagIds = currentTags.reduce((acc, item) => {
      const tagId = tags.find(x => x.tagName === item).id;
      if (tagId && !existingTags?.includes(item)) {
        acc.push(tagId);
      }
      return acc;
    }, []);

    if (newTagIds.length) {
      axios.post('/api/transactionTags/add', {
        transId: row.id,
        tagIds: newTagIds,
      })
    }

    const deleteTagIds = existingTags.reduce((acc, item) => {
      const tagId = tags.find(x => x.tagName === item).id;
      if (tagId && !currentTags.includes(item)) {
        acc.push(tagId);
      }
      return acc;
    }, []);

    if (deleteTagIds.length) {
      axios.delete('/api/transactionTags/delete', {
        data: {
          transId: row.id,
          tagIds: deleteTagIds
        }
      });
    }

    setShowPopper(false);
  };

  const cancelEdit = () => {
    setCurrentTags([...existingTags]);
    setShowPopper(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTagInputVal('');
  };

  const addNewTag = () => {
    if (tagInputVal !== '') {
      axios.post('/api/tags/add', { tagName: tagInputVal}).then(() => {
        handleModalClose();
        getTags();
      });
    }
  };

  const getTags = () => {
    return axios.get(`/api/tags`).then(resp => {
      setTags(resp.data);
    });
  };

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <TagEditorGlobalStyles />
      <TagEditorStyles ref={anchorEl}>
        <div className="tag-container">
          <div className="tags">
            {currentTags?.map(tag => (
                <Chip key={tag} color="primary" label={tag} size="small" />
            ))}
          </div>
          <div className="tag-actions">
            {!showPopper && (
              <IconButton size="small" onClick={() => setShowPopper(true)} className="tag-edit-btn">
                  <EditIcon fontSize="small" />
              </IconButton>
            )}
            {showPopper && (
              <>
                <IconButton size="small" onClick={updateTags}>
                    <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={cancelEdit}>
                    <CloseIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
        </div>
        <Popper
          open={showPopper}
          anchorEl={anchorEl.current}
          placement="bottom-start"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1
          }}
          transition
          disablePortal
        >
          <TagList
            tags={tags}
            onClickAway={onClickAway}
            currentTags={currentTags}
            changeCheck={changeCheck}
            openModal={openModal}
          />
        </Popper>
         
        <Dialog open={modalOpen} onClose={handleModalClose}>
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
      </TagEditorStyles>
    </>
  );
};

export default React.memo(TagEditor);
