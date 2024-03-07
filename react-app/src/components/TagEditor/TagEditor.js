import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '../Button';
import { TagEditorStyles, TagEditorGlobalStyles } from './TagEditor.styles';
import Popover from '@mui/material/Popover';
import TagList from './TagList';
import { AppContext } from '../../AppContext';

const TagEditor = ({ row, openModal }) => {
  const { tagList } = useContext(AppContext);
  const [tags] = tagList;
  const existingTags = row.tags;
  const [currentTags, setCurrentTags] = useState([...existingTags]);
  const [showPopper, setShowPopper] = useState(false);
  const anchorEl = useRef(null);

  const changeCheck = evt => {
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
  };

  const onClickAway = () => {
    setShowPopper(false);
  };

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

  return (
    <>
      <TagEditorGlobalStyles />
      <TagEditorStyles>
        <div className="tag-container">
          <div className="tags">
            {currentTags?.map(tag => (
                <Chip key={tag} color="primary" label={tag} size="small" />
            ))}
          </div>
          <div className="tag-actions">
            <div className="edit-overlay" ref={anchorEl}>
              <Button size="small" onClick={() => setShowPopper(true)}>
                Edit Tags
              </Button>
            </div>
          </div>
        </div>
        <Popover
          open={showPopper}
          anchorEl={anchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Paper>
            <div className="edit-btn-group">
              <Button variant="text" size="small" onClick={cancelEdit}>
                  Cancel
              </Button>
              <Button size="small" onClick={updateTags}>
                  Done
              </Button>
            </div>
            <TagList
              tags={tags}
              onClickAway={onClickAway}
              currentTags={currentTags}
              changeCheck={changeCheck}
              openModal={openModal}
            />
          </Paper>
        </Popover>
      </TagEditorStyles>
    </>
  );
};

export default React.memo(TagEditor);
